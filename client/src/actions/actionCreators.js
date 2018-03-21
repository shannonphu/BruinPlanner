import * as api from '../api';

/**
 * @description Calls the API method to get username and update store
 */
export function getCoursesFromDepartment(department, cb) {
      return (dispatch, prevState) => {
            api.getCoursesFromDepartment(department)
                  .then(courses => dispatch({ department, courses, type: "GET_COURSES_FOR_DEPT" }))
                  .then(() => { if (cb) cb(); })
                  .catch(error => console.error("Error in getCoursesFromDepartment: " + error));
      };
}