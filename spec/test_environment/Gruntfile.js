module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-serve');
    
    grunt.initConfig({
        serve: {
            options: {
                port: 9000,
                keypath: './assist/public.pem',
            }
        },
        _serve_selfupdate: {
            options: {
                localrepo: 'halloEcho',
                link: 'halloWelt'
            }
        }
    });
};