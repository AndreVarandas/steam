export interface OwnedGame {
  appid: number
  name?: string
  playtime_2weeks?: number
  playtime_forever?: number
  img_icon_url?: string
  img_logo_url?: string
  has_community_visible_stats?: boolean
}

export interface GetOwnedGamesParams {
  steamid: string
  include_appinfo?: boolean
  include_played_free_games?: boolean
  appids_filter?: number[]
  format?: 'json' | 'xml' | 'vdf'
}

export interface OwnedGamesResponse {
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
