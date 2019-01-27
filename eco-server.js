const http = require('http')
, exec = require('child_process').exec
, sys = require('sys');
let child;

http.createServer((request, response) => {

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    
    response.on('error', (err) => {
        console.error(err);
    });

    if(request.method === 'GET') {

        const script = "iwconfig wlan0 | grep Link | awk '{$1=$1;print}'";

        child = exec(script, function(error, stdout, stderr) {
            if(error !== null) {
                console.log('command error : ', error);
            };

            let linkQuality = stdout.split('Signal')[0];
            linkQuality = linkQuality.split('=')[1];
            let signalLevel = stdout.split('Signal')[1];
            signalLevel = signalLevel.split('=')[1];
            let jsonResponse = JSON.stringify({ quality: linkQuality, level: signalLevel });
            response.end(jsonResponse);
            
        });

    } else {

        response.statusCode = 404;
        response.end();

    }
}).listen(7070);