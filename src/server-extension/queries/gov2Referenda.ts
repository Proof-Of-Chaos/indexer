export const gov2referendaStatsQuery = `
            WITH 

            referendum_data AS (

              SELECT
                index as referendum_index
              , preimage_section
              , preimage_method
              , status
              , index
              , created_at::timestamp AS created_at
              , ended_at::timestamp AS ended_at
              , DATE_PART('day', ended_at::timestamp - created_at::timestamp) + 
                DATE_PART('hour', ended_at::timestamp - created_at::timestamp) / 24 AS vote_duration
              , total_issuance::decimal(38,0) / 1000000000000 AS total_issuance
              , ayes::decimal(38,0) / 1000000000000 AS referendum_ayes
              , nays::decimal(38,0) / 1000000000000 AS referendum_nays
              , decision_deposit_who
              , decision_deposit_amount::decimal(38,0) / 1000000000000 AS decision_deposit_amount
              , submission_deposit_who
              , submission_deposit_amount::decimal(38,0) / 1000000000000 AS submission_deposit_amount
              , track::int as track
              FROM open_gov_referendum
              WHERE NOT (index = ANY ($1) )

            ),

            referendum_timeline_flatten AS (

              SELECT
                index AS referendum_index
              , (status_history_flatten ->> 'status')::text AS status
              , (status_history_flatten ->> 'timestamp')::timestamp AS timestamp
              FROM open_gov_referendum, 
              jsonb_array_elements(status_history) AS status_history_flatten
              WHERE NOT (index = ANY ($1) )

            ),

            timeline_executed AS (

              SELECT 
                referendum_index
              , timestamp as executed_at
              FROM referendum_timeline_flatten
              WHERE status = 'Executed'
            
            ), 

            timeline_decision_started AS (

              SELECT 
                referendum_index
              , timestamp as decision_started_at
              FROM referendum_timeline_flatten
              WHERE status = 'DecisionStarted'
            
            ), 

            timeline_passed AS (

              SELECT 
                referendum_index
              , timestamp as passed_at
              FROM referendum_timeline_flatten
              WHERE status in ('Approved', 'Comfirmed')
            
            ), 

            timeline_not_passed AS (

              SELECT 
                referendum_index
              , timestamp as not_passed_at
              FROM referendum_timeline_flatten
              WHERE status = 'Rejected'
            
            ), 

            timeline_cancelled AS (

              SELECT 
                referendum_index
              , timestamp as cancelled_at
              FROM referendum_timeline_flatten
              WHERE status = 'Cancelled'
            
            ), 

            timeline_timedout AS (

              SELECT 
                referendum_index
              , timestamp as timedout_at
              FROM referendum_timeline_flatten
              WHERE status = 'TimedOut'
            
            ), 

            refined_timeline AS (

              SELECT * 
              FROM timeline_executed
              FULL OUTER JOIN timeline_passed
                USING (referendum_index)
              FULL OUTER JOIN timeline_not_passed
                USING (referendum_index)
              FULL OUTER JOIN timeline_cancelled
                USING (referendum_index)
              FULL OUTER JOIN timeline_timedout
                USING (referendum_index)
              FULL OUTER JOIN timeline_decision_started
                USING (referendum_index)

            ),

            refined_referendum AS (
              
              SELECT *
              , vote_duration / 4 As vote_duration_1_4
              , vote_duration / 2 As vote_duration_1_2
              , vote_duration * 3 / 4 As vote_duration_3_4
              FROM referendum_data

            ),

            vote_sequence AS (

              SELECT 
                *
              , ROW_NUMBER() OVER (PARTITION BY referendum_index, voter ORDER BY timestamp desc) as seq
              FROM conviction_vote
              WHERE NOT (referendum_index = ANY ($1) )
              AND block_number_removed IS NULL

            ),

            valid_vote AS (

              SELECT 
                voter
              , referendum_index
              , decision
              , CASE WHEN lock_period = 0 THEN 0.1
                     ELSE lock_period 
                END AS conviction
              , (balance ->> 'value')::decimal(38,0) / 1000000000000 AS balance_value
              , (balance ->> 'aye')::decimal(38,0) / 1000000000000 AS balance_aye
              , (balance ->> 'nay')::decimal(38,0) / 1000000000000 AS balance_nay
              , DATE_PART('day', v.timestamp - r.created_at) + 
                DATE_PART('hour', v.timestamp - r.created_at) / 24 As voting_time
              , v.timestamp
              , v.type
              , v.is_validator
              FROM vote_sequence AS v
              LEFT JOIN refined_referendum AS r
                USING(referendum_index)
              WHERE seq = 1

            ),

            ref_seq AS (

              SELECT
                voter
              , referendum_index
              , ROW_NUMBER() OVER (PARTITION BY voter order by timestamp) as referendum_seq
              FROM conviction_vote

            ),

            new_ref AS (

              SELECT 
                voter
              , referendum_index
              from ref_seq
              where referendum_seq = 1

            ),

            refined_votes AS (

              SELECT 
                v.referendum_index
              , voter
              , decision
              , CASE WHEN v.referendum_index = n.referendum_index THEN 1
                     ELSE 0 
                END AS is_new_account
              , conviction
              , balance_value
              , balance_aye
              , balance_nay
              , CASE WHEN voting_time < vote_duration_1_4 
                          THEN '0/4 - 1/4 vote duration'
                     WHEN voting_time >= vote_duration_1_4 AND voting_time < vote_duration_1_2 
                          THEN '1/4 - 1/2 vote duration'
                     WHEN voting_time >= vote_duration_1_2 AND voting_time < vote_duration_3_4 
                          THEN '1/2 - 3/4 vote duration'       
                     WHEN voting_time >= vote_duration_3_4
                          THEN '3/4 - 4/4 vote duration'    
                END AS voting_time_group
              , type
              , is_validator
              FROM valid_vote AS v     
              LEFT JOIN new_ref AS n
                USING (voter)
              LEFT JOIN refined_referendum as r
                ON v.referendum_index = r.referendum_index

            ),

            pre_calculation AS (

              SELECT 
                referendum_index
              , decision
              , COUNT(*) AS count
              , SUM(CASE WHEN decision = 'yes' THEN COALESCE(balance_value, 0) + COALESCE(balance_aye, 0)
                         ELSE COALESCE(balance_value, 0) + COALESCE(balance_nay, 0) 
                    END)
                AS voted_amount
              , SUM(CASE WHEN decision = 'yes' THEN COALESCE(balance_value, 0) + COALESCE(balance_aye, 0)
                         ELSE COALESCE(balance_value, 0) + COALESCE(balance_nay, 0)
                    END * conviction)
                AS voted_amount_with_conviction
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              FROM refined_votes
              group by 1, 2

            ),
            
            aye_calculation AS (
            
              SELECT 
                referendum_index
              , SUM(count) AS count_aye
              , SUM(voted_amount) AS voted_amount_aye
              , SUM(voted_amount_with_conviction) as voted_amount_with_conviction_aye
              , SUM(conviction_mean) AS conviction_mean_aye
              , SUM(conviction_median) AS conviction_median_aye
              FROM pre_calculation
              WHERE decision in ('yes', 'abstain')
              GROUP BY 1
            
            ),

            nay_calculation AS (

              SELECT 
                referendum_index
              , SUM(count) AS count_nay
              , SUM(voted_amount) AS voted_amount_nay
              , SUM(voted_amount_with_conviction) as voted_amount_with_conviction_nay
              , SUM(conviction_mean) AS conviction_mean_nay
              , SUM(conviction_median) AS conviction_median_nay
              FROM pre_calculation
              WHERE decision in ('no', 'abstain')
              GROUP BY 1

            ),

            delegation AS (

              SELECT 
                referendum_index
              , SUM(CASE WHEN type = 'Direct' THEN 1 ELSE 0 END) AS count_direct
              , SUM(CASE WHEN type = 'Delegated' THEN 1 ELSE 0 END) AS count_delegated
              , SUM(CASE WHEN type = 'Direct' 
                         THEN COALESCE(balance_value, 0) 
                         ELSE 0 
                    END * conviction) AS voted_amount_with_conviction_direct
              , SUM(CASE WHEN type = 'Delegated' 
                         THEN COALESCE(balance_value, 0) 
                         ELSE 0 
                    END * conviction) AS voted_amount_with_conviction_delegated
              FROM refined_votes
              group by 1

            ),

            voter_type AS (
              SELECT 
                referendum_index
              , SUM(CASE WHEN is_validator = true THEN 1 ELSE 0 END) AS count_validator
              , SUM(CASE WHEN (is_validator = false OR is_validator IS NULL)
                         THEN 1 ELSE 0 END) AS count_normal
              , SUM(CASE WHEN is_validator = true THEN COALESCE(balance_value, 0) 
                         ELSE 0 
                    END * conviction) AS voted_amount_with_conviction_validator
              , SUM(CASE WHEN (is_validator = false OR is_validator IS NULL)
                         THEN COALESCE(balance_value, 0) 
                         ELSE 0 
                    END * conviction) AS voted_amount_with_conviction_normal
              FROM refined_votes
              group by 1

            ),

            voting_time_groups AS (

              SELECT
                referendum_index
              , SUM(CASE WHEN voting_time_group = '0/4 - 1/4 vote duration' THEN
                         CASE WHEN decision = 'abstain' THEN 2
                              ELSE 1 END
                    ELSE 0 END) AS count_0_4_1_4_vote_duration
              , SUM(CASE WHEN voting_time_group = '1/4 - 1/2 vote duration' THEN
                         CASE WHEN decision = 'abstain' THEN 2
                              ELSE 1 END
                    ELSE 0 END) AS count_1_4_2_4_vote_duration              
              , SUM(CASE WHEN voting_time_group = '1/2 - 3/4 vote duration' THEN
                          CASE WHEN decision = 'abstain' THEN 2
                               ELSE 1 END
                          ELSE 0 END) AS count_2_4_3_4_vote_duration              
              , SUM(CASE WHEN voting_time_group = '3/4 - 4/4 vote duration' THEN
                           CASE WHEN decision = 'abstain' THEN 2
                                ELSE 1 END
                      ELSE 0 END) AS count_3_4_4_4_vote_duration
              FROM refined_votes
              GROUP BY 1

            ),

            total_calculation AS (

              SELECT 
                referendum_index
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              , SUM(is_new_account) AS count_new
              FROM refined_votes
              group by 1

            ),

            calculation AS (

              SELECT 
                referendum_index
              , COALESCE(count_aye, 0) AS count_aye
              , COALESCE(count_nay, 0) AS count_nay
              , COALESCE(voted_amount_aye, 0) AS voted_amount_aye
              , COALESCE(voted_amount_nay, 0) AS voted_amount_nay
              , COALESCE(voted_amount_with_conviction_aye, 0) AS voted_amount_with_conviction_aye
              , COALESCE(voted_amount_with_conviction_nay, 0) AS voted_amount_with_conviction_nay
              , COALESCE(conviction_mean_aye, 0) AS conviction_mean_aye
              , COALESCE(conviction_mean_nay, 0) AS conviction_mean_nay
              , COALESCE(conviction_mean, 0) AS conviction_mean
              , COALESCE(conviction_median_aye, 0) AS conviction_median_aye
              , COALESCE(conviction_median_nay, 0) AS conviction_median_nay
              , COALESCE(conviction_median, 0) AS conviction_median
              , count_new
              , COALESCE(count_0_4_1_4_vote_duration, 0) AS count_0_4_1_4_vote_duration
              , COALESCE(count_1_4_2_4_vote_duration, 0) AS count_1_4_2_4_vote_duration
              , COALESCE(count_2_4_3_4_vote_duration, 0) AS count_2_4_3_4_vote_duration
              , COALESCE(count_3_4_4_4_vote_duration, 0) AS count_3_4_4_4_vote_duration
              FROM aye_calculation
              FULL OUTER JOIN nay_calculation
                USING (referendum_index)
              FULL OUTER JOIN total_calculation
                USING (referendum_index)
              FULL OUTER JOIN voting_time_groups
                USING (referendum_index)

            ),

            latest_quiz_version AS (
            
              SELECT 
                 id
               , min(timestamp)  as quizze_created_at
               , max(version) AS version
              FROM quiz
              GROUP BY 1

            ),

            latest_quiz_data AS (

              SELECT 
                 id as quiz_id
               , creator as quiz_creator
               , referendum_index
               , quizze_created_at
               , version AS latest_version
              FROM quiz
              INNER JOIN latest_quiz_version
                USING(id, version)

            ),

            quiz_questions AS (
              
              SELECT 
                 quiz_id
               , COUNT(q.id) AS questions_count
              FROM question AS q
              INNER JOIN latest_quiz_data AS l
                USING (quiz_id)
              GROUP BY 1

            ),

            latest_submission AS (

              SELECT
                  wallet
                , quiz_id
                , max(version) AS version
              FROM quiz_submission
              GROUP BY 1,2

            ),

            account_correct_answers AS (

              SELECT 
                 wallet
               , referendum_index
               , timestamp AS answer_submitted_at
               , s.quiz_id
               , questions_count
               , SUM(CASE WHEN is_correct = true then 1
                          ELSE 0 
                     END) AS correct_answers_count
              FROM quiz_submission AS s
              INNER JOIN latest_submission
                USING (wallet, quiz_id, version)
              INNER JOIN quiz_questions AS q
                ON s.quiz_id = q.quiz_id
              INNER JOIN answer AS a
                ON a.quiz_submission_id = s.id
              GROUP BY 1,2,3,4,5
                 
            ),

            referenda_correct_answers AS (

              SELECT 
                referendum_index
                , SUM(CASE WHEN correct_answers_count = questions_count THEN 1 ELSE 0 END) AS count_fully_correct
                , SUM(CASE WHEN correct_answers_count = 1 THEN 1 ELSE 0 END) AS count_1_question_correct
                , SUM(CASE WHEN correct_answers_count = 2 THEN 1 ELSE 0 END) AS count_2_question_correct
                , SUM(CASE WHEN correct_answers_count = 3 THEN 1 ELSE 0 END) AS count_3_question_correct
                , COUNT(distinct wallet) AS count_quiz_attended_wallets
              FROM account_correct_answers
              GROUP BY 1

            ), 

            final AS (

              SELECT 
                c.referendum_index
              , r.index
              , r.created_at
              , r.ended_at
              , r.status
              , r.referendum_ayes
              , r.referendum_nays
              , decision_deposit_who
              , decision_deposit_amount
              , submission_deposit_who
              , submission_deposit_amount
              , r.track
              , r.preimage_method AS method
              , r.preimage_section AS section
              , c.count_aye
              , c.count_nay
              , c.count_aye + c.count_nay AS count_total
              , c.voted_amount_aye
              , c.voted_amount_nay
              , c.voted_amount_aye + c.voted_amount_nay AS voted_amount_total
              , c.voted_amount_with_conviction_aye
              , c.voted_amount_with_conviction_nay
              , c.voted_amount_with_conviction_aye + c.voted_amount_with_conviction_nay AS voted_amount_with_conviction_total
              , r.total_issuance::decimal(38,0) AS total_issuance
              , COALESCE(c.voted_amount_aye / r.total_issuance * 100, 0) AS turnout_aye_perc
              , COALESCE(c.voted_amount_nay / r.total_issuance * 100, 0) AS turnout_nay_perc
              , COALESCE((c.voted_amount_aye + c.voted_amount_nay) / r.total_issuance * 100, 0) AS turnout_total_perc
              , c.count_new
              , c.count_new / (c.count_aye + c.count_nay) * 100 as count_new_perc
              , r.vote_duration
              , c.conviction_mean_aye
              , c.conviction_mean_nay
              , c.conviction_mean
              , c.conviction_median_aye
              , c.conviction_median_nay
              , c.conviction_median
              , c.count_0_4_1_4_vote_duration
              , c.count_1_4_2_4_vote_duration
              , c.count_2_4_3_4_vote_duration
              , c.count_3_4_4_4_vote_duration
              , c.count_0_4_1_4_vote_duration / (c.count_aye + c.count_nay) * 100 AS count_0_4_1_4_vote_duration_perc
              , c.count_1_4_2_4_vote_duration / (c.count_aye + c.count_nay) * 100 AS count_1_4_2_4_vote_duration_perc
              , c.count_2_4_3_4_vote_duration / (c.count_aye + c.count_nay) * 100 AS count_2_4_3_4_vote_duration_perc
              , c.count_3_4_4_4_vote_duration / (c.count_aye + c.count_nay) * 100 AS count_3_4_4_4_vote_duration_perc
              , t.passed_at
              , t.not_passed_at
              , t.cancelled_at
              , t.executed_at
              , t.timedout_at
              , t.decision_started_at
              , ca.count_quiz_attended_wallets
              , ca.count_fully_correct
              , ca.count_fully_correct AS quiz_fully_correct_perc
              , ca.count_1_question_correct AS count_1_question_correct_perc
              , ca.count_2_question_correct AS count_2_question_correct_perc
              , ca.count_3_question_correct AS count_3_question_correct_perc
              , d.count_direct
              , d.count_delegated
              , d.voted_amount_with_conviction_direct
              , d.voted_amount_with_conviction_delegated
              , vt.count_validator
              , vt.count_normal
              , vt.voted_amount_with_conviction_validator
              , vt.voted_amount_with_conviction_normal
              FROM calculation AS c
              INNER JOIN refined_referendum AS r
                ON c.referendum_index = r.referendum_index
              LEFT JOIN refined_timeline AS t
                ON t.referendum_index = c.referendum_index
              LEFT JOIN referenda_correct_answers AS ca
                ON ca.referendum_index = c.referendum_index
              LEFT JOIN delegation AS d
                ON r.referendum_index = d.referendum_index
              LEFT JOIN voter_type AS vt
                ON r.referendum_index = vt.referendum_index

              )

              select * from final

            `
          
