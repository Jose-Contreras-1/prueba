import { Router } from 'express'
import healthRoutes from './healthRoutes'
import animeRoutes from './animeRoutes'
import authRoutes from './authRoutes'
import tokenValidator from '../middlewares/tokenValidator'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/anime', tokenValidator(), animeRoutes)
apiRoutes.use('/auth', authRoutes)

export default apiRoutes
