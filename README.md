#normalRandomGenerator.js
***
normalRandomGenerator is a module that generates random numbers in a normally (gaussian) distributed set.

##Initialization
The constructor function is called `normalRandom()`.
`var myNormalRandomGenerator = new normalRandom();`
The constructor function takes two optional parameters.
-`stdev` {number} The standard deviation for the set (default: 1).
-`mean` {number} The mean for the set (default: 0).
The class defines a `reset()` method which takes the same optional parameters. This method clears the cache of values from the set and resets the mean and standard deviation for the set. If no parameters are passed to it, the mean and standard deviation are reset to the defaults (0 and 1, respectively).

##Generating Values
The class defines a `get()` method which returns values from the set defined at initialization.
`var myNormalRandomGenerator = new normalRandom();
var randomNumber = myNormalRandomGenerator.get(); // returns a single value`
If this method is called without a parameter, it returns a single value (number).
Optionally, the `get()` method accepts a single parameter - a number (integer) `count` that indicates the number of results to return. If this parameter is set to any value greater than 1, the method returns an array of values of that length.
`var myNormalRandomGenerator = new normalRandom();
var randomNumber = myNormalRandomGenerator.get(5); // returns an array of 5 values`

##AMD Support
normalRandomGenerator supports AMD. If the class is defined in the presence of a define() function, it will be used to define a module. Otherwise, it will be accessible at window scope.
The AMD module returns a constructor function which can be used within other modules.

##About the Math
This class generates normally distributed random numbers using the Box-Muller Transform. I am not a mathematician and do not understand the math, but [you can read about it on wikipedia](http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) and explain it to me over beers.

##Version History
###1.0.0 2013.11.22
First release. Generates random numbers in pairs and returns either a single value or an array of specified length.