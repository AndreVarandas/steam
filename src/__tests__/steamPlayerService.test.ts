import { SteamPlayerService } from '../services/steamPlayerService'
import { SteamClient } from '../steamClient'
import { GetOwnedGamesParams } from '../types/steamPlayer'
import { ownedGamesMock } from './mocks/ownedGames.mocks'

jest.mock('../steamClient')

describe('PlayerService', () => {
  let steamClient: SteamClient
  let playerService: SteamPlayerService

  beforeEach(() => {
    steamClient = new SteamClient('API_KEY')
    playerService = new SteamPlayerService(steamClient)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getOwnedGames', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(ownedGamesMock)

      const params: GetOwnedGamesParams = {
        steamid: '123456',
        includeAppInfo: true,
        includePlayedFreeGames: true,
        appIdsFilter: [440, 500, 550],
        format: 'json',
      }

      await playerService.getOwnedGames(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001',
        {
          steamid: '123456',
          include_appinfo: true,
          include_played_free_games: true,
          appids_filter: '440,500,550',
          format: 'json',
        }
      )
    })

    it('should return the response data', async () => {
      jest.spyOn(steamClient, 'get').mockResolvedValue(ownedGamesMock)

      const params: GetOwnedGamesParams = {
        steamid: '123456',
        includeAppInfo: true,
        includePlayedFreeGames: true,
        appIdsFilter: [440, 500, 550],
        format: 'json',
      }

      const data = await playerService.getOwnedGames(params)

      expect(data.game_count).toEqual(ownedGamesMock.game_count)
      expect(data.games).toEqual(ownedGamesMock.games)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Request failed')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: GetOwnedGamesParams = {
        steamid: '123456',
        includeAppInfo: true,
        includePlayedFreeGames: true,
        appIdsFilter: [440, 500, 550],
        format: 'json',
      }

      await expect(playerService.getOwnedGames(params)).rejects.toThrow(error)
    })
  })
})
