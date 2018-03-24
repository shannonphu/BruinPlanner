from bs4 import BeautifulSoup

from HTMLFetcher import HTMLFetcher

ALL_DEPT_ROOT_LINK = "http://www.registrar.ucla.edu/Academics/Course-Descriptions"
BASE_URL = "http://www.registrar.ucla.edu"

class DepartmentLinkScraper:
    def getRegistrarLinks(self):
        fetcher = HTMLFetcher()
        html = fetcher.get(ALL_DEPT_ROOT_LINK)
        soup = BeautifulSoup(html, "html.parser")

        urls = []
        for cell in soup.find_all('td'):
            if not cell.find('a'):
                continue
            link_suffix = cell.find('a').get('href')
            urls.append(BASE_URL + link_suffix)

        return urls

