import {Router} from 'express'
import {UserRouter} from './User'

const routes = Router()

routes.use('/user', UserRouter)

export {routes}
