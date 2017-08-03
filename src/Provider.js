import React from 'react';
import PropTypes from 'prop-types';

import proxy from './proxy';

export default class Provider extends React.Component {
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