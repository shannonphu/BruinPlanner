import urllib2

class CourseFetcher:
	def fetch_department_courses(self, url):
		html = urllib2.urlopen(url).read()
		return html
		