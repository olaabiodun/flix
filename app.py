from flask import Flask, render_template, abort, request
import os
from random import random
from datetime import datetime, timezone
from fetchvideo import (fetch_new_video, fetch_top_rated_video, fetch_popular_video, 
                       fetch_movie_details, fetch_reviews, fetch_tv_series, 
                       fetch_series_details, fetch_series_season, fetch_series_episode,
                       fetch_movie_genres, fetch_anime, fetch_nollywood, fetch_hollywood,
                       fetch_bollywood, fetch_chinese, fetch_kdrama, fetch_actor_details)
from fetchlive import active_sports, fetch_live, fetch_select_live  

# Use the repository root for templates and static files so your existing
# HTML, css/, js/, img/ directories continue to work without moving files.
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

def format_timestamp(timestamp_ms, format='%Y-%m-%d %H:%M:%S'):
    """Convert Unix timestamp in milliseconds to formatted datetime string"""
    try:
        # Convert milliseconds to seconds and create datetime object
        timestamp_seconds = int(timestamp_ms) / 1000
        return datetime.fromtimestamp(timestamp_seconds).strftime(format)
    except (ValueError, TypeError):
        return timestamp_ms  # Return original if conversion fails

def countdown_to(timestamp_ms):
    """Calculate time remaining until the given timestamp"""
    try:
        target = datetime.fromtimestamp(int(timestamp_ms) / 1000, timezone.utc)
        now = datetime.now(timezone.utc)
        delta = target - now
        
        if delta.days < 0:
            return "Live Now!"
            
        days = delta.days
        hours, remainder = divmod(delta.seconds, 3600)
        minutes, _ = divmod(remainder, 60)
        
        if days > 0:
            return f"In {days}d {hours}h {minutes}m"
        elif hours > 0:
            return f"In {hours}h {minutes}m"
        else:
            return f"In {minutes}m"
    except (ValueError, TypeError):
        return "Coming Soon"

# Register filters
app.jinja_env.filters['format_timestamp'] = format_timestamp
app.jinja_env.filters['countdown_to'] = countdown_to

# Add current time to all templates
@app.context_processor
def inject_now():
    return {'now': datetime.now(timezone.utc)}

# Add genre mapping to all templates
@app.context_processor
def inject_genre_mapping():
    return {
        'genre_mapping': {
            28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
            80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
            14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
            9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
            10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
        }
    }


def template_exists(path: str) -> bool:
    """Return True if a template file exists in the configured template_folder."""
    full = os.path.join(app.template_folder, path)
    return os.path.isfile(full)


@app.route('/')
def index():
    movie_data = fetch_new_video()
    top_rated_data = fetch_top_rated_video()
    popular_data = fetch_popular_video()
    active_sports_data = active_sports()
    live_data = fetch_live()
    tv_series_data = fetch_tv_series()
    genre_map = fetch_movie_genres()
    return render_template('index.html', 
                         movies=movie_data.get('results', []), 
                         top_rated=top_rated_data.get('results', []), 
                         popular=popular_data.get('results', []), 
                         active_sports=active_sports_data, 
                         live=live_data, 
                         tv_series=tv_series_data.get('results', []),
                         genre_map=genre_map,
                         random=random)


@app.route('/movies')
def movies():
    """Fetch and display movies from TMDB API"""
    try:
        movie_data = fetch_new_video()
        genre_map = fetch_movie_genres()
        return render_template('movies.html', 
                            movies=movie_data.get('results', []),
                            genre_map=genre_map)
    except Exception as e:
        # If API fails, show error page or fallback
        print(f"Error fetching movies: {e}")
        return render_template('movies.html', 
                            movies=[], 
                            genre_map={}, 
                            error="Failed to fetch movies")


@app.route('/<path:page>')
def render_page(page: str):
    # Allow routes like /about or /about.html
    if not page.endswith('.html'):
        page = page + '.html'
    if template_exists(page):
        return render_template(page)
    abort(404)


@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404

