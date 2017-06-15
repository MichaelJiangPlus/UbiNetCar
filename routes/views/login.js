/**
 * Created by michaeljiang on 17-6-14.
 */
var keystone = require('keystone');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = {
        adminPath: '/' + keystone.get('admin path'),
        brand: keystone.get('brand'),
        csrf: { header: {} },
        logo: keystone.get('signin logo'),
        redirect: keystone.get('signin redirect'),
        user: req.user ? {
            id: req.user.id,
            name: UserList.getDocumentName(req.user) || '(no name)',
        } : undefined,
        userCanAccessKeystone: !!(req.user && req.user.canAccessKeystone),
    };

    // var locals = res.locals;
    locals.section = 'login';
    locals.csrf.header[keystone.security.csrf.CSRF_HEADER_KEY] = keystone.security.csrf.getToken(req, res);
    view.render('login');
};

