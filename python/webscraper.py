from collections import UserList
import requests
from bs4 import BeautifulSoup
import json
import sys
import struct
import nativemessaging
import json

class PubMed:

    # To do: Make construction function more general instead of just pubmed in the case of other databases implemented
    def __init__(self, searchTerm='', maxSearch='200'):
        # searchTerm will be sent from chrome extension where white spaces and nulls have been validated
        searchTerm = searchTerm.replace(" ", "+")
        url = "https://pubmed.ncbi.nlm.nih.gov/?term=%s&=%s"%(searchTerm, maxSearch)
        
        self.url = url
        self.searchTerm = searchTerm
        self.maxSearch = maxSearch
        self.soup = BeautifulSoup(requests.get(url).content, 'html5lib')

    def getMainSearchHTML(self):
        return self.soup

    def cycleThroughEachResultHTML(self):
        listUrlID = []
        pubMedResultURL = self.soup.findAll('a', attrs = {'class': 'docsum-title'})

        for id in pubMedResultURL:
            listUrlID.append(id.replace("/",""))



        



pubMedURL = "https://pubmed.ncbi.nlm.nih.gov/33301246/"
# get HTML code
pubMedSoup = BeautifulSoup(requests.get(pubMedURL).content, 'html5lib')
# find div with full text links
pubMedFullTextLinks = pubMedSoup.find('div', attrs = {'class':'full-text-links-list'})
# find a tag element from full text
pmcElement = pubMedSoup.find('a', attrs = {'class':'link-item pmc'})
# get the URL of the full text page
pubMedFullTextURL = pmcElement["href"]
# load the HTML of the full text link
pubMedFullTextSoup = BeautifulSoup(requests.get(pubMedFullTextURL).content, 'html5lib')
#print(pubMedFullTextSoup.prettify())
#print(pubMedFullTextSoup.select("p"))

while True:
    message = nativemessaging.get_message()
    if message == "hello":
        nativemessaging.send_message(nativemessaging.encode_message("world"))




