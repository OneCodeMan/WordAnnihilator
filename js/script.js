var word = "";
var targets = ["hey", "sup", "nothing"];
var wordTyped = document.getElementById("wordtyped");
var wordlist = document.getElementById("wordlist");

wordlist.innerHTML = targets; // Initially display words

document.body.addEventListener('keypress', function(e) {

	word += String.fromCharCode(e.keyCode); 
	wordTyped.innerHTML = word;
	console.log(word);

	var index = targets.indexOf(word);

	if (index > -1) {
		console.log("success");

		targets.splice(index, 1);
		wordlist.innerHTML = targets;
		word = "";
		wordTyped.innerHTML = word;
	}

});

// reset on esc key
document.body.addEventListener('keyup', function(e) {

	if (e.keyCode == 27) {
		word = "";
		wordTyped.innerHTML = word;
		console.log(word);
	}

});