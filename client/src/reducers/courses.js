function CourseReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_COURSES_FOR_DEPT':
            return {
                ...state,
                [action.department]: action.courses
            }
        default:
            return state;
    }
}

export default CourseReducer;