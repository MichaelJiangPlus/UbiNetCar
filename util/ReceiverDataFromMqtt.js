/**
 * Created by wushuran on 17-6-6.
 */

/** MongoDb连接用变量 **/
var mqtt  = require('mqtt');
var uuid = require('uuid');

var client  = mqtt.connect('mqtt://10.66.15.225',{
    username:'team6',
    password:'123456',
    clientId:uuid.v4()
});


/** 测试用数据 **/
var testJson = {
    carID:'31401097',
    engineCoolantTemperature:233,
    engineSpeed:233,
    vehicleSpeed:233,
    mailboxAirTemperature:233,
    mailboxLevel:233,
    engineOilTemperature:233,
    engineOilConsumptionRate:233,
    location:{
        'geo': [
            22,//geo:lng, lat
            22
        ],
        'country': "1",
        'postcode': "1",
        'state': "1",
        'suburb': "1",
        'street2': "1",
        'street1': "11",
        'name': "11",
        'number': "1"
    }
}
var sendString = JSON.stringify(testJson);


client.on('connect', function () {
    console.log('connected.....');
    client.subscribe('test');
    client.publish('test', JSON.stringify({code:0,message:"LinkSuccess"}));
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("topic  : "+topic);
    console.log("message: "+message);
});
