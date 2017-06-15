/**
 * Created by michaeljiang on 17-6-16.
 */

module.exports = function mqttstart(next){
var mosca = require('mosca')
var moscaSettings = {
    port: 1883
};

var server = new mosca.Server(moscaSettings);
server.on('ready', function(){
    console.log('Mosca server is up & running');
});
next();
}
