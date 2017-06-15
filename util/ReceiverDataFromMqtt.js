/**
 * Created by michaeljiang on 17-6-6.
 */
/** MongoDb连接用变量 **/
/**
 * Created by michaeljiang on 17-6-6.
 */


module.exports = function startReceiverData(){
    /** MongoDb连接用变量 **/
    var mongoose = require('mongoose');    //引用mongoose模块
    var db = mongoose.createConnection('localhost','ubinetcar'); //创建一个数据库连接

    var CarSchema = new mongoose.Schema({
        carID:String,   //定义一个属性name，类型为String
        carType:String,
        own:mongoose.Schema.Types.Mixed,
    });
    var DrivingRecordSchema = new mongoose.Schema({
        carID:mongoose.Schema.ObjectId,
        engineCoolantTemperature:Number,
        engineSpeed:Number,
        vehicleSpeed:Number,
        mailboxAirTemperature:Number,
        mailboxLevel:Number,
        engineOilTemperature:Number,
        engineOilConsumptionRate:Number,
        location:mongoose.Schema.Types.Mixed
    })
    var CarModel = db.model('Car',CarSchema);
    var DrivingRecordModel = db.model('DrivingRecord',DrivingRecordSchema);

    /** Mqtt连接用变量 **/
    var mqtt  = require('mqtt');
    var uuid = require('uuid');

    /** 数据库链接操作 **/
    db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
        console.log("数据库连接成功");
    });

    var client  = mqtt.connect('mqtt://0.0.0.0',{
        username:'michaeljiang',
        password:'123456',
        clientId:uuid.v4()
    });
    client.on('connect', function () {
        console.log('Mqtt连接成功');
        client.subscribe('ubinetcar_driving_record');
        client.subscribe('ubinetcar_message');
    });

    client.on('message', function (topic, message) {
        try{
            var message = JSON.parse(message.toString());
            //成功转换字符串
            if(topic == 'ubinetcar_driving_record'){
                CarModel.findOne({carID:message.carID},function (err,car) {
                    if(car == null){
                        client.publish('ubinetcar_message', JSON.stringify({code:-1,message:"NoThisCar"}));
                        console.log(JSON.stringify({code:-1,message:"NoThisCar"}));
                        return;
                    }
                    message.carID = car._id;
                    var DrivingRecordEnity = new DrivingRecordModel(message);
                    DrivingRecordEnity.save();
                    console.log(1);
                }).then(function () {
                    console.log(JSON.stringify({code:0,message:"Success"}));
                })
            }
            if(topic=='ubinetcar_message'){
                console.log(message);
            }
        }
        catch (err){
            console.log(err)
        }
    });
}
