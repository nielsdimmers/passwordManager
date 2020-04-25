/**
 * The password generator class to generate certain passwords and utility functions.
 */
class passwordGenerator {
	
	/**
	 * Generate the numbers based on the on-screen availability of numbers, and a password from that
	 */
	generateRandomPassword() {
		this.generatePassword(true);
	}

	/**
	 * Generate a password based on the given values in the on-screen data
	 */
	generatePasswordFromGivenValues() {
		this.generatePassword(false);
	}

	generatePassword(selfGenerate) {
		var randomValues = new Uint8Array(document.querySelectorAll(".number").length);
		window.crypto.getRandomValues(randomValues);
		var randomPointer = 0;

		var totalPasswordElement = document.getElementById("totalPassword");
		totalPasswordElement.innerHTML = "";
		var passwordBitElements = document.querySelectorAll(".passwordBit");
		for(var j = 0;j < passwordBitElements.length;j++) {
			var wordElement = passwordBitElements[j].querySelectorAll(".word");
			var numbers = passwordBitElements[j].querySelectorAll(".number");
			var result = 0;
			for(var i=0;i<numbers.length;i++) {
				var bitValue = parseInt(numbers[i].value,10);
				if(selfGenerate) {
					var randNr = Math.floor((randomValues[randomPointer]/256*6)) + 1;
					randomPointer++;
					bitValue = randNr;
					numbers[i].value = bitValue;
				}
				result = (result * 10) + bitValue;
			}
			totalPasswordElement.innerHTML =totalPasswordElement.innerHTML+ " "+words[result];
			wordElement[0].innerHTML = words[result];
		}	
	}


	addBit() {
	 var password = document.getElementById("password");
	 var passwordBit = password.querySelectorAll(".passwordBit")[0].cloneNode(true);
	 passwordBit.querySelectorAll(".word")[0].innerHTML = "";
	 var numberElements = passwordBit.querySelectorAll(".number");
	 for(var i = 0;i < numberElements.length;i++) {
		 numberElements[i].value = "";
	 }
	 password.appendChild(passwordBit);
	}

	removeBit (){
		var passwordBits = document.querySelectorAll(".passwordBit")

		if(passwordBits.length > 1) {
			var lastElement = passwordBits.length - 1;
			passwordBits[lastElement].parentNode.removeChild(passwordBits[lastElement]);
		}
	}

}