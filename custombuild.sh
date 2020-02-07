#!/bin/sh
#ng build mtable --prod --output-hashing=none && cat dist/mtable/runtime-es2015.js dist/mtable/polyfills-es2015.js dist/mtable/scripts.js dist/mtable/main-es2015.js > preview/angularapp.js

ng build mtable --prod --output-hashing=none && cat dist/mtable/runtime.js dist/mtable/polyfills.js dist/mtable/scripts.js dist/mtable/main.js > preview/angularapp.js
