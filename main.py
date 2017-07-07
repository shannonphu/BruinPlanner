from CourseFetcher import CourseFetcher
from CourseScraper import CourseScraper
from CourseJSONWriter import CourseJSONWriter

fetcher = CourseFetcher()
scraper = CourseScraper()
html = fetcher.fetch_department_courses("http://www.registrar.ucla.edu/Academics/Course-Descriptions/Course-Details?SA=COM+SCI&funsel=3")
department_name, department_courses = scraper.scrape_department_courses(html)
writer = CourseJSONWriter()
writer.writeJSONToFile(department_courses, 'data/courses/' + department_name.lower().replace(' ', '_') + '.json')