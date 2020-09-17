var gulp = require("gulp"),
	del = require("del"),
	autoprefixer = require("gulp-autoprefixer"),
	browserSync = require("browser-sync").create(),
	sass = require("gulp-sass"),
	csscomb = require("gulp-csscomb");

function clean() {
	del(["./style.css"]);
	console.log("clean");
}

function style() {
	return gulp
		.src("./sass/style.scss")
		.pipe(csscomb())
		.pipe(sass({
			outputStyle: "compressed"
		}))
		.pipe(
			autoprefixer({
				cascade: false
			})
		)
		.pipe(gulp.dest("./"))
		.pipe(browserSync.stream());
}

function watch() {
	gulp.watch("./sass/**/*.scss", style);
}

// Static server
function bs() {
	var files = ["./sass/*.scss", "./*.php"];

	browserSync.init(files, {
		proxy: "http://127.0.0.1/rhino/"
	});
	style();
	watch();
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(bs, gulp.parallel(style, watch));

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.bs = bs;
exports.style = style;
exports.watch = watch;
exports.build = build;
exports.style = style;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
