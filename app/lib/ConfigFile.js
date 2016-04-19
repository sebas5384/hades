import fs from 'fs'
import sshConfig from 'ssh-config'

const initialSettings = {
  srcPath: '/Users/sebas/.ssh/config',
  startTag: "### HADES ### START ### DON'T EDIT ###",
  endTag: "### HADES ### END ### DON'T EDIT #####",
}

export default function ConfigFile(settings = initialSettings) {

  const update = (items) => {

    const newConfig = sshConfig.parse('')
    // Convert items to the config format and append to the new config.
    items.forEach((item) => {
      const convertedItem = convertToConfigFormat(item)
      newConfig.append(convertedItem)
    })

    const newConfigString = sshConfig.stringify(newConfig);

    const unmanagedConfig = readUnmanagedLocalConfig()

    return unmanagedConfig
      .trim()
      .concat("\n", settings.startTag)
      .concat("\n", newConfigString)
      .concat("\n", settings.endTag)
  }

  const loadFromLocal = () => {
    const managedConfig = readManagedLocalConfig()
    const config = sshConfig.parse(managedConfig)

    // Return an empty array in case the local file is empty.
    if (!0 in config) return []

    // Extract items.
    const items = Object.keys(config)
      .filter((key) => {
        const index = Number(key)
        return Number.isInteger(index)
      })
      .map((key) => config[key])
      .map((item) => convertToAppFormat(item))

    return items
  }

  const readLocalConfig = (srcPath = settings.srcPath) => fs.readFileSync(srcPath)

  const readManagedLocalConfig = (srcPath) => {
    const configFile = readLocalConfig(srcPath)
    // @TODO: Use startTag and endTag vars.
    const regex = /### HADES ### START ### DON'T EDIT ###([\s\S]*)### HADES ### END ### DON'T EDIT #####/m;
    const configString = configFile.toString()
    const match = configString.match(regex);

    return (match && match.length > 1) ? match[1].trim() : ''
  }

  const readUnmanagedLocalConfig = (srcPath) => {
    const configFile = readLocalConfig(srcPath)
    // @TODO: Use startTag and endTag vars.
    const regex = /### HADES ### START ### DON'T EDIT ###[\s\S]*### HADES ### END ### DON'T EDIT #####/m;

    return configFile.toString().replace(regex, '').trim();
  }

  const sync = (content, srcPath = settings.srcPath) => {
    return fs.writeFile(srcPath, content);
  }

  // Public methods.
  return {
    update,
    loadFromLocal,
    sync
  }
}

/*
 * Convert form data to config format.
 */
export const convertToConfigFormat = (data) => {
  return Object.keys(data)
    .filter((fieldName) => data[fieldName])
    .reduce((item, fieldName) => {
      // Field name id has to be "#HostId", which is a comment.
      const convertedFieldName = (fieldName == 'id') ? '#HostId' : capitalizeField(fieldName)

      return {
        ...item,
        [convertedFieldName]: data[fieldName]
      }
    }, {})
}

const capitalizeField = (name) => name.charAt(0).toUpperCase() + name.slice(1)
const unCapitalizeField = (name) => name.charAt(0).toLowerCase() + name.slice(1)

/*
 * Convert config format to apps format.
 */
export const convertToAppFormat = (data) => {
  return Object.keys(data)
    .filter((fieldName) => data[fieldName])
    .reduce((item, fieldName) => {
      const convertedFieldName = (fieldName == '#HostId') ? 'id' : unCapitalizeField(fieldName)

      return {
        ...item,
        [convertedFieldName]: data[fieldName]
      }
    }, {})
}
