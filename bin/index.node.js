/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(28)('wks');
var uid = __webpack_require__(17);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(22);
var hide = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(23);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(43);
var defined = __webpack_require__(25);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(29);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(25);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(46)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(39);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(67);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(28)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(79);
var enumBugKeys = __webpack_require__(29);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(41)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(80).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global require */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _settings = __webpack_require__(36);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = initializer;


function initializer() {
    var profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _settings2.default.default;

    if (typeof profile === 'string') {
        if (_settings2.default.all.includes(profile)) {
            return __webpack_require__(51)("./" + profile);
        } else {
            return __webpack_require__(51)("./" + _settings2.default.default);
        }
    } else {
        return profile;
    }
}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {"all":["none","measure"],"default":"none"}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(32);
var wksExt = __webpack_require__(37);
var defineProperty = __webpack_require__(4).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(41)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(71)(false);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(26);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(73);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(83);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(32);
var $export = __webpack_require__(2);
var redefine = __webpack_require__(47);
var hide = __webpack_require__(9);
var has = __webpack_require__(8);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(78);
var setToStringTag = __webpack_require__(34);
var getPrototypeOf = __webpack_require__(48);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(19);
var IE_PROTO = __webpack_require__(27)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(49);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./measure": 52,
	"./measure.js": 52,
	"./none": 53,
	"./none.js": 53,
	"./profiler": 35,
	"./profiler.js": 35,
	"./settings": 36,
	"./settings.json": 36
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 51;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global global, performance */



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.utility = exports.entryPoint = undefined;

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = __webpack_require__(88);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(45);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.entryPoint = entryPoint;
exports.utility = utility;


function entryPoint(fn) {
    return profiler(fn);
}

function utility(fn) {
    return profiler(fn);
}

function profiler(fn) {
    var DEFAULT_META = { times: 0, total: 0, mean: 0 };
    var name = fn.name;


    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _args$slice = args.slice(-1),
            _args$slice2 = (0, _slicedToArray3.default)(_args$slice, 1),
            _args$slice2$ = _args$slice2[0],
            probablyMeta = _args$slice2$ === undefined ? { $$meta: 0 } : _args$slice2$;

        var params = probablyMeta.$$meta ? args.slice(0, -1) : args;

        if (probablyMeta.$$meta) {
            if (!probablyMeta.args) {
                probablyMeta.args = args.slice(0, -1);
            }

            if (!probablyMeta.times) {
                probablyMeta.times = 0;
            }

            global.gridMeta = probablyMeta;

            if (!probablyMeta.startTime) {
                probablyMeta.startTime = performance.now();
            }
        }

        var startTime = performance.now();
        var result = fn.apply(undefined, (0, _toConsumableArray3.default)(params));
        var endTime = performance.now();

        var meta = global.gridMeta || {};

        if (!meta[name]) {
            meta[name] = (0, _assign2.default)({}, DEFAULT_META);
        }

        meta[name].times++;
        meta[name].total += endTime - startTime;
        meta[name].mean = meta[name].total / meta[name].times;

        if (probablyMeta.$$meta) {
            probablyMeta.endTime = performance.now();
            probablyMeta.totalTime = probablyMeta.endTime - probablyMeta.startTime;
            probablyMeta.times++;
            probablyMeta.meanTime = probablyMeta.totalTime / probablyMeta.times;

            delete global.gridMeta;
        }

        return result;
    };
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.entryPoint = entryPoint;
exports.utility = utility;


function entryPoint(fn) {
    return fn;
}

