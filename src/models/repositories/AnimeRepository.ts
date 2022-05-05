import { PrismaClient } from "@prisma/client";
import { AnimeDTO, CreateAnimeDTO, UpdateAnimeDTO } from "../dto/AnimeDTO";

const prisma = new PrismaClient()

export default class AnimeRepository{
private userId: number

constructor(userId: number) {
  this.userId = userId
}

  public readonly findAll =async (): Promise<AnimeDTO[]> => {
    const anime = await prisma.anime.findMany({
      where: {
        userId: this.userId
      }
    })
    return anime
  }

  public readonly findById =async (id: number): Promise<AnimeDTO | undefined> => {
    const anime = await prisma.anime.findFirst({
      where: {
        id,
        userId: this.userId
      }
    })

    if (!anime) return

    return anime
  }

  public readonly create =async (anime: CreateAnimeDTO): Promise<AnimeDTO> => {
    const newAnime = await prisma.anime.create({
      data: {
        ...anime,
        userId: this.userId,
        published: new Date(anime.published).toISOString()
      }
    })

    return newAnime
  }

  public readonly update =async (id: number, anime: UpdateAnimeDTO): Promise<void> => {
    await prisma.anime.updateMany({
      where: {
        id,
        userId: this.userId
      },
      data: {
        ...anime,
        published: anime.published ? new Date(anime.published).toISOString(): undefined
      }
    })
  }

  public readonly delete =async (id: number) => {
    await prisma.anime.deleteMany({
      where: {
        id,
        userId: this.userId
      }
    })
  }
}