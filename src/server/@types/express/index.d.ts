import * as express from 'express'
import { UserAuthType } from '../../model/types/user'

declare global {
    namespace Express {
        interface Request {
            user?: UserAuthType
        }
    }
}