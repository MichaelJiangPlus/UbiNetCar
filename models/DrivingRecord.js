/**
 * Created by michaeljiang on 17-6-6.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var DrivingRecord = new keystone.List('DrivingRecord',{
    map: { name: 'carID' },
    defaultSort: '-createdAt'
});

DrivingRecord.add({
    carID:{type: Types.Relationship, ref: 'Car',required: true, index: true,initial: true},
    engineCoolantTemperature:{ type: Types.Number,label:"引擎冷却液温度",initial: true},
    engineSpeed:{ type: Types.Number,label:"引擎转速",initial: true},
    vehicleSpeed:{ type: Types.Number,label:"车辆速度",initial: true},
    location:{type: Types.Location,label:"车辆位置",initial: true},//geo:lng, lat
    mailboxAirTemperature:{ type: Types.Number,label:"油箱空气温度",initial: true},
    mailboxLevel:{ type: Types.Number,label:"剩余油量",initial: true},
    engineOilTemperature:{ type: Types.Number,label:"引擎油温", initial: true},
    engineOilConsumptionRate:{ type: Types.Number,label:"油量消耗",initial: true}
})

DrivingRecord.defaultSort = '-createdAt'
DrivingRecord.defaultColumns = 'carID|10%, location|10%, vehicleSpeed|10%，mailboxLevel|10%'
DrivingRecord.register();
