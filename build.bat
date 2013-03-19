@echo off
set r=node_modules/requirejs/bin/r.js
node %r% -o build.js
node %r% -o build.min.js
pause