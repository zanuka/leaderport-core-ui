# LeaderPort

Elevating Heroes, Immortalizing Legends :crossed_swords: [leaderport.ai](https://leaderport.ai)

![LeaderPort](images/LeaderPort_256x256.png)

LeaderPort is a real-time leaderboard system concept. Built with [Vue.js](https://vuejs.org/), [Hono](https://hono.dev/), [Bun](https://bun.sh/), and [Valkey](https://valkey.io), it leverages modern TypeScript-first technologies to deliver a high-performance, full-stack leaderboard solution.

The initial prototype will be launched as a browser extension in 2025, supporting Chrome, Firefox, and Safari. This MVP aims to ensure seamless functionality across all major browsers, providing a consistent user experience regardless of the platform. 

If successful, work will continue towards developing a full-fledged SaaS platform. This will include additional features and enhancements based on user feedback and market demand, ensuring LeaderPort remains at the forefront of real-time leaderboard solutions.

By combining Valkey's in-memory data storage with Hono's efficient routing and Bun's superior runtime 
performance, LeaderPort enables instant updates and retrieval of leaderboard data, making it ideal for applications requiring real-time ranking and score tracking across millions of users.

## Mission Statement
LeaderPort is your universal gateway to real-time rankings and leaderboards, transforming raw data into actionable insights across sports, markets, and competitive landscapes.


## Chrome Extension Strategy

LeaderPort's Chrome extension leverages powerful APIs to provide real-time data visualization and insights. Key features include:

- **Data Extraction**: Uses `chrome.scripting` to inject scripts and extract data from sites like NBA.com.
- **Data Storage**: Utilizes `chrome.storage` for caching and user preferences.
- **Visualization**: Integrates Highcharts for interactive charts and dashboards.
- **Real-time Updates**: Employs `chrome.alarms` for scheduled data refreshes.
- **User Interaction**: Displays data in a `chrome.sidePanel` for easy access.

For a detailed strategy, refer to the [Extension Strategy](./docs/extension-strategy.md).

## Project Roadmap

For a detailed overview of our development phases, milestones, and future plans, please refer to the [Roadmap](./docs/roadmap.md).


## Project Plan

For a detailed checklist of our milestones and deliverables, please refer to the [Plan](./docs/plan.md).


## Leaderboard Use Cases

Primarily designed for games and competitive apps, but it can be easily applied to other domains:
- Sports Analytics: Real-time stats and rankings for professional leagues (e.g., NFL, NBA, MLB, NHL)
- Education and E-learning: Track student progress and achievements in online courses
- Fitness and Health Tracking: Monitor user rankings for steps taken, calories burned, or workout streaks
- Sales and Marketing Performance: Showcase top performers or most effective marketing campaigns
- Web Analytics: Real-time tracking of website metrics, user engagement, and content performance

## Valkey: A data store and more

I've selected Valkey primarily for its speed, scalability, and real-time capabilities. Official [Valkey GitHub](https://github.com/valkey-io)

Key advantages of Valkey include:

- **High Performance**: Valkey is designed for speed, ideal for real-time leaderboard updates and score retrievals.
- **Versatile Data Structures**: supports various [data types](https://valkey.io/topics/data-types/) including sorted sets, perfect for managing rankings.
- **In-Memory Processing**: provides low latency for read / write operations, crucial for a leaderboard.
- **Scalability**: [Valkey Cluster](https://valkey.io/topics/cluster-tutorial/), allows our system to scale as the user base grows.
- **Built-in Replication**: [replication](https://valkey.io/topics/replication/) features ensure high availability to prevent leaderboard downtime.
- **Lua Scripting Support**: Complex operations can be optimized via [Lua scripting capabilities](https://valkey.io/topics/eval-intro/).
- **Active Community**: vibrant [open-source community](https://valkey.io/connect/) ensures ongoing development and support.
- **Compatibility**: [Redis fork](https://github.com/valkey-io/valkey) maintains compatibility with existing clients and tools; win.

For more detailed information about Valkey and its capabilities, please visit the [Valkey Introduction](https://valkey.io/topics/introduction/). This comprehensive guide provides an in-depth look at Valkey's features, architecture, and use cases, helping you understand why it's an excellent choice for high-performance, scalable applications like LeaderPort.


## Vue.js: The Progressive JavaScript Framework

I've been building apps with Vue.js for the past 4 years, and think it's a fantastic framework. 

Key advantages of Vue include:

- **Best of Both Worlds**: Combines Angular's structure with React's flexibility.
- **Performance**: Lightweight with efficient rendering for fast, responsive leaderboards.
- **Reactive Data Binding**: Keeps UI in sync with data, perfect for real-time updates.
- **Composition API**: Improves code organization and reusability.
- **TypeScript Support**: Enhances code quality and developer productivity.
- **Vue DevTools**: Powerful debugging and performance tuning.
- **Scalability**: Supports both small and large-scale applications.
- **Easy Learning Curve**: Accessible for new contributors.
- **Strong Ecosystem**: Provides all tools needed for a full-featured SPA.
- **Go API Integration**: Ideal front-end partner for a Go back end.
- **Single-File Components**: Promotes clean, maintainable code structure.
- **Built-in Transition System**: Creates smooth animations for changing leaderboards.


## React: The Popular JavaScript Framework

I think it's also essential to support React, known for its performance, scalability, and developer productivity.

Key advantages of React include:

- **Large Ecosystem**: Extensive library of components and tools
- **Virtual DOM**: Efficient rendering and updates
- **Component-Based**: Modular and reusable code structure
- **JSX**: Intuitive templating with JavaScript
- **Rich Developer Tools**: Powerful debugging with React DevTools
- **Strong TypeScript Support**: First-class type safety
- **Server Components**: Advanced server-side rendering capabilities
- **Meta Framework Support**: Next.js, Remix, and more
- **Battle-Tested**: Production-proven at scale
- **Active Community**: Regular updates and improvements


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
- Implement a sorted set in Valkey to maintain the leaderboard.
- Use Valkey's atomic operations for accurate, concurrent score updates.

### Caching
- Cache frequently accessed leaderboard segments in Valkey for fast retrieval.

### Real-time Updates
- Implement a WebSocket connection to push leaderboard changes to connected clients.

### Rate Limiting
- Use Valkey to implement rate limiting on score submissions to prevent cheating.

## Primary v1 Goals

The first version of the LeaderPort product will include: 

1. Full-stack TypeScript implementation with Hono, Vue, and React
2. TanStack integration for robust data management
3. Natural language querying capabilities
4. Real-time updates via WebSocket
5. Valkey integration for high-speed operations

## Future Expansion

In future iterations, we can expand this prototype with features like:

- Player profiles
- Multiple leaderboards
- Time-based competitions

These additional features would further explore Valkey's capabilities and showcase its versatility in game development scenarios. The leaderboard should be useful for game developers, hobbyists, and projects that require high-performance web applications.

   
## Technical Details

On the front end, LeaderPort will offer a responsive Single Page Application (SPA) designed for optimal performance across both mobile and desktop browsers. The UX would include a simple interface to display the leaderboard and allow score submissions. The demo will showcase real-time updates as scores change.

### Detailed Front-end Guides

- design, architecture, and implementation examples can be found in [Front-end Details](./docs/frontend-details.md)
- detailed information on Pinia and PiniaColada, refer to [Front-end State Management](./docs/state-management.md)
- for installing and configuring the front-end, please refer to our [Front-end Setup Guide](./docs/frontend-setup.md)
- integration patterns for alien-signals and Valkey can be found in [TanStack + Valkey Integration](./docs/tanstack-valkey-hono.md)

### Back-end Architecture & Stack

- **Hono**: Modern framework for building Go APIs, providing clean and declarative endpoint definitions.
- **Bun**: Superior runtime performance for Go applications.
- **TypeScript**: Enhancing code quality and developer experience with static typing.
- **Drizzle ORM**: Database ORM for TypeScript, providing a type-safe and efficient way to interact with databases.
- **WebSocket**: Protocol for real-time, bidirectional communication between clients and server.
- **go-redis**: Redis client for Go, facilitating interaction with Valkey.
- **Middleware**: Custom middleware for rate limiting and request validation.
- **Error Handling**: Utilizing Huma's error handling capabilities for consistent API responses.
- **Configuration Management**: Uses Huma's config system for managing environment-specific settings.
- **Dependency Injection**: Structuring the application for better testability and modularity.

### Detailed Back-end Guides
- design, architecture, and implementation examples can be found in [Back-end Details](./docs/backend-details.md)
- detailed info on back-end infrastructure setup is located in our [Back-end Setup Guide](./docs/backend-setup.md)

## Tech Stack Details

- Front-end Stack:
  - Vue 3 with Composition API
  - TypeScript
  - TanStack Suite:
    - Query (for data management)
    - Table (for leaderboard display)
    - Form (for type-safe forms)
    - Router (for routing)
  - Vite (for build tooling)
- Back-end Stack:
  - Hono (for API and SSR)
  - Bun (for runtime)
  - TypeScript
  - Drizzle ORM (for database operations)
- Database:
  - Valkey (AWS's Redis fork)
- Cloud Infrastructure:
  - AWS (EC2 or ECS for hosting)
  - Amazon ElastiCache for Valkey
  - S3 (for static asset hosting)
- CI/CD:
  - GitHub Actions
- Additional:
  - WebSocket (for real-time updates)
  - Docker (for containerization)
  - OpenAI (for natural language leaderboard queries)


## Contributors

LeaderPort welcomes contributions. This project aims to provide a robust, scalable leaderboard solution that game developers can easily integrate into their projects.

### How You Can Contribute

1. **Feature Development**: Add new features or enhance existing ones.
2. **Bug Fixes**: Help identify and resolve issues.
3. **Documentation**: Improve our docs to help others integrate LeaderPort.
4. **Testing**: Expand our test coverage and improve test scenarios.
5. **Performance Optimization**: Help make LeaderPort even faster and more efficient.

### Benefits for the Gaming Community

- **Open-Source Advantage**: Free, customizable leaderboard solution.
- **Learning Opportunity**: Great project for developers to learn modern web technologies.
- **Community-Driven**: Features and improvements guided by real-world needs.
- **Integration Ready**: Easily adaptable for various game types and platforms.

## Roadmap

### Initial Prototype Features
We will focus on the following features for Phase 1 prototype 
- Real-time updates using WebSockets
- Efficient data management with Valkey
- Responsive Vue 3 front end with TypeScript
- Scalable Go back end using Huma
- Easy deployment on AWS infrastructure

### Release Milestones
  1. Launch the npm package with core features.
  2. Develop a hosted version for enterprises (e.g., leaderboard-as-a-service).
  3. Expand into additional SDKs (Ruby, Flutter, Lua) based on developer interest.
  
### Future Features
 Integrate with **blockchain** or NFT-based systems for gamified economies or decentralized scoring systems.
For a detailed breakdown of our development phases and upcoming features, please check our [Roadmap](./docs/roadmap.md).


## The origin of LeaderPort

Core Definition:
"LeaderPort is your universal gateway to real-time rankings and leaderboards, transforming raw data into actionable insights across sports, markets, and competitive landscapes."

Key Messaging Points:
- The "Port" in LeaderPort suggests both a gateway/portal and a place where important information docks/arrives
- It serves as a central hub where different types of leadership data converge
- Works across multiple domains:
  • Sports: "Track champions across every league"
  • Markets: "Monitor market movers and top performers"
  • Crypto: "Real-time crypto rankings and momentum"
  • Education: "Leadership boards for learning achievements"
  • Fitness: "Top performer tracking for health goals"
  • Business: "Sales leaderboards and performance metrics"

Sample Description:
"LeaderPort transforms your browser into a command center for real-time rankings. Whether you're tracking top-performing stocks, leading sports scores, trending cryptocurrencies, or competitive metrics, LeaderPort serves as your all-in-one portal to performance leadership. With customizable dashboards and instant updates, you'll always know what's leading the pack across any domain that matters to you."

Marketing Hook:
"In a world of endless data, LeaderPort is your compass to what's winning. From Wall Street to the World Series, never miss a leader in motion."


## Author

The LeaderPort project was conceptualized on the evening of October 12, 2024 by [zanuka](https://github.com/zanuka) and will be in active development with the goal of launching Phase 1 by January 2025. I'm still trying to figure out what the heck I'm doing on a daily basis so... stay tuned!

- GitHub: [@zanuka](https://github.com/zanuka)
- LinkedIn: [Mike Delucchi](https://www.linkedin.com/in/zanuka)
- Project Site: [leaderport.ai](https://leaderport.ai)

## Artwork

The artwork I featured in this project was generated using DALL-E, powered by [OpenAI's](https://www.openai.com/) [ChatGPT-4](https://openai.com/chatgpt) 

## Framework Support & CLI Strategy

LeaderPort provides a flexible CLI tool that empowers developers to create leaderboard projects with their preferred framework. Our strategy focuses on framework-agnostic core functionality with framework-specific implementations.

### Supported Frameworks
- Vue.js
- React
- VanillaJS
- Svelte
- Angular

### CLI Architecture
The `leaderport-cli` employs a modular template system that:
- Maintains separate starter templates for each framework
- Shares core leaderboard logic across all implementations
- Provides consistent developer experience regardless of framework choice

### Getting Started

```bash
# Install the CLI globally
npm install -g leaderport-cli

# Create a new project
leaderport create my-leaderboard

# Follow the interactive prompts to:
# 1. Select your preferred framework
# 2. Choose leaderboard features
# 3. Configure initial settings
```

### Template Structure
Each framework template includes:
- Pre-configured build tools
- TypeScript support
- Testing setup
- Real-time WebSocket integration
- Valkey connection utilities
- Framework-specific component architecture
- Documentation and examples

### Maintenance Strategy
To ensure consistent quality across all framework implementations:
- Core leaderboard logic remains framework-agnostic
- Feature parity is maintained across all frameworks
- Updates are rolled out simultaneously
- Each framework implementation receives dedicated testing
- Community contributions are welcomed for all frameworks

## Getting Started

To create a new LeaderPort project, use our CLI:

```bash
# Install the CLI globally

```


