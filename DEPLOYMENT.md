# Portfolio Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages and get a personal link.

## Prerequisites

1. Your portfolio project is already uploaded to GitHub
2. You have admin access to the repository

## Steps to Deploy

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. This will use the workflow file we created (`.github/workflows/deploy.yml`)

### 2. Push Your Changes

Push the current changes to your main branch:

```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

### 3. Monitor Deployment

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. You should see the "Deploy to GitHub Pages" workflow running
4. Wait for it to complete (usually takes 2-3 minutes)

### 4. Access Your Portfolio

Once deployment is complete, your portfolio will be available at:
```
https://[your-username].github.io/Portfolio-0.2/
```

Replace `[your-username]` with your actual GitHub username.

## Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `yourname.dev`)
3. Save the changes
4. Add a CNAME record in your domain provider pointing to `[your-username].github.io`

## Troubleshooting

### If the site doesn't load:
1. Check the **Actions** tab for any build errors
2. Ensure the repository name matches the `base` path in `vite.config.ts`
3. Wait a few minutes for DNS propagation

### If routing doesn't work:
1. The 404.html and redirect script should handle client-side routing
2. Make sure you're using the correct URL format

## Repository Structure

The deployment uses these key files:
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `vite.config.ts` - Vite configuration with correct base path
- `public/404.html` - Redirect handler for client-side routing
- `index.html` - Main HTML file with redirect script

## Updating Your Portfolio

To update your portfolio:
1. Make your changes locally
2. Push to the main branch
3. GitHub Actions will automatically rebuild and deploy
4. Your changes will be live in a few minutes

Your portfolio will now be accessible via a personal GitHub Pages URL! 