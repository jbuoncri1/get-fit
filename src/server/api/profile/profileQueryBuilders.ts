import moment from 'moment'

import { QueryType } from '../../model/query'
import { hashPassword } from '../../helper/validation'

export const getProfileInfoQuery = `
  SELECT
    id,
    email,
    first_name,
    last_name,
    height,
    weight,
    date_of_birth,
    gender,
    created_at,
    modified_at
  FROM 
    users WHERE id = $1
`

export const deleteProfileQuery = 'DELETE FROM users WHERE id = $1'

export const addPersonalInfoQuery = `
  UPDATE users 
  SET first_name = $1,
    last_name = $2,
    gender = $3,
    height = $4,
    weight = $5,
    date_of_birth = $6,
    modified_at = $7
    WHERE id = $8
  `

export const updateProfileInfoQuery = async (userId: string, data: any): Promise<QueryType> => {
  const values = []
  let stringBuilder = 'UPDATE users SET '
  let counter = 1

  for (const key in data) {
    if (key === 'password') {
      const hashedUpdatedPassword = await hashPassword(data[key])
      values.push(hashedUpdatedPassword)
    } else if (key === 'date_of_birth') {
      moment(data[key])
    } else {
      values.push(data[key])
    }

    stringBuilder += `${key} = $${counter}, `
    counter++
  }

  const modifiedAt = moment()
  stringBuilder += `modified_at = $${counter} `
  values.push(modifiedAt)
  counter++

  stringBuilder += `WHERE id =$${counter}`
  values.push(userId)

  return {
    text: stringBuilder,
    values
  }
}