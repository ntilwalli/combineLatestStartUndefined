var Rx = require('rx');

// Function copied directly from RxJS/src/core/linq/observable/combinelatest.js
function argumentsToArray() {
  var len = arguments.length, args = new Array(len);
  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
  return args;
}

// Function copied directly from RxJS/src/modular/helpers/isfunction.js
var isFunction = (function () {
  var isFn = function (value) {
    return typeof value === 'function' || false;
  };

  // fallback for older versions of Chrome and Safari
  if (isFn(/x/)) {
    isFn = function(value) {
      return typeof value === 'function' &&
        Object.prototype.toString.call(value) === '[object Function]';
    };
  }
  return isFn;
}())

function combineLatestStartUndefined() {
  var len = arguments.length, args = new Array(len);
  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
  var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
  Array.isArray(args[0]) && (args = args[0]);
  len = args.length, argsWithStart = new Array(len);
  for(i = 0; i < len; i++) { argsWithStart[i] = args[i].startWith(undefined); }

  return Rx.Observable.combineLatest(argsWithStart, resultSelector)
}

module.exports = combineLatestStartUndefined;
