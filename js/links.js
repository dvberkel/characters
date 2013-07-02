(function(undefined){
    var links = document.getElementsByTagName('a');
    for(var index = 0; index < links.length; index++) {
	var link = links[index];
	link.textContent = link.getAttribute('href');
    }
})();
