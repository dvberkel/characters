(function(undefined){
    (function nameLinks(){
	var links = document.getElementsByTagName('a');
	for(var index = 0; index < links.length; index++) {
	    var link = links[index];
	    link.textContent = 'Drax Plunkett.' + link.id;
	}
    })();

    var template = pico('https://github.com/dvberkel/drax-plunkett/raw/{{version}}/Drax%20Plunkett.{{extension}}')

    function changeLinksTo(version) {
	var links = document.getElementsByTagName('a');
	for(var index = 0; index < links.length; index++) {
	    var link = links[index];
	    link.setAttribute('href', template({
		'version' : version,
		'extension' : link.id
	    }));
	}
    }
    changeLinksTo('master');

    function appendOption(name) {
	var selection = document.getElementById('version');
	var option = document.createElement('option');
	option.setAttribute('value', name);
	option.text = name;
	option.addEventListener('click', function(){ changeLinksTo(name); });
	selection.appendChild(option);
    }
    appendOption('master');

    function appendTags(text) {
	var parts = text.split('\n');
	for(var index = 0; index < parts.length; index++) {
	    var part = parts[index]
	    if (part) {
		appendOption(part);
	    }
	}
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
	if (xhr.readyState == 4) {
	    appendTags(xhr.responseText);
	}
    }
    xhr.open('GET', 'tags.txt', true);
    xhr.send();

})();
