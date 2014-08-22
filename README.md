#EuleyJS     [![Build Status](https://travis-ci.org/EulerJS/EulerJS.svg?branch=master)](https://travis-ci.org/EulerJS/EulerJS)

EuleyJS is a commandline tool for greasing up your rusty programming and math skills through [Project Euler](http://projecteuler.net/) challenges. Use the `euler` command line interface to generate a prompt in JavaScript or CoffeeScript and verify your answers when you're done.

##Installation
EuleyJS is installable via npm and depends on [Node.js](http://nodejs.org/).
```
$ npm install -g euler
```

Uninstallation is just as simple.
```
$ npm uninstall -g euler
```

##Usage
To start out, you'll want to create a project-euler directory and `cd` into it.
```
$ mkdir project-euler && cd project-euler
```

```
  Usage: euler [options]

  Options:

    --version               output the version number
    -h, --help              output usage information
    -s, --solve    [value]  Print solution
    -g, --generate [value]  Generate file with problem prompt
    -c, --coffee   [value]  Generate coffeescript file with problem prompt
    -p, --preview  [value]  Preview problem prompt
    -v, --verify   [value]  Verify solution to problem
    -V  --verify-all        Verify all solutions in cwd
```

So, if you're trying to verify your solution for euler_123.coffee, you'd type something like
```
$ euler -vc 123
```
and you'd get the following output:
```
-------------------------------
Problem 123
undefined is incorrect
207ms run time
-------------------------------
```

##Inspiration :heart:
EuleyJS is a port port of [Kevin Yap](http://kevinyap.ca/)'s [EulerPy](https://github.com/iKevinY/EulerPy) which was built on [Kyle Keen](http://kmkeen.com/)'s [Local Euler](http://kmkeen.com/local-euler/) resources.

##License
Licensed under the MIT License.
