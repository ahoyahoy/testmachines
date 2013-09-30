module.exports = function(app){

	var User = app.mg.model('user')

	
	app.post('/api/addTicket', function(req, res){
		var obj = {};
		obj['data.servers.'+req.body.server+'.webs.'+req.body.web+'.tickets'] = { number: req.body.ticket, date: new Date() };

		User.update({ name: req.body.username }, { $addToSet: obj }, {}, function(err, r) {
			console.log(err, r);
			if(err) {
				res.json({ status: 500, error: err });
			} else {
				res.json({ status: 200 });
			}
		});

	});

	app.post('/api/removeTicket', function(req, res){
		var obj = {};
		obj['data.servers.'+req.body.server+'.webs.'+req.body.web+'.tickets'] = { number: req.body.ticket };

		User.update({ name: req.body.username }, { $pull: obj }, {}, function(err, r) {
			if(err) {
				res.json({ status: 500, error: err });
			} else {
				res.json({ status: 200 });
			}
		});

	});
	


	
};