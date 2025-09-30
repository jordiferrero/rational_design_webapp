# GitHub Pages Deployment Guide

This guide explains how to deploy the Rational Design Webapp to GitHub Pages.

## Prerequisites

- GitHub repository with the webapp code
- GitHub account with Pages enabled
- Node.js 18+ installed locally (for testing)

## Deployment Steps

### 1. Repository Setup

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy when you push to the main branch

### 3. Automatic Deployment

The webapp will automatically deploy when you:

- Push changes to the `main` branch
- The GitHub Actions workflow will build and deploy the static site

### 4. Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **The static files will be in the `out/` directory**

3. **Deploy to GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose the `gh-pages` branch and `/` folder
   - Or use the GitHub Actions workflow (recommended)

## Configuration Details

### Next.js Configuration

The `next.config.js` has been configured for GitHub Pages:

```javascript
const nextConfig = {
  output: "export", // Static export
  trailingSlash: true, // GitHub Pages compatibility
  images: {
    unoptimized: true, // Required for static export
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/rational_design_webapp" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/rational_design_webapp/" : "",
};
```

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file handles:

- Installing dependencies
- Building the static site
- Deploying to GitHub Pages

## Testing Locally

Before deploying, test the static export:

```bash
# Build the static site
npm run build

# Serve the static files locally
npx serve out
```

## Troubleshooting

### Common Issues

1. **404 Errors on Refresh:**

   - This is normal for single-page applications on GitHub Pages
   - Users should navigate using the app's internal links

2. **Images Not Loading:**

   - Ensure all images are in the `public/` directory
   - Check that image paths are relative

3. **Build Failures:**
   - Check the GitHub Actions logs in the repository
   - Ensure all dependencies are properly listed in `package.json`

### GitHub Pages Limitations

- No server-side rendering (SSR)
- No API routes
- Static files only
- Limited to public repositories (for free accounts)

## URL Structure

After deployment, your webapp will be available at:

- `https://[username].github.io/rational_design_webapp/`

## Updating the Site

To update the deployed site:

1. Make your changes
2. Commit and push to the `main` branch
3. GitHub Actions will automatically rebuild and deploy

## Performance Optimization

For better performance on GitHub Pages:

- Optimize images before adding to `public/`
- Use Next.js Image component with `unoptimized={true}`
- Minimize bundle size by removing unused dependencies

## Security Considerations

- GitHub Pages is public by default
- Don't include sensitive information in the repository
- Use environment variables for configuration (though limited on static sites)

## Support

If you encounter issues:

1. Check the GitHub Actions workflow logs
2. Verify your repository settings
3. Ensure all dependencies are correctly installed
4. Test the build locally before pushing
