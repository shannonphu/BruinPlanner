function RequirementsReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_ALL_REQUIREMENTS':
            return action.requirements;
        case 'LOAD_COURSE_INFO':
            // eslint-disable-next-line
            return state[action.major].map(requirement => {
                for (let courseTitle of requirement.courses) {
                    let courseTitleTokens = courseTitle.split(" ");
                    let deptAbbrev = courseTitleTokens.slice(0, courseTitleTokens.length - 1).join(" ");
                    let courseInfo = action.courses[deptAbbrev][courseTitle];
                    return courseInfo;
                }
            });
        default:
            return state;
    }
}

export default RequirementsReducer;