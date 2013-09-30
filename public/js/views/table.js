var app = app || {};

;!function() {

	'use strict';

	app.TableView = Backbone.View.extend({
		el: 'table',
		events: {
			'click .addserver': 'addNew'
		},
		initialize: function(data) {
			this.data = data;
			this.$tfoot = this.$el.find('thead').eq(0);
			this.addAll(data, this);
		},
		si: 0,
		addAll: function(servers) {
			var that = this;
			var delay = function(data, i) {
				that.addOne(servers[i], i);
				if(typeof servers[i+1] !== 'undefined') {
					setTimeout(function() { i++; delay(servers[i], i); }, 100);
				}
			  
			}
			setTimeout(function() { delay(servers[0], 0); }, 100);
		},
		addOne: function(server, i) {
			var $server = new app.ServerView(server, i).$el;
			$server.addClass('invisible');
			$server.insertBefore( this.$tfoot );
			setTimeout(function() { $server.removeClass('invisible'); }, 100);
			this.si++;
		},
		addNew: function() {
			var ticket = prompt('Parametry serveru', 'serverX.dev( adminweb: 3334, userweb: 3333 )');
			ticket = serverToObject(ticket);
			this.data.push(ticket);
			this.addOne(ticket);
		}
	});



	

}();