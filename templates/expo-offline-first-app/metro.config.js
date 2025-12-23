const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
	"@": path.resolve(__dirname, "src"),
	"@assets": path.resolve(__dirname, "src/assets"),
	"@components": path.resolve(__dirname, "src/components"),
	"@navigation": path.resolve(__dirname, "src/navigation"),
	"@module": path.resolve(__dirname, "src/module"),
	"@theme": path.resolve(__dirname, "src/theme"),
	"@db": path.resolve(__dirname, "src/db"),
	"@hook": path.resolve(__dirname, "src/hook"),
	"@types": path.resolve(__dirname, "src/types"),
	"@services": path.resolve(__dirname, "src/service"),
};

config.resolver.sourceExts.push("sql");

module.exports = config;
