#!/usr/bin/env bash

backend_response=$(curl -I -s --show-error http://localhost:4242 | grep "HTTP/1.1")
echo $backend_response
if [[ "$backend_response" == "HTTP/1.1 200 OK"* ]]; then
    echo "Sucessfully connected to backend"
else
    echo "Failed to connect to backend"
fi

frontend_response=$(curl -I -s --show-error http://localhost:5173 | grep "HTTP/1.1")
test "$frontend_response" = "HTTP/1.1 200 OK" || echo "Failed to connect to frontend"