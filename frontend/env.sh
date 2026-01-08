#!/bin/sh
touch /usr/share/nginx/html/env-config.js
set +e
echo "window.env = {" > /usr/share/nginx/html/env-config.js
if [ -n "$VITE_API_URL" ]; then
  echo "  \"VITE_API_URL\": \"$VITE_API_URL\"," >> /usr/share/nginx/html/env-config.js
else
  echo "  \"VITE_API_URL\": \"http://localhost:3000\"," >> /usr/share/nginx/html/env-config.js
fi
echo "}" >> /usr/share/nginx/html/env-config.js
exec "$@"
