import fs from 'fs';

const initialSettings = {
  srcPath: '/Users/sebas/.ssh/config',
  startTag: "### HADES ### START ### DON'T EDIT ###",
  endTag: "### HADES ### END ### DON'T EDIT #####",
}

export default function ConfigFile(settings = initialSettings) {

  const update = items => {
    if (items.length < 0) return false;

    const currentConfig = getOriginal();

    let newItemsStr = '';

    if (items.length === 1) {
      newItemsStr = formatItemToHostAlias(items[0]);
    }
    else {
      newItemsStr = items.reduce((prevItem, nextItem) => {
        const prevItemStr = formatItemToHostAlias(prevItem);
        const nextItemStr = formatItemToHostAlias(nextItem);

        return prevItemStr.concat(nextItemStr);
      });
    }

    return currentConfig
      .concat("\n", settings.startTag)
      .concat(newItemsStr)
      .concat("\n", settings.endTag)
  }

  const getOriginal = (srcPath = settings.srcPath) => {
    const configFile = fs.readFileSync(srcPath);
    // @TODO: Use startTag and endTag vars.
    const sectionRegex = /### HADES ### START ### DON'T EDIT ###[\s\S]*### HADES ### END ### DON'T EDIT #####/m;

    return configFile.toString().replace(sectionRegex, '');
  }

  const formatItemToHostAlias = (item) => {
    let shellStr = "\n";

    if (item.hasOwnProperty('alias') && item.alias) {
      shellStr = shellStr.concat("Host ", item.alias);
    }

    if (item.hasOwnProperty('host') && item.host) {
      shellStr = shellStr.concat("\n  Hostname ", item.host);
    }

    if (item.hasOwnProperty('user') && item.user) {
      shellStr = shellStr.concat("\n  User ", item.user);
    }

    if (item.hasOwnProperty('identityFile') && item.identityFile) {
      shellStr = shellStr.concat("\n  IdentityFile ", item.identityFile);
    }

    return shellStr;
  }

  const sync = (content, srcPath = settings.srcPath) => {
    return fs.writeFile(srcPath, content);
  }

  return {
    update,
    sync
  }
}
