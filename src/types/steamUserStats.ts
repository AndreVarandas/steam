export interface GetGlobalAchievementPercentagesForAppParams {
  gameid: number
  format?: 'json' | 'xml' | 'vdf'
}

export interface AchievementPercentage {
  name: string
  percent: number
}

export interface GetGlobalAchievementPercentagesForAppResponse {
  achievementpercentages: {
    achievements: AchievementPercentage[]
  }
}

export interface GetUserStatsForGameParams {
  steamid: string
  appid: number
  language?: string
}

export interface GetUserStatsForGameResponse {
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

export interface GetPlayerAchievementsParams {
  steamid: string
  appid: number
  language?: string
}

export interface GetPlayerAchievementsResponse {
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
  }
}
