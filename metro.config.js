const {getDefaultConfig} = require('metro-config');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const watchFolders = [
  //Relative path to packages directory
  path.resolve(__dirname),
];

// Solve "Unable to resolve module `@babel/runtime/helpers/interoprequiredefault` axios"
const nodeModulesPaths = [
  path.resolve(path.join(__dirname, './node_modules')),
];

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts}
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      nodeModulesPaths,
    },
    watchFolders,
  };
})();
