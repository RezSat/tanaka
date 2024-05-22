var strands = new Array("Number", "Algebra", "Geometry & Measures", "Ratio & Proportion", "Probability", "Statistics");
var topics = [];
var columns = 3;
var question = [];
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
topics[0][55].topic = "Prime Factors: Rationalising the denominator of a fraction with a surd";
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
topics[1][18].topic = "Expressions: Expanding binomials to non-monic quadratics";
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
topics[2][11].topic = "Pythagoras: Finding a short side in a right-angled triangle";
topics[2][11].id = "148";
topics[2][12] = {};
topics[2][12].topic = "Pythagoras: Finding the area of a right-angled triangle";
topics[2][12].id = "150";
topics[2][13] = {};
topics[2][13].topic = "Pythagoras: Finding the hypotenuse in a right-angled triangle";
topics[2][13].id = "147";
topics[2][14] = {};
topics[2][14].topic = "Pythagoras: Finding the perimeter of a right-angled triangle";
topics[2][14].id = "149";
topics[2][15] = {};
topics[2][15].topic = "Speed, distance, time";
topics[2][15].id = "26";
topics[2][16] = {};
topics[2][16].topic = "Trigonometry: Finding a missing angle in a right-angled triangle";
topics[2][16].id = "151";
topics[2][17] = {};
topics[2][17].topic = "Trigonometry: Finding a missing length in a right-angled triangle";
topics[2][17].id = "152";
topics[2][18] = {};
topics[2][18].topic = "Trigonometry: Finding the area of a right-angled triangle";
topics[2][18].id = "153";
topics[2][19] = {};
topics[2][19].topic = "Trigonometry: Finding the perimeter of a right-angled triangle";
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
var elem = document.documentElement;