function utility(fn) {
    return fn;
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _vector = __webpack_require__(55);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Corner = function () {
    function Corner(id) {
        (0, _classCallCheck3.default)(this, Corner);

        (0, _assign2.default)(this, {
            id: id,
            corners: new Array(3),
            edges: new Array(3),
            tiles: new Array(3),
            vector: new _vector2.default()
        });
    }

    (0, _createClass3.default)(Corner, [{
        key: 'position',
        value: function position(instance) {
            switch (instance.constructor) {
                case Corner:
                    {
                        return this.corners.indexOf(instance);
                    }
                default:
                    {
                        console.error(this, instance, 'instance class should be one of the following: ' + Corner.name);
                        return -1;
                    }
            }
        }
    }]);
    return Corner;
}();

exports.default = Corner;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hypot = __webpack_require__(97);

var _hypot2 = _interopRequireDefault(_hypot);

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vector3 = function () {
    function Vector3() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        (0, _classCallCheck3.default)(this, Vector3);

        (0, _assign2.default)(this, { x: x, y: y, z: z });
    }

    (0, _createClass3.default)(Vector3, [{
        key: 'normalize',
        value: function normalize() {
            return this.constructor.normalize(this, this);
        }
    }, {
        key: 'add',
        value: function add(u) {
            return this.constructor.add(this, u, this);
        }
    }, {
        key: 'xyz',
        set: function set(_ref) {
            var _ref$x = _ref.x,
                bx = _ref$x === undefined ? 0 : _ref$x,
                _ref$y = _ref.y,
                by = _ref$y === undefined ? 0 : _ref$y,
                _ref$z = _ref.z,
                bz = _ref$z === undefined ? 0 : _ref$z,
                _ref$ = _ref[0],
                x = _ref$ === undefined ? bx : _ref$,
                _ref$2 = _ref[1],
                y = _ref$2 === undefined ? by : _ref$2,
                _ref$3 = _ref[2],
                z = _ref$3 === undefined ? bz : _ref$3;

            (0, _assign2.default)(this, { x: x, y: y, z: z });
        }
    }, {
        key: 'length',
        get: function get() {
            var x = this.x,
                y = this.y,
                z = this.z;


            return (0, _hypot2.default)(x, y, z);
        }
    }], [{
        key: 'eq',
        value: function eq(v, u) {
            var vx = v.x,
                vy = v.y,
                vz = v.z;
            var ux = u.x,
                uy = u.y,
                uz = u.z;


            return vx === ux && vy === uy && vz === uz;
        }
    }, {
        key: 'neq',
        value: function neq(v, u) {
            return !this.eq(v, u);
        }
    }, {
        key: 'add',
        value: function add(v, u) {
            var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();
            var vx = v.x,
                vy = v.y,
                vz = v.z;
            var ux = u.x,
                uy = u.y,
                uz = u.z;


            return (0, _assign2.default)(destination, { x: vx + ux, y: vy + uy, z: vz + uz });
        }
    }, {
        key: 'subtract',
        value: function subtract(v, u) {
            var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();
            var vx = v.x,
                vy = v.y,
                vz = v.z;
            var ux = u.x,
                uy = u.y,
                uz = u.z;


            return (0, _assign2.default)(destination, { x: vx - ux, y: vy - uy, z: vz - uz });
        }
    }, {
        key: 'multiply',
        value: function multiply(v, k) {
            var destination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector3();
            var vx = v.x,
                vy = v.y,
                vz = v.z;


            return (0, _assign2.default)(destination, { x: vx * k, y: vy * k, z: vz * k });
        }
    }, {
        key: 'isZero',
        value: function isZero(v) {
            return this.eq(v, ZERO);
        }
    }, {
        key: 'isParallel',
        value: function isParallel(v, u) {
            return this.isZero(this.crossProduct(v, u));
        }
    }, {
        key: 'normalize',
        value: function normalize(v) {
            var destination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3();

            return this.multiply(v, 1 / v.length, destination);
        }
    }, {
        key: 'crossProduct',
        value: function crossProduct(v, u) {
            var vx = v.x,
                vy = v.y,
                vz = v.z;
            var ux = u.x,
                uy = u.y,
                uz = u.z;


            return new Vector3(vy * uz - vz * uy, vz * ux - vx * uz, vx * uy - vy * ux);
        }
    }, {
        key: 'dotProduct',
        value: function dotProduct(v, u) {
            var vx = v.x,
                vy = v.y,
                vz = v.z;
            var ux = u.x,
                uy = u.y,
                uz = u.z;


            return vx * ux + vy * uy + vz * uz;
        }
    }, {
        key: 'distance',
        value: function distance(v, u) {
            return this.subtract(v, u).length;
        }
    }, {
        key: 'angle',
        value: function angle(v, u) {
            return Math.acos(this.dotProduct(v, u) / (v.length * u.length));
        }
    }, {
        key: 'ZERO',
        get: function get() {
            return ZERO;
        }
    }]);
    return Vector3;
}();

