(function(undefined){
    var container = document.getElementById('history');

    function writeHistory(text) {
	var parts = text.split('\n\n');
	for (var index = 0; index < parts.length; index++) {
	    var paragraph = document.createElement('p');
	    paragraph.textContent = parts[index];
	    container.appendChild(paragraph);
	}
    };

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
	if (xhr.readyState == 4) {
	    writeHistory(xhr.responseText);
	}
    }
    xhr.open('GET', 'history.txt', true);
    xhr.send();
})();
