import { AxiosError, AxiosResponse } from 'axios'

import { SteamPlayerService } from '../services/steamPlayerService'
import { SteamClient } from '../steamClient'
import {
  IGetOwnedGamesParams,
  IGetRecentlyPlayedGamesParams,
} from '../types/ISteamPlayer'
import { ownedGamesMock } from './mocks/ownedGames.mocks'
import { recentlyPlayedGamesMock } from './mocks/recentlyPlayedGames.mock'

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

      const params: IGetOwnedGamesParams = {
        steamid: '123456',
        includeAppInfo: true,
        includePlayedFreeGames: true,
        appIdsFilter: [440, 500, 550],
        format: 'json',
      }

      await playerService.getOwnedGames(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
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

      const params: IGetOwnedGamesParams = {
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

      const params: IGetOwnedGamesParams = {
        steamid: '123456',
        includeAppInfo: true,
        includePlayedFreeGames: true,
        appIdsFilter: [440, 500, 550],
        format: 'json',
      }

      await expect(playerService.getOwnedGames(params)).rejects.toThrow(error)
    })
  })

  describe('getRecentlyPlayedGames', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest.spyOn(steamClient, 'get')

      const params: IGetRecentlyPlayedGamesParams = {
        count: 5,
        steamid: '123456789',
      }

      await playerService.getRecentlyPlayedGames(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/',
        {
          count: 5,
          format: 'json',
          steamid: '123456789',
        }
      )
    })

    it('should return player recently played games', async () => {
      const steamid = '123456789'
      const count = 5
      const format = 'json'

      steamClient.get = jest.fn().mockResolvedValueOnce(recentlyPlayedGamesMock)

      const result = await playerService.getRecentlyPlayedGames({
        steamid,
        count,
        format,
      })

      expect(steamClient.get).toHaveBeenCalledWith(
        'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/',
        { steamid, count, format }
      )
      expect(result).toEqual(recentlyPlayedGamesMock)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Failed to get Recently Played Games')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: IGetRecentlyPlayedGamesParams = {
        steamid: '123456789',
        count: 5,
      }

      await expect(
        playerService.getRecentlyPlayedGames(params)
      ).rejects.toThrow(error)
    })

    it('should throw and error if the player profile is private', async () => {
      const error = new Error('Request failed') as AxiosError

      error.isAxiosError = true
      error.response = {
        status: 403,
        data: {
          playerstats: {
            error: 'Something went wrong',
          },
        },
      } as AxiosResponse

      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: IGetRecentlyPlayedGamesParams = {
        steamid: '123456789',
        count: 5,
      }

      await expect(
        playerService.getRecentlyPlayedGames(params)
      ).rejects.toThrow('This player profile is private.')
    })
  })
})
