/************************* gulp 4.x ********************************

https://nodejs.org/ko/download/

npm install gulp-cli -g
npm install gulp -g
npm install gulp --save-dev

npm install gulp-concat --save-dev                    // 파일 병합
npm install gulp-uglify --save-dev                    // 주석제거 / min처리
npm install node-sass gulp-sass --save-dev            // Sass
npm install gulp-autoprefixer --save-dev              // webkit 처리
npm install gulp-file-include --save-dev              // HTML Include
npm install gulp-pretty-html --save-dev               // Html 정리
npm install browser-sync --save-dev                   // 브라우져 동기화
npm install gulp del --save-dev                       // 초기화
npm install gulp-count --save-dev                     // 변경된 파일 갯수 확인
npm install gulp-file-cache                           // 변경된 파일만 변경
npm install gulp-wait --save-dev

**************************************************************/
var gulp = require('gulp')
  , concat = require('gulp-concat')
  , fileinclude = require('gulp-file-include')
  , prettyHtml = require('gulp-pretty-html')
  , sass = require('gulp-sass')
  , sourcemaps = require('gulp-sourcemaps')
  , autoprefixer = require('gulp-autoprefixer')
  , minJs = require('gulp-uglify')
  , server = require('browser-sync').create()
  , clean = require('del')
  , count = require('gulp-count')
  , FileCache = require('gulp-file-cache')
  , fileCache = new FileCache()
  , wait = require('gulp-wait');

var paths = {
  srcIncluder : './src/include',
  srcHtml : ['./src/**/*.html', '!./src/include/**/*.*'],
  srcSass : ['./src/css/**/*.*'],
  srcJs : ['./src/js/**/*.*'],
  srcImg : ['./src/images/**/*.*'],
  srcFont : ['./src/font/**/*.*'],
  srcGuide : ['./src/guide/**/*.html'],
  srcGuideEtc : ['./src/guide/**/*.*', '!./src/guide/**/*.html'],

  distHtml : './dist/',
  distCss : './dist/css/',
  distJs : './dist/js/',
  distImg : './dist/images/',
  distFont : './dist/font/',
  distGuide : './dist/guide/',

  // watch
  watchIndex : './htmlList.html',
  watchHtml : './src/**/*.html',
  watchInclude : './src/include/*.html',
  watchJs : './src/js/**/*.*',
  watchScss : './src/css/**/*.*',
  watchCss : './src/css/**/*.*',
  watchImg : './src/images/**/*.*',
  watchGuide : './src/guide/**/*.html',
  watchGuideEtc : ['./src/guide/**/*.*', '!./src/guide/**/*.html'],

  // clean
  cleanAll : './dist/**/*.*'

}

function cleanFile(done){
  console.log('clean file');
  clean(paths.cleanAll);
  done();
}

function firstHtmlBuild(done){
  gulp.src(paths.srcHtml)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.srcIncluder
    }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(paths.distHtml))
    .pipe(count('<%= counter %> Change files'));
  done();
}

function htmlBuild(done){
  gulp.src(paths.srcHtml)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.srcIncluder
    }))
    .pipe(fileCache.filter())
    .pipe(fileCache.cache())
    .pipe(prettyHtml())
    .pipe(gulp.dest(paths.distHtml))
    .pipe(count('<%= counter %> Change files'));
  done();
}

function htmlInclude(done){
  gulp.src(paths.srcHtml)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.srcIncluder
    }))
    .pipe(prettyHtml())
    .pipe(gulp.dest(paths.distHtml))
  done();
}

function scssBuild(done){
  gulp.src(paths.srcSass)
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
	.pipe(wait(200))
  .pipe(autoprefixer())
	.pipe(gulp.dest(paths.distCss));
  done();
}

function jsBuild(done){
  gulp.src(paths.srcJs)
	.pipe(wait(200))
    .pipe(gulp.dest(paths.distJs));
  done();
}

function imageBuild(done){
  gulp.src(paths.srcImg)
    .pipe(gulp.dest(paths.distImg));
  done();
}

function guide(done){
  gulp.src(paths.srcGuide)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.srcIncluder
    }))
    .pipe(gulp.dest(paths.distGuide))
  done();
}

function guideEtc(done){
  gulp.src(paths.srcGuideEtc)
    .pipe(gulp.dest(paths.distGuide))
  done();
  console.log('clean');
}

function fontBuild(done){
  gulp.src(paths.srcFont)
    .pipe(gulp.dest(paths.distFont))
  done();
}

function watchFile(done){
  gulp.watch(paths.watchIndex, gulp.series(reload));
  gulp.watch(paths.watchHtml, gulp.series(htmlBuild, gulp.parallel(reload)));
  gulp.watch(paths.watchInclude, gulp.series(htmlInclude, gulp.parallel(reload)));
  gulp.watch(paths.watchScss, gulp.series(scssBuild, gulp.parallel(reload)));
  gulp.watch(paths.watchJs, gulp.series(jsBuild, gulp.parallel(reload)));
  gulp.watch(paths.watchImg, gulp.series(imageBuild, gulp.parallel(reload)));
  gulp.watch(paths.watchGuide, gulp.series(guide, gulp.parallel(reload)));
  gulp.watch(paths.watchGuideEtc, gulp.series(guideEtc, gulp.parallel(reload)));
  done();
}

function reload(done){
  setTimeout(function(){
    server.reload();
  },1000);
  done();
}

function serve(done){
	server.init({
		port : 2222,
		server : {
			baseDir : 'dist/',
			index : "htmlList.html"
		}
	});
	done();
}

gulp.task('default', gulp.series(cleanFile, gulp.parallel(firstHtmlBuild, scssBuild, jsBuild, guide, guideEtc, imageBuild, fontBuild), serve, watchFile));