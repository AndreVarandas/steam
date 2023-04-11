import { GetPlayerAchievementsResponse } from '../../types/steamUserStats'

export const playerAchievementResponseMock: GetPlayerAchievementsResponse = {
  playerstats: {
    steamID: '76561197972495328',
    gameName: 'Team Fortress 2',
    achievements: [
      {
        apiname: 'TF_CLASS_DEMOMAN',
        achieved: 1,
        unlocktime: 1229459946,
      },
      {
        apiname: 'TF_MAPS_HYDRO',
        achieved: 0,
      },
      {
        apiname: 'TF_MAPS_GRANARY',
        achieved: 0,
      },
    ],
  },
}
