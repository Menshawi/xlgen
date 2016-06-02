module.exports = blobGenerator;

function blobGenerator(build, cleanup) {
    var self = this;
    var Buf = self.BufferView;
    return function(callback){
        var len = 0;
        var chunks = [];
        var raw = null;
        build(function(buffer){
           if(!buffer){
               raw = Buf.concat(chunks).raw;
               cleanup();
               return callback(null,raw);
           }else{
               if(Buf.isBufferView(buffer)){
                   chunks.push(buffer);
                   len += buffer.length;
               }else if(Array.isArray(buffer)){
                   if(!buffer.length) return;
                   if(!(Buf.isBufferView(buffer[0])))
                    return callback('unsupported type');
                   buffer.forEach(function (x) {
                       chunks.push(x);
                       len += x.length;
                   });
               }else{
                   return callback('unsupported type');
               }
           }
        });
    }
}