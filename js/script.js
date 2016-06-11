var word = ""; // what the user types
var targets = ["hey", "sup", "nothing", "memories", "man"]; // array of words
var wordTyped = document.getElementById("wordtyped"); // div where it shows what the user typed
var wordlist = document.getElementById("wordlist"); // div where the array of words are displayed

// sounds
var destroySound = new Audio('Explosion.wav');

// display the words in a div called indword. erase the current wordlist, update it with the new wordlist.
function displayWords(arr) {
	wordlist.innerHTML = "";
	for(var i=0; i < arr.length; i++) {
		wordlist.innerHTML += "<div class='indword'>"+arr[i]+"</div>";
		wordlist.innerHTML += "   ";
	}
}

displayWords(targets); // initially display all the words in the array

// listen for typing events
document.body.addEventListener('keypress', function(e) {

	word += String.fromCharCode(e.keyCode); // this is what the user types
	wordTyped.innerHTML = word; // show what the user is typing on the div
	console.log(word);

	// this whole thing is to check if the word that the user typed is in the array targets
	var index = targets.indexOf(word); 

	if (index > -1) {
		console.log("success");
		destroySound.play();

		targets.splice(index, 1); // if what the user types exists in targets, delete that from the array
		displayWords(targets); // then remove the existing array and display the new array.
		word = ""; // reset user input
		wordTyped.innerHTML = word;
	}

});

// reset on esc key
document.body.addEventListener('keyup', function(e) {

	var pressedEnter = e.keyCode == 27;

	if (pressedEnter) {
		word = "";
		wordTyped.innerHTML = word;
		console.log(word);
	}

});