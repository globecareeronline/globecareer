#!/usr/bin/env python3
"""
GlobeCareer - Local Preview Server Launcher (Python Fallback)
Zero npm/node dependencies required. Serves the pre-compiled production build.
Includes SPA (Single Page Application) routing fallback.
"""
import http.server
import socketserver
import webbrowser
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Prefer dist directory if present, else fallback to root
if os.path.isdir(os.path.join(BASE_DIR, "dist")):
    SERVE_DIR = os.path.join(BASE_DIR, "dist")
else:
    SERVE_DIR = BASE_DIR

DEFAULT_PORT = 8080

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SERVE_DIR, **kwargs)

    def do_GET(self):
        # Resolve requested file path
        path = self.translate_path(self.path)
        # If path is a directory or does not exist and doesn't look like a static asset, serve index.html (SPA routing)
        if not os.path.exists(path) and not any(self.path.endswith(ext) for ext in [
            '.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.json', '.webmanifest', '.woff2', '.woff', '.ttf', '.txt'
        ]):
            self.path = '/index.html'
        return super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

def main():
    print("=" * 70, flush=True)
    print("  GlobeCareer - International Career Platform", flush=True)
    print("  Local Preview Server (Python)", flush=True)
    print(f"  Serving: {SERVE_DIR}", flush=True)
    print("=" * 70, flush=True)

    port = DEFAULT_PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), SPAHandler) as httpd:
                url = f"http://localhost:{port}"
                print(f"\n[OK] Server running at {url}", flush=True)
                print("[INFO] Press Ctrl+C in this terminal to stop the server.\n", flush=True)
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno in (48, 98, 10048):
                port += 1
                print(f"[INFO] Port busy, trying port {port}...", flush=True)
            else:
                print(f"[ERROR] Could not start server: {e}", flush=True)
                sys.exit(1)
        except KeyboardInterrupt:
            print("\n[INFO] Server stopped.", flush=True)
            sys.exit(0)

if __name__ == '__main__':
    main()
