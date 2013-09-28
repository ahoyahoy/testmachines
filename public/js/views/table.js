var app = app || {};

;!function() {

	'use strict';


	app.TicketView = Backbone.View.extend({
		template: _.template( fixtemplate($('#ticket-tmpl').html()) ),
		events: {
			'click .remove': 'remove'
		},
		initialize: function(data) {
			this.data = data;
			this.render();
		},
		render: function() {
			this.$el = $( this.template(this.data) );
			return this;
		},
		remove: function() {
			var del = confirm('Smazat ticket?');
			if(del) {
				this.$el.fadeOut(300, function() {
					this.remove();
				});
			}
			return false;
		}
	});

	app.WebView = Backbone.View.extend({
		template: _.template( fixtemplate($('#web-tmpl').html()) ),
		events: {
			'click .add': 'addNew',
		},
		initialize: function(data) {
			this.data = data;
			this.render();
		},
		render: function() {
			this.$el = $( this.template(this.data) );
			this.$tickets = this.$el.find('.tickets').eq(0);
			this.$add = this.$tickets.find('.add').eq(0);
			this.addAll(this.data.tickets);
			return this;
		},
		addAll: function(tickets) {	
			var that = this;
			var delay = function(data, i) {
				that.addOne(tickets[i], i);
				if(typeof tickets[i+1] !== 'undefined') {
					setTimeout(function() { i++; delay(tickets[i], i); }, 100);
				}
			  
			}
			setTimeout(function() { delay(tickets[0], 0); }, 200);
		},
		addOne: function(ticket) {
			var diff = dateDiff( ticket.date, new Date() );
			var formated = (function(diff) {
				if(diff.m < 1) {
					return 'teď';
				} else if(diff.h < 1) {
					return plural(diff.m, ['minuta', 'minuty', 'minut']);
				} else if(diff.d < 1) {
					return plural(diff.h, ['hodina', 'hodiny', 'hodin']);
				} else if(diff.d > 0) {
					return plural(diff.d, ['den', 'dny', 'dní']);
				} 
			})(diff);
			ticket.date = formated;
			var $ticket = new app.TicketView(ticket).$el;
			$ticket.addClass('invisible');
			$ticket.insertBefore( this.$add );
			setTimeout(function() { $ticket.removeClass('invisible'); }, 100);
		},
		addNew: function() {
			var ticket = prompt('Číslo ticketu');
			this.addOne({ number: ticket, date: new Date() });
		}
	});

	app.ServerView = Backbone.View.extend({
		tagName: 'tbody',
		events: {
			'click .edit': 'editServer'
		},
		initialize: function(data) {
			this.data = data;
			this.render();
		},
		render: function() {
			this.addAll( this.data.webs );
			return this;
		},
		addAll: function(webs) {
			for(var i = 0; i < webs.length; i++) {
				this.addOne(webs[i], i);
			}
		},
		addOne: function(web, i) {
			web.i = i;
			web.name = this.data.name;
			web.lngth = this.data.webs.length;
			web.desc = web.desc.split(':');
			web.desc = {
				label: web.desc[0],
				url: web.desc[1]
			}
			var $web = new app.WebView(web).$el;
			this.$el.append( $web );
			
		},
		editServer: function() {
			var ser = prompt('Parametry serveru', serverToString(this.data));
		}
		
	});

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
		addAll: function(servers) {
			var that = this;
			var delay = function(data, i) {
				that.addOne(servers[i]);
				if(typeof servers[i+1] !== 'undefined') {
					setTimeout(function() { i++; delay(servers[i], i); }, 100);
				}
			  
			}
			setTimeout(function() { delay(servers[0], 0); }, 100);
		},
		addOne: function(server) {
			var $server = new app.ServerView(server).$el;
			$server.addClass('invisible');
			$server.insertBefore( this.$tfoot );
			setTimeout(function() { $server.removeClass('invisible'); }, 100);
		},
		addNew: function() {
			var ticket = prompt('Parametry serveru', 'serverX.dev( adminweb: 3334, userweb: 3333 )');
			ticket = serverToObject(ticket);
			this.data.push(ticket);
			this.addOne(ticket);
		}
	});



	function serverToString(obj) {
		console.log(obj);
		var ret = obj.name + '(';
		for(var i = 0; i < obj.webs.length; i++) {
			ret += ' ' + obj.webs[i].desc.label + ': ' + obj.webs[i].desc.url;
			if(i < obj.webs.length - 1) {
				ret += ',';
			}
		}
		ret += ' )';
		return ret;
	}

	function serverToObject(str) {
		str = str.replace(/: /g,':');
		str = str.replace(/, /g,',');
		str = str.replace(/\( /g,'(');
		str = str.replace(/\) /g,')');
		str = str.replace(/  /g,' ');
		str = str.split('(');
		str[1] = str[1].split('(')[0];
		str[1] = str[1].split(',');
		var ret = { name: str[0], webs: [] };
		for(var i = 0; i < str[1].length; i++) {
			ret.webs.push({
				desc: str[1][i],
				lngth: str[1].length,
				name: str[0],
				tickets: []
			})
		}
		return ret;
	}

}();