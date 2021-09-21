module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{tsx,json,ts}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'src/sw.js'
};