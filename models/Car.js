/**
 * Created by michaeljiang on 17-6-6.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Car Model
 * =============
 */

var Car = new keystone.List('Car',{
    map: { name: 'carID' },
});
Car.add({
    carID:{type: Types.Text,label:"车辆编号",required: true, index: true,initial: true},
    carType:{type: Types.Select, options: 'A1, A2, A3,B1,B2,C1,C2',label:'车辆类型',initial: true, required: true, unique: true, index: true },
    own:{type:Types.Name,label:"车主",initial: true}
})
Car.defaultSort = '-createdAt';
Car.defaultColumns = 'carID, carType|20%, own'
Car.register();