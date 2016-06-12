var word = ""; // what the user types
var scoreBox = document.getElementById("scorebox");
var wordTyped = document.getElementById("wordtyped"); // div where it shows what the user typed
var wordlist = document.getElementById("wordlist"); // div where the array of words are displayed
var scoretext = document.getElementById("scoretext");
var playbutton = document.getElementById("playbtn");
var playagainbutton = document.getElementById("playagain");
var resettext = document.getElementById("reset");
var intro = document.getElementById("intro");
var gameover = document.getElementById("gameover");
var condition = document.getElementById("condition");
var score = 0;
var arr = targets.shift();

// sounds
var destroySound = new Audio('Explosion.wav');
var nextLevelSound = new Audio('NextLevel.wav');
var scoreChangeSound = new Audio('ScoreChange.wav');
var gameStartSound = new Audio('gameStart.wav');
var winGameSound = new Audio('Win.wav');

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
	}
});

function updateScore(word) {
	score += word.length;
	scoretext.innerHTML = score;

	checkScore(score);
}

// this is the game loop
function gameloop() {

	resettext.innerHTML = "Press 'esc' to reset word";
	scoretext.innerHTML = score; // initialize score to 0
	displayWords(arr); // initially display all the words in the array

	// listen for typing events
	document.body.addEventListener('keypress', function(e) {

		listposition = wordlist.getBoundingClientRect();
		if (listposition.bottom >= 550) {
			gameover(false);
		}

		word += String.fromCharCode(e.keyCode); // this is what the user types
		wordTyped.innerHTML = word; // show what the user is typing on the div

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

function gameover(won) {

	winGameSound.play();
	scoreBox.style.display = "none";
	wordlist.style.display= "none";
	wordTyped.style.display = "none";
	gameover.style.display = "inline";

	if (won) {
		condition.innerHTML= "YOU WON";
	} else {
		condition.innerHTML= "YOU LOST, AW!";
	}
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
		} else {
			gameover(true);
		}

	} else {
		
	}

}// end of matchedWord()


// click event
playbutton.onclick = function() {
	wordlist.className = "godown"
	intro.style.display = 'none';
	gameStartSound.play();
	gameloop();
}

// check score to change text
function checkScore(score) {
	
	if (score >= 50) {
		scoretext.style.color = "yellow";
	}

	if (score >= 100) {
		scoretext.style.color = "blue";
	}

	if (score >= 150) {
		scoretext.style.color = "pink";
	}

	if (score >= 200) {
		scoretext.style.color = "green";
	}

	if (score >= 250) {
		scoretext.style.color = "red";
	}

	if (score >= 300) {
		scoretext.style.color = "orange";
	}

	if (score >= 350) {
		scoretext.style.color = "purple";
	}
}


function gotoblog() { window.open("http://davecodes.tumblr.com"); }
function gotoitch() { window.open("https://davecodes.itch.io"); }
function gotocart() { window.open("https://cartrdge.com/developerdave"); }

