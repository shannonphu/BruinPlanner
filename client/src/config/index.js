module.exports = (() => {
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
			"courses": {
				"computer science": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/computer_science.json"
			},
			"degreeRequirements": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/degrees/majors.json"
		};
	}
})();