var ZERO = new Vector3();

exports.default = Vector3;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isInteger = __webpack_require__(102);

var _isInteger2 = _interopRequireDefault(_isInteger);

var _getPrototypeOf = __webpack_require__(106);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(110);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(123);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proxyHandler = {
    get: function get(target, property) {
        var fixedProperty = isInteger(property) ? normalizeIndex(+property, target.length) : property;

        return target[fixedProperty];
    },
    set: function set(target, property, value) {
        var fixedProperty = isInteger(property) ? normalizeIndex(+property, target.length) : property;

        target[fixedProperty] = value;

        return true;
    }
};

var Stack = function (_Array) {
    (0, _inherits3.default)(Stack, _Array);

    function Stack(firstArg) {
        var _ref;

        var _ret;

        (0, _classCallCheck3.default)(this, Stack);

        for (var _len = arguments.length, restArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            restArgs[_key - 1] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Stack.__proto__ || (0, _getPrototypeOf2.default)(Stack)).call.apply(_ref, [this, firstArg].concat(restArgs)));

        if (isInteger(firstArg) && !restArgs.length) {
            _this.fill(null);
        }

        return _ret = new Proxy(_this, proxyHandler), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    return Stack;
}(Array);

exports.default = Stack;


function isInteger(value) {
    return typeof value === 'string' ? (0, _isInteger2.default)(+value) : (0, _isInteger2.default)(value);
}

function normalizeIndex(index, length) {
    return (index % length + length) % length;
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(111);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(113);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(42);
var hiddenKeys = __webpack_require__(29).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(18);
var createDesc = __webpack_require__(15);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(40);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* global process, require */



/*
* config:
*   -   profile
*   -   output
*   -   format
*   -   help
*   -   lod
*   -   fix
* */

var _stringify = __webpack_require__(62);

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = __webpack_require__(64);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(45);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _fs = __webpack_require__(86);

var _fs2 = _interopRequireDefault(_fs);

var _generator = __webpack_require__(87);

var _generator2 = _interopRequireDefault(_generator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (__webpack_require__.c[__webpack_require__.s] === module) {
    var config = process.argv.slice(2).reduce(function (accumulator, arg) {
        var _arg$split$filter = arg.split('=').filter(Boolean),
            _arg$split$filter2 = (0, _slicedToArray3.default)(_arg$split$filter, 2),
            key = _arg$split$filter2[0],
            _arg$split$filter2$ = _arg$split$filter2[1],
            value = _arg$split$filter2$ === undefined ? true : _arg$split$filter2$;

        return (0, _assign2.default)(accumulator, (0, _defineProperty3.default)({}, key, value));
    }, {});

    if (typeof config.help !== 'undefined') {
        console.log('show help');

        print(config);

        process.exit();
    }

    var grid = (0, _generator2.default)(config.profile)(config.lod ? parseInt(config.lod) : 0);

    var output = ({ tilesStats: tilesStats, toThreeJs: toThreeJs }[config.format] || toThreeJs)(grid, config);

    if (typeof config.output === 'string') {
        _fs2.default.writeFileSync(config.output, (0, _stringify2.default)(output), 'utf8');
    } else {
        print(output);
    }
} else {
    module.exports = {
        generator: _generator2.default
    };
}

function tilesStats(grid, config) {
    return {
        count: grid.tiles.length
    };
}

function toThreeJs(grid, config) {
    var vectors = [];
    var threeData = {
        t: [],
        v: []
    };

    grid.tiles.forEach(function (_ref) {
        var corners = _ref.corners;

        corners.forEach(function (_ref2) {
            var vector = _ref2.vector;

            vectors.includes(vector) || vectors.push(vector);
        });

        threeData.t.push(corners.map(function (_ref3) {
            var vector = _ref3.vector;
            return vectors.indexOf(vector);
        }));
    });

    if (typeof config.fix === 'string') {
        vectors.forEach(function (vector) {
            vector.normalize();
        });
    }

    vectors.forEach(function (_ref4) {
        var x = _ref4.x,
            y = _ref4.y,
            z = _ref4.z;

        threeData.v.push([x, y, z]);
    });

    return threeData;
}

function print(data) {
    console.log((0, _stringify2.default)(data));
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module)))

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(39);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(66);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(4).f });


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(69);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(70) });


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(18);
var toObject = __webpack_require__(19);
var IObject = __webpack_require__(43);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(11)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(44);
var toAbsoluteIndex = __webpack_require__(72);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(20);
module.exports = __webpack_require__(82);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(76);
var step = __webpack_require__(77);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(46)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(33);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(34);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(16);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(26);
var defined = __webpack_require__(25);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(49);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(20);
module.exports = __webpack_require__(85);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var get = __webpack_require__(50);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _profiler2 = __webpack_require__(35);

