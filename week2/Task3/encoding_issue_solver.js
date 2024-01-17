const iconv = require('iconv-lite');

const original_data = "whatsup 你好";

//at front end:
var data_sent = iconv.encode(original_data, 'gbk');
console.log(iconv.decode(data_sent, 'gbk'));

//at backend
const corrupted_data_received = iconv.decode(data_sent, 'utf8');
console.log(corrupted_data_received);




                        //how to restore
//encode it back using utf8
var utf8_buf= Buffer.from(corrupted_data_received, 'utf8');

//decode it using gbk (not work if corrption is lossy.)
const restore_data = iconv.decode(utf8_buf, 'gbk');
console.log(restore_data);


//not working at thie case


