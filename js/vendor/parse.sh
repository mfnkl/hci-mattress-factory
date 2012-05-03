#!/usr/bin/env bash

# Run this to get your base64 encoded Basic Auth header. 
# Get your credentials at https://www.parse.com/apps/{your app}
# NEW! You don't need to use Basic auth now! Parse.com now supports CORS...https://parse.com/docs/rest

export APPLICATION_ID=""
export MASTER_KEY=""

curl --user $APPLICATION_ID:$MASTER_KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"body": "This is a test task"}' \
  -lv https://api.parse.com/1/classes/tasks