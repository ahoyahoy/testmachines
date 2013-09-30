var app = app || {};

;!function() {

	'use strict';

	app.ServerView = Backbone.View.extend({
		tagName: 'tbody',
		events: {
			'click .edit': 'editServer'
		},
		initialize: function(data, si) {
			this.data = data;
			this.si = si;
			this.render();
		},
		render: function() {
			this.addAll( this.data.webs );
			return this;
		},
		wi: 0,
		addAll: function(webs) {
			for(var i = 0; i < webs.length; i++) {
				this.addOne(webs[i], i);
			}
		},
		addOne: function(web, i) {
			web.i = i;
			web.si = this.si;
			web.name = this.data.name;
			web.lngth = this.data.webs.length;
			web.desc = web.desc.split(':');
			web.desc = {
				label: web.desc[0],
				url: web.desc[1]
			}
			var $web = new app.WebView(web, this.si, i).$el;
			this.$el.append( $web );
			this.wi++;
		},
		editServer: function() {
			var ser = prompt('Parametry serveru', serverToString(this.data));
		}
		
	});


}();