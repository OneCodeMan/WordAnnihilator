var word = ""; // what the user types
var wordTyped = document.getElementById("wordtyped"); // div where it shows what the user typed
var wordlist = document.getElementById("wordlist"); // div where the array of words are displayed
var scoretext = document.getElementById("scoretext");
var score = 0;
var arr = targets.shift();

// sounds
var destroySound = new Audio('Explosion.wav');
var nextLevelSound = new Audio('NextLevel.wav');

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

function updateScore(word) {
	score += word.length;
	scoretext.innerHTML = score;
}

// this is the game loop
function gameloop() {

	scoretext.innerHTML = score; // initialize score to 0
	displayWords(arr); // initially display all the words in the array

	// listen for typing events
	document.body.addEventListener('keypress', function(e) {

		word += String.fromCharCode(e.keyCode); // this is what the user types
		wordTyped.innerHTML = word; // show what the user is typing on the div
		console.log(word);

		// this whole thing is to check if the word that the user typed is in the array targets
		var index = arr.indexOf(word); 

		if (index > -1) {
			matchedWord(word); // check if level is done or if all levels are done
			destroySound.play();

			updateScore(word); // update score

			displayWords(arr); // then remove the existing array and display the new array.
			word = ""; // reset user input
			wordTyped.innerHTML = word;
		}

	});
}

// check for word matches
function matchedWord(typedWord) {
	arr.splice(arr.indexOf(typedWord), 1);

	if (arr.length == 0) {

		if (targets.length>0) {
			arr = targets.shift(); // shift to next array 
			wordlist.className -= "godown"; // reset the going down effect
			nextLevelSound.play();
			setTimeout(function() {wordlist.className = "godown";}, 50); // adding it right away doesn't work
		}

	} else {
		//win
	}
}

// bruh idk how this works
(function deathCondition() {
	if (wordlist.offsetTop >= 500) {
		alert('hey');
	}
})();

gameloop()