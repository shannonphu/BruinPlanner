import { get } from './utils/httpHelper';
import config from './config';

/**
 * @description Makes server request for username
 * @param {string} full department name (ie "computer science")
 * @returns {JSON} JSON for all courses in a particular department
 */
export function getCoursesFromDepartment(department) {
    let uri = config.courses[department.toLowerCase()];
    return get(uri);
}

export function getAllDegreeRequirements() {
    let uri = config.degreeRequirements;
    return get(uri);
}