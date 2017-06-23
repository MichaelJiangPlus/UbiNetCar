/**
 * Created by michaeljiang on 17-6-16.
 */
var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');
var user = { email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } };

function createUser (admin, done) {
    var newAdmin = new User.model(admin);
    newAdmin.isAdmin = false;
    newAdmin.save(function (err) {
        if (err) {
            console.error('Error adding admin ' + admin.email + ' to the database:');
            console.error(err);
        } else {
            console.log('Added admin ' + admin.email + ' to the database.');
        }
        done(err);
    });

}
exports = module.exports = function (req, res) {
    var keystone = req.keystone;
    console.log(req.body)
    if(req.body.password != req.body.check_password){
        req.flash('error', '两次密码不一致');
        res.redirect('/register');
    }
    user.password = req.body.password;
    user.email = req.body.email;
    user.name.first = req.body.first_name;
    user.name.last = req.body.last_name;
    User.model.find({email:user.email})
        .exec(function(err, result) {
            if(result.length!=0){
                req.flash('error', '两次密码不一致');
                res.redirect('/register');
            }
            else{
                createUser(user,function (err) {
                    console.log(err)
                    res.redirect('/login');
                });
            }
        });
};




