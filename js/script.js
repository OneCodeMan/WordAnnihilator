var word = ""; // what the user types
var targets = [["hey", "sup", "nothing", "memories", "man"], ["next", "level"]]; // array of words
var wordTyped = document.getElementById("wordtyped"); // div where it shows what the user typed
var wordlist = document.getElementById("wordlist"); // div where the array of words are displayed
var arrindex = 0;

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

// reset on esc key
document.body.addEventListener('keyup', function(e) {

	var pressedEnter = e.keyCode == 27;

	if (pressedEnter) {
		word = "";
		wordTyped.innerHTML = word;
		console.log(word);
	}
});

// this is the game loop
function gameloop(arrindex) {

	displayWords(targets[arrindex]); // initially display all the words in the array

	// listen for typing events
	document.body.addEventListener('keypress', function(e) {

		word += String.fromCharCode(e.keyCode); // this is what the user types
		wordTyped.innerHTML = word; // show what the user is typing on the div
		console.log(word);

		// this whole thing is to check if the word that the user typed is in the array targets
		var index = targets[arrindex].indexOf(word); 

		if (index > -1) {
			console.log("success");
			destroySound.play();

			targets[arrindex].splice(index, 1); // if what the user types exists in targets, delete that from the array

			displayWords(targets[arrindex]); // then remove the existing array and display the new array.
			word = ""; // reset user input
			wordTyped.innerHTML = word;
		}

	});
}

gameloop(arrindex);