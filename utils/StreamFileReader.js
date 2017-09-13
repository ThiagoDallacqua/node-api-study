var fs = require('fs');

class StreamFileReader {
  upload(file){
    fs.createReadStream(file)
      .pipe(fs.createWriteStream('stream-image.jpg'))
      .on('finish', function() {
        console.log('arquivo escrito com stream');
      });
  }
}

module.exports = function() {
  return StreamFileReader
}
