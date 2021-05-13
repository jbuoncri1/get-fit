export interface IUserAuth {
  userId: string
  email: string
}

export interface IUserCredentials {
  email: string
  password: string
}

export interface IUserPersonalInfo {
  first_name: string
  last_name: string
  height: number
  weight: number
  gender: string
  date_of_birth: string
}