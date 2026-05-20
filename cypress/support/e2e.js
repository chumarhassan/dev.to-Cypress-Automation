import './commands'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customSnapshotsDir: 'cypress/snapshots',
  capture: 'viewport',
})
