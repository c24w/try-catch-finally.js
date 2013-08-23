@echo off

title Karma try-catch-finally.js Compiled Source Runner

echo Building source...

cd ..

node build

cd test

echo Running tests...

set CHROME_BIN=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
set OPERA_BIN=C:\Program Files\Opera x64\opera.exe
set FIREFOX_BIN=C:\Program Files (x86)\Mozilla Firefox\firefox.exe

node ..\node_modules\karma\bin\karma start karma-compiled-source.conf.js

pause