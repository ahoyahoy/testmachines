var app = app || {};

;!function() {

	'use strict';

	app.WebView = Backbone.View.extend({
		template: _.template( fixtemplate($('#web-tmpl').html()) ),
		events: {
			'click .add': 'addNew',
		},
		initialize: function(data, si, wi) {
			this.data = data;
			this.si = si;
			this.wi = wi;
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
			if(typeof tickets[0] !== 'undefined') {
				setTimeout(function() { delay(tickets[0], 0); }, 200);
			}
		},
		addOne: function(ticket) {
			var $ticket = new app.TicketView(ticket).$el;
			$ticket.addClass('invisible');
			$ticket.insertBefore( this.$add );
			setTimeout(function() { $ticket.removeClass('invisible'); }, 100);
		},
		addNew: function(e) {
			var that = this;
			var $e = $(e.currentTarget);

			(function dialog(val) {
				var ticket = prompt('Číslo ticketu', val);
				if(ticket != '' && ticket !== null) {
					if( !isNaN(ticket) ) {
						that.addOne({ number: parseInt(ticket), date: new Date() });
						var tickets = that.$el.find('.tickets').eq(0);
						
						$.postJSON('/api/addTicket', {
							username: user.name,
							server: tickets.attr('si'),
							web: tickets.attr('wi'),
							ticket: parseInt(ticket)
						}, function(res) {

						});
					} else {
						alert('Hodnota musí být číslo');
						dialog(ticket);
					}
				}
			})('');
		}
	});


}();