"use strict";

var React = require("react");
var noJsxMixin = require("../mixin");

var TestSubComponent = React.createClass({
    mixins: [noJsxMixin],

    renderTree: function () {
        return ["li", { className: "list__item" },
            this.props.text,
            " ",
            ["a", { href: "#open" }, "open"],
        ];
    },
});

var TestComponent = React.createClass({
    mixins: [noJsxMixin],

    renderList: function () {
        return ["foo", 5, "meow"].map(function (value) {
            return [TestSubComponent, { key: value, text: value },
            ];
        });
    },

    renderTree: function () {
        return ["ul", { className: "list" },
            this.renderList(),
            [],
            null,
        ];
    },
});

describe("no-jsx mixin", function () {
    var result;
    beforeEach(function () {
        result = React.renderToStaticMarkup(React.createElement(TestComponent, {}));
    });

    it("should convert the items returned by renderTree() to React elements", function () {
        result.should.equal("<ul class=\"list\">" +
            "<li class=\"list__item\">foo <a href=\"#open\">open</a></li>" +
            "<li class=\"list__item\">5 <a href=\"#open\">open</a></li>" +
            "<li class=\"list__item\">meow <a href=\"#open\">open</a></li>" +
        "</ul>");
    });
});
