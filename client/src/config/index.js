module.exports = (() => {
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
            "DEPT_COURSE_BASE_URL": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/courses/",
			"degreeRequirements": "https://raw.githubusercontent.com/shannonphu/BruinPlanner/master/scraper/data/degrees/majors.json"
		};
	}
})();