function toggleFS() {
    if (!document.isFullScreen && !document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function topicToUrl() {
    var t0 = "id0=" + document.getElementById('topic0').value;
    t0 += "&min0=" + document.getElementById('level0Min').value;
    t0 += "&max0=" + document.getElementById('level0Max').value;
    var t1 = "id1=" + document.getElementById('topic1').value;
    t1 += "&min1=" + document.getElementById('level1Min').value;
    t1 += "&max1=" + document.getElementById('level1Max').value;
    var t2 = "id2=" + document.getElementById('topic2').value;
    t2 += "&min2=" + document.getElementById('level2Min').value;
    t2 += "&max2=" + document.getElementById('level2Max').value;
    var t3 = "id3=" + document.getElementById('topic3').value;
    t3 += "&min3=" + document.getElementById('level3Min').value;
    t3 += "&max3=" + document.getElementById('level3Max').value;
    window.history.replaceState(null, null, "?" + t0 + "&" + t1 + "&" + t2 + "&" + t3);
}

function setUp() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id0 = urlParams.get('id0');
    for (var i = 0; i < topic0.length; i++) {
        if (topic0[i].value === id0) {
            topic0[i].selected = true;
        }
    }
    const id1 = urlParams.get('id1');
    for (var i = 0; i < topic1.length; i++) {
        if (topic1[i].value === id1) {
            topic1[i].selected = true;
        }
    }
    const id2 = urlParams.get('id2');
    for (var i = 0; i < topic2.length; i++) {
        if (topic2[i].value === id2) {
            topic2[i].selected = true;
        }
    }
    if (id0 && id1 && id2 && id3) {
        document.getElementById('level0Min').value = urlParams.get('min0');
        document.getElementById('level0Max').value = urlParams.get('max0');
        document.getElementById('level1Min').value = urlParams.get('min1');
        document.getElementById('level1Max').value = urlParams.get('max1');
        document.getElementById('level2Min').value = urlParams.get('min2');
        document.getElementById('level2Max').value = urlParams.get('max2');
        document.getElementById('level3Min').value = urlParams.get('min3');
        document.getElementById('level3Max').value = urlParams.get('max3');
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

function createSheet() {
    question = [];
    columns = parseInt(columnSelect.value);
    if (columns < 1) {
        columns = 1;
        columnSelect.value = 1;
    }
    if (columns > 4) {
        columns = 4;
        columnSelect.value = 4;
    }
    totalQuestions = parseInt(totalQuestionsSelect.value);
    if (totalQuestions < 1) {
        totalQuestions = 1;
        totalQuestionsSelect.value = 1;
    }
    if (totalQuestions > 25) {
        totalQuestions = 25;
        totalQuestionsSelect.value = 25;
    }
    showingAnswers = false;
    answerButton.innerHTML = "Show Answers";
    var data = "<div>";
    data += "<table>";
    for (var i = 0; i < totalQuestions; i++) {
        var currentQ = 0;
        data += "<tr>";
        for (var j = 0; j < columns; j++) {
            var min = parseInt(document.getElementById("level" + j + "Min").value);
            var max = parseInt(document.getElementById("level" + j + "Max").value);
            var step = (max - min) / (totalQuestions);
            var level = Math.floor(min + step * i);
            if (level < 0) {
                level = 0;
            }
            if (level > 10) {
                level = 10;
            }
            getQuestion(document.getElementById("topic" + j).value, level / 10);
            var attempts = 0;
            do {
                var repeat = false;
                for (var k = 0; k < question.length; k++) {
                    if (k !== currentQ && question[currentQ].answer === question[k].answer) {
                        repeat = true;
                    }
                }
                if (repeat) {
                    getQuestion(document.getElementById("topic" + j).value, level / 10);
                    question[currentQ] = question[question.length - 1];
                    question.pop();
                    attempts++;
                    if (attempts % 40 === 0) {
                        level++;
                    }
                }
            } while (repeat === true && attempts < 300);
            currentQ++;
            question[(question.length - 1)].showingQuestion = true;
            data += "<th style='font-size:" + parseInt(fontSize.value) + "px;' title='Click to replace question' class='questionNumber' onclick='refreshQuestion(" + j + ", " + (question.length - 1) + ")'>" + capitalFirst(letterPicker(j)) + (i + 1) + "</th>";
            data += "<td style='font-size:" + parseInt(fontSize.value) + "px;' title='Click to toggle answer. Shift-click to launch camera tool.' class='question' onclick='toggleAnswer(" + (question.length - 1) + ")' id='a" + (question.length - 1) + "'>" + question[question.length - 1].question + "</td>";

        }
        data += "</tr>";

    }
    data += "</table></div>";
    document.getElementById('questionsIWB').innerHTML = data;
    document.getElementById('questionsIWB').style.display = "block";
    document.getElementById('answerButton').style.display = "inline-block";
    document.getElementById('menuButton').style.display = "inline-block";
    document.getElementById('topicMenu').style.display = "none";
    MathJax.typesetPromise();
}

function displayQuestions() {
    var data = "<div>";
    data += "<table>";
    var count = 0;
    for (var i = 0; i < totalQuestions; i++) {
        data += "<tr>";
        for (var j = 0; j < columns; j++) {
            data += "<th style='font-size:" + parseInt(fontSize.value) + "px;' title='Click to replace question' class='questionNumber' onclick='refreshQuestion(" + j + ", " + count + ")'>" + (j + 1) + letterPicker(i) + "</th>";
            data += "<td style='font-size:" + parseInt(fontSize.value) + "px;' title='Click to show/hide the answer' class='question' onclick='toggleAnswer(" + count + ")' id='a" + count + "'>" + question[count].question + "</td>";
            count++;
        }
        data += "</tr>";
    }
    data += "</table></div>";
    document.getElementById('questionsIWB').innerHTML = data;
    MathJax.typesetPromise();
}

function showMenu() {
    document.getElementById('questionsIWB').style.display = "none";
    document.getElementById('topicMenu').style.display = "block";
    document.getElementById('answerButton').style.display = "none";
    document.getElementById('menuButton').style.display = "none";
}

function toggleAnswer(i) {
    if (event.shiftKey) {
        openResource(1, i);
    } else {
        if (question[i].showingQuestion) {
            document.getElementById('a' + i).innerHTML = question[i].answer;
            question[i].showingQuestion = false;
        } else {
            document.getElementById('a' + i).innerHTML = question[i].question;
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
            document.getElementById(id).options[i].style.display = 'list-item';
            document.getElementById(id).options[i].disabled = false;
        } else {
            document.getElementById(id).options[i].style.display = 'none';
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
                    document.getElementById('a' + count).innerHTML = question[count].question;
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
                    document.getElementById('a' + count).innerHTML = question[count].answer;
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
    var step = (max - min) / (totalQuestions);
    var level = Math.floor(min + step * i / 3);
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
setUp();