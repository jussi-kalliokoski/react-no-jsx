"use strict";

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var jscs = require("gulp-jscs");
var istanbul = require("gulp-istanbul");
var mocha = require("gulp-mocha");

var files = [
    "./compile.js",
    "./mixin.js",
];

var configFiles = [
    "./gulpfile.js",
    "./test/**/*.js",
];

gulp.task("jscs", function () {
    return gulp.src(files.concat(configFiles))
        .pipe(jscs("./.jscs.json"));
});

gulp.task("jshint", function () {
    return gulp.src(files.concat(configFiles))
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("mocha", function (callback) {
    gulp.src(files)
        .pipe(istanbul())
        .on("finish", function () {
            gulp.src(["test/_init.js", "test/**/*Spec.js"])
                .pipe(mocha({ reporter: "spec" }))
                .pipe(istanbul.writeReports({ dir: "./coverage" }))
                .on("end", callback);
        });
});

gulp.task("test", ["jshint", "jscs", "mocha"]);
