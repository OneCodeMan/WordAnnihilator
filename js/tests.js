// Count the number of words to match the points

function checkCount(arr) {
	var totalWordCount = 0;

	for(var i=0; i < arr.length; i++) {

		var level = arr[i].join('');

		totalWordCount += level.length;

	}

	console.log("Total number of characters: " + totalWordCount);
}

checkCount(targets);