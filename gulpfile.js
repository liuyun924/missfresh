//引入模块
var gulp = require('gulp');
var sass = require('gulp-sass');  

//创建gulp任务
//这个不用手动调用，等其他任务监听时自动调用
gulp.task('getCss',function(){
	//获取所有scss文件
	gulp.src('src/sass/*.scss')

	//通过pipe 方法导入到 gulp 的插件中实现编译sass
	.pipe(sass({outputStyle:'compact'}).on('error',sass.logError))

	//将编译后的文件输出
	.pipe(gulp.dest('src/css'));
});

//创建监听任务
gulp.task('jianting',function(){
	gulp.watch('src/sass/*.scss',['getCss']);
});

//引入js压缩，文件重命名、合并,浏览器同步测试模块。
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

//合并，压缩旧JS，输出到最终上线的文件夹
gulp.task('compressJs',function(){
	gulp.src('src/js/*.js')

	.pipe(concat('page.js'))

	.pipe(gulp.dest('dist/js/'))

	.pipe(uglify({
		mangle:false,
		compress:false
	}))

	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest('dist/js/'))
});

gulp.task('server',function(){
	browserSync({
		//代理服务器
		// proxy:'http://localhost/missfresh',
		server: "./src",
		//自定义端口
		// port:3000,
		
		//监听文件修改，自动刷新浏览器
		//.是本目录的意思
		files:['./src/*.html','./src/html/*.html','./src/css/*.css','./src/js/*.js','./src/lib/*.js']
	});
	// 监听sass文件修改，执行编译sass文件
	// 这句代替了上文的jianting事件
	gulp.watch('src/sass/*.scss',['getCss']);
});
