import { QueryResult } from 'pg'

import pool from './config'

export default (queryText: string, params: Array<any>): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    pool.query(queryText, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}