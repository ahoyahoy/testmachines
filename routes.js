module.exports = function(app){

	var User = app.mg.model('user')

	
	app.get('/:username', function(req, res){
		var q = User.find({ name: req.params.username }).limit(1);
		q.execFind( function(err, users) {
			if(typeof users[0] !== 'undefined') {
				res.render('app', { user: users[0] });
			} else {
				res.render('app', { foo: '404' });
			}
		});

	});
	

	app.get('/', function(req, res){
		var q = User.find({});
		q.execFind( function(err, users) {
			res.render('list', { users: users });
		});

	});


	
};