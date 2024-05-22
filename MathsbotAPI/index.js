function fourOps(x, y, type) {
	var problem = {};
	problem.question = "<div>\\(";
	switch (type) {
		case "+":
			problem.question += x + " + " + y;
			problem.answer = x + y;
			break;
		case "-":
			problem.question += x + " &minus; " + y;
			problem.answer = x - y;
			break;
		case "*":
			problem.question += x + "\\ &#215;\\ " + y;
			problem.answer = x * y;
			break;
		case "/":
			problem.question += x + "\\ &divide;\\ " + y;
			problem.answer = x / y;
			break;
	}
	problem.question += "\\)</div>";
	problem.typedAnswer = roundError(problem.answer);
	problem.answer = "<div>\\(" + roundError(problem.answer) + "\\)</div>";
	return problem;
}

function fractionOfAmount(num, den, amount) {
	var problem = {};
	problem.answer = roundError((amount * num) / den);
	var whole = Math.floor(num / den);
	if (whole < 0) {
		whole++;
		if (whole !== 0) {
			num = Math.abs(num);
		}
	}
	num = num % den;
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	var fraction = "";
	if (whole !== 0) {
		fraction += whole;
	}
	fraction += "\\( \\frac{" + num + "}{" + den + "} \\)";
	problem.question = fraction + " of " + amount;
	return problem;
}

function fractionalChange(num, den, amount, decrease) {
	var problem = {};
	if (decrease) {
		problem.answer = amount - roundError((amount * num) / den);
	} else {
		problem.answer = amount + roundError((amount * num) / den);
	}
	var whole = Math.floor(num / den);
	if (whole < 0) {
		whole++;
		if (whole !== 0) {
			num = Math.abs(num);
		}
	}
	num = num % den;
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	var fraction = "";
	if (whole !== 0) {
		fraction += whole;
	}
	fraction += "\\frac{" + num + "}{" + den + "}";
	if (decrease) {
		problem.question =
			"Decrease \\(" + amount + "\\) by \\(" + fraction + "\\)";
	} else {
		problem.question =
			"Increase \\(" + amount + "\\) by \\(" + fraction + "\\)";
	}
	return problem;
}

function percentageOfAmount(percentage, amount) {
	var problem = {};
	problem.question =
		"<div>Find \\(" + percentage + "\\)% of \\(" + amount + "\\)</div>";
	problem.answer = "\\(" + roundError((percentage * amount) / 100) + "\\)";
	problem.typedAnswer = roundError((percentage * amount) / 100);
	return problem;
}

function percentageIncreaseDecrease(percentage, amount, increase, reverse) {
	var problem = {};
	if (increase) {
		var newAmount = roundError(amount + (percentage * amount) / 100);
	} else {
		newAmount = roundError(amount - (percentage * amount) / 100);
	}
	if (!reverse) {
		if (increase) {
			problem.question = "Increase " + amount + " by " + percentage + "%";
		} else {
			problem.question = "Decrease " + amount + " by " + percentage + "%";
		}
		problem.answer = newAmount;
	} else {
		problem.question = "<div>An amount was ";
		if (increase) {
			problem.question += "increased";
		} else {
			problem.question += "decreased";
		}
		problem.question += " by " + percentage + "% to " + newAmount + ".<br>";
		problem.question += "What was the original amount?</div>";
		problem.answer = amount;
	}
	return problem;
}

function percentageMultipliers(percentage, type) {
	var problem = {};
	problem.question = "<div>";
	switch (type) {
		case 0:
			problem.question +=
				"What would you multiply by to find " + percentage + "% of an amount?";
			problem.answer = roundError(percentage / 100);
			break;
		case 1:
			problem.question +=
				"What would you multiply by to increase an amount by " +
				percentage +
				"%?";
			problem.answer = roundError((100 + percentage) / 100);
			break;
		case 2:
			problem.question +=
				"What would you multiply by to decrease an amount by " +
				percentage +
				"%?";
			problem.answer = roundError((100 - percentage) / 100);
			break;
	}
	problem.question += "</div>";
	return problem;
}

function percentageChange(oldAmount, newAmount) {
	var problem = {};
	problem.question = "<div>";
	if (oldAmount > newAmount) {
		problem.question +=
			"An amount was decreased from " + oldAmount + " to " + newAmount + ".";
		problem.question += "<br>Work out the percentage decrease.";
	} else {
		problem.question +=
			"An amount was increased from " + oldAmount + " to " + newAmount + ".";
		problem.question += "<br>Work out the percentage increase.";
	}
	problem.answer =
		roundError((100 * Math.abs(oldAmount - newAmount)) / oldAmount) + "%";
	problem.question += "</div>";
	return problem;
}

function repeatedPercentageChange(
	originalAmount,
	percentage,
	iterations,
	increase,
) {
	var problem = {};
	var units = ["second", "minute", "hour", "day", "week", "year"];
	var timeUnit = units[getRandom(0, units.length - 1)];
	var newAmount;
	problem.question = "<div>";
	if (increase) {
		problem.question +=
			"An amount of " +
			originalAmount +
			" is increased by " +
			percentage +
			"% every " +
			timeUnit +
			".<br>";
		problem.question +=
			"How much will it be worth after " + iterations + " " + timeUnit + "s?";
		newAmount = originalAmount * Math.pow(1 + percentage / 100, iterations);
	} else {
		problem.question +=
			"An amount of " +
			originalAmount +
			" is decreased by " +
			percentage +
			"% every " +
			timeUnit +
			".<br>";
		problem.question +=
			"How much will it be worth after " + iterations + " " + timeUnit + "s?";
		newAmount = originalAmount * Math.pow(1 - percentage / 100, iterations);
	}
	problem.question += "</div>";
	problem.answer = Math.round(100 * newAmount) / 100;
	return problem;
}

function halving(x) {
	var problem = {};
	problem.question = "<div>Find half of " + x + ".</div>";
	problem.answer = roundError(x / 2);
	return problem;
}

function doubling(x) {
	var problem = {};
	problem.question = "<div>Double " + x + ".</div>";
	problem.answer = roundError(x * 2);
	return problem;
}

function rounding(x, accuracy) {
	var problem = {};
	var suffix = accuracy;
	if (accuracy === 1) {
		suffix = "the nearest whole number";
	}
	if (accuracy > 1) {
		suffix = "the nearest \\(" + accuracy + "\\)";
	}
	if (accuracy < 1) {
		suffix = -Math.round(Math.log(accuracy) / Math.log(10)) + " d.p";
	}
	problem.question = "<div>Round \\(" + x + "\\) to " + suffix + "</div>";
	problem.answer = roundError(Math.round(x / accuracy) * accuracy);
	if (accuracy < 1) {
		problem.answer = problem.answer.toFixed(
			-Math.round(Math.log(accuracy) / Math.log(10)),
		);
	}
	return problem;
}

function sigFigs(x, accuracy) {
	var problem = {};
	problem.question = "Round " + x + " to " + accuracy + " s.f";
	problem.answer = x.toPrecision(accuracy) - 0;
	return problem;
}

function ratioShare(amount, ratio) {
	var problem = {};
	problem.answer = "";
	var parts = 0;
	problem.question = "<div>Share \\(" + amount + "\\) in the ratio \\(";
	for (var i = 0; i < ratio.length; i++) {
		parts += ratio[i];
		problem.question += ratio[i] + ":";
	}
	problem.question = problem.question.slice(0, -1);
	problem.question += "\\)</div>";
	var amountPerPart = amount / parts;
	for (i = 0; i < ratio.length; i++) {
		problem.answer += ratio[i] * amountPerPart + ":";
	}
	problem.answer = problem.answer.slice(0, -1);
	problem.typedAnswer = problem.answer;
	problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
	return problem;
}

function ratioReverse(amount, ratio) {
	var problem = {};
	problem.answer = "";
	var parts = 0;
	problem.question = "<div>An amount was shared in the ratio \\(";
	for (var i = 0; i < ratio.length; i++) {
		parts += ratio[i];
		problem.question += ratio[i] + ":";
	}
	problem.question = problem.question.slice(0, -1);
	problem.question += "\\).</div>";
	var amountPerPart = amount / parts;
	switch (getRandom(0, 3)) {
		case 0:
			problem.question +=
				"<div>The largest share was \\(" +
				Math.max.apply(Math, ratio) * amountPerPart +
				"\\).</div>";
			problem.question += "<div>What was the smallest share?</div>";
			problem.answer = Math.min.apply(Math, ratio) * amountPerPart;
			break;
		case 1:
			problem.question +=
				"<div>The smallest share was \\(" +
				Math.min.apply(Math, ratio) * amountPerPart +
				"\\).</div>";
			problem.question += "<div>What was the largest share?</div>";
			problem.answer = Math.max.apply(Math, ratio) * amountPerPart;
			break;
		case 2:
			problem.question +=
				"<div>The largest share was \\(" +
				Math.max.apply(Math, ratio) * amountPerPart +
				"\\).</div>";
			problem.question += "<div>What was the total amount shared?</div>";
			problem.answer = amount;
			break;
		case 3:
			problem.question +=
				"<div>The smallest share was \\(" +
				Math.min.apply(Math, ratio) * amountPerPart +
				"\\).</div>";
			problem.question += "<div>What was the total amount shared?</div>";
			problem.answer = amount;
			break;
	}
	problem.typedAnswer = problem.answer;
	problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
	return problem;
}

function ratioDifference(amount, ratio) {
	var problem = {};
	problem.answer = "";
	var parts = 0;
	var person = [];
	var ratioDisp = "";
	var seed = getRandom(0, 20);
	for (var i = 0; i < ratio.length; i++) {
		parts += ratio[i];
		ratioDisp += ratio[i] + ":";
		person.push(namePicker(i + seed));
	}
	ratioDisp = ratioDisp.slice(0, -1);
	var amountPerPart = amount / parts;
	if (ratio.length < 3) {
		problem.question =
			"<div>" +
			person[0].name +
			" and " +
			person[1].name +
			" shared some money in the ratio \\(" +
			ratioDisp +
			"\\).</div>";
	} else {
		problem.question =
			"<div>" +
			person[0].name +
			", " +
			person[1].name +
			" and " +
			person[2].name +
			" shared some money in the ratio \\(" +
			ratioDisp +
			"\\).</div>";
	}
	do {
		var c1 = getRandom(0, ratio.length - 1);
		var c2 = getRandom(0, ratio.length - 1);
	} while (c1 === c2);
	var c3 = getRandom(0, ratio.length - 1);
	var c1Amount = ratio[c1] * amountPerPart;
	var c2Amount = ratio[c2] * amountPerPart;
	var diff = c2Amount - c1Amount;
	if (diff < 0) {
		var adj = "more than";
	} else if (diff > 0) {
		adj = "less than";
	} else {
		adj = "the same as";
	}
	problem.question +=
		"<div>" +
		person[c1].name +
		" gets &pound;\\(" +
		Math.abs(diff) +
		"\\) " +
		adj +
		" " +
		person[c2].name +
		".</div>";
	problem.question +=
		"<div>How much does " + person[c3].name + " receive?</div>";
	problem.answer = "&pound;" + ratio[c3] * amountPerPart;
	problem.typedAnswer = problem.answer;
	problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
	return problem;
}

function convertFDP(type, num, den) {
	var problem = {};
	var decimal = "\\(" + roundError(num / den) + "\\)";
	var percentage = "\\(" + roundError((num / den) * 100) + "\\)";
	num = roundError(num);
	den = roundError(den);
	var whole = Math.floor(num / den);
	if (whole < 0) {
		whole++;
		if (whole != 0) {
			num = Math.abs(num);
		}
	}
	num = num % den;
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	var fraction = "\\(";
	var typedFraction = "";
	if (whole != 0) {
		fraction += whole;
		typedFraction += whole;
	}
	if (whole != 0 && num != 0) {
		typedFraction += " ";
	}
	if (num != 0) {
		fraction += "\\frac{" + num + "}{" + den + "}";
		typedFraction += num + "/" + den;
	}
	if (whole == 0 && num == 0) {
		fraction += "0";
		typedFraction = "0";
	}
	fraction += "\\)";
	problem.question = "Write ";
	switch (type) {
		case "PD":
			problem.question += percentage + "% as a decimal.";
			problem.answer = decimal;
			break;
		case "DP":
			problem.question += decimal + " as a percentage.";
			problem.answer = percentage + "%";
			break;
		case "DF":
			problem.question += decimal + " as a fraction.";
			problem.answer = fraction;
			problem.typedAnswer = typedFraction;
			break;
		case "PF":
			problem.question += percentage + "% as a fraction.";
			problem.answer = fraction;
			problem.typedAnswer = typedFraction;
			break;
		case "FD":
			problem.question += fraction + " as a decimal.";
			problem.answer = decimal;
			break;
		case "FP":
			problem.question += fraction + " as a percentage.";
			problem.answer = percentage + "%";
			break;
	}
	return problem;
}

function collectingTerms(letters, variables, coeff, mixed) {
	var problem = {};
	var totalTerms = coeff.length;
	problem.question = "<div>Simplify fully</div><div>\\(";
	for (var i = 0; i < totalTerms; i++) {
		if (coeff[i] > 0 && i > 0) {
			problem.question += " + ";
		}
		if (coeff[i] < 0) {
			problem.question += " - ";
		}
		if (Math.abs(coeff[i]) > 1) {
			problem.question += Math.abs(coeff[i]);
		}
		if (coeff[i] !== 0) {
			problem.question += variables[i];
		}
	}
	problem.question += "\\)</div>";
	var collected = new Array();
	for (i = 0; i < letters.length; i++) {
		var count = 0;
		for (var j = 0; j < totalTerms; j++) {
			if (variables[j] === letters[i]) {
				count += coeff[j];
			}
		}
		collected.push(count);
	}
	var answer = "";
	for (i = 0; i < letters.length; i++) {
		if (collected[i] > 0 && i > 0) {
			answer += " + ";
		}
		if (collected[i] < 0) {
			answer += " - ";
		}
		if (Math.abs(collected[i]) > 1) {
			answer += Math.abs(collected[i]);
		}
		if (collected[i] !== 0) {
			answer += letters[i];
		}
	}
	if (answer === "") {
		answer = "0";
	}
	problem.typedAnswer = answer;
	problem.answer = "\\(" + answer + "\\)";
	return problem;
}

function multiplyingTerms(type, negatives) {
	var problem = {};
	var l = [];
	var letters = ["x", "y", "z", "w"];
	for (var i = 0; i < 4; i++) {
		l.push(letters[i]);
	}
	var c = [];
	for (i = 0; i < 4; i++) {
		c.push(getRandom(2, 8 + i));
		if (negatives && toss()) {
			c[i] = -c[i];
		}
	}
	problem.question = "<div>Simplify fully</div><div>\\(";
	if (type > 5) {
		type = 5;
	}
	switch (type) {
		case 0:
			if (toss()) {
				problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1];
			} else {
				problem.question += c[0] + "\\ &#215;\\ " + c[1] + l[0];
			}
			problem.answer = c[0] * c[1] + l[0];
			break;
		case 1:
			if (toss()) {
				problem.question += l[0] + "\\ &#215;\\ " + l[0];
				problem.answer = l[0] + "^2";
				problem.typedAnswer = l[0] + "^2";
			} else if (toss()) {
				problem.question +=
					l[0] + "\\ &#215;\\ " + l[0] + "\\ &#215;\\ " + l[0];
				problem.answer = l[0] + "^3";
				problem.typedAnswer = l[0] + "^3";
			} else {
				problem.question +=
					l[0] +
					"\\ &#215;\\ " +
					l[0] +
					"\\ &#215;\\ " +
					l[0] +
					"\\ &#215;\\ " +
					l[0];
				problem.answer = l[0] + "^4";
				problem.typedAnswer = l[0] + "^4";
			}
			break;
		case 2:
			if (toss()) {
				problem.question += l[0] + "\\ &#215;\\ " + l[1];
				problem.answer = l[0] + l[1];
			} else {
				problem.question +=
					l[0] + "\\ &#215;\\ " + l[1] + "\\ &#215;\\ " + l[2];
				problem.answer = l[0] + l[1] + l[2];
			}
			break;
		case 3:
			if (toss()) {
				problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1] + l[1];
				problem.answer = c[0] * c[1] + l[0] + l[1];
			} else {
				problem.question += c[0] + l[0] + "\\ &#215;\\ " + c[1] + l[0];
				problem.answer = c[0] * c[1] + l[0] + "^2";
				problem.typedAnswer = c[0] * c[1] + l[0] + "^2";
			}
			break;
		case 4:
			if (toss()) {
				problem.question += c[0] + l[0] + l[1] + "\\ &#215;\\ " + c[1] + l[0];
				problem.answer = c[0] * c[1] + l[0] + "^2" + l[1];
			} else {
				problem.question +=
					c[0] + l[0] + l[1] + "\\ &#215;\\ " + c[1] + l[0] + l[1];
				problem.answer = c[0] * c[1] + l[0] + "^2" + l[1] + "^2";
			}
			break;
		case 5:
			if (toss()) {
				problem.question +=
					c[0] +
					l[0] +
					"^2" +
					l[1] +
					"\\ &#215;\\ " +
					c[1] +
					l[0] +
					"\\ &#215;\\ " +
					l[1] +
					l[2];
				problem.answer = c[0] * c[1] + l[0] + "^3" + l[1] + "^2" + l[2];
			} else {
				problem.question +=
					c[0] +
					l[1] +
					l[2] +
					"\\ &#215;\\ " +
					c[1] +
					l[1] +
					"\\ &#215;\\ " +
					c[2] +
					l[0] +
					l[2];
				problem.answer = c[0] * c[1] * c[2] + l[0] + l[1] + "^2" + l[2] + "^2";
			}
			break;
	}
	problem.question += "\\)</div>";
	problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
	return problem;
}

function factors(maxFactors, minNumber, maxNumber) {
	var problem = {};
	var totalFactors = maxFactors + 1;
	while (totalFactors > maxFactors) {
		totalFactors = 1;
		var answer = "1";
		var x = getRandom(minNumber, maxNumber);
		if (x % 2 === 1 && Math.random() < 0.5 && x < maxNumber) {
			x++;
		}
		for (var i = 2; i <= x; i++) {
			if (x % i === 0) {
				answer += "," + i;
				totalFactors++;
			}
		}
	}
	problem.question = "<div>List all the factors of \\(" + x + "\\).</div>";
	problem.answer = "<div>\\(" + answer + "\\)</div>";
	problem.typedTanswer = answer;
	return problem;
}

function multiples(multiple, x) {
	var problem = {};
	problem.question =
		"<div>Write down the \\(" +
		multiple +
		"\\)<sup>" +
		ordinal(multiple) +
		"</sup> multiple of \\(" +
		x +
		"\\).</div>";
	problem.answer = x * multiple;
	return problem;
}

function hcf(x, y, z) {
	var problem = {};
	if (z) {
		problem.question =
			"Find the highest common factor of " + x + ", " + y + " and " + z + ".";
		problem.answer = HCF(HCF(x, y), z);
	} else {
		problem.question =
			"Find the highest common factor of " + x + " and " + y + ".";
		problem.answer = HCF(x, y);
	}
	return problem;
}

function lcm(x, y, z) {
	var problem = {};
	if (z) {
		var temp = (x * y) / HCF(x, y);
		problem.question =
			"Find the lowest common multiple of " + x + ", " + y + " and " + z + ".";
		problem.answer = (temp * z) / HCF(temp, z);
	} else {
		problem.question =
			"Find the lowest common multiple of " + x + " and " + y + ".";
		problem.answer = (x * y) / HCF(x, y);
	}
	return problem;
}

function simplifyingRatios(terms, maxPrime) {
	var problem = {};
	var simplifiedRatio = Array(terms);
	var ratio = new Array(terms);
	var multiplier = getRandom(2, maxPrime);
	for (var i = 0; i < ratio.length; i++) {
		simplifiedRatio[i] = getRandom(1, maxPrime);
		while (!isPrime(simplifiedRatio[i])) {
			simplifiedRatio[i] = getRandom(1, maxPrime);
		}
		ratio[i] = simplifiedRatio[i] * multiplier;
	}
	while (simplifiedRatio[0] === simplifiedRatio[1]) {
		simplifiedRatio[1] = getRandom(1, maxPrime);
		while (!isPrime(simplifiedRatio[1])) {
			simplifiedRatio[1] = getRandom(1, maxPrime);
		}
		ratio[1] = simplifiedRatio[1] * multiplier;
	}
	problem.question = "<div>Simplify fully</div><div>\\(";
	problem.answer = "<div>\\(";
	problem.typedAnswer = "";
	for (i = 0; i < ratio.length - 1; i++) {
		problem.question += ratio[i] + ":";
		problem.typedAnswer += simplifiedRatio[i] + ":";
		problem.answer += simplifiedRatio[i] + ":";
	}
	problem.question += ratio[i] + "\\)</div>";
	problem.typedAnswer += simplifiedRatio[i];
	problem.answer += simplifiedRatio[i] + "\\)</div>";
	return problem;
}

function simplifyingFractions(maxPrime) {
	var problem = {};
	var numerator = getRandom(1, maxPrime / 2);
	var denominator = getRandom(2, maxPrime);
	while (denominator <= numerator || HCF(numerator, denominator) !== 1) {
		denominator = getRandom(1, maxPrime);
	}
	var multiplier = Math.max(2, getRandom(maxPrime / 4, maxPrime));
	problem.question =
		"Simplify fully \\( \\frac{" +
		numerator * multiplier +
		"}{" +
		denominator * multiplier +
		"} \\)";
	problem.answer = "\\( \\frac{" + numerator + "}{" + denominator + "}\\)";
	problem.typedAnswer = numerator + "/" + denominator;
	return problem;
}

function nthTermFinding(a, b, c) {
	var problem = {};
	var terms = [];
	for (var i = 1; i < 5; i++) {
		terms.push(roundError(a * i * i + b * i + c));
	}
	problem.question =
		"<div>Find the \\(n^{th} \\text{ term}\\) rule for the sequence:</div><div>\\(";
	for (var i = 0; i < terms.length; i++) {
		problem.question += terms[i] + ", ";
	}
	problem.question += "...\\)</div>";
	problem.answer = "n\\(^{th} \\text{ term} = ";
	problem.typedAnswer = "";
	var firstTerm = true;
	problem.answer += fixTerm(a, "n^2", firstTerm);
	problem.typedAnswer += fixTerm(a, "n^2", firstTerm);
	if (a !== 0) {
		firstTerm = false;
	}
	problem.answer += fixTerm(b, "n", firstTerm);
	problem.typedAnswer += fixTerm(b, "n", firstTerm);
	if (b !== 0) {
		firstTerm = false;
	}
	problem.answer += fixTerm(c, "", firstTerm) + "\\)";
	problem.answer = "<div>" + problem.answer + "</div>";
	problem.typedAnswer += fixTerm(c, "", firstTerm);
	return problem;
}

function sequencesNextTerm(a, b, c) {
	var problem = {};
	var terms = [];
	var sequence = "<div>Find the next term in this sequence:</div><div>\\(";
	for (var i = 1; i < 5; i++) {
		terms.push(roundError(a * i * i + b * i + c));
		sequence += terms[i - 1] + ",\\ ";
	}
	sequence += " ?\\)</div>";
	problem.question = sequence;
	problem.answer = a * 5 * 5 + b * 5 + c;
	return problem;
}

function nthTermGenerating(a, b, c) {
	var problem = {};
	var term = getRandom(1, 10);
	var nthTerm = "";
	var firstTerm = true;
	nthTerm += fixTerm(a, "n^2", firstTerm);
	if (a !== 0) {
		firstTerm = false;
	}
	nthTerm += fixTerm(b, "n", firstTerm);
	if (b !== 0) {
		firstTerm = false;
	}
	nthTerm += fixTerm(c, "", firstTerm);
	var terms = [];
	for (var i = 1; i <= 5; i++) {
		terms.push(a * i * i + b * i + c);
	}
	problem.question = "<div>\\(n^{th}\\text{ term} = " + nthTerm + "\\)</div>";
	problem.question += "<div>List the first five terms of the sequence.</div>";
	problem.answer = "\\(" + terms + "\\)";
	problem.typedAnswer = terms;
	return problem;
}

function nthTermSpecificTerm(a, b, c, n) {
	var problem = {};
	var nthTerm = "";
	var firstTerm = true;
	nthTerm += fixTerm(a, "n^2", firstTerm);
	if (a !== 0) {
		firstTerm = false;
	}
	nthTerm += fixTerm(b, "n", firstTerm);
	if (b !== 0) {
		firstTerm = false;
	}
	nthTerm += fixTerm(c, "", firstTerm);
	var terms = a * n * n + b * n + c;
	problem.question =
		"<div>The \\(n^{th}\\) term of a sequence is given by the rule \\(" +
		nthTerm +
		"\\).</div>";
	problem.question +=
		"<div>Find the " +
		n +
		"<sup>" +
		ordinal(n) +
		"</sup> term of the sequence.</div>";
	problem.answer = "\\(" + terms + "\\)";
	problem.typedAnswer = terms;
	return problem;
}

function addingCoins(coins) {
	var problem = {};
	var coin = new Array(
		"1p",
		"2p",
		"5p",
		"10p",
		"20p",
		"50p",
		"&pound;1",
		"&pound;2",
	);
	var value = new Array(1, 2, 5, 10, 20, 50, 100, 200);
	var quantity = new Array(0, 0, 0, 0, 0, 0, 0, 0);
	var total = 0;
	var coinsUsed = 0;
	var plural = "";
	for (var i = 0; i < coins; i++) {
		quantity[Math.floor(Math.random() * coin.length)] += 1;
	}
	problem.question = "<div>Add together:<br>";
	var singleValue = true;
	for (i = 0; i < coin.length; i++) {
		if (quantity[i] > 0) {
			if (quantity[i] > 1) {
				plural = "'s";
			} else {
				plural = "";
			}
			coinsUsed += quantity[i];
			if (coinsUsed === coins && !singleValue) {
				problem.question +=
					"and " + wordedNumber(quantity[i]) + " " + coin[i] + plural + ". ";
			} else {
				problem.question +=
					wordedNumber(quantity[i]) + " " + coin[i] + plural + ", ";
			}
			singleValue = false;
		}
		total += value[i] * quantity[i];
	}
	problem.question = problem.question.slice(0, -2);
	problem.question += ".</div>";
	problem.answer = toPounds(total);
	problem.typedAnswer = (total / 100).toFixed(2);
	return problem;
}

function countingCoins(quantity) {
	var problem = {};
	var coin = new Array("2p", "5p", "10p", "20p", "50p", "&pound;2");
	var value = new Array(2, 5, 10, 20, 50, 200);
	var currentCoin = Math.floor(Math.random() * coin.length);
	var total = quantity * value[currentCoin];
	problem.question =
		"<div>How many " +
		coin[currentCoin] +
		" coins are in " +
		toPounds(total) +
		"?</div>";
	problem.answer = quantity;
	return problem;
}

function speedDistTime(speed, time, type) {
	var problem = {};
	var distanceUnit = "m";
	var timeUnit = "s";
	if (Math.random() < 0.5) {
		distanceUnit = "km";
		timeUnit = "h";
	}
	var speedUnit = distanceUnit + "/" + timeUnit;
	var distance = speed * time;
	problem.question = "<div>";
	switch (type) {
		case 0:
			problem.question +=
				"An object travels at " +
				speed +
				" " +
				speedUnit +
				" for " +
				time +
				" " +
				timeUnit +
				".<br>How far does it travel?";
			problem.answer = distance + " " + distanceUnit;
			problem.typedAnswer = distance + " " + distanceUnit;
			break;
		case 1:
			problem.question +=
				"An object travels at " +
				speed +
				" " +
				speedUnit +
				" for " +
				distance +
				" " +
				distanceUnit +
				".<br>How long did it take?";
			problem.answer = time + " " + timeUnit;
			problem.typedAnswer = time + timeUnit;
			break;
		case 2:
			problem.question +=
				"An object travels " +
				distance +
				" " +
				distanceUnit +
				" in " +
				time +
				" " +
				timeUnit +
				".<br>What speed was it travelling?";
			problem.answer = speed + " " + speedUnit;
			problem.typedAnswer = speed + speedUnit;
			break;
	}
	problem.question += "</div>";
	return problem;
}

function powersAndRoots(x, a, b) {
	var problem = {};
	problem.question = "<div>\\(";
	if (a === 0) {
		problem.question += x + "^{" + a + "}";
	} else if (b === 2 && a === 1) {
		problem.question += "\\sqrt{" + x + "}";
	} else if (b === 3 && a === 1) {
		problem.question += "\\sqrt[3]{" + x + "}";
	} else if (b !== 1) {
		if (a < 0) {
			problem.question += x + "^{-\\frac{" + Math.abs(a) + "}{" + b + "}}";
		} else {
			problem.question += x + "^{\\frac{" + a + "}{" + b + "}}";
		}
	} else {
		problem.question += x + "^{" + a + "}";
	}
	problem.question += "\\)</div>";
	if (a < 0 && x !== 1) {
		x = roundError(Math.pow(x, Math.abs(a) / b));
		problem.answer = "\\( \\frac{1}{" + x + "}\\)";
		problem.typedAnswer = 1 + "/" + x;
	} else {
		x = roundError(Math.pow(x, a / b));
		problem.answer = "\\(" + x + "\\)";
	}
	return problem;
}

function ordering(length, decimal, negative, descending, range) {
	var list = new Array(length);
	var problem = {};
	var sequence = "";
	for (var i = 0; i < list.length; i++) {
		list[i] = Math.floor(Math.random() * range);
		if (decimal) {
			list[i] /= Math.pow(10, getRandom(0, 2));
		}
		if (negative) {
			list[i] = -list[i];
		}
	}
	problem.question = "<div>Write in ";
	if (descending) {
		problem.question += "descending";
	} else {
		problem.question += "ascending";
	}
	problem.question += " order:</div><div>\\(";
	for (i = 0; i < list.length - 1; i++) {
		problem.question += list[i] + ", ";
	}
	problem.question += list[i];
	if (descending) {
		list.sort(function (a, b) {
			return b - a;
		});
	} else {
		list.sort(function (a, b) {
			return a - b;
		});
	}
	for (i = 0; i < list.length - 1; i++) {
		sequence += list[i] + ", ";
	}
	sequence += list[i];
	problem.question += "\\)</div>";
	problem.answer = "<div>\\(" + list + "\\)</div>";
	return problem;
}

function oneStepEquations(type, x, answer, inequality) {
	var problem = {};
	var letter = "x";
	var side1, side2;
	var symbol = "=";
	if (inequality) {
		switch (getRandom(0, 3)) {
			case 0:
				symbol = "&lt;";
				break;
			case 1:
				symbol = "&le;";
				break;
			case 2:
				symbol = "&gt;";
				break;
			case 3:
				symbol = "&ge;";
				break;
		}
		if (type === 7) {
			type = getRandom(0, 4);
		}
	}
	switch (type) {
		case 0:
			side1 = letter + " + " + x;
			side2 = x + answer;
			break;
		case 1:
			side1 = x + " + " + letter;
			side2 = x + answer;
			break;
		case 2:
			side1 = x + letter;
			side2 = x * answer;
			break;
		case 3:
			side1 = letter + " - " + x;
			side2 = answer - x;
			break;
		case 4:
			side1 = x + " - " + letter;
			side2 = x - answer;
			break;
		case 5:
			side1 = "\\frac{" + letter + "}{" + x + "}";
			side2 = answer / x;
			break;
		case 6:
			side1 = "\\frac{" + x + "}{" + letter + "}";
			side2 = x / answer;
			break;
		case 7:
			side1 = letter + "^" + x + "";
			side2 = Math.pow(answer, x);
			break;
	}
	side2 = roundError(side2);
	problem.question = "<div>Solve:</div><div>" + "\\(";
	if (Math.random() < 0.5 || inequality) {
		problem.question += side1 + " " + symbol + " " + side2;
	} else {
		problem.question += side2 + " " + symbol + " " + side1;
	}
	problem.question += "\\)</div>";
	answer = roundError(answer);
	if (!inequality) {
		problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
		problem.typedAnswer = letter + symbol + answer;
	} else {
		problem.answer = "\\(" + answer + "\\)";
	}
	return problem;
}

function twoStepEquations(type, x, y, answer, inequality) {
	var problem = {};
	var letter = "x";
	var side1, side2;
	var symbol = "=";
	if (inequality) {
		switch (getRandom(0, 3)) {
			case 0:
				symbol = "&lt;";
				break;
			case 1:
				symbol = "&le;";
				break;
			case 2:
				symbol = "&gt;";
				break;
			case 3:
				symbol = "&ge;";
				break;
		}
		if (type > 6) {
			type = getRandom(0, 6);
		}
	}
	switch (type) {
		case 0:
			side1 = x + letter + " + " + y;
			side2 = answer * x + y;
			break;
		case 1:
			side1 = x + letter + " - " + y;
			side2 = answer * x - y;
			break;
		case 2:
			side1 = y + " + " + x + letter;
			side2 = answer * x + y;
			break;
		case 3:
			side1 = "\\frac{" + letter + "}{" + x + "} + " + y;
			side2 = answer / x + y;
			break;
		case 4:
			side1 = "\\frac{" + letter + "}{" + x + "} - " + y;
			side2 = answer / x - y;
			break;
		case 5:
			side1 = y + " + \\frac{" + letter + "}{" + x + "}";
			side2 = answer / x + y;
			break;
		case 6:
			side1 = y + " - " + x + letter;
			side2 = -(answer * x - y);
			break;
		case 7:
			side1 = letter + "^" + x + " + " + y;
			side2 = Math.pow(answer, x) + y;
			break;
		case 8:
			side1 = letter + "^" + x + " - " + y;
			side2 = Math.pow(answer, x) - y;
			break;
	}
	side2 = roundError(side2);
	problem.question = "<div>Solve:</div><div>" + "\\(";
	if (Math.random() < 0.5 || inequality) {
		problem.question += side1 + " " + symbol + " " + side2;
	} else {
		problem.question += side2 + " " + symbol + " " + side1;
	}
	problem.question += "\\)</div>";
	answer = roundError(answer);
	if (!inequality) {
		problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
		problem.typedAnswer = letter + symbol + answer;
	} else {
		problem.answer = "\\(" + answer + "\\)";
	}
	return problem;
}

function threeStepEquations(x, y, z, answer, reversable, inequality) {
	var problem = {};
	var letter = "x";
	var side1, side2;
	var symbol = "=";
	if (inequality) {
		switch (getRandom(0, 3)) {
			case 0:
				symbol = "&lt;";
				break;
			case 1:
				symbol = "&le;";
				break;
			case 2:
				symbol = "&gt;";
				break;
			case 3:
				symbol = "&ge;";
				break;
		}
	}
	if (reversable && Math.random() < 0.5) {
		side1 = fixTerm(z, "", true) + fixTerm(x + y, letter, false);
	} else {
		side1 = fixTerm(x + y, letter, true) + fixTerm(z, "", false);
	}
	if (reversable && Math.random() < 0.5) {
		side2 =
			fixTerm(roundError(x * answer + z), "", true) + fixTerm(y, letter, false);
	} else {
		side2 =
			fixTerm(y, letter, true) + fixTerm(roundError(x * answer + z), "", false);
	}
	problem.question = "<div>Solve:</div><div>" + "\\(";
	if ((reversable && Math.random() < 0.5) || inequality) {
		problem.question += side1 + " " + symbol + " " + side2;
	} else {
		problem.question += side2 + " " + symbol + " " + side1;
	}
	problem.question += "\\)</div>";
	answer = roundError(answer);
	if (!inequality) {
		problem.answer = "\\(" + letter + " " + symbol + " " + answer + "\\)";
		problem.typedAnswer = letter + symbol + answer;
	} else {
		problem.answer = "\\(" + answer + "\\)";
	}
	return problem;
}

