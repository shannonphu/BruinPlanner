from CourseFetcher import CourseFetcher
from CourseScraper import CourseScraper
from CourseJSONWriter import CourseJSONWriter
import argparse

def main():
	parser = argparse.ArgumentParser(description='Parse a UCLA registrar site.')
	parser.add_argument('-u','--url', help='URL for UCLA registrar site within quotes (i.e. \'http://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=COM+SCI&funsel=3\')', required=True)
	args = parser.parse_args()
	url = args.url

	fetcher = CourseFetcher()
	scraper = CourseScraper()
	html = fetcher.fetch_department_courses(url)
	department_name, department_courses = scraper.scrape_department_courses(html)
	writer = CourseJSONWriter()
	writer.writeJSONToFile(department_courses, 'data/courses/' + department_name.lower().replace(' ', '_') + '.json')


if __name__ == '__main__':
	main()