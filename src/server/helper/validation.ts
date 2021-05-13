import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

const saltRounds: number = 10

export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, saltRounds)

export const generateAccessToken = (id: string, email: string): Promise<string> => sign({ userId: id, email }, process.env.SECRET_KEY)

export const comparePasswords = async (enteredPassword, storedPassword): Promise<boolean> => await bcrypt.compare(enteredPassword, storedPassword)
