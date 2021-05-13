import * as express from 'express'
import { IUserAuth } from '../../model/types/user'

declare global {
    namespace Express {
        interface Request {
            user?: IUserAuth
        }
    }
}