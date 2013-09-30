var app = app || {};

;!function() {

	'use strict';

	window.table = new app.TableView(user.data.servers);


}();


function serverToString(obj) {
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
	str[1] = str[1].split(')')[0];
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