var _profiler3 = _interopRequireDefault(_profiler2);

var _grid = __webpack_require__(96);

var _grid2 = _interopRequireDefault(_grid);

var _stack = __webpack_require__(56);

var _stack2 = _interopRequireDefault(_stack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x = -0.525731112119133606;
var z = -0.850650808352039932;
var icosahedronVectors = [[-x, 0, z], [x, 0, z], [-x, 0, -z], [x, 0, -z], [0, z, x], [0, z, -x], [0, -z, x], [0, -z, -x], [z, x, 0], [-z, x, 0], [z, -x, 0], [-z, -x, 0]];
var icosahedronTiles = [new _stack2.default(9, 4, 1, 6, 11), new _stack2.default(4, 8, 10, 6, 0), new _stack2.default(11, 7, 3, 5, 9), new _stack2.default(2, 7, 10, 8, 5), new _stack2.default(9, 5, 8, 1, 0), new _stack2.default(2, 3, 8, 4, 9), new _stack2.default(0, 1, 10, 7, 11), new _stack2.default(11, 6, 10, 3, 2), new _stack2.default(5, 3, 10, 1, 4), new _stack2.default(2, 5, 4, 0, 11), new _stack2.default(3, 7, 6, 1, 8), new _stack2.default(7, 2, 9, 0, 6)];
var api = {};

exports.default = initializer;


function initializer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        profile = _ref.profile;

    var _profiler = (0, _profiler3.default)(profile),
        entryPoint = _profiler.entryPoint,
        utility = _profiler.utility;

    (0, _assign2.default)(api, {
        generate: entryPoint($generate),
        createNLevelGrid: utility($createNLevelGrid),
        create0LevelGrid: utility($create0LevelGrid),
        subdivideGrid: utility($subdivideGrid),
        addCorner: utility($addCorner),
        addEdge: utility($addEdge)
    });

    return api.generate;
}

function $generate() {
    var lod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return lod ? api.createNLevelGrid(lod) : api.create0LevelGrid(lod);
}

function $createNLevelGrid() {
    var lod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return lod ? api.subdivideGrid(api.createNLevelGrid(lod - 1)) : api.create0LevelGrid(lod);
}

