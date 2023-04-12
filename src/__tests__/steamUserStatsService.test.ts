import { AxiosError, AxiosResponse } from 'axios'

import { SteamUserStatsService } from '../services/steamUserStatsService'
import { SteamClient } from '../steamClient'
import {
  GetGlobalAchievementPercentagesForAppParams,
  GetPlayerAchievementsParams,
  GetUserStatsForGameParams,
} from '../types/steamUserStats'
import { globalAchievementPercentageMock } from './mocks/globalAchievementPercentage.mock'
import { playerAchievementResponseMock } from './mocks/playerAchievement.mock'
import { userStatsForGameMock } from './mocks/userStatsForGame.mock'

jest.mock('../steamClient')

describe('SteamUserStatsService', () => {
  let steamClient: SteamClient
  let steamUserStatsService: SteamUserStatsService

  beforeEach(() => {
    steamClient = new SteamClient('API_KEY')
    steamUserStatsService = new SteamUserStatsService(steamClient)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getGlobalAchievementPercentagesForApp', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(globalAchievementPercentageMock)

      const params: GetGlobalAchievementPercentagesForAppParams = {
        gameid: 123456,
        format: 'json',
      }

      await steamUserStatsService.getGlobalAchievementPercentagesForApp(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/',
        {
          gameid: 123456,
          format: 'json',
        }
      )
    })

    it('should return the response data', async () => {
      jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(globalAchievementPercentageMock)

      const params: GetGlobalAchievementPercentagesForAppParams = {
        gameid: 123456,
        format: 'json',
      }

      const data =
        await steamUserStatsService.getGlobalAchievementPercentagesForApp(
          params
        )

      expect(data).toEqual(
        globalAchievementPercentageMock.achievementpercentages.achievements
      )
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Request failed')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: GetGlobalAchievementPercentagesForAppParams = {
        gameid: 123456,
        format: 'json',
      }

      await expect(
        steamUserStatsService.getGlobalAchievementPercentagesForApp(params)
      ).rejects.toThrow(error)
    })
  })

  describe('getUserStatsForGame', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(userStatsForGameMock.data)

      const params: GetUserStatsForGameParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      await steamUserStatsService.getUserStatsForGame(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002',
        {
          steamid: '123456',
          appid: 440,
          l: 'en',
        }
      )
    })

    it('should return the response data', async () => {
      jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(userStatsForGameMock.data)

      const params: GetUserStatsForGameParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      const data = await steamUserStatsService.getUserStatsForGame(params)

      expect(data).toEqual(userStatsForGameMock.data)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Request failed')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: GetUserStatsForGameParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      await expect(
        steamUserStatsService.getUserStatsForGame(params)
      ).rejects.toThrow(error)
    })
  })

  describe('getPlayerAchievements', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(playerAchievementResponseMock)

      const params: GetPlayerAchievementsParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      await steamUserStatsService.getPlayerAchievements(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001',
        {
          steamid: '123456',
          appid: 440,
          l: 'en',
        }
      )
    })

    it('should return the response data', async () => {
      jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(playerAchievementResponseMock)

      const params: GetPlayerAchievementsParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      const data = await steamUserStatsService.getPlayerAchievements(params)

      expect(data).toEqual(playerAchievementResponseMock)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Failed to get player achievements')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: GetPlayerAchievementsParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      await expect(
        steamUserStatsService.getPlayerAchievements(params)
      ).rejects.toThrow(error)
    })

    it('should throw an error if the player profile is private', async () => {
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

      const params: GetPlayerAchievementsParams = {
        steamid: '123456',
        appid: 440,
        language: 'en',
      }

      await expect(
        steamUserStatsService.getPlayerAchievements(params)
      ).rejects.toThrow('The player profile is not public')
    })
  })
})
