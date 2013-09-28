function fixtemplate(html) {
	html = html.replace(/&lt;/g,'<');
	html = html.replace(/&gt;/g,'>');
	return html;
}

function dateDiff( str1, str2 ) {
    var diff = Date.parse( str2 ) - Date.parse( str1 ); 
    return isNaN( diff ) ? NaN : {
    	diff : diff,
    	m  : Math.floor( diff /    60000 %   60 ),
    	h  : Math.floor( diff /  3600000 %   24 ),
    	d  : Math.floor( diff / 86400000        )
    };
}

function plural(num, strings) {
	if(num == 1) {
		return num + ' ' + strings[0];
	} else if(num < 5) {
		return num + ' ' + strings[1];
	} else if(num > 4) {
		return num + ' ' + strings[2];
	}
}