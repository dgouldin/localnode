#!/bin/bash
cd /home/nko/deploy/
rm -rf node_modules
npm install

sudo kill -9 `pgrep node` 2>/dev/null

#sudo nohup /home/nko/.nvm/v0.4.10/bin/node /home/nko/deploy/server.js &

sudo /home/nko/node_modules/.bin/forever -l /home/nko/logs/  -o /home/nko/logs/stdout.log -e /home/nko/logs/stderr.log -p /home/nko/run -a -c /home/nko/.nvm/v0.4.10/bin/node /home/nko/deploy/server.js &
