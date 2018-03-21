module.exports = (() => {
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
			"courses": {
				"COM SCI": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/computer_science.json",
				"EC ENGR": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/electrical_and_computer_engineering.json",
				"MATH": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/mathematics.json",
				"PHYSICS": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/physics.json",
				"STATS": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/statistics.json",
				"C&EE": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/civil_and_environmental_engineering.json"
			},
			"degreeRequirements": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/degrees/majors.json"
		};
	}
})();