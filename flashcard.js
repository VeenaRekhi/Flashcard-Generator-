
// constructor function which can take in a series of values and create objects
// with the properties contained inside

function BasicCard (front, back) { 
	if (this instanceof BasicCard) {
		this.front = front;
		this.back = back;

		console.log(this.front);
		console.log(this.back);
		this.writeToFile = function() {
			var logTxt = "basic, " + this.front + ", " + this.back + ",\n";	
			var fs = require('fs');
			fs.appendFile ("log.txt", logTxt, function(err) {
			});
		}

	}
}

// constructor function which can take in a series of values and create objects
// with the properties contained inside

function ClozeCard (text, cloze) { 
	if (this instanceof ClozeCard) {
		this.text = text;
		this.cloze = cloze;

		if (text.indexOf(cloze) >= 0) {
			var partial = text.replace(cloze, "{ ... }");
			console.log("cloze : " + this.cloze);
			console.log("partial : " + partial);
			console.log("Full text : " + this.text);
			this.writeToFile = function() {
				var logTxt = "cloze, " + partial + ", " + this.cloze + ",\n";	
				var fs = require('fs');
				fs.appendFile ("log.txt", logTxt, function(err) {
				});
			}
		}
		else {
			console.log(cloze + " doesn't appear in " + text);
		}

	}
}

function playFlashcard() { 
	var fs = require('fs');
	fs.readFile ("log.txt", "UTF8", function(err, data) {
		var dataArr = data.split(",");
	  	var cardType = dataArr[c];
		var question = dataArr[c + 1];
		var correctAnswer = dataArr[c + 2];
	    inquirer.prompt([
	      {
	        type: "input",
	        name: "userInput",
	        message: question
	      }
		]).then(function(answer) {
			if (answer.userInput.trim() == correctAnswer.trim()) {
				console.log("Congratulations!!! You got the correct answer.");
			}
			else {
				console.log("Oops!!! You got this one wrong.");
			}
			c = c + 3;
	    	if (c < dataArr.length) {
				playFlashcard();
	   		}

		});
	});
}
 
var inquirer = require("inquirer");
var cardType = process.argv[2];

if (cardType == "basic") {
	var front = process.argv[3];
	var back = process.argv[4];
	var firstPresident = new BasicCard(front, back);
	firstPresident.writeToFile();
}
else if (cardType == "cloze") {
	var text = process.argv[3];
	var cloze = process.argv[4];
	var firstPresidentCloze = new ClozeCard(text, cloze);
	firstPresidentCloze.writeToFile();
}
var brokenCloze = new ClozeCard("George Washington was the first president of the United States.", "Barack Obama");

var c = 0;
playFlashcard();

