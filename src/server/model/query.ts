import { QueryResult, Query } from 'pg'

import pool from './config'

interface IQuery {
  text: string
  values: Array<any>
}

export default (query: IQuery): Promise<QueryResult> => {
  return new Promise((resolve, reject) => {
    pool.query(query)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}