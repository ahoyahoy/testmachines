var app = app || {};

;!function() {

	'use strict';

	app.TicketView = Backbone.View.extend({
		template: _.template( fixtemplate($('#ticket-tmpl').html()) ),
		events: {
			'click .remove': 'remove'
		},
		initialize: function(data) {
			var diff = dateDiff( data.date, new Date() );
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
			data.date = formated;
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
				var tickets = this.$el.parent();
				$.postJSON('/api/removeTicket', {
					username: user.name,
					server: tickets.attr('si'),
					web: tickets.attr('wi'),
					ticket: this.data.number
				}, function(res){

				});
				this.$el.fadeOut(300, function() {
					this.remove();
				});
			}
			return false;
		}
	});


}();