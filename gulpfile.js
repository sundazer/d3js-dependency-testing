const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const tsPipeline = require('gulp-webpack-typescript-pipeline');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
    .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

tsPipeline.registerBuildGulpTasks(
    gulp,
    {
        entryPoints: {
            'graph': __dirname + '/views/graph.ts'
        },
        outputDir: __dirname + '/dist/views'
    }
)

gulp.task('watch', ['clean, scripts', 'tsPipeline:build:dev'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('clean', () => {
    return del('dist/**', { force: true });
});

gulp.task('default', ['watch']);
gulp.task('build', ['clean', 'scripts', 'tsPipeline:build:dev']);
