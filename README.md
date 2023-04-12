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
- [x] Get Friend List

### User Stats

- [x] Get Player Achievements
- [x] Get Global Achievements Percentages For App
- [x] Get User Stats For Game

## Installation

```bash
npm install @varandas/steam
```

## Usage

```javascript
const { SteamClient, SteamNewsService } = require('@varandas/steam')

// Or with ES6 imports
// import { SteamClient, SteamNewsService } from '@varandas/steam';

// Create a new client, this will be used by all services
const client = new SteamClient('YOUR_API_KEY')
// Create a new service, passing the client
const newsService = new SteamNewsService(client)

// Wrap the call in an async function, so we can use await on the service call on this example
// You can also use .then() and .catch() if you prefer
;(async () => {
  // Call the service, passing the parameters, all parameters and response are typed
  const news = await newsService.getNewsForApp({
    appid: 440,
    count: 3,
    maxlength: 300,
  })

  console.log(news)
})()
```

## Documentation

#### SteamClient

```javascript
// Create a new client, this will be used by all services
const client = new SteamClient('YOUR_API_KEY')
```

#### SteamNewsService

```javascript
// Create a new service, passing the client
const newsService = new SteamNewsService(client)

// Get News For App
const news = await newsService.getNewsForApp({
  appid: 440,
  count: 3,
  maxlength: 300,
})
```

#### SteamUserService

```javascript
// Create a new service, passing the client
const userService = new SteamUserService(client)

// Get Player Summaries
const users = await userService.getPlayerSummaries({
  steamids: ['76561198000000000', '76561198000000001'],
})

// Get Friend List
const friends = await userService.getFriendList({
  steamid: '76561198000000000',
  relationship: 'all',
})
```

#### SteamUserStatsService

```javascript
// Create a new service, passing the client
const userStatsService = new SteamUserStatsService(client)

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

#### SteamPlayerService

```javascript
// Create a new service, passing the client
const playerService = new SteamPlayerService(client)

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
