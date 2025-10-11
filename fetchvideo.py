import requests
import requests_cache
from dotenv import load_dotenv
import os

from urllib3 import response

load_dotenv()
API_KEY = os.getenv("TMDB_API_KEY")

def fetch_tv_series():
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_series_details(id):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/tv/{}?language=en-US".format(id)
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_new_video():
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_top_rated_video():
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data
    
def fetch_popular_video():
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    params = {
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_series_season(id, season_number):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/tv/{id}/season/{season_number}?language=en-US"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data
   
def fetch_series_lists():
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/tv/{id}/season/{season_number}?language=en-US"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=param)
    data = response.json()
    return data


def fetch_series_episode(id, season_number, episode_number):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/tv/{id}/season/{season_number}/episode/{episode_number}?language=en-US".format(id=id, season_number=season_number, episode_number=episode_number)
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_movie_details(id):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/movie/{}?language=en-US".format(id)
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_reviews(id):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/movie/{}/reviews?language=en-US&page=1".format(id)
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_actor_details(actor_id):
    """Fetch details for a specific actor"""
    requests_cache.install_cache(expire_after=3600*5)
    url = f"https://api.themoviedb.org/3/person/{actor_id}?language=en-US"
    params = {
        "api_key": API_KEY,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def fetch_movie_genres():
    """Fetch movie genres from TMDB API and return a dictionary mapping genre IDs to names"""
    requests_cache.install_cache(expire_after=3600*24)  # Cache for 24 hours
    url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US"
    params = {
        "api_key": API_KEY,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return {genre['id']: genre['name'] for genre in data.get('genres', [])}
    except Exception as e:
        print(f"Error fetching genres: {e}")
        return {}

def fetch_anime(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "210024"  # Anime keyword ID
    }
    response = requests.get(url, params=params)
    return response.json()

def fetch_nollywood(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "284361"
    }   
    response = requests.get(url, params=params)
    data = response.json()
    return data
    
def fetch_bollywood(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "240424"
    }   
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_kdrama(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "272877"
    }   
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_chinese(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "13159"
    }   
    response = requests.get(url, params=params)
    data = response.json()
    return data

def fetch_hollywood(page=1):
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "include_adult": "false",
        "include_video": "false",
        "language": "en-US",
        "page": page,
        "sort_by": "popularity.desc",
        "with_keywords": "12396"
    }   
    response = requests.get(url, params=params)
    data = response.json()
    return data

def search_anime(query, page=1):
    """Search for anime by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "210024"  # Anime keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def search_nollywood(query, page=1):
    """Search for nollywood by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "284361"  # Nollywood keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def search_bollywood(query, page=1):
    """Search for bollywood by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "240424"  # Bollywood keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def search_kdrama(query, page=1):
    """Search for kdrama by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "272877"  # Kdrama keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

def search_chinese(query, page=1):
    """Search for chinese by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "13159"  # Chinese keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data
    
def search_hollywood(query, page=1):
    """Search for hollywood by query"""
    requests_cache.install_cache(expire_after=3600*5)
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": API_KEY,
        "query": query,
        "page": page,
        "include_adult": "false",
        "with_keywords": "12396"  # Hollywood keyword ID
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data

