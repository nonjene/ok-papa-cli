import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import "./main.scss";

import Example1 from "./mod_example";

/**
 * test:
 *  css module
 *  spread
 *  es6
 *  Object.asgin
 *
 */

ReactDOM.render((

    <div className="global-main">
        <div className="global-css">xxx</div>
        <Example1 prop2="点我"/>
    </div>


), document.getElementById('container'));