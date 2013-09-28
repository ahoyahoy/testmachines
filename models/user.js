module.exports = function(mg) {
	var collection = 'user';
	var Schema = mg.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
		created: { type: Date, default: Date.now },
		name: String,
		data: { type: Schema.Types.Mixed, default: {} }
	});

	return mg.model(collection, schema);
};