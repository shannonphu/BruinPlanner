from HTMLFetcher import HTMLFetcher
from DepartmentLinkScraper import DepartmentLinkScraper
from CourseScraper import CourseScraper
from CourseJSONWriter import CourseJSONWriter
import argparse

def main():
	parser = argparse.ArgumentParser(description='Parse a UCLA registrar site.')
	parser.add_argument('-u','--url', help='URL for UCLA registrar site within quotes (i.e. \'http://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=COM+SCI&funsel=3\')')
	args = parser.parse_args()
	url = args.url
	urls = []
	if url:
		urls.append(url)
	else:
		deptLinkScraper = DepartmentLinkScraper()
		urls = deptLinkScraper.getRegistrarLinks()

	fetcher = HTMLFetcher()
	scraper = CourseScraper()
	writer = CourseJSONWriter()

	for link in urls:
		html = fetcher.get(link)
		try:
			department_abbrev, department_courses = scraper.scrape_department_courses(html)
		except:
			print "*** Error trying to scrape " + department_abbrev + " ***"
			continue

		try:
			writer.writeJSONToFile(department_courses, 'data/courses/' + department_abbrev + '.json')
		except:
			print "*** Error trying to write " + department_abbrev + " ***"
			continue



if __name__ == '__main__':
	main()