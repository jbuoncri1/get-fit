import * as express from 'express'
import { IUser } from '../../model/types/user'

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}