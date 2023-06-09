export interface IOwnedGame {
  appid: number
  name?: string
  playtime_2weeks?: number
  playtime_forever?: number
  img_icon_url?: string
  img_logo_url?: string
  has_community_visible_stats?: boolean
}

export interface IGetOwnedGamesParams {
  steamid: string
  includeAppInfo?: boolean
  includePlayedFreeGames?: boolean
  appIdsFilter?: number[]
  format?: 'json' | 'xml' | 'vdf'
}

export interface IGetOwnedGamesResponse {
  game_count: number
  games: {
    appid: number
    name?: string
    playtime_2weeks?: number
    playtime_forever?: number
    img_icon_url?: string
    img_logo_url?: string
    has_community_visible_stats?: boolean
  }[]
}

export interface IGetRecentlyPlayedGamesParams {
  steamid: string
  count?: number
  format?: string
}

export interface IGetRecentlyPlayedGamesResponse {
  total_count: number
  games: {
    appid: number
    name: string
    playtime_2weeks: number
    playtime_forever: number
    img_icon_url: string
    img_logo_url: string
  }[]
}
