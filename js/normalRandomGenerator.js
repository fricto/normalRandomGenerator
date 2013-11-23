/**
 * normalRandomGenerator.js - Normally Distrbuted (Guassian) Random Number Generator for Javascript
 *
 * @author Michael Paull <me@michaelpaull.com>
 * @license Released under the MIT License.
 * @version 1.0.0
 */

(function(){



  /**
   * normalRandomGenerator Constructor.
   * @constructor
   * @param {number} stdev Standard deviation for the set. Default = 1.
   * @param {number} mean Mean (average) for the set. Default = 0.
   */
  function normalRandomGenerator(stdev, mean) {
    this.stdev = stdev || 1;
    this.mean = mean || 0;

    /** The generate function produces 2 return values when it runs; the second is stored in this.cachedValue. */
    this.cachedValue = undefined;
  }



  /**
   * reset() is used to clear the cache and, optionally, set a new standard deviation and/or mean.
   * @function reset
   * @param {number} stdev Standard deviation for the set. Default = 1.
   * @param {number} mean Mean (average) for the set. Default = 0.
   */
  normalRandomGenerator.prototype.reset = function (stdev, mean) {

    /** Sanitize the parameters (must be valid numbers). */

    stdev = ( typeof stdev === 'number' ) ? stdev : 1;
    mean = ( typeof mean === 'number' ) ? stdev : 0;

    /** Initialize cachedValue to undefined. Holds the cached value when getValue runs. Otherwise, undefined. */
    this.cachedValue;
  };



  /**
   * get() is used to return normally distributed random numbers, either individually or as an array of length specified by the count param.
   * @function get
   * @param {number} count Numnber of results to be returned. Returned as an array if count > 1.
   */
  normalRandomGenerator.prototype.get = function (count) {
    var result;

    /** If the count param is (or could be) a truthy value but not a number, set it to 1. */
    if ( typeof count !== 'number' ) {
      count = 1;
    }

    /** Make sure count is an integer. */
    count = Math.floor(count);

    /** Make sure count is > 1 */
    count = count || 1;

    /** If count is 1, return a single value by calling generate. Otherwise, return an array of values of length 'count'. */
    if ( count === 1 ) {
      result = this.getValue();
    } else {
      result = [];
      for ( var resultCount = 0; resultCount < count; resultCount++ ) {
        result.push( this.getValue() );
      }
    }

    return result;
  };



  /**
   * getValue() returns the cached value or calls the generate() method and returns it's result if no cached value is available.
   *   This method is not intended to be called directly.
   * @function getValue
   */
  normalRandomGenerator.prototype.getValue = function () {
    var result;

    /** If there is a cached value, return it. Otherwise, call generate() and return it's result. */
    if ( this.cachedValue !== undefined ) {
      result = this.cachedValue;
      this.cachedValue = undefined;
    } else {
      result = this.generate();
    }

    return result;
  };



  /**
   * generate() actually generates the random numbers. It creates 2, returns one, and caches the other.
   *   This method is not intended to be called directly.
   * @function generate
   */
  normalRandomGenerator.prototype.generate = function () {
    var result, value1, value2, variance;

    /**
     * Generate a new pair of uniformly distributed random numbers
     * then perform the polar form of the Box-Muller transformation on them
     * to generate a pair of normally (Gaussian) distrbuted random numbers.
     */
    do {
      value1 = 2 * Math.random() - 1;
      value2 = 2 * Math.random() - 1;
      variance = value1 * value1 + value2 * value2;
    } while ( variance >= 1.0 );
    variance = Math.sqrt( ( -2.0 * Math.log(variance) ) / variance );

    /** The first result value, which will be returned directly. */
    result = (value1 * variance) * this.stdev + this.mean;

    /** The second result value, which will be cached. */
    this.cachedValue = (value2 * variance) * this.stdev + this.mean;

    return result;
  };



  /** 
   * If define() is defined as a function, assume AMD pattern is in use and define a module.
   * Otherwise, append the constructor to the window object.
   */
  if ( typeof define === 'function' ) {
    define(function () {return normalRandomGenerator;});
  } else {
    window.normalRandom = normalRandomGenerator;
  }


})();