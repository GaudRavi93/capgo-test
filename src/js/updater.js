import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Configuration
const GITHUB_OWNER = 'GaudRavi93' // Replace with your GitHub username
const GITHUB_REPO = 'capgo-test'   // Replace with your repository name

async function getLatestRelease() {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`)
    console.log('response', response);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    const release = await response.json()
    console.log('release', release);
    return release
  } catch (error) {
    console.error('Failed to fetch latest release:', error)
    return null
  }
}

async function checkForUpdates() {
  try {
    const release = await getLatestRelease()
    if (!release) {
      console.log('No release found or failed to fetch release info')
      return
    }

    // Find the build.zip asset
    const buildAsset = release.assets.find(asset => asset.name === 'build.zip')
    console.log('buildAsset', buildAsset);
    if (!buildAsset) {
      console.log('No build.zip found in latest release')
      return
    }

    console.log(`Found release: ${release.tag_name}`)
    console.log(`Download URL: ${buildAsset.browser_download_url}`)

    // Download and apply the update
    const version = await CapacitorUpdater.download({
      url: buildAsset.browser_download_url,
      version: release.tag_name
    })
    console.log('version', version);
    if (version) {
      console.log('Update downloaded successfully, applying...')
      await CapacitorUpdater.set(version)
      console.log('Update applied, reloading app...')
      // window.location.reload()
    }
  } catch (error) {
    console.error('Update check failed:', error)
  }
}

async function runUpdater() {
  try {
    // Notify that the app is ready
    await CapacitorUpdater.notifyAppReady()
    console.log('App ready, checking for updates...')

    // Check for updates
    await checkForUpdates()

  } catch (err) {
    console.error('CapacitorUpdater init failed', err)
  }
}

CapacitorUpdater.addListener("download", (info) => {
  localStorage.setItem(`downloadPercent-${Date.now()}`, info.percent)
  console.log("download was fired", info.percent);
});

// Run the updater when the script loads
runUpdater()

// Optional: Check for updates periodically (every 30 minutes)
setInterval(checkForUpdates, 30 * 60 * 1000)


