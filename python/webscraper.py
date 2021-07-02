import requests
from bs4 import BeautifulSoup
import json
import sys
import struct

pubMedURL = "https://pubmed.ncbi.nlm.nih.gov/33301246/"
pubMedSoup = BeautifulSoup(requests.get(pubMedURL).content, 'html5lib')
pubMedFullTextLinks = pubMedSoup.find('div', attrs = {'class':'full-text-links-list'})
pmcElement = pubMedSoup.find('a', attrs = {'class':'link-item pmc'})
pubMedFullTextURL = pmcElement["href"]
pubMedFullTextSoup = BeautifulSoup(requests.get(pubMedFullTextURL).content, 'html5lib')
print(pubMedFullTextSoup.prettify())
print(pubMedFullTextSoup.select("p"))