(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('proptypes'), require('babel-runtime/core-js/object/define-property')) :
    typeof define === 'function' && define.amd ? define(['exports', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'proptypes', 'babel-runtime/core-js/object/define-property'], factory) :
    (factory((global.module = global.module || {}),global._Object$getPrototypeOf,global._classCallCheck,global._createClass,global._possibleConstructorReturn,global._inherits,global.React,global.PropTypes,global._Object$defineProperty));
}(this, (function (exports,_Object$getPrototypeOf,_classCallCheck,_createClass,_possibleConstructorReturn,_inherits,React,PropTypes,_Object$defineProperty) { 'use strict';

_Object$getPrototypeOf = 'default' in _Object$getPrototypeOf ? _Object$getPrototypeOf['default'] : _Object$getPrototypeOf;
_classCallCheck = 'default' in _classCallCheck ? _classCallCheck['default'] : _classCallCheck;
_createClass = 'default' in _createClass ? _createClass['default'] : _createClass;
_possibleConstructorReturn = 'default' in _possibleConstructorReturn ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
_inherits = 'default' in _inherits ? _inherits['default'] : _inherits;
React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
_Object$defineProperty = 'default' in _Object$defineProperty ? _Object$defineProperty['default'] : _Object$defineProperty;

var proxy = {
    update: function update() {
        console.log('error...');
    }
};

var Provider = function (_React$Component) {
    _inherits(Provider, _React$Component);

    function Provider(props) {
        _classCallCheck(this, Provider);

        return _possibleConstructorReturn(this, (Provider.__proto__ || _Object$getPrototypeOf(Provider)).call(this));
    }

    _createClass(Provider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { proxy: proxy };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            Object.defineProperty(proxy, 'update', {
                value: function () {
                    this.forceUpdate();
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.Children.only(this.props.children);
        }
    }]);

    return Provider;
}(React.Component);

Provider.childContextTypes = {
    proxy: PropTypes.object.isRequired
};

var Computed = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    // decorator has no arguments
    if (args.length === 3 && typeof args[2].value === 'function') {
        return handle.apply(undefined, args);
    } else {
        return function () {
            return handle.apply(undefined, Array.prototype.slice.call(arguments).concat([args]));
        };
    }
};

function bind(fn, context) {
    if (fn.bind) {
        return fn.bind(context);
    } else {
        return function __autobind__() {
            return fn.apply(context, arguments);
        };
    }
}

function handle(target, key, _ref, _args) {
    var _fn = _ref.value,
        configurable = _ref.configurable,
        enumerable = _ref.enumerable;

    return {
        configurable: configurable,
        enumerable: enumerable,

        get: function get() {
            var fn = function fn() {
                _fn.apply(this, arguments);
                proxy.update();

                // if decorator's arguments is a function, replace autorun
                if (_args[0] && typeof _args[0] === 'function') {
                    _args[0].apply(this, arguments);
                }
            };

            var boundFn = bind(fn, this);

            _Object$defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: false,
                value: boundFn
            });

            return boundFn;
        }
    };
}

exports.Provider = Provider;
exports.Computed = Computed;

Object.defineProperty(exports, '__esModule', { value: true });

})));
