export interface IGetGlobalAchievementPercentagesForAppParams {
  gameid: number
  format?: 'json' | 'xml' | 'vdf'
}

export interface IAchievementPercentage {
  name: string
  percent: number
}

export interface IGetGlobalAchievementPercentagesForAppResponse {
  achievementpercentages: {
    achievements: IAchievementPercentage[]
  }
}

export interface IGetUserStatsForGameParams {
  steamid: string
  appid: number
  language?: string
}

export interface IGetUserStatsForGameResponse {
  playerstats: {
    steamID: string
    gameName: string
    achievements: {
      apiname: string
      achieved: number
      unlocktime?: number
    }[]
    stats: {
      name: string
      value: number
    }[]
  }
}

export interface IGetPlayerAchievementsParams {
  steamid: string
  appid: number
  language?: string
}

export interface IGetPlayerAchievementsResponse {
  playerstats: {
    steamID: string
    gameName: string
    achievements: {
      apiname: string
      achieved: number
      unlocktime?: number
      name?: string
      description?: string
    }[]
    error?: string
  }
}
