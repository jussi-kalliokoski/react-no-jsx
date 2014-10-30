"use strict";

var React = require("react");

function compileChildren (children) {
    return children.map(function (child) {
        if ( Array.isArray(child) ) {
            if ( child.length === 0 ) {
                return child;
            } else if ( Array.isArray(child[0]) ) {
                return child.map(compile);
            } else {
                return compile(child);
            }
        }

        return child;
    });
}

function compile (item) {
    var type = item[0];
    var props = item[1];
    var children = compileChildren(item.slice(2));

    return React.createElement.apply(React, [type, props].concat(children));
}

module.exports = compile;