function $create0LevelGrid(lod) {
    var grid = new _grid2.default(lod);
    var dCorners = grid.corners,
        dTiles = grid.tiles;


    var nextEdgeId = 0;

    dTiles.forEach(function (dTile) {
        var dTileId = dTile.id,
            dTileTiles = dTile.tiles,
            dTileVector = dTile.vector;


        dTileVector.xyz = icosahedronVectors[dTileId];

        for (var k = 0; k < 5; k++) {
            dTileTiles[k] = dTiles[icosahedronTiles[dTileId][k]];
        }
    });

    for (var i = 0; i < 5; i++) {
        api.addCorner(i, grid, 0, icosahedronTiles[0][i + 4], icosahedronTiles[0][i]);
    }

    for (var _i = 0; _i < 5; _i++) {
        api.addCorner(_i + 5, grid, 3, icosahedronTiles[3][_i + 4], icosahedronTiles[3][_i]);
    }

    api.addCorner(10, grid, 10, 1, 8);
    api.addCorner(11, grid, 1, 10, 6);
    api.addCorner(12, grid, 6, 10, 7);
    api.addCorner(13, grid, 6, 7, 11);
    api.addCorner(14, grid, 11, 7, 2);
    api.addCorner(15, grid, 11, 2, 9);
    api.addCorner(16, grid, 9, 2, 5);
    api.addCorner(17, grid, 9, 5, 4);
    api.addCorner(18, grid, 4, 5, 8);
    api.addCorner(19, grid, 4, 8, 1);

    dCorners.forEach(function (dCorner) {
        var dCornerCorners = dCorner.corners,
            dCornerTiles = dCorner.tiles;


        for (var k = 0; k < 3; k++) {
            dCornerCorners[k] = dCornerTiles[k].corners[dCornerTiles[k].position(dCorner) + 1];
        }
    });

    dTiles.forEach(function (dTile) {
        var dTileId = dTile.id,
            dTileEdges = dTile.edges;


        for (var k = 0; k < 5; k++) {
            if (!dTileEdges[k]) {
                api.addEdge(nextEdgeId++, grid, dTileId, icosahedronTiles[dTileId][k]);
            }
        }
    });

    return grid;
}

function $subdivideGrid(_ref2) {
    var sLod = _ref2.lod,
        sTiles = _ref2.tiles,
        sCorners = _ref2.corners;

    var grid = new _grid2.default(sLod + 1);
    var dCorners = grid.corners,
        dTiles = grid.tiles;
    var sTilesCount = sTiles.length;
    var sCornersCount = sCorners.length;


    var nextCornerId = 0;
    var nextEdgeId = 0;

    for (var i = 0; i < sTilesCount; i++) {
        var _sTiles$i = sTiles[i],
            sTileCorners = _sTiles$i.corners,
            sTileVector = _sTiles$i.vector;
        var _dTiles$i = dTiles[i],
            dTileEdgesCount = _dTiles$i.edgesCount,
            dTileTiles = _dTiles$i.tiles,
            dTileVector = _dTiles$i.vector;


        dTileVector.xyz = sTileVector;

        for (var k = 0; k < dTileEdgesCount; k++) {
            dTileTiles[k] = dTiles[sTileCorners[k].id + sTilesCount];
        }
    }

    for (var _i2 = 0; _i2 < sCornersCount; _i2++) {
        var _sCorners$_i = sCorners[_i2],
            sCornerCorners = _sCorners$_i.corners,
            sCornerTiles = _sCorners$_i.tiles,
            sCornerVector = _sCorners$_i.vector;
        var _dTiles = dTiles[_i2 + sTilesCount],
            dTileTiles = _dTiles.tiles,
            dTileVector = _dTiles.vector;


        dTileVector.xyz = sCornerVector;

        for (var _k = 0; _k < 3; _k++) {
            dTileTiles[2 * _k] = dTiles[sCornerCorners[_k].id + sTilesCount];
            dTileTiles[2 * _k + 1] = dTiles[sCornerTiles[_k].id];
        }
    }

    sTiles.forEach(function (sTile) {
        var sTileId = sTile.id;
        var _dTiles$sTileId = dTiles[sTileId],
            dTileId = _dTiles$sTileId.id,
            dTileEdgesCount = _dTiles$sTileId.edgesCount,
            dTileTiles = _dTiles$sTileId.tiles;


        for (var _k2 = 0; _k2 < dTileEdgesCount; _k2++) {
            api.addCorner(nextCornerId++, grid, dTileId, dTileTiles[_k2 - 1].id, dTileTiles[_k2].id);
        }
    });

    dCorners.forEach(function (dCorner) {
        var dCornerCorners = dCorner.corners,
            dCornerTiles = dCorner.tiles;


        for (var _k3 = 0; _k3 < 3; _k3++) {
            dCornerCorners[_k3] = dCornerTiles[_k3].corners[dCornerTiles[_k3].position(dCorner) + 1];
        }
    });

    dTiles.forEach(function (dTile) {
        var dTileId = dTile.id,
            dTileEdgesCount = dTile.edgesCount,
            dTileEdges = dTile.edges,
            dTileTiles = dTile.tiles;


        for (var _k4 = 0; _k4 < dTileEdgesCount; _k4++) {
            if (!dTileEdges[_k4]) {
                api.addEdge(nextEdgeId++, grid, dTileId, dTileTiles[_k4].id);
            }
        }
    });

    return grid;
}

