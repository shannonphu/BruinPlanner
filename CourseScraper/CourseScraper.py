from bs4 import BeautifulSoup
import re 
from data.Departments import Departments

# define unit type
RANGE = "RANGE"
ABSOLUTE = "ABSOLUTE"

"""
SCHEMA OF AN INDIVIDUAL COURSE:

key: <course abbreviation> <course number>
	i.e. CS 111
value:
	i.e.
	{
		'title' : Operating Systems,
		'description' : Lecture, four hours; laboratory, two hours; outside study......,
		'unit' : 5,
		'unitType' : 'ABSOLUTE',
		'departmentFullName' : 'Computer Science',
		'departmentAbbreviation' : 'COM SCI,
		'prerequisiteDescription' : 'courses 32, 33, 35L',
		'prerequisites' : [],
		'corequisites' : []
	}

"""

class CourseScraper:
	def __init__(self):
		self.departments = Departments()
		self.department_fullname = None
		self.department_abbrev = None

	def scrape_department_courses(self, html):
		soup = BeautifulSoup(html, "html.parser")
		department = soup.findAll("div", { "class" : "page-header" })[1].span.string.rstrip()
		m = re.search(r"^(.*?) \((.*?)\)", department)
		self.department_fullname = m.group(1)
		m = re.search(r"\(([A-Za-z\s]+)\)", department)
		self.department_abbrev = m.group(1)

		courses = soup.findAll("div", { "class" : "media-body" })
		res = {}
		for course in courses:
			course, course_details = self.parse_course(course)
			res[course] = course_details
		return self.department_fullname, res

	def parse_course(self, course_html):
		# get important course metadata
		course_details = course_html.h3.string.split('. ')
		course_number = course_details[0]
		course_title = course_details[1].rstrip()
		unit, course_description = course_html.find_all('p')

		course_description = course_description.string
		unit = unit.string.replace('Units: ', '')

		unit_type = ABSOLUTE
		if not unit.isdigit():
			unit_type = RANGE
		else:
			unit = int(unit)

		# start finding requisites within course description
		prerequisiteDescription = None
		corequisiteDescription = None
		prerequisites = []
		corequisites = []
		if course_description is not None:
			for sentence in course_description.split('. '):
				if re.search(r"\s?([cC]orequisite|[cC]orequisites):", sentence):
					corequisite_str = sentence[sentence.index(':')+2:]
					corequisiteDescription = self.parse_requisites(corequisite_str)
					corequisites = self.structure_single_requisite(corequisiteDescription)
				elif re.search(r"\s?([rR]equisite|[rR]equisites):", sentence):
					prerequisite_str = sentence[sentence.index(':')+2:]
					prerequisiteDescription = self.parse_requisites(prerequisite_str)
					prerequisites = self.structure_single_requisite(prerequisiteDescription)

		return "%s %s" % (self.department_abbrev, course_number), {
			'title' : course_title,
			'description' : course_description,
			'unit' : unit,
			'unitType' : unit_type,
			'departmentFullName' : self.department_fullname,
			'departmentAbbreviation' : self.department_abbrev,
			'prerequisiteDescription' : prerequisiteDescription,
			'corequisiteDescription' : corequisiteDescription,
			'prerequisites' : prerequisites,
			'corequisites' : corequisites
		}

	def parse_requisites(self, requisite_str):
		converted_requisite_str = requisite_str

		# convert all full department names to abbreviations with '_' delimiting words in course ID
		for department_name in self.departments.mapping:
			if department_name in converted_requisite_str:
				converted_requisite_str = converted_requisite_str.replace(department_name, self.departments.get_abbreviation(department_name))
		
		return converted_requisite_str

	def structure_single_requisite(self, requisite_str):
		if re.search(r"^course [A-Z]{0,2}[0-9]{0,3}[A-Z]{0,2}$", requisite_str):
			return [[self.department_abbrev + " " + requisite_str.split()[-1]]]
		else:
			return []
