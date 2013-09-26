
/*
 * GET home page.
 */

exports.app = function(req, res){
	res.render('app', { foo: 'AHOYAHOY' });
};