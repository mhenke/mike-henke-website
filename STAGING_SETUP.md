# Staging Environment Setup Guide

## Current Status
- **Production**: `mikehenke.com` (from main branch)
- **Staging**: `mhenke.github.io/mike-henke-website/staging` (from staging branch)

## Option 1: Staging Subdomain (staging.mikehenke.com)

### Method A: Separate Repository (Recommended)
1. Create new repository: `mike-henke-website-staging`
2. Configure GitHub Pages for that repo with custom domain `staging.mikehenke.com`
3. Add DNS record: `staging CNAME mhenke.github.io.`

### Method B: External Hosting (Netlify/Vercel)
1. Connect staging branch to Netlify
2. Configure custom domain `staging.mikehenke.com`
3. Free tier available

## Option 2: Current Subdirectory Setup
- **Staging URL**: `mhenke.github.io/mike-henke-website/staging`
- **Pros**: No additional setup, works immediately
- **Cons**: Different base path, less professional URL

## DNS Records Needed for Staging Subdomain
```
Name: staging
Type: CNAME
TTL: 10800
Value: mhenke.github.io.
```

## Next Steps
1. Choose your preferred method
2. If subdomain: Add DNS record and update workflow
3. If keeping current: Test staging URL works
