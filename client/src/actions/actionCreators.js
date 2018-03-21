import * as api from '../api';

var handleError = (error, msg, cb) => {
      console.error(`${msg}: ${error}`);
      if (cb) cb();
};

/**
 * @description Calls the API method to get username and update store
 */
function getCoursesFromDepartment(department, cb) {
      return (dispatch, getState) => {
            // Only fetch if not in store yet
            let state = getState();
            if (!(department in state.courses)) {
                  return api.getCoursesFromDepartment(department)
                        .then(courses => dispatch({ department, courses, type: "GET_COURSES_FOR_DEPT" }))
                        .then(() => { if (cb) cb(); })
                        .catch(error => handleError(error, `Error in ${getCoursesFromDepartment.name}`, cb));
            } else {
                  console.log("cached");
            }
      };
}

function getAllDegreeRequirements(cb) {
      return (dispatch, getState) => {
            if (!getState().requirements.length) {
                  return api.getAllDegreeRequirements()
                        .then(requirements => dispatch({ requirements, type: "GET_ALL_REQUIREMENTS" }))
                        .then(() => { if (cb) cb(); })
                        .catch(error => handleError(error, `Error in ${getAllDegreeRequirements.name}`, cb));
            }
      };
}

export function getCoursesForMajor(major) {
      return (dispatch, getState) => {
            return dispatch(getAllDegreeRequirements())
                  .then(() => {
                        let state = getState();
                        let majorRequirements = state.requirements[major];
                        let departments = new Set();
                        for (let requirement of majorRequirements) {
                              for (let courseTitle of requirement.courses) {
                                    let courseTitleTokens = courseTitle.split(" ");
                                    let deptAbbrev = courseTitleTokens.slice(0, courseTitleTokens.length - 1).join(" ");
                                    departments.add(deptAbbrev);
                              }
                        }
                        return Array.from(departments);
                  })
                  .then(departments => {
                        return Promise.all(departments.map(deptName => {
                              return dispatch(getCoursesFromDepartment(deptName));
                        }));
                  });
      }
}