import { CapacitorUpdater } from '@capgo/capacitor-updater'

async function runUpdater() {
  try {
    await CapacitorUpdater.notifyAppReady()
    const latestAssetUrl = `https://github.com/GaudRavi93/capgo-test/releases/latest/download/build.zip`

    try {
      const version = await CapacitorUpdater.download({ url: latestAssetUrl })
      if (version) {
        await CapacitorUpdater.set(version)
        window.location.reload()
      }
    } catch (_) {
      // Ignore if no update or download fails
    }
  } catch (err) {
    console.error('CapacitorUpdater init failed', err)
  }
}

runUpdater()


