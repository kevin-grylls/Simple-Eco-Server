var exec = require('child_process').exec
, sys = require('sys')
, http = require('http')
, child
, jsonBody;

var script = "iwconfig wlan0 | grep Link | awk '{$1=$1;print}'";

http.createServer(function(request, response) {
    child = exec(script, function(error, stdout, stderr) {
        if(error !== null) {
            console.log('command error : ', error);
        };

        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(stdout.toString());
        response.end();
        
    });
}).listen(7070);
sys.puts("Server Running : port : 7070");