function equationsWithBrackets(x, y, z, answer, reversable) {
	var problem = {};
	var letter = "x";
	var side1, side2;
	if (reversable) {
		side1 =
			fixTerm(x, "", true) +
			"(" +
			fixTerm(z, "", true) +
			fixTerm(y, letter, false) +
			")";
	} else {
		side1 =
			fixTerm(x, "", true) +
			"(" +
			fixTerm(y, letter, true) +
			fixTerm(z, "", false) +
			")";
	}
	side2 = roundError(x * (y * answer + z));
	problem.question = "<div>Solve:</div><div>\\(";
	if (Math.random() < 0.5 && reversable) {
		problem.question += side2 + " = " + side1;
	} else {
		problem.question += side1 + " = " + side2;
	}
	problem.question += "\\)</div>";
	answer = roundError(answer);
	problem.answer = "\\(" + letter + " = " + answer + "\\)";
	problem.typedAnswer = letter + "=" + answer;
	return problem;
}

function equationsWithBracketsBoth(a, b, c, d, e, f, answer, reversable) {
	var problem = {};
	var letter = "x";
	var side1, side2;
	if (reversable) {
		side1 =
			fixTerm(a, "", true) +
			"(" +
			fixTerm(c, "", true) +
			fixTerm(b, letter, false) +
			")";
	} else {
		side1 =
			fixTerm(a, "", true) +
			"(" +
			fixTerm(b, letter, true) +
			fixTerm(c, "", false) +
			")";
	}
	side2 =
		fixTerm(d, "", true) +
		"(" +
		fixTerm(e, letter, true) +
		fixTerm(f, "", false) +
		")";
	problem.question = "<div>Solve:</div><div>" + "\\(";
	if (Math.random() < 0.5 && reversable) {
		problem.question += side2 + " = " + side1;
	} else {
		problem.question += side1 + " = " + side2;
	}
	problem.question += "\\)</div>";
	answer = roundError(answer);
	problem.answer = "\\(" + letter + " = " + answer + "\\)";
	problem.typedAnswer = letter + "=" + answer;
	return problem;
}

function equationsIfThen(type, a, b, rhs) {
	var problem = {};
	var letter = "x";
	var e1 = "";
	var e2 = "";
	var ans = 0;
	switch (type) {
		case 0:
			e1 = a + letter + "=" + rhs;
			e2 = a + letter + "+" + b;
			ans = rhs + b;
			break;
		case 1:
			e1 = a + letter + "=" + rhs;
			e2 = a + letter + "-" + b;
			ans = rhs - b;
			break;
		case 2:
			var mults = [2, 10];
			var m = mults[getRandom(0, mults.length - 1)];
			e1 = a + letter + "=" + rhs;
			e2 = m * a + letter;
			ans = rhs * m;
			break;
		case 3:
			e1 = a + letter + "=" + rhs;
			e2 = a / 2 + letter;
			ans = rhs / 2;
			break;
		case 4:
			e1 = a + letter + "=" + rhs;
			e2 = a + "(" + letter + "+" + 1 + ")";
			ans = rhs + a;
			break;
		case 5:
			e1 = a + letter + "=" + rhs;
			e2 = a + "(" + letter + "-" + 1 + ")";
			ans = rhs - a;
			break;
		case 6:
			e1 = a + letter + "=" + rhs;
			e2 = -a + letter + "+" + b;
			ans = -rhs + b;
			break;
		case 7:
			e1 = a + letter + "=" + rhs;
			e2 = -a + letter + "-" + b;
			ans = -rhs - b;
			break;
		case 8:
			e1 = a + letter + "=" + rhs;
			e2 = -a + "(" + letter + "+" + 1 + ")";
			ans = -rhs - a;
			break;
		case 9:
			e1 = a + letter + "=" + rhs;
			e2 = -a + "(" + letter + "-" + 1 + ")";
			ans = -rhs + a;
			break;
	}
	var answer = e2 + "=" + ans;
	e2 += "=\\text{ }?";
	problem.question = "<div>If \\(" + e1 + "\\),</div>";
	problem.question += "<div>then \\(" + e2 + "\\)</div>";
	problem.answer = "\\(" + answer + "\\)";
	return problem;
}

function numberBonds(type, bond, x) {
	var problem = {};
	var data = "";
	switch (type) {
		case 0:
			data = x + " + ? = " + bond;
			break;
		case 1:
			data = "? + " + x + " = " + bond;
			break;
		case 2:
			data = bond + " &minus; " + " ? = " + x;
			break;
		case 3:
			data = bond + " &minus; " + x + " = ?";
			break;
		case 4:
			data = bond + " + " + x + "+? = " + 2 * bond;
			break;
		case 5:
			data = bond + " + " + "? + " + x + " = " + 2 * bond;
			break;
		case 6:
			data = 2 * bond + " - " + "? = " + bond + "+" + x;
			break;
		case 7:
			data = 2 * bond + " - " + x + " = " + bond + "+?";
			break;
	}
	problem.question = "\\(" + data + "\\)";
	problem.answer = "\\(" + roundError(bond - x) + "\\)";
	problem.typedAnswer = roundError(bond - x);
	return problem;
}

function tableBonds(type, a, b, c, d) {
	var problem = {};
	var question = "";
	var answer = "";
	switch (type) {
		case 0:
			question =
				a * b +
				"\\text{ }&times;\\text{ }" +
				c * d +
				"\\text{ }=\\text{ }" +
				a * c +
				"\\text{ }&times\\text{ }" +
				" ?";
			answer = b * d;
			break;
		case 1:
			question =
				a * b +
				"\\text{ }&times;\\text{ }" +
				c * d +
				"\\text{ }=\\text{ }?\\text{ }&times\\text{ }" +
				b * c;
			answer = a * d;
			break;
		case 2:
			question =
				a * b +
				"\\text{ }&times;\\text{ }?\\text{ }=\\text{ }" +
				a * c +
				"\\text{ }&times\\text{ }" +
				b * d;
			answer = c * d;
			break;
		case 3:
			question =
				"?\\text{ }&times;\\text{ }" +
				c * d +
				"\\text{ }=\\text{ }" +
				a * c +
				"\\text{ }&times\\text{ }" +
				b * d;
			answer = a * b;
			break;
	}
	problem.question = "\\(" + question + "\\)";
	problem.answer = "\\(" + answer + "\\)";
	return problem;
}

function fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2) {
	var problem = {};
	if (w1 === 0) {
		w1 = "";
	}
	if (w2 === 0) {
		w2 = "";
	}
	if (w3 === 0) {
		w3 = "";
	}
	var f1 = w1 + "\\frac{" + n1 + "}{" + d1 + "}";
	var f2 = w2 + "\\frac{" + n2 + "}{" + d2 + "}";
	var f3 = w3 + "\\frac{" + n3 + "}{" + d3 + "}";
	n1 = w1 * d1 + n1;
	n2 = w2 * d2 + n2;
	n3 = w3 * d3 + n3;
	if (o1 == "+") {
		var num = n1 * d2 + n2 * d1;
		var den = d1 * d2;
	} else if (o1 == "-") {
		num = n1 * d2 - n2 * d1;
		den = d1 * d2;
	} else if (o1 == "&#215;") {
		num = n1 * n2;
		den = d1 * d2;
	} else if (o1 == "&divide;") {
		num = n1 * d2;
		den = d1 * n2;
	}
	if (o2 == "+") {
		num = num * d3 + n3 * den;
		den *= d3;
	} else if (o2 == "-") {
		num = num * d3 - n3 * den;
		den *= d3;
	} else if (o2 == "&#215;") {
		num = num * n3;
		den = den * d3;
	} else if (o2 == "&divide;") {
		num = num * d3;
		den = den * n3;
	}
	problem.question = "\\( " + f1 + "\\ " + o1 + "\\ " + f2;
	if (o2) {
		problem.question += "\\ " + o2 + "\\ " + f3;
	}
	problem.question += "\\)";
	var whole = Math.floor(num / den);
	if (whole < 0) {
		whole++;
		if (whole != 0) {
			num = Math.abs(num);
		}
	}
	num = num % den;
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	problem.answer = "\\(";
	problem.typedAnswer = "";
	if (whole != 0) {
		problem.answer += whole;
		problem.typedAnswer += whole;
	}
	if (whole != 0 && num != 0) {
		problem.typedAnswer += " ";
	}
	if (num != 0) {
		problem.answer += "\\frac{" + num + "}{" + den + "}";
		problem.typedAnswer += num + "/" + den;
	}
	if (whole == 0 && num == 0) {
		problem.answer += "0";
		problem.typedAnswer = "0";
	}
	problem.answer += "\\)";
	return problem;
}

function mean(data) {
	var problem = {};
	var total = 0;
	for (var i = 0; i < data.length; i++) {
		total += data[i];
	}
	var mean = total / data.length;
	problem.question = "<div>Find the mean of:<br>";
	for (var i = 0; i < data.length; i++) {
		problem.question += data[i] + ", ";
	}
	problem.question = problem.question.slice(0, -2);
	problem.question += "</div>";
	problem.answer = mean;
	return problem;
}

function median(data) {
	var problem = {};
	var median;
	problem.question = "<div>Find the median of:<br>";
	for (var i = 0; i < data.length; i++) {
		problem.question += data[i] + ", ";
	}
	problem.question = problem.question.slice(0, -2);
	problem.question += "</div>";
	data.sort(function (a, b) {
		return a - b;
	});
	if (data.length % 2 == 1) {
		median = data[(data.length + 1) / 2 - 1];
	} else {
		median = roundError(
			(data[data.length / 2] + data[data.length / 2 - 1]) / 2,
		);
	}
	problem.answer = median;
	return problem;
}

function range(data) {
	var problem = {};
	problem.question = "<div>Find the range of:</div><div>\\(";
	for (var i = 0; i < data.length - 1; i++) {
		problem.question += data[i] + ",\\ ";
	}
	problem.question += data[i];
	problem.question += "\\)</div>";
	data.sort(function (a, b) {
		return a - b;
	});
	var range = data[data.length - 1] - data[0];
	problem.answer = range;
	return problem;
}

function mode(data) {
	var problem = {};
	problem.question = "<div>Find the mode of:</div>";
	for (var i = 0; i < data.length; i++) {
		problem.question += data[i] + ", ";
	}
	problem.question = problem.question.slice(0, -2);
	problem.question += "</div>";
	var mode = [];
	var count = [];
	var maxFrequency = 1;
	var current = 0;
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data.length; j++) {
			if (data[i] == data[j]) {
				current++;
			}
		}
		count.push(current);
		if (current > maxFrequency) {
			maxFrequency = current;
		}
		current = 0;
	}
	for (var i = 0; i < data.length; i++) {
		if (count[i] == maxFrequency && count[i] > 1) {
			mode.push(data[i]);
		}
	}
	if (!isNaN(mode[0])) {
		mode.sort(function (a, b) {
			return a - b;
		});
	} else {
		mode.sort();
	}
	if (mode.length == 0) {
		problem.answer = "no mode";
	} else {
		var currentMode = "";
		problem.answer = "";
		for (i = 0; i < mode.length; i++) {
			if (mode[i] != currentMode) {
				problem.answer += mode[i] + ", ";
				currentMode = mode[i];
			}
		}
		problem.answer = problem.answer.slice(0, -2);
	}
	return problem;
}

function standardForm(x, y, op) {
	var problem = {};
	var a = {};
	switch (op) {
		case "*":
			op = "\\ &#215;\\ ";
			a.co = x.co * y.co;
			a.pow = x.pow + y.pow;
			break;
		case "/":
			op = "\\ &divide;\\ ";
			a.co = x.co / y.co;
			a.pow = x.pow - y.pow;
			break;
		case "+":
			op = "+";
			a.co = x.co * Math.pow(10, x.pow) + y.co * Math.pow(10, y.pow);
			a.pow = 0;
			break;
		case "-":
			op = "-";
			a.co = x.co * Math.pow(10, x.pow) - y.co * Math.pow(10, y.pow);
			a.pow = 0;
			break;
	}
	problem.question =
		"<div>\\((" +
		x.co +
		"\\ &#215;\\ 10^{" +
		x.pow +
		"}) " +
		op +
		" (" +
		y.co +
		"\\ &#215;\\ 10^{" +
		y.pow +
		"})\\)</div>";
	while (a.co >= 10) {
		a.co /= 10;
		a.pow++;
	}
	while (a.co < 1 && a.co > 0) {
		a.co *= 10;
		a.pow--;
	}
	a.co = roundError(a.co);
	problem.answer =
		"<div>\\(" + a.co + "\\ &#215;\\ 10^{" + a.pow + "}\\)</div>";
	problem.typedAnswer = a.co + "*10^" + a.pow;
	return problem;
}

function convertingStandardForm(x, type) {
	var problem = {};
	problem.question = "<div>";
	switch (type) {
		case 0:
			problem.question +=
				"Write \\(" +
				roundError(x.co * Math.pow(10, x.pow)) +
				"\\) in standard form.";
			checkCo(x);
			problem.answer = roundError(x.co) + "\\ &#215;\\ 10^{" + x.pow + "}";
			problem.typedAnswer = roundError(x.co) + "*10^" + x.pow;
			break;
		case 1:
			problem.question +=
				"Write \\(" +
				roundError(x.co) +
				"\\ &#215;\\ 10^{" +
				x.pow +
				"}\\) as an ordinary number.";
			checkCo(x);
			problem.answer = roundError(x.co * Math.pow(10, x.pow));
			break;
		case 2:
			problem.question +=
				"Write \\(" +
				roundError(x.co) +
				"\\ &#215;\\ 10^{" +
				x.pow +
				"}\\) in standard form.";
			checkCo(x);
			problem.answer = roundError(x.co) + " &#215; 10^{" + x.pow + "}";
			problem.typedAnswer = roundError(x.co) + "*10^" + x.pow;
			break;
	}

	function checkCo(term) {
		while (term.co >= 10) {
			term.co /= 10;
			term.pow++;
		}
		while (term.co < 1 && term.co > 0) {
			term.co *= 10;
			term.pow--;
		}
		roundError(term.co);
		return term;
	}
	problem.question += "</div>";
	problem.answer = "<div>\\(" + problem.answer + "\\)</div>";
	return problem;
}

function convertingFractions(num, den, toMixed) {
	var problem = {};
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	var improper = "\\frac{" + num + "}{" + den + "}";
	var mixed =
		Math.floor(num / den) + "\\frac{" + (num % den) + "}{" + den + "}";
	if (toMixed) {
		problem.question = "Write \\(" + improper + "\\) as a mixed number.";
		problem.answer = "\\(" + mixed + "\\)";
	} else {
		problem.question = "Write \\(" + mixed + "\\) as an improper fraction.";
		problem.answer = "\\(" + improper + "\\)";
	}
	return problem;
}

function convertingMetricLength(m, from, to) {
	var problem = {};
	var unit = new Array("mm", "cm", "m", "km");
	var cm = roundError(m * 100);
	var mm = roundError(cm * 10);
	var km = roundError(m / 1000);
	var value = new Array(mm, cm, m, km);
	problem.question =
		"Convert " + value[from] + " " + unit[from] + " to " + unit[to];
	switch (to) {
		case 0:
			problem.answer = mm;
			break;
		case 1:
			problem.answer = cm;
			break;
		case 2:
			problem.answer = m;
			break;
		case 3:
			problem.answer = km;
			break;
	}
	problem.answer += " " + unit[to];
	return problem;
}

function convertingMetricWeight(kg, from, to) {
	var problem = {};
	var unit = new Array("mg", "g", "kg", "tonnes");
	var g = roundError(kg * 1000);
	var mg = roundError(g * 1000);
	var tonnes = roundError(kg / 1000);
	var value = new Array(mg, g, kg, tonnes);
	problem.question =
		"Convert " + value[from] + " " + unit[from] + " to " + unit[to];
	switch (to) {
		case 0:
			problem.answer = mg;
			break;
		case 1:
			problem.answer = g;
			break;
		case 2:
			problem.answer = kg;
			break;
		case 3:
			problem.answer = tonnes;
			break;
	}
	problem.answer += " " + unit[to];
	return problem;
}

function convertingMetricVolume(l, from, to) {
	var problem = {};
	var unit = new Array("ml", "cl", "l");
	var cl = roundError(l * 100);
	var ml = roundError(cl * 10);
	var value = new Array(ml, cl, l);
	problem.question =
		"Convert " + value[from] + " " + unit[from] + " to " + unit[to];
	switch (to) {
		case 0:
			problem.answer = ml;
			break;
		case 1:
			problem.answer = cl;
			break;
		case 2:
			problem.answer = l;
			break;
	}
	problem.answer += " " + unit[to];
	return problem;
}

function basicProbability(type) {
	var problem = {};
	problem.question = "<div>";
	switch (type) {
		case 0:
			var side = "heads";
			if (Math.random() < 0.5) {
				side = "tails";
			}
			problem.question +=
				"A fair coin is flipped. What is the probability of getting " +
				side +
				"?";
			problem.answer = "<sup>1</sup>&frasl;<sub>2</sub>";
			problem.typedAnswer = "1/2";
			break;
		case 1:
			problem.question +=
				"A fair six sided dice is rolled. What is the probability of rolling a " +
				getRandom(1, 6) +
				"?";
			problem.answer = "<sup>1</sup>&frasl;<sub>6</sub>";
			problem.typedAnswer = "1/6";
			break;
		case 2:
			var sides = 2 * getRandom(2, 6);
			var number = getRandom(2, sides);
			var noun = "less";
			var outcomes = number - 1;
			if (Math.random() < 0.5) {
				noun = "more";
				outcomes = sides - number;
			}
			problem.question +=
				"A fair " +
				sides +
				" sided spinner labelled 1 to " +
				sides +
				" is spun. What is the probability of spinning a number " +
				noun +
				" than " +
				number +
				"?";
			problem.answer =
				"<sup>" + outcomes + "</sup>&frasl;<sub>" + sides + "</sub>";
			problem.typedAnswer = outcomes + "/" + sides;
			break;
		case 3:
			switch (getRandom(0, 4)) {
				case 0:
					noun = "two heads";
					outcomes = 1;
					break;
				case 1:
					noun = "two tails";
					outcomes = 1;
					break;
				case 2:
					noun = "at least one heads";
					outcomes = 3;
					break;
				case 3:
					noun = "at least one tails";
					outcomes = 3;
					break;
				case 4:
					noun = "exactly one head and tails";
					outcomes = 2;
					break;
			}
			problem.question +=
				"A fair coin is flipped twice. What is the probability of getting " +
				noun +
				"?";
			problem.answer = "<sup>" + outcomes + "</sup>&frasl;<sub>4</sub>";
			problem.typedAnswer = outcomes + "/4";
			break;
	}
	problem.question += "</div>";
	return problem;
}

function expectedFrequency(trials) {
	var problem = {};
	var number = getRandom(1, 6);
	problem.question = "<div>";
	problem.question +=
		"A fair six sided dice is rolled " +
		trials +
		" times. How many times would you expect to roll a " +
		number +
		"?";
	problem.answer = Math.round(trials / 6);
	problem.question += "</div>";
	return problem;
}

function substitution(type, negatives, v1, v2) {
	var problem = {};
	var choice = getRandom(0, 21);
	var l1 = letterPicker(choice);
	var l2 = letterPicker(choice + 1);
	var x = getRandom(2, 10);
	var y = getRandom(1, 10);
	var z = getRandom(2, 10);
	if (negatives && Math.random() < 0.5) {
		x = -x;
	}
	if (negatives && Math.random() < 0.5) {
		y = -y;
	}
	var answer = 0;
	problem.question = "<div>If \\(" + l1 + " = " + v1 + "\\)";
	if (type > 4) {
		problem.question += " and \\(" + l2 + " = " + v2 + "\\)";
	}
	switch (getRandom(0, 2)) {
		case 0:
			problem.question += ", work out:</div><div>";
			break;
		case 1:
			problem.question += ", evaluate:</div><div>";
			break;
		case 2:
			problem.question += ", calculate:</div><div>";
			break;
	}
	switch (type) {
		case 0:
			if (Math.random() < 0.5) {
				problem.question +=
					"\\(" + fixTerm(1, l1, true) + fixTerm(x, "", false) + "\\)";
			} else {
				problem.question +=
					"\\(" + fixTerm(x, "", true) + fixTerm(1, l1, false) + "\\)";
			}
			answer = v1 + x;
			break;
		case 1:
			if (x < v1) {
				problem.question +=
					"\\(" + fixTerm(1, l1, true) + fixTerm(-x, "", false) + "\\)";
				answer = v1 - x;
			} else {
				problem.question +=
					"\\(" + fixTerm(x, "", true) + fixTerm(-1, l1, false) + "\\)";
				answer = x - v1;
			}
			break;
		case 2:
			problem.question += "\\(" + fixTerm(x, l1, true) + "\\)";
			answer = v1 * x;
			break;
		case 3:
			if (Math.random() < 0.5) {
				problem.question +=
					"\\(" + fixTerm(y, "", true) + fixTerm(x, l1, false) + "\\)";
			} else {
				problem.question +=
					"\\(" + fixTerm(x, l1, true) + fixTerm(y, "", false) + "\\)";
			}
			answer = v1 * x + y;
			break;
		case 4:
			if (v1 % x === 0) {
				problem.question +=
					"\\( \\frac{" +
					fixTerm(1, l1, true) +
					"}{" +
					fixTerm(x, "", true) +
					"}\\)";
				answer = v1 / x;
			} else {
				x *= v1;
				problem.question +=
					"\\( \\frac{" +
					fixTerm(x, "", true) +
					"}{" +
					fixTerm(1, l1, true) +
					"}\\)";
				answer = x / v1;
			}
			break;
		case 5:
			if (v1 * x < v2 * y) {
				problem.question +=
					"\\(" + fixTerm(x, l1, true) + fixTerm(y, l2, false) + "\\)";
				answer = v1 * x + v2 * y;
			} else {
				problem.question +=
					"\\(" + fixTerm(x, l1, true) + fixTerm(-y, l2, false) + "\\)";
				answer = v1 * x - v2 * y;
			}
			break;
		case 6:
			if (Math.random() < 0.5) {
				problem.question +=
					"\\(" + fixTerm(1, l1, true) + "^2" + fixTerm(x, l2, false) + "\\)";
				answer = v1 * v1 + x * v2;
			} else {
				problem.question += "\\(" + fixTerm(1, l1 + l2, true) + "^2" + "\\)";
				answer = v1 * v2 * v2;
			}
			break;
		case 7:
			if (Math.random() < 0.5) {
				problem.question +=
					"\\(" + fixTerm(1, l1 + l2, true) + fixTerm(x, "", false) + "\\)";
				answer = v1 * v2 + x;
			} else {
				problem.question += "\\(" + fixTerm(1, x + l1 + l2, true) + "\\)";
				answer = x * v1 * v2;
			}
			break;
		case 8:
			switch (getRandom(0, 2)) {
				case 0:
					problem.question +=
						"\\(" +
						z +
						"(" +
						fixTerm(x, l1, true) +
						fixTerm(y, l2, false) +
						")\\)";
					answer = z * (v1 * x + v2 * y);
					break;
				case 1:
					problem.question +=
						"\\(" +
						z +
						"(" +
						fixTerm(1, l1, true) +
						"^2" +
						fixTerm(y, l2, false) +
						")\\)";
					answer = z * (v1 * v1 + v2 * y);
					break;
				case 2:
					problem.question +=
						"\\(" +
						fixTerm(1, l1, true) +
						"(" +
						fixTerm(x, l1, true) +
						fixTerm(y, l2, false) +
						")\\)";
					answer = v1 * (x * v1 + y * v2);
					break;
			}
			break;
	}
	problem.question += "</div>";
	problem.answer = "<div>\\(" + roundError(answer) + "\\)</div>";
	problem.typedAnswer = roundError(answer);
	return problem;
}

function unitaryMethod(cost, quantity, newQuantity) {
	var problem = {};
	var noun = {};
	noun.name = itemPicker("small");
	noun.cost = cost;
	noun.quantity = quantity;
	noun.newQuantity = newQuantity;
	noun.total = toPounds(noun.cost * noun.quantity);
	noun.newTotal = toPounds(noun.cost * noun.newQuantity);
	problem.question =
		"<div>" +
		noun.quantity +
		" " +
		noun.name +
		"s costs " +
		noun.total +
		".<br>";
	problem.question +=
		"How much would " + noun.newQuantity + " " + noun.name + "s cost?</div>";
	problem.answer = noun.newTotal;
	problem.typedAnswer = ((noun.cost * noun.newQuantity) / 100).toFixed(2);
	return problem;
}

function difference(a, b) {
	var problem = {};
	problem.question =
		"<div>Find the difference between:<br>" + a + " and " + b + ".</div>";
	problem.answer = roundError(Math.abs(a - b));
	return problem;
}

function changingTemperatures(original, change) {
	var problem = {};
	var newTemp = roundError(original + change);
	var time = getRandom(1, 12);
	if (change > 0) {
		var verb = "increased";
	} else {
		verb = "decreased";
	}
	problem.question =
		"<div>At " + time + " o'clock the temperature was " + original + "&deg;C. ";
	problem.question =
		"<div>The temperature " +
		verb +
		" by " +
		Math.abs(change) +
		"&degC from " +
		original +
		"&deg;C.</div><div>What is the new temperature?</div>";
	problem.answer = newTemp + "&deg;C";
	problem.typedAnswer = newTemp;
	return problem;
}

function polygonSides(maxPol) {
	var problem = {};
	var polygon = [];
	polygon.push({
		name: "a triangle",
		sides: 3,
	});
	polygon.push({
		name: "an equilateral triangle",
		sides: 3,
	});
	polygon.push({
		name: "an isosceles triangle",
		sides: 3,
	});
	polygon.push({
		name: "a scalene triangle",
		sides: 3,
	});
	polygon.push({
		name: "a quadrilateral",
		sides: 4,
	});
	polygon.push({
		name: "a square",
		sides: 4,
	});
	polygon.push({
		name: "a rectangle",
		sides: 4,
	});
	polygon.push({
		name: "a parallelogram",
		sides: 4,
	});
	polygon.push({
		name: "a rhombus",
		sides: 4,
	});
	polygon.push({
		name: "a trapezium",
		sides: 4,
	});
	polygon.push({
		name: "a kite",
		sides: 4,
	});
	polygon.push({
		name: "a pentagon",
		sides: 5,
	});
	polygon.push({
		name: "a hexagon",
		sides: 6,
	});
	polygon.push({
		name: "a heptagon",
		sides: 7,
	});
	polygon.push({
		name: "an octagon",
		sides: 8,
	});
	polygon.push({
		name: "a nonagon",
		sides: 9,
	});
	polygon.push({
		name: "a decagon",
		sides: 10,
	});
	polygon.push({
		name: "a hendecagon",
		sides: 11,
	});
	polygon.push({
		name: "a dodecagon",
		sides: 12,
	});
	polygon.push({
		name: "a tridecagon",
		sides: 13,
	});
	polygon.push({
		name: "a tetradecagon",
		sides: 14,
	});
	polygon.push({
		name: "a pentadecagon",
		sides: 15,
	});
	polygon.push({
		name: "a hexadecagon",
		sides: 16,
	});
	polygon.push({
		name: "a heptadecagon",
		sides: 17,
	});
	polygon.push({
		name: "a octadecagon",
		sides: 18,
	});
	polygon.push({
		name: "a enneadecagon",
		sides: 19,
	});
	polygon.push({
		name: "an icosagon",
		sides: 20,
	});
	polygon.push({
		name: "a triacontagon",
		sides: 30,
	});
	polygon.push({
		name: "a tetracontagon",
		sides: 40,
	});
	polygon.push({
		name: "a pentacontagon",
		sides: 50,
	});
	polygon.push({
		name: "a hexacontagon",
		sides: 60,
	});
	polygon.push({
		name: "a heptacontagon",
		sides: 70,
	});
	polygon.push({
		name: "an octacontagon",
		sides: 80,
	});
	polygon.push({
		name: "an enneacontagon",
		sides: 90,
	});
	polygon.push({
		name: "a hectogon",
		sides: 100,
	});
	polygon.push({
		name: "a chiliagon",
		sides: 1000,
	});
	polygon.push({
		name: "a myriagon",
		sides: 10000,
	});
	polygon.push({
		name: "a megagon",
		sides: 1000000,
	});
	temp = getRandom(0, maxPol);
	problem.question =
		"<div>How many sides does " + polygon[temp].name + " have?</div>";
	problem.answer = polygon[temp].sides;
	return problem;
}

function expandSimplifySingleBrackets(type, max) {
	var problem = {};
	var x = "x";
	var y = "y";
	if (toss()) {
		y = "";
	}
	var a = getRandom(2, max);
	var b = getRandom(2, max);
	var c = getRandom(2, max);
	var d = getRandom(2, max);
	var e = getRandom(2, max);
	var f = getRandom(2, max);
	var exp = "";
	var expansion = "";
	if (type > 6) {
		type = 6;
	}
	switch (type) {
		case 0:
			exp = a + "(" + x + " + " + b + ") + " + c + "(" + x + " + " + d + ")";
			expansion = a + c + x + " + " + (a * b + c * d);
			break;
		case 1:
			exp =
				a +
				"(" +
				b +
				x +
				" + " +
				c +
				") + " +
				d +
				"(" +
				e +
				x +
				" + " +
				f +
				")";
			expansion = a * b + d * e + x + " + " + (a * c + d * f);
			break;
		case 2:
			exp =
				a +
				"(" +
				x +
				" + " +
				b +
				y +
				") + " +
				c +
				"(" +
				x +
				" - " +
				d +
				y +
				")";
			if (a * b < c * d) {
				expansion = a + c + x + " - " + Math.abs(a * b - c * d) + y;
			} else {
				expansion = a + c + x + " + " + (a * b - c * d) + y;
			}
			break;
		case 3:
			exp =
				a +
				"(" +
				x +
				" - " +
				b +
				y +
				") + " +
				c +
				"(" +
				x +
				" - " +
				d +
				y +
				")";
			expansion = a + c + x + " - " + (a * b + c * d) + y;
			break;
		case 4:
			while (a * b <= d * e) {
				b++;
			}
			exp =
				a +
				"(" +
				b +
				x +
				" + " +
				c +
				y +
				") - " +
				d +
				"(" +
				e +
				x +
				" + " +
				f +
				y +
				")";
			if (a * c < d * f) {
				expansion = a * b - d * e + x + " - " + Math.abs(a * c - d * f) + y;
			} else {
				expansion = a * b - d * e + x + " + " + (a * c - d * f) + y;
			}
			break;
		case 5:
			while (a * b <= d * e) {
				b++;
			}
			exp =
				a +
				"(" +
				b +
				x +
				" + " +
				c +
				y +
				") - " +
				d +
				"(" +
				e +
				x +
				" - " +
				f +
				y +
				")";
			expansion = a * b - d * e + x + " + " + (a * c + d * f) + y;
			break;
		case 6:
			while (a * b <= d * e) {
				b++;
			}
			exp =
				a +
				"(" +
				b +
				x +
				" - " +
				c +
				y +
				") - " +
				d +
				"(" +
				e +
				x +
				" - " +
				f +
				y +
				")";
			if (a * c < d * f) {
				expansion = a * b - d * e + x + " + " + (d * f - a * c) + y;
			} else {
				expansion = a * b - d * e + x + " - " + Math.abs(d * f - a * c) + y;
			}
			break;
	}
	problem.question =
		"<div>Expand and simplify</div><div>" + "\\(" + exp + "\\)</div>";
	problem.answer = "\\(" + expansion + "\\)";
	return problem;
}

function interchangingFDP(x, y, amount, type) {
	var problem = {};
	var givenAmount = roundError(x * amount);
	var newAmount = roundError(y * amount);
	problem.question = "";
	switch (type) {
		case "random":
			if (toss()) {
				problem.question +=
					"<div>\\(" +
					toFraction(x) +
					"\\) of an amount is \\(" +
					givenAmount +
					"\\).</div>";
				problem.question +=
					"<div>What is \\(" + toPercentage(y) + "\\)%?</div>";
			} else {
				problem.question +=
					"<div>\\(" +
					toPercentage(x) +
					"\\)% of an amount is \\(" +
					givenAmount +
					"\\).</div>";
				problem.question += "<div>What is \\(" + toFraction(y) + "\\)?</div>";
			}
			break;
		case "fraction":
			problem.question +=
				"<div>\\(" +
				toFraction(x) +
				"\\) of an amount is \\(" +
				givenAmount +
				"\\).</div>";
			problem.question += "<div>What is \\(" + toFraction(y) + "\\)?</div>";
			break;
		case "percentage":
			problem.question +=
				"<div>\\(" +
				toPercentage(x) +
				"\\)% of an amount is \\(" +
				givenAmount +
				"\\).</div>";
			problem.question += "<div>What is \\(" + toPercentage(y) + "\\)%?</div>";
			break;
	}
	problem.answer = "\\(" + newAmount + "\\)";
	problem.typedAnswer = newAmount;
	return problem;
}

function fibonacci(f0, f1, given1, given2, find) {
	var problem = {};
	var s = [];
	s[0] = f0;
	s[1] = f1;
	for (var i = 2; i < Math.max(given2, find) + 1; i++) {
		s.push(roundError(s[i - 1] + s[i - 2]));
	}
	problem.question = "<div>A fibonacci sequence begins:<br>";
	for (var i = 0; i < s.length; i++) {
		if (i === given1 || i === given2) {
			problem.question += s[i] + ", ";
		} else {
			problem.question += "&#9634;, ";
		}
	}
	problem.question += "...<br>";
	problem.question +=
		"Find the " + (find + 1) + ordinal(find + 1) + " term.</div>";
	problem.answer = s[find];
	return problem;
}

function geometricSequence(a, r, given1, given2, find) {
	var problem = {};
	var s = [];
	s[0] = a;
	for (var i = 1; i < Math.max(given2, find) + 1; i++) {
		s.push(roundError(s[i - 1] * r));
	}
	problem.question = "<div>A geometric sequence begins:<br>";
	for (var i = 0; i < s.length; i++) {
		if (i === given1 || i === given2) {
			problem.question += s[i] + ", ";
		} else {
			problem.question += "&#9634;, ";
		}
	}
	problem.question += "...<br>";
	problem.question +=
		"Find the " + (find + 1) + ordinal(find + 1) + " term.</div>";
	problem.answer = s[find];
	return problem;
}

function convertingTime(from, to, x) {
	var units = ["seconds", "minutes", "hours", "days", "weeks"];
	var mutliplier = [1, 60, 60, 24, 7];
	var problem = {};
	problem.question = "Convert " + x + " " + units[from] + " to " + units[to];
	if (to > from) {
		for (var i = from + 1; i <= to; i++) {
			x /= mutliplier[i];
		}
	}
	if (from > to) {
		for (var i = to + 1; i <= from; i++) {
			x *= mutliplier[i];
		}
	}
	problem.answer = roundError(x) + " " + units[to];
	return problem;
}

