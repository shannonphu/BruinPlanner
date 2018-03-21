import * as api from '../api';

var handleError = (error, msg, cb) => {
      console.error(`${msg}: ${error}`);
      if (cb) cb();
};

/**
 * @description Calls the API method to get username and update store
 */
export function getCoursesFromDepartment(department, cb) {
      return (dispatch, prevState) => {
            api.getCoursesFromDepartment(department)
                  .then(courses => dispatch({ department, courses, type: "GET_COURSES_FOR_DEPT" }))
                  .then(() => { if (cb) cb(); })
                  .catch(error => handleError(error, `Error in ${getCoursesFromDepartment.name}`, cb));
      };
}

export function getAllDegreeRequirements(cb) {
      return (dispatch, prevState) => {
            api.getAllDegreeRequirements()
                  .then(requirements => dispatch({ requirements, type: "GET_ALL_REQUIREMENTS" }))
                  .then(() => { if (cb) cb(); })
                  .catch(error => handleError(error, `Error in ${getAllDegreeRequirements.name}`, cb));
      };
}

export function getCoursesForMajor(major, cb) {
      return (dispatch, prevState) => {

      };
}