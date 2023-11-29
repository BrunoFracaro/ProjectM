const { getDefaultConfig } = require('@expo/metro-config');
const nodeLibs = require('node-libs-react-native');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
	...defaultConfig,
	resolver: {
		...defaultConfig.resolver,
		extraNodeModules: {
			...nodeLibs,
			...defaultConfig.resolver.extraNodeModules
		},
	},
};