function gradientFromTwoPoints(x1, y1, x2, y2) {
	var problem = {};
	var num = y2 - y1;
	var den = x2 - x1;
	var gradient = num / den;
	var answer = gradient;
	if (gradient !== Math.round(gradient)) {
		var hcf = HCF(num, den);
		num /= hcf;
		den /= hcf;
		if (num < 0 && den < 0) {
			num *= -1;
			den *= -1;
		}
		if (num > 0 && den < 0) {
			num *= -1;
			den *= -1;
		}
		answer = "<sup>" + num + "</sup>&frasl;<sub>" + den + "</sub>";
	}
	problem.question =
		"<div>A straight line passes through the points (" +
		x1 +
		", " +
		y1 +
		") and (" +
		x2 +
		", " +
		y2 +
		").</div>";
	problem.question += "<div>Find the gradient of the line.</div>";
	problem.answer = answer;
	return problem;
}

function midpointFromTwoPoints(x1, y1, x2, y2) {
	var problem = {};
	var ym = roundError((y2 + y1) / 2);
	var xm = roundError((x2 + x1) / 2);
	problem.question =
		"<div>A line segment passes from (" +
		x1 +
		", " +
		y1 +
		") to (" +
		x2 +
		", " +
		y2 +
		").</div>";
	problem.question += "<div>Find the midpoint of the line segment.</div>";
	problem.answer = "(" + xm + ", " + ym + ")";
	return problem;
}

function lengthBetweenTwoPoints(x1, y1, x2, y2) {
	var problem = {};
	var a = x2 - x1;
	var b = y2 - y1;
	var c = a * a + b * b;
	var ans = simplifySurd(c);
	problem.question =
		"<div>A line segment passes from \\( (" +
		x1 +
		", " +
		y1 +
		") \\) to \\( (" +
		x2 +
		", " +
		y2 +
		") \\).</div>";
	problem.question += "<div>Find the length of the line segment.</div>";
	problem.answer = "\\( " + ans + " \\) ";
	return problem;
}

function completingSquare(a, b, c) {
	var problem = {};
	problem.question = "<div>Write ";
	problem.question += "\\(";
	if (a !== 1) {
		problem.question += a;
	}
	problem.question += "x^2 ";
	if (b > 0) {
		problem.question += " + " + b;
	} else if (b !== 0) {
		problem.question += " - " + Math.abs(b);
	}
	problem.question += "x";
	if (c > 0) {
		problem.question += " + " + c;
	} else if (c !== 0) {
		problem.question += " - " + Math.abs(c);
	}
	if (a === 1) {
		problem.question +=
			"\\) in the form \\((x+a)^2+b\\), where \\(a\\) and \\(b\\) are constants.</div>";
	} else {
		problem.question +=
			"\\) in the form \\(a(x+b)^2+c\\), where \\(a\\), \\(b\\) and \\(c\\) are constants.</div>";
	}
	b /= a;
	var xCo = b / 2;
	var constant = c - (b / 2) * (b / 2) * a;
	var square = "";
	if (a !== 1) {
		square = a + "(x";
	} else {
		square = "(x";
	}
	if (xCo > 0) {
		square += " + " + xCo + ")^2";
	} else {
		square += " - " + Math.abs(xCo) + ")^2";
	}
	if (constant > 0) {
		square += " + " + constant;
	} else if (constant < 0) {
		square += " - " + Math.abs(constant);
	}
	problem.answer = "<div>\\(" + square + "\\)</div>";
	return problem;
}

function turningPointToQuadratic(xTurn, yTurn, min) {
	var problem = {};
	var type = min ? "minimum" : "maximum";
	problem.question =
		"<div>The " + type + " turning point of a quadratic curve is ";
	problem.question += "(" + xTurn + ", " + yTurn + ").<br>";
	if (type === "minimum") {
		problem.question +=
			"Write an equation for this in the form:<br>y = x&sup2; + ax + b.</div>";
	} else {
		problem.question +=
			"Write an equation for this in the form:<br>y = -x&sup2; + ax + b.</div>";
	}
	var a = type === "minimum" ? 1 : -1;
	var b = -2 * xTurn * a;
	var c = xTurn * xTurn * a + yTurn;
	problem.answer = "y = ";
	if (a === -1) {
		problem.answer += "-";
	}
	problem.answer += "x&sup2; ";
	if (b > 0) {
		problem.answer += " + " + b;
	} else if (b !== 0) {
		problem.answer += " - " + Math.abs(b);
	}
	problem.answer += "x";
	if (c > 0) {
		problem.answer += " + " + c;
	} else if (c !== 0) {
		problem.answer += " - " + Math.abs(c);
	}
	return problem;
}

function factoriseExpandQuadratics(a, b, c, d, expanding) {
	var problem = {};
	var let = "x";
	var exp = "";
	var co = [];
	co[0] = a * c;
	co[1] = a * d + b * c;
	co[2] = b * d;
	if (Math.abs(co[0]) > 1) {
		exp += co[0] + let + "^2";
	} else {
		if (co[0] < 0) {
			exp += "-";
		}
		exp += let + "^2";
	}
	if (co[1] < 0) {
		if (co[1] < -1) {
			exp += " - " + Math.abs(co[1]) + let;
		} else {
			exp += " - " + let;
		}
	} else {
		if (co[1] > 1) {
			exp += " + " + co[1] + let;
		} else if (co[1] !== 0) {
			exp += " + " + let;
		}
	}
	if (co[2] < 0) {
		exp += " - " + Math.abs(co[2]);
	} else {
		exp += " + " + co[2];
	}
	var fact = "(";
	if (a < 0) {
		fact += "-";
	}
	if (Math.abs(a) > 1) {
		fact += Math.abs(a);
	}
	fact += let;
	if (b > 0) {
		fact += " + " + b;
	} else {
		fact += " - " + Math.abs(b);
	}
	fact += ")(";
	if (c < 0) {
		fact += "-";
	}
	if (Math.abs(c) > 1) {
		fact += Math.abs(c);
	}
	fact += let;
	if (d > 0) {
		fact += " + " + d;
	} else {
		fact += " - " + Math.abs(d);
	}
	fact += ")";
	if (!expanding) {
		problem.question = "<div>Factorise:</div><div>\\(" + exp + "\\)</div>";
		problem.answer = "\\(" + fact + "\\)";
	} else {
		problem.question =
			"<div>Expand and simplify</div><div>\\(" + fact + "\\)</div>";
		problem.answer = "\\(" + exp + "\\)";
	}
	return problem;
}

function indexLawMultiply(base, ex1, shift1, ex2, shift2) {
	var problem = {};
	problem.question = "<div>Simplify</div><div>\\(";
	var exp = Math.pow(base, shift1) + "^{" + ex1 + "}";
	exp += "\\ &times;\\ ";
	exp += Math.pow(base, shift2) + "^{" + ex2 + "}\\)</div>";
	var sol = base + "^{" + (ex1 * shift1 + ex2 * shift2) + "}";
	problem.question += exp;
	problem.answer = "\\(" + sol + "\\)";
	return problem;
}

function indexLawDivide(base, ex1, shift1, ex2, shift2) {
	var problem = {};
	problem.question = "<div>Simplify</div><div>\\(";
	var exp = Math.pow(base, shift1) + "^{" + ex1 + "}";
	exp += "\\ &divide;\\ ";
	exp += Math.pow(base, shift2) + "^{" + ex2 + "}\\)</div>";
	var sol = base + "^{" + (ex1 * shift1 - ex2 * shift2) + "}";
	problem.question += exp;
	problem.answer = "\\(" + sol + "\\)";
	return problem;
}

function indexLawPowerOfPower(base, ex1, shift1, ex2) {
	var problem = {};
	problem.question = "<div>Write ";
	var exp =
		"\\((" + Math.pow(base, shift1) + "^{" + ex1 + "})^{" + ex2 + "}\\)";
	exp += " as a single power of " + base + ".</div>";
	var sol = base + "^{" + ex1 * shift1 * ex2 + "}";
	problem.question += exp;
	problem.answer = "\\(" + sol + "\\)";
	return problem;
}

function combiningRatios(max) {
	var problem = {};
	var seed = getRandom(0, 30);
	var x = letterPicker(seed);
	var y = letterPicker(seed + 1);
	var z = letterPicker(seed + 2);
	var a = getRandom(1, max);
	var c = getRandom(1, max);
	do {
		var b = getRandom(1, max);
		var d = getRandom(1, max);
	} while (a === b || c === d);
	problem.question =
		"<div>The ratio of " +
		x +
		" to " +
		y +
		" is " +
		a +
		" : " +
		b +
		".<br>The ratio of " +
		y +
		" to " +
		z +
		" is " +
		c +
		" : " +
		d +
		".</div>";
	problem.question +=
		"<div>Find the ratio " +
		x +
		" : " +
		y +
		" : " +
		z +
		" in its simplest form.</div>";
	var hcf = HCF(HCF(a * c, b * c), b * d);
	problem.answer =
		(a * c) / hcf + " : " + (b * c) / hcf + " : " + (b * d) / hcf;
	return problem;
}

function stateEquationOfCircle(xShift, yShift, radius) {
	var problem = {};
	var equation = "\\( ";
	if (xShift === 0) {
		equation += "x^2 + ";
	} else if (xShift > 0) {
		equation += "(x - " + xShift + ")^2 + ";
	} else {
		equation += "(x + " + Math.abs(xShift) + ")^2 + ";
	}
	if (yShift === 0) {
		equation += "y^2 = ";
	} else if (yShift > 0) {
		equation += "(y - " + yShift + ")^2 = ";
	} else {
		equation += "(y + " + Math.abs(yShift) + ")^2 = ";
	}
	equation += radius + "^2 \\)";
	problem.question =
		"<div>A circle has centre (" +
		xShift +
		",  " +
		yShift +
		") and  radius " +
		radius +
		".</div>";
	problem.question += "<div>State the equation of the circle.</div>";
	problem.answer = equation;
	return problem;
}

function orderOfOpsTimesDivide(pairs, max) {
	var problem = {};
	var m = [];
	var d = [];
	var seed = getRandom(1, max);
	var answer = seed;
	for (var i = 0; i < pairs; i++) {
		var x = getRandom(1, max);
		d.push(x);
		m.push(x * getRandom(2, 5));
		answer *= m[i] / d[i];
	}
	m.sort(() => Math.random() - 0.5);
	d.sort(() => Math.random() - 0.5);
	var data = seed;
	for (var i = 0; i < m.length; i++) {
		data += "\\ &times\\ " + m[i] + "\\ &divide;\\ " + d[i];
	}
	problem.question = "<div>\\(" + data + "\\)</div>";
	problem.answer = "<div>\\(" + answer + "\\)</div>";
	return problem;
}

function orderOfOpsAddSubtract(pairs, max, negatives) {
	var problem = {};
	var a = [];
	var s = [];
	var seed = getRandom(1, max);
	var answer = seed;
	for (var i = 0; i < pairs; i++) {
		var x = getRandom(1, max);
		if (negatives && toss()) {
			x *= -1;
		}
		a.push(x);
		x = getRandom(1, max);
		if (negatives && toss()) {
			x *= -1;
		}
		s.push(x);
		answer += a[i];
		answer -= s[i];
	}
	a.sort(() => Math.random() - 0.5);
	s.sort(() => Math.random() - 0.5);
	var data = "\\( " + seed;
	for (var i = 0; i < a.length; i++) {
		data += " &minus; " + s[i] + " + " + a[i];
	}
	data += "\\)";
	problem.question = "<div>" + data + "</div>";
	problem.answer = "<div>\\(" + answer + "\\)</div>";
	return problem;
}

function givenDecimalFindFraction(n1, d1, n2, d2) {
	var problem = {};
	var dec1 = roundError(n1 / d1);
	var dec2 = roundError(n2 / d2);
	var data =
		"<div>Given that \\( \\frac{" +
		n1 +
		"}{" +
		d1 +
		"} = " +
		dec1 +
		"\\).</div>";
	data +=
		"<div>What is \\( \\frac{" + n2 + "}{" + d2 + "}\\) as a decimal?</div>";
	problem.question = data;
	problem.answer = dec2;
	return problem;
}

function productOfPrimes(totalPrimes) {
	var problem = {};
	var primesLeft = totalPrimes;
	var primeList = new Array(2, 3, 5, 7, 11, 13, 17, 19, 23, 27);
	var primeQuantity = [];
	var product = 1;
	var factorisation = "";
	for (var i = 0; i < primeList.length; i++) {
		var amount = getRandom(0, primesLeft);
		primeQuantity[i] = amount;
		primesLeft -= amount;
		product *= Math.pow(primeList[i], primeQuantity[i]);
		if (primeQuantity[i] > 1) {
			factorisation += primeList[i] + "^" + primeQuantity[i] + "&#215;";
		} else if (primeQuantity[i] === 1) {
			factorisation += primeList[i] + "&#215;";
		}
		if (i === primeList.length && primesLeft !== 0) {
			i = 0;
		}
	}
	factorisation = factorisation.slice(0, -6);
	problem.question =
		"Express \\(" + product + "\\) as the product of its prime factors.";
	problem.answer = "\\(" + product + " = " + factorisation + "\\)";
	return problem;
}

function primeConsecutives(start, total) {
	var problem = {};
	var list = [];
	var product = 1;
	for (var i = 0; i < total; i++) {
		list.push(start + i);
		product *= list[i];
	}
	problem.question =
		"<div>Find " +
		wordedNumber(total) +
		" consecutive integers that have a product of \\(" +
		product +
		"\\).</div>";
	problem.answer = "\\(" + list + "\\)";
	return problem;
}

function placeValuePowers(base, index, shift) {
	var problem = {};
	var power = roundError(Math.pow(base, index));
	var newBase = roundError(base * Math.pow(10, shift));
	var newPower = roundError(Math.pow(newBase, index));
	problem.question =
		"<div>\\(" + base + "^" + index + " = " + power + "\\)</div>";
	problem.question += "<div>Work out \\(" + newBase + "^" + index + "\\)</div>";
	problem.answer = "<div>\\(" + newPower + "\\)</div>";
	return problem;
}

function factoriseSingle(hcf, totalTerms, variables, max, expand) {
	var problem = {};
	var primes = [2, 3, 5, 7, 11, 13, 17];
	for (var i = 0; i < primes.length; i++) {
		var x = getRandom(0, Math.min(primes.length - 1, max + 2));
		var temp = primes[x];
		primes[x] = primes[0];
		primes[0] = temp;
	}
	var expression = "";
	var terms = [];
	var hcx = 999;
	var hcy = 999;
	for (i = 0; i < totalTerms; i++) {
		terms[i] = {};
		terms[i].coeff = hcf * primes[i];
		terms[i].xPow = getRandom(0, max);
		if (variables > 1) {
			terms[i].yPow = getRandom(0, max);
		} else {
			terms[i].yPow = 0;
		}
		terms[i].op = "+";
		if (toss() && max > 1) {
			terms[i].op = "-";
		}
		hcx = Math.min(hcx, terms[i].xPow);
		hcy = Math.min(hcy, terms[i].yPow);
	}
	if (expand && terms[0].xPow === terms[1].xPow) {
		terms[0].xPow++;
	}
	var noVar = true;
	for (i = 0; i < totalTerms; i++) {
		if (terms[i].xPow !== 0) {
			noVar = false;
		}
	}
	if (noVar) {
		terms[0].xPow = 1;
	}
	for (i = 0; i < totalTerms; i++) {
		terms[i].xFact = terms[i].xPow - hcx;
		terms[i].yFact = terms[i].yPow - hcy;
	}
	for (i = 0; i < totalTerms; i++) {
		expression += terms[i].coeff;
		if (terms[i].xPow > 0) {
			if (terms[i].xPow > 1) {
				expression += "x^" + terms[i].xPow;
			} else {
				expression += "x";
			}
		}
		if (terms[i].yPow > 0) {
			if (terms[i].yPow > 1) {
				expression += "y^" + terms[i].yPow;
			} else {
				expression += "y";
			}
		}
		if (i < totalTerms - 1) {
			expression += terms[i].op;
		}
	}
	var factorisation = "";
	if (hcf > 1) {
		factorisation += hcf;
	}
	if (hcx > 0) {
		if (hcx > 1) {
			factorisation += "x^" + hcx;
		} else {
			factorisation += "x";
		}
	}
	if (hcy > 0) {
		if (hcy > 1) {
			factorisation += "y^" + hcy;
		} else {
			factorisation += "y";
		}
	}
	factorisation += "(";
	for (i = 0; i < totalTerms; i++) {
		factorisation += primes[i];
		if (terms[i].xFact > 0) {
			if (terms[i].xFact > 1) {
				factorisation += "x^" + terms[i].xFact;
			} else {
				factorisation += "x";
			}
		}
		if (terms[i].yFact > 0) {
			if (terms[i].yFact > 1) {
				factorisation += "y^" + terms[i].yFact;
			} else {
				factorisation += "y";
			}
		}
		if (i < totalTerms - 1) {
			factorisation += terms[i].op;
		}
	}
	factorisation += ")";
	if (expand) {
		problem.question = "<div>Expand:</div>";
		problem.question += "<div>\\(" + factorisation + "\\)</div>";
		problem.answer = "<div>\\(" + expression + "\\)</div>";
	} else {
		problem.question = "<div>Factorise fully:</div>";
		problem.question += "<div>\\(" + expression + "\\)</div>";
		problem.answer = "<div>\\(" + factorisation + "\\)</div>";
	}
	return problem;
}

function equationsWithRatio(co, a, b, c, den) {
	var problem = {};
	var let = "x";
	var sol = roundError((a * b) / (c * co));
	if (den) {
		var r1 = fixTerm(co, let, true) + ":" + a;
		var r2 = b + ":" + c;
		var answer = sol;
	} else {
		var r1 = roundError(co * sol) + ":" + let;
		var r2 = b + ":" + c;
		var answer = a;
	}
	problem.question = "<div>Solve:</div>";
	if (toss()) {
		problem.question += "<div>\\( " + r1 + " = " + r2 + "\\)</div>";
	} else {
		problem.question += "<div>\\( " + r2 + " = " + r1 + "\\)</div>";
	}
	problem.answer = "<div>\\(" + let + " = " + answer + "\\)</div>";
	return problem;
}

function integersBetweenFraction(n1, d1, n2, d2) {
	var problem = {};
	var f1 = "\\frac{" + n1 + "}{" + d1 + "}";
	var f2 = "\\frac{" + n2 + "}{" + d2 + "}";
	var list = [];
	var dec1 = n1 / d1;
	var dec2 = n2 / d2;
	if (dec1 <= dec2) {
		var min = Math.ceil(n1 / d1);
		var max = Math.floor(n2 / d2);
	} else {
		min = Math.ceil(n2 / d2);
		max = Math.floor(n1 / d1);
	}
	for (var i = min; i <= max; i++) {
		list.push(i);
	}
	problem.question =
		"<div>List all the integers between \\(" +
		f1 +
		"\\) and \\(" +
		f2 +
		"\\)</div>";
	problem.answer = "<div>\\(" + list + "\\)</div>";
	return problem;
}

function ratioDonating(max) {
	var problem = {};
	var seed = getRandom(2, max);
	var x = seed * getRandom(2, max);
	do {
		var y = seed * getRandom(2, max);
	} while (x === y);
	var hcf = HCF(x, y);
	var r1 = {};
	r1.x = x / hcf;
	r1.y = y / hcf;
	do {
		var donation = getRandom(1, x);
		var newX = x - donation;
		var newY = y + donation;
		hcf = HCF(newX, newY);
	} while (hcf < 2 || newX < 1);
	var r2 = {};
	r2.x = newX / hcf;
	r2.y = newY / hcf;
	var p1 = namePicker();
	do {
		var p2 = namePicker();
	} while (p1.name === p2.name);
	problem.question =
		"<div>" +
		p1.name +
		" and " +
		p2.name +
		" share sweets in the ratio \\(" +
		r1.x +
		":" +
		r1.y +
		"\\).</div>";
	problem.question +=
		"<div>If " +
		p1.name +
		" then gives " +
		p2.name +
		" " +
		donation +
		" sweets then the ratio becomes \\(" +
		r2.x +
		":" +
		r2.y +
		"\\).</div>";
	problem.question +=
		"<div>How many sweets did they each have initially?</div>";
	problem.answer = "<div>\\(" + x + ":" + y + "\\)</div>";
	return problem;
}

function howManyFactors(indices) {
	var problem = {};
	var primes = [2, 3, 5, 7, 11, 13, 17, 23, 29];
	var x = 1;
	var totalFactors = 1;
	for (var i = 0; i < indices.length; i++) {
		x *= Math.pow(primes[i], indices[i]);
		totalFactors *= indices[i] + 1;
	}
	problem.question = "<div>How many factors does " + x + " have?</div>";
	problem.answer = totalFactors;
	return problem;
}

function closeMultiplesOfTen(power) {
	var problem = {};
	var max = Math.pow(10, power);
	var x = getRandom(1, max);
	var y = max;
	var d = getRandom(1, 5);
	if (toss()) {
		d *= -1;
	}
	y += d;
	if (toss()) {
		problem.question = "\\(" + x + " + " + y + "\\)";
	} else {
		problem.question = "\\(" + y + " + " + x + "\\)";
	}
	problem.answer = x + y;
	return problem;
}

function linearSimult(negSol, decSol, negCo, decCo, com, same) {
	var problem = {};
	do {
		var x = getRandom(1, 25);
		var y = getRandom(1, 25);
		var attempts = 0;
		var c = [];
		for (var k = 0; k < 4; k++) {
			var current = getRandom(1, 25);
			if (toss() && negCo) {
				current *= -1;
			}
			if (toss() && decCo) {
				current += getRandom(1, 9) / 10;
			}
			c.push(roundError(current));
		}
		if (toss() && negSol) {
			x *= -1;
		}
		if (toss() && decSol) {
			x /= 10;
		}
		if (toss() && negSol) {
			y *= -1;
		}
		if (toss() && decSol) {
			y /= 10;
		}
		if (com || same) {
			if (toss()) {
				if (same) {
					c[0] = c[1];
				} else {
					c[0] = roundError(c[1] * getRandom(2, 6));
				}
			} else {
				if (same) {
					c[2] = c[3];
				} else {
					c[2] = roundError(c[3] * getRandom(2, 6));
				}
			}
		}
		var common = false;
		if (!com) {
			if (HCF(c[0], c[1]) === 1 || HCF(c[2], c[3]) === 1) {
				common = true;
			}
		}
		x = roundError(x);
		y = roundError(y);
		var t1 = roundError(c[0] * x + c[2] * y);
		var t2 = roundError(c[1] * x + c[3] * y);
		attempts++;
	} while (
		(Math.abs(c[0]) === Math.abs(c[1]) && Math.abs(c[2]) === Math.abs(c[3])) ||
		common ||
		Math.max(Math.abs(t1), Math.abs(t2)) > Math.max(20, 50) ||
		attempts > 500
	);
	problem.question =
		"<div>\\(" +
		fixTerm(c[0], "x", true) +
		fixTerm(c[2], "y", false) +
		"=" +
		t1 +
		"\\)</div>";
	problem.question +=
		"<div>\\(" +
		fixTerm(c[1], "x", true) +
		fixTerm(c[3], "y", false) +
		"=" +
		t2 +
		"\\)</div>";
	problem.answer = "\\(x = " + x + "\\) and \\(y = " + y + "\\)";
	return problem;
}

function errorIntervals(acc) {
	var problem = {};
	var x = roundError(acc * getRandom(0, 100));
	var lb = roundError(x - acc / 2);
	var ub = roundError(x + acc / 2);
	var type = "the nearest " + acc;
	switch (acc) {
		case 1:
			type = "the nearest integer";
			break;
		case 0.1:
			type = "1 decimal place";
			break;
		case 0.01:
			type = "2 decimal places";
			break;
		case 0.001:
			type = "3 decimal places";
			break;
	}
	problem.question =
		"<div>A number, \\(x\\), is rounded to " + type + ".</div>";
	problem.question += "<div>The result is " + x + ".</div>";
	problem.question += "<div>Write down the error interval for \\(x\\).</div>";
	problem.answer = "\\(" + lb + " \\le x \\lt " + ub + "\\)";
	return problem;
}

function unitRatio(type, mult) {
	var problem = {};
	var a = getRandom(2, 10);
	var b = roundError(a * mult);
	switch (type) {
		case 0:
			var ratio = a + ":" + b;
			var form = "1:n";
			var fromAns = 1 + ":" + roundError(b / a);
			break;
		case 1:
			var ratio = b + ":" + a;
			var form = "n:1";
			var fromAns = roundError(b / a) + ":" + 1;
			break;
	}
	problem.question =
		"<div>Write the ratio \\(" +
		ratio +
		"\\) in the form \\(" +
		form +
		"\\).</div>";
	problem.answer = "\\(" + fromAns + "\\)";
	return problem;
}

function ratioAsFraction(quantities) {
	var problem = {};
	var object = "";
	switch (getRandom(0, 2)) {
		case 0:
			object = "counters";
			break;
		case 1:
			object = "balls";
			break;
		case 2:
			object = "sweets";
			break;
	}
	var c = [];
	var x = getRandom(0, 10);
	var total = 0;
	var colours = "";
	var ratio = "";
	for (var i = 0; i < quantities.length; i++) {
		c.push(colourPicker(x + i));
		total += quantities[i];
		colours += c[i];
		ratio += quantities[i];
		if (i < quantities.length - 1) {
			colours += " to ";
			ratio += ":";
		}
	}
	var choice = getRandom(0, quantities.length - 1);
	problem.question =
		"<div>The ratio of " +
		colours +
		" " +
		object +
		" in a bag is \\(" +
		ratio +
		"\\).</div>";
	problem.question +=
		"<div>What fraction of the " + object + " are " + c[choice] + "?</div>";
	problem.answer = "\\(\\frac{" + quantities[choice] + "}{" + total + "}\\)";
	return problem;
}

function recurrOrTerminate(n) {
	var problem = {};
	var primes = [2, 2, 5, 3, 3, 7, 11];
	var terminate = true;
	var den = 1;
	for (var i = 0; i < n; i++) {
		var p = primes[getRandom(0, 2)];
		den *= p;
	}
	if (toss()) {
		var p = primes[getRandom(3, 6)];
		den *= p;
		terminate = false;
	}
	var num = getRandom(1, den - 1);
	problem.question =
		"<div>Is \\( \\frac{" +
		num +
		"}{" +
		den +
		"}\\) a terminating or recurring decimal?</div>";
	if (terminate) {
		problem.answer = "Terminating";
	} else {
		problem.answer = "Recurring";
	}
	return problem;
}

function tableOfValuesLinear(m, c, min, max) {
	var problem = {};
	var equation = "y=" + fixTerm(m, "x", true) + fixTerm(c, "", false);
	problem.question =
		"<div>Complete the table of values for \\(" + equation + "\\).</div>";
	problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
	problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
	for (var i = min; i <= max; i++) {
		problem.question += "<td>\\(" + i + "\\)</td>";
		problem.answer += "<td>\\(" + i + "\\)</td>";
	}
	problem.question += "</tr><tr><td>\\(y\\)</td>";
	problem.answer += "</tr><tr><td>\\(y\\)</td>";
	for (i = min; i <= max; i++) {
		problem.question += "<td></td>";
		problem.answer += "<td>\\(" + (m * i + c) + "\\)</td>";
	}
	problem.question += "</tr></table>";
	problem.answer += "</tr></table>";
	return problem;
}

function tableOfValuesQuadratic(a, b, c, min, max) {
	var problem = {};
	var equation =
		"y=" +
		fixTerm(a, "x^2", true) +
		fixTerm(b, "x", false) +
		fixTerm(c, "", false);
	problem.question =
		"<div>Complete the table of values for \\(" + equation + "\\).</div>";
	problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
	problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
	for (var i = min; i <= max; i++) {
		problem.question += "<td>\\(" + i + "\\)</td>";
		problem.answer += "<td>\\(" + i + "\\)</td>";
	}
	problem.question += "</tr><tr><td>\\(y\\)</td>";
	problem.answer += "</tr><tr><td>\\(y\\)</td>";
	for (i = min; i <= max; i++) {
		problem.question += "<td></td>";
		problem.answer += "<td>\\(" + (a * i * i + b * i + c) + "\\)</td>";
	}
	problem.question += "</tr></table>";
	problem.answer += "</tr></table>";
	return problem;
}

function tableOfValuesCubic(a, b, c, d, min, max) {
	var problem = {};
	var equation =
		"y=" +
		fixTerm(a, "x^3", true) +
		fixTerm(b, "x^2", false) +
		fixTerm(c, "x", false) +
		fixTerm(d, "", false);
	problem.question =
		"<div>Complete the table of values for \\(" + equation + "\\).</div>";
	problem.question += "<table class='questionTable'><tr><td>\\(x\\)</td>";
	problem.answer = "<table class='questionTable'><tr><td>\\(x\\)</td>";
	for (var i = min; i <= max; i++) {
		problem.question += "<td>\\(" + i + "\\)</td>";
		problem.answer += "<td>\\(" + i + "\\)</td>";
	}
	problem.question += "</tr><tr><td>\\(y\\)</td>";
	problem.answer += "</tr><tr><td>\\(y\\)</td>";
	for (i = min; i <= max; i++) {
		problem.question += "<td></td>";
		problem.answer +=
			"<td>\\(" + (a * i * i * i + b * i * i + c * i + d) + "\\)</td>";
	}
	problem.question += "</tr></table>";
	problem.answer += "</tr></table>";
	return problem;
}

function recurringDecimals(den, pow) {
	var problem = {};
	den *= Math.pow(10, pow);
	do {
		num = getRandom(1, 2 * den);
	} while (HCF(num, den) !== 1);
	console.log(num + "/" + den);
	problem.question =
		"<div>Write \\(" +
		(Math.floor((num * 100000000) / den) / 100000000).toFixed(8) +
		"..\\) as a fraction.</div>";
	problem.question += "<div>Simplify your answer where possible.</div>";
	var hcf = HCF(num, den);
	num /= hcf;
	den /= hcf;
	problem.answer = "\\( \\frac{" + num + "}{" + den + "} \\)";
	return problem;
}

function multiplyingSurds(level) {
	var problem = {};
	var seed = 1 + Math.floor(Math.random() * level);
	var seed2 = 1 + Math.floor(Math.random() * level);
	while (!isPrime(seed)) {
		seed = 1 + Math.floor(Math.random() * level);
	}
	while (!isPrime(seed2) || seed === seed2) {
		seed2 = 1 + Math.floor(Math.random() * level);
	}
	var root1 = 2 + Math.floor((Math.random() * level) / 2);
	var root2 = 2 + Math.floor((Math.random() * level) / 2);
	while (root1 === root2) {
		root1 += 1;
	}
	var square1 = root1 * root1;
	var square2 = root2 * root2;
	problem.question =
		"\\(\\sqrt{" +
		square1 * seed +
		"}\\ &#215;\\ \\sqrt{" +
		square2 * seed2 +
		"}\\)";
	problem.answer = "\\( " + root1 * root2 + "\\sqrt{" + seed * seed2 + "} \\)";
	return problem;
}

function simplifyingSurds(totalSquares, totalSurds, maxPrime) {
	var problem = {};
	var primes = [2, 3, 5, 7, 11, 13];
	do {
		var square = 1;
		var surd = 1;
		for (var i = 0; i < totalSquares; i++) {
			square *= primes[getRandom(0, maxPrime % primes.length)];
		}
		square *= square;
		var x = getRandom(0, maxPrime / 2);
		for (var i = 0; i < totalSurds; i++) {
			surd *= primes[(x + i) % primes.length];
		}
	} while (square * surd > 6000);
	problem.question = "Simplify \\( \\sqrt{" + square * surd + "} \\)";
	problem.answer = "\\( " + Math.sqrt(square) + "\\sqrt{" + surd + "} \\)";
	return problem;
}

function addingSurds(minSeed, maxSeed, subtraction) {
	var problem = {};
	var seed = Math.floor(minSeed + Math.random() * maxSeed);
	while (!isPrime(seed)) {
		seed = Math.floor(minSeed + Math.random() * maxSeed);
	}
	var root1 = Math.floor(minSeed + Math.random() * maxSeed);
	var root2 = Math.floor(minSeed + Math.random() * maxSeed);
	while (root1 === root2) {
		root1 += 1;
	}
	var square1 = root1 * root1;
	var square2 = root2 * root2;
	if (!subtraction) {
		problem.question =
			"<div>Simplify fully</div><div>\\( \\sqrt{" +
			square1 * seed +
			"} + \\sqrt{" +
			square2 * seed +
			"}\\)</div>";
		problem.answer = "\\(" + (root1 + root2) + "\\sqrt{" + seed + "}\\)";
	} else {
		problem.question =
			"<div>Simplify fully</div><div>\\(\\sqrt{" +
			square1 * seed +
			"} - \\sqrt{" +
			square2 * seed +
			"}\\)</div>";
		problem.answer = "\\(" + (root1 - root2) + "\\sqrt{" + seed + "}\\)";
	}
	return problem;
}

function functionMachine(maxInput, ops, showOutput, negatives, decimals) {
	var problem = {};
	var attempts = 0;
	do {
		var input = getRandom(0, maxInput);
		var reroll = false;
		var output = input;
		var operation = [];
		for (var i = 0; i < ops; i++) {
			var x = getRandom(0, 10);
			if (negatives && toss()) {
				x *= -1;
			}
			switch (getRandom(0, 3)) {
				case 0:
					operation.push("+" + x);
					output += x;
					break;
				case 1:
					operation.push("&times;" + x);
					output *= x;
					break;
				case 2:
					operation.push("&minus;" + x);
					output -= x;
					break;
				case 3:
					operation.push("&divide;" + x);
					output /= x;
					break;
			}
			output = roundError(output);
		}
		if (!decimals && output !== Math.round(output)) {
			reroll = true;
		}
		if (!negatives && output < 0) {
			reroll = true;
		}
		if (decimals && output === Math.round(output)) {
			reroll = true;
		}
		if (negatives && output > 0) {
			reroll = true;
		}
		if (output !== Math.round(output * 4) / 4) {
			reroll = true;
		}
		if (Math.abs(output) > 100) {
			reroll = true;
		}
		attempts++;
	} while (reroll === true);
	var data = "<table class='questionTable' style='width: 80%;'>";
	if (showOutput) {
		data += "<tr><td>?</td><td style='border: none;'><span> \\( \\rightarrow \\) </span></td>";
	} else {
		data +=
			"<tr><td>" + input + "</td><td style='border: none;'><span> \\( \\rightarrow \\) </span></td>";
	}
	for (var i = 0; i < ops; i++) {
		data +=
			"<td style='background: #363b4e;'>" +
			operation[i] +
			"</td><td style='border: none;'><span> \\( \\rightarrow \\) </span></td>";
	}
	if (showOutput) {
		data += "<td>" + output + "</td></tr>";
		problem.answer = input;
	} else {
		data += "<td>?</td></tr>";
		problem.answer = output;
	}
	data += "</table>";
	problem.question = data;
	return problem;
}

