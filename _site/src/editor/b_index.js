/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _server = __webpack_require__(2);
	
	var _server2 = _interopRequireDefault(_server);
	
	var _app = __webpack_require__(135);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.app = ReactDOM.render(React.createElement(_app2.default, {
	    server: new _server2.default('http://localhost:8181/editor')
	}), document.querySelector('div'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	if (!MouseEvent.prototype.hasOwnProperty('buttons')) {
	    (function () {
	        var mousedown = 0;
	
	        addEventListener('mousedown', function (e) {
	            return mousedown = e.button || 1;
	        });
	        addEventListener('mouseup', function () {
	            return mousedown = 0;
	        });
	
	        Object.defineProperty(MouseEvent.prototype, 'buttons', {
	            get: function get() {
	                return mousedown;
	            }
	        });
	    })();
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _stringify = __webpack_require__(3);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _toConsumableArray2 = __webpack_require__(6);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _keys = __webpack_require__(59);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _promise = __webpack_require__(63);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _assign = __webpack_require__(82);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _jsonpath = __webpack_require__(92);
	
	var _jsonpath2 = _interopRequireDefault(_jsonpath);
	
	var _api = __webpack_require__(93);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _loadImage = __webpack_require__(122);
	
	var _loadImage2 = _interopRequireDefault(_loadImage);
	
	var _path = __webpack_require__(94);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _reformat = __webpack_require__(123);
	
	var _reformat2 = _interopRequireDefault(_reformat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VirtualServer = function () {
	    function VirtualServer(API_URL) {
	        (0, _classCallCheck3.default)(this, VirtualServer);
	
	        (0, _assign2.default)(this, {
	            api: new _api2.default(API_URL),
	            images: {},
	            irrelevant_images: []
	        });
	    }
	
	    // loadLast (number = 10) {
	    //     return this.api.get([`images?last=${number}`])
	    //     .then(images =>
	    //         images.map(image => loadImage(image.image_urls[0])
	    //         .then(element => Object.assign(image, {element}))
	    //     ))
	    //     .then(Promise.all.bind(Promise))
	    //     .then(images => images.map(reformatImage))
	    //     .then(reformat.arrayToObject('image_id'))
	    //     .then(images => Object.assign(this.images, images));
	    // }
	
	
	    (0, _createClass3.default)(VirtualServer, [{
	        key: 'loadLast',
	        value: function loadLast() {
	            var _this = this;
	
	            var number = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];
	            var props = arguments[1];
	
	            return this.api.get(['images?last=' + number]).then(function (images) {
	                return images.forEach(function (image) {
	                    return _this.add(image, props);
	                });
	            });
	        }
	    }, {
	        key: 'add',
	        value: function add(url, props) {
	            var _this2 = this;
	
	            ['onLoad', 'onError', 'onData', 'onUpdate'].forEach(function (action) {
	                if (!props[action]) props[action] = function () {
	                    return 0;
	                };
	            });
	            var element = void 0;
	            return _promise2.default.resolve(url).then(function (url) {
	                return (0, _loadImage2.default)({ src: url });
	            }).then(function (res) {
	                return element = res;
	            }).then(props.onLoad).then(this.getImageData.bind(this, url, props.onData)).then(reformatImage).then(function (data) {
	                _this2.images[data.image_id] = (0, _assign2.default)(data, {
	                    element: element,
	                    __index__: (0, _keys2.default)(_this2.images).length,
	                    image_urls: [url]
	                });
	                props.onUpdate();
	            }).catch(function (e) {
	                _this2.irrelevant_images.push(url);
	                props.onError(e);
	            });
	        }
	    }, {
	        key: 'apply',
	        value: function apply(path, callback) {
	            _jsonpath2.default.apply(this, _path2.default.xpath(path), callback);
	        }
	    }, {
	        key: 'get',
	        value: function get(path) {
	            return _jsonpath2.default.query(this, _path2.default.xpath(path));
	        }
	    }, {
	        key: 'post',
	        value: function post(path, field, value) {
	            // field is a parent
	            this.apply(path, function (values) {
	                values[field].push(value);
	                return values;
	            });
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(path, field) {
	            // path is a parent
	            this.apply(path, function (values) {
	                delete values[field];
	                return values;
	            });
	            this.api.delete([].concat((0, _toConsumableArray3.default)(path), [field]));
	        }
	    }, {
	        key: 'put',
	        value: function put(path, field, value) {
	            var fieldPath = [].concat((0, _toConsumableArray3.default)(path), [field]),
	                data = _jsonpath2.default.query(this, _path2.default.xpath(fieldPath))[0];
	            this.apply(path, function (values) {
	                values[field] = value;
	                return values;
	            });
	            this.api.put(fieldPath, {
	                body: (0, _stringify2.default)({ data: data })
	            });
	        }
	    }, {
	        key: 'patch',
	        value: function patch(path, changes) {
	            this.apply(path, function (values) {
	                for (var key in changes) {
	                    values[key] = changes[key];
	                }
	                return values;
	            });
	            var data = _jsonpath2.default.query(this, _path2.default.xpath(path))[0];
	            this.api.put(path, {
	                body: (0, _stringify2.default)({ data: data })
	            });
	        }
	    }, {
	        key: 'getImageData',
	        value: function getImageData(url) {
	            var onData = arguments.length <= 1 || arguments[1] === undefined ? function () {
	                return 0;
	            } : arguments[1];
	
	            return this.api.get(['images', '?image_url=' + url]).then(function (data) {
	                onData();
	                return data;
	            });
	        }
	    }]);
	    return VirtualServer;
	}();
	
	exports.default = VirtualServer;
	
	
	function reformatImage(image) {
	    return (0, _reformat2.default)([['people', _reformat2.default.arrayToObject('_id')], ['items', _reformat2.default.arrayToObject('category')], ['items[*]', function (values) {
	        values.collections = (0, _assign2.default)({}, values.similar_results);
	        delete values.similar_results;
	        for (var collection in values.collections) {
	            values.collections[collection] = { results: _reformat2.default.arrayToObject('id')(values.collections[collection]) };
	        }
	        return values;
	    }]], image);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(5)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(7);
	
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(52);
	module.exports = __webpack_require__(5).Array.from;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(10)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(13)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(11)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(14)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , core      = __webpack_require__(5)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
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
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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

/***/ },
/* 16 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(16).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(35);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(12);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(11)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(11)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(16)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(16).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(49)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(16).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(17)
	  , $export        = __webpack_require__(15)
	  , toObject       = __webpack_require__(51)
	  , call           = __webpack_require__(53)
	  , isArrayIter    = __webpack_require__(54)
	  , toLength       = __webpack_require__(41)
	  , createProperty = __webpack_require__(55)
	  , getIterFn      = __webpack_require__(56);
	
	$export($export.S + $export.F * !__webpack_require__(58)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(21);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(49)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(20)
	  , createDesc      = __webpack_require__(28);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(5).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(49)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(49)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	module.exports = __webpack_require__(5).Object.keys;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(51)
	  , $keys    = __webpack_require__(35);
	
	__webpack_require__(62)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(15)
	  , core    = __webpack_require__(5)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(9);
	__webpack_require__(66);
	__webpack_require__(70);
	module.exports = __webpack_require__(5).Promise;

/***/ },
/* 65 */
/***/ function(module, exports) {



/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	var global        = __webpack_require__(16)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(31)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(68)
	  , step             = __webpack_require__(69)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(13)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(14)
	  , global             = __webpack_require__(16)
	  , ctx                = __webpack_require__(17)
	  , classof            = __webpack_require__(57)
	  , $export            = __webpack_require__(15)
	  , isObject           = __webpack_require__(22)
	  , anObject           = __webpack_require__(21)
	  , aFunction          = __webpack_require__(18)
	  , anInstance         = __webpack_require__(71)
	  , forOf              = __webpack_require__(72)
	  , setProto           = __webpack_require__(73).set
	  , speciesConstructor = __webpack_require__(76)
	  , task               = __webpack_require__(77).set
	  , microtask          = __webpack_require__(79)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(49)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(80)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(48)($Promise, PROMISE);
	__webpack_require__(81)(PROMISE);
	Wrapper = __webpack_require__(5)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(58)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(17)
	  , call        = __webpack_require__(53)
	  , isArrayIter = __webpack_require__(54)
	  , anObject    = __webpack_require__(21)
	  , toLength    = __webpack_require__(41)
	  , getIterFn   = __webpack_require__(56)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(22)
	  , anObject = __webpack_require__(21);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, __webpack_require__(74).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(75)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(21)
	  , aFunction = __webpack_require__(18)
	  , SPECIES   = __webpack_require__(49)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(17)
	  , invoke             = __webpack_require__(78)
	  , html               = __webpack_require__(47)
	  , cel                = __webpack_require__(26)
	  , global             = __webpack_require__(16)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(39)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(16)
	  , macrotask = __webpack_require__(77).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(39)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(19);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(16)
	  , core        = __webpack_require__(5)
	  , dP          = __webpack_require__(20)
	  , DESCRIPTORS = __webpack_require__(24)
	  , SPECIES     = __webpack_require__(49)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	module.exports = __webpack_require__(5).Object.assign;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(15);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(85)});

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(35)
	  , gOPS     = __webpack_require__(86)
	  , pIE      = __webpack_require__(75)
	  , toObject = __webpack_require__(51)
	  , IObject  = __webpack_require__(38)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(25)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 86 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(89);
	
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

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var $Object = __webpack_require__(5).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global) {/*! jsonpath 0.2.5 */
	
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsonpath = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./aesprim":[function(require,module,exports){
	/*
	  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2013 Thaddee Tyl <thaddee.tyl@gmail.com>
	  Copyright (C) 2013 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
	  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
	  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
	  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
	  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>
	
	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:
	
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	
	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	/*jslint bitwise:true plusplus:true */
	/*global esprima:true, define:true, exports:true, window: true,
	throwErrorTolerant: true,
	throwError: true, generateStatement: true, peek: true,
	parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
	parseFunctionDeclaration: true, parseFunctionExpression: true,
	parseFunctionSourceElements: true, parseVariableIdentifier: true,
	parseLeftHandSideExpression: true,
	parseUnaryExpression: true,
	parseStatement: true, parseSourceElement: true */
	
	(function (root, factory) {
	    'use strict';
	
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
	    // Rhino, and plain browser loading.
	
	    /* istanbul ignore next */
	    if (typeof define === 'function' && define.amd) {
	        define(['exports'], factory);
	    } else if (typeof exports !== 'undefined') {
	        factory(exports);
	    } else {
	        factory((root.esprima = {}));
	    }
	}(this, function (exports) {
	    'use strict';
	
	    var Token,
	        TokenName,
	        FnExprTokens,
	        Syntax,
	        PropertyKind,
	        Messages,
	        Regex,
	        SyntaxTreeDelegate,
	        source,
	        strict,
	        index,
	        lineNumber,
	        lineStart,
	        length,
	        delegate,
	        lookahead,
	        state,
	        extra;
	
	    Token = {
	        BooleanLiteral: 1,
	        EOF: 2,
	        Identifier: 3,
	        Keyword: 4,
	        NullLiteral: 5,
	        NumericLiteral: 6,
	        Punctuator: 7,
	        StringLiteral: 8,
	        RegularExpression: 9
	    };
	
	    TokenName = {};
	    TokenName[Token.BooleanLiteral] = 'Boolean';
	    TokenName[Token.EOF] = '<end>';
	    TokenName[Token.Identifier] = 'Identifier';
	    TokenName[Token.Keyword] = 'Keyword';
	    TokenName[Token.NullLiteral] = 'Null';
	    TokenName[Token.NumericLiteral] = 'Numeric';
	    TokenName[Token.Punctuator] = 'Punctuator';
	    TokenName[Token.StringLiteral] = 'String';
	    TokenName[Token.RegularExpression] = 'RegularExpression';
	
	    // A function following one of those tokens is an expression.
	    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	                    'return', 'case', 'delete', 'throw', 'void',
	                    // assignment operators
	                    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=',
	                    '&=', '|=', '^=', ',',
	                    // binary/unary operators
	                    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	                    '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	                    '<=', '<', '>', '!=', '!=='];
	
	    Syntax = {
	        AssignmentExpression: 'AssignmentExpression',
	        ArrayExpression: 'ArrayExpression',
	        BlockStatement: 'BlockStatement',
	        BinaryExpression: 'BinaryExpression',
	        BreakStatement: 'BreakStatement',
	        CallExpression: 'CallExpression',
	        CatchClause: 'CatchClause',
	        ConditionalExpression: 'ConditionalExpression',
	        ContinueStatement: 'ContinueStatement',
	        DoWhileStatement: 'DoWhileStatement',
	        DebuggerStatement: 'DebuggerStatement',
	        EmptyStatement: 'EmptyStatement',
	        ExpressionStatement: 'ExpressionStatement',
	        ForStatement: 'ForStatement',
	        ForInStatement: 'ForInStatement',
	        FunctionDeclaration: 'FunctionDeclaration',
	        FunctionExpression: 'FunctionExpression',
	        Identifier: 'Identifier',
	        IfStatement: 'IfStatement',
	        Literal: 'Literal',
	        LabeledStatement: 'LabeledStatement',
	        LogicalExpression: 'LogicalExpression',
	        MemberExpression: 'MemberExpression',
	        NewExpression: 'NewExpression',
	        ObjectExpression: 'ObjectExpression',
	        Program: 'Program',
	        Property: 'Property',
	        ReturnStatement: 'ReturnStatement',
	        SequenceExpression: 'SequenceExpression',
	        SwitchStatement: 'SwitchStatement',
	        SwitchCase: 'SwitchCase',
	        ThisExpression: 'ThisExpression',
	        ThrowStatement: 'ThrowStatement',
	        TryStatement: 'TryStatement',
	        UnaryExpression: 'UnaryExpression',
	        UpdateExpression: 'UpdateExpression',
	        VariableDeclaration: 'VariableDeclaration',
	        VariableDeclarator: 'VariableDeclarator',
	        WhileStatement: 'WhileStatement',
	        WithStatement: 'WithStatement'
	    };
	
	    PropertyKind = {
	        Data: 1,
	        Get: 2,
	        Set: 4
	    };
	
	    // Error messages should be identical to V8.
	    Messages = {
	        UnexpectedToken:  'Unexpected token %0',
	        UnexpectedNumber:  'Unexpected number',
	        UnexpectedString:  'Unexpected string',
	        UnexpectedIdentifier:  'Unexpected identifier',
	        UnexpectedReserved:  'Unexpected reserved word',
	        UnexpectedEOS:  'Unexpected end of input',
	        NewlineAfterThrow:  'Illegal newline after throw',
	        InvalidRegExp: 'Invalid regular expression',
	        UnterminatedRegExp:  'Invalid regular expression: missing /',
	        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
	        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
	        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	        NoCatchOrFinally:  'Missing catch or finally after try',
	        UnknownLabel: 'Undefined label \'%0\'',
	        Redeclaration: '%0 \'%1\' has already been declared',
	        IllegalContinue: 'Illegal continue statement',
	        IllegalBreak: 'Illegal break statement',
	        IllegalReturn: 'Illegal return statement',
	        StrictModeWith:  'Strict mode code may not include a with statement',
	        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
	        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
	        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
	        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
	        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
	        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
	        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
	        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
	        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
	        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
	        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictReservedWord:  'Use of future reserved word in strict mode'
	    };
	
	    // See also tools/generate-unicode-regex.py.
	    Regex = {
	        NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
	        NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
	    };
	
	    // Ensure the condition is true, otherwise throw an error.
	    // This is only to have a better contract semantic, i.e. another safety net
	    // to catch a logic error. The condition shall be fulfilled in normal case.
	    // Do NOT use this to enforce a certain condition on any user input.
	
	    function assert(condition, message) {
	        /* istanbul ignore if */
	        if (!condition) {
	            throw new Error('ASSERT: ' + message);
	        }
	    }
	
	    function isDecimalDigit(ch) {
	        return (ch >= 48 && ch <= 57);   // 0..9
	    }
	
	    function isHexDigit(ch) {
	        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
	    }
	
	    function isOctalDigit(ch) {
	        return '01234567'.indexOf(ch) >= 0;
	    }
	
	
	    // 7.2 White Space
	
	    function isWhiteSpace(ch) {
	        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
	            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
	    }
	
	    // 7.3 Line Terminators
	
	    function isLineTerminator(ch) {
	        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
	    }
	
	    // 7.6 Identifier Names and Identifiers
	
	    function isIdentifierStart(ch) {
	        return (ch == 0x40) ||  (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
	            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
	            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
	            (ch === 0x5C) ||                      // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch)));
	    }
	
	    function isIdentifierPart(ch) {
	        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
	            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
	            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
	            (ch >= 0x30 && ch <= 0x39) ||         // 0..9
	            (ch === 0x5C) ||                      // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
	    }
	
	    // 7.6.1.2 Future Reserved Words
	
	    function isFutureReservedWord(id) {
	        switch (id) {
	        case 'class':
	        case 'enum':
	        case 'export':
	        case 'extends':
	        case 'import':
	        case 'super':
	            return true;
	        default:
	            return false;
	        }
	    }
	
	    function isStrictModeReservedWord(id) {
	        switch (id) {
	        case 'implements':
	        case 'interface':
	        case 'package':
	        case 'private':
	        case 'protected':
	        case 'public':
	        case 'static':
	        case 'yield':
	        case 'let':
	            return true;
	        default:
	            return false;
	        }
	    }
	
	    function isRestrictedWord(id) {
	        return id === 'eval' || id === 'arguments';
	    }
	
	    // 7.6.1.1 Keywords
	
	    function isKeyword(id) {
	        if (strict && isStrictModeReservedWord(id)) {
	            return true;
	        }
	
	        // 'const' is specialized as Keyword in V8.
	        // 'yield' and 'let' are for compatiblity with SpiderMonkey and ES.next.
	        // Some others are from future reserved words.
	
	        switch (id.length) {
	        case 2:
	            return (id === 'if') || (id === 'in') || (id === 'do');
	        case 3:
	            return (id === 'var') || (id === 'for') || (id === 'new') ||
	                (id === 'try') || (id === 'let');
	        case 4:
	            return (id === 'this') || (id === 'else') || (id === 'case') ||
	                (id === 'void') || (id === 'with') || (id === 'enum');
	        case 5:
	            return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                (id === 'class') || (id === 'super');
	        case 6:
	            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                (id === 'switch') || (id === 'export') || (id === 'import');
	        case 7:
	            return (id === 'default') || (id === 'finally') || (id === 'extends');
	        case 8:
	            return (id === 'function') || (id === 'continue') || (id === 'debugger');
	        case 10:
	            return (id === 'instanceof');
	        default:
	            return false;
	        }
	    }
	
	    // 7.4 Comments
	
	    function addComment(type, value, start, end, loc) {
	        var comment, attacher;
	
	        assert(typeof start === 'number', 'Comment must have valid position');
	
	        // Because the way the actual token is scanned, often the comments
	        // (if any) are skipped twice during the lexical analysis.
	        // Thus, we need to skip adding a comment if the comment array already
	        // handled it.
	        if (state.lastCommentStart >= start) {
	            return;
	        }
	        state.lastCommentStart = start;
	
	        comment = {
	            type: type,
	            value: value
	        };
	        if (extra.range) {
	            comment.range = [start, end];
	        }
	        if (extra.loc) {
	            comment.loc = loc;
	        }
	        extra.comments.push(comment);
	        if (extra.attachComment) {
	            extra.leadingComments.push(comment);
	            extra.trailingComments.push(comment);
	        }
	    }
	
	    function skipSingleLineComment(offset) {
	        var start, loc, ch, comment;
	
	        start = index - offset;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart - offset
	            }
	        };
	
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            ++index;
	            if (isLineTerminator(ch)) {
	                if (extra.comments) {
	                    comment = source.slice(start + offset, index - 1);
	                    loc.end = {
	                        line: lineNumber,
	                        column: index - lineStart - 1
	                    };
	                    addComment('Line', comment, start, index - 1, loc);
	                }
	                if (ch === 13 && source.charCodeAt(index) === 10) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	                return;
	            }
	        }
	
	        if (extra.comments) {
	            comment = source.slice(start + offset, index);
	            loc.end = {
	                line: lineNumber,
	                column: index - lineStart
	            };
	            addComment('Line', comment, start, index, loc);
	        }
	    }
	
	    function skipMultiLineComment() {
	        var start, loc, ch, comment;
	
	        if (extra.comments) {
	            start = index - 2;
	            loc = {
	                start: {
	                    line: lineNumber,
	                    column: index - lineStart - 2
	                }
	            };
	        }
	
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (isLineTerminator(ch)) {
	                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
	                    ++index;
	                }
	                ++lineNumber;
	                ++index;
	                lineStart = index;
	                if (index >= length) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            } else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (source.charCodeAt(index + 1) === 0x2F) {
	                    ++index;
	                    ++index;
	                    if (extra.comments) {
	                        comment = source.slice(start + 2, index - 2);
	                        loc.end = {
	                            line: lineNumber,
	                            column: index - lineStart
	                        };
	                        addComment('Block', comment, start, index, loc);
	                    }
	                    return;
	                }
	                ++index;
	            } else {
	                ++index;
	            }
	        }
	
	        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	    }
	
	    function skipComment() {
	        var ch, start;
	
	        start = (index === 0);
	        while (index < length) {
	            ch = source.charCodeAt(index);
	
	            if (isWhiteSpace(ch)) {
	                ++index;
	            } else if (isLineTerminator(ch)) {
	                ++index;
	                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	                start = true;
	            } else if (ch === 0x2F) { // U+002F is '/'
	                ch = source.charCodeAt(index + 1);
	                if (ch === 0x2F) {
	                    ++index;
	                    ++index;
	                    skipSingleLineComment(2);
	                    start = true;
	                } else if (ch === 0x2A) {  // U+002A is '*'
	                    ++index;
	                    ++index;
	                    skipMultiLineComment();
	                } else {
	                    break;
	                }
	            } else if (start && ch === 0x2D) { // U+002D is '-'
	                // U+003E is '>'
	                if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    index += 3;
	                    skipSingleLineComment(3);
	                } else {
	                    break;
	                }
	            } else if (ch === 0x3C) { // U+003C is '<'
	                if (source.slice(index + 1, index + 4) === '!--') {
	                    ++index; // `<`
	                    ++index; // `!`
	                    ++index; // `-`
	                    ++index; // `-`
	                    skipSingleLineComment(4);
	                } else {
	                    break;
	                }
	            } else {
	                break;
	            }
	        }
	    }
	
	    function scanHexEscape(prefix) {
	        var i, len, ch, code = 0;
	
	        len = (prefix === 'u') ? 4 : 2;
	        for (i = 0; i < len; ++i) {
	            if (index < length && isHexDigit(source[index])) {
	                ch = source[index++];
	                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	            } else {
	                return '';
	            }
	        }
	        return String.fromCharCode(code);
	    }
	
	    function getEscapedIdentifier() {
	        var ch, id;
	
	        ch = source.charCodeAt(index++);
	        id = String.fromCharCode(ch);
	
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        if (ch === 0x5C) {
	            if (source.charCodeAt(index) !== 0x75) {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	            ++index;
	            ch = scanHexEscape('u');
	            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	            id = ch;
	        }
	
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (!isIdentifierPart(ch)) {
	                break;
	            }
	            ++index;
	            id += String.fromCharCode(ch);
	
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (ch === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (source.charCodeAt(index) !== 0x75) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	                ++index;
	                ch = scanHexEscape('u');
	                if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	                id += ch;
	            }
	        }
	
	        return id;
	    }
	
	    function getIdentifier() {
	        var start, ch;
	
	        start = index++;
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                index = start;
	                return getEscapedIdentifier();
	            }
	            if (isIdentifierPart(ch)) {
	                ++index;
	            } else {
	                break;
	            }
	        }
	
	        return source.slice(start, index);
	    }
	
	    function scanIdentifier() {
	        var start, id, type;
	
	        start = index;
	
	        // Backslash (U+005C) starts an escaped character.
	        id = (source.charCodeAt(index) === 0x5C) ? getEscapedIdentifier() : getIdentifier();
	
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = Token.Identifier;
	        } else if (isKeyword(id)) {
	            type = Token.Keyword;
	        } else if (id === 'null') {
	            type = Token.NullLiteral;
	        } else if (id === 'true' || id === 'false') {
	            type = Token.BooleanLiteral;
	        } else {
	            type = Token.Identifier;
	        }
	
	        return {
	            type: type,
	            value: id,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	
	    // 7.7 Punctuators
	
	    function scanPunctuator() {
	        var start = index,
	            code = source.charCodeAt(index),
	            code2,
	            ch1 = source[index],
	            ch2,
	            ch3,
	            ch4;
	
	        switch (code) {
	
	        // Check for most common single-character punctuators.
	        case 0x2E:  // . dot
	        case 0x28:  // ( open bracket
	        case 0x29:  // ) close bracket
	        case 0x3B:  // ; semicolon
	        case 0x2C:  // , comma
	        case 0x7B:  // { open curly brace
	        case 0x7D:  // } close curly brace
	        case 0x5B:  // [
	        case 0x5D:  // ]
	        case 0x3A:  // :
	        case 0x3F:  // ?
	        case 0x7E:  // ~
	            ++index;
	            if (extra.tokenize) {
	                if (code === 0x28) {
	                    extra.openParenToken = extra.tokens.length;
	                } else if (code === 0x7B) {
	                    extra.openCurlyToken = extra.tokens.length;
	                }
	            }
	            return {
	                type: Token.Punctuator,
	                value: String.fromCharCode(code),
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	
	        default:
	            code2 = source.charCodeAt(index + 1);
	
	            // '=' (U+003D) marks an assignment or comparison operator.
	            if (code2 === 0x3D) {
	                switch (code) {
	                case 0x2B:  // +
	                case 0x2D:  // -
	                case 0x2F:  // /
	                case 0x3C:  // <
	                case 0x3E:  // >
	                case 0x5E:  // ^
	                case 0x7C:  // |
	                case 0x25:  // %
	                case 0x26:  // &
	                case 0x2A:  // *
	                    index += 2;
	                    return {
	                        type: Token.Punctuator,
	                        value: String.fromCharCode(code) + String.fromCharCode(code2),
	                        lineNumber: lineNumber,
	                        lineStart: lineStart,
	                        start: start,
	                        end: index
	                    };
	
	                case 0x21: // !
	                case 0x3D: // =
	                    index += 2;
	
	                    // !== and ===
	                    if (source.charCodeAt(index) === 0x3D) {
	                        ++index;
	                    }
	                    return {
	                        type: Token.Punctuator,
	                        value: source.slice(start, index),
	                        lineNumber: lineNumber,
	                        lineStart: lineStart,
	                        start: start,
	                        end: index
	                    };
	                }
	            }
	        }
	
	        // 4-character punctuator: >>>=
	
	        ch4 = source.substr(index, 4);
	
	        if (ch4 === '>>>=') {
	            index += 4;
	            return {
	                type: Token.Punctuator,
	                value: ch4,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        // 3-character punctuators: === !== >>> <<= >>=
	
	        ch3 = ch4.substr(0, 3);
	
	        if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
	            index += 3;
	            return {
	                type: Token.Punctuator,
	                value: ch3,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        // Other 2-character punctuators: ++ -- << >> && ||
	        ch2 = ch3.substr(0, 2);
	
	        if ((ch1 === ch2[1] && ('+-<>&|'.indexOf(ch1) >= 0)) || ch2 === '=>') {
	            index += 2;
	            return {
	                type: Token.Punctuator,
	                value: ch2,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        // 1-character punctuators: < > = ! + - * % & | ^ /
	        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
	            ++index;
	            return {
	                type: Token.Punctuator,
	                value: ch1,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	    }
	
	    // 7.8.3 Numeric Literals
	
	    function scanHexLiteral(start) {
	        var number = '';
	
	        while (index < length) {
	            if (!isHexDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }
	
	        if (number.length === 0) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseInt('0x' + number, 16),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function scanOctalLiteral(start) {
	        var number = '0' + source[index++];
	        while (index < length) {
	            if (!isOctalDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseInt(number, 8),
	            octal: true,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function scanNumericLiteral() {
	        var number, start, ch;
	
	        ch = source[index];
	        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
	            'Numeric literal must start with a decimal digit or a decimal point');
	
	        start = index;
	        number = '';
	        if (ch !== '.') {
	            number = source[index++];
	            ch = source[index];
	
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            if (number === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++index;
	                    return scanHexLiteral(start);
	                }
	                if (isOctalDigit(ch)) {
	                    return scanOctalLiteral(start);
	                }
	
	                // decimal number starts with '0' such as '09' is illegal.
	                if (ch && isDecimalDigit(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            }
	
	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }
	
	        if (ch === '.') {
	            number += source[index++];
	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }
	
	        if (ch === 'e' || ch === 'E') {
	            number += source[index++];
	
	            ch = source[index];
	            if (ch === '+' || ch === '-') {
	                number += source[index++];
	            }
	            if (isDecimalDigit(source.charCodeAt(index))) {
	                while (isDecimalDigit(source.charCodeAt(index))) {
	                    number += source[index++];
	                }
	            } else {
	                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	            }
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseFloat(number),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    // 7.8.4 String Literals
	
	    function scanStringLiteral() {
	        var str = '', quote, start, ch, code, unescaped, restore, octal = false, startLineNumber, startLineStart;
	        startLineNumber = lineNumber;
	        startLineStart = lineStart;
	
	        quote = source[index];
	        assert((quote === '\'' || quote === '"'),
	            'String literal must starts with a quote');
	
	        start = index;
	        ++index;
	
	        while (index < length) {
	            ch = source[index++];
	
	            if (ch === quote) {
	                quote = '';
	                break;
	            } else if (ch === '\\') {
	                ch = source[index++];
	                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                    case 'u':
	                    case 'x':
	                        restore = index;
	                        unescaped = scanHexEscape(ch);
	                        if (unescaped) {
	                            str += unescaped;
	                        } else {
	                            index = restore;
	                            str += ch;
	                        }
	                        break;
	                    case 'n':
	                        str += '\n';
	                        break;
	                    case 'r':
	                        str += '\r';
	                        break;
	                    case 't':
	                        str += '\t';
	                        break;
	                    case 'b':
	                        str += '\b';
	                        break;
	                    case 'f':
	                        str += '\f';
	                        break;
	                    case 'v':
	                        str += '\x0B';
	                        break;
	
	                    default:
	                        if (isOctalDigit(ch)) {
	                            code = '01234567'.indexOf(ch);
	
	                            // \0 is not octal escape sequence
	                            if (code !== 0) {
	                                octal = true;
	                            }
	
	                            if (index < length && isOctalDigit(source[index])) {
	                                octal = true;
	                                code = code * 8 + '01234567'.indexOf(source[index++]);
	
	                                // 3 digits are only allowed when string starts
	                                // with 0, 1, 2, 3
	                                if ('0123'.indexOf(ch) >= 0 &&
	                                        index < length &&
	                                        isOctalDigit(source[index])) {
	                                    code = code * 8 + '01234567'.indexOf(source[index++]);
	                                }
	                            }
	                            str += String.fromCharCode(code);
	                        } else {
	                            str += ch;
	                        }
	                        break;
	                    }
	                } else {
	                    ++lineNumber;
	                    if (ch ===  '\r' && source[index] === '\n') {
	                        ++index;
	                    }
	                    lineStart = index;
	                }
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            } else {
	                str += ch;
	            }
	        }
	
	        if (quote !== '') {
	            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
	        }
	
	        return {
	            type: Token.StringLiteral,
	            value: str,
	            octal: octal,
	            startLineNumber: startLineNumber,
	            startLineStart: startLineStart,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function testRegExp(pattern, flags) {
	        var value;
	        try {
	            value = new RegExp(pattern, flags);
	        } catch (e) {
	            throwError({}, Messages.InvalidRegExp);
	        }
	        return value;
	    }
	
	    function scanRegExpBody() {
	        var ch, str, classMarker, terminated, body;
	
	        ch = source[index];
	        assert(ch === '/', 'Regular expression literal must start with a slash');
	        str = source[index++];
	
	        classMarker = false;
	        terminated = false;
	        while (index < length) {
	            ch = source[index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = source[index++];
	                // ECMA-262 7.8.5
	                if (isLineTerminator(ch.charCodeAt(0))) {
	                    throwError({}, Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                throwError({}, Messages.UnterminatedRegExp);
	            } else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            } else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                } else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	
	        if (!terminated) {
	            throwError({}, Messages.UnterminatedRegExp);
	        }
	
	        // Exclude leading and trailing slash.
	        body = str.substr(1, str.length - 2);
	        return {
	            value: body,
	            literal: str
	        };
	    }
	
	    function scanRegExpFlags() {
	        var ch, str, flags, restore;
	
	        str = '';
	        flags = '';
	        while (index < length) {
	            ch = source[index];
	            if (!isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	
	            ++index;
	            if (ch === '\\' && index < length) {
	                ch = source[index];
	                if (ch === 'u') {
	                    ++index;
	                    restore = index;
	                    ch = scanHexEscape('u');
	                    if (ch) {
	                        flags += ch;
	                        for (str += '\\u'; restore < index; ++restore) {
	                            str += source[restore];
	                        }
	                    } else {
	                        index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
	                } else {
	                    str += '\\';
	                    throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
	                }
	            } else {
	                flags += ch;
	                str += ch;
	            }
	        }
	
	        return {
	            value: flags,
	            literal: str
	        };
	    }
	
	    function scanRegExp() {
	        var start, body, flags, pattern, value;
	
	        lookahead = null;
	        skipComment();
	        start = index;
	
	        body = scanRegExpBody();
	        flags = scanRegExpFlags();
	        value = testRegExp(body.value, flags.value);
	
	        if (extra.tokenize) {
	            return {
	                type: Token.RegularExpression,
	                value: value,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        return {
	            literal: body.literal + flags.literal,
	            value: value,
	            start: start,
	            end: index
	        };
	    }
	
	    function collectRegex() {
	        var pos, loc, regex, token;
	
	        skipComment();
	
	        pos = index;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };
	
	        regex = scanRegExp();
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };
	
	        /* istanbul ignore next */
	        if (!extra.tokenize) {
	            // Pop the previous token, which is likely '/' or '/='
	            if (extra.tokens.length > 0) {
	                token = extra.tokens[extra.tokens.length - 1];
	                if (token.range[0] === pos && token.type === 'Punctuator') {
	                    if (token.value === '/' || token.value === '/=') {
	                        extra.tokens.pop();
	                    }
	                }
	            }
	
	            extra.tokens.push({
	                type: 'RegularExpression',
	                value: regex.literal,
	                range: [pos, index],
	                loc: loc
	            });
	        }
	
	        return regex;
	    }
	
	    function isIdentifierName(token) {
	        return token.type === Token.Identifier ||
	            token.type === Token.Keyword ||
	            token.type === Token.BooleanLiteral ||
	            token.type === Token.NullLiteral;
	    }
	
	    function advanceSlash() {
	        var prevToken,
	            checkToken;
	        // Using the following algorithm:
	        // https://github.com/mozilla/sweet.js/wiki/design
	        prevToken = extra.tokens[extra.tokens.length - 1];
	        if (!prevToken) {
	            // Nothing before that: it cannot be a division.
	            return collectRegex();
	        }
	        if (prevToken.type === 'Punctuator') {
	            if (prevToken.value === ']') {
	                return scanPunctuator();
	            }
	            if (prevToken.value === ')') {
	                checkToken = extra.tokens[extra.openParenToken - 1];
	                if (checkToken &&
	                        checkToken.type === 'Keyword' &&
	                        (checkToken.value === 'if' ||
	                         checkToken.value === 'while' ||
	                         checkToken.value === 'for' ||
	                         checkToken.value === 'with')) {
	                    return collectRegex();
	                }
	                return scanPunctuator();
	            }
	            if (prevToken.value === '}') {
	                // Dividing a function by anything makes little sense,
	                // but we have to check for that.
	                if (extra.tokens[extra.openCurlyToken - 3] &&
	                        extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
	                    // Anonymous function.
	                    checkToken = extra.tokens[extra.openCurlyToken - 4];
	                    if (!checkToken) {
	                        return scanPunctuator();
	                    }
	                } else if (extra.tokens[extra.openCurlyToken - 4] &&
	                        extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
	                    // Named function.
	                    checkToken = extra.tokens[extra.openCurlyToken - 5];
	                    if (!checkToken) {
	                        return collectRegex();
	                    }
	                } else {
	                    return scanPunctuator();
	                }
	                // checkToken determines whether the function is
	                // a declaration or an expression.
	                if (FnExprTokens.indexOf(checkToken.value) >= 0) {
	                    // It is an expression.
	                    return scanPunctuator();
	                }
	                // It is a declaration.
	                return collectRegex();
	            }
	            return collectRegex();
	        }
	        if (prevToken.type === 'Keyword') {
	            return collectRegex();
	        }
	        return scanPunctuator();
	    }
	
	    function advance() {
	        var ch;
	
	        skipComment();
	
	        if (index >= length) {
	            return {
	                type: Token.EOF,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: index,
	                end: index
	            };
	        }
	
	        ch = source.charCodeAt(index);
	
	        if (isIdentifierStart(ch)) {
	            return scanIdentifier();
	        }
	
	        // Very common: ( and ) and ;
	        if (ch === 0x28 || ch === 0x29 || ch === 0x3B) {
	            return scanPunctuator();
	        }
	
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (ch === 0x27 || ch === 0x22) {
	            return scanStringLiteral();
	        }
	
	
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (ch === 0x2E) {
	            if (isDecimalDigit(source.charCodeAt(index + 1))) {
	                return scanNumericLiteral();
	            }
	            return scanPunctuator();
	        }
	
	        if (isDecimalDigit(ch)) {
	            return scanNumericLiteral();
	        }
	
	        // Slash (/) U+002F can also start a regex.
	        if (extra.tokenize && ch === 0x2F) {
	            return advanceSlash();
	        }
	
	        return scanPunctuator();
	    }
	
	    function collectToken() {
	        var loc, token, range, value;
	
	        skipComment();
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };
	
	        token = advance();
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };
	
	        if (token.type !== Token.EOF) {
	            value = source.slice(token.start, token.end);
	            extra.tokens.push({
	                type: TokenName[token.type],
	                value: value,
	                range: [token.start, token.end],
	                loc: loc
	            });
	        }
	
	        return token;
	    }
	
	    function lex() {
	        var token;
	
	        token = lookahead;
	        index = token.end;
	        lineNumber = token.lineNumber;
	        lineStart = token.lineStart;
	
	        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
	
	        index = token.end;
	        lineNumber = token.lineNumber;
	        lineStart = token.lineStart;
	
	        return token;
	    }
	
	    function peek() {
	        var pos, line, start;
	
	        pos = index;
	        line = lineNumber;
	        start = lineStart;
	        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
	        index = pos;
	        lineNumber = line;
	        lineStart = start;
	    }
	
	    function Position(line, column) {
	        this.line = line;
	        this.column = column;
	    }
	
	    function SourceLocation(startLine, startColumn, line, column) {
	        this.start = new Position(startLine, startColumn);
	        this.end = new Position(line, column);
	    }
	
	    SyntaxTreeDelegate = {
	
	        name: 'SyntaxTree',
	
	        processComment: function (node) {
	            var lastChild, trailingComments;
	
	            if (node.type === Syntax.Program) {
	                if (node.body.length > 0) {
	                    return;
	                }
	            }
	
	            if (extra.trailingComments.length > 0) {
	                if (extra.trailingComments[0].range[0] >= node.range[1]) {
	                    trailingComments = extra.trailingComments;
	                    extra.trailingComments = [];
	                } else {
	                    extra.trailingComments.length = 0;
	                }
	            } else {
	                if (extra.bottomRightStack.length > 0 &&
	                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments &&
	                        extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
	                    trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
	                    delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
	                }
	            }
	
	            // Eating the stack.
	            while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
	                lastChild = extra.bottomRightStack.pop();
	            }
	
	            if (lastChild) {
	                if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
	                    node.leadingComments = lastChild.leadingComments;
	                    delete lastChild.leadingComments;
	                }
	            } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
	                node.leadingComments = extra.leadingComments;
	                extra.leadingComments = [];
	            }
	
	
	            if (trailingComments) {
	                node.trailingComments = trailingComments;
	            }
	
	            extra.bottomRightStack.push(node);
	        },
	
	        markEnd: function (node, startToken) {
	            if (extra.range) {
	                node.range = [startToken.start, index];
	            }
	            if (extra.loc) {
	                node.loc = new SourceLocation(
	                    startToken.startLineNumber === undefined ?  startToken.lineNumber : startToken.startLineNumber,
	                    startToken.start - (startToken.startLineStart === undefined ?  startToken.lineStart : startToken.startLineStart),
	                    lineNumber,
	                    index - lineStart
	                );
	                this.postProcess(node);
	            }
	
	            if (extra.attachComment) {
	                this.processComment(node);
	            }
	            return node;
	        },
	
	        postProcess: function (node) {
	            if (extra.source) {
	                node.loc.source = extra.source;
	            }
	            return node;
	        },
	
	        createArrayExpression: function (elements) {
	            return {
	                type: Syntax.ArrayExpression,
	                elements: elements
	            };
	        },
	
	        createAssignmentExpression: function (operator, left, right) {
	            return {
	                type: Syntax.AssignmentExpression,
	                operator: operator,
	                left: left,
	                right: right
	            };
	        },
	
	        createBinaryExpression: function (operator, left, right) {
	            var type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression :
	                        Syntax.BinaryExpression;
	            return {
	                type: type,
	                operator: operator,
	                left: left,
	                right: right
	            };
	        },
	
	        createBlockStatement: function (body) {
	            return {
	                type: Syntax.BlockStatement,
	                body: body
	            };
	        },
	
	        createBreakStatement: function (label) {
	            return {
	                type: Syntax.BreakStatement,
	                label: label
	            };
	        },
	
	        createCallExpression: function (callee, args) {
	            return {
	                type: Syntax.CallExpression,
	                callee: callee,
	                'arguments': args
	            };
	        },
	
	        createCatchClause: function (param, body) {
	            return {
	                type: Syntax.CatchClause,
	                param: param,
	                body: body
	            };
	        },
	
	        createConditionalExpression: function (test, consequent, alternate) {
	            return {
	                type: Syntax.ConditionalExpression,
	                test: test,
	                consequent: consequent,
	                alternate: alternate
	            };
	        },
	
	        createContinueStatement: function (label) {
	            return {
	                type: Syntax.ContinueStatement,
	                label: label
	            };
	        },
	
	        createDebuggerStatement: function () {
	            return {
	                type: Syntax.DebuggerStatement
	            };
	        },
	
	        createDoWhileStatement: function (body, test) {
	            return {
	                type: Syntax.DoWhileStatement,
	                body: body,
	                test: test
	            };
	        },
	
	        createEmptyStatement: function () {
	            return {
	                type: Syntax.EmptyStatement
	            };
	        },
	
	        createExpressionStatement: function (expression) {
	            return {
	                type: Syntax.ExpressionStatement,
	                expression: expression
	            };
	        },
	
	        createForStatement: function (init, test, update, body) {
	            return {
	                type: Syntax.ForStatement,
	                init: init,
	                test: test,
	                update: update,
	                body: body
	            };
	        },
	
	        createForInStatement: function (left, right, body) {
	            return {
	                type: Syntax.ForInStatement,
	                left: left,
	                right: right,
	                body: body,
	                each: false
	            };
	        },
	
	        createFunctionDeclaration: function (id, params, defaults, body) {
	            return {
	                type: Syntax.FunctionDeclaration,
	                id: id,
	                params: params,
	                defaults: defaults,
	                body: body,
	                rest: null,
	                generator: false,
	                expression: false
	            };
	        },
	
	        createFunctionExpression: function (id, params, defaults, body) {
	            return {
	                type: Syntax.FunctionExpression,
	                id: id,
	                params: params,
	                defaults: defaults,
	                body: body,
	                rest: null,
	                generator: false,
	                expression: false
	            };
	        },
	
	        createIdentifier: function (name) {
	            return {
	                type: Syntax.Identifier,
	                name: name
	            };
	        },
	
	        createIfStatement: function (test, consequent, alternate) {
	            return {
	                type: Syntax.IfStatement,
	                test: test,
	                consequent: consequent,
	                alternate: alternate
	            };
	        },
	
	        createLabeledStatement: function (label, body) {
	            return {
	                type: Syntax.LabeledStatement,
	                label: label,
	                body: body
	            };
	        },
	
	        createLiteral: function (token) {
	            return {
	                type: Syntax.Literal,
	                value: token.value,
	                raw: source.slice(token.start, token.end)
	            };
	        },
	
	        createMemberExpression: function (accessor, object, property) {
	            return {
	                type: Syntax.MemberExpression,
	                computed: accessor === '[',
	                object: object,
	                property: property
	            };
	        },
	
	        createNewExpression: function (callee, args) {
	            return {
	                type: Syntax.NewExpression,
	                callee: callee,
	                'arguments': args
	            };
	        },
	
	        createObjectExpression: function (properties) {
	            return {
	                type: Syntax.ObjectExpression,
	                properties: properties
	            };
	        },
	
	        createPostfixExpression: function (operator, argument) {
	            return {
	                type: Syntax.UpdateExpression,
	                operator: operator,
	                argument: argument,
	                prefix: false
	            };
	        },
	
	        createProgram: function (body) {
	            return {
	                type: Syntax.Program,
	                body: body
	            };
	        },
	
	        createProperty: function (kind, key, value) {
	            return {
	                type: Syntax.Property,
	                key: key,
	                value: value,
	                kind: kind
	            };
	        },
	
	        createReturnStatement: function (argument) {
	            return {
	                type: Syntax.ReturnStatement,
	                argument: argument
	            };
	        },
	
	        createSequenceExpression: function (expressions) {
	            return {
	                type: Syntax.SequenceExpression,
	                expressions: expressions
	            };
	        },
	
	        createSwitchCase: function (test, consequent) {
	            return {
	                type: Syntax.SwitchCase,
	                test: test,
	                consequent: consequent
	            };
	        },
	
	        createSwitchStatement: function (discriminant, cases) {
	            return {
	                type: Syntax.SwitchStatement,
	                discriminant: discriminant,
	                cases: cases
	            };
	        },
	
	        createThisExpression: function () {
	            return {
	                type: Syntax.ThisExpression
	            };
	        },
	
	        createThrowStatement: function (argument) {
	            return {
	                type: Syntax.ThrowStatement,
	                argument: argument
	            };
	        },
	
	        createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
	            return {
	                type: Syntax.TryStatement,
	                block: block,
	                guardedHandlers: guardedHandlers,
	                handlers: handlers,
	                finalizer: finalizer
	            };
	        },
	
	        createUnaryExpression: function (operator, argument) {
	            if (operator === '++' || operator === '--') {
	                return {
	                    type: Syntax.UpdateExpression,
	                    operator: operator,
	                    argument: argument,
	                    prefix: true
	                };
	            }
	            return {
	                type: Syntax.UnaryExpression,
	                operator: operator,
	                argument: argument,
	                prefix: true
	            };
	        },
	
	        createVariableDeclaration: function (declarations, kind) {
	            return {
	                type: Syntax.VariableDeclaration,
	                declarations: declarations,
	                kind: kind
	            };
	        },
	
	        createVariableDeclarator: function (id, init) {
	            return {
	                type: Syntax.VariableDeclarator,
	                id: id,
	                init: init
	            };
	        },
	
	        createWhileStatement: function (test, body) {
	            return {
	                type: Syntax.WhileStatement,
	                test: test,
	                body: body
	            };
	        },
	
	        createWithStatement: function (object, body) {
	            return {
	                type: Syntax.WithStatement,
	                object: object,
	                body: body
	            };
	        }
	    };
	
	    // Return true if there is a line terminator before the next token.
	
	    function peekLineTerminator() {
	        var pos, line, start, found;
	
	        pos = index;
	        line = lineNumber;
	        start = lineStart;
	        skipComment();
	        found = lineNumber !== line;
	        index = pos;
	        lineNumber = line;
	        lineStart = start;
	
	        return found;
	    }
	
	    // Throw an exception
	
	    function throwError(token, messageFormat) {
	        var error,
	            args = Array.prototype.slice.call(arguments, 2),
	            msg = messageFormat.replace(
	                /%(\d)/g,
	                function (whole, index) {
	                    assert(index < args.length, 'Message reference must be in range');
	                    return args[index];
	                }
	            );
	
	        if (typeof token.lineNumber === 'number') {
	            error = new Error('Line ' + token.lineNumber + ': ' + msg);
	            error.index = token.start;
	            error.lineNumber = token.lineNumber;
	            error.column = token.start - lineStart + 1;
	        } else {
	            error = new Error('Line ' + lineNumber + ': ' + msg);
	            error.index = index;
	            error.lineNumber = lineNumber;
	            error.column = index - lineStart + 1;
	        }
	
	        error.description = msg;
	        throw error;
	    }
	
	    function throwErrorTolerant() {
	        try {
	            throwError.apply(null, arguments);
	        } catch (e) {
	            if (extra.errors) {
	                extra.errors.push(e);
	            } else {
	                throw e;
	            }
	        }
	    }
	
	
	    // Throw an exception because of the token.
	
	    function throwUnexpected(token) {
	        if (token.type === Token.EOF) {
	            throwError(token, Messages.UnexpectedEOS);
	        }
	
	        if (token.type === Token.NumericLiteral) {
	            throwError(token, Messages.UnexpectedNumber);
	        }
	
	        if (token.type === Token.StringLiteral) {
	            throwError(token, Messages.UnexpectedString);
	        }
	
	        if (token.type === Token.Identifier) {
	            throwError(token, Messages.UnexpectedIdentifier);
	        }
	
	        if (token.type === Token.Keyword) {
	            if (isFutureReservedWord(token.value)) {
	                throwError(token, Messages.UnexpectedReserved);
	            } else if (strict && isStrictModeReservedWord(token.value)) {
	                throwErrorTolerant(token, Messages.StrictReservedWord);
	                return;
	            }
	            throwError(token, Messages.UnexpectedToken, token.value);
	        }
	
	        // BooleanLiteral, NullLiteral, or Punctuator.
	        throwError(token, Messages.UnexpectedToken, token.value);
	    }
	
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	
	    function expect(value) {
	        var token = lex();
	        if (token.type !== Token.Punctuator || token.value !== value) {
	            throwUnexpected(token);
	        }
	    }
	
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	
	    function expectKeyword(keyword) {
	        var token = lex();
	        if (token.type !== Token.Keyword || token.value !== keyword) {
	            throwUnexpected(token);
	        }
	    }
	
	    // Return true if the next token matches the specified punctuator.
	
	    function match(value) {
	        return lookahead.type === Token.Punctuator && lookahead.value === value;
	    }
	
	    // Return true if the next token matches the specified keyword
	
	    function matchKeyword(keyword) {
	        return lookahead.type === Token.Keyword && lookahead.value === keyword;
	    }
	
	    // Return true if the next token is an assignment operator
	
	    function matchAssign() {
	        var op;
	
	        if (lookahead.type !== Token.Punctuator) {
	            return false;
	        }
	        op = lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    }
	
	    function consumeSemicolon() {
	        var line;
	
	        // Catch the very common case first: immediately a semicolon (U+003B).
	        if (source.charCodeAt(index) === 0x3B || match(';')) {
	            lex();
	            return;
	        }
	
	        line = lineNumber;
	        skipComment();
	        if (lineNumber !== line) {
	            return;
	        }
	
	        if (lookahead.type !== Token.EOF && !match('}')) {
	            throwUnexpected(lookahead);
	        }
	    }
	
	    // Return true if provided expression is LeftHandSideExpression
	
	    function isLeftHandSide(expr) {
	        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
	    }
	
	    // 11.1.4 Array Initialiser
	
	    function parseArrayInitialiser() {
	        var elements = [], startToken;
	
	        startToken = lookahead;
	        expect('[');
	
	        while (!match(']')) {
	            if (match(',')) {
	                lex();
	                elements.push(null);
	            } else {
	                elements.push(parseAssignmentExpression());
	
	                if (!match(']')) {
	                    expect(',');
	                }
	            }
	        }
	
	        lex();
	
	        return delegate.markEnd(delegate.createArrayExpression(elements), startToken);
	    }
	
	    // 11.1.5 Object Initialiser
	
	    function parsePropertyFunction(param, first) {
	        var previousStrict, body, startToken;
	
	        previousStrict = strict;
	        startToken = lookahead;
	        body = parseFunctionSourceElements();
	        if (first && strict && isRestrictedWord(param[0].name)) {
	            throwErrorTolerant(first, Messages.StrictParamName);
	        }
	        strict = previousStrict;
	        return delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
	    }
	
	    function parseObjectPropertyKey() {
	        var token, startToken;
	
	        startToken = lookahead;
	        token = lex();
	
	        // Note: This function is called only from parseObjectProperty(), where
	        // EOF and Punctuator tokens are already filtered out.
	
	        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
	            if (strict && token.octal) {
	                throwErrorTolerant(token, Messages.StrictOctalLiteral);
	            }
	            return delegate.markEnd(delegate.createLiteral(token), startToken);
	        }
	
	        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
	    }
	
	    function parseObjectProperty() {
	        var token, key, id, value, param, startToken;
	
	        token = lookahead;
	        startToken = lookahead;
	
	        if (token.type === Token.Identifier) {
	
	            id = parseObjectPropertyKey();
	
	            // Property Assignment: Getter and Setter.
	
	            if (token.value === 'get' && !match(':')) {
	                key = parseObjectPropertyKey();
	                expect('(');
	                expect(')');
	                value = parsePropertyFunction([]);
	                return delegate.markEnd(delegate.createProperty('get', key, value), startToken);
	            }
	            if (token.value === 'set' && !match(':')) {
	                key = parseObjectPropertyKey();
	                expect('(');
	                token = lookahead;
	                if (token.type !== Token.Identifier) {
	                    expect(')');
	                    throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
	                    value = parsePropertyFunction([]);
	                } else {
	                    param = [ parseVariableIdentifier() ];
	                    expect(')');
	                    value = parsePropertyFunction(param, token);
	                }
	                return delegate.markEnd(delegate.createProperty('set', key, value), startToken);
	            }
	            expect(':');
	            value = parseAssignmentExpression();
	            return delegate.markEnd(delegate.createProperty('init', id, value), startToken);
	        }
	        if (token.type === Token.EOF || token.type === Token.Punctuator) {
	            throwUnexpected(token);
	        } else {
	            key = parseObjectPropertyKey();
	            expect(':');
	            value = parseAssignmentExpression();
	            return delegate.markEnd(delegate.createProperty('init', key, value), startToken);
	        }
	    }
	
	    function parseObjectInitialiser() {
	        var properties = [], property, name, key, kind, map = {}, toString = String, startToken;
	
	        startToken = lookahead;
	
	        expect('{');
	
	        while (!match('}')) {
	            property = parseObjectProperty();
	
	            if (property.key.type === Syntax.Identifier) {
	                name = property.key.name;
	            } else {
	                name = toString(property.key.value);
	            }
	            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;
	
	            key = '$' + name;
	            if (Object.prototype.hasOwnProperty.call(map, key)) {
	                if (map[key] === PropertyKind.Data) {
	                    if (strict && kind === PropertyKind.Data) {
	                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
	                    } else if (kind !== PropertyKind.Data) {
	                        throwErrorTolerant({}, Messages.AccessorDataProperty);
	                    }
	                } else {
	                    if (kind === PropertyKind.Data) {
	                        throwErrorTolerant({}, Messages.AccessorDataProperty);
	                    } else if (map[key] & kind) {
	                        throwErrorTolerant({}, Messages.AccessorGetSet);
	                    }
	                }
	                map[key] |= kind;
	            } else {
	                map[key] = kind;
	            }
	
	            properties.push(property);
	
	            if (!match('}')) {
	                expect(',');
	            }
	        }
	
	        expect('}');
	
	        return delegate.markEnd(delegate.createObjectExpression(properties), startToken);
	    }
	
	    // 11.1.6 The Grouping Operator
	
	    function parseGroupExpression() {
	        var expr;
	
	        expect('(');
	
	        expr = parseExpression();
	
	        expect(')');
	
	        return expr;
	    }
	
	
	    // 11.1 Primary Expressions
	
	    function parsePrimaryExpression() {
	        var type, token, expr, startToken;
	
	        if (match('(')) {
	            return parseGroupExpression();
	        }
	
	        if (match('[')) {
	            return parseArrayInitialiser();
	        }
	
	        if (match('{')) {
	            return parseObjectInitialiser();
	        }
	
	        type = lookahead.type;
	        startToken = lookahead;
	
	        if (type === Token.Identifier) {
	            expr =  delegate.createIdentifier(lex().value);
	        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
	            if (strict && lookahead.octal) {
	                throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
	            }
	            expr = delegate.createLiteral(lex());
	        } else if (type === Token.Keyword) {
	            if (matchKeyword('function')) {
	                return parseFunctionExpression();
	            }
	            if (matchKeyword('this')) {
	                lex();
	                expr = delegate.createThisExpression();
	            } else {
	                throwUnexpected(lex());
	            }
	        } else if (type === Token.BooleanLiteral) {
	            token = lex();
	            token.value = (token.value === 'true');
	            expr = delegate.createLiteral(token);
	        } else if (type === Token.NullLiteral) {
	            token = lex();
	            token.value = null;
	            expr = delegate.createLiteral(token);
	        } else if (match('/') || match('/=')) {
	            if (typeof extra.tokens !== 'undefined') {
	                expr = delegate.createLiteral(collectRegex());
	            } else {
	                expr = delegate.createLiteral(scanRegExp());
	            }
	            peek();
	        } else {
	            throwUnexpected(lex());
	        }
	
	        return delegate.markEnd(expr, startToken);
	    }
	
	    // 11.2 Left-Hand-Side Expressions
	
	    function parseArguments() {
	        var args = [];
	
	        expect('(');
	
	        if (!match(')')) {
	            while (index < length) {
	                args.push(parseAssignmentExpression());
	                if (match(')')) {
	                    break;
	                }
	                expect(',');
	            }
	        }
	
	        expect(')');
	
	        return args;
	    }
	
	    function parseNonComputedProperty() {
	        var token, startToken;
	
	        startToken = lookahead;
	        token = lex();
	
	        if (!isIdentifierName(token)) {
	            throwUnexpected(token);
	        }
	
	        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
	    }
	
	    function parseNonComputedMember() {
	        expect('.');
	
	        return parseNonComputedProperty();
	    }
	
	    function parseComputedMember() {
	        var expr;
	
	        expect('[');
	
	        expr = parseExpression();
	
	        expect(']');
	
	        return expr;
	    }
	
	    function parseNewExpression() {
	        var callee, args, startToken;
	
	        startToken = lookahead;
	        expectKeyword('new');
	        callee = parseLeftHandSideExpression();
	        args = match('(') ? parseArguments() : [];
	
	        return delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
	    }
	
	    function parseLeftHandSideExpressionAllowCall() {
	        var previousAllowIn, expr, args, property, startToken;
	
	        startToken = lookahead;
	
	        previousAllowIn = state.allowIn;
	        state.allowIn = true;
	        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
	        state.allowIn = previousAllowIn;
	
	        for (;;) {
	            if (match('.')) {
	                property = parseNonComputedMember();
	                expr = delegate.createMemberExpression('.', expr, property);
	            } else if (match('(')) {
	                args = parseArguments();
	                expr = delegate.createCallExpression(expr, args);
	            } else if (match('[')) {
	                property = parseComputedMember();
	                expr = delegate.createMemberExpression('[', expr, property);
	            } else {
	                break;
	            }
	            delegate.markEnd(expr, startToken);
	        }
	
	        return expr;
	    }
	
	    function parseLeftHandSideExpression() {
	        var previousAllowIn, expr, property, startToken;
	
	        startToken = lookahead;
	
	        previousAllowIn = state.allowIn;
	        expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
	        state.allowIn = previousAllowIn;
	
	        while (match('.') || match('[')) {
	            if (match('[')) {
	                property = parseComputedMember();
	                expr = delegate.createMemberExpression('[', expr, property);
	            } else {
	                property = parseNonComputedMember();
	                expr = delegate.createMemberExpression('.', expr, property);
	            }
	            delegate.markEnd(expr, startToken);
	        }
	
	        return expr;
	    }
	
	    // 11.3 Postfix Expressions
	
	    function parsePostfixExpression() {
	        var expr, token, startToken = lookahead;
	
	        expr = parseLeftHandSideExpressionAllowCall();
	
	        if (lookahead.type === Token.Punctuator) {
	            if ((match('++') || match('--')) && !peekLineTerminator()) {
	                // 11.3.1, 11.3.2
	                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                    throwErrorTolerant({}, Messages.StrictLHSPostfix);
	                }
	
	                if (!isLeftHandSide(expr)) {
	                    throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
	                }
	
	                token = lex();
	                expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
	            }
	        }
	
	        return expr;
	    }
	
	    // 11.4 Unary Operators
	
	    function parseUnaryExpression() {
	        var token, expr, startToken;
	
	        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
	            expr = parsePostfixExpression();
	        } else if (match('++') || match('--')) {
	            startToken = lookahead;
	            token = lex();
	            expr = parseUnaryExpression();
	            // 11.4.4, 11.4.5
	            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                throwErrorTolerant({}, Messages.StrictLHSPrefix);
	            }
	
	            if (!isLeftHandSide(expr)) {
	                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
	            }
	
	            expr = delegate.createUnaryExpression(token.value, expr);
	            expr = delegate.markEnd(expr, startToken);
	        } else if (match('+') || match('-') || match('~') || match('!')) {
	            startToken = lookahead;
	            token = lex();
	            expr = parseUnaryExpression();
	            expr = delegate.createUnaryExpression(token.value, expr);
	            expr = delegate.markEnd(expr, startToken);
	        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
	            startToken = lookahead;
	            token = lex();
	            expr = parseUnaryExpression();
	            expr = delegate.createUnaryExpression(token.value, expr);
	            expr = delegate.markEnd(expr, startToken);
	            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
	                throwErrorTolerant({}, Messages.StrictDelete);
	            }
	        } else {
	            expr = parsePostfixExpression();
	        }
	
	        return expr;
	    }
	
	    function binaryPrecedence(token, allowIn) {
	        var prec = 0;
	
	        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
	            return 0;
	        }
	
	        switch (token.value) {
	        case '||':
	            prec = 1;
	            break;
	
	        case '&&':
	            prec = 2;
	            break;
	
	        case '|':
	            prec = 3;
	            break;
	
	        case '^':
	            prec = 4;
	            break;
	
	        case '&':
	            prec = 5;
	            break;
	
	        case '==':
	        case '!=':
	        case '===':
	        case '!==':
	            prec = 6;
	            break;
	
	        case '<':
	        case '>':
	        case '<=':
	        case '>=':
	        case 'instanceof':
	            prec = 7;
	            break;
	
	        case 'in':
	            prec = allowIn ? 7 : 0;
	            break;
	
	        case '<<':
	        case '>>':
	        case '>>>':
	            prec = 8;
	            break;
	
	        case '+':
	        case '-':
	            prec = 9;
	            break;
	
	        case '*':
	        case '/':
	        case '%':
	            prec = 11;
	            break;
	
	        default:
	            break;
	        }
	
	        return prec;
	    }
	
	    // 11.5 Multiplicative Operators
	    // 11.6 Additive Operators
	    // 11.7 Bitwise Shift Operators
	    // 11.8 Relational Operators
	    // 11.9 Equality Operators
	    // 11.10 Binary Bitwise Operators
	    // 11.11 Binary Logical Operators
	
	    function parseBinaryExpression() {
	        var marker, markers, expr, token, prec, stack, right, operator, left, i;
	
	        marker = lookahead;
	        left = parseUnaryExpression();
	
	        token = lookahead;
	        prec = binaryPrecedence(token, state.allowIn);
	        if (prec === 0) {
	            return left;
	        }
	        token.prec = prec;
	        lex();
	
	        markers = [marker, lookahead];
	        right = parseUnaryExpression();
	
	        stack = [left, token, right];
	
	        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
	
	            // Reduce: make a binary expression from the three topmost entries.
	            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
	                right = stack.pop();
	                operator = stack.pop().value;
	                left = stack.pop();
	                expr = delegate.createBinaryExpression(operator, left, right);
	                markers.pop();
	                marker = markers[markers.length - 1];
	                delegate.markEnd(expr, marker);
	                stack.push(expr);
	            }
	
	            // Shift.
	            token = lex();
	            token.prec = prec;
	            stack.push(token);
	            markers.push(lookahead);
	            expr = parseUnaryExpression();
	            stack.push(expr);
	        }
	
	        // Final reduce to clean-up the stack.
	        i = stack.length - 1;
	        expr = stack[i];
	        markers.pop();
	        while (i > 1) {
	            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
	            i -= 2;
	            marker = markers.pop();
	            delegate.markEnd(expr, marker);
	        }
	
	        return expr;
	    }
	
	
	    // 11.12 Conditional Operator
	
	    function parseConditionalExpression() {
	        var expr, previousAllowIn, consequent, alternate, startToken;
	
	        startToken = lookahead;
	
	        expr = parseBinaryExpression();
	
	        if (match('?')) {
	            lex();
	            previousAllowIn = state.allowIn;
	            state.allowIn = true;
	            consequent = parseAssignmentExpression();
	            state.allowIn = previousAllowIn;
	            expect(':');
	            alternate = parseAssignmentExpression();
	
	            expr = delegate.createConditionalExpression(expr, consequent, alternate);
	            delegate.markEnd(expr, startToken);
	        }
	
	        return expr;
	    }
	
	    // 11.13 Assignment Operators
	
	    function parseAssignmentExpression() {
	        var token, left, right, node, startToken;
	
	        token = lookahead;
	        startToken = lookahead;
	
	        node = left = parseConditionalExpression();
	
	        if (matchAssign()) {
	            // LeftHandSideExpression
	            if (!isLeftHandSide(left)) {
	                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
	            }
	
	            // 11.13.1
	            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
	                throwErrorTolerant(token, Messages.StrictLHSAssignment);
	            }
	
	            token = lex();
	            right = parseAssignmentExpression();
	            node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
	        }
	
	        return node;
	    }
	
	    // 11.14 Comma Operator
	
	    function parseExpression() {
	        var expr, startToken = lookahead;
	
	        expr = parseAssignmentExpression();
	
	        if (match(',')) {
	            expr = delegate.createSequenceExpression([ expr ]);
	
	            while (index < length) {
	                if (!match(',')) {
	                    break;
	                }
	                lex();
	                expr.expressions.push(parseAssignmentExpression());
	            }
	
	            delegate.markEnd(expr, startToken);
	        }
	
	        return expr;
	    }
	
	    // 12.1 Block
	
	    function parseStatementList() {
	        var list = [],
	            statement;
	
	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            statement = parseSourceElement();
	            if (typeof statement === 'undefined') {
	                break;
	            }
	            list.push(statement);
	        }
	
	        return list;
	    }
	
	    function parseBlock() {
	        var block, startToken;
	
	        startToken = lookahead;
	        expect('{');
	
	        block = parseStatementList();
	
	        expect('}');
	
	        return delegate.markEnd(delegate.createBlockStatement(block), startToken);
	    }
	
	    // 12.2 Variable Statement
	
	    function parseVariableIdentifier() {
	        var token, startToken;
	
	        startToken = lookahead;
	        token = lex();
	
	        if (token.type !== Token.Identifier) {
	            throwUnexpected(token);
	        }
	
	        return delegate.markEnd(delegate.createIdentifier(token.value), startToken);
	    }
	
	    function parseVariableDeclaration(kind) {
	        var init = null, id, startToken;
	
	        startToken = lookahead;
	        id = parseVariableIdentifier();
	
	        // 12.2.1
	        if (strict && isRestrictedWord(id.name)) {
	            throwErrorTolerant({}, Messages.StrictVarName);
	        }
	
	        if (kind === 'const') {
	            expect('=');
	            init = parseAssignmentExpression();
	        } else if (match('=')) {
	            lex();
	            init = parseAssignmentExpression();
	        }
	
	        return delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
	    }
	
	    function parseVariableDeclarationList(kind) {
	        var list = [];
	
	        do {
	            list.push(parseVariableDeclaration(kind));
	            if (!match(',')) {
	                break;
	            }
	            lex();
	        } while (index < length);
	
	        return list;
	    }
	
	    function parseVariableStatement() {
	        var declarations;
	
	        expectKeyword('var');
	
	        declarations = parseVariableDeclarationList();
	
	        consumeSemicolon();
	
	        return delegate.createVariableDeclaration(declarations, 'var');
	    }
	
	    // kind may be `const` or `let`
	    // Both are experimental and not in the specification yet.
	    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
	    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
	    function parseConstLetDeclaration(kind) {
	        var declarations, startToken;
	
	        startToken = lookahead;
	
	        expectKeyword(kind);
	
	        declarations = parseVariableDeclarationList(kind);
	
	        consumeSemicolon();
	
	        return delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
	    }
	
	    // 12.3 Empty Statement
	
	    function parseEmptyStatement() {
	        expect(';');
	        return delegate.createEmptyStatement();
	    }
	
	    // 12.4 Expression Statement
	
	    function parseExpressionStatement() {
	        var expr = parseExpression();
	        consumeSemicolon();
	        return delegate.createExpressionStatement(expr);
	    }
	
	    // 12.5 If statement
	
	    function parseIfStatement() {
	        var test, consequent, alternate;
	
	        expectKeyword('if');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        consequent = parseStatement();
	
	        if (matchKeyword('else')) {
	            lex();
	            alternate = parseStatement();
	        } else {
	            alternate = null;
	        }
	
	        return delegate.createIfStatement(test, consequent, alternate);
	    }
	
	    // 12.6 Iteration Statements
	
	    function parseDoWhileStatement() {
	        var body, test, oldInIteration;
	
	        expectKeyword('do');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = parseStatement();
	
	        state.inIteration = oldInIteration;
	
	        expectKeyword('while');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        if (match(';')) {
	            lex();
	        }
	
	        return delegate.createDoWhileStatement(body, test);
	    }
	
	    function parseWhileStatement() {
	        var test, body, oldInIteration;
	
	        expectKeyword('while');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = parseStatement();
	
	        state.inIteration = oldInIteration;
	
	        return delegate.createWhileStatement(test, body);
	    }
	
	    function parseForVariableDeclaration() {
	        var token, declarations, startToken;
	
	        startToken = lookahead;
	        token = lex();
	        declarations = parseVariableDeclarationList();
	
	        return delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
	    }
	
	    function parseForStatement() {
	        var init, test, update, left, right, body, oldInIteration;
	
	        init = test = update = null;
	
	        expectKeyword('for');
	
	        expect('(');
	
	        if (match(';')) {
	            lex();
	        } else {
	            if (matchKeyword('var') || matchKeyword('let')) {
	                state.allowIn = false;
	                init = parseForVariableDeclaration();
	                state.allowIn = true;
	
	                if (init.declarations.length === 1 && matchKeyword('in')) {
	                    lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                }
	            } else {
	                state.allowIn = false;
	                init = parseExpression();
	                state.allowIn = true;
	
	                if (matchKeyword('in')) {
	                    // LeftHandSideExpression
	                    if (!isLeftHandSide(init)) {
	                        throwErrorTolerant({}, Messages.InvalidLHSInForIn);
	                    }
	
	                    lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                }
	            }
	
	            if (typeof left === 'undefined') {
	                expect(';');
	            }
	        }
	
	        if (typeof left === 'undefined') {
	
	            if (!match(';')) {
	                test = parseExpression();
	            }
	            expect(';');
	
	            if (!match(')')) {
	                update = parseExpression();
	            }
	        }
	
	        expect(')');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = parseStatement();
	
	        state.inIteration = oldInIteration;
	
	        return (typeof left === 'undefined') ?
	                delegate.createForStatement(init, test, update, body) :
	                delegate.createForInStatement(left, right, body);
	    }
	
	    // 12.7 The continue statement
	
	    function parseContinueStatement() {
	        var label = null, key;
	
	        expectKeyword('continue');
	
	        // Optimize the most common form: 'continue;'.
	        if (source.charCodeAt(index) === 0x3B) {
	            lex();
	
	            if (!state.inIteration) {
	                throwError({}, Messages.IllegalContinue);
	            }
	
	            return delegate.createContinueStatement(null);
	        }
	
	        if (peekLineTerminator()) {
	            if (!state.inIteration) {
	                throwError({}, Messages.IllegalContinue);
	            }
	
	            return delegate.createContinueStatement(null);
	        }
	
	        if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();
	
	            key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError({}, Messages.UnknownLabel, label.name);
	            }
	        }
	
	        consumeSemicolon();
	
	        if (label === null && !state.inIteration) {
	            throwError({}, Messages.IllegalContinue);
	        }
	
	        return delegate.createContinueStatement(label);
	    }
	
	    // 12.8 The break statement
	
	    function parseBreakStatement() {
	        var label = null, key;
	
	        expectKeyword('break');
	
	        // Catch the very common case first: immediately a semicolon (U+003B).
	        if (source.charCodeAt(index) === 0x3B) {
	            lex();
	
	            if (!(state.inIteration || state.inSwitch)) {
	                throwError({}, Messages.IllegalBreak);
	            }
	
	            return delegate.createBreakStatement(null);
	        }
	
	        if (peekLineTerminator()) {
	            if (!(state.inIteration || state.inSwitch)) {
	                throwError({}, Messages.IllegalBreak);
	            }
	
	            return delegate.createBreakStatement(null);
	        }
	
	        if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();
	
	            key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError({}, Messages.UnknownLabel, label.name);
	            }
	        }
	
	        consumeSemicolon();
	
	        if (label === null && !(state.inIteration || state.inSwitch)) {
	            throwError({}, Messages.IllegalBreak);
	        }
	
	        return delegate.createBreakStatement(label);
	    }
	
	    // 12.9 The return statement
	
	    function parseReturnStatement() {
	        var argument = null;
	
	        expectKeyword('return');
	
	        if (!state.inFunctionBody) {
	            throwErrorTolerant({}, Messages.IllegalReturn);
	        }
	
	        // 'return' followed by a space and an identifier is very common.
	        if (source.charCodeAt(index) === 0x20) {
	            if (isIdentifierStart(source.charCodeAt(index + 1))) {
	                argument = parseExpression();
	                consumeSemicolon();
	                return delegate.createReturnStatement(argument);
	            }
	        }
	
	        if (peekLineTerminator()) {
	            return delegate.createReturnStatement(null);
	        }
	
	        if (!match(';')) {
	            if (!match('}') && lookahead.type !== Token.EOF) {
	                argument = parseExpression();
	            }
	        }
	
	        consumeSemicolon();
	
	        return delegate.createReturnStatement(argument);
	    }
	
	    // 12.10 The with statement
	
	    function parseWithStatement() {
	        var object, body;
	
	        if (strict) {
	            // TODO(ikarienator): Should we update the test cases instead?
	            skipComment();
	            throwErrorTolerant({}, Messages.StrictModeWith);
	        }
	
	        expectKeyword('with');
	
	        expect('(');
	
	        object = parseExpression();
	
	        expect(')');
	
	        body = parseStatement();
	
	        return delegate.createWithStatement(object, body);
	    }
	
	    // 12.10 The swith statement
	
	    function parseSwitchCase() {
	        var test, consequent = [], statement, startToken;
	
	        startToken = lookahead;
	        if (matchKeyword('default')) {
	            lex();
	            test = null;
	        } else {
	            expectKeyword('case');
	            test = parseExpression();
	        }
	        expect(':');
	
	        while (index < length) {
	            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
	                break;
	            }
	            statement = parseStatement();
	            consequent.push(statement);
	        }
	
	        return delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
	    }
	
	    function parseSwitchStatement() {
	        var discriminant, cases, clause, oldInSwitch, defaultFound;
	
	        expectKeyword('switch');
	
	        expect('(');
	
	        discriminant = parseExpression();
	
	        expect(')');
	
	        expect('{');
	
	        cases = [];
	
	        if (match('}')) {
	            lex();
	            return delegate.createSwitchStatement(discriminant, cases);
	        }
	
	        oldInSwitch = state.inSwitch;
	        state.inSwitch = true;
	        defaultFound = false;
	
	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            clause = parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    throwError({}, Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	
	        state.inSwitch = oldInSwitch;
	
	        expect('}');
	
	        return delegate.createSwitchStatement(discriminant, cases);
	    }
	
	    // 12.13 The throw statement
	
	    function parseThrowStatement() {
	        var argument;
	
	        expectKeyword('throw');
	
	        if (peekLineTerminator()) {
	            throwError({}, Messages.NewlineAfterThrow);
	        }
	
	        argument = parseExpression();
	
	        consumeSemicolon();
	
	        return delegate.createThrowStatement(argument);
	    }
	
	    // 12.14 The try statement
	
	    function parseCatchClause() {
	        var param, body, startToken;
	
	        startToken = lookahead;
	        expectKeyword('catch');
	
	        expect('(');
	        if (match(')')) {
	            throwUnexpected(lookahead);
	        }
	
	        param = parseVariableIdentifier();
	        // 12.14.1
	        if (strict && isRestrictedWord(param.name)) {
	            throwErrorTolerant({}, Messages.StrictCatchVariable);
	        }
	
	        expect(')');
	        body = parseBlock();
	        return delegate.markEnd(delegate.createCatchClause(param, body), startToken);
	    }
	
	    function parseTryStatement() {
	        var block, handlers = [], finalizer = null;
	
	        expectKeyword('try');
	
	        block = parseBlock();
	
	        if (matchKeyword('catch')) {
	            handlers.push(parseCatchClause());
	        }
	
	        if (matchKeyword('finally')) {
	            lex();
	            finalizer = parseBlock();
	        }
	
	        if (handlers.length === 0 && !finalizer) {
	            throwError({}, Messages.NoCatchOrFinally);
	        }
	
	        return delegate.createTryStatement(block, [], handlers, finalizer);
	    }
	
	    // 12.15 The debugger statement
	
	    function parseDebuggerStatement() {
	        expectKeyword('debugger');
	
	        consumeSemicolon();
	
	        return delegate.createDebuggerStatement();
	    }
	
	    // 12 Statements
	
	    function parseStatement() {
	        var type = lookahead.type,
	            expr,
	            labeledBody,
	            key,
	            startToken;
	
	        if (type === Token.EOF) {
	            throwUnexpected(lookahead);
	        }
	
	        if (type === Token.Punctuator && lookahead.value === '{') {
	            return parseBlock();
	        }
	
	        startToken = lookahead;
	
	        if (type === Token.Punctuator) {
	            switch (lookahead.value) {
	            case ';':
	                return delegate.markEnd(parseEmptyStatement(), startToken);
	            case '(':
	                return delegate.markEnd(parseExpressionStatement(), startToken);
	            default:
	                break;
	            }
	        }
	
	        if (type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'break':
	                return delegate.markEnd(parseBreakStatement(), startToken);
	            case 'continue':
	                return delegate.markEnd(parseContinueStatement(), startToken);
	            case 'debugger':
	                return delegate.markEnd(parseDebuggerStatement(), startToken);
	            case 'do':
	                return delegate.markEnd(parseDoWhileStatement(), startToken);
	            case 'for':
	                return delegate.markEnd(parseForStatement(), startToken);
	            case 'function':
	                return delegate.markEnd(parseFunctionDeclaration(), startToken);
	            case 'if':
	                return delegate.markEnd(parseIfStatement(), startToken);
	            case 'return':
	                return delegate.markEnd(parseReturnStatement(), startToken);
	            case 'switch':
	                return delegate.markEnd(parseSwitchStatement(), startToken);
	            case 'throw':
	                return delegate.markEnd(parseThrowStatement(), startToken);
	            case 'try':
	                return delegate.markEnd(parseTryStatement(), startToken);
	            case 'var':
	                return delegate.markEnd(parseVariableStatement(), startToken);
	            case 'while':
	                return delegate.markEnd(parseWhileStatement(), startToken);
	            case 'with':
	                return delegate.markEnd(parseWithStatement(), startToken);
	            default:
	                break;
	            }
	        }
	
	        expr = parseExpression();
	
	        // 12.12 Labelled Statements
	        if ((expr.type === Syntax.Identifier) && match(':')) {
	            lex();
	
	            key = '$' + expr.name;
	            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError({}, Messages.Redeclaration, 'Label', expr.name);
	            }
	
	            state.labelSet[key] = true;
	            labeledBody = parseStatement();
	            delete state.labelSet[key];
	            return delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
	        }
	
	        consumeSemicolon();
	
	        return delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
	    }
	
	    // 13 Function Definition
	
	    function parseFunctionSourceElements() {
	        var sourceElement, sourceElements = [], token, directive, firstRestricted,
	            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, startToken;
	
	        startToken = lookahead;
	        expect('{');
	
	        while (index < length) {
	            if (lookahead.type !== Token.StringLiteral) {
	                break;
	            }
	            token = lookahead;
	
	            sourceElement = parseSourceElement();
	            sourceElements.push(sourceElement);
	            if (sourceElement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.start + 1, token.end - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	
	        oldLabelSet = state.labelSet;
	        oldInIteration = state.inIteration;
	        oldInSwitch = state.inSwitch;
	        oldInFunctionBody = state.inFunctionBody;
	
	        state.labelSet = {};
	        state.inIteration = false;
	        state.inSwitch = false;
	        state.inFunctionBody = true;
	
	        while (index < length) {
	            if (match('}')) {
	                break;
	            }
	            sourceElement = parseSourceElement();
	            if (typeof sourceElement === 'undefined') {
	                break;
	            }
	            sourceElements.push(sourceElement);
	        }
	
	        expect('}');
	
	        state.labelSet = oldLabelSet;
	        state.inIteration = oldInIteration;
	        state.inSwitch = oldInSwitch;
	        state.inFunctionBody = oldInFunctionBody;
	
	        return delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
	    }
	
	    function parseParams(firstRestricted) {
	        var param, params = [], token, stricted, paramSet, key, message;
	        expect('(');
	
	        if (!match(')')) {
	            paramSet = {};
	            while (index < length) {
	                token = lookahead;
	                param = parseVariableIdentifier();
	                key = '$' + token.value;
	                if (strict) {
	                    if (isRestrictedWord(token.value)) {
	                        stricted = token;
	                        message = Messages.StrictParamName;
	                    }
	                    if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
	                        stricted = token;
	                        message = Messages.StrictParamDupe;
	                    }
	                } else if (!firstRestricted) {
	                    if (isRestrictedWord(token.value)) {
	                        firstRestricted = token;
	                        message = Messages.StrictParamName;
	                    } else if (isStrictModeReservedWord(token.value)) {
	                        firstRestricted = token;
	                        message = Messages.StrictReservedWord;
	                    } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
	                        firstRestricted = token;
	                        message = Messages.StrictParamDupe;
	                    }
	                }
	                params.push(param);
	                paramSet[key] = true;
	                if (match(')')) {
	                    break;
	                }
	                expect(',');
	            }
	        }
	
	        expect(')');
	
	        return {
	            params: params,
	            stricted: stricted,
	            firstRestricted: firstRestricted,
	            message: message
	        };
	    }
	
	    function parseFunctionDeclaration() {
	        var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict, startToken;
	
	        startToken = lookahead;
	
	        expectKeyword('function');
	        token = lookahead;
	        id = parseVariableIdentifier();
	        if (strict) {
	            if (isRestrictedWord(token.value)) {
	                throwErrorTolerant(token, Messages.StrictFunctionName);
	            }
	        } else {
	            if (isRestrictedWord(token.value)) {
	                firstRestricted = token;
	                message = Messages.StrictFunctionName;
	            } else if (isStrictModeReservedWord(token.value)) {
	                firstRestricted = token;
	                message = Messages.StrictReservedWord;
	            }
	        }
	
	        tmp = parseParams(firstRestricted);
	        params = tmp.params;
	        stricted = tmp.stricted;
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }
	
	        previousStrict = strict;
	        body = parseFunctionSourceElements();
	        if (strict && firstRestricted) {
	            throwError(firstRestricted, message);
	        }
	        if (strict && stricted) {
	            throwErrorTolerant(stricted, message);
	        }
	        strict = previousStrict;
	
	        return delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
	    }
	
	    function parseFunctionExpression() {
	        var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict, startToken;
	
	        startToken = lookahead;
	        expectKeyword('function');
	
	        if (!match('(')) {
	            token = lookahead;
	            id = parseVariableIdentifier();
	            if (strict) {
	                if (isRestrictedWord(token.value)) {
	                    throwErrorTolerant(token, Messages.StrictFunctionName);
	                }
	            } else {
	                if (isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictFunctionName;
	                } else if (isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictReservedWord;
	                }
	            }
	        }
	
	        tmp = parseParams(firstRestricted);
	        params = tmp.params;
	        stricted = tmp.stricted;
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }
	
	        previousStrict = strict;
	        body = parseFunctionSourceElements();
	        if (strict && firstRestricted) {
	            throwError(firstRestricted, message);
	        }
	        if (strict && stricted) {
	            throwErrorTolerant(stricted, message);
	        }
	        strict = previousStrict;
	
	        return delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
	    }
	
	    // 14 Program
	
	    function parseSourceElement() {
	        if (lookahead.type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'const':
	            case 'let':
	                return parseConstLetDeclaration(lookahead.value);
	            case 'function':
	                return parseFunctionDeclaration();
	            default:
	                return parseStatement();
	            }
	        }
	
	        if (lookahead.type !== Token.EOF) {
	            return parseStatement();
	        }
	    }
	
	    function parseSourceElements() {
	        var sourceElement, sourceElements = [], token, directive, firstRestricted;
	
	        while (index < length) {
	            token = lookahead;
	            if (token.type !== Token.StringLiteral) {
	                break;
	            }
	
	            sourceElement = parseSourceElement();
	            sourceElements.push(sourceElement);
	            if (sourceElement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.start + 1, token.end - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	
	        while (index < length) {
	            sourceElement = parseSourceElement();
	            /* istanbul ignore if */
	            if (typeof sourceElement === 'undefined') {
	                break;
	            }
	            sourceElements.push(sourceElement);
	        }
	        return sourceElements;
	    }
	
	    function parseProgram() {
	        var body, startToken;
	
	        skipComment();
	        peek();
	        startToken = lookahead;
	        strict = false;
	
	        body = parseSourceElements();
	        return delegate.markEnd(delegate.createProgram(body), startToken);
	    }
	
	    function filterTokenLocation() {
	        var i, entry, token, tokens = [];
	
	        for (i = 0; i < extra.tokens.length; ++i) {
	            entry = extra.tokens[i];
	            token = {
	                type: entry.type,
	                value: entry.value
	            };
	            if (extra.range) {
	                token.range = entry.range;
	            }
	            if (extra.loc) {
	                token.loc = entry.loc;
	            }
	            tokens.push(token);
	        }
	
	        extra.tokens = tokens;
	    }
	
	    function tokenize(code, options) {
	        var toString,
	            token,
	            tokens;
	
	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }
	
	        delegate = SyntaxTreeDelegate;
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowIn: true,
	            labelSet: {},
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            lastCommentStart: -1
	        };
	
	        extra = {};
	
	        // Options matching.
	        options = options || {};
	
	        // Of course we collect tokens here.
	        options.tokens = true;
	        extra.tokens = [];
	        extra.tokenize = true;
	        // The following two fields are necessary to compute the Regex tokens.
	        extra.openParenToken = -1;
	        extra.openCurlyToken = -1;
	
	        extra.range = (typeof options.range === 'boolean') && options.range;
	        extra.loc = (typeof options.loc === 'boolean') && options.loc;
	
	        if (typeof options.comment === 'boolean' && options.comment) {
	            extra.comments = [];
	        }
	        if (typeof options.tolerant === 'boolean' && options.tolerant) {
	            extra.errors = [];
	        }
	
	        try {
	            peek();
	            if (lookahead.type === Token.EOF) {
	                return extra.tokens;
	            }
	
	            token = lex();
	            while (lookahead.type !== Token.EOF) {
	                try {
	                    token = lex();
	                } catch (lexError) {
	                    token = lookahead;
	                    if (extra.errors) {
	                        extra.errors.push(lexError);
	                        // We have to break on the first error
	                        // to avoid infinite loops.
	                        break;
	                    } else {
	                        throw lexError;
	                    }
	                }
	            }
	
	            filterTokenLocation();
	            tokens = extra.tokens;
	            if (typeof extra.comments !== 'undefined') {
	                tokens.comments = extra.comments;
	            }
	            if (typeof extra.errors !== 'undefined') {
	                tokens.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            extra = {};
	        }
	        return tokens;
	    }
	
	    function parse(code, options) {
	        var program, toString;
	
	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }
	
	        delegate = SyntaxTreeDelegate;
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowIn: true,
	            labelSet: {},
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            lastCommentStart: -1
	        };
	
	        extra = {};
	        if (typeof options !== 'undefined') {
	            extra.range = (typeof options.range === 'boolean') && options.range;
	            extra.loc = (typeof options.loc === 'boolean') && options.loc;
	            extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;
	
	            if (extra.loc && options.source !== null && options.source !== undefined) {
	                extra.source = toString(options.source);
	            }
	
	            if (typeof options.tokens === 'boolean' && options.tokens) {
	                extra.tokens = [];
	            }
	            if (typeof options.comment === 'boolean' && options.comment) {
	                extra.comments = [];
	            }
	            if (typeof options.tolerant === 'boolean' && options.tolerant) {
	                extra.errors = [];
	            }
	            if (extra.attachComment) {
	                extra.range = true;
	                extra.comments = [];
	                extra.bottomRightStack = [];
	                extra.trailingComments = [];
	                extra.leadingComments = [];
	            }
	        }
	
	        try {
	            program = parseProgram();
	            if (typeof extra.comments !== 'undefined') {
	                program.comments = extra.comments;
	            }
	            if (typeof extra.tokens !== 'undefined') {
	                filterTokenLocation();
	                program.tokens = extra.tokens;
	            }
	            if (typeof extra.errors !== 'undefined') {
	                program.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            extra = {};
	        }
	
	        return program;
	    }
	
	    // Sync with *.json manifests.
	    exports.version = '1.2.2';
	
	    exports.tokenize = tokenize;
	
	    exports.parse = parse;
	
	    // Deep copy.
	   /* istanbul ignore next */
	    exports.Syntax = (function () {
	        var name, types = {};
	
	        if (typeof Object.create === 'function') {
	            types = Object.create(null);
	        }
	
	        for (name in Syntax) {
	            if (Syntax.hasOwnProperty(name)) {
	                types[name] = Syntax[name];
	            }
	        }
	
	        if (typeof Object.freeze === 'function') {
	            Object.freeze(types);
	        }
	
	        return types;
	    }());
	
	}));
	/* vim: set sw=4 ts=4 et tw=80 : */
	
	},{}],1:[function(require,module,exports){
	(function (process){
	/* parser generated by jison 0.4.13 */
	/*
	  Returns a Parser object of the following structure:
	
	  Parser: {
	    yy: {}
	  }
	
	  Parser.prototype: {
	    yy: {},
	    trace: function(),
	    symbols_: {associative list: name ==> number},
	    terminals_: {associative list: number ==> name},
	    productions_: [...],
	    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
	    table: [...],
	    defaultActions: {...},
	    parseError: function(str, hash),
	    parse: function(input),
	
	    lexer: {
	        EOF: 1,
	        parseError: function(str, hash),
	        setInput: function(input),
	        input: function(),
	        unput: function(str),
	        more: function(),
	        less: function(n),
	        pastInput: function(),
	        upcomingInput: function(),
	        showPosition: function(),
	        test_match: function(regex_match_array, rule_index),
	        next: function(),
	        lex: function(),
	        begin: function(condition),
	        popState: function(),
	        _currentRules: function(),
	        topState: function(),
	        pushState: function(condition),
	
	        options: {
	            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
	            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
	            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
	        },
	
	        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
	        rules: [...],
	        conditions: {associative list: name ==> set},
	    }
	  }
	
	
	  token location info (@$, _$, etc.): {
	    first_line: n,
	    last_line: n,
	    first_column: n,
	    last_column: n,
	    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
	  }
	
	
	  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
	    text:        (matched text)
	    token:       (the produced terminal token, if any)
	    line:        (yylineno)
	  }
	  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
	    loc:         (yylloc)
	    expected:    (string describing the set of expected tokens)
	    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
	  }
	*/
	var parser = (function(){
	var parser = {trace: function trace() { },
	yy: {},
	symbols_: {"error":2,"JSON_PATH":3,"DOLLAR":4,"PATH_COMPONENTS":5,"LEADING_CHILD_MEMBER_EXPRESSION":6,"PATH_COMPONENT":7,"MEMBER_COMPONENT":8,"SUBSCRIPT_COMPONENT":9,"CHILD_MEMBER_COMPONENT":10,"DESCENDANT_MEMBER_COMPONENT":11,"DOT":12,"MEMBER_EXPRESSION":13,"DOT_DOT":14,"STAR":15,"IDENTIFIER":16,"SCRIPT_EXPRESSION":17,"INTEGER":18,"END":19,"CHILD_SUBSCRIPT_COMPONENT":20,"DESCENDANT_SUBSCRIPT_COMPONENT":21,"[":22,"SUBSCRIPT":23,"]":24,"SUBSCRIPT_EXPRESSION":25,"SUBSCRIPT_EXPRESSION_LIST":26,"SUBSCRIPT_EXPRESSION_LISTABLE":27,",":28,"STRING_LITERAL":29,"ARRAY_SLICE":30,"FILTER_EXPRESSION":31,"QQ_STRING":32,"Q_STRING":33,"$accept":0,"$end":1},
	terminals_: {2:"error",4:"DOLLAR",12:"DOT",14:"DOT_DOT",15:"STAR",16:"IDENTIFIER",17:"SCRIPT_EXPRESSION",18:"INTEGER",19:"END",22:"[",24:"]",28:",",30:"ARRAY_SLICE",31:"FILTER_EXPRESSION",32:"QQ_STRING",33:"Q_STRING"},
	productions_: [0,[3,1],[3,2],[3,1],[3,2],[5,1],[5,2],[7,1],[7,1],[8,1],[8,1],[10,2],[6,1],[11,2],[13,1],[13,1],[13,1],[13,1],[13,1],[9,1],[9,1],[20,3],[21,4],[23,1],[23,1],[26,1],[26,3],[27,1],[27,1],[27,1],[25,1],[25,1],[25,1],[29,1],[29,1]],
	performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
	/**/) {
	/* this == yyval */
	if (!yy.ast) {
	    yy.ast = _ast;
	    _ast.initialize();
	}
	
	var $0 = $$.length - 1;
	switch (yystate) {
	case 1:yy.ast.set({ expression: { type: "root", value: $$[$0] } }); yy.ast.unshift(); return yy.ast.yield()
	break;
	case 2:yy.ast.set({ expression: { type: "root", value: $$[$0-1] } }); yy.ast.unshift(); return yy.ast.yield()
	break;
	case 3:yy.ast.unshift(); return yy.ast.yield()
	break;
	case 4:yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $$[$0-1] }}); yy.ast.unshift(); return yy.ast.yield()
	break;
	case 5:
	break;
	case 6:
	break;
	case 7:yy.ast.set({ operation: "member" }); yy.ast.push()
	break;
	case 8:yy.ast.set({ operation: "subscript" }); yy.ast.push() 
	break;
	case 9:yy.ast.set({ scope: "child" })
	break;
	case 10:yy.ast.set({ scope: "descendant" })
	break;
	case 11:
	break;
	case 12:yy.ast.set({ scope: "child", operation: "member" })
	break;
	case 13:
	break;
	case 14:yy.ast.set({ expression: { type: "wildcard", value: $$[$0] } })
	break;
	case 15:yy.ast.set({ expression: { type: "identifier", value: $$[$0] } })
	break;
	case 16:yy.ast.set({ expression: { type: "script_expression", value: $$[$0] } })
	break;
	case 17:yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($$[$0]) } })
	break;
	case 18:
	break;
	case 19:yy.ast.set({ scope: "child" })
	break;
	case 20:yy.ast.set({ scope: "descendant" })
	break;
	case 21:
	break;
	case 22:
	break;
	case 23:
	break;
	case 24:$$[$0].length > 1? yy.ast.set({ expression: { type: "union", value: $$[$0] } }) : this.$ = $$[$0]
	break;
	case 25:this.$ = [$$[$0]]
	break;
	case 26:this.$ = $$[$0-2].concat($$[$0])
	break;
	case 27:this.$ = { expression: { type: "numeric_literal", value: parseInt($$[$0]) } }; yy.ast.set(this.$)
	break;
	case 28:this.$ = { expression: { type: "string_literal", value: $$[$0] } }; yy.ast.set(this.$)
	break;
	case 29:this.$ = { expression: { type: "slice", value: $$[$0] } }; yy.ast.set(this.$)
	break;
	case 30:this.$ = { expression: { type: "wildcard", value: $$[$0] } }; yy.ast.set(this.$)
	break;
	case 31:this.$ = { expression: { type: "script_expression", value: $$[$0] } }; yy.ast.set(this.$)
	break;
	case 32:this.$ = { expression: { type: "filter_expression", value: $$[$0] } }; yy.ast.set(this.$)
	break;
	case 33:this.$ = $$[$0]
	break;
	case 34:this.$ = $$[$0]
	break;
	}
	},
	table: [{3:1,4:[1,2],6:3,13:4,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9]},{1:[3]},{1:[2,1],5:10,7:11,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,3],5:21,7:11,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,12],12:[2,12],14:[2,12],22:[2,12]},{1:[2,14],12:[2,14],14:[2,14],22:[2,14]},{1:[2,15],12:[2,15],14:[2,15],22:[2,15]},{1:[2,16],12:[2,16],14:[2,16],22:[2,16]},{1:[2,17],12:[2,17],14:[2,17],22:[2,17]},{1:[2,18],12:[2,18],14:[2,18],22:[2,18]},{1:[2,2],7:22,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,5],12:[2,5],14:[2,5],22:[2,5]},{1:[2,7],12:[2,7],14:[2,7],22:[2,7]},{1:[2,8],12:[2,8],14:[2,8],22:[2,8]},{1:[2,9],12:[2,9],14:[2,9],22:[2,9]},{1:[2,10],12:[2,10],14:[2,10],22:[2,10]},{1:[2,19],12:[2,19],14:[2,19],22:[2,19]},{1:[2,20],12:[2,20],14:[2,20],22:[2,20]},{13:23,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9]},{13:24,15:[1,5],16:[1,6],17:[1,7],18:[1,8],19:[1,9],22:[1,25]},{15:[1,29],17:[1,30],18:[1,33],23:26,25:27,26:28,27:32,29:34,30:[1,35],31:[1,31],32:[1,36],33:[1,37]},{1:[2,4],7:22,8:12,9:13,10:14,11:15,12:[1,18],14:[1,19],20:16,21:17,22:[1,20]},{1:[2,6],12:[2,6],14:[2,6],22:[2,6]},{1:[2,11],12:[2,11],14:[2,11],22:[2,11]},{1:[2,13],12:[2,13],14:[2,13],22:[2,13]},{15:[1,29],17:[1,30],18:[1,33],23:38,25:27,26:28,27:32,29:34,30:[1,35],31:[1,31],32:[1,36],33:[1,37]},{24:[1,39]},{24:[2,23]},{24:[2,24],28:[1,40]},{24:[2,30]},{24:[2,31]},{24:[2,32]},{24:[2,25],28:[2,25]},{24:[2,27],28:[2,27]},{24:[2,28],28:[2,28]},{24:[2,29],28:[2,29]},{24:[2,33],28:[2,33]},{24:[2,34],28:[2,34]},{24:[1,41]},{1:[2,21],12:[2,21],14:[2,21],22:[2,21]},{18:[1,33],27:42,29:34,30:[1,35],32:[1,36],33:[1,37]},{1:[2,22],12:[2,22],14:[2,22],22:[2,22]},{24:[2,26],28:[2,26]}],
	defaultActions: {27:[2,23],29:[2,30],30:[2,31],31:[2,32]},
	parseError: function parseError(str, hash) {
	    if (hash.recoverable) {
	        this.trace(str);
	    } else {
	        throw new Error(str);
	    }
	},
	parse: function parse(input) {
	    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
	    var args = lstack.slice.call(arguments, 1);
	    this.lexer.setInput(input);
	    this.lexer.yy = this.yy;
	    this.yy.lexer = this.lexer;
	    this.yy.parser = this;
	    if (typeof this.lexer.yylloc == 'undefined') {
	        this.lexer.yylloc = {};
	    }
	    var yyloc = this.lexer.yylloc;
	    lstack.push(yyloc);
	    var ranges = this.lexer.options && this.lexer.options.ranges;
	    if (typeof this.yy.parseError === 'function') {
	        this.parseError = this.yy.parseError;
	    } else {
	        this.parseError = Object.getPrototypeOf(this).parseError;
	    }
	    function popStack(n) {
	        stack.length = stack.length - 2 * n;
	        vstack.length = vstack.length - n;
	        lstack.length = lstack.length - n;
	    }
	    function lex() {
	        var token;
	        token = self.lexer.lex() || EOF;
	        if (typeof token !== 'number') {
	            token = self.symbols_[token] || token;
	        }
	        return token;
	    }
	    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
	    while (true) {
	        state = stack[stack.length - 1];
	        if (this.defaultActions[state]) {
	            action = this.defaultActions[state];
	        } else {
	            if (symbol === null || typeof symbol == 'undefined') {
	                symbol = lex();
	            }
	            action = table[state] && table[state][symbol];
	        }
	                    if (typeof action === 'undefined' || !action.length || !action[0]) {
	                var errStr = '';
	                expected = [];
	                for (p in table[state]) {
	                    if (this.terminals_[p] && p > TERROR) {
	                        expected.push('\'' + this.terminals_[p] + '\'');
	                    }
	                }
	                if (this.lexer.showPosition) {
	                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
	                } else {
	                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
	                }
	                this.parseError(errStr, {
	                    text: this.lexer.match,
	                    token: this.terminals_[symbol] || symbol,
	                    line: this.lexer.yylineno,
	                    loc: yyloc,
	                    expected: expected
	                });
	            }
	        if (action[0] instanceof Array && action.length > 1) {
	            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
	        }
	        switch (action[0]) {
	        case 1:
	            stack.push(symbol);
	            vstack.push(this.lexer.yytext);
	            lstack.push(this.lexer.yylloc);
	            stack.push(action[1]);
	            symbol = null;
	            if (!preErrorSymbol) {
	                yyleng = this.lexer.yyleng;
	                yytext = this.lexer.yytext;
	                yylineno = this.lexer.yylineno;
	                yyloc = this.lexer.yylloc;
	                if (recovering > 0) {
	                    recovering--;
	                }
	            } else {
	                symbol = preErrorSymbol;
	                preErrorSymbol = null;
	            }
	            break;
	        case 2:
	            len = this.productions_[action[1]][1];
	            yyval.$ = vstack[vstack.length - len];
	            yyval._$ = {
	                first_line: lstack[lstack.length - (len || 1)].first_line,
	                last_line: lstack[lstack.length - 1].last_line,
	                first_column: lstack[lstack.length - (len || 1)].first_column,
	                last_column: lstack[lstack.length - 1].last_column
	            };
	            if (ranges) {
	                yyval._$.range = [
	                    lstack[lstack.length - (len || 1)].range[0],
	                    lstack[lstack.length - 1].range[1]
	                ];
	            }
	            r = this.performAction.apply(yyval, [
	                yytext,
	                yyleng,
	                yylineno,
	                this.yy,
	                action[1],
	                vstack,
	                lstack
	            ].concat(args));
	            if (typeof r !== 'undefined') {
	                return r;
	            }
	            if (len) {
	                stack = stack.slice(0, -1 * len * 2);
	                vstack = vstack.slice(0, -1 * len);
	                lstack = lstack.slice(0, -1 * len);
	            }
	            stack.push(this.productions_[action[1]][0]);
	            vstack.push(yyval.$);
	            lstack.push(yyval._$);
	            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	            stack.push(newState);
	            break;
	        case 3:
	            return true;
	        }
	    }
	    return true;
	}};
	var _ast = {
	
	  initialize: function() {
	    this._nodes = [];
	    this._node = {};
	    this._stash = [];
	  },
	
	  set: function(props) {
	    for (var k in props) this._node[k] = props[k];
	    return this._node;
	  },
	
	  node: function(obj) {
	    if (arguments.length) this._node = obj;
	    return this._node;
	  },
	
	  push: function() {
	    this._nodes.push(this._node);
	    this._node = {};
	  },
	
	  unshift: function() {
	    this._nodes.unshift(this._node);
	    this._node = {};
	  },
	
	  yield: function() {
	    var _nodes = this._nodes;
	    this.initialize();
	    return _nodes;
	  }
	};
	/* generated by jison-lex 0.2.1 */
	var lexer = (function(){
	var lexer = {
	
	EOF:1,
	
	parseError:function parseError(str, hash) {
	        if (this.yy.parser) {
	            this.yy.parser.parseError(str, hash);
	        } else {
	            throw new Error(str);
	        }
	    },
	
	// resets the lexer, sets new input
	setInput:function (input) {
	        this._input = input;
	        this._more = this._backtrack = this.done = false;
	        this.yylineno = this.yyleng = 0;
	        this.yytext = this.matched = this.match = '';
	        this.conditionStack = ['INITIAL'];
	        this.yylloc = {
	            first_line: 1,
	            first_column: 0,
	            last_line: 1,
	            last_column: 0
	        };
	        if (this.options.ranges) {
	            this.yylloc.range = [0,0];
	        }
	        this.offset = 0;
	        return this;
	    },
	
	// consumes and returns one char from the input
	input:function () {
	        var ch = this._input[0];
	        this.yytext += ch;
	        this.yyleng++;
	        this.offset++;
	        this.match += ch;
	        this.matched += ch;
	        var lines = ch.match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	            this.yylineno++;
	            this.yylloc.last_line++;
	        } else {
	            this.yylloc.last_column++;
	        }
	        if (this.options.ranges) {
	            this.yylloc.range[1]++;
	        }
	
	        this._input = this._input.slice(1);
	        return ch;
	    },
	
	// unshifts one char (or a string) into the input
	unput:function (ch) {
	        var len = ch.length;
	        var lines = ch.split(/(?:\r\n?|\n)/g);
	
	        this._input = ch + this._input;
	        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
	        //this.yyleng -= len;
	        this.offset -= len;
	        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	        this.match = this.match.substr(0, this.match.length - 1);
	        this.matched = this.matched.substr(0, this.matched.length - 1);
	
	        if (lines.length - 1) {
	            this.yylineno -= lines.length - 1;
	        }
	        var r = this.yylloc.range;
	
	        this.yylloc = {
	            first_line: this.yylloc.first_line,
	            last_line: this.yylineno + 1,
	            first_column: this.yylloc.first_column,
	            last_column: lines ?
	                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
	                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
	              this.yylloc.first_column - len
	        };
	
	        if (this.options.ranges) {
	            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	        }
	        this.yyleng = this.yytext.length;
	        return this;
	    },
	
	// When called from action, caches matched text and appends it on next action
	more:function () {
	        this._more = true;
	        return this;
	    },
	
	// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
	reject:function () {
	        if (this.options.backtrack_lexer) {
	            this._backtrack = true;
	        } else {
	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
	                text: "",
	                token: null,
	                line: this.yylineno
	            });
	
	        }
	        return this;
	    },
	
	// retain first n characters of the match
	less:function (n) {
	        this.unput(this.match.slice(n));
	    },
	
	// displays already matched input, i.e. for error messages
	pastInput:function () {
	        var past = this.matched.substr(0, this.matched.length - this.match.length);
	        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
	    },
	
	// displays upcoming input, i.e. for error messages
	upcomingInput:function () {
	        var next = this.match;
	        if (next.length < 20) {
	            next += this._input.substr(0, 20-next.length);
	        }
	        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
	    },
	
	// displays the character position where the lexing error occurred, i.e. for error messages
	showPosition:function () {
	        var pre = this.pastInput();
	        var c = new Array(pre.length + 1).join("-");
	        return pre + this.upcomingInput() + "\n" + c + "^";
	    },
	
	// test the lexed token: return FALSE when not a match, otherwise return token
	test_match:function (match, indexed_rule) {
	        var token,
	            lines,
	            backup;
	
	        if (this.options.backtrack_lexer) {
	            // save context
	            backup = {
	                yylineno: this.yylineno,
	                yylloc: {
	                    first_line: this.yylloc.first_line,
	                    last_line: this.last_line,
	                    first_column: this.yylloc.first_column,
	                    last_column: this.yylloc.last_column
	                },
	                yytext: this.yytext,
	                match: this.match,
	                matches: this.matches,
	                matched: this.matched,
	                yyleng: this.yyleng,
	                offset: this.offset,
	                _more: this._more,
	                _input: this._input,
	                yy: this.yy,
	                conditionStack: this.conditionStack.slice(0),
	                done: this.done
	            };
	            if (this.options.ranges) {
	                backup.yylloc.range = this.yylloc.range.slice(0);
	            }
	        }
	
	        lines = match[0].match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	            this.yylineno += lines.length;
	        }
	        this.yylloc = {
	            first_line: this.yylloc.last_line,
	            last_line: this.yylineno + 1,
	            first_column: this.yylloc.last_column,
	            last_column: lines ?
	                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
	                         this.yylloc.last_column + match[0].length
	        };
	        this.yytext += match[0];
	        this.match += match[0];
	        this.matches = match;
	        this.yyleng = this.yytext.length;
	        if (this.options.ranges) {
	            this.yylloc.range = [this.offset, this.offset += this.yyleng];
	        }
	        this._more = false;
	        this._backtrack = false;
	        this._input = this._input.slice(match[0].length);
	        this.matched += match[0];
	        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
	        if (this.done && this._input) {
	            this.done = false;
	        }
	        if (token) {
	            return token;
	        } else if (this._backtrack) {
	            // recover context
	            for (var k in backup) {
	                this[k] = backup[k];
	            }
	            return false; // rule action called reject() implying the next rule should be tested instead.
	        }
	        return false;
	    },
	
	// return next match in input
	next:function () {
	        if (this.done) {
	            return this.EOF;
	        }
	        if (!this._input) {
	            this.done = true;
	        }
	
	        var token,
	            match,
	            tempMatch,
	            index;
	        if (!this._more) {
	            this.yytext = '';
	            this.match = '';
	        }
	        var rules = this._currentRules();
	        for (var i = 0; i < rules.length; i++) {
	            tempMatch = this._input.match(this.rules[rules[i]]);
	            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                match = tempMatch;
	                index = i;
	                if (this.options.backtrack_lexer) {
	                    token = this.test_match(tempMatch, rules[i]);
	                    if (token !== false) {
	                        return token;
	                    } else if (this._backtrack) {
	                        match = false;
	                        continue; // rule action called reject() implying a rule MISmatch.
	                    } else {
	                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	                        return false;
	                    }
	                } else if (!this.options.flex) {
	                    break;
	                }
	            }
	        }
	        if (match) {
	            token = this.test_match(match, rules[index]);
	            if (token !== false) {
	                return token;
	            }
	            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
	            return false;
	        }
	        if (this._input === "") {
	            return this.EOF;
	        } else {
	            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
	                text: "",
	                token: null,
	                line: this.yylineno
	            });
	        }
	    },
	
	// return next match that has a token
	lex:function lex() {
	        var r = this.next();
	        if (r) {
	            return r;
	        } else {
	            return this.lex();
	        }
	    },
	
	// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
	begin:function begin(condition) {
	        this.conditionStack.push(condition);
	    },
	
	// pop the previously active lexer condition state off the condition stack
	popState:function popState() {
	        var n = this.conditionStack.length - 1;
	        if (n > 0) {
	            return this.conditionStack.pop();
	        } else {
	            return this.conditionStack[0];
	        }
	    },
	
	// produce the lexer rule set which is active for the currently active lexer condition state
	_currentRules:function _currentRules() {
	        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
	            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
	        } else {
	            return this.conditions["INITIAL"].rules;
	        }
	    },
	
	// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
	topState:function topState(n) {
	        n = this.conditionStack.length - 1 - Math.abs(n || 0);
	        if (n >= 0) {
	            return this.conditionStack[n];
	        } else {
	            return "INITIAL";
	        }
	    },
	
	// alias for begin(condition)
	pushState:function pushState(condition) {
	        this.begin(condition);
	    },
	
	// return the number of states currently on the stack
	stateStackSize:function stateStackSize() {
	        return this.conditionStack.length;
	    },
	options: {},
	performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START
	/**/) {
	
	var YYSTATE=YY_START;
	switch($avoiding_name_collisions) {
	case 0:return 4
	break;
	case 1:return 14
	break;
	case 2:return 12
	break;
	case 3:return 15
	break;
	case 4:return 16
	break;
	case 5:return 22
	break;
	case 6:return 24
	break;
	case 7:return 28
	break;
	case 8:return 30
	break;
	case 9:return 18
	break;
	case 10:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 32;
	break;
	case 11:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 33;
	break;
	case 12:return 17
	break;
	case 13:return 31
	break;
	}
	},
	rules: [/^(?:\$)/,/^(?:\.\.)/,/^(?:\.)/,/^(?:\*)/,/^(?:[a-zA-Z_]+[a-zA-Z0-9_]*)/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:((-?(?:0|[1-9][0-9]*)))?\:((-?(?:0|[1-9][0-9]*)))?(\:((-?(?:0|[1-9][0-9]*)))?)?)/,/^(?:(-?(?:0|[1-9][0-9]*)))/,/^(?:"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*")/,/^(?:'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*')/,/^(?:\(.+?\)(?=\]))/,/^(?:\?\(.+?\)(?=\]))/],
	conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
	};
	return lexer;
	})();
	parser.lexer = lexer;
	function Parser () {
	  this.yy = {};
	}
	Parser.prototype = parser;parser.Parser = Parser;
	return new Parser;
	})();
	
	
	if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
	exports.parser = parser;
	exports.Parser = parser.Parser;
	exports.parse = function () { return parser.parse.apply(parser, arguments); };
	exports.main = function commonjsMain(args) {
	    if (!args[1]) {
	        console.log('Usage: '+args[0]+' FILE');
	        process.exit(1);
	    }
	    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
	    return exports.parser.parse(source);
	};
	if (typeof module !== 'undefined' && require.main === module) {
	  exports.main(process.argv.slice(1));
	}
	}
	
	}).call(this,require('_process'))
	},{"_process":12,"fs":9,"path":11}],2:[function(require,module,exports){
	module.exports = {
	  identifier: "[a-zA-Z_]+[a-zA-Z0-9_]*",
	  integer: "-?(?:0|[1-9][0-9]*)",
	  qq_string: "\"(?:\\\\[\"bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\"\\\\])*\"",
	  q_string: "'(?:\\\\[\'bfnrt/\\\\]|\\\\u[a-fA-F0-9]{4}|[^\'\\\\])*'"
	};
	
	},{}],3:[function(require,module,exports){
	var dict = require('./dict');
	var fs = require('fs');
	fs.readFileSync = fs.readFileSync || function() {}
	require.resolve = require.resolve || function() {}
	
	var grammar = {
	
	    lex: {
	
	        macros: {
	            esc: "\\\\",
	            int: dict.integer
	        },
	
	        rules: [
	            ["\\$", "return 'DOLLAR'"],
	            ["\\.\\.", "return 'DOT_DOT'"],
	            ["\\.", "return 'DOT'"],
	            ["\\*", "return 'STAR'"],
	            [dict.identifier, "return 'IDENTIFIER'"],
	            ["\\[", "return '['"],
	            ["\\]", "return ']'"],
	            [",", "return ','"],
	            ["({int})?\\:({int})?(\\:({int})?)?", "return 'ARRAY_SLICE'"],
	            ["{int}", "return 'INTEGER'"],
	            [dict.qq_string, "yytext = yytext.substr(1,yyleng-2); return 'QQ_STRING';"],
	            [dict.q_string, "yytext = yytext.substr(1,yyleng-2); return 'Q_STRING';"],
	            ["\\(.+?\\)(?=\\])", "return 'SCRIPT_EXPRESSION'"],
	            ["\\?\\(.+?\\)(?=\\])", "return 'FILTER_EXPRESSION'"]
	        ]
	    },
	
	    start: "JSON_PATH",
	
	    bnf: {
	
	        JSON_PATH: [
	                [ 'DOLLAR',                 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()' ],
	                [ 'DOLLAR PATH_COMPONENTS', 'yy.ast.set({ expression: { type: "root", value: $1 } }); yy.ast.unshift(); return yy.ast.yield()' ],
	                [ 'LEADING_CHILD_MEMBER_EXPRESSION',                 'yy.ast.unshift(); return yy.ast.yield()' ],
	                [ 'LEADING_CHILD_MEMBER_EXPRESSION PATH_COMPONENTS', 'yy.ast.set({ operation: "member", scope: "child", expression: { type: "identifier", value: $1 }}); yy.ast.unshift(); return yy.ast.yield()' ] ],
	
	        PATH_COMPONENTS: [
	                [ 'PATH_COMPONENT',                 '' ],
	                [ 'PATH_COMPONENTS PATH_COMPONENT', '' ] ],
	
	        PATH_COMPONENT: [
	                [ 'MEMBER_COMPONENT',    'yy.ast.set({ operation: "member" }); yy.ast.push()' ],
	                [ 'SUBSCRIPT_COMPONENT', 'yy.ast.set({ operation: "subscript" }); yy.ast.push() ' ] ],
	
	        MEMBER_COMPONENT: [
	                [ 'CHILD_MEMBER_COMPONENT',      'yy.ast.set({ scope: "child" })' ],
	                [ 'DESCENDANT_MEMBER_COMPONENT', 'yy.ast.set({ scope: "descendant" })' ] ],
	
	        CHILD_MEMBER_COMPONENT: [
	                [ 'DOT MEMBER_EXPRESSION', '' ] ],
	
	        LEADING_CHILD_MEMBER_EXPRESSION: [
	                [ 'MEMBER_EXPRESSION', 'yy.ast.set({ scope: "child", operation: "member" })' ] ],
	
	        DESCENDANT_MEMBER_COMPONENT: [
	                [ 'DOT_DOT MEMBER_EXPRESSION', '' ] ],
	
	        MEMBER_EXPRESSION: [
	                [ 'STAR',              'yy.ast.set({ expression: { type: "wildcard", value: $1 } })' ],
	                [ 'IDENTIFIER',        'yy.ast.set({ expression: { type: "identifier", value: $1 } })' ],
	                [ 'SCRIPT_EXPRESSION', 'yy.ast.set({ expression: { type: "script_expression", value: $1 } })' ],
	                [ 'INTEGER',           'yy.ast.set({ expression: { type: "numeric_literal", value: parseInt($1) } })' ],
	                [ 'END',               '' ] ],
	
	        SUBSCRIPT_COMPONENT: [
	                [ 'CHILD_SUBSCRIPT_COMPONENT',      'yy.ast.set({ scope: "child" })' ],
	                [ 'DESCENDANT_SUBSCRIPT_COMPONENT', 'yy.ast.set({ scope: "descendant" })' ] ],
	
	        CHILD_SUBSCRIPT_COMPONENT: [
	                [ '[ SUBSCRIPT ]', '' ] ],
	
	        DESCENDANT_SUBSCRIPT_COMPONENT: [
	                [ 'DOT_DOT [ SUBSCRIPT ]', '' ] ],
	
	        SUBSCRIPT: [
	                [ 'SUBSCRIPT_EXPRESSION', '' ],
	                [ 'SUBSCRIPT_EXPRESSION_LIST', '$1.length > 1? yy.ast.set({ expression: { type: "union", value: $1 } }) : $$ = $1' ] ],
	
	        SUBSCRIPT_EXPRESSION_LIST: [
	                [ 'SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = [$1]'],
	                [ 'SUBSCRIPT_EXPRESSION_LIST , SUBSCRIPT_EXPRESSION_LISTABLE', '$$ = $1.concat($3)' ] ],
	
	        SUBSCRIPT_EXPRESSION_LISTABLE: [
	                [ 'INTEGER',           '$$ = { expression: { type: "numeric_literal", value: parseInt($1) } }; yy.ast.set($$)' ],
	                [ 'STRING_LITERAL',    '$$ = { expression: { type: "string_literal", value: $1 } }; yy.ast.set($$)' ],
	                [ 'ARRAY_SLICE',       '$$ = { expression: { type: "slice", value: $1 } }; yy.ast.set($$)' ] ],
	
	        SUBSCRIPT_EXPRESSION: [
	                [ 'STAR',              '$$ = { expression: { type: "wildcard", value: $1 } }; yy.ast.set($$)' ],
	                [ 'SCRIPT_EXPRESSION', '$$ = { expression: { type: "script_expression", value: $1 } }; yy.ast.set($$)' ],
	                [ 'FILTER_EXPRESSION', '$$ = { expression: { type: "filter_expression", value: $1 } }; yy.ast.set($$)' ] ],
	
	        STRING_LITERAL: [
	                [ 'QQ_STRING', "$$ = $1" ],
	                [ 'Q_STRING',  "$$ = $1" ] ]
	    },
	
	    moduleInclude: fs.readFileSync(require.resolve("../include/module.js")),
	    actionInclude: fs.readFileSync(require.resolve("../include/action.js"))
	};
	
	module.exports = grammar;
	
	},{"./dict":2,"fs":9}],4:[function(require,module,exports){
	var aesprim = require('./aesprim');
	var slice = require('./slice');
	var _evaluate = require('static-eval');
	var _uniq = require('underscore').uniq;
	
	var Handlers = function() {
	  return this.initialize.apply(this, arguments);
	}
	
	Handlers.prototype.initialize = function() {
	  this.traverse = traverser(true);
	  this.descend = traverser();
	}
	
	Handlers.prototype.keys = Object.keys;
	
	Handlers.prototype.resolve = function(component) {
	
	  var key = [ component.operation, component.scope, component.expression.type ].join('-');
	  var method = this._fns[key];
	
	  if (!method) throw new Error("couldn't resolve key: " + key);
	  return method.bind(this);
	};
	
	Handlers.prototype.register = function(key, handler) {
	
	  if (!handler instanceof Function) {
	    throw new Error("handler must be a function");
	  }
	
	  this._fns[key] = handler;
	};
	
	Handlers.prototype._fns = {
	
	  'member-child-identifier': function(component, partial) {
	    var key = component.expression.value;
	    var value = partial.value;
	    if (value instanceof Object && key in value) {
	      return [ { value: value[key], path: partial.path.concat(key) } ]
	    }
	  },
	
	  'member-descendant-identifier':
	    _traverse(function(key, value, ref) { return key == ref }),
	
	  'subscript-child-numeric_literal':
	    _descend(function(key, value, ref) { return key === ref }),
	
	  'subscript-descendant-numeric_literal':
	    _traverse(function(key, value, ref) { return key === ref }),
	
	  'member-child-wildcard':
	    _descend(function() { return true }),
	
	  'member-descendant-wildcard':
	    _traverse(function() { return true }),
	
	  'subscript-descendant-wildcard':
	    _traverse(function() { return true }),
	
	  'subscript-child-wildcard':
	    _descend(function() { return true }),
	
	  'subscript-child-slice': function(component, partial) {
	    if (is_array(partial.value)) {
	      var args = component.expression.value.split(':');
	      var values = partial.value.map(function(v, i) { return { value: v, path: partial.path.concat(i) } });
	      return slice.apply(null, [values].concat(args));
	    }
	  },
	
	  'subscript-child-union': function(component, partial) {
	    var results = [];
	    component.expression.value.forEach(function(component) {
	      var _component = { operation: 'subscript', scope: 'child', expression: component.expression };
	      var handler = this.resolve(_component);
	      var _results = handler(_component, partial);
	      results = results.concat(_results);
	    }, this);
	
	    return unique(results);
	  },
	
	  'subscript-descendant-union': function(component, partial, count) {
	
	    var jp = require('..');
	    var self = this;
	
	    var results = [];
	    var nodes = jp.nodes(partial, '$..*').slice(1);
	
	    nodes.forEach(function(node) {
	      if (results.length >= count) return;
	      component.expression.value.forEach(function(component) {
	        var _component = { operation: 'subscript', scope: 'child', expression: component.expression };
	        var handler = self.resolve(_component);
	        var _results = handler(_component, node);
	        results = results.concat(_results);
	      });
	    });
	
	    return unique(results);
	  },
	
	  'subscript-child-filter_expression': function(component, partial, count) {
	
	    // slice out the expression from ?(expression)
	    var src = component.expression.value.slice(2, -1);
	    var ast = aesprim.parse(src).body[0].expression;
	
	    var passable = function(key, value) {
	      return evaluate(ast, { '@': value });
	    }
	
	    return this.descend(partial, null, passable, count);
	
	  },
	
	  'subscript-descendant-filter_expression': function(component, partial, count) {
	
	    // slice out the expression from ?(expression)
	    var src = component.expression.value.slice(2, -1);
	    var ast = aesprim.parse(src).body[0].expression;
	
	    var passable = function(key, value) {
	      return evaluate(ast, { '@': value });
	    }
	
	    return this.traverse(partial, null, passable, count);
	  },
	
	  'subscript-child-script_expression': function(component, partial) {
	    var exp = component.expression.value.slice(1, -1);
	    return eval_recurse(partial, exp, '$[{{value}}]');
	  },
	
	  'member-child-script_expression': function(component, partial) {
	    var exp = component.expression.value.slice(1, -1);
	    return eval_recurse(partial, exp, '$.{{value}}');
	  },
	
	  'member-descendant-script_expression': function(component, partial) {
	    var exp = component.expression.value.slice(1, -1);
	    return eval_recurse(partial, exp, '$..value');
	  }
	};
	
	Handlers.prototype._fns['subscript-child-string_literal'] =
		Handlers.prototype._fns['member-child-identifier'];
	
	Handlers.prototype._fns['member-child-numeric_literal'] =
		Handlers.prototype._fns['subscript-child-numeric_literal'];
	
	Handlers.prototype._fns['member-descendant-numeric_literal'] =
	    Handlers.prototype._fns['subscript-descendant-string_literal'] =
	    Handlers.prototype._fns['member-descendant-identifier'];
	
	function eval_recurse(partial, src, template) {
	
	  var jp = require('./index');
	  var ast = aesprim.parse(src).body[0].expression;
	  var value = evaluate(ast, { '@': partial.value });
	  var path = template.replace(/\{\{\s*value\s*\}\}/g, value);
	
	  var results = jp.nodes(partial.value, path);
	  results.forEach(function(r) {
	    r.path = partial.path.concat(r.path.slice(1));
	  });
	
	  return results;
	}
	
	function is_array(val) {
	  return Array.isArray(val);
	}
	
	function is_object(val) {
	  // is this a non-array, non-null object?
	  return val && !(val instanceof Array) && val instanceof Object;
	}
	
	function traverser(recurse) {
	
	  return function(partial, ref, passable, count) {
	
	    var value = partial.value;
	    var path = partial.path;
	
	    var results = [];
	
	    var descend = function(value, path) {
	
	      if (is_array(value)) {
	        value.forEach(function(element, index) {
	          if (results.length >= count) { return }
	          if (passable(index, element, ref)) {
	            results.push({ path: path.concat(index), value: element });
	          }
	        });
	        value.forEach(function(element, index) {
	          if (results.length >= count) { return }
	          if (recurse) {
	            descend(element, path.concat(index));
	          }
	        });
	      } else if (is_object(value)) {
	        this.keys(value).forEach(function(k) {
	          if (results.length >= count) { return }
	          if (passable(k, value[k], ref)) {
	            results.push({ path: path.concat(k), value: value[k] });
	          }
	        })
	        this.keys(value).forEach(function(k) {
	          if (results.length >= count) { return }
	          if (recurse) {
	            descend(value[k], path.concat(k));
	          }
	        });
	      }
	    }.bind(this);
	    descend(value, path);
	    return results;
	  }
	}
	
	function _descend(passable) {
	  return function(component, partial, count) {
	    return this.descend(partial, component.expression.value, passable, count);
	  }
	}
	
	function _traverse(passable) {
	  return function(component, partial, count) {
	    return this.traverse(partial, component.expression.value, passable, count);
	  }
	}
	
	function evaluate() {
	  try { return _evaluate.apply(this, arguments) }
	  catch (e) { }
	}
	
	function unique(results) {
	  return _uniq(
	    results,
	    function(r) { return r.path.map(function(c) { return String(c).replace('-', '--') }).join('-') }
	  );
	}
	
	module.exports = Handlers;
	
	},{"..":"jsonpath","./aesprim":"./aesprim","./index":5,"./slice":7,"static-eval":13,"underscore":9}],5:[function(require,module,exports){
	/* global toString */
	
	var assert = require('assert');
	var dict = require('./dict');
	var Parser = require('./parser');
	var Handlers = require('./handlers');
	
	var JSONPath = function() {
	  this.initialize.apply(this, arguments);
	};
	
	JSONPath.prototype.initialize = function() {
	  this.parser = new Parser();
	  this.handlers = new Handlers();
	};
	
	JSONPath.prototype.parse = function(string) {
	  assert.ok(_is_string(string), "we need a path");
	  return this.parser.parse(string);
	};
	
	JSONPath.prototype.parent = function(obj, string) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(string, "we need a path");
	
	  var node = this.nodes(obj, string)[0];
	  var key = node.path.pop(); /* jshint unused:false */
	  return this.value(obj, node.path);
	}
	
	JSONPath.prototype.apply = function(obj, string, fn) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(string, "we need a path");
	  assert.equal(typeof fn, "function", "fn needs to be function")
	
	  var nodes = this.nodes(obj, string).sort(function(a, b) {
	    // sort nodes so we apply from the bottom up
	    return b.path.length - a.path.length;
	  });
	
	  nodes.forEach(function(node) {
	    var key = node.path.pop();
	    var parent = this.value(obj, this.stringify(node.path));
	    var val = node.value = fn.call(obj, parent[key]);
	    parent[key] = val;
	  }, this);
	
	  return nodes;
	}
	
	JSONPath.prototype.value = function(obj, path, value) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(path, "we need a path");
	
	  if (arguments.length >= 3) {
	    var node = this.nodes(obj, path).shift();
	    if (!node) return this._vivify(obj, path, value);
	    var key = node.path.slice(-1).shift();
	    var parent = this.parent(obj, this.stringify(node.path));
	    parent[key] = value;
	  }
	  return this.query(obj, this.stringify(path), 1).shift();
	}
	
	JSONPath.prototype._vivify = function(obj, string, value) {
	
	  var self = this;
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(string, "we need a path");
	
	  var path = this.parser.parse(string)
	    .map(function(component) { return component.expression.value });
	
	  var setValue = function(path, value) {
	    var key = path.pop();
	    var node = self.value(obj, path);
	    if (!node) {
	      setValue(path.concat(), typeof key === 'string' ? {} : []);
	      node = self.value(obj, path);
	    }
	    node[key] = value;
	  }
	  setValue(path, value);
	  return this.query(obj, string)[0];
	}
	
	JSONPath.prototype.query = function(obj, string, count) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(_is_string(string), "we need a path");
	
	  var results = this.nodes(obj, string, count)
	    .map(function(r) { return r.value });
	
	  return results;
	};
	
	JSONPath.prototype.paths = function(obj, string, count) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(string, "we need a path");
	
	  var results = this.nodes(obj, string, count)
	    .map(function(r) { return r.path });
	
	  return results;
	};
	
	JSONPath.prototype.nodes = function(obj, string, count) {
	
	  assert.ok(obj instanceof Object, "obj needs to be an object");
	  assert.ok(string, "we need a path");
	
	  if (count === 0) return [];
	
	  var path = this.parser.parse(string);
	  var handlers = this.handlers;
	
	  var partials = [ { path: ['$'], value: obj } ];
	  var matches = [];
	
	  if (path.length && path[0].expression.type == 'root') path.shift();
	
	  if (!path.length) return partials;
	
	  path.forEach(function(component, index) {
	
	    if (matches.length >= count) return;
	    var handler = handlers.resolve(component);
	    var _partials = [];
	
	    partials.forEach(function(p) {
	
	      if (matches.length >= count) return;
	      var results = handler(component, p, count);
	
	      if (index == path.length - 1) {
	        // if we're through the components we're done
	        matches = matches.concat(results || []);
	      } else {
	        // otherwise accumulate and carry on through
	        _partials = _partials.concat(results || []);
	      }
	    });
	
	    partials = _partials;
	
	  });
	
	  return count ? matches.slice(0, count) : matches;
	};
	
	JSONPath.prototype.stringify = function(path) {
	
	  assert.ok(path, "we need a path");
	
	  var string = '$';
	
	  var templates = {
	    'descendant-member': '..{{value}}',
	    'child-member': '.{{value}}',
	    'descendant-subscript': '..[{{value}}]',
	    'child-subscript': '[{{value}}]'
	  };
	
	  path = this._normalize(path);
	
	  path.forEach(function(component) {
	
	    if (component.expression.type == 'root') return;
	
	    var key = [component.scope, component.operation].join('-');
	    var template = templates[key];
	    var value;
	
	    if (component.expression.type == 'string_literal') {
	      value = JSON.stringify(component.expression.value)
	    } else {
	      value = component.expression.value;
	    }
	
	    if (!template) throw new Error("couldn't find template " + key);
	
	    string += template.replace(/{{value}}/, value);
	  });
	
	  return string;
	}
	
	JSONPath.prototype._normalize = function(path) {
	
	  assert.ok(path, "we need a path");
	
	  if (typeof path == "string") {
	
	    return this.parser.parse(path);
	
	  } else if (Array.isArray(path) && typeof path[0] == "string") {
	
	    var _path = [ { expression: { type: "root", value: "$" } } ];
	
	    path.forEach(function(component, index) {
	
	      if (component == '$' && index === 0) return;
	
	      if (typeof component == "string" && component.match("^" + dict.identifier + "$")) {
	
	        _path.push({
	          operation: 'member',
	          scope: 'child',
	          expression: { value: component, type: 'identifier' }
	        });
	
	      } else {
	
	        var type = typeof component == "number" ?
	          'numeric_literal' : 'string_literal';
	
	        _path.push({
	          operation: 'subscript',
	          scope: 'child',
	          expression: { value: component, type: type }
	        });
	      }
	    });
	
	    return _path;
	
	  } else if (Array.isArray(path) && typeof path[0] == "object") {
	
	    return path
	  }
	
	  throw new Error("couldn't understand path " + path);
	}
	
	function _is_string(obj) {
	  return toString.call(obj) == '[object String]';
	}
	
	JSONPath.Handlers = Handlers;
	JSONPath.Parser = Parser;
	
	var instance = new JSONPath;
	instance.JSONPath = JSONPath;
	
	module.exports = instance;
	
	},{"./dict":2,"./handlers":4,"./parser":6,"assert":8}],6:[function(require,module,exports){
	var grammar = require('./grammar');
	var gparser = require('../generated/parser');
	
	var Parser = function() {
	
	  var parser = new gparser.Parser();
	
	  var _parseError = parser.parseError;
	  parser.yy.parseError = function() {
	    if (parser.yy.ast) {
	      parser.yy.ast.initialize();
	    }
	    _parseError.apply(parser, arguments);
	  }
	
	  return parser;
	
	};
	
	Parser.grammar = grammar;
	module.exports = Parser;
	
	},{"../generated/parser":1,"./grammar":3}],7:[function(require,module,exports){
	module.exports = function(arr, start, end, step) {
	
	  var len = arr.length;
	
	  if (step === 0) throw new Error("step cannot be zero");
	  step = step ? integer(step) : 1;
	
	  // normalize negative values
	  start = start < 0 ? len + start : start;
	  end = end < 0 ? len + end : end;
	
	  // default extents to extents
	  start = integer(start === 0 ? 0 : !start ? (step > 0 ? 0 : len - 1) : start);
	  end = integer(end === 0 ? 0 : !end ? (step > 0 ? len : -1) : end);
	
	  // clamp extents
	  start = step > 0 ? Math.max(0, start) : Math.min(len, start);
	  end = step > 0 ? Math.min(end, len) : Math.max(-1, end);
	
	  // return empty if extents are backwards
	  if (step > 0 && end <= start) return [];
	  if (step < 0 && start <= end) return [];
	
	  var result = [];
	
	  for (var i = start; i != end; i += step) {
	    if ((step < 0 && i <= end) || (step > 0 && i >= end)) break;
	    result.push(arr[i]);
	  }
	
	  return result;
	}
	
	function integer(val) {
	  return String(val).match(/^[0-9]+$/) ? parseInt(val) :
	    Number.isFinite(val) ? parseInt(val, 10) : 0;
	}
	
	},{}],8:[function(require,module,exports){
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	var util = require('util/');
	
	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  }
	  else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}
	
	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	
	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(JSON.stringify(self.expected, replacer), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;
	
	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }
	
	    return true;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!util.isObject(actual) && !util.isObject(expected)) {
	    return actual == expected;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }
	
	  return false;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }
	
	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};
	
	assert.ifError = function(err) { if (err) {throw err;}};
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	},{"util/":15}],9:[function(require,module,exports){
	
	},{}],10:[function(require,module,exports){
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}
	
	},{}],11:[function(require,module,exports){
	(function (process){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	}).call(this,require('_process'))
	},{"_process":12}],12:[function(require,module,exports){
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };
	
	},{}],13:[function(require,module,exports){
	var unparse = require('escodegen').generate;
	
	module.exports = function (ast, vars) {
	    if (!vars) vars = {};
	    var FAIL = {};
	    
	    var result = (function walk (node) {
	        if (node.type === 'Literal') {
	            return node.value;
	        }
	        else if (node.type === 'UnaryExpression'){
	            var val = walk(node.argument)
	            if (node.operator === '+') return +val
	            if (node.operator === '-') return -val
	            if (node.operator === '~') return ~val
	            if (node.operator === '!') return !val
	            return FAIL
	        }
	        else if (node.type === 'ArrayExpression') {
	            var xs = [];
	            for (var i = 0, l = node.elements.length; i < l; i++) {
	                var x = walk(node.elements[i]);
	                if (x === FAIL) return FAIL;
	                xs.push(x);
	            }
	            return xs;
	        }
	        else if (node.type === 'ObjectExpression') {
	            var obj = {};
	            for (var i = 0; i < node.properties.length; i++) {
	                var prop = node.properties[i];
	                var value = prop.value === null
	                    ? prop.value
	                    : walk(prop.value)
	                ;
	                if (value === FAIL) return FAIL;
	                obj[prop.key.value || prop.key.name] = value;
	            }
	            return obj;
	        }
	        else if (node.type === 'BinaryExpression' ||
	                 node.type === 'LogicalExpression') {
	            var l = walk(node.left);
	            if (l === FAIL) return FAIL;
	            var r = walk(node.right);
	            if (r === FAIL) return FAIL;
	            
	            var op = node.operator;
	            if (op === '==') return l == r;
	            if (op === '===') return l === r;
	            if (op === '!=') return l != r;
	            if (op === '!==') return l !== r;
	            if (op === '+') return l + r;
	            if (op === '-') return l - r;
	            if (op === '*') return l * r;
	            if (op === '/') return l / r;
	            if (op === '%') return l % r;
	            if (op === '<') return l < r;
	            if (op === '<=') return l <= r;
	            if (op === '>') return l > r;
	            if (op === '>=') return l >= r;
	            if (op === '|') return l | r;
	            if (op === '&') return l & r;
	            if (op === '^') return l ^ r;
	            if (op === '&&') return l && r;
	            if (op === '||') return l || r;
	            
	            return FAIL;
	        }
	        else if (node.type === 'Identifier') {
	            if ({}.hasOwnProperty.call(vars, node.name)) {
	                return vars[node.name];
	            }
	            else return FAIL;
	        }
	        else if (node.type === 'CallExpression') {
	            var callee = walk(node.callee);
	            if (callee === FAIL) return FAIL;
	            
	            var ctx = node.callee.object ? walk(node.callee.object) : FAIL;
	            if (ctx === FAIL) ctx = null;
	
	            var args = [];
	            for (var i = 0, l = node.arguments.length; i < l; i++) {
	                var x = walk(node.arguments[i]);
	                if (x === FAIL) return FAIL;
	                args.push(x);
	            }
	            return callee.apply(ctx, args);
	        }
	        else if (node.type === 'MemberExpression') {
	            var obj = walk(node.object);
	            if (obj === FAIL) return FAIL;
	            if (node.property.type === 'Identifier') {
	                return obj[node.property.name];
	            }
	            var prop = walk(node.property);
	            if (prop === FAIL) return FAIL;
	            return obj[prop];
	        }
	        else if (node.type === 'ConditionalExpression') {
	            var val = walk(node.test)
	            if (val === FAIL) return FAIL;
	            return val ? walk(node.consequent) : walk(node.alternate)
	        }
	        else if (node.type === 'FunctionExpression') {
	            return Function('return ' + unparse(node))();
	        }
	        else return FAIL;
	    })(ast);
	    
	    return result === FAIL ? undefined : result;
	};
	
	},{"escodegen":9}],14:[function(require,module,exports){
	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}
	},{}],15:[function(require,module,exports){
	(function (process,global){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = require('./support/isBuffer');
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = require('inherits');
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"./support/isBuffer":14,"_process":12,"inherits":10}],"jsonpath":[function(require,module,exports){
	module.exports = require('./lib/index');
	
	},{"./lib/index":5}]},{},["jsonpath"])("jsonpath")
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _assign = __webpack_require__(82);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _path = __webpack_require__(94);
	
	var _path2 = _interopRequireDefault(_path);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API = function () {
	    function API(URL) {
	        (0, _classCallCheck3.default)(this, API);
	
	        (0, _assign2.default)(this, { URL: URL });
	    }
	
	    (0, _createClass3.default)(API, [{
	        key: 'fetch',
	        value: function (_fetch) {
	            function fetch(_x, _x2, _x3) {
	                return _fetch.apply(this, arguments);
	            }
	
	            fetch.toString = function () {
	                return _fetch.toString();
	            };
	
	            return fetch;
	        }(function (method, fields, props) {
	            return fetch(this.URL + _path2.default.http(fields), (0, _assign2.default)({ method: method }, props)).then(function (res) {
	                return res.json();
	            }).then(function (_ref) {
	                var data = _ref.data;
	                return data;
	            });
	        })
	    }, {
	        key: 'get',
	        value: function get(fields, props) {
	            return this.fetch('get', fields, props);
	        }
	    }, {
	        key: 'post',
	        value: function post(fields, props) {
	            return this.fetch('post', fields, props);
	        }
	    }, {
	        key: 'put',
	        value: function put(fields, props) {
	            return this.fetch('put', fields, props);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(fields, props) {
	            return this.fetch('delete', fields, props);
	        }
	    }]);
	    return API;
	}();
	
	exports.default = API;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _toConsumableArray2 = __webpack_require__(6);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Path = function (_Array) {
	    (0, _inherits3.default)(Path, _Array);
	
	    function Path() {
	        var number = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        (0, _classCallCheck3.default)(this, Path);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Path).call(this, number));
	    }
	
	    (0, _createClass3.default)(Path, null, [{
	        key: 'xpath',
	        value: function xpath(path) {
	            return '$' + path.map(function (a) {
	                return '[\'' + a + '\']';
	            }).join('');
	        }
	    }, {
	        key: 'http',
	        value: function http(path) {
	            return [''].concat((0, _toConsumableArray3.default)(path)).join('/');
	        }
	    }]);
	    return Path;
	}(Array);
	
	exports.default = Path;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(5).Object.getPrototypeOf;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(51)
	  , $getPrototypeOf = __webpack_require__(50);
	
	__webpack_require__(62)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(99);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(100);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(103);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(66);
	module.exports = __webpack_require__(102).f('iterator');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(49);

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105);
	__webpack_require__(65);
	__webpack_require__(113);
	__webpack_require__(114);
	module.exports = __webpack_require__(5).Symbol;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(16)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(15)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(106).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(48)
	  , uid            = __webpack_require__(45)
	  , wks            = __webpack_require__(49)
	  , wksExt         = __webpack_require__(102)
	  , wksDefine      = __webpack_require__(107)
	  , keyOf          = __webpack_require__(108)
	  , enumKeys       = __webpack_require__(109)
	  , isArray        = __webpack_require__(110)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(33)
	  , gOPNExt        = __webpack_require__(111)
	  , $GOPD          = __webpack_require__(74)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(35)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(112).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(75).f  = $propertyIsEnumerable;
	  __webpack_require__(86).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(14)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
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
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(45)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(16)
	  , core           = __webpack_require__(5)
	  , LIBRARY        = __webpack_require__(14)
	  , wksExt         = __webpack_require__(102)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(35)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(35)
	  , gOPS    = __webpack_require__(86)
	  , pIE     = __webpack_require__(75);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(112).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(36)
	  , hiddenKeys = __webpack_require__(46).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107)('asyncIterator');

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107)('observable');

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(116);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(119);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(99);
	
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

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	module.exports = __webpack_require__(5).Object.setPrototypeOf;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(15);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(73).set});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(121);
	var $Object = __webpack_require__(5).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(15)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(33)});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _promise = __webpack_require__(63);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	exports.default = loadImage;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function loadImage(image_source) {
	    return new _promise2.default(function (resolve, reject) {
	        var image = new Image();
	        for (var key in image_source) {
	            image[key] = image_source[key];
	        }
	        image.onload = function () {
	            return resolve(image);
	        };
	        image.onerror = reject;
	    });
	}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _values = __webpack_require__(124);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _slicedToArray2 = __webpack_require__(128);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getIterator2 = __webpack_require__(132);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _jsonpath = __webpack_require__(92);
	
	var _jsonpath2 = _interopRequireDefault(_jsonpath);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function reformat(format, object) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = (0, _getIterator3.default)(format), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = (0, _slicedToArray3.default)(_step.value, 2);
	
	            var parent = _step$value[0];
	            var callback = _step$value[1];
	
	            _jsonpath2.default.apply(object, '$..' + parent, callback);
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	
	    return object;
	}
	
	reformat.arrayToObject = function (field) {
	    return function (values) {
	        var dictionary = {};
	        values.forEach(function (entry, i) {
	            entry.__index__ = i;
	            dictionary[entry[field]] = entry;
	        });
	        return dictionary;
	    };
	};
	
	reformat.objectToArray = function (values) {
	    var array = [];
	    (0, _values2.default)(values).forEach(function (entry) {
	        array[entry.__index__] = entry;
	    });
	    return array;
	};
	
	exports.default = reformat;
	
	// let example = {
	//     'domain': 'fashionseoul.com',
	//     'relevant': true,
	//     'image_hash': '5687f6fd42b4212802313bd64c88cc2e',
	//     'people': [
	//         {
	//             'face': [
	//                 123,
	//                 49,
	//                 53,
	//                 53
	//             ],
	//             'items': [
	//                 {
	//                     'category': 'shirt',
	//                     'similar_results': {
	//                         'GangnamStyle': [
	//                             {
	//                                 'images': {
	//                                     'XLarge': 'http://resources.shopstyle.com/pim/ac/d8/acd8db4962934f94f2404bc5af0b4de8_xlarge.jpg'
	//                                 },
	//                                 'clickUrl': 'https://api.shopstyle.com/action/apiVisitRetailer?id=519415362&pid=uid900-25284470-95',
	//                                 'id': 519415362
	//                             }
	//                         ]
	//                     }
	//                 }
	//             ],
	//             _id : '5767cb583efef87a0f9985ed'
	//         }
	//     ]
	// };
	//
	// Object.entires = object => Object.keys(object).map(key => [key, object[key]]);
	// Object.values = object => Object.keys(object).map(key => object[key]);
	//
	// reformat([
	//     ['people', reformat.arrayToObject('_id')],
	//     ['items', reformat.arrayToObject('category')],
	//     ['similar_results.*', reformat.arrayToObject('id')]
	// ], example);
	//
	// console.log(example);
	//
	// reformat([
	//     ['people', reformat.objectToArray],
	//     ['items', reformat.objectToArray],
	//     ['similar_results.*', reformat.objectToArray]
	// ], example);
	//
	// console.log(JSON.stringify(example));

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(125), __esModule: true };

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(126);
	module.exports = __webpack_require__(5).Object.values;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(15)
	  , $values = __webpack_require__(127)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(35)
	  , toIObject = __webpack_require__(37)
	  , isEnum    = __webpack_require__(75).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(129);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(132);
	
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

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(9);
	module.exports = __webpack_require__(131);

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(5).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(9);
	module.exports = __webpack_require__(134);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(21)
	  , get      = __webpack_require__(56);
	module.exports = __webpack_require__(5).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(59);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _jsonpath = __webpack_require__(92);
	
	var _jsonpath2 = _interopRequireDefault(_jsonpath);
	
	var _path = __webpack_require__(94);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _editors = __webpack_require__(136);
	
	var editors = _interopRequireWildcard(_editors);
	
	var _nav = __webpack_require__(144);
	
	var _nav2 = _interopRequireDefault(_nav);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var App = function (_React$Component) {
	    (0, _inherits3.default)(App, _React$Component);
	
	    function App(props) {
	        (0, _classCallCheck3.default)(this, App);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props));
	
	        _this.state = {
	            current: '',
	            path: []
	        };
	        return _this;
	    }
	
	    (0, _createClass3.default)(App, [{
	        key: 'navigate',
	        value: function navigate(key) {
	            var _this2 = this;
	
	            this.setState(function (state) {
	                var path = state.path;
	
	                if (key == '..') {
	                    path.splice(-1);
	                    return state;
	                }
	                var indexOfKey = _this2.state.path.indexOf(key);
	                if (indexOfKey > -1) {
	                    path.splice(indexOfKey, path.length, key); // path.length is just a greater num
	                } else {
	                        path.push(key);
	                    }
	                return state;
	            });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this3 = this;
	
	            this.props.server.loadLast(10, {
	                onUpdate: function onUpdate() {
	                    return _this3.forceUpdate();
	                }
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var navigate = this.navigate;
	            var props = this.props;
	            var state = this.state;
	            var server = props.server;
	            var path = state.path;
	            var currentObject = _jsonpath2.default.query(this.props.server, _path2.default.xpath(path))[0];
	
	            var CurrentComponent = void 0,
	                current = editors[path[path.length - 1]];
	            if (current) {
	                CurrentComponent = React.createElement(current, {
	                    server: server,
	                    path: path,
	                    navigate: navigate.bind(this),
	                    data: currentObject
	                });
	            }
	
	            var BackButtonNode = void 0;
	            if (this.state.path.length) {
	                BackButtonNode = React.createElement(
	                    'button',
	                    null,
	                    React.createElement(
	                        'i',
	                        {
	                            className: 'material-icons',
	                            onClick: this.navigate.bind(this, '..')
	                        },
	                        'arrow_back'
	                    )
	                );
	            }
	
	            var image = void 0;
	            if (path.indexOf('images') > -1 && path[path.indexOf('images') + 1]) {
	                image = this.props.server.images[path[path.indexOf('images') + 1]].image_urls[0];
	            }
	
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    null,
	                    BackButtonNode
	                ),
	                CurrentComponent,
	                React.createElement('aside', { style: { backgroundImage: 'url(\'' + image + '\')' } }),
	                React.createElement(_nav2.default, { navigate: this.navigate.bind(this), data: (0, _keys2.default)(editors).filter(function (editor_name) {
	                        return currentObject[editor_name];
	                    }) })
	            );
	        }
	    }]);
	    return App;
	}(React.Component);
	
	exports.default = App;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.results = exports.collections = exports.items = exports.people = exports.images = undefined;
	
	var _images = __webpack_require__(137);
	
	var _images2 = _interopRequireDefault(_images);
	
	var _people = __webpack_require__(140);
	
	var _people2 = _interopRequireDefault(_people);
	
	var _items = __webpack_require__(141);
	
	var _items2 = _interopRequireDefault(_items);
	
	var _collections = __webpack_require__(142);
	
	var _collections2 = _interopRequireDefault(_collections);
	
	var _results = __webpack_require__(143);
	
	var _results2 = _interopRequireDefault(_results);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.images = _images2.default;
	exports.people = _people2.default;
	exports.items = _items2.default;
	exports.collections = _collections2.default;
	exports.results = _results2.default;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _reformat = __webpack_require__(123);
	
	var _reformat2 = _interopRequireDefault(_reformat);
	
	var _assemblage = __webpack_require__(138);
	
	var _assemblage2 = _interopRequireDefault(_assemblage);
	
	var _delete2 = __webpack_require__(139);
	
	var _delete3 = _interopRequireDefault(_delete2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Images = function (_React$Component) {
	    (0, _inherits3.default)(Images, _React$Component);
	
	    function Images(props) {
	        (0, _classCallCheck3.default)(this, Images);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Images).call(this, props));
	    }
	
	    (0, _createClass3.default)(Images, [{
	        key: 'delete',
	        value: function _delete(image) {
	            var _props = this.props;
	            var path = _props.path;
	            var server = _props.server;
	
	            server.delete(path, image.image_id);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'click',
	        value: function click(image) {
	            console.log(image);
	            this.props.navigate(image.image_id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return React.createElement(_assemblage2.default, {
	                minWidth: 180,
	                margin: 32,
	                marginBottom: 0,
	                template: function template(ImageNode, image) {
	                    return React.createElement(
	                        'div',
	                        { className: 'card' },
	                        React.createElement(
	                            'div',
	                            { onClick: _this2.click.bind(_this2, image) },
	                            ImageNode
	                        ),
	                        React.createElement(_delete3.default, { onClick: _this2.delete.bind(_this2, image) })
	                    );
	                },
	                draggable: 'false',
	                src: _reformat2.default.objectToArray(this.props.data).map(function (image) {
	                    image.src = image.image_urls[0];
	                    return image;
	                })
	            });
	        }
	    }]);
	    return Images;
	}(React.Component);
	
	exports.default = Images;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _from = __webpack_require__(7);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _getIterator2 = __webpack_require__(132);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _assign = __webpack_require__(82);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _promise = __webpack_require__(63);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _keys = __webpack_require__(59);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _loadImage = __webpack_require__(122);
	
	var _loadImage2 = _interopRequireDefault(_loadImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.entries = function (object) {
	    return (0, _keys2.default)(object).map(function (key) {
	        return [key, object[key]];
	    });
	}; /* globals React */
	
	// TODO: backwards drag
	
	var Assemblage = function (_React$Component) {
	    (0, _inherits3.default)(Assemblage, _React$Component);
	
	    function Assemblage(props) {
	        (0, _classCallCheck3.default)(this, Assemblage);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Assemblage).call(this, props)); // src, minWidth, template
	
	
	        _this.state = {
	            src: [],
	            id: ID(),
	            drag: {
	                id: '',
	                origin: [0, 0],
	                position: [0, 0]
	            }
	        };
	        return _this;
	    }
	
	    (0, _createClass3.default)(Assemblage, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;
	
	            this.loadImages(this.props.src);
	            this.props.src.forEach(function (img) {
	                return _this2.index(img);
	            });
	            addEventListener('resize', function () {
	                return _this2.forceUpdate();
	            });
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            this.loadImages(props.src);
	        }
	    }, {
	        key: 'loadImages',
	        value: function loadImages(images) {
	            var _this3 = this;
	
	            var promise = _promise2.default.resolve();
	            images.forEach(function (image) {
	                promise = promise.then(_this3.process.bind(_this3, image));
	            });
	        }
	    }, {
	        key: 'process',
	        value: function process(img) {
	            var _this4 = this;
	
	            return _promise2.default.resolve(img).then(_loadImage2.default).then(function (img) {
	                return _this4.setState(function (state) {
	                    state.src.push((0, _assign2.default)(img, {
	                        assemblage_id: ID()
	                    }));
	                });
	            });
	        }
	    }, {
	        key: 'hover',
	        value: function hover(el) {
	            var _this5 = this;
	
	            var selected = void 0;
	            var selected_index = void 0;
	            var beneath_index = void 0;
	            this.setState(function (state) {
	                state.src.forEach(function (img, i) {
	                    if (img.assemblage_id == _this5.state.drag.id) {
	                        selected = img;
	                        selected_index = i;
	                    }
	                });
	                state.src.splice(selected_index, 1);
	                state.src.forEach(function (img, i) {
	                    if (img.assemblage_id == el.id) {
	                        beneath_index = i;
	                    }
	                });
	                state.src.splice(beneath_index, 0, selected);
	            });
	            return el;
	        }
	    }, {
	        key: 'mousedown',
	        value: function mousedown(e) {
	            var _this6 = this;
	
	            var target = e.target;
	            var pageX = e.pageX;
	            var pageY = e.pageY;
	
	            var rect = target.getBoundingClientRect();
	            this.setState(function (state) {
	                state.drag = {
	                    id: target.id,
	                    origin: [rect.left - pageX, rect.top - pageY],
	                    position: [pageX, pageY]
	                };
	            });
	            var events = {
	                mousemove: function mousemove(e) {
	                    _this6.setState(function (state) {
	                        state.drag.position = [e.pageX, e.pageY];
	                    }, function () {
	                        var beneath = _this6.beneath;
	
	                        if (beneath) {
	                            _this6.hover(beneath);
	                        }
	                    });
	                },
	                mouseup: function mouseup() {
	                    for (var event_name in events) {
	                        removeEventListener(event_name, events[event_name]);
	                    }
	                    _this6.setState({
	                        drag: {
	                            id: '',
	                            position: [0, 0]
	                        }
	                    });
	                    _this6.props.onDrop(_this6.state.src);
	                }
	            };
	            for (var event_name in events) {
	                addEventListener(event_name, events[event_name]);
	            }
	        }
	    }, {
	        key: 'index',
	        value: function index() {
	            var columns = this.columns;
	
	            var index = [];
	            return this.state.src.map(function (img, i) {
	                var row = Math.floor(i / columns);
	                var place = i % columns;
	                var top = 0;
	                if (row) {
	                    var img_above = index[row - 1][place];
	                    top = img_above.assemblage_proportion + img_above.assemblage_top;
	                }
	                (0, _assign2.default)(img, {
	                    assemblage_top: top,
	                    assemblage_place: place,
	                    assemblage_row: row,
	                    assemblage_proportion: img.height / img.width
	                });
	                if (!index[row]) {
	                    index.push([]);
	                }
	                index[row][place] = img;
	                return img;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this7 = this;
	
	            var column_width = this.clientWidth / this.columns || 0;
	            var indexed = this.index();
	            var ImageNodes = indexed.map(function (img) {
	                var style = {
	                    width: column_width - _this7.props.margin,
	                    position: 'absolute',
	                    top: column_width * img.assemblage_top + _this7.props.margin * img.assemblage_row,
	                    left: column_width * img.assemblage_place
	                };
	                if (img.assemblage_id == _this7.state.drag.id) {
	                    style.left = _this7.state.drag.position[0] + _this7.state.drag.origin[0];
	                    style.top = _this7.state.drag.position[1] + _this7.state.drag.origin[1];
	                    style.zIndex = 10000;
	                }
	                return React.createElement(
	                    'div',
	                    {
	                        key: img.assemblage_id,
	                        id: img.assemblage_id,
	                        'data-assemblage': _this7.state.id,
	                        onMouseDown: JSON.parse(_this7.props.draggable) ? _this7.mousedown.bind(_this7) : null,
	                        style: style,
	                        draggable: 'false'
	                    },
	                    _this7.props.template(React.createElement('img', {
	                        draggable: 'false',
	                        style: {
	                            width: '100%',
	                            pointerEvents: 'none',
	                            MozUserSelect: 'none',
	                            WebkitUserSelect: 'none',
	                            msUserSelect: 'none'
	                        },
	                        src: img.src
	                    }), img)
	                );
	            });
	            return React.createElement(
	                'div',
	                { ref: 'root', className: 'assemblage', style: { position: 'relative' } },
	                ImageNodes
	            );
	        }
	    }, {
	        key: 'beneath',
	        get: function get() {
	            var selected = document.getElementById(this.state.drag.id);
	            var rect1 = selected.getBoundingClientRect();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)((0, _from2.default)(document.querySelectorAll('[data-assemblage="' + this.state.id + '"]'))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var element = _step.value;
	
	                    if (element !== selected) {
	                        var rect2 = element.getBoundingClientRect();
	                        // from http://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
	                        if (!(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom)) {
	                            return element;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return null;
	        }
	    }, {
	        key: 'clientWidth',
	        get: function get() {
	            if (this.refs.root) {
	                return this.refs.root.clientWidth;
	            } else {
	                return 0;
	            }
	        }
	    }, {
	        key: 'columns',
	        get: function get() {
	            if (this.clientWidth) {
	                return Math.ceil(this.clientWidth / this.props.minWidth);
	            } else {
	                return 1;
	            }
	        }
	    }]);
	    return Assemblage;
	}(React.Component);
	
	// from https://gist.github.com/gordonbrander/2230317
	
	
	exports.default = Assemblage;
	function ID() {
	    // Math.random should be unique because of its seeding algorithm.
	    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
	    // after the decimal.
	    return '_' + Math.random().toString(36).substr(2, 9);
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Delete = function (_React$Component) {
	    (0, _inherits3.default)(Delete, _React$Component);
	
	    function Delete(props) {
	        (0, _classCallCheck3.default)(this, Delete);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Delete).call(this, props));
	    }
	
	    (0, _createClass3.default)(Delete, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "button",
	                {
	                    className: "delete",
	                    draggable: "false",
	                    onClick: this.props.onClick
	                },
	                React.createElement(
	                    "i",
	                    { className: "material-icons" },
	                    "delete"
	                )
	            );
	        }
	    }]);
	    return Delete;
	}(React.Component);
	
	exports.default = Delete;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _toConsumableArray2 = __webpack_require__(6);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _reformat = __webpack_require__(123);
	
	var _reformat2 = _interopRequireDefault(_reformat);
	
	var _delete2 = __webpack_require__(139);
	
	var _delete3 = _interopRequireDefault(_delete2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var People = function (_React$Component) {
	    (0, _inherits3.default)(People, _React$Component);
	
	    function People(props) {
	        (0, _classCallCheck3.default)(this, People);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(People).call(this, props));
	    }
	
	    (0, _createClass3.default)(People, [{
	        key: 'patchGender',
	        value: function patchGender(person, gender) {
	            var _props = this.props;
	            var path = _props.path;
	            var server = _props.server;
	
	            server.put([].concat((0, _toConsumableArray3.default)(path), [person._id]), 'gender', gender);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'patch',
	        value: function patch(person, changes) {
	            var _props2 = this.props;
	            var path = _props2.path;
	            var server = _props2.server;
	
	            server.patch([].concat((0, _toConsumableArray3.default)(path), [person._id]), changes);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(person) {
	            var _props3 = this.props;
	            var path = _props3.path;
	            var server = _props3.server;
	
	            server.delete(path, person._id);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'click',
	        value: function click(person) {
	            this.props.navigate(person._id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var _props4 = this.props;
	            var server = _props4.server;
	            var path = _props4.path;
	            var image = server.images[path[1]];
	            var PeopleNodes = _reformat2.default.objectToArray(this.props.data).map(function (person, i) {
	                var face = person.face;
	                var GenderNodes = ['Female', 'Male'].map(function (gender) {
	                    return React.createElement(
	                        'option',
	                        {
	                            key: gender,
	                            value: gender
	                        },
	                        gender
	                    );
	                });
	                var delta = 200 / face[2];
	                return React.createElement(
	                    'div',
	                    { className: 'card', key: i, style: { margin: '1em' } },
	                    React.createElement('div', {
	                        style: {
	                            width: 200,
	                            height: face[3] * delta,
	                            backgroundPosition: -face[0] * delta + 'px ' + -face[1] * delta + 'px',
	                            backgroundImage: 'url(' + image.image_urls[0] + ')',
	                            backgroundSize: image.element.width * delta + 'px ' + image.element.height * delta + 'px'
	                        },
	                        onClick: _this2.click.bind(_this2, person)
	                    }),
	                    React.createElement(_delete3.default, { onClick: _this2.delete.bind(_this2, person) }),
	                    React.createElement(
	                        'select',
	                        {
	                            value: person.gender,
	                            onChange: function onChange(e) {
	                                return _this2.patchGender(person, e.target.value);
	                            }
	                        },
	                        GenderNodes
	                    )
	                );
	            });
	            return React.createElement(
	                'div',
	                null,
	                PeopleNodes
	            );
	        }
	    }]);
	    return People;
	}(React.Component);
	
	exports.default = People;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _reformat = __webpack_require__(123);
	
	var _reformat2 = _interopRequireDefault(_reformat);
	
	var _delete2 = __webpack_require__(139);
	
	var _delete3 = _interopRequireDefault(_delete2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Items = function (_React$Component) {
	    (0, _inherits3.default)(Items, _React$Component);
	
	    function Items(props) {
	        (0, _classCallCheck3.default)(this, Items);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Items).call(this, props));
	    }
	
	    (0, _createClass3.default)(Items, [{
	        key: 'delete',
	        value: function _delete(item) {
	            var _props = this.props;
	            var path = _props.path;
	            var server = _props.server;
	
	            server.delete(path, item.category);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'click',
	        value: function click(item) {
	            this.props.navigate(item.category);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var ItemNodes = _reformat2.default.objectToArray(this.props.data).map(function (item, i) {
	                return React.createElement(
	                    'li',
	                    { className: 'card', key: i },
	                    React.createElement(
	                        'a',
	                        { onClick: _this2.click.bind(_this2, item) },
	                        React.createElement(
	                            'span',
	                            null,
	                            item.category
	                        )
	                    ),
	                    React.createElement(_delete3.default, { onClick: _this2.delete.bind(_this2, item) })
	                );
	            });
	            return React.createElement(
	                'ul',
	                { className: 'items' },
	                ItemNodes
	            );
	        }
	    }]);
	    return Items;
	}(React.Component);
	
	exports.default = Items;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _keys = __webpack_require__(59);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Items = function (_React$Component) {
	    (0, _inherits3.default)(Items, _React$Component);
	
	    function Items(props) {
	        (0, _classCallCheck3.default)(this, Items);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Items).call(this, props));
	    }
	
	    (0, _createClass3.default)(Items, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(props) {
	            if (props.data.results) {
	                props.navigate('results');
	            }
	        }
	    }, {
	        key: "click",
	        value: function click(field) {
	            this.props.navigate(field);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            console.log(this.props);
	            var ItemNodes = (0, _keys2.default)(this.props.data).map(function (field, i) {
	                return React.createElement(
	                    "li",
	                    { className: "card", key: i },
	                    React.createElement(
	                        "a",
	                        { onClick: _this2.click.bind(_this2, field) },
	                        React.createElement(
	                            "span",
	                            null,
	                            field
	                        )
	                    )
	                );
	            });
	            return React.createElement(
	                "ul",
	                { className: "items" },
	                ItemNodes
	            );
	        }
	    }]);
	    return Items;
	}(React.Component);
	
	exports.default = Items;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _toConsumableArray2 = __webpack_require__(6);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _reformat = __webpack_require__(123);
	
	var _reformat2 = _interopRequireDefault(_reformat);
	
	var _assemblage = __webpack_require__(138);
	
	var _assemblage2 = _interopRequireDefault(_assemblage);
	
	var _delete2 = __webpack_require__(139);
	
	var _delete3 = _interopRequireDefault(_delete2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Results = function (_React$Component) {
	    (0, _inherits3.default)(Results, _React$Component);
	
	    function Results(props) {
	        (0, _classCallCheck3.default)(this, Results);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Results).call(this, props));
	    }
	
	    (0, _createClass3.default)(Results, [{
	        key: 'patch',
	        value: function patch(result, changes) {
	            var _props = this.props;
	            var path = _props.path;
	            var server = _props.server;
	
	            server.patch([].concat((0, _toConsumableArray3.default)(path), [result.id]), changes);
	        }
	    }, {
	        key: 'drop',
	        value: function drop(src) {
	            var data = _reformat2.default.objectToArray(this.props.data);
	            data.splice(0, src.length);
	            console.log(src.map(function (img) {
	                var images = img.images;
	                var clickUrl = img.clickUrl;
	                var id = img.id;
	
	                return {
	                    images: images,
	                    clickUrl: clickUrl,
	                    id: id
	                };
	            }).concat(data));
	            this.props.server.patch(this.props.path, src.map(function (img) {
	                var images = img.images;
	                var clickUrl = img.clickUrl;
	                var id = img.id;
	
	                return {
	                    images: images,
	                    clickUrl: clickUrl,
	                    id: id
	                };
	            }).concat(data));
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(result) {
	            var _props2 = this.props;
	            var path = _props2.path;
	            var server = _props2.server;
	
	            server.delete(path, result.id);
	            this.forceUpdate();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return React.createElement(_assemblage2.default, {
	                minWidth: 180,
	                margin: 32,
	                marginBottom: -32,
	                template: function template(ImageNode, image) {
	                    return React.createElement(
	                        'div',
	                        { className: 'card', style: { pointerEvents: 'none' } },
	                        ImageNode,
	                        React.createElement(_delete3.default, { onClick: _this2.delete.bind(_this2, image) })
	                    );
	                },
	                src: _reformat2.default.objectToArray(this.props.data).map(function (image) {
	                    image.src = image.images.XLarge;
	                    return image;
	                }),
	                draggable: 'true',
	                onDrop: this.drop.bind(this)
	            });
	        }
	    }]);
	    return Results;
	}(React.Component);
	
	exports.default = Results;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getPrototypeOf = __webpack_require__(95);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(98);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(115);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Items = function (_React$Component) {
	    (0, _inherits3.default)(Items, _React$Component);
	
	    function Items(props) {
	        (0, _classCallCheck3.default)(this, Items);
	        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Items).call(this, props));
	    }
	
	    (0, _createClass3.default)(Items, [{
	        key: "click",
	        value: function click(field) {
	            this.props.navigate(field);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this2 = this;
	
	            var ItemNodes = this.props.data.map(function (field, i) {
	                return React.createElement(
	                    "li",
	                    { className: "card", key: i },
	                    React.createElement(
	                        "a",
	                        { onClick: _this2.click.bind(_this2, field) },
	                        React.createElement(
	                            "span",
	                            null,
	                            field
	                        )
	                    )
	                );
	            });
	            return React.createElement(
	                "ul",
	                { className: "items" },
	                ItemNodes
	            );
	        }
	    }]);
	    return Items;
	}(React.Component);
	
	exports.default = Items;

/***/ }
/******/ ]);
//# sourceMappingURL=b_index.js.map