const http = require('http');
const port = process.env.PORT || 3000;
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
    exec("./oidn/bin/oidnDenoise", (error, stdout, stderr) => {
        if (error) {
            res.statusCode = 500;
            res.end(`error: ${error.message}` + `stdout: ${stdout}` + `stderr: ${stderr}`);
            return;
        }

        if (stderr) {
            res.statusCode = 500;
            res.end(`stderr: ${stderr}` + `stdout: ${stdout}` + `error: ${error.message}`);
            return;
        }

        res.statusCode = 200;
        //res.setHeader('Content-Type', 'text/plain');
        res.end(`stdout: ${stdout}`);
    });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});