import { combineReducers } from 'redux';

import CourseReducer from './courses';
import RequirementsReducer from './requirements';

const rootReducer = combineReducers({ courses: CourseReducer, requirements: RequirementsReducer });

export default rootReducer;
