var server = require('../tasks/serve.js'),
    base_url = "http://localhost:9000/"
    task_url = "http://localhost:9000/task/_serve_selftest";
    task_url_fail = "http://localhost:9000/task/fail_serve_selftest"

const { createFetch, createStack, enableRecv, header, base, parse } = require('http-client');

describe('Server', function(){
    var options_right= {
        headers : {
            'webtoken' : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDc4ODYwMzksImV4cCI6MTgyMzQ2MjAzOX0.O0EMM8TS5o1JlKugBbbh_TYRNACjo_h7NGGRr3nhaRFGV5hfmBBgxmz56B3qBWcIgExaRudI7Q1rxgIyuXTTVCk0IOBZFfTG-lx8Ju0bR9rqZy07HEHVfdp1zODItif0KbVBRoG0DOCEvLS7k1ntqGSyrNQZIKTHyiceUZfVW5V46HMqcuCxcLavyGEad8zAXlkPICQlrIYcxo9i0meS6HBRVVmrfUS4TpvIdr-ko9zDCjQSO0sZzq4hIXcsL-5Es2m4eBdMmqCQNDHsXgLBtCgyizbsULMOQDU7-Y-E_s-TNJTXzxhz_M6Y030d22Ren2nA8-HmEuR2WYbA_mS2YA'            
        }
    }   
    var options_wrong= {
        headers : {
            'webtoken' : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MDc4ODU5ODMsImV4cCI6MTUwNzkyMTk4M30.CDOIRwKGJJleZSXGCfo3bMkUZ4FgoZguBUF9IQGHNNrYUVPP4Y6d7U8knBdsrGpjRDpfXgfRSkJ7l8qT-nDX_NrIbxBYKYL6xbZNRcOZEJwaFItHYn0HW1Tcixkn8iIhFxsw7AyH6XFl0TTLcTPvSsnA7mEma9AHJ8bcvFbJcgjsUrf_AYx4KiCxmGgeaT-AIa3Q2T-2jiy45G2AyyON5rqBjeQp7Id2lwqL6tHCN47icVYWGJUi8VnB0XKpULrsEaZ_ZmbGNQqd6vGpbwOS0ZeTsNSJBcahhg4YfiOviOddM08211bom2qlZVETzEs-5YH3s4JvBVv3lWnhi_-4pQ'            
        }
    }  
    describe('GET / return status code', function(){
        it("401 because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("401 because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url, options_wrong).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("200 because it is an authorized request and the url exists", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(base_url),
                parse('json')
            );
            fetch(base_url, options_right).then(function(response){
                expect(response.status).toBe(200);
                done();
            });
        }); 
    });
    describe('GET task/_serve_selftest  return status code', function(){
        it("401 because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            fetch(task_url).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("401 because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url, options_wrong).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("200 because it is an authorized request and the task exists", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url, options_right).then(function(response){
                expect(response.status).toBe(200);
                done();
            });
        });
    });
    describe('GET task/fail_serve_selftest  return status code', function(){
        it("401 because it is an unauthorized request without Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("401 because it is an unauthorized request with wrong Webtoken", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail, options_wrong).then(function(response){
                expect(response.status).toBe(401);
                done();
            });
        });
        it("500 because the task do not exist", function(done){
            const fetch = enableRecv(
                require('node-fetch')
            );
            const stack = createStack(
                base(task_url),
                parse('json')
            );
            fetch(task_url_fail, options_right).then(function(response){
                expect(response.status).toBe(500);
                done();
            });
        });
    });
});