function algebraicDivision(x1, y1, c1, x2, y2, c2) {
	var problem = {};
	var firstTerm = true;
	var product = fixTerm(x1 * x2, "x^2", firstTerm);
	if (x1 * x2 !== 0) {
		firstTerm = false;
	}
	product += fixTerm(y1 * y2, "y^2", firstTerm);
	if (y1 * y2 !== 0) {
		firstTerm = false;
	}
	product += fixTerm(x1 * y2 + y1 * x2, "xy", firstTerm);
	if (x1 * y2 + y1 * x2 !== 0) {
		firstTerm = false;
	}
	product += fixTerm(x1 * c2 + x2 * c1, "x", firstTerm);
	if (x1 * c2 + x2 * c1 !== 0) {
		firstTerm = false;
	}
	product += fixTerm(y1 * c2 + y2 * c1, "y", firstTerm);
	product += fixTerm(c1 * c2, "", firstTerm);
	firstTerm = true;
	var divisor = fixTerm(x1, "x", firstTerm);
	if (x1 !== 0) {
		firstTerm = false;
	}
	divisor += fixTerm(y1, "y", firstTerm);
	if (y1 !== 0) {
		firstTerm = false;
	}
	divisor += fixTerm(c1, "", firstTerm);
	firstTerm = true;
	var dividend = fixTerm(x2, "x", firstTerm);
	if (x2 !== 0) {
		firstTerm = false;
	}
	dividend += fixTerm(y2, "y", firstTerm);
	if (y2 !== 0) {
		firstTerm = false;
	}
	dividend += fixTerm(c2, "", firstTerm);
	problem.question =
		"<div>\\(\\frac{" + product + "}{" + divisor + "}\\)</div>";
	problem.answer = "\\(" + dividend + "\\)";
	return problem;
}

function rationalisingDenominators(maxPrimes, commonFactor, numSurd) {
	var problem = {};
	var primes = [2, 2, 3, 3, 5, 5, 7, 11, 13, 17];
	do {
		var a = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
		var b = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
		var c = primes[getRandom(0, Math.min(maxPrimes, primes.length - 1))];
		if (commonFactor) {
			var h = primes[getRandom(0, primes.length - 1)];
		} else {
			h = 1;
		}
	} while (HCF(a, h) !== 1 || HCF(b, h) !== 1 || HCF(c, h) !== 1);
	if (!numSurd) {
		var original = "\\frac{" + b + "}{\\sqrt{" + c + "}}";
		var hcf = HCF(b, c);
		if (c / hcf !== 1) {
			var simple = "\\frac{" + b / hcf + "\\sqrt{" + c + "}}{" + c / hcf + "}";
		} else {
			simple = "\\sqrt{" + c + "}";
		}
	} else {
		var sign = "\\ &plus;\\ ";
		if (toss()) {
			sign = "\\ &minus;\\ ";
		}
		original =
			"\\frac{" +
			a * h +
			sign +
			"\\sqrt{" +
			b * h +
			"}}{\\sqrt{" +
			c * h +
			"}}";
		if (b !== c) {
			simple =
				"\\frac{" +
				a +
				"\\sqrt{" +
				c * h +
				"}" +
				sign +
				"\\sqrt{" +
				b * c +
				"}}{" +
				c +
				"}";
		} else {
			if (HCF(a, c) > 1) {
				if (c / HCF(a, c) === 1) {
					simple = "\\sqrt{" + c * h + "}" + sign + b / HCF(a, c);
				} else {
					simple =
						"\\frac{" +
						a / HCF(a, c) +
						"\\sqrt{" +
						c * h +
						"}" +
						sign +
						b / HCF(a, c) +
						"}{" +
						c / HCF(a, c) +
						"}";
				}
			} else {
				simple =
					"\\frac{" + a + "\\sqrt{" + c * h + "}" + sign + b + "}{" + c + "}";
			}
		}
	}
	problem.question =
		"<div>Rationalise the denominator and simplify</div><div>\\( " +
		original +
		"\\)</div>";
	problem.answer = "\\(" + simple + "\\)";
	return problem;
}

function rewriteAsSum(n, maxSum, maxTerm, negatives, evaluate, addition) {
	var problem = {};
	var terms = [];
	var total = 0;
	do {
		for (var i = 0; i < n; i++) {
			var x = getRandom(1, maxTerm);
			if (toss()) {
				x *= -1;
			}
			terms[i] = x;
			total += x;
		}
	} while (Math.abs(this.total) > maxSum);
	var subCalc = "\\(" + fix(terms[0]);
	var addCalc = "\\(" + fix(terms[0]);
	for (i = 1; i < terms.length; i++) {
		subCalc += "&minus;" + fix(-terms[i]);
		addCalc += "&plus; " + fix(terms[i]);
	}
	subCalc += "\\)";
	addCalc += "\\)";
	if (evaluate) {
		problem.question = "<div>Calculate:</div>";
	} else {
		problem.question = "<div>Rewrite this calculation as a sum.</div>";
	}
	if (addition) {
		problem.question += "<div>" + addCalc + "</div>";
	} else {
		problem.question += "<div>" + subCalc + "</div>";
	}
	if (evaluate) {
		problem.answer = "\\(" + total + "\\)";
	} else {
		problem.answer = addCalc;
	}
	return problem;

	function fix(x) {
		if (x >= 0) {
			return x;
		} else {
			return "(" + x + ")";
		}
	}
}

function areaCircle(r, pi) {
	var problem = {};
	var unit = "cm";
	if (toss()) {
		unit = "mm";
	}
	if (toss()) {
		unit = "m";
	}
	var area = "\\(";
	if (pi) {
		area += r * r + "&pi;";
	} else {
		area += Math.round(10 * r * r * Math.PI) / 10;
	}
	area += " \\text{ " + unit + "}^2 \\)";
	var max = 120;
	var radius = getRandom(max / 2 - 10, max / 2);
	var angle = (Math.PI / 2) * getRandom(0, 0);
	var x2 = Math.cos(angle) * radius;
	var y2 = Math.sin(angle) * radius;
	problem.question = "<div>Find the area of this circle.</div>";
	problem.question += "<svg width='" + max + "' height='" + max + "'>";
	problem.question +=
		"<circle cx='" +
		max / 2 +
		"' cy='" +
		max / 2 +
		"' r='" +
		radius +
		"' stroke='black' fill='#ffffff' />";
	problem.question +=
		"<circle cx='" +
		max / 2 +
		"' cy='" +
		max / 2 +
		"' r='" +
		1 +
		"' stroke='black' fill='#000000' />";
	problem.question +=
		"<line x1='" +
		max / 2 +
		"' y1='" +
		max / 2 +
		"' x2='" +
		(max / 2 + x2) +
		"' y2='" +
		(max / 2 + y2) +
		"' stroke='black' />";
	problem.question +=
		"<text x='" +
		max / 2 +
		"' y='" +
		(max / 2 + y2 / 2 - 5) +
		"' font-size='0.7em' fill='#000000'>" +
		r +
		" " +
		unit +
		"</text>";
	problem.question += "</svg>";
	if (pi) {
		problem.question += "<div>Give your answer in terms of \\(\\pi\\).</div>";
	} else {
		problem.question += "<div>Round your answer to 1d.p.</div>";
	}
	problem.answer = area;
	return problem;
}

function circumferenceCircle(r, pi) {
	var problem = {};
	var unit = "cm";
	if (toss()) {
		unit = "mm";
	}
	if (toss()) {
		unit = "m";
	}
	var circumference = "\\(";
	if (pi) {
		circumference += 2 * r + "&pi;";
	} else {
		circumference += Math.round(10 * 2 * r * Math.PI) / 10;
	}
	circumference += " \\text{ " + unit + "} \\)";
	var max = 120;
	var radius = getRandom(max / 2 - 10, max / 2);
	var angle = 0;
	var x2 = Math.cos(angle) * radius;
	var y2 = Math.sin(angle) * radius;
	problem.question = "<div>Find the circumference of this circle.</div>";
	problem.question += "<svg width='" + max + "' height='" + max + "'>";
	problem.question +=
		"<circle cx='" +
		max / 2 +
		"' cy='" +
		max / 2 +
		"' r='" +
		radius +
		"' stroke='black' fill='#ffffff' />";
	problem.question +=
		"<circle cx='" +
		max / 2 +
		"' cy='" +
		max / 2 +
		"' r='" +
		1 +
		"' stroke='black' fill='#000000' />";
	problem.question +=
		"<line x1='" +
		max / 2 +
		"' y1='" +
		max / 2 +
		"' x2='" +
		(max / 2 + x2) +
		"' y2='" +
		(max / 2 + y2) +
		"' stroke='black' />";
	problem.question +=
		"<text x='" +
		max / 2 +
		"' y='" +
		(max / 2 + y2 / 2 - 5) +
		"' font-size='0.7em' fill='#000000'>" +
		r +
		" " +
		unit +
		"</text>";
	problem.question += "</svg>";
	if (pi) {
		problem.question += "<div>Give your answer in terms of \\(\\pi\\).</div>";
	} else {
		problem.question += "<div>Round your answer to 1d.p.</div>";
	}
	problem.answer = circumference;
	return problem;
}

function solvingQuadraticFactorise(a, b, c, d) {
	var problem = {};
	var let = "x";
	var exp = "";
	var co = [];
	co[0] = a * c;
	co[1] = a * d + b * c;
	co[2] = b * d;
	var exp = fixTerm(co[0], let + "^2", true);
	exp += fixTerm(co[1], let, false);
	exp += fixTerm(co[2], "", false);
	problem.question = "<div>Solve:</div><div>\\(" + exp + " = 0\\)</div>";
	problem.answer =
		"\\(x = " +
		Math.round((100 * -b) / a) / 100 +
		", x = " +
		Math.round((100 * -d) / c) / 100 +
		"\\)";
	return problem;
}

function calcAcrossZero(start, end) {
	var problem = {};
	problem.question =
		"Find the difference between " + start + " and " + end + ".";
	problem.answer = Math.abs(end - start);
	return problem;
}

function findHyp(a, b) {
	var problem = {};
	var triangle = new RightTriangle(a, b);
	problem.question = "<div>Calculate the length &#119909;.</div>";
	problem.question += triangle.display(triangle.a, triangle.b, "&#119909;");
	if (triangle.cDec === Math.round(triangle.cDec)) {
		problem.answer = "\\(" + triangle.cSurd + "\\) units";
	} else {
		problem.answer =
			"\\(" +
			triangle.cSurd +
			" \\approx " +
			Math.round(10 * triangle.cDec) / 10 +
			"\\) units";
	}
	return problem;
}

function findLeg(a, b) {
	var problem = {};
	var triangle = new RightTriangle(a, b);
	problem.question = "<div>Calculate the length &#119909;.</div>";
	if (toss()) {
		problem.question += triangle.display(
			triangle.a,
			"&#119909;",
			Math.round(10 * triangle.cDec) / 10,
		);
		problem.answer = "\\(" + triangle.b + "\\)";
	} else {
		problem.question += triangle.display(
			"&#119909;",
			triangle.b,
			Math.round(10 * triangle.cDec) / 10,
		);
		problem.answer = "\\(" + triangle.a + "\\) units";
	}
	return problem;
}

function perimeterPythag(a, b) {
	var problem = {};
	var triangle = new RightTriangle(a, b);
	problem.question = "<div>Calculate the perimeter of the triangle.</div>";
	if (toss()) {
		problem.question += triangle.display(
			triangle.a,
			"&nbsp;",
			Math.round(10 * triangle.cDec) / 10,
		);
	} else {
		problem.question += triangle.display(
			"&nbsp;",
			triangle.b,
			Math.round(10 * triangle.cDec) / 10,
		);
	}
	problem.answer =
		"\\(" + Math.round(10 * triangle.perimeter) / 10 + "\\) units";
	return problem;
}

function areaPythag(a, b) {
	var problem = {};
	var triangle = new RightTriangle(a, b);
	problem.question = "<div>Calculate the area of the triangle.</div>";
	if (toss()) {
		problem.question += triangle.display(
			triangle.a,
			"&nbsp;",
			Math.round(100 * triangle.cDec) / 100,
		);
	} else {
		problem.question += triangle.display(
			"&nbsp;",
			triangle.b,
			Math.round(100 * triangle.cDec) / 100,
		);
	}
	problem.answer =
		"\\(" + Math.round(100 * triangle.area) / 100 + "\\) square units";
	return problem;
}

function findAngleTrig(a, b) {
	var problem = {};
	var triangle = new RightTriangle(a, b);
	problem.question = "<div>Find the missing angle &#119909;.</div>";
	switch (getRandom(0, 2)) {
		case 0:
			problem.question += triangle.display(
				triangle.a,
				triangle.b,
				"",
				"&#119909;&deg;",
			);
			break;
		case 1:
			problem.question += triangle.display(
				"",
				triangle.b,
				Math.round(10 * triangle.cDec) / 10,
				"&#119909;&deg;",
			);
			break;
		case 2:
			problem.question += triangle.display(
				triangle.a,
				"",
				Math.round(10 * triangle.cDec) / 10,
				"&#119909;&deg;",
			);
			break;
	}
	problem.answer = "" + Math.round(triangle.B) + "&deg;";
	return problem;
}

