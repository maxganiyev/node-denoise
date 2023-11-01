const http = require('http');
const port = process.env.PORT || 3000;
const { exec } = require("child_process");
var formidable = require('formidable');

const server = http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          res.write(files.filetoupload.filepath);

        //   exec("./oidn/bin/oidnDenoise --hdr ./oidn/img/noise.pfm -o ./oidn/img/denoise.pfm", (error, stdout, stderr) => {
        //     if (error) {
        //         res.statusCode = 500;
        //         res.end(`error: ${error.message}` + `stdout: ${stdout}` + `stderr: ${stderr}`);
        //         return;
        //     }
    
        //     if (stderr) {
        //         res.statusCode = 500;
        //         res.end(`stderr: ${stderr}` + `stdout: ${stdout}` + `error: ${error.message}`);
        //         return;
        //     }
    
        //     res.statusCode = 200;
        //     //res.setHeader('Content-Type', 'text/plain');
        //     res.end(`stdout: ${stdout}`);
        // });

          res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
    
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});