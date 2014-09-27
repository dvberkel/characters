(function(undefined){
    function writeHistory(container, text) {
	var parts = text.split('\n\n');
	for (var index = 0; index < parts.length; index++) {
	    var paragraph = document.createElement('p');
	    paragraph.textContent = parts[index];
	    container.appendChild(paragraph);
	}
    };

    ['kevin', 'drax'].forEach(function(character){
	var container = document.getElementById(character + '-history');

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	    if (xhr.readyState == 4) {
		writeHistory(container, xhr.responseText);
	    }
	}
	xhr.overrideMimeType('text/plain');
	xhr.open('GET', character + '-history.txt', true);
	xhr.send();
    });
})();
