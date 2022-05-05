interface BaseAnimeDTO {
  id?: number
  name: string
  status: string
  published: Date
  duration: number
  year: number
  type: string
  episodes: number
  photo: string | null
  }
  
  export interface AnimeDTO extends BaseAnimeDTO {
    id: number
    userId: number | null
  }
  
  export interface CreateAnimeDTO extends BaseAnimeDTO {}
  
  export interface UpdateAnimeDTO extends Partial<BaseAnimeDTO> {}
  
  