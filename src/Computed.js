import proxy from './proxy';

export default function(...args) {
    // decorator has no arguments
    if (args.length === 3 && typeof args[2].value === 'function') {
        return handle(...args);
    } else {
        return function() {
            return handle(...arguments, args);
        };
    }
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
            let fn = function() {
                _fn.apply(this, arguments);
                proxy.update();

                // if decorator's arguments is a function, replace autorun
                if (_args && _args[0] && typeof _args[0] === 'function') {
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