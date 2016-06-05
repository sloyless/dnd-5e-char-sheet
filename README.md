# CR0
[![Build Status](https://travis-ci.org/sloyless/cr0.svg?branch=master)](https://travis-ci.org/sloyless/cr0)
[![devDependency Status](https://david-dm.org/sloyless/cr0/dev-status.svg?theme=shields.io)](https://david-dm.org/sloyless/cr0#info=devDependencies)

A Dungeons and Dragons 5E Character Generator/Sheet Webapp

Written using React/Redux.

## Dev Setup
Development is setup and compiled using Grunt.js. It will watch for Sass and Javascript file changes, compile, and autoprefix CSS. A web server is loaded using BrowserSync which will inject any new changes without a page reload.

`grunt` will launch the dev/watch processes. Sourcemaps will be created and Sass output is in `compact` mode.
`grunt build` will output server-ready versions of all files. No sourcemaps will be created and Sass output is in `compressed` mode.

### Requirements:
(Install at global level)
* Node (>= 5.0.0)
* Grunt
* BrowserSync

### Running the project
Download/Fork the project, navigate to project folder in Terminal and run:
* npm install
* grunt
