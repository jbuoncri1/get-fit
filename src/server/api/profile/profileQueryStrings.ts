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

export const updateProfileQuery = `
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
