# LeaderPort

![LeaderPort](images/LeaderPort_256x256.png)

[LeaderPort](https://leaderport.ai) combines cutting-edge Web3 technologies to create powerful leaderboard solutions that track and immortalize achievements. By leveraging blockchain technology, every record and milestone is permanently preserved, creating an immutable legacy of excellence in Web3.

<img src="images/Sui_Logo_White.svg" alt="Sui" width="48" />

This modern leaderboard platform and browser extension suite will be built on [Sui](https://sui.io/), the first internet-scale programmable blockchain platform. 

## Achievement System

1. **Permanent Record Keeping**
   - Immutable blockchain storage of significant achievements
   - Historical leaderboards preserved indefinitely
   - Verifiable proof of accomplishment
   - Cross-platform achievement persistence

2. **NFT Achievement System with SuiFrens**
   - Dynamic NFT minting for major milestones
   - Rarity tiers based on achievement difficulty
   - Tradeable digital collectibles
   - Achievement showcase functionality
   - SuiFrens Integration:
     - Customizable SuiFren characters as achievement badges
     - Progressive trait unlocks based on milestones
     - Community-driven rarity system
     - Cross-platform achievement display
     - Interoperable with SuiFrens ecosystem

Please reference the [SuiFrens Integration](docs/sui-frens.md) doc for detailed implementation info.

3. **Community Validation**
   - Decentralized verification of major records
   - Community voting on achievement authenticity
   - Transparent validation processes
   - Anti-cheat mechanism integration
   
Please reference the [Web3 vision](docs/web3-vision.md) doc for more detailed info.

## Storage with Walrus

<img src="images/walrus.png" alt="Sui" width="128" />

LeaderPort products will use [Walrus](https://docs.walrus.site/) for decentralized storage of achievement data and related assets. Walrus is specifically designed for storing large binary files ("blobs") on the Sui network.

### Key Features
- Decentralized storage with Sui blockchain integration
- Cost-efficient storage using advanced erasure coding
- Public accessibility of stored data
- Native WAL token integration for storage payments

### Important Notes
- All stored data is public and discoverable
- Currently in Testnet phase - not recommended for production use
- Uses Testnet WAL and SUI tokens (no real value)
- Storage state may be wiped during Testnet

### Potential Use Cases
- Storing achievement badges/images
- Backing up achievement metadata
- Storing leaderboard historical data

### Setup Requirements
1. Testnet WAL tokens for storage operations
2. Integration with Sui wallet for transactions
3. Proper error handling for storage operations

## Browser Extension Strategy

LeaderPort's browser extensions will leverage public APIs the backend will provide real-time data visualization and insights.

- **Data Integration**: Connects to LeaderPort's backend API which aggregates data from official sources 
- **Smart Caching**: Utilizes `chrome.storage` for data caching and user prefs, respecting subscription tiers
- **Interactive Visualization**: Integrates Highcharts for professional-grade charts and dashboards
- **Real-time Updates**: SSE/WebSocket connections for live data streaming based on subscription level
- **User Interface**: Displays data in a `chrome.sidePanel` with progressive loading and offline support
- **Subscription Management**: Handles user authentication and feature access based on subscription tier

For a detailed strategy and API integration details, refer to the [Sports Data Integration Guide](./docs/sports-data.md).

For development workflow, refer to [Extension Development](./docs/extension-dev.md)

## Project Plan & Roadmap

The initial prototype will be launched as a browser extension in 2025, supporting Chrome, Firefox, and Safari. This MVP aims to ensure seamless functionality across all major browsers, providing a consistent user experience regardless of the platform. 

If successful, work will continue towards developing a full-fledged SaaS platform. This will include additional features and enhancements based on user feedback and market demand, ensuring LeaderPort remains at the forefront of real-time leaderboard solutions.

For a detailed overview of our development phases, milestones, and future plans, please refer to the [Roadmap](./docs/roadmap.md).


## Leaderboard Use Cases

Primarily designed for games and competitive apps, but it can be easily applied to other domains:
- Sports Analytics: Real-time stats and rankings for professional leagues (e.g., NFL, NBA, MLB, NHL)
- Education and E-learning: Track student progress and achievements in online courses
- Fitness and Health Tracking: Monitor user rankings for steps taken, calories burned, or workout streaks
- Sales and Marketing Performance: Showcase top performers or most effective marketing campaigns
- Web Analytics: Real-time tracking of website metrics, user engagement, and content performance


## Key Features to LeaderPort

1. Real-time Leaderboard Updates
   - WebSocket integration for instant score changes
   - TanStack Query for efficient data management
   - Smooth animations for rank changes

2. Natural Language Queries
   - Chat with your leaderboard using GPT-4
   - Stream responses in real-time
   - Query complex statistics naturally

3. Responsive Design
   - Mobile-first approach with desktop enhancements
   - Adaptive layouts for various screen sizes

4. Player Profile Cards
   - Quick view of player stats and achievements
   - Social sharing capabilities

5. Multiple Leaderboard Views
   - Global rankings
   - Friend leaderboards
   - Time-based competitions (daily, weekly, monthly)

6. Search and Filters
   - Find specific players or filter by various criteria

### Leaderboard Logic
- Implement a sorted set in Redis to maintain the leaderboard
- Use Redis's atomic operations for accurate, concurrent score updates

### Caching
- Cache frequently accessed leaderboard segments in Redis for fast retrieval

### Rate Limiting
- Use Redis to implement rate limiting on score submissions to prevent cheating

## Primary v1 Goals

The first version of the LeaderPort product will include: 

1. TypeScript implementation leveraging [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit?ref=blog.sui.io)
2. TanStack integration for robust data management
3. Natural language querying capabilities
4. Real-time updates via WebSocket
5. Hybrid storage architecture:
   - Sui blockchain for secure score management
   - Walrus integration for decentralized media storage
6. High-performance backend stack:
   - Hono for efficient API routing
   - Bun runtime for optimal performance
   - Sui parallel transaction processing
7. Scalable data management system capable of handling millions of concurrent users

## Future Expansion

In future iterations, we can expand this prototype with features like:

- Player profiles
- Multiple leaderboards
- Time-based competitions

These additional features would further explore capabilities and showcase its versatility in game development scenarios. The leaderboard should be useful for game developers, hobbyists, and projects that require high-performance web applications.

   
## Technical Details

On the front end, LeaderPort will offer a responsive Single Page Application (SPA) designed for optimal performance across both mobile and desktop browsers. The UX would include a simple interface to display the leaderboard and allow score submissions. The demo will showcase real-time updates as scores change.

## Tech Stack Details

- Front-end Stack:
  - React with [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) (for on-chain features)
  - TypeScript
  - TanStack Suite:
    - Query (for data management)
    - Table (for leaderboard display)
    - Form (for type-safe forms)
    - Router (for routing)
  - Vite (for build tooling)
  - Sui SDK Dependencies:
    - @mysten/dapp-kit ^0.14.44
    - @mysten/sui ^1.18.0
    - @tanstack/react-query ^5.62.10
- Back-end Stack:
  - Hono (for API and SSR)
  - Bun (for runtime)
  - TypeScript
  - Drizzle ORM (for database operations)
- Database:
  - Redis
- Cloud Infrastructure:
  - AWS (EC2 or ECS for hosting)
  - Amazon ElastiCache for Redis
  - S3 (for static asset hosting)
- CI/CD:
  - GitHub Actions
- Additional:
  - WebSocket (for real-time updates)
  - Docker (for containerization)
  - OpenAI (for natural language leaderboard queries)

## Open-Source & Paid Feature Strategy

LeaderPort will follow a "public core, private premium" development strategy:

**Public Core (GitHub)**
- Basic leaderboard functionality
- Standard browser extension features
- Core UI components
- Basic data visualization
- Community-driven improvements
- MIT licensed

**Premium Features (Private)**
- Advanced analytics
- Real-time professional sports data
- Custom theming engine
- Advanced data visualization
- Enterprise-grade support
- Additional premium features

Both public (open-source) core repositories will be hosted on GitHub, while premium feature repositories will be hosted on GitLab. 

This "hybrid" approach maximizes benefits:

1. **Visibility**: Leverage GitHub's larger open-source community
2. **Separation**: Natural boundary between public and private code
3. **Security**: Private code remains isolated on GitLab
4. **Community**: Better engagement through GitHub's social features

The minor overhead of managing two platforms is outweighed by the benefits of GitHub's open-source ecosystem for public repositories while maintaining premium features secure and separate.

More details [here](docs/public-private-repos.md).

## The origin of LeaderPort

Core Definition: LeaderPort is your universal gateway to real-time rankings and leaderboards, transforming raw data into actionable insights across sports, markets, and competitive landscapes.

Key Messaging Points:
- The "Port" in LeaderPort suggests both a gateway/portal and a place where important information docks/arrives
- It serves as a central hub where different types of leadership data converge
- Works across multiple domains:
  - Sports: "Track champions across every league"
  - Markets: "Monitor market movers and top performers"
  - Crypto: "Real-time crypto rankings and momentum"
  - Education: "Leadership boards for learning achievements"
  - Fitness: "Top performer tracking for health goals"
  - Business: "Sales leaderboards and performance metrics"

Product Description: LeaderPort transforms your browser into a command center for real-time rankings. Whether you're tracking top-performing stocks, leading sports scores, trending cryptocurrencies, or competitive metrics, LeaderPort serves as your all-in-one portal to performance leadership. With customizable dashboards and instant updates, you'll always know what's leading the pack across any domain that matters to you.

Marketing Hook: In a world of endless data, LeaderPort is your compass to what's winning. From Wall Street to the World Series, never miss a leader in motion.

## Development and Builds

### Accessing Built Extensions
After each successful GitHub Action workflow run, extension packages are available in two ways:

1. **Via GitHub Actions UI**:
   - Navigate to the [Actions tab](https://github.com/zanuka/leaderport-core-ui/actions)
   - Click on the latest workflow run
   - Scroll to the "Artifacts" section
   - Download the desired browser extension:
     - `chrome-extension.zip`
     - `firefox-extension.zip`
     - `edge-extension.zip`
     - `opera-extension.zip`

2. **Via GitHub API**:
   ```
   https://api.github.com/repos/zanuka/leaderport-core-ui/actions/artifacts
   ```

Note: Built artifacts are retained for 5 days before automatic deletion.

### Local Development
For local development instructions, refer to [Extension Development](./docs/extension-dev.md)

## Contributing

We welcome contributions from developers interested in Web3, Sui blockchain development, and real-time data visualization! 

### Getting Started

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Prerequisites

- Node.js 18+
- Bun runtime
- Understanding of React, TypeScript, and Web3 concepts
- (Optional) Familiarity with Sui Move programming

### Rewards for Contributors

- Get early access to premium features
- Earn contributor NFTs on Sui network
- Join our featured contributors list
- Opportunity to become a core maintainer

We believe in fostering an inclusive and welcoming environment for all contributors. Whether you're fixing a bug, improving documentation, or adding a new feature, your help is appreciated!

### License

This project is licensed under the [Apache License, Version 2.0](LICENSE).

Copyright (c) 2024-present, Mike Delucchi - Zanuka Labs LLC.


