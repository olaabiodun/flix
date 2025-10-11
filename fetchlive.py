import requests
import requests_cache

def active_sports():
    url = "https://streamed.pk/api/sports"
    response = requests.get(url)
    data = response.json()
    get2 = data[:2]
    return get2

def fetch_live():
    url = "https://streami.su/api/matches/football/popular"
    response = requests.get(url)
    data = response.json()
    get10 = data[:10]
    return get10

def fetch_select_live(id):
    url = f"https://livesport.su/api/matches/{id}/detail"
    response = requests.get(url)
    data = response.json()
    return data