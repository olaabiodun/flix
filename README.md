pip install -r requirements.txt# Flask conversion for static HTML site

This repository contains a set of static HTML pages and assets. `app.py` is a
minimal Flask application that serves those HTML files as templates so you can
run the site with Flask without moving files.

Quick start (Windows PowerShell):

1. Create and activate a virtual environment if you don't have one:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Run the app:

```powershell
python app.py
```

Open http://127.0.0.1:5000/ in your browser. Any path like `/about` will try
to render `about.html`. Static assets (css/, js/, img/) are served from the
project root so existing links in the HTML should keep working.

Notes:
- This is a minimal conversion. If you want Blueprints, dynamic views, or
  database-backed pages, I can wire those up next.
