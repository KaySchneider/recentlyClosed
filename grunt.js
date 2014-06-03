module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                separator: ';'
            },
            popup: {
                // concat task "foo" target options and files go here.
                src: [
                     'lib/angular.min.js',
                     'lib/ng-infinite-scroll.min.js',
                     'lib/angular-ui-router.js',
                     'app/popup/controller/closedCtrl.js',
                     'app/popup/controller/appCtrl.js',
                     'app/popup/services/history.js',
                     'app/popup/services/bgMessage.js',
                     'app/popup/services/topSites.js',
                     'app/popup/directive/topSitesDirective.js',
                     'app/popup/directive/tabbed_menu.js',
                     'app/popup/directive/scroller.js',
                     'app/popup/directive/history-view.js',
                     'app/popup/directive/recently-closed.js',
                     'app/popup/directive/base-url.js',
                     'app/popup/app.js'
                    ],
                dest: 'package/js/app-<%= pkg.version %>.js'
            }
        },
        copy: {
            popup: {
                nonull: true,
                files: [
                    // includes files within path
                    {expand: true, src: ['*'], dest: 'package/css/', cwd: 'app/css/'},
                    {expand: true, src: ['*'], dest: 'package/fonts/', cwd: 'package/fonts/'},
                    {expand: true, src: ['*'], dest: 'package/js/', cwd: 'app/js/'},
                    // includes files within path and its sub-directories
                    {expand: true, src: ['*'], dest: 'package/icons/', cwd: 'icons/'},

                    {expand: true, src: ['*'], dest: 'package/app/popup/templates/', cwd: 'app/popup/templates/'},

                    {expand: true, src: ['manifest.json'], dest: 'package/'},
                    {expand: true, src: ['_locales/**'], dest: 'package/'}
                ]
            },
            html: {
              nonull:true,
              options: {
                  process: function (content, srcpath) {
                      return content.replace(/appjsfile/, '../js/app-0.1.0.min.js');
                  }
              },
              files: [
                  {expand: true, src: ['*'], dest: 'package/src/', cwd: 'src/'},
              ]
            }
        },
        uglify: {
            app: {
                files: {
                    'package/js/app-<%= pkg.version %>.min.js': ['package/js/app-<%= pkg.version %>.js']
                }
            },
            eventpage: {
                files: {
                    'package/js/eventPage.min.js': ['package/js/eventPage.js']
                }
            }
        },
       clean: {
            js: ["package/js/*.js", "!package/js/*.min.js"]
       }

    });
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ["copy","concat", "uglify", "clean"]);
};
