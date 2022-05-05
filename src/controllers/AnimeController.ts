import { Request, Response } from "express"
import { AnimeDTO, CreateAnimeDTO, UpdateAnimeDTO } from "../models/dto/AnimeDTO"
import AnimeRepository from "../models/repositories/AnimeRepository"
import { UserTokenPayload } from "../models/Types"
import { createAnimeSchema, updateAnimeSchema } from "../models/validators/animeSchemas"


export default class AnimeController {
  public readonly getAll = async (req: Request, res: Response) => {
    const user = req.user as UserTokenPayload
    const repository = new AnimeRepository(user.sub)

    try {
      const anime: AnimeDTO[] = await repository.findAll()
      res.json(anime)
    } catch(error){
        console.log(error)
        res.status(500).json({ message: 'Someting went wrong' })
    }
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.user as UserTokenPayload
    const repository = new AnimeRepository(user.sub)
    const anime = await repository.findById(parseInt(id))

    if (!anime) {
      res.status(404).json({ message: 'Anime not found' })
      return
    }
    res.json(anime)
  }

  public readonly create = async (req: Request, res: Response) => {
    const anime = req.body as CreateAnimeDTO

    try{
     await createAnimeSchema.validateAsync(anime) 
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new AnimeRepository(user.sub)

    try{
      const newAnime = await repository.create(anime)
      res.json(newAnime)
    }catch (error) {
      if (error.code == 'P2002') {
        res.status(409).json({ message: 'Anime already exists' })
        return
      }
      console.log(error)
      console.log('Error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
    
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const anime = req.body as UpdateAnimeDTO
    
    try{
     await updateAnimeSchema.validateAsync(anime) 
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new AnimeRepository(user.sub)

    try{
      await repository.update(parseInt(id), anime)
      res.sendStatus(204)
    } catch (error) {
      if (error.code == 'P2002') {
        res.status(409).json({ message: 'Anime already exists' })
        return
      }
      console.log(error)
      console.log('Error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = req.user as UserTokenPayload
    const repository = new AnimeRepository(user.sub)

    try {
      await repository.delete(parseInt(id))
      res.sendStatus(204)
    }catch (error) {
      console.log(error)
      console.log('Error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }

}