export const createUserQuery = `
  INSERT INTO
  users(email, password, created_at)
  VALUES($1, $2, $3)
  returning *
`
export const findUserQuery = `SELECT id, email, password FROM users WHERE email = $1`