const { error } = require('console');
const fs = require('fs');

function read_json_file(file_name) {
   fs.readFile(file_name, 'utf8', (err, data) => {
        if (err) {
             console.log("error is:"+err);
             return;
        }
        console.log(data);
     });

}

read_json_file("file_path");