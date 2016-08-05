// Criando as variáveis para a utilização das ferramentas.
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var server = require("gulp-live-server");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");

// Tarefa padrão.
gulp.task("default", ["browserify", "watch", "serve", "icons-fa", "icons-bootstrap"]);

// Tarefa watch
gulp.task("watch", function (){
    gulp.watch("app/**/*.js", ["browserify"]);
});

// Tarefa serve
gulp.task("serve", function (){
    var serve = server.static("./public", 8000);
    serve.start();
    gulp.watch("public/js/**/*.js", function (file){
        server.notify.apply(serve, [file]);
    });
    gulp.watch("public/**/*.html", function (file){
       server.notify.apply(serve, [file]);
    });
});

// Tarefa browerify
gulp.task("browserify", function (){
   return gulp.src(["app/app.js"])
       .pipe(browserify())
       .pipe(uglify())
       .pipe(rename("main.js"))
       .pipe(gulp.dest("public/js/"));
});

gulp.task('icons-bootstrap', function() {
    return gulp.src(["node_modules/bootstrap/fonts/**.*"])
        .pipe(gulp.dest("public/fonts"));
});

gulp.task('icons-fa', function() {
    return gulp.src(["node_modules/font-awesome/fonts/**.*"])
        .pipe(gulp.dest("public/fonts"));
});