# react-no-jsx

[![Build Status](https://travis-ci.org/jussi-kalliokoski/react-no-jsx.svg?branch=master)](https://travis-ci.org/jussi-kalliokoski/react-no-jsx)
[![Coverage Status](https://img.shields.io/coveralls/jussi-kalliokoski/react-no-jsx.svg)](https://coveralls.io/r/jussi-kalliokoski/react-no-jsx)

react-no-jsx is a pure JS DSL to be used instead of JSX. It allows you to define your virtual DOM trees using a square bracket based syntax. See the Motivation section for more information on why.

## Installation

You can install `react-no-jsx` via npm:

```sh
npm install --save react-no-jsx
```

## Usage

react-no-jsx provides a mixin that converts your `renderTree` method into a proper React render method. For example:

```js
var React = require("react");
var noJsxMixin = require("react-no-jsx/mixin");

var items = [{
    id: "foo",
    name: "Very nice item",
}, {
    id: "bar",
    name: "Another nice item",
}];

var ListItem = React.createClass({
    displayName: "ListItem",
    mixins: [noJsxMixin],

    renderTree: function () {
        return ["li", { className: "ListItem" },
            ["a", { href: "/items/" + this.props.item.id },
                this.props.item.name,
            ],
        ];
    },
});

var List = React.createClass({
    displayName: "List",
    mixins: [noJsxMixin],

    renderList: function () {
        return this.props.items.map(function (item) {
            return [ListItem, { item: item, key: item.id }];
        });
    },

    renderTree: function () {
        return ["ul", { className: "List" },
            this.renderList(),
        ];
    },
});

React.render(document.body, React.createElement(List, { items: items }));
```

The same example written in JSX:

```js
var React = require("react");

var items = [{
    id: "foo",
    name: "Very nice item",
}, {
    id: "bar",
    name: "Another nice item",
}];

var ListItem = React.createClass({
    render: function () {
        return (
            <li className="ListItem">
                <a href={ "/items/" + this.props.item.id }>
                    this.props.item.name
                </a>
            </li>
        );
    },
});

var List = React.createClass({
    renderList: function () {
        return this.props.items.map(function (item) {
            return <ListItem item={item} key={item.id} />;
        });
    },

    render: function () {
        return (
            <ul className="List">
                this.renderList()
            </ul>
        );
    },
});

React.render(document.body, <List items={items}>);
```

Or pure JS:

```js
var React = require("react");

var items = [{
    id: "foo",
    name: "Very nice item",
}, {
    id: "bar",
    name: "Another nice item",
}];

var ListItem = React.createClass({
    displayName: "ListItem",

    render: function () {
        return React.createElement("li", { className: "ListItem" },
            React.createElement("a", { href: "/items/" + this.props.item.id },
                this.props.item.name
            )
        );
    },
});

var List = React.createClass({
    displayName: "List",

    renderList: function () {
        return this.props.items.map(function (item) {
            return React.createElement(ListItem, { item: item, key: item.id });
        });
    },

    render: function () {
        return React.createElement("ul", { className: "List" },
            this.renderList()
        );
    },
});

React.render(document.body, React.createElement(List, { items: items }));
```

You can also directly compile a react-no-jsx literal into a virtual DOM tree:

```js
var compile = require("react-no-jsx/compile");
var element = ["div", { className: "foo" },
    "bar",
];

React.render(document.body, compile(element));
```

## Motivation

I see JSX as the biggest issue of React going forward. There are multiple reasons for this:

* A transpiled DSL is the single most frequent comment I hear putting off people new to React.
* Especially because it's based on XML (some people really don't like the ceremony).
* JS already has a data literal type with templating, no need to add an XML-based syntax on top.
* Compilation step. There are multiple issues with this:
  - People generally already have existing tool chains they like using, and fitting them together with JSX will probably be a pain.
  - Breaks your existing code validation tools like JSHint and JSCS by generating code whose style you have little control over.
  - Requires extensive setup for quick prototyping in greenfield.
  - While the compiler errors are generally good, most tools I've used **with** the compiler make the errors useless (see point about fitting things together).
  - There's the code you wrote and the code the compiler wrote, and it may or may not be the same thing.
* The generated code is not very minifier-friendly, especially in larger projects (gzipping makes this a pretty small issue though).

Issues with not using JSX:

* Horrible amounts of hard-to-read boilerplate to write.
* The syntax is unfamiliar to entry-level programmers used to doing HTML and CSS, making it harder for example for designers with basic web development skills to make changes.

react-no-jsx is an attempt at solving at least some of these issues, and if there's potential to it and it solves problems for people, maybe someday it will be adopted to core to be used instead of the `React.createElement()` boilerplate. :) Let me know what you think!

## Contributing

Contributions are most welcome! If you're having problems and don't know why, search the issues to see if someone's had the same issue. If not, file a new issue so we can solve it together and leave the solution visible to others facing the same problem as well. If you find bugs, file an issue, preferably with good reproduction steps. If you want to be totally awesome, you can make a PR to go with your issue, containing a new test case that fails currently!

### Development

Development is pretty straightforward, it's all JS and the standard node stuff works:

To install dependencies:

```sh
npm install
```

To run the tests:

```sh
npm test
```

Then just make your awesome feature and a PR for it. Don't forget to file an issue first, or start with an empty PR so others can see what you're doing and discuss it so there's a a minimal amount of wasted effort.

Do note that the test coverage is currently a whopping 100%. Let's keep it that way! Remember: if it's not in the requirements specification (i.e. the tests), it's not needed, and thus unnecessary bloat.
