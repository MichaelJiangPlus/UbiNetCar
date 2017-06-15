/**
 * Created by michaeljiang on 17-6-15.
 */
var keystone = require('keystone');
var DrivingRecord = keystone.list('DrivingRecord');
var Car = keystone.list('Car');
exports = module.exports = function (req, res) {
    DrivingRecord.model.find().sort('-_id').populate('carID',{carID: 1,_id:0})
        .limit(6)
        .exec(function(err, result) {
            console.log(result);
            res.send(result);
        });
};
