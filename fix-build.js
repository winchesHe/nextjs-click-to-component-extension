import fs from 'node:fs'
import path from 'node:path'
import manifest from './dist/manifest.json'

const webAccessibleResources = manifest.web_accessible_resources

const updatedWebAccessibleResources = webAccessibleResources.map(resource => {
  if (resource.use_dynamic_url) {
    return {
      ...resource,
      use_dynamic_url: false,
    }
  }
  return resource
})

manifest.web_accessible_resources = updatedWebAccessibleResources

const json = JSON.stringify(manifest, null, 2)
fs.writeFileSync(path.resolve(__dirname, '../dist/manifest.json'), json, 'utf8')