module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,vue}",
		"node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
	],
	plugins: [require("flowbite/plugin")],
	theme: {
		fontFamily: {
			'sans-serif':['Inter','sans-serif']
		},
	},
};