function findLengthTrig(a, b, angle) {
	var problem = {};
	if (angle) {
		var triangle = new RightTriangle(a, b, angle);
	} else {
		var triangle = new RightTriangle(a, b);
	}
	problem.question = "<div>Calculate the missing length &#119909;.</div>";
	switch (getRandom(0, 2)) {
		case 0:
			problem.question += triangle.display(
				"&#119909",
				Math.round(10 * triangle.b) / 10,
				"",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			problem.answer = "" + Math.round(10 * triangle.a) / 10 + " units";
			break;
		case 1:
			problem.question += triangle.display(
				"",
				"&#119909",
				Math.round(10 * triangle.cDec) / 10,
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			problem.answer = "" + Math.round(10 * triangle.b) / 10 + " units";
			break;
		case 2:
			problem.question += triangle.display(
				triangle.a,
				"",
				"&#119909",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			problem.answer = "" + Math.round(10 * triangle.cDec) / 10 + " units";
			break;
	}
	return problem;
}

function findAreaTrig(a, b, angle) {
	var problem = {};
	if (toss()) {
		var triangle = new RightTriangle(a, b, angle);
	} else {
		var triangle = new RightTriangle(a, b);
	}
	problem.question = "<div>Calculate the area of the triangle.</div>";
	switch (getRandom(0, 2)) {
		case 0:
			problem.question += triangle.display(
				"&#119909",
				Math.round(10 * triangle.b) / 10,
				"",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
		case 1:
			problem.question += triangle.display(
				"",
				"&#119909",
				Math.round(10 * triangle.cDec) / 10,
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
		case 2:
			problem.question += triangle.display(
				triangle.a,
				"",
				"&#119909",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
	}
	problem.answer =
		"\\(" + Math.round(100 * triangle.area) / 100 + "\\) square units";
	return problem;
}

function findPerimeterTrig(a, b, angle) {
	var problem = {};
	if (toss()) {
		var triangle = new RightTriangle(a, b, angle);
	} else {
		var triangle = new RightTriangle(a, b);
	}
	problem.question = "<div>Calculate the perimeter of the triangle.</div>";
	switch (getRandom(0, 2)) {
		case 0:
			problem.question += triangle.display(
				"&#119909",
				Math.round(10 * triangle.b) / 10,
				"",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
		case 1:
			problem.question += triangle.display(
				"",
				"&#119909",
				Math.round(10 * triangle.cDec) / 10,
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
		case 2:
			problem.question += triangle.display(
				triangle.a,
				"",
				"&#119909",
				Math.round(10 * triangle.B) / 10 + "&deg;",
			);
			break;
	}
	problem.answer =
		"\\(" + Math.round(10 * triangle.perimeter) / 10 + "\\) units";
	return problem;
}

function additionLadder(level) {
	var x, y;
	switch (level) {
		case 0:
			x = getRandom(0, 10);
			y = getRandom(0, 10);
			break;
		case 0.1:
			x = getRandom(0, 10);
			y = getRandom(10, 99);
			break;
		case 0.2:
			x = getRandom(10, 99);
			y = getRandom(10, 99);
			break;
		case 0.3:
			x = getRandom(10, 99);
			y = getRandom(100, 999);
			break;
		case 0.4:
			x = getRandom(100, 999);
			y = getRandom(100, 999);
			break;
		case 0.5:
			x = getRandom(1000, 9999);
			y = getRandom(1000, 9999);
			break;
		case 0.6:
			x = getRandom(10000, 99999);
			y = getRandom(10000, 99999);
			break;
		case 0.7:
			x = getRandom(0, 10) / Math.pow(10, getRandom(1, 2));
			y = getRandom(0, 10) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.8:
			x = getRandom(10, 99) / Math.pow(10, getRandom(1, 3));
			y = getRandom(10, 99) / Math.pow(10, getRandom(1, 3));
			break;
		case 0.9:
			x = getRandom(100, 999) / Math.pow(10, getRandom(1, 3));
			y = getRandom(100, 999) / Math.pow(10, getRandom(1, 3));
			break;
		case 1:
			x = getRandom(1000, 9999) / Math.pow(10, getRandom(1, 4));
			y = getRandom(1000, 9999) / Math.pow(10, getRandom(1, 4));
			break;
	}
	if (Math.random() < 0.5) {
		var temp = y;
		y = x;
		x = temp;
	}
	question.push(fourOps(roundError(x), roundError(y), "+"));
}

function subtractionLadder(level) {
	var x, y;
	switch (level) {
		case 0:
			x = getRandom(0, 10);
			y = getRandom(0, 10);
			break;
		case 0.1:
			x = getRandom(0, 10);
			y = getRandom(10, 100);
			break;
		case 0.2:
			x = getRandom(10, 100);
			y = getRandom(10, 100);
			break;
		case 0.3:
			x = getRandom(10, 100);
			y = getRandom(100, 1000);
			break;
		case 0.4:
			x = getRandom(100, 1000);
			y = getRandom(100, 1000);
			break;
		case 0.5:
			x = getRandom(1000, 10000);
			y = getRandom(1000, 10000);
			break;
		case 0.6:
			x = getRandom(10000, 100000);
			y = getRandom(10000, 100000);
			break;
		case 0.7:
			x = getRandom(0, 10) / Math.pow(10, getRandom(1, 2));
			y = getRandom(0, 10) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.8:
			x = getRandom(10, 100) / Math.pow(10, getRandom(1, 3));
			y = getRandom(10, 100) / Math.pow(10, getRandom(1, 3));
			break;
		case 0.9:
			x = getRandom(100, 1000) / Math.pow(10, getRandom(1, 3));
			y = getRandom(100, 1000) / Math.pow(10, getRandom(1, 3));
			break;
		case 1:
			x = getRandom(1000, 10000) / Math.pow(10, getRandom(1, 4));
			y = getRandom(1000, 10000) / Math.pow(10, getRandom(1, 4));
			break;
	}
	question.push(
		fourOps(roundError(Math.max(x, y)), roundError(Math.min(x, y)), "-"),
	);
}

function multiplicationLadder(level) {
	var x, y;
	switch (level) {
		case 0:
			x = getRandom(0, 10);
			y = getRandom(0, 10);
			break;
		case 0.1:
			x = getRandom(1, 9);
			y = getRandom(11, 99);
			break;
		case 0.2:
			x = getRandom(1, 9);
			y = getRandom(101, 999);
			break;
		case 0.3:
			x = getRandom(2, 9);
			y = getRandom(1001, 9999);
			break;
		case 0.4:
			x = getRandom(11, 99);
			y = getRandom(11, 99);
			break;
		case 0.5:
			x = getRandom(11, 99);
			y = getRandom(101, 999);
			break;
		case 0.6:
			x = getRandom(1, 9) / Math.pow(10, getRandom(0, 1));
			y = getRandom(1, 9) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.7:
			x = getRandom(1, 9) / Math.pow(10, getRandom(0, 1));
			y = getRandom(11, 99) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.8:
			x = getRandom(11, 99) / Math.pow(10, getRandom(0, 1));
			y = getRandom(11, 99) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.9:
			x = getRandom(10, 99) / Math.pow(10, getRandom(0, 2));
			y = getRandom(100, 999) / Math.pow(10, getRandom(1, 2));
			break;
		case 1:
			x = getRandom(100, 999) / Math.pow(10, getRandom(0, 2));
			y = getRandom(100, 999) / Math.pow(10, getRandom(1, 2));
			break;
	}
	if (Math.random() < 0.5) {
		var temp = y;
		y = x;
		x = temp;
	}
	question.push(fourOps(roundError(x), roundError(y), "*"));
}

function divisionLadder(level) {
	var x, y;
	switch (level) {
		case 0:
			y = getRandom(1, 6);
			x = y * getRandom(1, 6);
			break;
		case 0.1:
			y = getRandom(2, 9);
			x = y * getRandom(2, 9);
			break;
		case 0.2:
			y = getRandom(2, 9);
			x = y * getRandom(11, 19);
			break;
		case 0.3:
			y = getRandom(2, 9);
			x = y * getRandom(101, 200);
			break;
		case 0.4:
			y = getRandom(2, 9);
			x = y * getRandom(201, 999);
			break;
		case 0.5:
			y = getRandom(11, 19);
			x = y * getRandom(11, 99);
			break;
		case 0.6:
			y = getRandom(2, 9);
			x = (y * getRandom(1, 9)) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.7:
			y = getRandom(2, 9);
			x = (y * getRandom(11, 99)) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.8:
			y = getRandom(2, 9);
			x = (y * getRandom(101, 999)) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.9:
			y = getRandom(11, 19);
			x = (y * getRandom(11, 99)) / Math.pow(10, getRandom(1, 2));
			break;
		case 1:
			y = getRandom(11, 19) / Math.pow(10, getRandom(1, 2));
			x = (y * getRandom(11, 99)) / Math.pow(10, getRandom(1, 2));
			break;
	}
	question.push(fourOps(roundError(x), roundError(y), "/"));
}

function fourOpsLadder(level) {
	switch (getRandom(0, 3)) {
		case 0:
			additionLadder(level);
			break;
		case 1:
			subtractionLadder(level);
			break;
		case 2:
			multiplicationLadder(level);
			break;
		case 3:
			divisionLadder(level);
			break;
	}
}

function halvingLadder(level) {
	var x;
	switch (level) {
		case 0:
			x = 2 * getRandom(1, 5);
			break;
		case 0.1:
			x = 2 * getRandom(6, 20);
			break;
		case 0.2:
			x = 2 * getRandom(21, 100);
			break;
		case 0.3:
			x = 2 * getRandom(11, 49) + 1;
			break;
		case 0.4:
			x = 2 * getRandom(101, 499) + 1;
			break;
		case 0.5:
			x = getRandom(1001, 9999);
			break;
		case 0.6:
			x = (2 * getRandom(11, 49)) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.7:
			x = getRandom(11, 99) / Math.pow(10, getRandom(1, 2));
			break;
		case 0.8:
			x = getRandom(101, 999) / Math.pow(10, getRandom(1, 3));
			break;
		case 0.9:
			x = getRandom(1001, 9999) / Math.pow(10, getRandom(1, 3));
			break;
		case 1:
			x = getRandom(10001, 99999) / Math.pow(10, getRandom(1, 4));
			break;
	}
	question.push(halving(roundError(x)));
}

function doublingLadder(level) {
	var x;
	switch (level) {
		case 0:
			x = getRandom(1, 9);
			break;
		case 0.1:
			x = getRandom(11, 99);
			break;
		case 0.2:
			x = getRandom(101, 999);
			break;
		case 0.3:
			x = getRandom(1001, 9999);
			break;
		case 0.4:
			x = getRandom(1, 99) / 10;
			break;
		case 0.5:
			x = getRandom(11, 999) / 100;
			break;
		case 0.6:
			x = getRandom(10001, 99999);
			break;
		case 0.7:
			x = getRandom(101, 999) / Math.pow(10, getRandom(1, 3));
			break;
		case 0.8:
			x = getRandom(1001, 9999) / Math.pow(10, getRandom(1, 3));
			break;
		case 0.9:
			x = getRandom(10001, 99999) / Math.pow(10, getRandom(2, 4));
			break;
		case 1:
			x = getRandom(100001, 999999) / Math.pow(10, getRandom(3, 5));
			break;
	}
	question.push(doubling(roundError(x)));
}

function fractionOfAmountLadder(level) {
	var x, y, amount;
	switch (level) {
		case 0:
			x = 1;
			y = 2;
			break;
		case 0.1:
			x = 1;
			y = 4;
			break;
		case 0.2:
			y = 4;
			x = getRandom(2, 3);
			break;
		case 0.3:
			y = 3;
			x = getRandom(1, 2);
			break;
		case 0.4:
			y = getRandom(3, 10);
			x = getRandom(1, y);
			break;
		case 0.5:
			y = getRandom(10, 15);
			x = getRandom(1, y);
			break;
		case 0.6:
			y = getRandom(15, 20);
			x = getRandom(1, y);
			break;
		case 0.7:
			x = getRandom(2, 5);
			y = getRandom(2, x);
			break;
		case 0.8:
			x = getRandom(4, 10);
			y = getRandom(2, x);
			break;
		case 0.9:
			x = getRandom(10, 15);
			y = getRandom(2, x);
			break;
		case 1:
			x = getRandom(15, 30);
			y = getRandom(2, x);
			break;
	}
	if (x % y === 0) {
		x++;
	}
	amount = y * getRandom(2, 9) * getRandom(1, 5 * level);
	question.push(fractionOfAmount(x, y, amount));
}

function fractionalChangeLadder(level) {
	var x, y, amount;
	var decrease = false;
	if (level > 0.1 && Math.random() < 0.5) {
		decrease = true;
	}
	switch (level) {
		case 0:
			x = 1;
			y = 2;
			break;
		case 0.1:
			x = 1;
			y = 4;
			break;
		case 0.2:
			y = 4;
			x = getRandom(2, 3);
			break;
		case 0.3:
			y = 3;
			x = getRandom(1, 2);
			break;
		case 0.4:
			y = getRandom(3, 10);
			x = getRandom(1, y);
			break;
		case 0.5:
			y = getRandom(10, 15);
			x = getRandom(1, y);
			break;
		case 0.6:
			y = getRandom(15, 20);
			x = getRandom(1, y);
			break;
		case 0.7:
			x = getRandom(2, 5);
			y = getRandom(2, x);
			break;
		case 0.8:
			x = getRandom(4, 10);
			y = getRandom(2, x);
			break;
		case 0.9:
			x = getRandom(10, 15);
			y = getRandom(2, x);
			break;
		case 1:
			x = getRandom(15, 30);
			y = getRandom(2, x);
			break;
	}
	if (x % y === 0) {
		x++;
	}
	amount = y * getRandom(2, 9) * getRandom(1, 5 * level);
	question.push(fractionalChange(x, y, amount, decrease));
}

function percentageOfAmountLadder(level) {
	var percentage, amount;
	var percent = new Array(50, 25, 75, 10, 5, 20, 1);
	var minLevel = level * 10 - 3;
	if (minLevel < 0) {
		minLevel === 0;
	}
	if (level < 0.7) {
		percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
	}
	switch (level) {
		case 0.7:
			do {
				percentage = 5 * getRandom(3, 19);
			} while (percentage % 10 === 0 || percentage % 25 === 0);
			break;
		case 0.8:
			do {
				percentage = getRandom(1, 100);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 0.9:
			do {
				percentage = getRandom(101, 199);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 1:
			do {
				percentage = getRandom(200, 399);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
	}
	amount = getRandom(2, 20 + 20 * level);
	if (level < 0.3 && amount % 4 !== 0) {
		amount += amount % 4;
	}
	if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
		amount += amount % 5;
	}
	question.push(percentageOfAmount(percentage, amount));
}

function percentageIncreaseDecreaseLadder(level) {
	var percentage, amount;
	var increase = true;
	if (Math.random() < 0.5) {
		increase = false;
	}
	var percent = new Array(50, 25, 75, 10, 5, 20, 1);
	var minLevel = level * 10 - 3;
	if (minLevel < 0) {
		minLevel === 0;
	}
	if (level < 0.7) {
		percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
	}
	switch (level) {
		case 0.7:
			do {
				percentage = 5 * getRandom(3, 19);
			} while (percentage % 10 === 0 || percentage % 25 === 0);
			break;
		case 0.8:
			do {
				percentage = getRandom(1, 100);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 0.9:
			do {
				percentage = getRandom(101, 199);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 1:
			do {
				percentage = getRandom(200, 399);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
	}
	amount = getRandom(2, 20 + 20 * level);
	if (level < 0.3 && amount % 4 !== 0) {
		amount += amount % 4;
	}
	if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
		amount += amount % 5;
	}
	question.push(
		percentageIncreaseDecrease(percentage, amount, increase, false),
	);
}

function percentageChangeLadder(level) {
	do {
		var oldAmount = getRandom(1 + level * 40, 10 + level * 100);
		var newAmount = getRandom(1 + level * 40, 10 + level * 100);
		var change = roundError((100 * (oldAmount - newAmount)) / oldAmount);
	} while (
		oldAmount === newAmount ||
		(change !== Math.round(change) && level < 0.6) ||
		change !== Math.round(10 * change) / 10
	);
	question.push(percentageChange(oldAmount, newAmount));
}

function percentageMultiplierLadder(level) {
	var percentage, type;
	var percent = new Array(50, 25, 75, 10, 5, 20, 1, 15, 35, 95, 60, 35, 90, 80);
	percentage = percent[getRandom(0, percent.length - 1)];
	type = 0;
	if (level > 0) {
		type = 1;
	}
	if (level > 0.1) {
		type = 2;
	}
	if (level > 0.2) {
		type = getRandom(0, 2);
	}
	if (level > 0.4) {
		percentage = getRandom(level * 50, 5 + level * 200);
	}
	question.push(percentageMultipliers(percentage, type));
}

function repeatedPercentageChangeLadder(level) {
	var originalAmount = 20 * getRandom(10, 200);
	var percent = new Array(10, 50, 20, 5, 25, 75, 1, 15, 35, 95, 60, 35, 90, 80);
	var percentage = percent[getRandom(0, 2)];
	var iterations = getRandom(2, 3 + level * 15);
	var increase = true;
	if (level > 0.1) {
		percent[getRandom(0, percent.length - 1)];
	}
	if (level > 0.3) {
		percentage = getRandom(0, 5 + level * 100);
	}
	if (level > 0.4 && toss()) {
		increase = false;
	}
	if (level < 0.5) {
		originalAmount = 100 * getRandom(1, 20);
	}
	if (level < 0.2) {
		originalAmount = 200 * getRandom(1, 5);
	}
	if (level > 0.6 && toss()) {
		percentage += 0.5;
	}
	if (level > 0.8 && toss()) {
		percentage /= 10;
	}
	if (level > 0.9 && toss()) {
		percentage += 100;
	}
	if (percentage > 100 && !increase) {
		increase = true;
	}
	question.push(
		repeatedPercentageChange(originalAmount, percentage, iterations, increase),
	);
}

function reversePercentageLadder(level) {
	var percentage, amount;
	var increase = true;
	if (Math.random() < 0.5) {
		increase = false;
	}
	var percent = new Array(50, 25, 75, 10, 5, 20, 1);
	var minLevel = level * 10 - 3;
	if (minLevel < 0) {
		minLevel === 0;
	}
	if (level < 0.7) {
		percentage = percent[Math.max(minLevel, getRandom(0, level * 10))];
	}
	switch (level) {
		case 0.7:
			do {
				percentage = 5 * getRandom(3, 19);
			} while (percentage % 10 === 0 || percentage % 25 === 0);
			break;
		case 0.8:
			do {
				percentage = getRandom(1, 100);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 0.9:
			do {
				percentage = getRandom(101, 199);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
		case 1:
			do {
				percentage = getRandom(200, 399);
			} while (percentage % 5 === 0 || percentage % 4 === 0);
			break;
	}
	amount = 10 * getRandom(2, 20 + 20 * level);
	if (level < 0.3 && amount % 4 !== 0) {
		amount += amount % 4;
	}
	if (level > 0.2 && level < 0.6 && amount % 5 !== 0) {
		amount += amount % 5;
	}
	question.push(percentageIncreaseDecrease(percentage, amount, increase, true));
}

function roundingLadder(level) {
	var x, accuracy;
	switch (level) {
		case 0:
			accuracy = 10;
			x = getRandom(0, 1000);
			break;
		case 0.1:
			accuracy = 100;
			x = getRandom(0, 1000);
			break;
		case 0.2:
			accuracy = 1000;
			x = getRandom(0, 10000);
			break;
		case 0.3:
			accuracy = 1;
			x = getRandom(1000, 10000) / Math.pow(10, getRandom(2, 3));
			break;
		case 0.4:
			accuracy = 0.1;
			x = getRandom(10000, 100000) / Math.pow(10, getRandom(3, 4));
			break;
		case 0.5:
			accuracy = 0.01;
			x = getRandom(10000, 100000) / Math.pow(10, getRandom(4, 5));
			break;
		case 0.6:
			accuracy = 1 / Math.pow(10, getRandom(2, 3));
			x = getRandom(100000, 1000000) / Math.pow(10, getRandom(5, 6));
			break;
		case 0.7:
			accuracy = 1000 * Math.pow(10, getRandom(1, 3));
			x = getRandom(0, 100000000) / Math.pow(10, getRandom(0, 2));
			break;
		case 0.8:
			accuracy = 1;
			x = getRandom(0, 1000) / Math.pow(10, getRandom(0, 6));
			break;
		case 0.9:
			accuracy = getRandom(2, 3);
			x = getRandom(0, 100000) / Math.pow(10, getRandom(0, 5));
			break;
		case 1:
			accuracy = 4;
			x = getRandom(0, 1000000) / Math.pow(10, getRandom(0, 6));
			break;
	}
	if (level < 0.8) {
		question.push(rounding(roundError(x), accuracy));
	} else {
		question.push(sigFigs(roundError(x), accuracy));
	}
}

function addingNegativesLadder(level) {
	var n = 2 + level * 3;
	var maxSum = 20 + level * 50;
	var maxTerm = 5 + level * 20;
	var negatives = true;
	if (level < 0.2) {
		negatives = false;
	}
	question.push(rewriteAsSum(n, maxSum, maxTerm, negatives, true, true));
}

function subtractingNegativesLadder(level) {
	var n = 2 + level * 3;
	var maxSum = 20 + level * 50;
	var maxTerm = 5 + level * 20;
	var negatives = true;
	if (level < 0.2) {
		negatives = false;
	}
	question.push(rewriteAsSum(n, maxSum, maxTerm, negatives, true, false));
}

function multiplyingDividingNegativesLadder(level, type) {
	var x, y;
	x = getRandom(1, 5 + level * 40);
	y = getRandom(1, 5 + level * 40);
	x = -Math.abs(x);
	if (level === 0) {
		y += Math.abs(x);
	}
	if (level > 0.1 && toss()) {
		y = -Math.abs(y);
		x = Math.abs(x);
	}
	if (level > 0.3 && toss()) {
		y = -Math.abs(y);
		x = -Math.abs(x);
	}
	if ((level > 0.5) & toss()) {
		x *= 3;
	}
	if ((level > 0.6) & toss()) {
		y *= 3;
	}
	if ((level > 0.8) & toss()) {
		x /= 10;
	}
	if ((level > 0.9) & toss()) {
		y /= 10;
	}
	if (type === "/") {
		x *= y;
	}
	question.push(fourOps(roundError(x), roundError(y), type));
}

function negativeLadder(level) {
	var x, y;
	switch (getRandom(0, 3)) {
		case 0:
			addingNegativesLadder(level);
			break;
		case 1:
			subtractingNegativesLadder(level);
			break;
		case 2:
			multiplyingDividingNegativesLadder(level, "*");
			break;
		case 3:
			multiplyingDividingNegativesLadder(level, "/");
			break;
	}
}

function powersOfTenLadder(level) {
	var x, y;
	switch (level) {
		case 0:
			x = getRandom(1, 100);
			y = 10;
			question.push(fourOps(x, y, "*"));
			break;
		case 0.1:
			x = 10 * getRandom(1, 100);
			y = 10;
			question.push(fourOps(x, y, "/"));
			break;
		case 0.2:
			x = getRandom(1, 100);
			y = 100;
			question.push(fourOps(x, y, "*"));
			break;
		case 0.3:
			x = 100 * getRandom(1, 100);
			y = 100;
			question.push(fourOps(x, y, "/"));
			break;
		case 0.4:
			x = getRandom(10, 100) / 10;
			y = Math.pow(10, getRandom(1, 2));
			question.push(fourOps(x, y, "*"));
			break;
		case 0.5:
			x = getRandom(10, 100) / 10;
			y = Math.pow(10, getRandom(1, 2));
			question.push(fourOps(x, y, "/"));
			break;
		case 0.6:
			x = getRandom(100, 1000) / Math.pow(10, getRandom(1, 2));
			y = Math.pow(10, getRandom(1, 3));
			question.push(fourOps(roundError(x), roundError(y), "*"));
			break;
		case 0.7:
			x = getRandom(100, 1000) / Math.pow(10, getRandom(1, 2));
			y = Math.pow(10, getRandom(1, 3));
			question.push(fourOps(roundError(x), roundError(y), "/"));
			break;
		case 0.8:
			x = getRandom(100, 10000) / Math.pow(10, getRandom(1, 3));
			y = Math.pow(10, getRandom(2, 4));
			question.push(fourOps(roundError(x), roundError(y), "*"));
			break;
		case 0.9:
			x = getRandom(100, 10000) / Math.pow(10, getRandom(1, 3));
			y = Math.pow(10, getRandom(2, 4));
			question.push(fourOps(roundError(x), roundError(y), "/"));
			break;
		case 1:
			x = getRandom(1000, 100000) / Math.pow(10, getRandom(2, 4));
			y = Math.pow(10, getRandom(3, 5));
			if (Math.random() < 0.5) {
				question.push(fourOps(roundError(x), roundError(y), "*"));
			} else {
				question.push(fourOps(roundError(x), roundError(y), "/"));
			}
			break;
	}
}

function ratioShareLadder(level) {
	var amount = 0;
	var parts = 0;
	var ratio = new Array();
	var shares = Math.floor(2 + level * 3);
	if (level < 0.4) {
		shares = 2;
	}
	for (var i = 0; i < shares; i++) {
		ratio.push(getRandom(1, 3 + level * 12));
		parts += ratio[i];
	}
	if (shares === 2 && ratio[0] === ratio[1]) {
		ratio[1]++;
		parts++;
	}
	amount = parts * getRandom(2, 5 + level * 14);
	question.push(ratioShare(amount, ratio));
}

function ratioReverseLadder(level) {
	var amount = 0;
	var parts = 0;
	var ratio = new Array();
	var shares = Math.floor(2 + level * 3);
	if (level < 0.4) {
		shares = 2;
	}
	for (var i = 0; i < shares; i++) {
		ratio.push(getRandom(1, 3 + level * 12));
		parts += ratio[i];
	}
	if (shares === 2 && ratio[0] === ratio[1]) {
		ratio[1]++;
		parts++;
	}
	amount = parts * getRandom(2, 5 + level * 14);
	question.push(ratioReverse(amount, ratio));
}

function ratioDifferenceLadder(level) {
	var amount = 0;
	var parts = 0;
	var ratio = new Array();
	var shares = 2;
	if (level > 0.5) {
		shares++;
	}
	if (level < 0.4) {
		shares = 2;
	}
	for (var i = 0; i < shares; i++) {
		ratio.push(getRandom(1, 3 + level * 12));
		parts += ratio[i];
	}
	if (shares === 2 && ratio[0] === ratio[1]) {
		ratio[1]++;
		parts++;
	}
	if (shares === 3) {
		do {
			ratio[0] = getRandom(1, 3 + level * 12);
			ratio[1] = getRandom(1, 3 + level * 12);
			ratio[2] = getRandom(1, 3 + level * 12);
			parts = ratio[0] + ratio[1] + ratio[2];
		} while (
			ratio[0] === ratio[1] ||
			ratio[0] === ratio[2] ||
			ratio[1] === ratio[2]
		);
	}
	amount = parts * getRandom(2, 5 + level * 14);
	question.push(ratioDifference(amount, ratio));
}

function convertingFDPLadder(level, from) {
	var types = new Array("FD", "FP", "PD", "PF", "DF", "DP");
	var num, den;
	switch (from) {
		case "random":
			var type = types[getRandom(0, types.length - 1)];
			break;
		case "fraction":
			type = types[getRandom(0, 1)];
			break;
		case "percentage":
			type = types[getRandom(2, 3)];
			break;
		case "decimal":
			type = types[getRandom(4, 5)];
			break;
	}
	switch (level) {
		case 0:
			num = 1;
			den = 2;
			break;
		case 0.1:
			num = getRandom(1, 3);
			den = 4;
			break;
		case 0.2:
			num = getRandom(1, 9);
			den = 10;
			break;
		case 0.3:
			num = getRandom(1, 4);
			den = 5;
			break;
		case 0.4:
			num = getRandom(1, 19);
			den = 20;
			break;
		case 0.5:
			num = getRandom(1, 39);
			den = 40;
			break;
		case 0.6:
			num = getRandom(1, 8);
			den = 8;
			break;
		case 0.7:
			num = getRandom(1, 100);
			den = 100;
			break;
		case 0.8:
			num = getRandom(1, 200);
			den = 100;
			break;
		case 0.9:
			num = getRandom(200, 600);
			den = 100;
			break;
		case 1:
			num = getRandom(500, 1000);
			den = 100;
			break;
	}
	question.push(convertFDP(type, num, den));
}

function collectingTermsLadder(level) {
	var letters = new Array(
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"m",
		"n",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"w",
	);
	var lets = new Array();
	var vars = new Array();
	var cos = new Array();
	var choice = 21;
	var terms;
	switch (level) {
		case 0:
			terms = 2;
			lets.push(letters[choice]);
			for (var i = 0; i < terms; i++) {
				vars.push(lets[0]);
				cos.push(getRandom(1, 10));
			}
			break;
		case 0.1:
			terms = 2;
			lets.push(letters[choice]);
			for (i = 0; i < terms; i++) {
				vars.push(lets[0]);
			}
			cos.push(getRandom(5, 10));
			cos.push(getRandom(-5, -1));
			break;
		case 0.2:
			terms = 3;
			lets.push(letters[choice]);
			for (i = 0; i < terms; i++) {
				vars.push(lets[0]);
			}
			var lastCo = 1;
			for (i = 0; i < terms; i++) {
				var co = getRandom(1, 10);
				if (Math.random() < 0.5 && i > 0) {
					co = -getRandom(1, lastCo);
				}
				cos.push(co);
				var lastCo = co;
			}
			break;
		case 0.3: {
			terms = getRandom(3, 4);
			lets.push(letters[choice]);
			lets.push(letters[choice + 1]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 10);
				cos.push(co);
			}
			break;
		}
		case 0.4: {
			terms = 3;
			lets.push(letters[choice]);
			lets.push(letters[choice + 1]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 10);
				if (Math.random() < 0.5 && i > 0) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 0.5: {
			terms = 4;
			lets.push(letters[choice]);
			lets.push(letters[choice + 1]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 10);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 0.6: {
			terms = 4;
			lets.push(letters[choice] + letters[choice + 1]);
			lets.push(letters[choice + 2]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 10);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 0.7: {
			terms = 4;
			lets.push(letters[choice] + letters[choice + 1]);
			lets.push(letters[choice + 2] + "^2");
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 15);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 0.8: {
			terms = 4;
			lets.push(letters[choice]);
			lets.push(letters[choice + 1]);
			lets.push(letters[choice + 2]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 15);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 0.9: {
			terms = 5;
			lets.push(letters[choice] + letters[choice + 1]);
			lets.push(letters[choice + 2] + "^2");
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 15);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
		case 1: {
			terms = 5;
			lets.push(letters[choice]);
			lets.push(letters[choice + 1]);
			lets.push(letters[choice + 2]);
			vars.push(lets[0]);
			for (i = 1; i < terms; i++) {
				vars.push(lets[getRandom(0, lets.length - 1)]);
			}
			for (i = 0; i < terms; i++) {
				co = getRandom(1, 15);
				if (Math.random() < 0.5) {
					co = -co;
				}
				cos.push(co);
			}
			break;
		}
	}
	question.push(collectingTerms(lets, vars, cos));
}

function multiplyingTermsLadder(level) {
	if (level > 0.5) {
		var negatives = true;
	}
	var min = 0;
	if (level > 0.6) {
		var min = 3;
	}
	var type = getRandom(min, level * 6);
	question.push(multiplyingTerms(type, negatives));
}

function factorLadder(level) {
	var maxFactors, minNumber, maxNumber;
	switch (level) {
		case 0:
			maxFactors = 4;
			minNumber = 1;
			maxNumber = 25;
			break;
		case 0.1:
			maxFactors = 6;
			minNumber = 5;
			maxNumber = 30;
			break;
		case 0.2:
			maxFactors = 6;
			minNumber = 10;
			maxNumber = 40;
			break;
		case 0.3:
			maxFactors = 6;
			minNumber = 10;
			maxNumber = 60;
			break;
		case 0.4:
			maxFactors = 8;
			minNumber = 20;
			maxNumber = 80;
			break;
		case 0.5:
			maxFactors = 8;
			minNumber = 40;
			maxNumber = 100;
			break;
		case 0.6:
			maxFactors = 10;
			minNumber = 50;
			maxNumber = 200;
			break;
		case 0.7:
			maxFactors = 10;
			minNumber = 100;
			maxNumber = 400;
			break;
		case 0.8:
			maxFactors = 10;
			minNumber = 100;
			maxNumber = 800;
			break;
		case 0.9:
			maxFactors = 12;
			minNumber = 400;
			maxNumber = 1000;
			break;
		case 1:
			maxFactors = 15;
			minNumber = 1000;
			maxNumber = 4000;
			break;
	}
	question.push(factors(maxFactors, minNumber, maxNumber));
}

function multipleLadder(level) {
	var multiple, x;
	switch (level) {
		case 0:
			multiple = getRandom(1, 5);
			x = getRandom(1, 10);
			break;
		case 0.1:
			multiple = getRandom(1, 10);
			x = getRandom(1, 10);
			break;
		case 0.2:
			multiple = getRandom(1, 15);
			x = getRandom(5, 12);
			break;
		case 0.3:
			multiple = getRandom(1, 15);
			x = getRandom(5, 15);
			break;
		case 0.4:
			multiple = getRandom(1, 20);
			x = getRandom(5, 15);
			break;
		case 0.5:
			multiple = getRandom(1, 20);
			x = getRandom(1, 20);
			break;
		case 0.6:
			multiple = getRandom(1, 30);
			x = getRandom(5, 15);
			break;
		case 0.7:
			multiple = getRandom(5, 30);
			x = getRandom(11, 25);
			break;
		case 0.8:
			multiple = getRandom(10, 20);
			x = getRandom(15, 30);
			break;
		case 0.9:
			multiple = getRandom(10, 25);
			x = getRandom(20, 50);
			break;
		case 1:
			multiple = getRandom(15, 30);
			x = getRandom(20, 100);
			break;
	}
	question.push(multiples(multiple, x));
}

function hcfLadder(level) {
	var x, y;
	var z = 0;
	multiple = getRandom(1, 2 + level * 20);
	x = multiple * getRandom(1, 2 + level * 20);
	y = multiple * getRandom(1, 2 + level * 20);
	while (y == x) {
		y = multiple * getRandom(1, 2 + level * 20);
	}
	if (level > 0.7) {
		z = multiple * getRandom(1, 2 + level * 20);
		while (z == x || z == y) {
			z = multiple * getRandom(1, 2 + level * 20);
		}
	}
	if (z > 0) {
		question.push(hcf(x, y, z));
	} else {
		question.push(hcf(x, y));
	}
}

function lcmLadder(level) {
	var x, y;
	var z = 0;
	var multiple = 1 + getRandom(0, level * 10);
	x = multiple * getRandom(2, 6 + level * 20);
	y = multiple * getRandom(2, 6 + level * 20);
	while (y == x) {
		y = multiple * getRandom(2, 6 + level * 20);
	}
	if (level > 0.7) {
		z = multiple * getRandom(2, 6 + level * 10);
		while (z == x || z == y) {
			z = multiple * getRandom(2, 6 + level * 10);
		}
	}
	if (z > 0) {
		question.push(lcm(x, y, z));
	} else {
		question.push(lcm(x, y));
	}
}

function simplifyingRatiosLadder(level) {
	var terms = Math.max(2, Math.round(level * 5));
	var maxPrime = Math.max(10, Math.round(level * 25));
	question.push(simplifyingRatios(terms, maxPrime));
}

function simplifyingFractionsLadder(level) {
	var maxPrime = Math.max(5, Math.round(level * 30));
	question.push(simplifyingFractions(maxPrime));
}

function nthTermLinearLadder(level) {
	var a, b, c;
	a = 0;
	b = getRandom(1, 6 + level * 12);
	c = 0;
	if (level > 0) {
		c = getRandom(1, 6 + level * 16);
	}
	if (level > 0.3 && toss()) {
		c *= -1;
	}
	if (level === 0.4 && toss()) {
		b *= -1;
		c = 0;
	}
	if (level > 0.5) {
		b = Math.abs(b) / 2;
	}
	if (level > 0.6) {
		b *= -1;
	}
	if (level > 0.7) {
		c /= 2;
	}
	if (level > 0.8) {
		b /= 5;
	}
	if (level > 0.9) {
		c /= 5;
	}
	b = roundError(b);
	c = roundError(c);
	question.push(nthTermFinding(a, b, c));
}

function nthTermQuadraticLadder(level) {
	var a, b, c;
	a = 1;
	b = 0;
	c = 0;
	if (level > 0) {
		c = getRandom(1, 5 + level * 10);
	}
	if (level > 0.1) {
		b = getRandom(1, 2 + level * 10);
		c = 0;
	}
	if (level > 0.2) {
		b = getRandom(1, 2 + level * 10);
		c = getRandom(1, 5 + level * 10);
	}
	if (level > 0.3 && toss()) {
		c *= -1;
	}
	if (level > 0.4 && toss()) {
		b *= -1;
	}
	if (level > 0.5) {
		a = getRandom(1, 1 + level * 8);
	}
	if (level > 0.6 && toss()) {
		a *= -1;
	}
	if (level > 0.7 && toss()) {
		c /= 2;
	}
	if (level > 0.8 && toss()) {
		b /= 2;
	}
	if (level > 0.8 && toss()) {
		a /= 2;
	}
	if (level > 0.9) {
		a = -Math.abs(a);
	}
	question.push(nthTermFinding(a, b, c));
}

function sequencesNextTermLadder(level) {
	var a, b, c;
	a = getRandom(1, 3 + level * 5);
	b = getRandom(1, 3 + level * 15);
	c = getRandom(1, 15 + level * 50);
	if (level < 0.7) {
		a = 0;
	}
	if (level < 0.1) {
		b = getRandom(1, 5);
		if (Math.random() < 0.2) {
			b = 10;
		}
	}
	if (level > 0.3 && Math.random() < 0.7) {
		c /= 2;
	}
	if (level > 0.4 && Math.random() < 0.7) {
		c = -c;
	}
	if (level > 0.5 && Math.random() < 0.7) {
		c /= 5;
	}
	if (level > 0.2 && Math.random() < 0.7) {
		b = -b;
		if (level < 0.5) {
			c = getRandom(4, 10) * Math.abs(b);
		}
	}
	if (level > 0.6 && Math.random() < 0.7) {
		b /= 2;
	}
	if (level > 0.7 && Math.random() < 0.7) {
		a = -a;
	}
	if (level > 0.8 && Math.random() < 0.7) {
		a /= 2;
	}
	question.push(sequencesNextTerm(a, b, c));
}

function nthTermGeneratingLadder(level) {
	var a, b, c;
	a = b = c = 0;
	switch (level) {
		case 0:
			b = getRandom(1, 10);
			break;
		case 0.1:
			do {
				b = getRandom(-10, 10);
			} while (b == 0);
			break;
		case 0.2:
			b = getRandom(1, 10);
			c = getRandom(1, 10);
			break;
		case 0.3:
			b = getRandom(1, 10);
			c = getRandom(-15, 15);
			break;
		case 0.4:
			do {
				b = getRandom(-10, 10);
				c = getRandom(-10, 10);
			} while (b == 0 || c == 0);
			break;
		case 0.5:
			do {
				b = getRandom(-15, 15);
				c = getRandom(-25, 25);
			} while (b == 0 || c == 0);
			break;
		case 0.6:
			a = getRandom(1, 10);
			break;
		case 0.7:
			a = getRandom(1, 5);
			c = getRandom(-10, 10);
			break;
		case 0.8:
			do {
				a = getRandom(-5, 5);
				b = getRandom(-10, 10);
			} while (a == 0 || b == 0);
			break;
		case 0.9:
			a = getRandom(1, 5);
			do {
				b = getRandom(-5, 5);
				c = getRandom(-25, 25);
			} while (b == 0 || c == 0);
			break;
		case 1:
			do {
				a = getRandom(-5, 5);
				b = getRandom(-10, 10);
				c = getRandom(-25, 25);
			} while (a == 0 || b == 0 || c == 0);
			break;
	}
	question.push(nthTermGenerating(a, b, c));
}

function nthTermSpecificTermLadder(level) {
	var a, b, c;
	a = b = c = 0;
	switch (level) {
		case 0:
			b = getRandom(1, 10);
			break;
		case 0.1:
			do {
				b = getRandom(-10, 10);
			} while (b == 0);
			break;
		case 0.2:
			b = getRandom(1, 10);
			c = getRandom(1, 10);
			break;
		case 0.3:
			b = getRandom(1, 10);
			c = getRandom(-15, 15);
			break;
		case 0.4:
			do {
				b = getRandom(-10, 10);
				c = getRandom(-10, 10);
			} while (b == 0 || c == 0);
			break;
		case 0.5:
			do {
				b = getRandom(-15, 15);
				c = getRandom(-25, 25);
			} while (b == 0 || c == 0);
			break;
		case 0.6:
			a = getRandom(1, 10);
			break;
		case 0.7:
			a = getRandom(1, 5);
			c = getRandom(-10, 10);
			break;
		case 0.8:
			do {
				a = getRandom(-5, 5);
				b = getRandom(-10, 10);
			} while (a == 0 || b == 0);
			break;
		case 0.9:
			a = getRandom(1, 5);
			do {
				b = getRandom(-5, 5);
				c = getRandom(-25, 25);
			} while (b == 0 || c == 0);
			break;
		case 1:
			do {
				a = getRandom(-5, 5);
				b = getRandom(-10, 10);
				c = getRandom(-25, 25);
			} while (a == 0 || b == 0 || c == 0);
			break;
	}
	var n = getRandom(1, 5 + level * 40);
	question.push(nthTermSpecificTerm(a, b, c, n));
}

function addingCoinsLadder(level) {
	var coins = Math.round(level * 8 + level * 8 + 2);
	question.push(addingCoins(coins));
}

function countingCoinsLadder(level) {
	var coins = getRandom(
		2 + Math.pow(level * 10, 2),
		5 + Math.pow(level * 10, 3),
	);
	question.push(countingCoins(coins));
}

function speedDistTimeLadder(level) {
	level = roundError(level + 0.1);
	var divisor = 1;
	if (level > 0.4) {
		divisor *= 2;
	}
	if (level > 0.8) {
		divisor *= 2;
	}
	var speed =
		(getRandom(1 * (level * 4) + 1, 1 + 5 * level * 4) * 10) / divisor;
	var time = (getRandom(1 * (level * 4) + 1, 1 + 5 * level * 4) * 10) / divisor;
	question.push(speedDistTime(speed, time, getRandom(0, 2)));
}

function powersAndRootsLadder(level) {
	var x, a, b;
	a = getRandom(1, 5);
	b = getRandom(1, 5);
	x = Math.pow(getRandom(0, 10), b);
	switch (level) {
		case 0:
			a = 2;
			b = 1;
			break;
		case 0.1:
			a = 1;
			b = 2;
			break;
		case 0.2:
			a = 3;
			b = 1;
			break;
		case 0.3:
			a = 1;
			b = 3;
			break;
		case 0.4:
			a = getRandom(0, 3);
			b = 1;
			break;
		case 0.5:
			a = 1;
			b = getRandom(1, 3);
			break;
		case 0.6:
			a = getRandom(0, 3);
			b = getRandom(1, 3);
			break;
		case 0.7:
			a = getRandom(-2, 2);
			b = getRandom(1, 3);
			break;
		case 0.8:
			a = getRandom(-3, 3);
			b = getRandom(1, 4);
			break;
		case 0.9:
			a = getRandom(-4, 4);
			b = getRandom(2, 4);
			break;
		case 1:
			a = getRandom(-6, 6);
			b = getRandom(3, 5);
			break;
	}
	if (level > 0.6 && a == 0) {
		a--;
	}
	x = Math.pow(getRandom(1, 10), b);
	if (level > 0.6 && a > 0) {
		x = Math.pow(getRandom(1, 10) / Math.pow(10, getRandom(0, 1)), b);
	}
	question.push(powersAndRoots(roundError(x), a, b));
}

function orderingLadder(level) {
	var length, decimal, negative, descending, range;
	length = 3 + Math.round(level * 3);
	range = 10 + level * 20;
	decimal = false;
	negative = false;
	descending = false;
	if (level > 0.1) {
		if (Math.random() < 0.5) {
			descending = true;
		}
	}
	if (level > 0.2) {
		negative = true;
	}
	if (level > 0.4 && level < 0.8) {
		decimal = true;
		negative = false;
	}
	if (level > 0.7) {
		negative = true;
		decimal = true;
	}
	if (decimal && negative) {
		length = 4;
	}
	question.push(ordering(length, decimal, negative, descending, range));
}

function oneStepEquationLadder(level, inequality) {
	var type, x, answer;
	x = getRandom(2, 4 + level * 12);
	answer = getRandom(2, 4 + level * 12);
	type = getRandom(0, Math.min(level * 15, 7));
	if (type == 3 && level < 0.5) {
		answer += x;
	}
	if (type == 4 && level < 0.5) {
		x += answer;
	}
	if (type == 5) {
		answer *= x;
	}
	if (type == 6) {
		x *= answer;
	}
	if (type == 7) {
		x = 2;
		if (level > 0.8) {
			x = getRandom(2, 4);
		}
		if (Math.random() < 0.1) {
			x = 1;
		}
	}
	if (level > 0.5 && type != 7) {
		if (Math.random() < 0.4) {
			x = -x;
		}
		if (Math.random() < 0.4) {
			answer = -answer;
		}
	}
	if (level > 0.7 && type != 7) {
		if (Math.random() < 0.4) {
			x /= 10;
		}
		if (Math.random() < 0.4) {
			answer /= 10;
		}
	}
	question.push(oneStepEquations(type, x, answer, inequality));
}

function twoStepEquationLadder(level, inequality) {
	var type, x, y, answer;
	x = getRandom(2, 4 + level * 12);
	y = getRandom(1, 4 + level * 12);
	answer = getRandom(2, 4 + level * 12);
	type = getRandom(0, Math.min(level * 12, 8));
	if (type == 4 && level < 0.5) {
		answer += y;
	}
	if (type == 3 || type == 4 || type == 5) {
		answer *= x;
	}
	if (type == 7 || type == 8) {
		x = 2;
		if (level > 0.8) {
			x = getRandom(2, 4);
		}
		if (Math.random() < 0.1) {
			x = 1;
		}
	}
	if (level > 0.6 && type != 7 && type != 8) {
		if (Math.random() < 0.4) {
			x = -x;
		}
		if (Math.random() < 0.4) {
			answer = -answer;
		}
	}
	if (level > 0.8 && type != 7 && type != 8) {
		if (Math.random() < 0.4) {
			x /= 5;
		}
		if (Math.random() < 0.4) {
			answer /= 5;
		}
	}
	question.push(twoStepEquations(type, x, y, answer, inequality));
}

function threeStepEquationLadder(level, inequality) {
	var x, y, z, answer;
	var reversable = false;
	do {
		x = getRandom(1, 3 + level * 10);
		y = getRandom(1, 3 + level * 10);
		z = getRandom(1, 3 + level * 10);
		answer = getRandom(2, 4 + level * 12);
		if (level > 0.1 && Math.random() < 0.7) {
			z = -z;
		}
		if (level > 0.3 && Math.random() < 0.7) {
			y = -y;
		}
		if (level > 0.5 && Math.random() < 0.7) {
			x = -x;
		}
	} while (x + y === 0 || roundError(x * answer + z) === 0);
	if (level > 0.4 && Math.random() < 0.5) {
		reversable = true;
	}
	if (level > 0.6 && Math.random() < 0.7) {
		answer /= 2;
	}
	if (level > 0.7 && Math.random() < 0.7) {
		answer = -answer;
	}
	if (level > 0.8 && Math.random() < 0.7) {
		answer /= 5;
	}
	question.push(threeStepEquations(x, y, z, answer, reversable, inequality));
}

function equationsWithBracketsLadder(level) {
	var x, y, answer;
	var reversable = false;
	x = getRandom(2, 3 + level * 10);
	y = getRandom(1, 4 + level * 10);
	z = getRandom(1, 4 + level * 10);
	answer = getRandom(0, 10 + level * 14);
	if (level > 0.1 && Math.random() < 0.7) {
		z = -z;
	}
	if (level < 0.2) {
		y = 1;
	}
	if (level > 0.5 && Math.random() < 0.7) {
		x = -x;
	}
	if (level > 0.6 && Math.random() < 0.7) {
		y = -y;
	}
	if (level > 0.7 && Math.random() < 0.7) {
		answer = -answer;
	}
	if (level > 0.8 && Math.random() < 0.7) {
		answer /= 2;
	}
	if (level > 0.9 && Math.random() < 0.7) {
		answer /= 5;
	}
	if (level > 0.4 && Math.random() < 0.5) {
		reversable = true;
	}
	question.push(equationsWithBrackets(x, y, z, answer, reversable));
}

function equationsWithBracketsBothLadder(level) {
	var reversable = false;
	do {
		var good = true;
		a = getRandom(2, 5 + level * 8);
		b = getRandom(1, 5 + level * 8);
		c = getRandom(1, 8 + level * 25);
		d = getRandom(2, 5 + level * 8);
		e = getRandom(1, 5 + level * 8);
		f = getRandom(1, 8 + level * 25);
		if (level > 0.1 && Math.random() < 0.7) {
			c = -c;
		}
		if (level > 0.3 && Math.random() < 0.7) {
			f = -f;
		}
		if (level > 0.5 && Math.random() < 0.7) {
			b = -b;
		}
		if (level > 0.7 && Math.random() < 0.7) {
			e = -e;
		}
		if (level > 0.8 && Math.random() < 0.7) {
			d = -d;
		}
		if (level > 0.9 && Math.random() < 0.7) {
			a = -a;
		}
		var answer = (d * f - a * c) / (a * b - d * e);
		if (level < 0.3 && answer < 0) {
			good = false;
		}
		if (level < 0.6 && answer !== Math.round(answer)) {
			good = false;
		}
		if (answer !== Math.round(10 * answer) / 10) {
			good = false;
		}
	} while (!good || a * b - d * e === 0);
	if (level > 0.4 && Math.random() < 0.5) {
		reversable = true;
	}
	question.push(
		equationsWithBracketsBoth(a, b, c, d, e, f, answer, reversable),
	);
}

function equationsMixedLadder(level) {
	switch (getRandom(0, 4)) {
		case 0:
			oneStepEquationLadder(level);
			break;
		case 1:
			twoStepEquationLadder(level);
			break;
		case 2:
			threeStepEquationLadder(level);
			break;
		case 3:
			equationsWithBracketsLadder(level);
			break;
		case 4:
			equationsWithBracketsBothLadder(level);
			break;
	}
}

function substitutionLadder(level) {
	var negatives = false;
	if (level > 0.4) {
		negatives = true;
	}
	var max = Math.min(level * 15, 8);
	var min = level * 15 - 3;
	if (min < 0) {
		min = 0;
	}
	if (min > max) {
		min = max - 1;
	}
	var type = getRandom(min, max);
	var v1 = getRandom(1, 6 + 10 * level);
	var v2 = getRandom(1, 6 + 10 * level);
	if (level > 0.5 && Math.random() < 0.7) {
		v1 = -v1;
	}
	if (level > 0.8 && Math.random() < 0.7) {
		v2 = -v2;
	}
	if (level > 0.6 && Math.random() < 0.7) {
		v1 /= 10;
	}
	if (level > 0.9 && Math.random() < 0.7) {
		v2 /= 10;
	}
	question.push(substitution(type, negatives, v1, v2));
}

function numberBondsLadder(level) {
	var bond = new Array(10, 20, 40, 50, 100, 200, 500, 1000, 1, 1, 1);
	var currentBond = bond[getRandom(Math.max(0, level * 10 - 3), level * 10)];
	var type = getRandom(0, 7);
	if (level < 0.3) {
		type = getRandom(0, 3);
	}
	if (level >= 0.3) {
		type = getRandom(4, 7);
	}
	var x = getRandom(0, currentBond);
	if (currentBond === 1) {
		switch (level) {
			case 0.8:
				x = getRandom(1, 9) / 10;
				break;
			case 0.9:
				x = getRandom(11, 99) / 100;
				break;
			case 1:
				x = getRandom(101, 999) / 1000;
				break;
		}
	}
	question.push(numberBonds(type, currentBond, roundError(x)));
}

function tableBondsLadder(level) {
	var type = getRandom(0, 3);
	do {
		var a = getRandom(2, 5 + level * 20);
		var b = getRandom(2, 5 + level * 20);
		var c = getRandom(2, 5 + level * 20);
		var d = getRandom(2, 5 + level * 20);
	} while (a * b === a * c || c * d === b * c || a * b === b * d);
	question.push(tableBonds(type, a, b, c, d));
}

function addSubtractFractionsLadder(level) {
	var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
	o1 = "+";
	o2 = "+";
	w1 = w2 = w3 = 0;
	do {
		n1 = 1 + getRandom(0, 2 + level * 10);
		n2 = 1 + getRandom(0, 2 + level * 10);
		n3 = 1 + getRandom(0, 2 + level * 10);
		d1 = n1 + 1 + getRandom(0, 1 + level * 10);
		d2 = n2 + 1 + getRandom(0, 1 + level * 10);
		d3 = n3 + 1 + getRandom(0, 1 + level * 10);
		if (level < 0.2) {
			d1 = getRandom(2, 8);
			n1 = getRandom(1, d1);
			n2 = getRandom(1, n1);
		}
		if (Math.random() < 0.5 && level > 0) {
			o1 = "-";
		}
		if (Math.random() < 0.5) {
			o2 = "-";
		}
		if (level > 0.4) {
			w1 = getRandom(1, 5 * level);
		}
		if (level > 0.5) {
			w2 = getRandom(1, 5 * level);
		}
		if (level > 0.6) {
			w3 = getRandom(1, 5 * level);
		}
		if (level < 0.5 && level > 0.2) {
			if (d1 > d2) {
				d2 = d1 * getRandom(2, 9);
			} else {
				d1 = d2 * getRandom(2, 9);
			}
		}
		if (level === 0.2) {
			if (d1 > d2) {
				d1 = d2 * getRandom(2, 4);
			} else {
				d2 = d1 * getRandom(2, 4);
			}
		}
		if (level < 0.2) {
			d2 = d1;
		}
		if (level < 0.7) {
			o2 = "";
		}
	} while (n1 / d1 < n2 / d2);
	question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}

function multiplyDivideFractionsLadder(level, type) {
	var w1, w2, w3, n1, n2, n3, d1, d2, d3, o1, o2;
	o1 = "&#215;";
	o2 = "&#215;";
	switch (type) {
		case 0:
			o1 = "&#215;";
			o2 = "&#215;";
			break;
		case 1:
			o1 = "&divide;";
			o2 = "&divide;";
		case 2:
			if (Math.random() < 0.5) {
				o1 = "&divide;";
			}
			if (Math.random() < 0.5) {
				o2 = "&divide;";
			}
			break;
	}
	w1 = w2 = w3 = 0;
	do {
		n1 = 1 + getRandom(0, 2 + level * 7);
		n2 = 1 + getRandom(0, 2 + level * 7);
		n3 = 1 + getRandom(0, 2 + level * 7);
		d1 = n1 + 1 + getRandom(0, 2 + level * 5);
		d2 = n2 + 1 + getRandom(0, 2 + level * 5);
		d3 = n3 + 1 + getRandom(0, 2 + level * 5);
	} while (n1 / d1 < n2 / d2);
	if (level > 0.4) {
		w1 = getRandom(1, 3 * level);
	}
	if (level > 0.5) {
		w2 = getRandom(1, 3 * level);
	}
	if (level > 0.6) {
		w3 = getRandom(1, 3 * level);
	}
	if (level < 0.1 && o1 === "&divide;") {
		d1 = d2;
	}
	if (level < 0.2 && o1 === "&divide;") {
		d2 = d1 * getRandom(2, 3);
	}
	if (level < 0.3 && o1 === "&divide;") {
		d2 = d1 * getRandom(2, 5);
	}
	if (level < 0.7) {
		o2 = "";
	}
	question.push(fourOpsFractions(w1, n1, d1, w2, n2, d2, w3, n3, d3, o1, o2));
}

function fractionsFourOpsLadder(level) {
	switch (getRandom(0, 1)) {
		case 0:
			addSubtractFractionsLadder(level);
			break;
		case 1:
			multiplyDivideFractionsLadder(level, 2);
			break;
	}
}

function meanLadder(level) {
	do {
		var data = [];
		var total = 0;
		for (var i = 0; i < 2 + level * 5; i++) {
			data.push(getRandom(1, 10 + level * 50));
			if (level > 0.5) {
				data[i] /= 10;
			}
			if (level > 0.6) {
				data[i] *= -1;
			}
			if (level > 0.8 && Math.random() < 0.5) {
				data[i] *= -1;
			}
			if (level > 0.9 && Math.random() < 0.5) {
				data[i] *= 10;
			}
			total += data[i];
		}
		var average = total / data.length;
	} while (Math.round(10 * average) / 10 != average);
	question.push(mean(data));
}

function medianLadder(level) {
	var data = [];
	var terms = 2 + level * 5 + getRandom(0, 1);
	if (level < 0.3 && terms % 2 == 0) {
		terms--;
	}
	if (level > 0.7 && terms % 2 == 1) {
		terms--;
	}
	for (var i = 0; i < terms; i++) {
		data.push(getRandom(1, 10 + level * 50));
		if (level > 0.5) {
			data[i] /= 10;
		}
		if (level > 0.6) {
			data[i] *= -1;
		}
		if (level > 0.8 && Math.random() < 0.5) {
			data[i] *= -1;
		}
		if (level > 0.9 && Math.random() < 0.5) {
			data[i] *= 10;
		}
	}
	question.push(median(data));
}

function rangeLadder(level) {
	var data = [];
	for (var i = 0; i < 2 + level * 5; i++) {
		data.push(getRandom(1, 10 + level * 100));
		if (level > 0.5) {
			data[i] /= 10;
		}
		if (level > 0.6) {
			data[i] *= -1;
		}
		if (level > 0.8 && Math.random() < 0.5) {
			data[i] *= -1;
		}
		if (level > 0.9 && Math.random() < 0.5) {
			data[i] *= 20;
		}
	}
	question.push(range(data));
}

function modeLadder(level) {
	var data = [];
	if (level < 0.4 && Math.random() < 0.8) {
		switch (getRandom(0, 4)) {
			case 0:
				for (var i = 0; i < 3 + level * 10; i++) {
					data.push(colourPicker());
				}
				break;
			case 1:
				for (var i = 0; i < 3 + level * 10; i++) {
					data.push(fruitPicker());
				}
				break;
			case 2:
				for (var i = 0; i < 3 + level * 10; i++) {
					data.push(itemPicker("small"));
				}
				break;
			case 3:
				for (var i = 0; i < 3 + level * 10; i++) {
					data.push(itemPicker("large"));
				}
				break;
			case 4:
				for (var i = 0; i < 3 + level * 10; i++) {
					data.push(letterPicker(getRandom(0, 5)));
				}
				break;
		}
	} else {
		for (var i = 0; i < 2 + level * 5; i++) {
			data.push(getRandom(1, 10 + level * 100));
			if (level > 0.5) {
				data[i] /= 10;
			}
			if (level > 0.6) {
				data[i] *= -1;
			}
			if (level > 0.8 && Math.random() < 0.5) {
				data[i] *= -1;
			}
			if (level > 0.9 && Math.random() < 0.5) {
				data[i] *= 20;
			}
		}
	}
	if (level < 0.8) {
		data.push(data[getRandom(0, data.length - 1)]);
	}
	if (level >= 0.8 && Math.random() > 0.2) {
		data.push(data[getRandom(0, data.length - 1)]);
	}
	for (i = 0; i < data.length; i++) {
		var temp = data[i];
		var choice = getRandom(0, data.length - 1);
		data[i] = data[choice];
		data[choice] = temp;
	}
	question.push(mode(data));
}

function averagesLadder(level) {
	switch (getRandom(0, 3)) {
		case 0:
			meanLadder(level);
			break;
		case 1:
			medianLadder(level);
			break;
		case 2:
			modeLadder(level);
			break;
		case 3:
			rangeLadder(level);
			break;
	}
}

function multiplyDivideStandardFormLadder(level, op) {
	var x = {};
	var y = {};
	x.co = getRandom(1, 3 + level * 20);
	y.co = getRandom(1, 3 + level * 20);
	y.pow = getRandom(1, 3 + level * 20);
	x.pow = y.pow + getRandom(1, 3 + level * 20);
	if (level > 0.7 && Math.random() > 0.5) {
		y.pow = -y.pow;
	}
	if (level > 0.5 && Math.random() > 0.5) {
		x.pow = -x.pow;
	}
	if (level > 0.8) {
		y.pow = -Math.abs(y.pow);
		x.pow = -Math.abs(x.pow);
	}
	if (op === "/") {
		x.co = x.co * y.co;
	}
	checkCo(x);
	checkCo(y);

	function checkCo(term) {
		while (term.co >= 10) {
			term.co /= 10;
			term.pow++;
		}
		while (term.co < 1) {
			term.co *= 10;
			term.pow--;
		}
		return term;
	}
	x.co = roundError(x.co);
	y.co = roundError(y.co);
	question.push(standardForm(x, y, op));
}

function addSubtractStandardFormLadder(level, op) {
	var x = {};
	var y = {};
	y.co = getRandom(1, 9 + level * 10);
	y.pow = getRandom(1, 2 + level * 10);
	x.co = getRandom(1, 9 + level * 10);
	x.pow = y.pow + getRandom(1, 1 + level * 5);
	if (level > 0.7 && Math.random() > 0.5) {
		y.pow = -y.pow;
	}
	if (level > 0.5 && Math.random() > 0.5) {
		x.pow = -x.pow;
	}
	if (level > 0.8) {
		y.pow = -Math.abs(y.pow);
		x.pow = -Math.abs(x.pow);
	}
	if (op === "-") {
		x.pow = y.pow + getRandom(1, 3 + level * 5);
	}
	checkCo(x);
	checkCo(y);

	function checkCo(term) {
		while (term.co >= 10) {
			term.co /= 10;
			term.pow++;
		}
		while (term.co < 1 && term.co > 0) {
			term.co *= 10;
			term.pow--;
		}
		return term;
	}
	x.co = roundError(x.co);
	y.co = roundError(y.co);
	question.push(standardForm(x, y, op));
}

function convertingToStandardFormLadder(level) {
	var x = {};
	var type = 0;
	x.co = getRandom(1, 9 + level * 50);
	x.pow = getRandom(0, 3 + level * 3);
	if (level > 0.3 && Math.random() > 0.5) {
		x.pow = -x.pow;
	}
	if (level > 0.5 && Math.random() > 0.4) {
		x.co *= Math.pow(10, getRandom(1, 3));
	}
	if (level > 0.7 && Math.random() > 0.4) {
		x.co *= Math.pow(10, -getRandom(1, 3));
	}
	if (level < 0.8) {
		checkCo(x);
	}
	if (level >= 0.8) {
		type = 2;
		do {
			x.co *= Math.pow(10, getRandom(-2, 3));
		} while (x.co >= 1 && x.co < 10);
	}

	function checkCo(term) {
		while (term.co >= 10) {
			term.co /= 10;
			term.pow++;
		}
		while (term.co < 1 && term.co > 0) {
			term.co *= 10;
			term.pow--;
		}
		return term;
	}
	x.co = roundError(x.co);
	question.push(convertingStandardForm(x, type));
}

function convertingFromStandardFormLadder(level) {
	var x = {};
	var type = 1;
	x.co = getRandom(1, 9 + level * 50);
	x.pow = getRandom(0, 3 + level * 3);
	if (level > 0.3 && Math.random() > 0.5) {
		x.pow = -x.pow;
	}
	if (level > 0.5 && Math.random() > 0.4) {
		x.co *= Math.pow(10, getRandom(1, 3));
	}
	if (level > 0.7 && Math.random() > 0.4) {
		x.co *= Math.pow(10, -getRandom(1, 3));
	}
	checkCo(x);

	function checkCo(term) {
		while (term.co >= 10) {
			term.co /= 10;
			term.pow++;
		}
		while (term.co < 1 && term.co > 0) {
			term.co *= 10;
			term.pow--;
		}
		return term;
	}
	x.co = roundError(x.co);
	question.push(convertingStandardForm(x, type));
}

function convertingFractionsLadder(level, mixed) {
	var toMixed = mixed;
	var den = getRandom(2, 4 + level * 40);
	do {
		var num = den + getRandom(1, 4 + level * 20);
		num *= getRandom(1, level * 20);
	} while (num % den === 0);
	question.push(convertingFractions(num, den, toMixed));
}

function convertingMeticLengthLadder(level) {
	var from, to, gap;
	gap = 1;
	if (level > 0.5) {
		gap++;
	}
	if (level > 0.8) {
		gap++;
	}
	do {
		from = getRandom(0, 3);
		if (level < 0.2) {
			from = getRandom(1, 2);
		}
		if (Math.random() < 0.5) {
			to = from + gap;
		} else {
			to = from - gap;
		}
		to %= 4;
	} while (Math.abs(to - from) !== gap || to < 0);
	var metres = getRandom(10, 100) / 10;
	if (level < 0.5) {
		metres = getRandom(1, 20);
	}
	if (from === 0) {
		metres /= 100;
	}
	if (from === 1) {
		metres /= 10;
	}
	if (from === 3) {
		metres *= 1000;
	}
	if (to === 3) {
		metres *= 10;
	}
	question.push(convertingMetricLength(roundError(metres), from, to));
}

function convertingMeticWeightLadder(level) {
	var from, to, gap;
	gap = 1;
	if (level > 0.5) {
		gap++;
	}
	if (level > 0.8) {
		gap++;
	}
	do {
		from = getRandom(0, 3);
		if (level < 0.2) {
			from = getRandom(1, 2);
		}
		if (Math.random() < 0.5) {
			to = from + gap;
		} else {
			to = from - gap;
		}
		to %= 4;
	} while (Math.abs(to - from) !== gap || to < 0);
	var kg = getRandom(10, 100) / 10;
	if (level < 0.5) {
		kg = getRandom(1, 20);
	}
	if (level === 0) {
		to = 1;
		from = 2;
	}
	if (level === 0.1) {
		to = 2;
		from = 1;
	}
	if (from === 0) {
		kg /= 100;
	}
	if (from === 1) {
		kg /= 10;
	}
	if (from === 3) {
		kg *= 1000;
	}
	if (to === 3) {
		kg *= 10;
	}
	question.push(convertingMetricWeight(roundError(kg), from, to));
}

function convertingMeticVolumeLadder(level) {
	var from, to, gap;
	gap = 1;
	if (level > 0.5) {
		gap++;
	}
	do {
		from = getRandom(0, 2);
		if (level < 0.2) {
			from = getRandom(1, 2);
		}
		if (Math.random() < 0.5) {
			to = from + gap;
		} else {
			to = from - gap;
		}
		to %= 3;
	} while (Math.abs(to - from) !== gap || to < 0);
	var litres = getRandom(10, 100) / 10;
	if (level < 0.5) {
		litres = getRandom(1, 20);
	}
	if (from === 0) {
		litres /= 100;
	}
	if (from === 1) {
		litres /= 10;
	}
	question.push(convertingMetricVolume(roundError(litres), from, to));
}

function convertingMeticMixedLadder(level) {
	switch (getRandom(0, 2)) {
		case 0:
			convertingMeticLengthLadder(level);
			break;
		case 1:
			convertingMeticWeightLadder(level);
			break;
		case 2:
			convertingMeticVolumeLadder(level);
			break;
	}
}

function unitaryMethodLadder(level) {
	var cost = 2 * getRandom(3, 10 + level * 50) + 1;
	if (level < 0.4) {
		cost = 5 * Math.round(cost / 5);
	}
	if (level < 0.2) {
		cost = 5 * Math.round(cost / 5);
	}
	var quantity = getRandom(2 + level * 10, 3 + level * 25);
	if (level === 0) {
		quantity = 2;
	}
	do {
		var newQuantity = quantity + getRandom(1 + level * 10, 2 + level * 25);
	} while (level > 0.3 && newQuantity % quantity === 0);
	question.push(unitaryMethod(cost, quantity, newQuantity));
}

function probabilityBasicLadder(level) {
	var type = 0;
	if (level > 0.2) {
		type++;
	}
	if (level > 0.5) {
		type++;
	}
	if (level > 0.8) {
		type++;
	}
	question.push(basicProbability(type));
}

function expectedFrequencyLadder(level) {
	var trials = 6;
	if (level > 0.1) {
		trials *= getRandom(1, 3);
	}
	if (level > 0.3) {
		trials *= getRandom(1, 3);
	}
	if (level > 0.5) {
		trials *= getRandom(1, 3);
	}
	if (level > 0.7) {
		trials *= getRandom(1, 3);
	}
	if (level > 0.9) {
		trials *= getRandom(1, 3);
	}
	question.push(expectedFrequency(trials));
}

function differenceLadder(level) {
	var a, b;
	var a = getRandom(0, 10 + level * 20);
	var b = getRandom(0, 10 + level * 20);
	if (level > 0.2 && Math.random() < 0.7) {
		a = -a;
	}
	if (level > 0.4 && Math.random() < 0.7) {
		b = -b;
	}
	if (level > 0.7) {
		a *= 1.1;
	}
	if (level > 0.9) {
		b *= 1.1;
	}
	question.push(difference(roundError(a), roundError(b)));
}

function changingTemperaturesLadder(level) {
	var a, b;
	var a = getRandom(0, 10 + level * 20);
	var b = getRandom(0, 10 + level * 20);
	if (level > 0.2 && Math.random() < 0.7) {
		a = -a;
	}
	if (level > 0.4 && Math.random() < 0.7) {
		b = -b;
	}
	if (level > 0.7) {
		a *= 1.1;
	}
	if (level > 0.9) {
		b *= 1.1;
	}
	question.push(changingTemperatures(roundError(a), roundError(b)));
}

function polygonSidesLadder(level) {
	var maxPol = 0;
	if (level > 0.1) {
		maxPol += 5;
	}
	if (level > 0.2) {
		maxPol += 5;
	}
	if (level > 0.3) {
		maxPol += 5;
	}
	if (level > 0.4) {
		maxPol += 5;
	}
	if (level > 0.5) {
		maxPol += 5;
	}
	if (level > 0.6) {
		maxPol += 5;
	}
	if (level > 0.7) {
		maxPol += 5;
	}
	if (level > 0.9) {
		maxPol += 2;
	}
	question.push(polygonSides(maxPol));
}

function expandSimplifySingleBracketsLadder(level) {
	var type = Math.min(6, 1 + Math.round(level * 8));
	var max = 2 + 3 * level;
	question.push(expandSimplifySingleBrackets(type, max));
}

function interchangingFDPLadder(level, type) {
	var dec = new Array(
		0.5,
		0.25,
		0.75,
		0.1,
		0.2,
		0.05,
		0.01,
		0.02,
		1.5,
		getRandom(0, 200) / 100,
	);
	var max = Math.min(2 + level * 10, dec.length - 1);
	var min = Math.max(0, max - 2);
	do {
		var x = dec[getRandom(min, max)];
		var y = dec[getRandom(min, max)];
		var amount = 10 * getRandom(1, 10 * max);
	} while (
		x === y ||
		amount * x !== Math.round(amount * x) ||
		amount * y !== Math.round(amount * y)
	);
	question.push(interchangingFDP(x, y, roundError(amount), type));
}

function fibonacciLadder(level) {
	var f0 = getRandom(0, 5);
	var f1 = f0 + getRandom(1, 5);
	var given1 = 0;
	var given2 = 1;
	if (level > 0.1 && level < 0.3) {
		f0 *= -1;
		if (toss()) {
			f1 *= -1;
		}
	}
	if (level > 0.2 && level < 0.4) {
		f0 /= 2;
		if (toss()) {
			f1 /= 2;
		}
	}
	if (level > 0.4) {
		given2++;
	}
	if (level > 0.6) {
		given1 = getRandom(1, 2);
		given2 = given1 + getRandom(1, 2);
	}
	if (level > 0.7) {
		given1 = getRandom(2, 4);
		given2 = given1 + getRandom(2, 3);
	}
	if (level > 0.8) {
		f0 *= -1;
		if (toss()) {
			f1 *= -1;
		}
	}
	if (level > 0.9) {
		f0 /= 2;
		if (toss()) {
			f1 /= 2;
		}
	}
	do {
		var find = getRandom(1, given2 + 2);
	} while (find === given1 || find === given2);
	question.push(fibonacci(f0, f1, given1, given2, find));
}

function geometricSequenceLadder(level) {
	var a = getRandom(1, 10);
	var r = getRandom(2, 5);
	var given1 = 0;
	var given2 = 1;
	if (level > 0.2 && toss()) {
		if (r === 3) {
			r = 10;
		}
		a *= Math.pow(r, 3);
		r = 1 / r;
	}
	if (level > 0.4) {
		given2++;
	}
	if (level > 0.4 && toss()) {
		r *= -1;
	}
	if (level > 0.6) {
		given1 = getRandom(1, 2);
		given2 = given1 + getRandom(1, 2);
	}
	if (level > 0.7) {
		given1 = getRandom(2, 3);
		given2 = given1 + getRandom(1, 2);
	}
	do {
		var find = getRandom(1, given2 + 2);
	} while (find === given1 || find === given2);
	question.push(geometricSequence(a, r, given1, given2, find));
}

function convertingTimeLadder(level) {
	do {
		var step = 1;
		if (level > 0.5) {
			step++;
		}
		if (level > 0.7) {
			step++;
		}
		if (level > 0.9) {
			step++;
		}
		var from = getRandom(0, 4);
		var to = getRandom(0, 4);
	} while (Math.abs(from - to) > step || from - to === 0);
	do {
		var decimal = false;
		if (level > 0.4) {
			decimal = true;
		}
		var x = 6 * getRandom(1, 2 + level * 15);
		if (step > 2) {
			x *= 3;
		}
		if (to > from) {
			x *= 3;
		} else {
			x /= 3;
		}
		if (to === 4) {
			x *= 7;
		}
		if (to === 3 && from < 3) {
			x *= 2;
		}
		if (level < 0.3 && from === 0 && to === 1) {
			x *= 10;
		}
		if (level < 0.3 && from === 1 && to === 2) {
			x *= 10;
		}
		if (level > 0.3 && toss()) {
			x /= 5;
		}
		if (level > 0.5 && toss()) {
			x /= 5;
		}
	} while (x !== Math.round(x) && !decimal);
	question.push(convertingTime(from, to, roundError(x)));
}

function gradientTwoPointsLadder(level) {
	do {
		var x1 = getRandom(1, 10 + level * 20);
		var x2 = x1 + getRandom(1, 10 + level * 20);
		var y1 = getRandom(1, 10 + level * 20);
		var y2 = y1 + getRandom(1, 10 + level * 20);
		if (level > 0.2) {
			var temp = x1;
			x1 = x2;
			x2 = temp;
		}
		if (level > 0.3) {
			temp = y1;
			y1 = y2;
			y2 = temp;
		}
		if ((level > 0.4) & toss()) {
			y1 *= -1;
		}
		if ((level > 0.5) & toss()) {
			x1 *= -1;
		}
		if ((level > 0.6) & toss()) {
			y2 *= -1;
		}
		if ((level > 0.7) & toss()) {
			x2 *= -1;
		}
		if (level > 0.8) {
			if (toss()) {
				x1 /= 2;
			}
			if (toss()) {
				x2 /= 2;
			}
			if (toss()) {
				y1 /= 2;
			}
			if (toss()) {
				y2 /= 2;
			}
		}
	} while (y1 === y2);
	question.push(gradientFromTwoPoints(x1, y1, x2, y2));
}

function midpointTwoPointsLadder(level) {
	do {
		var x1 = getRandom(1, 10 + level * 20);
		var x2 = x1 + getRandom(1, 10 + level * 20);
		var y1 = getRandom(1, 10 + level * 20);
		var y2 = y1 + getRandom(1, 10 + level * 20);
		if (level < 0.3 && (x1 + x2) % 2 !== 0) {
			x2++;
		}
		if (level < 0.3 && (y1 + y2) % 2 !== 0) {
			y2++;
		}
		if (level > 0.2) {
			var temp = x1;
			x1 = x2;
			x2 = temp;
		}
		if (level > 0.3) {
			temp = y1;
			y1 = y2;
			y2 = temp;
		}
		if ((level > 0.4) & toss()) {
			y1 *= -1;
		}
		if ((level > 0.5) & toss()) {
			x1 *= -1;
		}
		if ((level > 0.6) & toss()) {
			y2 *= -1;
		}
		if ((level > 0.7) & toss()) {
			x2 *= -1;
		}
		if (level > 0.8) {
			if (toss()) {
				x1 /= 2;
			}
			if (toss()) {
				x2 /= 2;
			}
			if (toss()) {
				y1 /= 2;
			}
			if (toss()) {
				y2 /= 2;
			}
		}
		if (level > 0.9) {
			if (toss()) {
				x1 /= 2;
			}
			if (toss()) {
				x2 /= 2;
			}
			if (toss()) {
				y1 /= 2;
			}
			if (toss()) {
				y2 /= 2;
			}
		}
	} while (y1 === y2);
	question.push(midpointFromTwoPoints(x1, y1, x2, y2));
}

function lengthBetweenTwoPointsLadder(level) {
	do {
		var x1 = getRandom(1, 10 + level * 20);
		var x2 = x1 + getRandom(1, 10 + level * 20);
		var y1 = getRandom(1, 10 + level * 20);
		var y2 = y1 + getRandom(1, 10 + level * 20);
		if (level < 0.3 && (x1 + x2) % 2 !== 0) {
			x2++;
		}
		if (level < 0.3 && (y1 + y2) % 2 !== 0) {
			y2++;
		}
		if (level > 0.2) {
			var temp = x1;
			x1 = x2;
			x2 = temp;
		}
		if (level > 0.3) {
			temp = y1;
			y1 = y2;
			y2 = temp;
		}
		if ((level > 0.4) & toss()) {
			y1 *= -1;
		}
		if ((level > 0.5) & toss()) {
			x1 *= -1;
		}
		if ((level > 0.6) & toss()) {
			y2 *= -1;
		}
		if ((level > 0.7) & toss()) {
			x2 *= -1;
		}
		if (level > 0.8) {
			if (toss()) {
				x1 /= 2;
			}
			if (toss()) {
				x2 /= 2;
			}
			if (toss()) {
				y1 /= 2;
			}
			if (toss()) {
				y2 /= 2;
			}
		}
		if (level > 0.9) {
			if (toss()) {
				x1 /= 2;
			}
			if (toss()) {
				x2 /= 2;
			}
			if (toss()) {
				y1 /= 2;
			}
			if (toss()) {
				y2 /= 2;
			}
		}
	} while (y1 === y2);
	question.push(lengthBetweenTwoPoints(x1, y1, x2, y2));
}

function completingSquareLadder(level) {
	var a = 1;
	var b = 2 * getRandom(1, 5 + level * 15);
	var c = (b * b) / 4;
	if (level > 0) {
		c = 2 * getRandom(0, 5 + level * 15);
	}
	if (level > 0.2 && toss()) {
		c *= -1;
	}
	if (level > 0.4) {
		b = getRandom(1, 5 + level * 20);
	}
	if (level > 0.5 && toss()) {
		b *= -1;
	}
	if (level > 0.8) {
		a = 2 * getRandom(1, 2);
		b *= 2;
	}
	if (level > 0.9 && toss()) {
		a = -a;
	}
	question.push(completingSquare(a, b, c));
}

function turningPointToQuadraticLadder(level) {
	var x = getRandom(1, 10 + level * 10);
	var y = getRandom(1, 10 + level * 10);
	var min = true;
	if (level > 0.1 && toss()) {
		y *= -1;
	}
	if (level > 0.3 && toss()) {
		x *= -1;
	}
	if (level > 0.5 && toss()) {
		min = false;
	}
	if (level > 0.7) {
		min = false;
	}
	question.push(turningPointToQuadratic(x, y, min));
}

function factoriseExpandMonicQuadraticsLadder(level, expanding) {
	var a = 1;
	var b = getRandom(1, 3 + level * 12);
	var c = 1;
	var d = getRandom(1, 3 + level * 12);
	if (level > 0.1 && toss()) {
		b = -b;
	}
	if (level > 0.3 && toss()) {
		d = -d;
	}
	if (level > 0.5 && toss()) {
		a = -a;
	}
	if (level > 0.7 && toss()) {
		c = -c;
	}
	question.push(factoriseExpandQuadratics(a, b, c, d, expanding));
}

function factoriseExpandNonMonicQuadraticsLadder(level, expanding) {
	var a = getRandom(2, 3);
	var b = getRandom(1, 3 + level * 12);
	var c = 1;
	var d = getRandom(1, 3 + level * 12);
	if (level > 0.1 && toss()) {
		b = -b;
	}
	if (level > 0.3) {
		c = getRandom(1, 3);
	}
	if (level > 0.5 && toss()) {
		d = -d;
	}
	if (level > 0.7 && toss()) {
		a = -a;
	}
	if (level > 0.9 && toss()) {
		c = -c;
	}
	question.push(factoriseExpandQuadratics(a, b, c, d, expanding));
}

function indexLawMultiplyLadder(level) {
	var base = letterPicker();
	base = getRandom(2, 4 + level * 2);
	do {
		var ex1 = getRandom(1, 5 + level * 2);
		var ex2 = getRandom(1, 5 + level * 2);
		var shift1 = 1;
		var shift2 = 1;
		if (level > 0.1 && toss()) {
			ex1 = -ex1;
		}
		if (level > 0.3 && toss()) {
			ex2 = -ex2;
		}
		if (level > 0.5 && toss()) {
			shift1 = getRandom(2, 4);
			ex1 = Math.abs(ex1);
		}
		if (level > 0.7) {
			shift2 = getRandom(2, 4);
			ex2 = Math.abs(ex2);
		}
		if (level > 0.8 && toss()) {
			ex1 = -ex1;
		}
		if (level > 0.9 && toss()) {
			ex2 = -ex2;
		}
	} while (ex1 === -ex2);
	question.push(indexLawMultiply(base, ex1, shift1, ex2, shift2));
}

function indexLawDivideLadder(level) {
	var base = letterPicker();
	base = getRandom(2, 4 + level * 2);
	do {
		var ex1 = getRandom(1, 5 + level * 2);
		var ex2 = getRandom(1, 5 + level * 2);
		var shift1 = 1;
		var shift2 = 1;
		if (level > 0.1 && toss()) {
			ex1 = -ex1;
		}
		if (level > 0.3 && toss()) {
			ex2 = -ex2;
		}
		if (level > 0.5 && toss()) {
			shift1 = getRandom(2, 4);
			ex1 = Math.abs(ex1);
		}
		if (level > 0.7) {
			shift2 = getRandom(2, 4);
			ex2 = Math.abs(ex2);
		}
		if (level > 0.8 && toss()) {
			ex1 = -ex1;
		}
		if (level > 0.9 && toss()) {
			ex2 = -ex2;
		}
	} while (ex1 === -ex2);
	question.push(indexLawDivide(base, ex1, shift1, ex2, shift2));
}

function indexLawPowerOfPowerLadder(level) {
	var base = letterPicker();
	base = getRandom(2, 4 + level * 2);
	var ex1 = getRandom(1, 5 + level * 5);
	var ex2 = getRandom(1, 5 + level * 10);
	var shift1 = 1;
	if (level > 0.2 && toss()) {
		ex1 = -ex1;
	}
	if (level > 0.4 && toss()) {
		ex1 = Math.abs(ex1);
		if (base < 4) {
			shift1 = getRandom(2, 3 + level * 3);
		} else {
			shift1 = getRandom(2, 3);
		}
	}
	if (level > 0.6 && toss()) {
		ex1 = -ex1;
	}
	if (level > 0.7 && shift1 < 2) {
		shift1++;
	}
	if (level > 0.8) {
		ex1 = -Math.abs(ex1);
	}
	question.push(indexLawPowerOfPower(base, ex1, shift1, ex2));
}

function indexLawMixedLadder(level) {
	switch (getRandom(0, 2)) {
		case 0:
			indexLawMultiplyLadder(level);
			break;
		case 1:
			indexLawDivideLadder(level);
			break;
		case 2:
			indexLawPowerOfPowerLadder(level);
			break;
	}
}

function ratioMixedLadder(level) {
	switch (getRandom(0, 6)) {
		case 0:
			ratioShareLadder(level);
			break;
		case 1:
			ratioReverseLadder(level);
			break;
		case 2:
			simplifyingRatiosLadder(level);
			break;
		case 3:
			combiningRatiosLadder(level);
			break;
		case 4:
			ratioDifferenceLadder(level);
			break;
		case 5:
			unitRatioLadder(level);
			break;
		case 6:
			ratioAsFractionLadder(level);
			break;
	}
}

function combiningRatiosLadder(level) {
	var max = getRandom(3, 5 + level * 35);
	question.push(combiningRatios(max));
}

function stateEquationOfCircleLadder(level) {
	var a = getRandom(0, 10 + level * 30);
	var b = getRandom(0, 10 + level * 30);
	var r = getRandom(1, 10 + level * 30);
	if (level < 0.1) {
		a = 0;
	}
	if (level < 0.2) {
		b = 0;
	}
	if (level > 0.4 && toss()) {
		a = -a;
	}
	if (level > 0.5 && toss()) {
		b = -b;
	}
	if (level > 0.7 && toss()) {
		a /= 5;
	}
	if (level > 0.9 && toss()) {
		b /= 5;
	}
	if (level > 0.8 && toss()) {
		r /= 5;
	}
	question.push(stateEquationOfCircle(a, b, r));
}

function orderOfOpsTimesDivideLadder(level) {
	var pairs = 1;
	var max = 4 + level * 10;
	if (level > 0.2) {
		pairs++;
	}
	if (level > 0.7) {
		pairs++;
	}
	question.push(orderOfOpsTimesDivide(pairs, max));
}

function orderOfOpsAddSubtractLadder(level) {
	var pairs = 1;
	var max = 4 + level * 20;
	if (level > 0.2) {
		pairs++;
	}
	if (level > 0.7) {
		pairs++;
	}
	question.push(orderOfOpsAddSubtract(pairs, max));
}

function givenDecimalFindFractionLadder(level) {
	var dens = [2, 4, 5, 16, 25, 32, 50, 64, 125, 128];
	var n1, d1, n2, d2;
	do {
		d1 = dens[getRandom(0, 2)];
		if (level > 0) {
			d1 = dens[getRandom(1, 3)];
		}
		if (level > 0.2) {
			d1 = dens[getRandom(2, 5)];
		}
		if (level > 0.5) {
			d1 = dens[getRandom(4, 7)];
		}
		if (level > 0.8) {
			d1 = dens[getRandom(6, 9)];
		}
		n1 = getRandom(1, Math.floor(d1 / 4));
		n2 = getRandom(1, 2) * d1 + n1;
		d2 = d1;
		if (toss() && d1 > 2) {
			n2 = getRandom(1, Math.round(level * 5)) * d1 - n1;
		} else if (toss() && d2 % 2 === 0 && d1 > 2) {
			n2 = n1;
			d2 /= 2;
		} else if (toss()) {
			n2 = n1;
			d2 *= 2;
		}
	} while (n1 === n2 && d1 === d2);
	question.push(givenDecimalFindFraction(n1, d1, n2, d2));
}

function equationsIfThenLadder(level) {
	var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 27, 29];
	var type = getRandom(0, Math.min(9, 2 + level * 15));
	if (level > 0.8) {
		type = getRandom(8, 9);
	}
	var a = getRandom(2 + level * 10, 3 + level * 20);
	var b = getRandom(2 + level * 10, 3 + level * 20);
	var rhs =
		primes[getRandom(level * 5, Math.min(2 + level * 10, primes.length - 1))] *
		primes[getRandom(level * 5, Math.min(2 + level * 10, primes.length - 1))];
	question.push(equationsIfThen(type, a, b, rhs));
}

function productOfPrimesLadder(level) {
	var primes = 2 + level * 5;
	question.push(productOfPrimes(primes));
}

function primeConsecutivesLadder(level) {
	var start = getRandom(1, 2 + level * 20);
	var total = getRandom(2 + level * 2, 2 + level * 4);
	if (start >= 10) {
		total = 3;
	}
	if (level > 0.7) {
		start *= -1;
		if (total % 2 === 0) {
			total -= 1;
		}
		if (start + total >= 0) {
			start = -total - 1;
		}
	}
	question.push(primeConsecutives(start, total));
}

function placeValuePowersLadder(level) {
	var base = getRandom(2 + 10 * level, 6 + 25 * level);
	if (base === 10) {
		base++;
	}
	var index = 2;
	var shift = getRandom(1, 1 + 2 * level);
	if (level > 0.3) {
		index = getRandom(2, 3);
	}
	if (level > 0.3 && toss()) {
		shift *= -1;
	}
	if (level > 0.5) {
		base /= 2;
	}
	if (level > 0.8) {
		base /= 5;
	}
	base = roundError(base);
	question.push(placeValuePowers(base, index, shift));
}

function factoriseSingleLadder(level, expand) {
	var hcf = getRandom(2, 3 + level * 10);
	var terms = 2;
	var variables = 1;
	var max = getRandom(0, 1 + level * 8);
	if (level > 0.4) {
		variables = 2;
	}
	if (level > 0.6) {
		terms = 3;
	}
	question.push(factoriseSingle(hcf, terms, variables, max, expand));
}

function equationsWithRatioLadder(level) {
	var accuracy = 1;
	var den = false;
	if (level > 0.2) {
		accuracy = 2;
	}
	if (level > 0.4) {
		accuracy = 5;
	}
	if (level > 0.6) {
		accuracy = 4;
	}
	if (level > 0.8) {
		accuracy = 10;
	}
	do {
		var co = getRandom(1, 1 + level * 15);
		var a = getRandom(1, 5 + level * 15);
		var b = getRandom(1, 5 + level * 15);
		var c = getRandom(1, 5 + level * 15);
	} while (
		(a * b) / (c * co) !==
			Math.round(((a * b) / (c * co)) * accuracy) / accuracy ||
		b === c ||
		(co === 1 && a === c)
	);
	if (level > 0.4 && toss()) {
		var den = true;
	}
	question.push(equationsWithRatio(co, a, b, c, den));
}

function integersBetweenFractionLadder(level) {
	do {
		var d1 = getRandom(2, 5 + level * 12);
		var n1 = d1 * getRandom(1, 5);
		n1 += getRandom(1, d1 - 1);
		if (level < 0.2) {
			var d2 = d1;
		} else {
			d2 = getRandom(2, 5 + level * 12);
		}
		var n2 = d2 * getRandom(1, 5);
		n2 += getRandom(1, d2 - 1);
		if (level > 0.6) {
			n1 *= -1;
		}
		if (level > 0.8) {
			n2 *= -1;
		}
		var total = Math.abs(n1 / d1 - n2 / d2);
	} while (total < 1 || total > 5 || n1 === d1 || n2 === d2);
	if (level < 0.5 && n1 / d1 > n2 / d2) {
		var t1 = n1;
		var t2 = d1;
		n1 = n2;
		d1 = d2;
		n2 = t1;
		d2 = t2;
	}
	question.push(integersBetweenFraction(n1, d1, n2, d2));
}

function ratioDonatingLadder(level) {
	var max = getRandom(4 + level * 5, 8 + level * 20);
	question.push(ratioDonating(max));
}

function howManyFactorsLadder(level) {
	var primes = [2, 3, 5, 7, 11, 13, 17];
	var indices = [];
	var totalPrimes = 0;
	for (var i = 0; i < Math.min(primes.length, 3 + level * 8); i++) {
		var n = getRandom(0, 2 + level * 4);
		if (i > 3 && n > 1) {
			n = 1;
		}
		totalPrimes += n;
		indices.push(n);
		if (totalPrimes > 1 + level * 5) {
			break;
		}
	}
	question.push(howManyFactors(indices));
}

function closeMultiplesOfTenLadder(level) {
	var power = Math.round(2 + level * 2);
	question.push(closeMultiplesOfTen(power));
}

function linearSimultLadder(level) {
	var negSol, decSol, negCo, decCo, com, same;
	if (level < 0.1) {
		same = 1;
	} else {
		same = 0;
	}
	if (level < 0.3) {
		com = 1;
	} else {
		com = 0;
	}
	if (level < 0.4) {
		negCo = 0;
	} else {
		negCo = 1;
	}
	if (level < 0.5) {
		negSol = 0;
	} else {
		negSol = 1;
	}
	if (level < 0.7) {
		decSol = 0;
	} else {
		decSol = 1;
	}
	if (level < 0.8) {
		decCo = 0;
	} else {
		decCo = 1;
	}
	question.push(linearSimult(negSol, decSol, negCo, decCo, com, same));
}

function errorIntervalLadder(level) {
	var acc = 10;
	if (level > 0) {
		acc = Math.pow(10, getRandom(0, 3));
	}
	if (level > 0.3) {
		acc = Math.pow(10, getRandom(-2, 2));
	}
	if (level > 0.5) {
		acc = Math.pow(10, getRandom(-4, 4));
	}
	if (level > 0.7) {
		acc /= 2;
	}
	question.push(errorIntervals(roundError(acc)));
}

function unitRatioLadder(level) {
	var type = 0;
	if (level > 0.2) {
		type = getRandom(0, 1);
	}
	var mult = getRandom(2, level * 20);
	if (level > 0.5) {
		mult /= 2;
	}
	if (level > 0.7) {
		mult /= 5;
	}
	if (level > 0.9) {
		mult /= 2;
	}
	question.push(unitRatio(type, roundError(mult)));
}

function ratioAsFractionLadder(level) {
	var quantities = [];
	for (var i = 0; i < 2 + Math.floor(level * 2.5); i++) {
		quantities.push(getRandom(1, 5 + level * 20));
	}
	question.push(ratioAsFraction(quantities));
}

function recurrOrTerminateLadder(level) {
	var primes = Math.ceil(1 + level * 5);
	question.push(recurrOrTerminate(primes));
}

function tableOfValuesLinearLadder(level) {
	var m = 1 + getRandom(0, level * 6);
	var c = 0 + getRandom(0, level * 8);
	if (level > 0.2 && toss()) {
		c *= -1;
	}
	if (level > 0.5 && toss()) {
		m *= -1;
	}
	if (level > 0.7 && toss()) {
		m /= 2;
	}
	if (level > 0.8) {
		m = -Math.abs(m);
	}
	if (level > 0.9) {
		c = -Math.abs(c);
	}
	var min = getRandom(0, level * 6);
	if (level > 0.5 && toss()) {
		min *= -1;
	}
	var max = min + 5;
	question.push(tableOfValuesLinear(m, c, min, max));
}

function tableOfValuesQuadraticLadder(level) {
	var a = 1;
	var b = 0;
	var c = 0 + getRandom(0, 5 + level * 8);
	if (level > 0.1 && toss()) {
		c *= -1;
	}
	if (level > 0.2) {
		b = 1 + getRandom(0, level * 6);
		c = 0;
	}
	if (level > 0.3) {
		c = 1 + getRandom(0, 5 + level * 8);
	}
	if (level > 0.4 && toss()) {
		b *= -1;
	}
	if (level > 0.5 && toss()) {
		a = 2 + getRandom(0, level * 5);
	}
	if (level > 0.6 && toss()) {
		a *= -1;
	}
	if (level > 0.7) {
		b = -Math.abs(b);
	}
	if (level > 0.8 && toss()) {
		b /= 2;
	}
	if (level > 0.9) {
		c = -Math.abs(c);
	}
	var min = getRandom(0, level * 6);
	if (level > 0.5 && toss()) {
		min *= -1;
	}
	var max = min + 5;
	question.push(tableOfValuesQuadratic(a, b, c, min, max));
}

function tableOfValuesCubicLadder(level) {
	var a = 1;
	var b = 0;
	var c = 0;
	var d = 0 + getRandom(0, 5 + level * 8);
	if (level > 0.1 && toss()) {
		d *= -1;
	}
	if (level > 0.2) {
		c = 1 + getRandom(0, level * 6);
		d = 0;
	}
	if (level > 0.3) {
		d = 1 + getRandom(0, 5 + level * 8);
	}
	if (level > 0.4 && toss()) {
		c *= -1;
	}
	if (level > 0.5 && toss()) {
		a = 2 + getRandom(0, level * 5);
	}
	if (level > 0.6 && toss()) {
		a *= -1;
	}
	if (level > 0.7 && toss()) {
		b = 1 + getRandom(0, level * 6);
	}
	if (level > 0.8) {
		c = -Math.abs(c);
	}
	if (level > 0.9 && toss()) {
		b = -Math.abs(b);
	}
	var min = getRandom(0, level * 6);
	if (level > 0.5 && toss()) {
		min *= -1;
	}
	var max = min + 5;
	question.push(tableOfValuesCubic(a, b, c, d, min, max));
}

function recurringDecimalsLadder(level) {
	var den = 3;
	if (toss() && level > 0.1) {
		den = 11;
	}
	den *= getRandom(1, level * 4);
	var pow = 0;
	if (level > 0.2) {
		pow++;
	}
	if (level > 0.5) {
		pow++;
	}
	if (level > 0.8) {
		pow++;
	}
	question.push(recurringDecimals(den, pow));
}

function multiplyingSurdsLadder(level) {
	question.push(multiplyingSurds(Math.floor(3 + level * 10)));
}

function simplifyingSurdsLadder(level) {
	var totalSquares = 1;
	var totalSurds = 1;
	var maxPrime = 2;
	if (level > 0) {
		maxPrime++;
	}
	totalSquares += Math.round(level * 1);
	totalSurds += Math.round(level * 2);
	maxPrime += Math.round(level * 1);
	question.push(simplifyingSurds(totalSquares, totalSurds, maxPrime));
}

function addingSurdsLadder(level) {
	var minSeed = 2 + level * 4;
	var maxPrime = 2 + level * 4;
	var subtraction = getRandom(0, 1);
	if (level < 0.2) {
		subtraction = 0;
	}
	question.push(addingSurds(minSeed, maxPrime, subtraction));
}

function functionMachineLadder(level, showOutput) {
	var maxInput = 6 + level * 12;
	var ops = 1 + level * 2.5;
	var negatives = 0;
	if (level > 0.6 && toss()) {
		negatives = true;
	}
	var decimals = 0;
	if (level > 0.8 && toss()) {
		decimals = true;
	}
	question.push(
		functionMachine(maxInput, ops, showOutput, negatives, decimals),
	);
}

function algebraicDivisionLadder(level, twoVariables) {
	var x1 = getRandom(1, 3 + level * 5);
	var x2 = 0;
	if (level > 0.5) {
		x2 = getRandom(1, 3 + level * 5);
	}
	var y1 = 0;
	var y2 = 0;
	if (twoVariables) {
		var y1 = getRandom(1, 3 + level * 5);
		if (level > 0.2) {
			var y2 = getRandom(1, 3 + level * 5);
		}
	}
	var c1 = getRandom(1, 3 + level * 5);
	var c2 = getRandom(1, 3 + level * 5);
	if (twoVariables) {
		c1 = getRandom(0, 3 + level * 5);
	}
	if (level > 0.2 && toss()) {
		x1 *= -1;
	}
	if (level > 0.3 && toss()) {
		x2 *= -1;
	}
	if (level > 0.4 && toss()) {
		y1 *= -1;
	}
	if (level > 0.4 && toss()) {
		y2 *= -1;
	}
	if (level > 0.4 && toss()) {
		c1 *= -1;
	}
	if (level > 0.4 && toss()) {
		c2 *= -1;
	}
	question.push(algebraicDivision(x1, y1, c1, x2, y2, c2));
}

function rationalisingDenominatorsLadder(level) {
	var maxPrimes = 2 + level * 8;
	var commonFactor = false;
	var numSurd = false;
	if (level > 0.2) {
		numSurd = true;
	}
	if (level > 0.4) {
		commonFactor = true;
	}
	question.push(rationalisingDenominators(maxPrimes, commonFactor, numSurd));
}

function rewriteAsSumLadder(level) {
	var n = 2 + level * 3;
	var maxSum = 20 + level * 50;
	var maxTerm = 5 + level * 20;
	var negatives = true;
	if (level < 0.2) {
		negatives = false;
	}
	question.push(rewriteAsSum(n, maxSum, maxTerm, negatives, false));
}

function areaCircleLadder(level) {
	var radius = getRandom(1, 12);
	var pi = false;
	if (level > 0.5 && toss()) {
		pi = true;
	}
	question.push(areaCircle(radius, pi));
}

function circumfereceCircleLadderLadder(level) {
	var radius = getRandom(1, 12);
	var pi = false;
	if (level > 0.5 && toss()) {
		pi = true;
	}
	question.push(circumferenceCircle(radius, pi));
}

function solvingQuadraticFactoriseLadder(level, monic) {
	var a = getRandom(2, 1 + level * 3);
	var b = getRandom(1, 2 + level * 8);
	var c = getRandom(1, 1 + level * 3);
	var d = getRandom(1, 2 + level * 8);
	if (monic) {
		a = 1;
		c = 1;
	}
	if ((level > 0.2) & toss()) {
		b *= -1;
	}
	if ((level > 0.4) & toss()) {
		d *= -1;
	}
	if ((level > 0.6) & toss()) {
		a *= -1;
	}
	if ((level > 0.8) & toss()) {
		c *= -1;
	}
	question.push(solvingQuadraticFactorise(a, b, c, d));
}

function calcAcrossZeroLadder(level) {
	var start = getRandom(-1, -(5 + level * 40));
	var end = getRandom(0, 5 + level * 40);
	if (level > 0.3) {
		start *= 3;
		end *= 3;
	}
	if (level > 0.5) {
		start /= 2;
		end /= 2;
	}
	if (level > 0.7) {
		start *= 3;
		end *= 3;
	}
	if (level > 0.9) {
		start /= 2;
		end /= 2;
	}
	question.push(calcAcrossZero(start, end));
}

function findHypLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.5 && toss()) {
			a /= 2;
		}
		if (level > 0.7 && toss()) {
			b /= 2;
		}
	} while (a / b > 3 || b / a > 3);
	question.push(findHyp(a, b));
}

function findLegLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
		if (level > 0.6 && toss()) {
			a /= 2;
		}
		if (level > 0.8 && toss()) {
			b /= 2;
		}
	} while (a / b > 3 || b / a > 3);
	question.push(findLeg(a, b));
}

function perimeterPythagLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
		if (level > 0.6 && toss()) {
			a /= 2;
		}
		if (level > 0.8 && toss()) {
			b /= 2;
		}
	} while (a / b > 3 || b / a > 3);
	question.push(perimeterPythag(a, b));
}

function areaPythagLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
		if (level > 0.6 && toss()) {
			a /= 2;
		}
		if (level > 0.8 && toss()) {
			b /= 2;
		}
	} while (a / b > 3 || b / a > 3);
	question.push(areaPythag(a, b));
}

function findAngleTrigLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
	} while (a / b > 3 || b / a > 3);
	question.push(findAngleTrig(a, b));
}

function findLengthTrigLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
	} while (a / b > 3 || b / a > 3);
	if (toss()) {
		question.push(findLengthTrig(a, b, undefined));
	} else {
		question.push(findLengthTrig(a, b, getRandom(20, 70)));
	}
}

function findAreaTrigLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
	} while (a / b > 3 || b / a > 3);
	if (toss()) {
		question.push(findAreaTrig(a, b, undefined));
	} else {
		question.push(findAreaTrig(a, b, getRandom(20, 70)));
	}
}

function findPerimeterTrigLadder(level) {
	do {
		var a = getRandom(2, 12 + level * 20);
		var b = getRandom(2, 12 + level * 20);
		if (level > 0.1 && toss()) {
			a /= 2;
		}
		if (level > 0.2 && toss()) {
			b /= 2;
		}
		if (level > 0.3 && toss()) {
			a /= 5;
		}
		if (level > 0.4 && toss()) {
			b /= 5;
		}
	} while (a / b > 3 || b / a > 3);
	if (toss()) {
		question.push(findPerimeterTrig(a, b, undefined));
	} else {
		question.push(findPerimeterTrig(a, b, getRandom(20, 70)));
	}
}

function wordedNumber(n) {
	var n = parseInt(n);
	var wordedNumber = new Array(
		"zero",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"eleven",
		"twelve",
		"thirteen",
		"forteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
		"twenty",
		"twenty-one",
		"twenty-two",
		"twenty-three",
		"twenty-four",
		"twenty-five",
		"twenty-six",
		"twenty-seven",
		"twenty-eight",
		"twenty-nine",
		"thirty",
		"thirty-one",
		"thirty-two",
		"thirty-three",
		"thirty-four",
		"thirty-five",
		"thirty-six",
		"thirty-seven",
		"thirty-eight",
		"thirty-nine",
		"forty",
	);
	if (n < 0) {
		return "negative " + wordedNumber[Math.abs(n)];
	} else {
		return wordedNumber[n];
	}
}

function townPicker(n) {
	var town = new Array(
		"Appleby",
		"Barcombe",
		"Bromwich",
		"Cullfield",
		"Faversham",
		"Gillamoor",
		"Glossop",
		"Gramsby",
		"Helmfirth",
		"Holbeck",
		"Ironhaven",
		"Kirkwall",
		"Langdale",
		"Monmouth",
		"Murkwell",
		"Northbury",
		"Perlshaw",
		"Westray",
		"Westray",
		"Woodpine",
	);
	if (!n) {
		n = getRandom(0, town.length - 1);
	}
	if (n >= town.length) {
		n %= town.length;
	}
	return town[n];
}

function namePicker(n) {
	var name = new Array(
		"Jonny",
		"Onene",
		"Marcia",
		"Becky",
		"Nick",
		"Phoebe",
		"Aleema",
		"Raheem",
		"Noor",
		"David",
		"Amanda",
		"Nicola",
		"Marek",
		"Maral",
		"Rajuia",
		"Donatella",
		"Annasara",
		"Sky",
		"Natalia",
		"Heben",
		"Sara",
		"Solomon",
		"Ebenezer",
		"Robinder",
		"Zofia",
		"Kelly",
		"Wisal",
		"Ferial",
		"Connor",
		"Dean",
		"Creflo",
		"Raheem",
		"Sultan",
		"Paulina",
		"Boguslawa",
		"Michael",
		"Hanadi",
		"Fiza",
		"Arron",
		"Umar",
		"Alixe",
		"Musab",
		"Safia",
		"Ivanilsa",
		"Ionut",
		"Simon",
		"Shanzah",
		"Raphael",
		"Zulqarnain",
		"Kieren",
		"Shareen",
		"Mustafa",
		"Yad",
		"Rishikesh",
		"Adeeba",
		"Frank",
		"Maria",
		"Dawid",
		"Dominik",
		"Sulaimaan",
		"Ghadi",
		"Ayoub",
		"Elera",
		"Charlotte",
		"Adam",
		"Claire",
		"Kathryn",
		"Karen",
		"Nathan",
		"Atul",
		"Nikki",
		"Kirsty",
		"Lucy",
		"Sudeep",
		"Alex",
		"Helen",
		"Rute",
		"Jo",
		"Ashton",
		"Josh",
		"Laura",
	);
	var gender = new Array(
		"M",
		"M",
		"F",
		"F",
		"M",
		"F",
		"F",
		"M",
		"F",
		"M",
		"F",
		"F",
		"M",
		"F",
		"F",
		"F",
		"F",
		"F",
		"F",
		"F",
		"F",
		"M",
		"M",
		"M",
		"F",
		"F",
		"F",
		"F",
		"M",
		"M",
		"M",
		"M",
		"M",
		"F",
		"F",
		"M",
		"F",
		"F",
		"M",
		"M",
		"F",
		"M",
		"F",
		"F",
		"M",
		"M",
		"F",
		"M",
		"M",
		"M",
		"F",
		"M",
		"M",
		"M",
		"F",
		"M",
		"F",
		"M",
		"M",
		"M",
		"F",
		"M",
		"F",
		"F",
		"M",
		"F",
		"F",
		"K",
		"M",
		"M",
		"F",
		"F",
		"F",
		"M",
		"M",
		"F",
		"F",
		"F",
		"M",
		"M",
		"F",
	);
	if (!n) {
		n = getRandom(0, name.length - 1);
	}
	if (n >= name.length) {
		n %= name.length;
	}
	var person = {};
	person.name = name[n];
	person.gender = gender[n];
	if (person.gender === "M") {
		person.subject = "he";
		person.object = "him";
		person.owner = "his";
	} else {
		person.subject = "she";
		person.object = "her";
		person.owner = "her";
	}
	return person;
}

function colourPicker(n) {
	var colour = new Array(
		"red",
		"blue",
		"yellow",
		"green",
		"orange",
		"purple",
		"pink",
		"black",
		"white",
		"brown",
	);
	if (!n) {
		n = getRandom(0, colour.length - 1);
	}
	if (n >= colour.length) {
		n %= colour.length;
	}
	return colour[n];
}

function dayPicker(n) {
	var day = new Array(
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	);
	if (!n) {
		n = getRandom(0, day.length - 1);
	}
	if (n >= day.length) {
		n %= day.length;
	}
	return day[n];
}

function monthPicker(n) {
	var month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	if (!n) {
		n = getRandom(0, month.length - 1);
	}
	if (n >= month.length) {
		n %= month.length;
	}
	return month[n];
}

function fruitPicker(n) {
	var fruit = new Array(
		"apple",
		"pear",
		"banana",
		"plum",
		"orange",
		"lemon",
		"lime",
		"nectarine",
		"melon",
	);
	if (!n) {
		n = getRandom(0, fruit.length - 1);
	}
	if (n >= fruit.length) {
		n %= fruit.length;
	}
	return fruit[n];
}

function letterPicker(n, capitalLetter) {
	var capital = new Array(
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	);
	var lowercase = new Array(
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	);
	if (n < 0) {
		n = getRandom(0, capital.length - 1);
	}
	if (n >= capital.length) {
		n %= capital.length;
	}
	if (capitalLetter) {
		return capital[n];
	} else {
		return lowercase[n];
	}
}

function itemPicker(cost, n) {
	switch (cost) {
		case "large":
			var item = new Array(
				"cooker",
				"television",
				"fridge",
				"computer",
				"mobile phone",
				"laptop",
				"dishwasher",
				"washing machine",
			);
			break;
		case "small":
			item = new Array(
				"pencil",
				"ruler",
				"pen",
				"rubber",
				"chocolate bar",
				"sweet",
			);
	}
	if (!n) {
		n = getRandom(0, item.length - 1);
	}
	if (n >= item.length) {
		n %= item.length;
	}
	return item[n];
}

function unitPicker(type) {
	switch (type) {
		case "length":
			var unit = new Array("mm", "cm", "m", "km");
			break;
		case "weight":
			unit = new Array("mg", "g", "kg");
			break;
		case "volume":
			unit = new Array("ml", "l");
			break;
	}
	return unit[[getRandom(0, unit.length - 1)]];
}

function polygonPicker(sides) {
	var name = new Array(
		"triangle",
		"quadrilateral",
		"pentagon",
		"hexagon",
		"heptagon",
		"octagon",
		"nonagon",
		"decagon",
	);
	if (!sides) {
		sides = getRandom(0, name.length - 1);
	}
	if (sides - 3 >= name.length) {
		sides %= name.length;
	}
	var polygon = {};
	polygon.name = name[sides - 3];
	polygon.sides = sides;
	return polygon;
}

function showDate() {
	var weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	var date = new Date();
	var text =
		date.getDate() +
		ordinal(date.getDate()) +
		" " +
		months[date.getMonth()] +
		" " +
		date.getFullYear();
	return text;
}

function ordinal(n) {
	var x = "";
	if (n % 10 == 1 && n != 11) {
		x += "st";
	} else if (n % 10 == 2 && n != 12) {
		x += "nd";
	} else if (n % 10 == 3 && n != 13) {
		x += "rd";
	} else {
		x += "th";
	}
	return x;
}

function capitalFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toFraction(n) {
	var num = n * 1000000;
	var den = 1000000;
	var hcf = HCF(num, den);
	return "\\frac{" + num / hcf + "}{" + den / hcf + "}";
}

function toPercentage(n) {
	return roundError(n * 100) + "%";
}

function toPounds(n) {
	var pounds = Math.floor(n / 100);
	var pence = n % 100;
	if (pence < 10) {
		pence = "0" + pence;
	}
	return "&pound;" + pounds + "." + pence;
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomMember(array) {
	return array[getRandom(0, array.length - 1)];
}

function stripAnswer(answer) {
	return answer.replace(/ /g, "").toLowerCase();
}

function roundError(answer) {
	return Math.round(answer * 1000000000) / 1000000000;
}
const rgb2hex = (rgb) =>
	`#${rgb
		.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
		.slice(1)
		.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
		.join("")}`;

function fixTerm(coefficient, variable, firstTerm) {
	var term = "+" + coefficient + variable;
	if (coefficient < 0) {
		term = "-" + Math.abs(coefficient) + variable;
	}
	switch (coefficient) {
		case 0:
			term = "";
			break;
		case 1:
			if (variable != "") {
				term = "+" + variable;
			}
			break;
		case -1:
			if (variable != "") {
				term = "-" + variable;
			}
			break;
	}
	if (firstTerm && coefficient > 0) {
		term = term.substr(1);
	}
	return term;
}

function HCF(x, y) {
	var temp;
	if (x < 0) {
		x *= -1;
	}
	if (y < 0) {
		y *= -1;
	}
	if (x == y) {
		return x;
	}
	while (x != 0) {
		y = y % x;
		temp = x;
		x = y;
		y = temp;
	}
	return y;
}

function simplifySurd(x) {
	var a = 1;
	for (var i = 1; i <= x; i++) {
		if (x % (i * i) === 0) {
			a *= i;
			x /= i * i;
			i = 1;
		}
	}
	if (x === 1) {
		return a;
	}
	if (a === 1) {
		return "\\sqrt{" + x + "}";
	} else {
		return a + "\\sqrt{" + x + "}";
	}
}

function isPrime(n) {
	var isPrime = true;
	if (n < 2) {
		isPrime = false;
	}
	for (var i = 2; i <= Math.sqrt(n); i++) {
		if (n % i == 0) {
			isPrime = false;
		}
	}
	return isPrime;
}

function factorial(n) {
	var fact = 1;
	for (var i = 2; i <= n; i++) {
		fact *= i;
	}
	return fact;
}

function combin(n, k) {
	return Math.round(factorial(n) / (factorial(k) * factorial(n - k)));
}

function toss() {
	if (Math.random() < 0.5) {
		return true;
	} else {
		return false;
	}
}

function changeBG(colour) {
	var questions = document.getElementsByClassName("questionBox");
	for (i = 0; i < questions.length; i++) {
		questions[i].style.backgroundColor = colour;
	}
}

function goFull() {
	if (controls.style.display !== "none") {
		controls.style.display = "none";
		content.style.height = "100vh";
		footer.style.display = "none";
	} else {
		controls.style.display = "block";
		content.style.height = "100%";
		footer.style.display = "block";
	}
	try {
		if (theCanvas) {
			context = theCanvas.getContext("2d");
			context.canvas.width = 0.95 * window.innerWidth;
			context.canvas.height = 0.95 * window.innerHeight;
			drawScreen();
		}
	} catch (e) {}
}

function getQuestion(currentTopic, level) {
	var totalQuestions = 154;
	if (currentTopic > totalQuestions) {
		currentTopic = "" + (currentTopic % totalQuestions);
	}
	if (currentTopic == 0) {
		currentTopic = "" + getRandom(1, totalQuestions);
	}

	questionTopics.push(currentTopic);

	level = Math.round(10 * level) / 10;
	switch (currentTopic) {
		case "1":
			additionLadder(level);
			break;
		case "2":
			subtractionLadder(level);
			break;
		case "3":
			multiplicationLadder(level);
			break;
		case "4":
			divisionLadder(level);
			break;
		case "5":
			halvingLadder(level);
			break;
		case "6":
			doublingLadder(level);
			break;
		case "7":
			fractionOfAmountLadder(level);
			break;
		case "8":
			percentageOfAmountLadder(level);
			break;
		case "9":
			roundingLadder(level);
			break;
		case "10":
			negativeLadder(level);
			break;
		case "11":
			powersOfTenLadder(level);
			break;
		case "12":
			ratioShareLadder(level);
			break;
		case "13":
			convertingFDPLadder(level, "random");
			break;
		case "14":
			collectingTermsLadder(level);
			break;
		case "15":
			factorLadder(level);
			break;
		case "16":
			multipleLadder(level);
			break;
		case "17":
			hcfLadder(level);
			break;
		case "18":
			lcmLadder(level);
			break;
		case "19":
			simplifyingRatiosLadder(level);
			break;
		case "20":
			simplifyingFractionsLadder(level);
			break;
		case "21":
			nthTermLinearLadder(level);
			break;
		case "22":
			nthTermGeneratingLadder(level);
			break;
		case "23":
			fourOpsLadder(level);
			break;
		case "24":
			addingCoinsLadder(level);
			break;
		case "25":
			countingCoinsLadder(level);
			break;
		case "26":
			speedDistTimeLadder(level);
			break;
		case "27":
			powersAndRootsLadder(level);
			break;
		case "28":
			orderingLadder(level);
			break;
		case "29":
			oneStepEquationLadder(level);
			break;
		case "30":
			numberBondsLadder(level);
			break;
		case "31":
			addSubtractFractionsLadder(level);
			break;
		case "32":
			multiplyDivideFractionsLadder(level, 0);
			break;
		case "33":
			meanLadder(level);
			break;
		case "34":
			medianLadder(level);
			break;
		case "35":
			rangeLadder(level);
			break;
		case "36":
			modeLadder(level);
			break;
		case "37":
			averagesLadder(level);
			break;
		case "38":
			twoStepEquationLadder(level);
			break;
		case "39":
			multiplyDivideStandardFormLadder(level, "*");
			break;
		case "40":
			addSubtractStandardFormLadder(level, "+");
			break;
		case "41":
			convertingToStandardFormLadder(level);
			break;
		case "42":
			convertingFractionsLadder(level, true);
			break;
		case "43":
			threeStepEquationLadder(level);
			break;
		case "44":
			equationsMixedLadder(level);
			break;
		case "45":
			convertingMeticLengthLadder(level);
			break;
		case "46":
			equationsWithBracketsLadder(level);
			break;
		case "47":
			sequencesNextTermLadder(level);
			break;
		case "48":
			equationsWithBracketsBothLadder(level);
			break;
		case "49":
			percentageIncreaseDecreaseLadder(level);
			break;
		case "50":
			reversePercentageLadder(level);
			break;
		case "51":
			substitutionLadder(level);
			break;
		case "52":
			ratioReverseLadder(level);
			break;
		case "53":
			unitaryMethodLadder(level);
			break;
		case "54":
			fractionsFourOpsLadder(level);
			break;
		case "55":
			convertingMeticWeightLadder(level);
			break;
		case "56":
			convertingMeticVolumeLadder(level);
			break;
		case "57":
			convertingMeticMixedLadder(level);
			break;
		case "58":
			probabilityBasicLadder(level);
			break;
		case "59":
			fractionalChangeLadder(level);
			break;
		case "60":
			differenceLadder(level);
			break;
		case "61":
			changingTemperaturesLadder(level);
			break;
		case "62":
			polygonSidesLadder(level);
			break;
		case "63":
			expectedFrequencyLadder(level);
			break;
		case "64":
			multiplyingTermsLadder(level);
			break;
		case "65":
			factoriseSingleLadder(level, true);
			break;
		case "66":
			expandSimplifySingleBracketsLadder(level);
			break;
		case "67":
			interchangingFDPLadder(level, "random");
			break;
		case "68":
			oneStepEquationLadder(level, true);
			break;
		case "69":
			twoStepEquationLadder(level, true);
			break;
		case "70":
			threeStepEquationLadder(level, true);
			break;
		case "71":
			fibonacciLadder(level);
			break;
		case "72":
			geometricSequenceLadder(level);
			break;
		case "73":
			nthTermQuadraticLadder(level);
			break;
		case "74":
			convertingTimeLadder(level);
			break;
		case "75":
			addSubtractStandardFormLadder(level, "-");
			break;
		case "76":
			multiplyDivideStandardFormLadder(level, "/");
			break;
		case "77":
			interchangingFDPLadder(level, "fraction");
			break;
		case "78":
			interchangingFDPLadder(level, "percentage");
			break;
		case "79":
			convertingFDPLadder(level, "decimal");
			break;
		case "80":
			convertingFDPLadder(level, "fraction");
			break;
		case "81":
			convertingFDPLadder(level, "percentage");
			break;
		case "82":
			gradientTwoPointsLadder(level);
			break;
		case "83":
			midpointTwoPointsLadder(level);
			break;
		case "84":
			completingSquareLadder(level);
			break;
		case "85":
			turningPointToQuadraticLadder(level);
			break;
		case "86":
			factoriseExpandMonicQuadraticsLadder(level, false);
			break;
		case "87":
			factoriseExpandMonicQuadraticsLadder(level, true);
			break;
		case "88":
			indexLawMultiplyLadder(level);
			break;
		case "89":
			indexLawDivideLadder(level);
			break;
		case "90":
			indexLawPowerOfPowerLadder(level);
			break;
		case "91":
			indexLawMixedLadder(level);
			break;
		case "92":
			ratioMixedLadder(level);
			break;
		case "93":
			combiningRatiosLadder(level);
			break;
		case "94":
			ratioDifferenceLadder(level);
			break;
		case "95":
			percentageMultiplierLadder(level);
			break;
		case "96":
			percentageChangeLadder(level);
			break;
		case "97":
			repeatedPercentageChangeLadder(level);
			break;
		case "98":
			addingNegativesLadder(level);
			break;
		case "99":
			subtractingNegativesLadder(level);
			break;
		case "100":
			multiplyingDividingNegativesLadder(level, "*");
			break;
		case "101":
			multiplyingDividingNegativesLadder(level, "/");
			break;
		case "102":
			convertingFromStandardFormLadder(level);
			break;
		case "103":
			stateEquationOfCircleLadder(level);
			break;
		case "104":
			orderOfOpsTimesDivideLadder(level);
			break;
		case "105":
			orderOfOpsAddSubtractLadder(level);
			break;
		case "106":
			givenDecimalFindFractionLadder(level);
			break;
		case "107":
			equationsIfThenLadder(level);
			break;
		case "108":
			productOfPrimesLadder(level);
			break;
		case "109":
			primeConsecutivesLadder(level);
			break;
		case "110":
			tableBondsLadder(level);
			break;
		case "111":
			convertingFractionsLadder(level, false);
			break;
		case "112":
			placeValuePowersLadder(level);
			break;
		case "113":
			factoriseSingleLadder(level, false);
			break;
		case "114":
			multiplyDivideFractionsLadder(level, 1);
			break;
		case "115":
			equationsWithRatioLadder(level);
			break;
		case "116":
			integersBetweenFractionLadder(level);
			break;
		case "117":
			ratioDonatingLadder(level);
			break;
		case "118":
			howManyFactorsLadder(level);
			break;
		case "119":
			closeMultiplesOfTenLadder(level);
			break;
		case "120":
			nthTermSpecificTermLadder(level);
			break;
		case "121":
			linearSimultLadder(level);
			break;
		case "122":
			errorIntervalLadder(level);
			break;
		case "123":
			unitRatioLadder(level);
			break;
		case "124":
			ratioAsFractionLadder(level);
			break;
		case "125":
			recurrOrTerminateLadder(level);
			break;
		case "126":
			tableOfValuesLinearLadder(level);
			break;
		case "127":
			recurringDecimalsLadder(level);
			break;
		case "128":
			multiplyingSurdsLadder(level);
			break;
		case "129":
			simplifyingSurdsLadder(level);
			break;
		case "130":
			addingSurdsLadder(level);
			break;
		case "131":
			functionMachineLadder(level, 0);
			break;
		case "132":
			functionMachineLadder(level, 1);
			break;
		case "133":
			factoriseExpandNonMonicQuadraticsLadder(level, false);
			break;
		case "134":
			factoriseExpandNonMonicQuadraticsLadder(level, true);
			break;
		case "135":
			algebraicDivisionLadder(level, false);
			break;
		case "136":
			algebraicDivisionLadder(level, true);
			break;
		case "137":
			rationalisingDenominatorsLadder(level);
			break;
		case "138":
			rewriteAsSumLadder(level);
			break;
		case "139":
			lengthBetweenTwoPointsLadder(level);
			break;
		case "140":
			tableOfValuesQuadraticLadder(level);
			break;
		case "141":
			tableOfValuesCubicLadder(level);
			break;
		case "142":
			areaCircleLadder(level);
			break;
		case "143":
			solvingQuadraticFactoriseLadder(level, true);
			break;
		case "144":
			solvingQuadraticFactoriseLadder(level, false);
			break;
		case "145":
			circumfereceCircleLadderLadder(level);
			break;
		case "146":
			calcAcrossZeroLadder(level);
			break;
		case "147":
			findHypLadder(level);
			break;
		case "148":
			findLegLadder(level);
			break;
		case "149":
			perimeterPythagLadder(level);
			break;
		case "150":
			areaPythagLadder(level);
			break;
		case "151":
			findAngleTrigLadder(level);
			break;
		case "152":
			findLengthTrigLadder(level);
			break;
		case "153":
			findAreaTrigLadder(level);
			break;
		case "154":
			findPerimeterTrigLadder(level);
			break;
	}
}

function getGcseQuestion(currentTopic) {
	var totalQuestions = 110;
	if (currentTopic == 0) {
		currentTopic = getRandom(1, totalQuestions);
		while (!document.getElementById("q" + currentTopic)) {
			currentTopic = getRandom(1, totalQuestions);
		}
	}
	var question;
	switch (currentTopic) {
		case 1:
			question = missingValuesUsingTheMean();
			break;
		case 2:
			question = repeatedPercentageChange();
			break;
		case 3:
			question = tangentsToCircles();
			break;
		case 4:
			question = bestValue();
			break;
		case 5:
			question = sumProductDifference();
			break;
		case 6:
			question = factorSumProblem();
			break;
		case 7:
			question = percentageDecrease();
			break;
		case 8:
			question = buyingCheese();
			break;
		case 9:
			question = lengthOfStick();
			break;
		case 10:
			question = squareRectanglePerimeters();
			break;
		case 11:
			question = findOriginalGivenHcfLcm();
			break;
		case 12:
			question = readingFuel();
			break;
		case 13:
			question = gcse13();
			break;
		case 14:
			question = basicPythagoras();
			break;
		case 15:
			question = gcse15();
			break;
		case 16:
			question = directInverseProportion();
			break;
		case 17:
			question = speedDistanceTime();
			break;
		case 18:
			question = sharingRatioWithFDP();
			break;
		case 19:
			question = linearInequalities();
			break;
		case 20:
			question = savingPercentageOfWages();
			break;
		case 21:
			question = circleWithinSemicircle();
			break;
		case 22:
			question = cafeMenuChangeProblem();
			break;
		case 23:
			question = thinkOfANumber();
			break;
		case 24:
			question = holidayLoan();
			break;
		case 25:
			question = equationOfPerpendiculars();
			break;
		case 26:
			question = anglesInTetrahedron();
			break;
		case 27:
			question = angleAndAreaOfTriangles();
			break;
		case 28:
			question = sideLengthOfEquilateral();
			break;
		case 29:
			question = mixingDensities();
			break;
		case 30:
			question = estimatingPopulations();
			break;
		case 31:
			question = expandingCubics();
			break;
		case 32:
			question = nthTermOfQuadratic();
			break;
		case 33:
			question = proofs();
			break;
		case 34:
			question = errorIntervals();
			break;
		case 35:
			question = pressureForceArea();
			break;
		case 36:
			question = boxOfPens();
			break;
		case 37:
			question = convertingSpeeds();
			break;
		case 38:
			question = comparingPuzzleTimes();
			break;
		case 39:
			question = exactTrigValues();
			break;
		case 40:
			question = fruitProblem();
			break;
		case 41:
			question = proportionalDivision();
			break;
		case 42:
			question = quadraticInequalities();
			break;
		case 43:
			question = cardCombinations();
			break;
		case 44:
			question = turningPoints();
			break;
		case 45:
			question = boyGirlCombinations();
			break;
		case 46:
			question = gardenSlugs();
			break;
		case 47:
			question = reverseProbabilityWithRatio();
			break;
		case 48:
			question = railcardDiscounts();
			break;
		case 49:
			question = orderingFDPCalc();
			break;
		case 50:
			question = exchangeRates();
			break;
		case 51:
			question = sowingSeeds();
			break;
		case 52:
			question = fibonacciAlgebra();
			break;
		case 53:
			question = probabilityPercentages();
			break;
		case 54:
			question = concreteRatio();
			break;
		case 55:
			question = sharingRatioWithPercentages();
			break;
		case 56:
			question = proportionalRelationships();
			break;
		case 57:
			question = combiningRatios();
			break;
		case 58:
			question = dimensionalScaleFactors();
			break;
		case 59:
			question = factorisingDiffOfTwoSquares();
			break;
		case 60:
			question = maxItemsSameQuantity();
			break;
		case 61:
			question = algebraPolygonPerimeter();
			break;
		case 62:
			question = oddEvenAlgebra();
			break;
		case 63:
			question = linearSequences();
			break;
		case 64:
			question = isoscelesAlgebra();
			break;
		case 65:
			question = algebraicTaxis();
			break;
		case 66:
			question = numbersFromCards();
			break;
		case 67:
			question = ratioDonatingShares();
			break;
		case 68:
			question = functionSubAndSolve();
			break;
		case 69:
			question = compositeFunctions();
			break;
		case 70:
			question = inverseFunctions();
			break;
		case 71:
			question = missingCardValuesUingMean();
			break;
		case 72:
			question = equationOfPerpendicularsWithRatio();
			break;
		case 73:
			question = findingMidpointsWithRatio();
			break;
		case 74:
			question = repeatedPercentageChangeInReverse();
			break;
		case 75:
			question = deliveringGoods();
			break;
		case 76:
			question = profitOnGoods();
			break;
		case 77:
			question = changingRatios();
			break;
		case 78:
			question = estimatedProfit();
			break;
		case 79:
			question = testingPythagoras();
			break;
		case 80:
			question = multipleRatiosAndPercentages();
			break;
		case 81:
			question = nonCalcReversePercentage();
			break;
		case 82:
			question = productOfPrimes();
			break;
		case 83:
			question = multiplyingDecimals();
			break;
		case 84:
			question = areaOfSquareExpressions();
			break;
		case 85:
			question = framingMetal();
			break;
		case 86:
			question = showingIfParallel();
			break;
		case 87:
			question = vectorsInParallelograms();
			break;
		case 88:
			question = expectedFrequency();
			break;
		case 89:
			question = theatreSeats89();
			break;
		case 90:
			question = combinedAverageSpeed90();
			break;
		case 91:
			question = similarTriangles91();
			break;
		case 92:
			question = squareInACircle92();
			break;
		case 93:
			question = reversePercentages93();
			break;
		case 94:
			question = sandEquations94();
			break;
		case 95:
			question = ratiosOnALine95();
			break;
		case 96:
			question = surfaceAreaVolumeCube96();
			break;
		case 97:
			question = percentageProfit97();
			break;
		case 98:
			question = sameDistanceDifferentTime98();
			break;
		case 99:
			question = proportionalWages99();
			break;
		case 100:
			question = ageEquationsWithRatio100();
			break;
		case 101:
			question = missingConstantsInFunctions101();
			break;
		case 102:
			question = transfromingTrigValues102();
			break;
		case 103:
			question = cuttingWire103();
			break;
		case 104:
			question = evenOddMultiples104();
			break;
		case 105:
			question = countersInABag105();
			break;
		case 106:
			question = wordedProbabilityScale106();
			break;
		case 107:
			question = squaresOnAnAxes107();
			break;
		case 108:
			question = interiorExteriorAngles108();
			break;
		case 109:
			question = percentageWageBonus109();
			break;
		case 110:
			question = estimatingWithSpeedOfPlane110();
			break;
	}
	return question;
}

function RightTriangle(a, b, angle) {
	this.a = a;
	if (!angle) {
		this.b = b;
	} else {
		this.b = a * Math.tan(toRadians(angle));
	}
	this.cSquared = this.a * this.a + this.b * this.b;
	this.cSurd = simplifySurd(this.cSquared);
	this.cDec = Math.sqrt(this.cSquared);
	this.area = (this.a * this.b) / 2;
	this.perimeter = this.a + this.b + this.cDec;
	var c = this.cDec;
	this.A =
		(Math.acos((c * c + this.b * this.b - this.a * this.a) / (2 * c * this.b)) *
			180) /
		Math.PI;
	this.B =
		(Math.acos((this.a * this.a + c * c - this.b * this.b) / (2 * this.a * c)) *
			180) /
		Math.PI;
	this.C =
		(Math.acos(
			(this.a * this.a + this.b * this.b - c * c) / (2 * this.a * this.b),
		) *
			180) /
		Math.PI;
	this.display = function (a, b, c, A, B, C) {
		var size = 200;
		var scale = (size * 0.75) / (1.2 * Math.max(this.a, this.b));
		var gap = 12;
		var x1 = size * 0.05;
		var y1 = size * 0.8;
		var x2 = size * 0.05 + this.a * scale;
		var y2 = size * 0.8 - this.b * scale;
		var svgData = "<svg width='" + size + "' height='" + size + "'>";
		svgData +=
			"<line x1='" +
			x1 +
			"' y1='" +
			y1 +
			"' x2='" +
			x2 +
			"' y2='" +
			y1 +
			"' stroke='black' />";
		svgData +=
			"<line x1='" +
			x1 +
			"' y1='" +
			y1 +
			"' x2='" +
			x2 +
			"' y2='" +
			y2 +
			"' stroke='black' />";
		svgData +=
			"<line x1='" +
			x2 +
			"' y1='" +
			y2 +
			"' x2='" +
			x2 +
			"' y2='" +
			y1 +
			"' stroke='black' />";
		svgData +=
			"<line x1='" +
			(x2 - gap) +
			"' y1='" +
			y1 +
			"' x2='" +
			(x2 - gap) +
			"' y2='" +
			(y1 - gap) +
			"' stroke='black' />";
		svgData +=
			"<line x1='" +
			(x2 - gap) +
			"' y1='" +
			(y1 - gap) +
			"' x2='" +
			x2 +
			"' y2='" +
			(y1 - gap) +
			"' stroke='black' />";
		svgData +=
			"<text x='" +
			(x2 - (x2 - x1) / 2 - gap / 2) +
			"' y='" +
			(y1 + 1.8 * gap) +
			"' font-size='0.7em' fill='#000000'>" +
			a +
			"</text>";
		svgData +=
			"<text x='" +
			(x2 + 0.5 * gap) +
			"' y='" +
			(y1 - (y1 - y2) / 2 + gap / 1.2) +
			"' font-size='0.7em' fill='#000000'>" +
			b +
			"</text>";
		svgData +=
			"<text x='" +
			((x2 - x1) / 2 - gap) +
			"' y='" +
			(y1 - (y1 - y2) / 2 - gap) +
			"' font-size='0.7em' fill='#000000'>" +
			c +
			"</text>";
		if (A) {
			svgData +=
				"<text x='" +
				(x1 + gap / 1.2) +
				"' y='" +
				(y1 - gap / 4) +
				"' font-size='0.6em' fill='#000000'>" +
				A +
				"</text>";
		}
		svgData += "</svg>";
		return svgData;
	};
}

var strands = new Array(
	"Number",
	"Algebra",
	"Geometry & Measures",
	"Ratio & Proportion",
	"Probability",
	"Statistics",
);
var topics = [];
var columns = 3;
var question = [];
var questionTopics= [];
var totalQuestions = 10;
var level = 0;
var showingAnswers = false;
topics[0] = [];
topics[0][0] = {};
topics[0][0].topic = "Arithmetic: Addition";
topics[0][0].id = "1";
topics[0][1] = {};
topics[0][1].topic = "Arithmetic: Division";
topics[0][1].id = "4";
topics[0][2] = {};
topics[0][2].topic = "Arithmetic: Four operations";
topics[0][2].id = "23";
topics[0][3] = {};
topics[0][3].topic = "Arithmetic: Multiplication";
topics[0][3].id = "3";
topics[0][4] = {};
topics[0][4].topic = "Arithmetic: Subtraction";
topics[0][4].id = "2";
topics[0][5] = {};
topics[0][5].topic = "Bounds: Error Intervals";
topics[0][5].id = "122";
topics[0][6] = {};
topics[0][6].topic = "Differences";
topics[0][6].id = "60";
topics[0][7] = {};
topics[0][7].topic = "Directed number: Addition with negatives";
topics[0][7].id = "98";
topics[0][8] = {};
topics[0][8].topic = "Directed number: Calculating across zero";
topics[0][8].id = "146";
topics[0][9] = {};
topics[0][9].topic = "Directed number: Division with negatives";
topics[0][9].id = "101";
topics[0][10] = {};
topics[0][10].topic = "Directed number: Mixed operations with negatives";
topics[0][10].id = "10";
topics[0][11] = {};
topics[0][11].topic = "Directed number: Multiplication with negatives";
topics[0][11].id = "100";
topics[0][12] = {};
topics[0][12].topic = "Directed number: Negative temperatures";
topics[0][12].id = "61";
topics[0][13] = {};
topics[0][13].topic = "Directed number: Rewriting as a sum";
topics[0][13].id = "138";
topics[0][14] = {};
topics[0][14].topic = "Directed number: Subtraction with negatives";
topics[0][14].id = "99";
topics[0][15] = {};
topics[0][15].topic = "Doubling";
topics[0][15].id = "6";
topics[0][16] = {};
topics[0][16].topic = "Factors";
topics[0][16].id = "15";
topics[0][17] = {};
topics[0][17].topic = "FDP: Converting from decimals";
topics[0][17].id = "79";
topics[0][18] = {};
topics[0][18].topic = "FDP: Converting from fractions";
topics[0][18].id = "80";
topics[0][19] = {};
topics[0][19].topic = "FDP: Converting from percentages";
topics[0][19].id = "81";
topics[0][20] = {};
topics[0][20].topic = "FDP: Converting recurring decimals to fractions";
topics[0][20].id = "127";
topics[0][21] = {};
topics[0][21].topic = "FDP: Using decimals to find fractions";
topics[0][21].id = "106";
topics[0][22] = {};
topics[0][22].topic = "Fractions: Addition and subtraction";
topics[0][22].id = "31";
topics[0][23] = {};
topics[0][23].topic = "Fractions: Converting improper to mixed";
topics[0][23].id = "42";
topics[0][24] = {};
topics[0][24].topic = "Fractions: Converting mixed to improper ";
topics[0][24].id = "111";
topics[0][25] = {};
topics[0][25].topic = "Fractions: Division";
topics[0][25].id = "114";
topics[0][26] = {};
topics[0][26].topic = "Fractions: Four operations";
topics[0][26].id = "54";
topics[0][27] = {};
topics[0][27].topic = "Fractions: Increase and decrease";
topics[0][27].id = "59";
topics[0][28] = {};
topics[0][28].topic = "Fractions: Integers between improper fractions";
topics[0][28].id = "116";
topics[0][29] = {};
topics[0][29].topic = "Fractions: Multiplication";
topics[0][29].id = "32";
topics[0][30] = {};
topics[0][30].topic = "Fractions: Of amounts";
topics[0][30].id = "7";
topics[0][31] = {};
topics[0][31].topic = "Fractions: Of one amount to another";
topics[0][31].id = "77";
topics[0][32] = {};
topics[0][32].topic = "Fractions: Simplifying";
topics[0][32].id = "20";
topics[0][33] = {};
topics[0][33].topic = "Halving";
topics[0][33].id = "5";
topics[0][34] = {};
topics[0][34].topic = "Indices: Division law";
topics[0][34].id = "89";
topics[0][35] = {};
topics[0][35].topic = "Indices: Mixed Laws";
topics[0][35].id = "91";
topics[0][36] = {};
topics[0][36].topic = "Indices: Multiplication law";
topics[0][36].id = "88";
topics[0][37] = {};
topics[0][37].topic = "Indices: Power law";
topics[0][37].id = "90";
topics[0][38] = {};
topics[0][38].topic = "Multiples";
topics[0][38].id = "16";
topics[0][39] = {};
topics[0][39].topic = "Number bonds: Adding close powers of ten";
topics[0][39].id = "119";
topics[0][40] = {};
topics[0][40].topic = "Order of Operations: Addition and Subtraction";
topics[0][40].id = "105";
topics[0][41] = {};
topics[0][41].topic = "Order of Operations: Multiplication and Division";
topics[0][41].id = "104";
topics[0][42] = {};
topics[0][42].topic = "Percentages: Of one amount to another";
topics[0][42].id = "78";
topics[0][43] = {};
topics[0][43].topic = "Place Value: Multiplying and dividing by powers of ten";
topics[0][43].id = "11";
topics[0][44] = {};
topics[0][44].topic = "Place Value: Ordering numbers";
topics[0][44].id = "28";
topics[0][45] = {};
topics[0][45].topic = "Place Value: Powers";
topics[0][45].id = "112";
topics[0][46] = {};
topics[0][46].topic = "Powers and roots";
topics[0][46].id = "27";
topics[0][47] = {};
topics[0][47].topic = "Prime Factors: Adding and subtracting surds";
topics[0][47].id = "130";
topics[0][48] = {};
topics[0][48].topic = "Prime Factors: Consecutive integer product";
topics[0][48].id = "109";
topics[0][49] = {};
topics[0][49].topic = "Prime Factors: Expressing as a product";
topics[0][49].id = "108";
topics[0][50] = {};
topics[0][50].topic = "Prime Factors: Highest common factors (HCF)";
topics[0][50].id = "17";
topics[0][51] = {};
topics[0][51].topic = "Prime Factors: How many factors";
topics[0][51].id = "118";
topics[0][52] = {};
topics[0][52].topic = "Prime Factors: Lowest common multiples (LCM)";
topics[0][52].id = "18";
topics[0][53] = {};
topics[0][53].topic = "Prime Factors: Missing products";
topics[0][53].id = "110";
topics[0][54] = {};
topics[0][54].topic = "Prime Factors: Multiplying surds";
topics[0][54].id = "128";
topics[0][55] = {};
topics[0][55].topic =
	"Prime Factors: Rationalising the denominator of a fraction with a surd";
topics[0][55].id = "137";
topics[0][56] = {};
topics[0][56].topic = "Prime Factors: Recurring or terminating decimals";
topics[0][56].id = "125";
topics[0][57] = {};
topics[0][57].topic = "Prime Factors: Simplifying surds";
topics[0][57].id = "129";
topics[0][58] = {};
topics[0][58].topic = "Rounding";
topics[0][58].id = "9";
topics[0][59] = {};
topics[0][59].topic = "Standard Form: Addition";
topics[0][59].id = "40";
topics[0][60] = {};
topics[0][60].topic = "Standard Form: Converting from";
topics[0][60].id = "102";
topics[0][61] = {};
topics[0][61].topic = "Standard Form: Converting to";
topics[0][61].id = "41";
topics[0][62] = {};
topics[0][62].topic = "Standard Form: Division";
topics[0][62].id = "76";
topics[0][63] = {};
topics[0][63].topic = "Standard Form: Multiplication";
topics[0][63].id = "39";
topics[0][64] = {};
topics[0][64].topic = "Standard Form: Subtraction";
topics[0][64].id = "75";
topics[1] = [];
topics[1][0] = {};
topics[1][0].topic = "Circles: Stating the equation";
topics[1][0].id = "103";
topics[1][1] = {};
topics[1][1].topic = "Cubic Graphs: Completing a table of values";
topics[1][1].id = "141";
topics[1][2] = {};
topics[1][2].topic = "Equations: If ... then ...";
topics[1][2].id = "107";
topics[1][3] = {};
topics[1][3].topic = "Equations: Mixed";
topics[1][3].id = "44";
topics[1][4] = {};
topics[1][4].topic = "Equations: Solving equations involving ratio";
topics[1][4].id = "115";
topics[1][5] = {};
topics[1][5].topic = "Equations: Solving linear simultaneous";
topics[1][5].id = "121";
topics[1][6] = {};
topics[1][6].topic = "Equations: Solving monic quadratics by factorising";
topics[1][6].id = "143";
topics[1][7] = {};
topics[1][7].topic = "Equations: Solving non-monic quadratics by factorising";
topics[1][7].id = "144";
topics[1][8] = {};
topics[1][8].topic = "Equations: Solving one-step equations";
topics[1][8].id = "29";
topics[1][9] = {};
topics[1][9].topic = "Equations: Solving two-step equations";
topics[1][9].id = "38";
topics[1][10] = {};
topics[1][10].topic = "Equations: Solving with brackets both sides";
topics[1][10].id = "48";
topics[1][11] = {};
topics[1][11].topic = "Equations: Solving with brackets one side";
topics[1][11].id = "46";
topics[1][12] = {};
topics[1][12].topic = "Equations: Solving with unknowns on both sides";
topics[1][12].id = "43";
topics[1][13] = {};
topics[1][13].topic = "Expressions: Algebraic division in one variable";
topics[1][13].id = "135";
topics[1][14] = {};
topics[1][14].topic = "Expressions: Algebraic division in two variables";
topics[1][14].id = "136";
topics[1][15] = {};
topics[1][15].topic = "Expressions: Collecting like terms";
topics[1][15].id = "14";
topics[1][16] = {};
topics[1][16].topic = "Expressions: Completing the square";
topics[1][16].id = "84";
topics[1][17] = {};
topics[1][17].topic = "Expressions: Expanding binomials to monic quadratics";
topics[1][17].id = "87";
topics[1][18] = {};
topics[1][18].topic =
	"Expressions: Expanding binomials to non-monic quadratics";
topics[1][18].id = "134";
topics[1][19] = {};
topics[1][19].topic = "Expressions: Expanding brackets and simplifying ";
topics[1][19].id = "66";
topics[1][20] = {};
topics[1][20].topic = "Expressions: Expanding single brackets";
topics[1][20].id = "65";
topics[1][21] = {};
topics[1][21].topic = "Expressions: Factorising into single brackets";
topics[1][21].id = "113";
topics[1][22] = {};
topics[1][22].topic = "Expressions: Factorising monic quadratics";
topics[1][22].id = "86";
topics[1][23] = {};
topics[1][23].topic = "Expressions: Factorising non-monic quadratics";
topics[1][23].id = "133";
topics[1][24] = {};
topics[1][24].topic = "Expressions: Multiplying terms";
topics[1][24].id = "64";
topics[1][25] = {};
topics[1][25].topic = "Expressions: Substitution";
topics[1][25].id = "51";
topics[1][26] = {};
topics[1][26].topic = "Functions: Find an input given an output";
topics[1][26].id = "132";
topics[1][27] = {};
topics[1][27].topic = "Functions: Find an output given an input";
topics[1][27].id = "131";
topics[1][28] = {};
topics[1][28].topic = "Graphs: Gradient between two points on a line";
topics[1][28].id = "82";
topics[1][29] = {};
topics[1][29].topic = "Graphs: Midpoint between two points on a line";
topics[1][29].id = "83";
topics[1][30] = {};
topics[1][30].topic = "Inequalities: Solving 1 step";
topics[1][30].id = "68";
topics[1][31] = {};
topics[1][31].topic = "Inequalities: Solving 2 step";
topics[1][31].id = "69";
topics[1][32] = {};
topics[1][32].topic = "Inequalities: Solving unknowns on both sides";
topics[1][32].id = "70";
topics[1][33] = {};
topics[1][33].topic = "Linear Graphs: Completing a table of values";
topics[1][33].id = "126";
topics[1][34] = {};
topics[1][34].topic = "Number bonds: Addition and Subtraction";
topics[1][34].id = "30";
topics[1][35] = {};
topics[1][35].topic = "Quadratic Graphs: Completing a table of values";
topics[1][35].id = "140";
topics[1][36] = {};
topics[1][36].topic = "Quadratics: Find equation given turning point";
topics[1][36].id = "85";
topics[1][37] = {};
topics[1][37].topic = "Sequences: Fibonacci";
topics[1][37].id = "71";
topics[1][38] = {};
topics[1][38].topic = "Sequences: Finding a linear nth term rule";
topics[1][38].id = "21";
topics[1][39] = {};
topics[1][39].topic = "Sequences: Finding a quadratic nth term rule";
topics[1][39].id = "73";
topics[1][40] = {};
topics[1][40].topic = "Sequences: Finding a specific term";
topics[1][40].id = "120";
topics[1][41] = {};
topics[1][41].topic = "Sequences: Finding the next term";
topics[1][41].id = "47";
topics[1][42] = {};
topics[1][42].topic = "Sequences: Generating terms";
topics[1][42].id = "22";
topics[1][43] = {};
topics[1][43].topic = "Sequences: Geometric";
topics[1][43].id = "72";
topics[2] = [];
topics[2][0] = {};
topics[2][0].topic = "Circles: Area";
topics[2][0].id = "142";
topics[2][1] = {};
topics[2][1].topic = "Circles: Circumference";
topics[2][1].id = "145";
topics[2][2] = {};
topics[2][2].topic = "Converting units: Time";
topics[2][2].id = "74";
topics[2][3] = {};
topics[2][3].topic = "Metric units: Converting lengths";
topics[2][3].id = "45";
topics[2][4] = {};
topics[2][4].topic = "Metric units: Converting mixed units";
topics[2][4].id = "57";
topics[2][5] = {};
topics[2][5].topic = "Metric units: Converting volume";
topics[2][5].id = "56";
topics[2][6] = {};
topics[2][6].topic = "Metric units: Converting weights";
topics[2][6].id = "55";
topics[2][7] = {};
topics[2][7].topic = "Money: Adding coins";
topics[2][7].id = "24";
topics[2][8] = {};
topics[2][8].topic = "Money: Counting coins";
topics[2][8].id = "25";
topics[2][9] = {};
topics[2][9].topic = "Polygons: Sides";
topics[2][9].id = "62";
topics[2][10] = {};
topics[2][10].topic = "Pythagoras: Distance between two points on a line";
topics[2][10].id = "139";
topics[2][11] = {};
topics[2][11].topic =
	"Pythagoras: Finding a short side in a right-angled triangle";
topics[2][11].id = "148";
topics[2][12] = {};
topics[2][12].topic = "Pythagoras: Finding the area of a right-angled triangle";
topics[2][12].id = "150";
topics[2][13] = {};
topics[2][13].topic =
	"Pythagoras: Finding the hypotenuse in a right-angled triangle";
topics[2][13].id = "147";
topics[2][14] = {};
topics[2][14].topic =
	"Pythagoras: Finding the perimeter of a right-angled triangle";
topics[2][14].id = "149";
topics[2][15] = {};
topics[2][15].topic = "Speed, distance, time";
topics[2][15].id = "26";
topics[2][16] = {};
topics[2][16].topic =
	"Trigonometry: Finding a missing angle in a right-angled triangle";
topics[2][16].id = "151";
topics[2][17] = {};
topics[2][17].topic =
	"Trigonometry: Finding a missing length in a right-angled triangle";
topics[2][17].id = "152";
topics[2][18] = {};
topics[2][18].topic =
	"Trigonometry: Finding the area of a right-angled triangle";
topics[2][18].id = "153";
topics[2][19] = {};
topics[2][19].topic =
	"Trigonometry: Finding the perimeter of a right-angled triangle";
topics[2][19].id = "154";
topics[3] = [];
topics[3][0] = {};
topics[3][0].topic = "FDP: Converting mixed";
topics[3][0].id = "13";
topics[3][1] = {};
topics[3][1].topic = "FDP: Of one amount to another";
topics[3][1].id = "67";
topics[3][2] = {};
topics[3][2].topic = "Percentages: Change";
topics[3][2].id = "96";
topics[3][3] = {};
topics[3][3].topic = "Percentages: Increase and decrease";
topics[3][3].id = "49";
topics[3][4] = {};
topics[3][4].topic = "Percentages: Multipliers";
topics[3][4].id = "95";
topics[3][5] = {};
topics[3][5].topic = "Percentages: Of amounts";
topics[3][5].id = "8";
topics[3][6] = {};
topics[3][6].topic = "Percentages: Repeated change";
topics[3][6].id = "97";
topics[3][7] = {};
topics[3][7].topic = "Percentages: Reverse";
topics[3][7].id = "50";
topics[3][8] = {};
topics[3][8].topic = "Proportion: Unitary method";
topics[3][8].id = "53";
topics[3][9] = {};
topics[3][9].topic = "Ratio: Changing";
topics[3][9].id = "117";
topics[3][10] = {};
topics[3][10].topic = "Ratio: Combining two ratios into one";
topics[3][10].id = "93";
topics[3][11] = {};
topics[3][11].topic = "Ratio: Find a share given another";
topics[3][11].id = "52";
topics[3][12] = {};
topics[3][12].topic = "Ratio: Find a share given the difference";
topics[3][12].id = "94";
topics[3][13] = {};
topics[3][13].topic = "Ratio: Mixed";
topics[3][13].id = "92";
topics[3][14] = {};
topics[3][14].topic = "Ratio: Sharing a given total";
topics[3][14].id = "12";
topics[3][15] = {};
topics[3][15].topic = "Ratio: Simplifying";
topics[3][15].id = "19";
topics[3][16] = {};
topics[3][16].topic = "Ratio: Writing as a fraction";
topics[3][16].id = "124";
topics[3][17] = {};
topics[3][17].topic = "Ratio: Writing in the form 1:n or n:1";
topics[3][17].id = "123";
topics[4] = [];
topics[4][0] = {};
topics[4][0].topic = "Probability: Expected frequency";
topics[4][0].id = "63";
topics[4][1] = {};
topics[4][1].topic = "Probability: Simple events";
topics[4][1].id = "58";
topics[5] = [];
topics[5][0] = {};
topics[5][0].topic = "Statistics: Averages and range";
topics[5][0].id = "37";
topics[5][1] = {};
topics[5][1].topic = "Statistics: Mean";
topics[5][1].id = "33";
topics[5][2] = {};
topics[5][2].topic = "Statistics: Median";
topics[5][2].id = "34";
topics[5][3] = {};
topics[5][3].topic = "Statistics: Mode";
topics[5][3].id = "36";
topics[5][4] = {};
topics[5][4].topic = "Statistics: Range";
topics[5][4].id = "35";
//var elem = document.documentElement;

function toggleFS() {
	if (
		!document.isFullScreen &&
		!document.fullscreenElement &&
		!document.webkitFullscreenElement &&
		!document.mozFullScreenElement &&
		!document.msFullscreenElement
	) {
		elem.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

function topicToUrl() {
	var t0 = "id0=" + document.getElementById("topic0").value;
	t0 += "&min0=" + document.getElementById("level0Min").value;
	t0 += "&max0=" + document.getElementById("level0Max").value;
	var t1 = "id1=" + document.getElementById("topic1").value;
	t1 += "&min1=" + document.getElementById("level1Min").value;
	t1 += "&max1=" + document.getElementById("level1Max").value;
	var t2 = "id2=" + document.getElementById("topic2").value;
	t2 += "&min2=" + document.getElementById("level2Min").value;
	t2 += "&max2=" + document.getElementById("level2Max").value;
	var t3 = "id3=" + document.getElementById("topic3").value;
	t3 += "&min3=" + document.getElementById("level3Min").value;
	t3 += "&max3=" + document.getElementById("level3Max").value;
	window.history.replaceState(
		null,
		null,
		"?" + t0 + "&" + t1 + "&" + t2 + "&" + t3,
	);
}

function setUp() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const id0 = urlParams.get("id0");
	for (var i = 0; i < topic0.length; i++) {
		if (topic0[i].value === id0) {
			topic0[i].selected = true;
		}
	}
	const id1 = urlParams.get("id1");
	for (var i = 0; i < topic1.length; i++) {
		if (topic1[i].value === id1) {
			topic1[i].selected = true;
		}
	}
	const id2 = urlParams.get("id2");
	for (var i = 0; i < topic2.length; i++) {
		if (topic2[i].value === id2) {
			topic2[i].selected = true;
		}
	}
	if (id0 && id1 && id2 && id3) {
		document.getElementById("level0Min").value = urlParams.get("min0");
		document.getElementById("level0Max").value = urlParams.get("max0");
		document.getElementById("level1Min").value = urlParams.get("min1");
		document.getElementById("level1Max").value = urlParams.get("max1");
		document.getElementById("level2Min").value = urlParams.get("min2");
		document.getElementById("level2Max").value = urlParams.get("max2");
		document.getElementById("level3Min").value = urlParams.get("min3");
		document.getElementById("level3Max").value = urlParams.get("max3");
	}
}

function openResource(type, id) {
	switch (type) {
		case 1:
			localStorage.setItem("q", question[id].question);
			window.open("/cam", "_blank");
			break;
		case 2:
			window.open("/epp?id=" + topicSelect.value, "_blank");
			break;
	}
}

function createSheet(min, max, totalQuestions, topic_=0) {
	question = [];
	columns = 1
	totalQuestions = parseInt(totalQuestions);
    if (totalQuestions < 1) {
        totalQuestions = 1;
    }
    if (totalQuestions > 25) {
        totalQuestions = 25;
    }
	showingAnswers = false;
	var data = "<div>";
	data += "<table>";
	for (var i = 0; i < totalQuestions; i++) {
		var currentQ = 0;
		data += "<tr>";
		for (var j = 0; j < columns; j++) {
			var min = parseInt(min);
			var max = parseInt(max);
			var step = (max - min) / totalQuestions;
			var level = Math.floor(min + step * i);
			if (level < 0) {
				level = 0;
			}
			if (level > 10) {
				level = 10;
			}
			getQuestion(topic_, level / 10);
			var attempts = 0;
			do {
				var repeat = false;
				for (var k = 0; k < question.length; k++) {
					if (
						k !== currentQ &&
						question[currentQ].answer === question[k].answer
					) {
						repeat = true;
					}
				}
				if (repeat) {
					getQuestion(topic_, level / 10);
					question[currentQ] = question[question.length - 1];
					question.pop();
					attempts++;
					if (attempts % 40 === 0) {
						level++;
					}
				}
			} while (repeat === true && attempts < 300);
			currentQ++;
			question[question.length - 1].showingQuestion = true;
			data +=
				"<th style='font-size:" +
				parseInt(22) +
				"px;' title='Click to replace question' class='questionNumber' onclick='refreshQuestion(" +
				j +
				", " +
				(question.length - 1) +
				")'>" +
				capitalFirst(letterPicker(j)) +
				(i + 1) +
				"</th>";
			data +=
				"<td style='font-size:" +
				parseInt(22) +
				"px;' title='Click to toggle answer. Shift-click to launch camera tool.' class='question' onclick='toggleAnswer(" +
				(question.length - 1) +
				")' id='a" +
				(question.length - 1) +
				"'>" +
				question[question.length - 1].question +
				"</td>";
		}
		data += "</tr>";
	}
	data += "</table></div>";
	var p = {
		'questions': question,
		'topics': questionTopics
	}
	return p;
}

function displayQuestions() {
	var data = "<div>";
	data += "<table>";
	var count = 0;
	for (var i = 0; i < totalQuestions; i++) {
		data += "<tr>";
		for (var j = 0; j < columns; j++) {
			data +=
				"<th style='font-size:" +
				parseInt(fontSize.value) +
				"px;' title='Click to replace question' class='questionNumber' onclick='refreshQuestion(" +
				j +
				", " +
				count +
				")'>" +
				(j + 1) +
				letterPicker(i) +
				"</th>";
			data +=
				"<td style='font-size:" +
				parseInt(fontSize.value) +
				"px;' title='Click to show/hide the answer' class='question' onclick='toggleAnswer(" +
				count +
				")' id='a" +
				count +
				"'>" +
				question[count].question +
				"</td>";
			count++;
		}
		data += "</tr>";
	}
	data += "</table></div>";
	document.getElementById("questionsIWB").innerHTML = data;
	MathJax.typesetPromise();
}

function showMenu() {
	document.getElementById("questionsIWB").style.display = "none";
	document.getElementById("topicMenu").style.display = "block";
	document.getElementById("answerButton").style.display = "none";
	document.getElementById("menuButton").style.display = "none";
}

function toggleAnswer(i) {
	if (event.shiftKey) {
		openResource(1, i);
	} else {
		if (question[i].showingQuestion) {
			document.getElementById("a" + i).innerHTML = question[i].answer;
			question[i].showingQuestion = false;
		} else {
			document.getElementById("a" + i).innerHTML = question[i].question;
			question[i].showingQuestion = true;
		}
		MathJax.typesetPromise();
	}
}

function filter(keyword, x) {
	var id = "topic" + x;
	for (var i = 0; i < document.getElementById(id).length; i++) {
		var txt = document.getElementById(id).options[i].text;
		var include = txt.toLowerCase().search(keyword.toLowerCase());
		if (include > -1) {
			document.getElementById(id).options[i].style.display = "list-item";
			document.getElementById(id).options[i].disabled = false;
		} else {
			document.getElementById(id).options[i].style.display = "none";
			document.getElementById(id).options[i].disabled = true;
		}
	}
	for (var i = 1; i < document.getElementById(id).length; i++) {
		var random = true;
		if (document.getElementById(id).options[i].disabled !== true) {
			document.getElementById(id).selectedIndex = i;
			random = false;
			i = document.getElementById(id).length;
		}
	}
	if (random) {
		document.getElementById(id).selectedIndex = 0;
	}
}

function toggleAnswers() {
	if (question[0]) {
		if (showingAnswers) {
			var count = 0;
			for (var j = 0; j < columns; j++) {
				for (var i = 0; i < totalQuestions; i++) {
					document.getElementById("a" + count).innerHTML =
						question[count].question;
					answerButton.innerHTML = "Show Answers";
					showingAnswers = false;
					question[count].showingQuestion = true;
					count++;
				}
			}
		} else {
			count = 0;
			for (j = 0; j < columns; j++) {
				for (i = 0; i < totalQuestions; i++) {
					document.getElementById("a" + count).innerHTML =
						question[count].answer;
					answerButton.innerHTML = "Show Questions";
					showingAnswers = true;
					question[count].showingQuestion = false;
					count++;
				}
			}
		}
	}
	MathJax.typesetPromise();
}

function refreshQuestion(col, i) {
	var min = parseInt(document.getElementById("level" + col + "Min").value);
	var max = parseInt(document.getElementById("level" + col + "Max").value);
	var step = (max - min) / totalQuestions;
	var level = Math.floor(min + (step * i) / 3);
	if (level < 0) {
		level = 0;
	}
	if (level > 10) {
		level = 10;
	}
	getQuestion(document.getElementById("topic" + col).value, level / 10);
	question[i] = question[question.length - 1];
	question.pop();
	var attempts = 0;
	do {
		var repeat = false;
		for (var k = 0; k < totalQuestions * columns; k++) {
			if (i !== k && question[i].answer === question[k].answer) {
				repeat = true;
			}
		}
		if (repeat) {
			getQuestion(document.getElementById("topic" + col).value, level / 10);
			question[i] = question[question.length - 1];
			question.pop();
			attempts++;
			if (attempts % 30 === 0) {
				level++;
			}
		}
	} while (repeat === true && attempts < 100);
	toggleAnswer(i);
}

// Helper function to generate questions
function generateQuestions(currentTopic, level, numQuestions) {
		for (let i = 0; i < numQuestions; i++) {
				// Call getQuestion to generate a question
				getQuestion(currentTopic, level);
		}
		var p = {
			'questions': question,
			'topics': questionTopics
		}
		return p;
}

function get_topics(){
	return topics;
}