export interface PlayerSummary {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  lastlogoff: number
  commentpermission: number
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  personastate: number
  realname?: string
  primaryclanid?: string
  timecreated?: number
  gameid?: string
  gameserverip?: string
  gameextrainfo?: string
  cityid?: number
  loccountrycode?: string
  locstatecode?: string
  loccityid?: number
}

export interface GetPlayerSummariesParams {
  steamids: string[]
  format?: 'json' | 'xml' | 'vdf'
}

export interface GetPlayerSummariesResponse {
  response: {
    players: PlayerSummary[]
  }
}

export interface Friend {
  steamid: string
  relationship: string
  friend_since?: number
}

export interface GetFriendListParams {
  steamid: string
  relationship?: 'all' | 'friend'
  format?: 'json' | 'xml' | 'vdf'
}
