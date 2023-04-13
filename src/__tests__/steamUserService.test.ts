import { SteamUserService } from '../services/steamUserService'
import { SteamClient } from '../steamClient'
import {
  IGetFriendListParams,
  IGetPlayerSummariesParams,
} from '../types/ISteamUser'
import { friendListMock } from './mocks/friendList.mock'
import { playerSummariesMock } from './mocks/playerSummaries.mock'

jest.mock('../steamClient')

describe('SteamUserService', () => {
  let steamClient: SteamClient
  let steamUserService: SteamUserService

  beforeEach(() => {
    steamClient = new SteamClient('API_KEY')
    steamUserService = new SteamUserService(steamClient)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getPlayerSummaries', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(playerSummariesMock.data)

      const params: IGetPlayerSummariesParams = {
        steamids: ['123', '456'],
        format: 'json',
      }

      await steamUserService.getPlayerSummaries(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
        {
          steamids: '123,456',
          format: 'json',
        }
      )
    })

    it('should return the response data', async () => {
      jest.spyOn(steamClient, 'get').mockResolvedValue(playerSummariesMock.data)

      const params: IGetPlayerSummariesParams = {
        steamids: ['123', '456'],
        format: 'json',
      }

      const data = await steamUserService.getPlayerSummaries(params)

      expect(data).toEqual(playerSummariesMock.data.response.players)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Request failed')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: IGetPlayerSummariesParams = {
        steamids: ['123', '456'],
        format: 'json',
      }

      await expect(steamUserService.getPlayerSummaries(params)).rejects.toThrow(
        error
      )
    })
  })

  describe('getFriendList', () => {
    it('should call SteamClient.get with correct arguments', async () => {
      const getSpy = jest
        .spyOn(steamClient, 'get')
        .mockResolvedValue(friendListMock)

      const params: IGetFriendListParams = {
        steamid: '123456',
        relationship: 'all',
        format: 'json',
      }

      await steamUserService.getFriendList(params)

      expect(getSpy).toHaveBeenCalledWith(
        'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/',
        {
          steamid: '123456',
          relationship: 'all',
          format: 'json',
        }
      )
    })

    it('should return the response data', async () => {
      jest.spyOn(steamClient, 'get').mockResolvedValue(friendListMock)

      const params: IGetFriendListParams = {
        steamid: '123456',
        relationship: 'all',
        format: 'json',
      }

      const data = await steamUserService.getFriendList(params)

      expect(data).toEqual(friendListMock.friendslist.friends)
    })

    it('should throw an error if request fails', async () => {
      const error = new Error('Request failed')
      jest.spyOn(steamClient, 'get').mockRejectedValue(error)

      const params: IGetFriendListParams = {
        steamid: '123456',
        relationship: 'all',
        format: 'json',
      }

      await expect(steamUserService.getFriendList(params)).rejects.toThrow(
        error
      )
    })
  })
})