function $addCorner(cornerId, _ref3, tileIndexA, tileIndexB, tileIndexC) {
    var tiles = _ref3.tiles,
        corners = _ref3.corners;

    var corner = corners[cornerId];
    var tileA = tiles[tileIndexA];
    var tileB = tiles[tileIndexB];
    var tileC = tiles[tileIndexC];

    corner.vector.add(tileA.vector).add(tileB.vector).add(tileC.vector).normalize();

    tileA.corners[tileA.position(tileC)] = tileB.corners[tileB.position(tileA)] = tileC.corners[tileC.position(tileB)] = corner;

    corner.tiles[0] = tileA;
    corner.tiles[1] = tileB;
    corner.tiles[2] = tileC;
}

function $addEdge(edgeId, _ref4, tileIndexA, tileIndexB) {
    var corners = _ref4.corners,
        edges = _ref4.edges,
        tiles = _ref4.tiles;

    var edge = edges[edgeId];
    var tileA = tiles[tileIndexA];
    var tileB = tiles[tileIndexB];
    var tileBIndexInTileA = tileA.position(tileB);
    var cornerA = corners[tileA.corners[tileBIndexInTileA].id];
    var cornerB = corners[tileA.corners[tileBIndexInTileA + 1].id];

    tileA.edges[tileBIndexInTileA] = tileB.edges[tileB.position(tileA)] = cornerA.edges[cornerA.position(cornerB)] = cornerB.edges[cornerB.position(cornerA)] = edge;

    edge.tiles[0] = tileA;
    edge.tiles[1] = tileB;

    edge.corners[0] = cornerA;
    edge.corners[1] = cornerB;
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(89);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(91);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(22);
var $export = __webpack_require__(2);
var toObject = __webpack_require__(19);
var call = __webpack_require__(92);
var isArrayIter = __webpack_require__(93);
var toLength = __webpack_require__(44);
var createProperty = __webpack_require__(94);
var getIterFn = __webpack_require__(50);

$export($export.S + $export.F * !__webpack_require__(95)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4);
var createDesc = __webpack_require__(15);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _corner = __webpack_require__(54);

var _corner2 = _interopRequireDefault(_corner);

var _edge = __webpack_require__(100);

var _edge2 = _interopRequireDefault(_edge);

var _tile = __webpack_require__(101);

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = function () {
    function Grid(lod) {
        (0, _classCallCheck3.default)(this, Grid);

        (0, _assign2.default)(this, {
            lod: lod,
            corners: createCorners(lod),
            edges: createEdges(lod),
            tiles: createTiles(lod)
        });
    }

    (0, _createClass3.default)(Grid, null, [{
        key: 'cornersCount',
        value: function cornersCount(lod) {
            return 20 * Math.pow(3, lod);
        }
    }, {
        key: 'edgesCount',
        value: function edgesCount(lod) {
            return 30 * Math.pow(3, lod) + 2;
        }
    }, {
        key: 'tilesCount',
        value: function tilesCount(lod) {
            return 10 * Math.pow(3, lod) + 2;
        }
    }]);
    return Grid;
}();

exports.default = Grid;


function createCorners(lod) {
    var cornersCount = Grid.cornersCount(lod);

    return new Array(cornersCount).fill(0).map(function (item, index) {
        return new _corner2.default(index);
    });
}

function createEdges(lod) {
    var edgesCount = Grid.edgesCount(lod);

    return new Array(edgesCount).fill(0).map(function (item, index) {
        return new _edge2.default(index);
    });
}

function createTiles(lod) {
    var tileCount = Grid.tilesCount(lod);

    return new Array(tileCount).fill(0).map(function (item, index) {
        return new _tile2.default(index, index < 12 ? 5 : 6);
    });
}

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
module.exports = __webpack_require__(0).Math.hypot;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(2);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Edge = function Edge(id) {
    (0, _classCallCheck3.default)(this, Edge);

    (0, _assign2.default)(this, {
        id: id,
        corners: new Array(2),
        tiles: new Array(2)
    });
};

exports.default = Edge;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(5);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(21);

var _createClass3 = _interopRequireDefault(_createClass2);

var _corner = __webpack_require__(54);

var _corner2 = _interopRequireDefault(_corner);

var _stack = __webpack_require__(56);

var _stack2 = _interopRequireDefault(_stack);

var _vector = __webpack_require__(55);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tile = function () {
    function Tile(id, edgesCount) {
        (0, _classCallCheck3.default)(this, Tile);

        (0, _assign2.default)(this, {
            id: id,
            edgesCount: edgesCount,
            corners: new _stack2.default(edgesCount),
            edges: new Array(edgesCount),
            tiles: new _stack2.default(edgesCount),
            vector: new _vector2.default()
        });
    }

    (0, _createClass3.default)(Tile, [{
        key: 'position',
        value: function position(instance) {
            switch (instance.constructor) {
                case _corner2.default:
                    {
                        return this.corners.indexOf(instance);
                    }
                case Tile:
                    {
                        return this.tiles.indexOf(instance);
                    }
                default:
                    {
                        console.error(this, instance, 'instance class should be one of the following: ' + _corner2.default.name + ' or ' + Tile.name);
                        return -1;
                    }
            }
        }
    }]);
    return Tile;
}();

exports.default = Tile;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(103), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
module.exports = __webpack_require__(0).Number.isInteger;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(2);

$export($export.S, 'Number', { isInteger: __webpack_require__(105) });


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(10);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(19);
var $getPrototypeOf = __webpack_require__(48);

__webpack_require__(109)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(2);
var core = __webpack_require__(0);
var fails = __webpack_require__(11);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(57);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(31);
module.exports = __webpack_require__(37).f('iterator');


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115);
__webpack_require__(120);
__webpack_require__(121);
__webpack_require__(122);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(2);
var redefine = __webpack_require__(47);
var META = __webpack_require__(116).KEY;
var $fails = __webpack_require__(11);
var shared = __webpack_require__(28);
var setToStringTag = __webpack_require__(34);
var uid = __webpack_require__(17);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(37);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(117);
var isArray = __webpack_require__(118);
var anObject = __webpack_require__(6);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(23);
var createDesc = __webpack_require__(15);
var _create = __webpack_require__(33);
var gOPNExt = __webpack_require__(119);
var $GOPD = __webpack_require__(59);
var $DP = __webpack_require__(4);
var $keys = __webpack_require__(16);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(58).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f = $propertyIsEnumerable;
  __webpack_require__(30).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(32)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(4).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(11)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(16);
var gOPS = __webpack_require__(30);
var pIE = __webpack_require__(18);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(58).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {



/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(124);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(128);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(57);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(2);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(127).set });


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(10);
var anObject = __webpack_require__(6);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(22)(Function.call, __webpack_require__(59).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(129), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(33) });


/***/ })
/******/ ]);
//# sourceMappingURL=index.node.js.map