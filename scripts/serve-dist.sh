#!/usr/bin/env sh
# Serve the built app without npm — only needs Python 3.
cd "$(dirname "$0")/../dist" || exit 1
if [ ! -f index.html ]; then
  echo "Run 'npm run build' first (creates dist/)."
  exit 1
fi
echo "Open http://localhost:8080/  (Ctrl+C to stop)"
exec python3 -m http.server 8080
