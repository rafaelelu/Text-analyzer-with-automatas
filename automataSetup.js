"use strict"
var states = [];
var transitions = [];
var validSymbols = [];
var automata;
var textAnalyzer;


// addAsciiChars - adds the ascii characters in a range to a set
// beginning: int
// end: int
// s: Set
function addAsciiChars(beginning, end, s) {
    for (let i = beginning; i < end + 1; i++) {
        s.add(String.fromCharCode(i));
    }
}

for (let i = 0; i < 11 + 1; i++) {
    states[i] = new State('q' + i, [], null, null);
}


// -----------------    q0    -----------------

// Transition q0 -> q1
validSymbols[0] = new Set(['ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú']);
addAsciiChars(65, 90, validSymbols[0]);
addAsciiChars(97, 122, validSymbols[0]);
transitions[0] = new Transition(validSymbols[0], states[1]);

// Transition q0 -> q2
validSymbols[1] = new Set(['_']);
transitions[1] = new Transition(validSymbols[1], states[2]);

// Transition q0 -> q3
validSymbols[2] = new Set(['0']);
transitions[2] = new Transition(validSymbols[2], states[3]);

// Transition q0 -> q6
validSymbols[3] = new Set();
addAsciiChars(49, 57, validSymbols[3]);
transitions[3] = new Transition(validSymbols[3], states[6]);

states[0].transitions = [transitions[0], transitions[1], transitions[2], transitions[3]];
states[0].type = "ERROR";

// -----------------    q1    -----------------

// Transition q1 -> q1
validSymbols[4] = new Set(['_', 'ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú']);
addAsciiChars(65, 90, validSymbols[4]);
addAsciiChars(97, 122, validSymbols[4]);
addAsciiChars(48, 57, validSymbols[4]);
transitions[4] = new Transition(validSymbols[4], states[1]);

states[1].transitions = [transitions[4]];
states[1].type = "Identificador"

// -----------------    q2    -----------------

// Transition q2 -> q1
validSymbols[5] = new Set(['ñ', 'Ñ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú']);
addAsciiChars(65, 90, validSymbols[5]);
addAsciiChars(97, 122, validSymbols[5]);
transitions[5] = new Transition(validSymbols[5], states[1]);

// Transition q2 -> q2
validSymbols[13] = new Set(['_']);
addAsciiChars(48, 57, validSymbols[13]);
transitions[20] = new Transition(validSymbols[13], states[2]);

states[2].transitions = [transitions[5], transitions[20]];
states[2].type = "ERROR";

// -----------------    q3    -----------------

// Transition q3 -> q4
validSymbols[6] = new Set(['x', 'X']);
transitions[6] = new Transition(validSymbols[6], states[4]);

// Transition q3 -> q3
validSymbols[7] = new Set();
addAsciiChars(48, 55, validSymbols[7]);
transitions[7] = new Transition(validSymbols[7], states[3]);

// Transition q3 -> q7
validSymbols[8] = new Set(['.']);
transitions[8] = new Transition(validSymbols[8], states[7]);

states[3].transitions = [transitions[6], transitions[7], transitions[8]];
states[3].type = "NÚMERO OCTAL";

// -----------------    q4    ----------------- 

// Transition q4 -> q5
validSymbols[9] = new Set();
addAsciiChars(65, 70, validSymbols[9]);
addAsciiChars(97, 102, validSymbols[9]);
addAsciiChars(48, 57, validSymbols[9]);
transitions[9] = new Transition(validSymbols[9], states[5]);

states[4].transitions = [transitions[9]];
states[4].type = "ERROR";

// -----------------    q5    -----------------

// Transition q5 -> q5
transitions[10] = new Transition(validSymbols[9], states[5]);

states[5].transitions = [transitions[10]];
states[5].type = "NÚMERO HEXADECIMAL";

// -----------------    q6    -----------------

// Transition q6 -> q6
validSymbols[10] = new Set();
addAsciiChars(48, 57, validSymbols[10]);
transitions[11] = new Transition(validSymbols[10], states[6]);

// Transition q6 -> q7
validSymbols[11] = new Set(['.']);
transitions[12] = new Transition(validSymbols[11], states[7]);

states[6].transitions = [transitions[11], transitions[12]];
states[6].type = "NÚMERO NATURAL";

// -----------------    q7    -----------------

// Transition q7 -> q8
validSymbols[12] = new Set();
addAsciiChars(48, 57, validSymbols[12]);
transitions[13] = new Transition(validSymbols[12], states[8]);

states[7].transitions = [transitions[13]];
states[7].type = "ERROR";

// -----------------    q8    -----------------

// Transition q8 -> q8
transitions[14] = new Transition(validSymbols[12], states[8]);

// Transition q8 -> q9
validSymbols[13] = new Set(['e', 'E']);
transitions[15] = new Transition(validSymbols[13], states[9]);

states[8].transitions = [transitions[14], transitions[15]];
states[8].type = "NÚMERO DE PUNTO FLOTANTE";

// -----------------    q9    -----------------

// Transition q9 -> q10
validSymbols[14] = new Set();
addAsciiChars(48, 57, validSymbols[14]);
transitions[16] = new Transition(validSymbols[14], states[10]);

// Transition q9 -> q11
validSymbols[15] = new Set(['+', '-']);
transitions[17] = new Transition(validSymbols[15], states[11]);

states[9].transitions = [transitions[16], transitions[17]];
states[9].type = "ERROR";

// -----------------    q10    -----------------

// Transition q10 -> q10
transitions[18] = new Transition(validSymbols[12], states[10]);

states[10].transitions = [transitions[18]];
states[10].type = "NÚMERO DE PUNTO FLOTANTE";

// -----------------    q11    -----------------

// Transition q11 -> q10
transitions[19] = new Transition(validSymbols[12], states[10]);

states[11].transitions = [transitions[19]];
states[11].type = "ERROR";

// -----------------    Automata    -----------------

automata = new Automata(states);

// -----------------    Text Analyzer    -----------------

textAnalyzer = new TextAnalizer(automata);