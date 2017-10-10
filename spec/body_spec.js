var server = require('../tasks/serve.js'),
base_url = "http://localhost:9000/"
task_url = "http://localhost:9000/task/_serve_selftest";
task_url_fail = "http://localhost:9000/task/fail_serve_selftest"

const { createFetch, createStack, enableRecv, header, base, parse } = require('http-client');

describe('Server', function(){
    var options_right= {
        headers : {
            'webtoken' : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDc2MzUyMjQsImV4cCI6MTUwNzY3MTIyNH0.HjgVaped1dsiRLHGxRnemlOIbvUx4gLrsoO6euvKVmp3fN4fmOU2uH4sSfBWPftGxP6B9zed8mssTdEQjdipxnEHOm6AL3ywfVAPvUuTEoN3JrJJFK4c1omJJf6cYx1U7XGPYfBKpyDxAZguYIsTGSDp5xDHE0mbOtf4TVub34aa7SKbYF9Ra1B_MBI4kz661sfEjMVusIk-LMOuZ3_3M8TKX2d3RgUXaU0s41zmfjCrLgzc0d-jHsZQAukoicC1N9kLYpTkVYCwmr7nzpkidpoOb5Jl3Abiy9JTJHfh2lUPCcQ9oH1M2o2G2-_q-QwtP2DsFngWW5jvQQNBcaKY8w'            
        }
    }
    var options_wrong= {
        headers : {
            'webtoken' : 'false'            
        }
    } 
    var json_OK = JSON.stringify({
		statusCode : 200,
        text: {info: 'OK'}
    })
    var json_ERROR = JSON.stringify({
		statusCode : 500,
        text: {info: 'Error'}
    })
    var json_UNAUTH = JSON.stringify({
		statusCode : 401,
        text: {info: 'unauthorized'}
	})
    describe('GET / return body', function(){
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url, options_wrong).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 200 and info 'OK' because it is an authorized request and the url exists", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url, options_right).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_OK);
                done();
            });
        }); 
    });
    describe('GET task/_serve_selftest  return body', function(){
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url, options_wrong).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 200 and info 'OK' because it is an authorized request and the task exists", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url, options_right).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_OK);
                done();
            });
        });
    });
    describe('GET task/fail_serve_selftest  return body', function(){
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 401 and info 'unauthorized' because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail, options_wrong).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_UNAUTH);
                done();
            });
        });
        it("statusCode: 500 and info 'Error' because the task do not exist", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail, options_right).then(function(response){
                return response.json();
            }).then(function(json) {
                expect(JSON.stringify(json)).toBe(json_ERROR);
                done();
            });
        });
    });
});