# Public & Private Repo Strategy

This document outlines the repository structure strategy for LeaderPort, separating public core functionality from private enhancements.

## Repository Structure

### 1. Public Repositories

#### `leaderport-core-api`

```
leaderport-core-api/
├── src/
│   ├── blockchain/        # Sui blockchain integration
│   ├── leaderboard/       # Basic leaderboard functionality
│   ├── types/             # Shared types and interfaces
│   └── public-api/        # Public API endpoints
├── examples/              # Integration examples
├── docs/                  # Public documentation
└── tests/                 # Core test suite
```

#### `leaderport-core-ui`

```
leaderport-core-ui/
├── src/
│   ├── components/       # Basic UI components
│   │   ├── leaderboard/  # Core leaderboard views
│   │   └── common/       # Shared components
│   ├── hooks/            # Basic Web3 hooks
│   └── utils/            # Utility functions
├── examples/             # Example implementations
└── stories/              # Component documentation
```


### 2. Private Repositories

```
leaderport-api/
├── src/
│   ├── enterprise/             # Enterprise-specific features
│   │   ├── analytics/          # Advanced analytics
│   │   └── custom-scoring/     # Premium scoring algorithms
│   ├── pro/                    # Pro tier features
│   └── core/                   # Imports from leaderport-core-api
└── private-docs/               # Internal documentation
```

```
leaderport-extensions/
├── src/
│   ├── premium-components/    # Enhanced UI components
│   ├── enterprise/            # White-label solutions
│   ├── analytics-dashboard/   # Advanced analytics UI
│   └── core/                  # Imports from leaderport-core-ui
└── private-docs/              # Internal documentation
```

## Implementation Strategy

1. Core Package Publishing

```json
{
  "name": "@leaderport/core-api", // or @leaderport/core-ui
  "version": "1.0.0",
  "public": true,
  "exports": {
    // Carefully controlled public exports
    "./blockchain": "./dist/blockchain/index.js",
    "./leaderboard": "./dist/leaderboard/index.js"
  }
}
```

2. Private Enhancement Integration

```typescript
import { LeaderboardCore } from '@leaderport/core-api';

export class EnhancedLeaderboard extends LeaderboardCore {
  constructor(config: EnhancedConfig) {
    super(config);
    // Add premium features
  }

  async calculateScore(input: ScoreInput): Promise<EnhancedScore> {
    const baseScore = await super.calculateScore(input);
    return this.applyPremiumAlgorithms(baseScore);
  }
}
```

## Migration Steps

1. **Initial Repository Setup**
```bash
# Create new public repos
git clone existing-private-api leaderport-core-api
git clone existing-private-ui leaderport-core-ui

# Clean up sensitive code
git filter-repo --path src/core/ --path docs/public/

# Setup new remote
git remote add origin git@github.com:leaderport/leaderport-core-api.git
```

2. **Refactor Private Repos**
```bash
# Update private repos to use core as dependency
npm install @leaderport/core-api
npm install @leaderport/core-ui

# Remove core code that's now in public repos
git rm -r src/core/
```

### This structure allows you to:
- Maintain open-source presence
- Protect proprietary features
- Scale both community and enterprise offerings
- Clearly separate free vs. premium features
- Manage security and access control effectively

## Feature Distribution

### Public Core Features
- Essential leaderboard functionality
- Basic blockchain integration
- Standard component library
- Public API interfaces
- Documentation and examples

### Private Enhancements
- Premium algorithms
- Enterprise customizations
- Advanced analytics
- White-label solutions
- Custom implementations

## Repository Hosting Strategy

### Current Setup
- Private repositories (leaderport-api, leaderport-extensions) → GitLab
- Public core repositories (proposed) → GitHub vs GitLab decision

### Platform Comparison for Public Repos

#### GitHub Advantages
- Larger developer community and visibility
- Better discoverability through GitHub search
- More familiar to most open-source contributors
- Superior integration with common development tools
- GitHub Actions is widely used for CI/CD
- GitHub Pages for documentation hosting
- GitHub Discussions for community engagement

#### GitHub Disadvantages
- Managing repositories across two platforms
- Additional DevOps setup required
- Need to maintain separate CI/CD pipelines

#### GitLab Advantages
- All repositories in one platform
- Unified CI/CD pipelines
- Consistent access management
- Easier integration between public and private repos
- Single source of truth for all code

#### GitLab Disadvantages
- Less visibility in open-source community
- Smaller public contributor base
- Fewer third-party integrations
- Less familiar to potential contributors

### Decided Plan
Both public (open-source) core repositories will be hosted on GitHub, while maintaining private repositories will be hosted on GitLab. 

This "hybrid" approach maximizes benefits:

1. **Visibility**: Leverage GitHub's larger open-source community
2. **Separation**: Natural boundary between public and private code
3. **Security**: Private code remains isolated on GitLab
4. **Community**: Better engagement through GitHub's social features

The minor overhead of managing two platforms is outweighed by the benefits of GitHub's open-source ecosystem for public repositories.
