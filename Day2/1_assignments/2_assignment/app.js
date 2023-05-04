// Read and Return the file based on the URL
// Or return file not found if the url does not match a filename

// localhost:3000/1 - Read and Return 1.pdf
// localhost:3000/2 - Read and Return 2.pdf

const http = require('http');
const fs = require('fs');
const path = require('path');

var server = http.createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
        // const filepath = `${__dirname}${req.url}.pdf`;

        // const currentDir = process.cwd();
        // const filepath = path.join(currentDir, url + '.pdf');
        
        const filepath = path.join(__dirname, req.url + '.pdf');

        const readStream = fs.createReadStream(filepath);

        res.setHeader("content-type", "application/pdf");

        // readStream.pipe(res);

        readStream.on('data', (chunk) => {
            res.write(chunk);
        });

        readStream.on('end', (chunk) => {
            res.end();
        });

        readStream.on('error', (err) => {
            res.setHeader("content-type", "text.plain");
            res.statusCode = 404;
            res.end("File Not Found....");
        });
    }
});

server.listen(3000);

function onError(err) {
    console.log(err);
}

function onListening() {
    var address = server.address();
    console.log("Server started on port: ", address.port);
}

server.on('error', onError);
server.on('listening', onListening);