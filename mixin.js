"use strict";

var compile = require("./compile");

module.exports = {
    render: function () {
        return compile(this.renderTree.apply(this, arguments));
    },
};
