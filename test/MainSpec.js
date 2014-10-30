"use strict";

describe("no-jsx", function () {
    var noJsx = require("../index");

    it("should export library functions", function () {
        noJsx.should.have.property("compile");
        noJsx.should.have.property("mixin");
    });
});
