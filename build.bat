@echo off
set d=%~dp0
set r=%d%/node_modules/requirejs/bin/r.js
node %r% -o %d%/build.js
node %r% -o %d%/build.min.js
pause