import { SteamNewsService } from './services/steamNewsService'
import { SteamPlayerService } from './services/steamPlayerService'
import { SteamUserService } from './services/steamUserService'
import { SteamUserStatsService } from './services/steamUserStatsService'
import { SteamClient } from './steamClient'

// Export all types
export * from './types/ISteamNews'
export * from './types/ISteamPlayer'
export * from './types/ISteamUser'
export * from './types/ISteamUserStats'

/**
 * SteamApi is the main class of the library.
 *
 * It provides access to all the services.
 */
export default class SteamApi {
  private readonly client: SteamClient
  private readonly newsService: SteamNewsService
  private readonly userService: SteamUserService
  private readonly userStatsService: SteamUserStatsService
  private readonly playerService: SteamPlayerService

  constructor(apiKey: string) {
    this.client = new SteamClient(apiKey)
    this.newsService = new SteamNewsService(this.client)
    this.userService = new SteamUserService(this.client)
    this.userStatsService = new SteamUserStatsService(this.client)
    this.playerService = new SteamPlayerService(this.client)
  }

  public getNewsService() {
    return this.newsService
  }

  public getUserService() {
    return this.userService
  }

  public getUserStatsService() {
    return this.userStatsService
  }

  public getPlayerService() {
    return this.playerService
  }
}
