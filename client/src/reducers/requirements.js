function RequirementsReducer(state = {}, action) {
    switch (action.type) {
        case 'GET_ALL_REQUIREMENTS':
            return action.requirements;
        default:
            return state;
    }
}

export default RequirementsReducer;