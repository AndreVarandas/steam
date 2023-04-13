export interface IPlayerSummary {
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

export interface IGetPlayerSummariesParams {
  steamids: string[]
  format?: 'json' | 'xml' | 'vdf'
}

export interface IGetPlayerSummariesResponse {
  response: {
    players: IPlayerSummary[]
  }
}

export interface IFriend {
  steamid: string
  relationship: string
  friend_since?: number
}

export interface IGetFriendListParams {
  steamid: string
  relationship?: 'all' | 'friend'
  format?: 'json' | 'xml' | 'vdf'
}