def get_video_url(id):
    """Return the URL for a video with the given ID."""
    return f"https://vidsrc.cc/v2/embed/movie/{id}"

def get_series_url(id):
    """Return the URL for a series with the given ID."""
    return f"https://vidsrc.cc/v2/embed/tv/{id}"


@app.route('/movie/<id>')
def movie(id):
    movie_data = fetch_movie_details(id)
    video_url = get_video_url(id)
    reviews = fetch_reviews(id)
    return render_template('movie.html', video=video_url, movie=movie_data, reviews=reviews)

@app.route('/stream/<id>')
def stream(id):
    live_data = fetch_live()
    stream_data = fetch_select_live(id)
    video_data = stream_data.get('data', {})
    stream_sources = video_data.get('sources', [])
    return render_template('stream.html', video=video_data, stream_src=stream_sources, live=live_data)

@app.route('/early-access')
def early_access():
    movies = fetch_new_video()
    return render_template('early_access.html', movie_data=movies.get('results', []))

@app.route('/watchlist')
def watchlist():
    return render_template('watchlist.html')

@app.route('/actor/<id>')
def actor(id):
    actor = fetch_actor_details(id)
    return render_template('actor.html')

@app.route('/live')
def live():
    return render_template('live.html')

@app.route('/series/<id>')
def series(id):
    series_data = fetch_series_details(id)
    series_url = get_series_url(id)
    reviews = fetch_reviews(id)
    seasons = fetch_series_season(id)
    episodes = fetch_series_episode(id, seasons.get('season_number', 1), 1)
    return render_template('tvseries.html', series_url=series_url, series=series_data, reviews=reviews, seasons=seasons, episodes=episodes)


@app.route('/series')
def series_list():
    return render_template('series.html')

@app.route('/hollywood')
def hollywood():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        hollywood_data = search_hollywood(search_query, page=page)
    else:
        hollywood_data = fetch_hollywood(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/hollywood.html',
                         hollywood_results=hollywood_data.get('results', []),
                         page=hollywood_data.get('page', 1),
                         total_pages=hollywood_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

@app.route('/bollywood')
def bollywood():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        bollywood_data = search_bollywood(search_query, page=page)
    else:
        bollywood_data = fetch_bollywood(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/bollywood.html',
                         bollywood_results=bollywood_data.get('results', []),
                         page=bollywood_data.get('page', 1),
                         total_pages=bollywood_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

@app.route('/chinese')
def chinese():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        chinese_data = search_chinese(search_query, page=page)
    else:
        chinese_data = fetch_chinese(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/chinese.html',
                         chinese_results=chinese_data.get('results', []),
                         page=chinese_data.get('page', 1),
                         total_pages=chinese_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

@app.route('/kdrama')
def kdrama():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        kdrama_data = search_kdrama(search_query, page=page)
    else:
        kdrama_data = fetch_kdrama(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/kdrama.html',
                         kdrama_results=kdrama_data.get('results', []),
                         page=kdrama_data.get('page', 1),
                         total_pages=kdrama_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

@app.route('/nollywood')
def nollywood():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        nollywood_data = search_nollywood(search_query, page=page)
    else:
        nollywood_data = fetch_nollywood(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/nollywood.html',
                         nollywood_results=nollywood_data.get('results', []),
                         page=nollywood_data.get('page', 1),
                         total_pages=nollywood_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

@app.route('/anime')
def anime():
    search_query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    
    if search_query:
        anime_data = search_anime(search_query, page=page)
    else:
        anime_data = fetch_anime(page=page)
    
    genre_mapping = fetch_movie_genres()
    return render_template('templates/categories/anime.html',
                         anime_results=anime_data.get('results', []),
                         page=anime_data.get('page', 1),
                         total_pages=anime_data.get('total_pages', 1),
                         genre_mapping=genre_mapping,
                         search_query=search_query)

if __name__ == '__main__':
    # Run directly with python app.py for convenience during development.
    app.run(debug=True)
