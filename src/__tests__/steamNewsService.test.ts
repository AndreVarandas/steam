import { SteamNewsService } from '../services/steamNewsService'
import { SteamClient } from '../steamClient'

describe('SteamNewsService', () => {
  const steamClient = new SteamClient('API_KEY')
  const steamNewsService = new SteamNewsService(steamClient)

  test('should return news for a given app', async () => {
    const response = await steamNewsService.getNewsForApp({
      appid: 440,
      count: 3,
      maxlength: 300,
    })
    expect(response.appnews.appid).toBe(440)
    expect(response.appnews.newsitems.length).toBe(3)
  })
})
