#EuleyJS
EuleyJS is a commandline tool for greasing up your rusty programming and math skills through [Project Euler](http://projecteuler.net/) challenges. Use the `euler` command line interface to generate a prompt in JavaScript or CoffeeScript and verify your answers when you're done.

##Installation
EuleyJS is an installable via npm and depends on [Node.js](http://nodejs.org/).
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
$ mkdir ./project-euler && cd ./project-euler
```

```
  Usage: euler [options]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c, --cheat [value]     Print answer
    -g, --generate [value]  Generate file with problem prompt
    -p, --preview [value]   Preview problem prompt
    -v, --verify [value]    Verify solution to problem
```

##Inspiration :heart:
EuleyJS is a port port of [Kevin Yap](http://kevinyap.ca/)'s [EulerPy](https://github.com/iKevinY/EulerPy) which was built on [Kyle Keen](http://kmkeen.com/)'s [Local Euler](http://kmkeen.com/local-euler/) resources.

##License
Licensed under the [MIT License](https://github.com/iKevinY/EulerPy/blob/master/LICENSE).