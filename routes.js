module.exports = function(app){

	var User = app.mg.model('user')
	
	app.get('/:username', function(req, res){
		var q = User.find({ name: req.params.username }).limit(1);
		q.execFind( function(err, user) {
			if(typeof user[0] !== 'undefined') {
				res.render('app', { user: user[0] });
			} else {
				res.render('app', { foo: '404' });
			}
		});

	});


	
};