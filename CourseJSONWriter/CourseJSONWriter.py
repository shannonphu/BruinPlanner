import json

class CourseJSONWriter(object):
	def writeJSONToFile(self, courses_json, output_path):
		with open(output_path, 'w') as outfile:
		    json.dump(courses_json, outfile, indent=4, sort_keys=True)