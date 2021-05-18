import { QueryResult } from 'pg'

import pool from './config'

export interface QueryType {
  text: string
  values: Array<any>
}

export default (query: QueryType): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    pool.query(query)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}