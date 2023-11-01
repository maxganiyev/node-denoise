const http = require('http');
const port = process.env.PORT || 3000;
const { exec } = require("child_process");
var formidable = require('formidable');
var fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var path = files.filetoupload[0].filepath;
            fs.rename(path, path + ".pfm", function (err) {

                exec("./oidn/bin/oidnDenoise --hdr " + path + ".pfm -o ./oidn/img/denoise.pfm", (error, stdout, stderr) => {
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
                    res.write('File denoised!');
                    res.end();
                });
            });
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