export const userStatsForGameMock = {
  status: 200,
  statusText: 'OK',
  headers: {},
  data: {
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
      stats: [
        {
          name: 'Scout.accum.iDoubleJumps',
          value: 6,
        },
        {
          name: 'Scout.accum.iHeadshots',
          value: 2,
        },
        {
          name: 'Scout.accum.iHealthPointsHealed',
          value: 0,
        },
      ],
    },
  },
}
