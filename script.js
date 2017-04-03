var CONSTANTS = Object.freeze({
	MAX_INPUT_LENGTH: 15,
})

document.addEventListener('DOMContentLoaded', function() { 
	var input = document.getElementById('js-input'),
		multiplier = document.getElementById('js-multiplier'),
		divider = document.getElementById('js-divider'),
		subtractor = document.getElementById('js-subtractor'),
		adder = document.getElementById('js-adder'),
		equal = document.getElementById('js-result'),
		inputClear = document.getElementById('js-delete'),
		deleteCharacter = document.getElementById('js-delete-character'),
		numbers = document.querySelectorAll('.js-number'),
		numbersLength = numbers.length,
		zeroPrinter = document.getElementById('js-zero'),
		dotPrinter = document.getElementById('js-dot');

	multiplier.addEventListener('click', operatorPrinter);
	divider.addEventListener('click', operatorPrinter);
	subtractor.addEventListener('click', operatorPrinter);
	adder.addEventListener('click', operatorPrinter);

	function checkLastChar(input) {
		if (
			(input.slice(-1) === ".") || 
			(input.slice(-1) === "") || 
			(input.slice(-1) === "+") || 
			(input.slice(-1) === "-") || 
			(input.slice(-1) === "*") || 
			(input.slice(-1) == "/") ||
			(input.length === CONSTANTS.MAX_INPUT_LENGTH) )
		{
			return true;
		}

		return false;
	}

	function operatorPrinter() {
		if (checkLastChar(input.innerHTML)) {
			return false;
		} else {
			input.innerHTML += this.innerHTML;
		}
	}

	zeroPrinter.addEventListener('click', function() {
		if ((input.innerHTML.slice(-1) === "0") && (input.length === 1)) {
			return false;
		} else if (input.innerHTML.length === CONSTANTS.MAX_INPUT_LENGTH) {
			return false;
		} else {
			input.innerHTML += "0";
		}
	});

	dotPrinter.addEventListener('click', function() {
		if (checkLastChar(input.innerHTML)) {
			return false;
		} else {
			input.innerHTML += ".";
		}
	});

	equal.addEventListener('click', function() {
		if (
			(input.innerHTML.slice(-1) === ".") || 
			(input.innerHTML.slice(-1) === "+") || 
			(input.innerHTML.slice(-1) === "-") || 
			(input.innerHTML.slice(-1) === "*") || 
			(input.innerHTML.slice(-1) === "/") ) 
		{
			alert('Last char in the input is incorrect. Please try again.');
		} else if (input.innerHTML.slice(-1) === "") {
			alert('The input is empty. Put some numbers in it!');
		} else {
			try {
				var inputResult;
				input.innerHTML = eval(input.innerHTML);
				input.innerHTML =+ parseFloat(input.innerHTML).toFixed(5);
				inputResult = eval(input.innerHTML);
				
				if (inputResult == Number.POSITIVE_INFINITY || 
					inputResult == Number.NEGATIVE_INFINITY) 
				{
					input.innerHTML = 'You can\'t divide by 0.';
				}			
			} catch (e) {
				if (e instanceof SyntaxError) {
					alert('Something went wrong!');
					input.innerHTML = "Error.";
				}
			}
		}
	});

	inputClear.addEventListener('click', function() {
		input.innerHTML = "";
	});

	deleteCharacter.addEventListener('click', function() {
		var inputText = input.innerHTML;

		if (!inputText) {
			return false;
		} else if (
			(input.innerHTML == 'You can\'t divide by 0.') || 
			(input.innerHTML == "Error.")) 
		{
			input.innerHTML = "";
		} else {
			inputText = inputText.slice(0, -1);
			input.innerHTML = inputText;
		}
	});

	for (var i = 0; i < numbersLength; i++) {
		numbers[i].addEventListener('click', function() {
			if (input.innerHTML.length === CONSTANTS.MAX_INPUT_LENGTH) {
				return false;
			} else {
				var numbersValue = this.value;
				input.innerHTML += numbersValue;
			}
		});
	}
});