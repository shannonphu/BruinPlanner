import json, os

class CourseJSONWriter(object):
	def writeJSONToFile(self, courses_json, output_path):
		# Retain manually input prerequisite/corequisite fields if they have been input before
		if os.path.exists(output_path):
			with open(output_path) as json_data:
			    courses = json.load(json_data)
			    for course_name in courses:
					courses_json[course_name]['prerequisites'] = courses[course_name]['prerequisites']
					courses_json[course_name]['corequisites'] = courses[course_name]['corequisites']

		with open(output_path, 'w') as outfile:
		    json.dump(courses_json, outfile, indent=4, sort_keys=True)