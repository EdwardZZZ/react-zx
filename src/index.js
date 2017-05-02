import React, { Component } from 'react';
import PropTypes from 'prop-types'

let proxy = {
    update() { }
};

export class Provider extends Component {
    constructor(props) {
        super();
    }

    getChildContext() {
        return { proxy };
    }

    componentDidMount() {
        Object.defineProperty(proxy, 'update', {
            value: function () {
                this.forceUpdate();
            }.bind(this)
        });
    }

    render() {
        return React.Children.only(this.props.children)
    }
}

Provider.childContextTypes = {
    proxy: PropTypes.object.isRequired,
}

export const Computed = function (...args) {
    // decorator has no arguments
    if (args.length === 3 && typeof args[2].value === 'function') {
        return handle(...args);
    } else {
        return function () {
            return handle(...arguments, args);
        };
    }

    function bind(fn, context) {
        if (fn.bind) {
            return fn.bind(context);
        } else {
            return function __autobind__() {
                return fn.apply(context, arguments);
            };
        }
    }

    function handle(target, key, { value: _fn, configurable, enumerable }, _args) {
        return {
            configurable,
            enumerable,

            get() {
                let fn = function () {
                    _fn.apply(this, arguments);
                    proxy.update();

                    // if decorator's arguments is a function, replace autorun
                    if(_args[0] && typeof _args[0] === 'function'){
                        _args[0].apply(this, arguments);
                    }
                }

                const boundFn = bind(fn, this);

                Object.defineProperty(this, key, {
                    configurable: true,
                    writable: true,
                    enumerable: false,
                    value: boundFn
                });

                return boundFn;
            },
        };
    }
}