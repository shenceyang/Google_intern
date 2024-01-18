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
const restored_data = iconv.decode(data_sent, 'gbk');
console.log(restored_data);



