# Live Update Setup Guide

This guide explains how to use the Capgo Capacitor Updater plugin with GitHub Actions for live updates.

## 🚀 What's Been Set Up

### 1. GitHub Actions Workflow

- **File**: `.github/workflows/build-and-release.yml`
- **Triggers**: Push to main/master branch or manual dispatch
- **Actions**:
  - Builds your app using `npm run build`
  - Creates a `build.zip` file from the `dist` folder
  - Creates a GitHub release with the zip file
  - Uses semantic versioning with build numbers

### 2. Enhanced Updater Script

- **File**: `src/js/updater.js`
- **Features**:
  - Uses GitHub Releases API to fetch latest release
  - Automatically finds and downloads `build.zip`
  - Applies updates and reloads the app
  - Periodic update checks (every 30 minutes)
  - Comprehensive error handling and logging

### 3. Optimized Capacitor Configuration

- **File**: `capacitor.config.json`
- **Settings**:
  - Manual update control (autoUpdate: false)
  - Production channel configuration
  - 30-second timeout for downloads
  - Enhanced splash screen settings

## 📋 Setup Instructions

### Step 1: Update Repository Information

In `src/js/updater.js`, update these variables with your actual GitHub details:

```javascript
const GITHUB_OWNER = "YOUR_GITHUB_USERNAME"; // Replace 'GaudRavi93'
const GITHUB_REPO = "YOUR_REPOSITORY_NAME"; // Replace 'capgo-test'
```

### Step 2: Push to GitHub

1. Commit and push your changes to the main branch
2. The GitHub Action will automatically trigger and create a release

### Step 3: Build and Deploy Your App

```bash
# Build your app
npm run build

# Sync with Capacitor
npx cap sync

# Build for Android
npx cap build android

# Or build for iOS
npx cap build ios
```

## 🧪 Testing Live Updates

### Method 1: Test with Real Updates

1. Make a change to your app (e.g., modify the banner text in `index.html`)
2. Commit and push to main branch
3. Wait for GitHub Action to complete (check Actions tab)
4. Open your app and wait for the update to download
5. The app should reload with your changes

### Method 2: Manual Testing

1. Create a test release manually:

   ```bash
   # Build your app
   npm run build

   # Create zip file
   cd dist
   zip -r ../build.zip .
   cd ..
   ```

2. Go to your GitHub repository → Releases → Create a new release
3. Upload the `build.zip` file
4. Test the update in your app

### Method 3: Debug Mode

Add this to your app to see update logs:

```javascript
// Add to your main app file
window.addEventListener("load", () => {
  console.log("App loaded, checking for updates...");
});
```

## 🔧 Configuration Options

### Update Frequency

To change how often updates are checked, modify this line in `updater.js`:

```javascript
// Check every 5 minutes instead of 30
setInterval(checkForUpdates, 5 * 60 * 1000);
```

### Update Channels

You can create different channels for different environments:

- `production` - Stable releases
- `beta` - Beta testing
- `alpha` - Development builds

### Manual Update Trigger

Add a button to manually check for updates:

```javascript
// Add this to your app
async function checkForUpdatesManually() {
  await checkForUpdates();
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Updates not downloading**

   - Check GitHub repository permissions
   - Verify the release has a `build.zip` file
   - Check browser console for errors

2. **App not reloading after update**

   - Ensure `CapacitorUpdater.notifyAppReady()` is called
   - Check that the update was successfully applied

3. **GitHub Action failing**
   - Check if you have the correct permissions
   - Verify the workflow file is in `.github/workflows/`
   - Check the Actions tab for error details

### Debug Information

The updater script logs detailed information to the console. Check your browser's developer tools to see:

- Release information
- Download progress
- Update application status
- Any errors that occur

## 📱 Platform-Specific Notes

### Android

- Ensure your app has internet permissions
- Test on both debug and release builds
- Consider using ProGuard rules for production

### iOS

- Ensure your app has network permissions
- Test on both simulator and device
- Consider App Store review guidelines for live updates

## 🔒 Security Considerations

1. **HTTPS Only**: All downloads use HTTPS
2. **GitHub Security**: Uses GitHub's secure release system
3. **Code Signing**: Consider code signing for production apps
4. **Update Verification**: The plugin verifies update integrity

## 📊 Monitoring

Monitor your live updates by:

1. Checking GitHub release downloads
2. Using analytics to track update adoption
3. Monitoring app crash reports after updates
4. User feedback on update experience

## 🎯 Best Practices

1. **Test Thoroughly**: Always test updates before releasing
2. **Version Control**: Use semantic versioning
3. **Rollback Plan**: Keep previous versions available
4. **User Communication**: Inform users about updates
5. **Gradual Rollout**: Consider staged rollouts for large updates

## 📞 Support

If you encounter issues:

1. Check the [Capgo documentation](https://github.com/Cap-go/capacitor-updater)
2. Review GitHub Actions logs
3. Check browser console for errors
4. Test with a simple update first

---

**Happy Live Updating! 🚀**
