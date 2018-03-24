import urllib2

class HTMLFetcher:
	def get(self, url):
		html = urllib2.urlopen(url).read()
		return html
		