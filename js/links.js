(function(undefined){
    charactersData = {};
    charactersData['drax'] = { name: 'Drax Plunkett', file: 'Drax%20Plunkett'};

    (function nameLinks(){
	var links = document.getElementsByTagName('a');
	for(var index = 0; index < links.length; index++) {
	    var link = links[index];
	    link.textContent = charactersData[link.dataset.character].name + '.' + link.dataset.id;
	}
    })();

    var template = pico('https://github.com/dvberkel/drax-plunkett/raw/{{tag}}/{{file}}.{{extension}}')

    function changeLinksTo(character, tag) {
	var links = document.getElementsByTagName('a');
	for(var index = 0; index < links.length; index++) {
	    var link = links[index];
	    if (link.dataset.character === character) {
		link.setAttribute('href', template({
		    'tag' : tag,
		    'file' : charactersData[character].file,
		    'extension' : link.dataset.id
		}));
	    }
	}
    }
    for (character in charactersData) {
	changeLinksTo(character, 'master');
    }

    function appendOption(character, tag) {
	var selection = document.getElementById(character + '-version');
	var option = document.createElement('option');
	option.setAttribute('value', tag);
	option.text = tag;
	option.addEventListener('click', function(){ changeLinksTo(character, tag); });
	selection.appendChild(option);
    }

    function appendTags(character, tags) {
	appendOption(character, 'master');
	tags.forEach(function(tag){
	    appendOption(character, tag);
	});
    }

    function splitCharacters(text) {
	characters = {};
	var lines = text.split('\n');
	lines.forEach(function(line){
	    var m = line.match(/([^-]+)-\d+/);
	    if (m) {
		if (!characters[m[1]]) {
		    characters[m[1]] = [];
		}
		characters[m[1]].push(m[0]);
	    }
	});
	return characters;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
	if (xhr.readyState == 4) {
	    var tagsOf = splitCharacters(xhr.responseText);
	    for (var character in tagsOf) {
		appendTags(character, tagsOf[character]);
	    }
	}
    }
    xhr.open('GET', 'tags.txt', true);
    xhr.send();

})();
