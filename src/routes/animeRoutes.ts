import { Router } from "express";
import AnimeController from "../controllers/AnimeController";

const animeRoutes = Router()
const controller = new AnimeController()

animeRoutes.get('/', controller.getAll)
animeRoutes.get('/:id', controller.getById)
animeRoutes.post('/', controller.create)
animeRoutes.put('/:id', controller.update)
animeRoutes.delete('/:id', controller.delete)

export default animeRoutes