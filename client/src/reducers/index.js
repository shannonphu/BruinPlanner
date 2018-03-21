import { combineReducers } from 'redux';

import CourseReducer from './courses';

const rootReducer = combineReducers({ courses: CourseReducer });

export default rootReducer;
