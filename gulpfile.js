const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const tsPipeline = require('gulp-webpack-typescript-pipeline');
const nodemon = require('nodemon');

const tsProject = ts.createProject('tsconfig.json');

tsPipeline.registerBuildGulpTasks(
    gulp,
    {
        entryPoints: {
            'graph': __dirname + '/views/graph.ts'
        },
        outputDir: __dirname + '/dist/views'
    }
)

gulp.task('watch', ['clean', 'tsPipeline:build:dev', 'serve'], () => {
    gulp.watch('views/**/*.ts', ['tsPipeline:watch']);
});

gulp.task('serve', () => {
    return nodemon({
        watch: "src",
        ext: "ts",
        exec: "ts-node ./src/index.ts"
    })
    .on('restart', () => {
        console.log('Server restarted');
    });
});

gulp.task('clean', () => {
    return del('dist/**', { force: true });
});

gulp.task('default', ['watch']);
gulp.task('build', ['clean', 'tsPipeline:build:dev']);
