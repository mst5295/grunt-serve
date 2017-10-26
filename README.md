# grunt-serve

> Starts a http server that can be called to run Grunt tasks and serve files with JsonWebToken.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started)
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once
you're familiar with that process, you may install this plugin with this command:

```shell
npm install <url> --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-serve');
```

## The "serve" task

### Overview

This task allows you to create a http server that can be called to run Grunt tasks and serve files.

Once the task is run, The HTTP server can be accessed by loading the page `http://localhost:9000/`.
This will show you your configured aliases as well as the files that can be access using this server.

Here is a summary of how the server will behave:
 * Calls to / will display a page with some information (configures aliases, files that can be served, directory browsing, ...).
 * Calls to /task/{task1},{task2}/{output} will run the given tasks and return the file named output (see example later).
 * Calls to /{alias} ({alias} being an alias that you have configured) will run the tasks defined for that alias.
 
### Options

#### options.port
Type: `Integer`  
Default value: `9000`

The port that the server should be running on.

#### options.aliases
Type: `Object`  
Default value: `null`

Aliases allows you to configure what tasks should be run and what file should
be returned for a specific path. In the following example, calling http://localhost:9000/client.js
will trigger running the tasks 'html2js', 'concat' and 'minify'. When all the tasks have been executed grunt stdout will be returned the content type 'text/javascript' will be set in the 
headers.

```javascript
	'aliases': {
		'client.js': {
			tasks: ['html2js', 'concat', 'minify'], // required
			contentType: 'text/javascript' // optional
		},
		...
	}
```

#### options.silently
Type: `Boolean`  
Default value: `false`

Controls whether or not to print the build logs in the terminal.

#### options.serve
Type: `Object`  
Default value: `null`

Configuration of serve. The only thing configurable right now is the base path to serve. By default, if no path is specified,
it will automatically serve the files in the grunt working directory. If you want another path to be served, you can either
put a relative or absolute path as shown below. This will only affect the serve feature (aliases or /task output path will
always be related to the grunt working directory). 

```javascript
	'serve': {
		'path': '/Users/user/Documents/workspace/project'
	}
```

### Usage Examples

#### Basic Use - Running tasks with zero configuration

In this example, `grunt serve` will start a web server at `http://localhost:9000/`. Any call to /task will trigger a build as described below.
 * If you go to http://localhost:9000/task/concat it will execute the task 'concat' and return the stdout and stderr that grunt outputed.

```javascript
// Project configuration.
grunt.initConfig({
	serve: {
		options: {
			port: 9000
		}
	}
});
```

#### Using Aliases

In this example, `grunt serve` will start a web server at `http://localhost:9000/`.
 * If you go to http://localhost:9000/client.js it will execute the tasks 'html2js' and 'concat' and return the stdout and stderr.

```javascript
// Project configuration.
grunt.initConfig({
	serve: {
		options: {
			port: 9000,
			'client.js': {
				tasks: ['html2js', 'concat']
			}
		}
	}
});
```

#### Output logs

In this example, `grunt serve` will start a web server at `http://localhost:9000/`.
 * If you go to http://localhost:9000/client.js it will execute the tasks 'html2js' and 'concat' and return the stdout and stderr
that were outputed by grunt while running those tasks.

```javascript
// Project configuration.
grunt.initConfig({
	serve: {
		options: {
			port: 9000,
			'client.js': {
				tasks: ['html2js', 'concat'],
				output: 'stdout'
			}
		}
	}
});
```

#### Serve files

In this example, `grunt serve` will start a web server at `http://localhost:9000/`.

If you are a request did not match any alias, the server will try to find a file matching the request path.
For example if you load `http://localhost:9000/pages/index.html` (and no alias for 'pages/index.html' was configured)
the server check if the file "pages/index.html" exists. If it does, it will return it. Otherwise it will return a 
404 Not found page.

```javascript
// Project configuration.
grunt.initConfig({
	serve: {
		options: {
			port: 9000
		}
	}
});
```

## Release History

 * 2014-03-23   0.1.0    First Release
 * 2014-03-23   0.1.1    Minor improvements
 * 2014-03-24   0.1.2    Documentation changes
 * 2014-03-24   0.1.3    Improved URL parsing
 * 2014-09-16   0.1.4    Fixed unresponsive server issue
 * 2014-09-27   0.1.5    Added serves files and nicer pages
 * 2014-09-27   0.1.6    Bug fix and code refactoring.


## generate Key
You need a JSON-Web-Token to access to the server. Create your token as follows

```bash
set RANDFILE=<projectpath>\.rnd
set OPENSSL_CONF=C:\OpenSSL-Win32\bin\openssl.cfg

c:\OpenSSL-Win32\bin\openssl.exe
genrsa -out private.key 2048
rsa -in private.key -outform PEM -pubout -out public.pem
```

### hand over the key-location
To hand over the location of the public-key file, you should use the option keypath of serve in your Gruntfile.
```javascript
serve: {
            options: {
                port: 9000,
                keypath: './assist/public.pem',
            }
        },
```
## generate Token

```javascript
var jwt = require ('jsonwebtoken');
var fs = require("fs");
var cert = fs.readFileSync('private.key');
var token = jwt.sign({foo:'bar'}, cert,{algorithm: 'RS256', expiresIn: '10h'});
console.log(token);
```
To generate a token use following command on your bash. The current directory should contain the generateToken.js file.
```bash
node generateToken.js
```
## Tests
To test the functionality of our edited serve, we create tests.
This tests check if the serve return the right statuscodes for different events. This tests also check if the serve return the right body for these different events. The tests include three groups of tests. 
* Check the base-URL `http://localhost:9000/`.
* Check an existing task `http://localhost:9000/task/_serve_selftest`
* Check a non existing task `http://localhost:9000/task/fail_serve_selftest`

Every group includes the three following tests.
* Request without webtoken
* Request with wrong webtoken
* Request with right webtoken

## Task
### _serve_selftest
This task just log on the console `task testing successful`. It is just created for testing.

### (in progress) _serve_selfupdate
This task updates the repository with the node-git-pull-module and exit the serve-task.
There is a loop in a dockerfile, which will `npm install` the changes and restart the serve-task.