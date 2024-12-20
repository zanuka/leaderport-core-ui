# Sports Data Sources

This document provides a list of publicly available data sources and APIs for sports statistics, focusing on leagues like the NBA and NFL.

## Official League APIs

- **NBA Stats API**: The NBA provides a public API offering a wide range of statistics and data. While not officially documented, community resources and libraries can help access this data. [NBA Stats API](https://www.nba.com/stats/)
- **NFL APIs**: The NFL does not provide a public API, but third-party services and unofficial APIs offer NFL data. [NFL Stats](https://www.nfl.com/stats/)

## Third-Party Sports Data Providers

- **SportsRadar**: Offers comprehensive sports data, including real-time scores and statistics. Provides APIs for various sports, including basketball and football. Note: SportsRadar is a paid service. [Visit SportsRadar](https://developer.sportradar.com/)
- **The Sports DB**: A community-driven database of sports data, including scores and statistics. Offers a free API for non-commercial use. [Visit The Sports DB](https://www.thesportsdb.com/api.php)
- **ESPN API**: While not officially public, ESPN's data can be accessed through their API endpoints, though this may require reverse engineering and comes with legal risks. [ESPN Developer Center](https://www.espn.com/apis/devcenter/docs/)

## Open Data Platforms

- **DataHub**: Provides datasets on various topics, including sports. You can find datasets related to sports statistics and scores. [Visit DataHub](https://datahub.io/collections/sports-data)
- **Kaggle**: A platform for data science competitions that hosts a variety of datasets, including sports statistics. Useful for historical data analysis and prototyping. [Browse Sports Datasets on Kaggle](https://www.kaggle.com/search?q=sports+in%3Adatasets)

## Community and Open Source Projects

- **GitHub Repositories**: Numerous open-source projects on GitHub provide access to sports data. Search for "NBA API" or "NFL API" for useful libraries and tools. [Browse Sports Data Projects](https://github.com/topics/sports-data)
- **Awesome Sports Datasets**: A curated list of sports datasets available on GitHub, including links to various data sources and APIs. [Awesome Sports Data](https://github.com/jokecamp/awesome-sports-data)

## Web Scraping (with Caution)

- If suitable APIs are unavailable, web scraping can be an option for gathering sports data. Ensure compliance with legal and ethical guidelines.

## Considerations

- **API Access and Costs**: Some APIs may require a subscription or have usage limits. Evaluate costs and terms of use before integration.
- **Data Accuracy and Timeliness**: Ensure the data source provides accurate and up-to-date information, especially for real-time applications.
- **Legal Compliance**: Review terms of service and legal agreements associated with any data source to ensure compliance.

## RESTful & Push Integration

### Sportradar API Integration Example

Sportradar's NBA API provides both RESTful endpoints and Push feeds for real-time data. Here's how to get started:

#### Prerequisites
- Sportradar API account and authentication credentials
- Support for TLS 1.2 or above
- Ability to handle HTTP redirects

#### Data Retrieval Flow
1. **Initial Setup**: Start with the Schedule or Teams endpoint to get team IDs
2. **Team Data**: Use team IDs to access Team Profile data
3. **Player Data**: Extract player IDs from team profiles to access individual Player Profiles
4. **Game Data**: Use game IDs from schedules to access live game data

#### Push Feed Integration
For real-time updates, Sportradar provides Push feeds that establish a streaming connection:


### Best Practices
- Use the Daily Change Log to efficiently catch updates
- Implement error handling and rate limiting
- Cache data when appropriate to minimize API calls
- Use Push feeds to complement (not replace) RESTful endpoints
- Always verify data freshness with timestamps

### Architecture Overview

LeaderPort's architecture is designed to efficiently manage sports data integration and distribution to browser extensions through a centralized backend system.

### High-Level Architecture

```plaintext
Sportradar API → Backend Service → Redis/DB → SSE/WebSocket → Extensions
                     ↓
              Admin Dashboard
```

### Core Components

#### 1. Admin Dashboard
- Centralized configuration of data sources
- API credential management
- Caching strategy configuration
- Health monitoring and alerts
- Data transformation rules

#### 2. Backend Service
The backend service acts as the central hub for:
- Data collection and aggregation
- Caching management
- Real-time updates via SSE/WebSocket
- Data transformation and validation

#### 3. Browser Extensions
- Focus on UI/UX implementation
- Lightweight design
- Subscribe to backend events
- Progressive data loading

### Data Flow Implementation

#### Data Source Configuration

```typescript
interface DataSourceConfig {
  id: string;
  provider: 'sportradar' | 'espn' | 'custom';
  endpoint: string;
  credentials: {
    apiKey: string;
    // other auth details
  };
  transformerId: string;
  cacheConfig: CacheConfig;
  alerts: {
    errorThreshold: number;
    notificationEmail: string;
  };
}
```

#### Caching Strategy
```typescript
interface CacheConfig {
  sport: string;
  dataType: 'live' | 'historical';
  ttl: number;  // Time to live in seconds
  updateFrequency: number;
}

const cacheConfigs: Record<string, CacheConfig> = {
  'nba-live-scores': {
    sport: 'nba',
    dataType: 'live',
    ttl: 30,  // 30 seconds
    updateFrequency: 10,  // 10 seconds
  },
  'nba-historical-scores': {
    sport: 'nba',
    dataType: 'historical',
    ttl: 86400,  // 24 hours
    updateFrequency: 86400,  // 24 hours
  },
  // Add more cache configurations as needed
};
```

### Browser Extension Implementation

#### Manifest V3 Structure
```json
{
  "manifest_version": 3,
  "name": "LeaderPort Sports",
  "version": "1.0",
  "permissions": [
    "storage",
    "alarms"
  ],
  "host_permissions": [
    "https://api.leaderport.com/*"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

#### Service Worker Implementation
```typescript
// background.js
class LeaderPortServiceWorker {
  private subscriptions: Map<string, SubscriptionConfig> = new Map();
  private userStatus: UserSubscriptionStatus | null = null;

  async initialize() {
    // Load user authentication and subscription status
    await this.loadUserStatus();
    
    // Set up periodic status check
    chrome.alarms.create('checkSubscription', { periodInMinutes: 60 });
  }

  private async loadUserStatus(): Promise<void> {
    const auth = await chrome.storage.local.get('authToken');
    if (auth.authToken) {
      this.userStatus = await this.fetchUserStatus(auth.authToken);
    }
  }

  async handleDataRequest(dataType: string): Promise<any> {
    if (!this.canAccessFeature(dataType)) {
      throw new Error('Subscription required for this feature');
    }
    
    return await this.fetchData(dataType);
  }

  private canAccessFeature(feature: string): boolean {
    const featureAccess = {
      'basic-stats': ['free', 'premium', 'enterprise'],
      'live-updates': ['premium', 'enterprise'],
      'advanced-analytics': ['enterprise']
    };
    
    return featureAccess[feature]?.includes(this.userStatus?.tier || 'free') || false;
  }
}
```

#### User Authentication & Subscription Management
```typescript
interface UserSubscriptionStatus {
  tier: 'free' | 'premium' | 'enterprise';
  expiresAt: number;
  features: string[];
  isActive: boolean;
}

class SubscriptionManager {
  private static instance: SubscriptionManager;
  private subscriptionStatus: UserSubscriptionStatus | null = null;
  
  async checkSubscriptionStatus(): Promise<void> {
    try {
      const response = await fetch('https://api.leaderport.com/subscription/status', {
        headers: { 'Authorization': await this.getAuthToken() }
      });
      
      this.subscriptionStatus = await response.json();
      await this.updateFeatures();
    } catch (error) {
      console.error('Failed to check subscription status:', error);
      // Fallback to cached status or free tier
      this.subscriptionStatus = { tier: 'free', expiresAt: 0, features: [], isActive: true };
    }
  }

  private async updateFeatures(): Promise<void> {
    // Update available features based on subscription status
    const features = this.subscriptionStatus?.features || [];
    await chrome.storage.local.set({ activeFeatures: features });
  }
}
```

#### Real-time Data Subscription
```typescript
class DataSubscriptionService {
  private eventSource: EventSource | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async subscribe(dataTypes: string[]): Promise<void> {
    const userStatus = await this.getUserStatus();
    const allowedTypes = dataTypes.filter(type => 
      this.isDataTypeAllowed(type, userStatus.tier)
    );

    if (allowedTypes.length === 0) return;

    this.connectToSSE(allowedTypes);
  }

  private connectToSSE(dataTypes: string[]): void {
    const params = new URLSearchParams({ types: dataTypes.join(',') });
    this.eventSource = new EventSource(
      `https://api.leaderport.com/stream?${params}`
    );

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleUpdate(data);
    };

    this.eventSource.onerror = () => this.handleError();
  }

  private handleUpdate(data: any): void {
    chrome.runtime.sendMessage({
      type: 'DATA_UPDATE',
      payload: data
    });
  }
}
```

#### Feature Access Control
```typescript
const FeatureMatrix = {
  free: {
    refreshRate: 300, // 5 minutes
    dataTypes: ['basic-stats', 'game-scores'],
    maxRequests: 100
  },
  premium: {
    refreshRate: 60, // 1 minute
    dataTypes: ['basic-stats', 'game-scores', 'live-updates', 'player-stats'],
    maxRequests: 1000
  },
  enterprise: {
    refreshRate: 10, // 10 seconds
    dataTypes: ['basic-stats', 'game-scores', 'live-updates', 'player-stats', 'advanced-analytics'],
    maxRequests: 10000
  }
};
```

### Security Considerations

- Token-based authentication for API requests
- Subscription status verification on each protected request
- Rate limiting based on subscription tier
- Secure storage of user credentials
- Regular validation of subscription status
- Graceful degradation for expired subscriptions

### Error Handling & Offline Support
```typescript
interface OfflineStrategy {
  cacheExpiry: number;
  fallbackData: any;
  syncBehavior: 'immediate' | 'delayed';
}

const offlineConfig: Record<string, OfflineStrategy> = {
  'game-scores': {
    cacheExpiry: 3600, // 1 hour
    fallbackData: { isOffline: true, lastUpdated: Date.now() },
    syncBehavior: 'immediate'
  }
};
```

This implementation ensures secure and efficient data handling while maintaining appropriate access controls based on subscription status. The service worker acts as a central controller for managing subscriptions, data access, and offline functionality.





