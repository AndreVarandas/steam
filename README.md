# Steam

[![Node.js CI](https://github.com/AndreVarandas/steam/actions/workflows/node.js.yml/badge.svg)](https://github.com/AndreVarandas/steam/actions/workflows/node.js.yml) [![codecov](https://codecov.io/gh/AndreVarandas/steam/branch/main/graph/badge.svg?token=JDDDDK5A04)](https://codecov.io/gh/AndreVarandas/steam) [![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Interface to the [Steam Web API](https://steamcommunity.com/dev), fully typed, written in TypeScript. (Wrapper for the Steam Web API)

![Steam](extra/steam-logo.jpg)

Valve provides these APIs so website developers can use data from Steam in new and interesting ways. They allow developers to query Steam for information that they can present on their own sites.

The Steam Web API is a RESTful web service designed to be called from a web browser using JavaScript, or from a server using a standard HTTP library.

> I designed this library to make it easy to use the Steam Web API in your projects - Contributions are more than welcome! Feel free to submit your ideas by opening a new issue or creating a Pull Request.

## Features / Roadmap

- [x] News
- [x] Player
- [x] User
- [x] User Stats

### News

- [x] Get News For App

### Player

- [x] Get Owned Games
- [x] Get Recently Played Games

### User

- [x] Get PlayerSummaries
- [x] Get IFriend List

### User Stats

- [x] Get Player Achievements
- [x] Get Global Achievements Percentages For App
- [x] Get User Stats For Game

## Installation

```bash
# With npm
npm install @varandas/steam

# Or with yarn
yarn add @varandas/steam
```

## Usage

Please note that you need to [register](https://steamcommunity.com/dev/apikey) for a Steam Web API key.

Also be aware that the Steam Web API only works on a node environment. **Requests made from the browser will fail.**

**With es6 modules**

```javascript
import SteamApi, { IGetNewsForAppParams, IGetNewsForAppResponse } from '@varandas/steam'

// Create a new client
const steamApi = new SteamApi("YOUR_STEAM_API_KEY")

// Get the services as needed
const newsService = steamApi.getNewsService()
const playerService = steamApi.getPlayerService()
const userService = steamApi.getUserService()
const userStatsService = steamApi.getUserStatsService()
```

**Or with commonjs**

```javascript
const SteamApi = require('@varandas/steam').default
```

## Documentation

#### SteamApi

```javascript
// Main class, use it to create the services. 
const steamApi = new SteamApi("YOUR_STEAM_API_KEY")
```

#### News Service

```javascript
// Get the news service from the client
const newsService = steamApi.getNewsService()

// Get News For App
const news = await newsService.getNewsForApp({
  appid: 440,
  count: 3,
  maxlength: 300,
})
```

#### User Service

```javascript
// Get the user service
const userService = steamApi.getUserService()

// Get Player Summaries
const users = await userService.getPlayerSummaries({
  steamids: ['76561198000000000', '76561198000000001'],
})

// Get IFriend List
const friends = await userService.getFriendList({
  steamid: '76561198000000000',
  relationship: 'all',
})
```

#### User Stats Service

```javascript
// Get the user stats service
const userStatsService = steamApi.getUserStatsService()

// Get Player Achievements
const achievements = await userStatsService.getPlayerAchievements({
  steamid: '76561198000000000',
  appid: 440,
})

// Get Global Achievements Percentages For App
const achievements = await userStatsService.getGlobalAchievementsPercentagesForApp({
  gameid: 440,
})

// Get User Stats For Game
const stats = await userStatsService.getUserStatsForGame({
  steamid: '76561198000000000',
  appid: 440,
})
```

#### Player Service

```javascript
// Get the player service
const playerService = steamApi.getPlayerService()

// Get Owned Games
const games = await playerService.getOwnedGames({
  steamId: '76561198000000000',
  includeAppInfo: true,
  includePlayedFreeGames: true,
})

// Get Recently Played Games
const games = await playerService.getRecentlyPlayedGames({
  steamid: '76561198000000000',
  count: 3,
})
```

## License

[MIT - 2023 André Varandas](LICENSE)

## Disclaimer

This project is not affiliated with Valve Corporation or Steam. All trademarks are property of their respective owners in the US and other countries.
©2023 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.
