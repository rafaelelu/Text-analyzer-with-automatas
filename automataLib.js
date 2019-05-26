"use strict"
class Automata {
    // states: State[]
    constructor(states) {
        this.states = states;
    }

    // w: String 
    analyzeWord(w) {
        return this.states[0].analyze(w);
    }
}

class State {

    // name: String
    // transitions: Transition[]
    // final: boolean
    // type: String
    constructor(name, transitions, final, type) {
        this.name = name;
        this.transitions = transitions;
        this.final = final;
        this.type = type;
    }

    // w: String
    analyze(w) {
        if (w === "") {
            return this.type;
        } else {
            let nextPathsIndex = -1;
            for (let i = 0; i < this.transitions.length; i++) {
                if (this.transitions[i].validSymbols.has(w.charAt(0))) {
                    nextPathsIndex = i;
                    break;
                }
            }
            if (nextPathsIndex > -1) {
                return this.transitions[nextPathsIndex].destination.analyze(w.substring(1, w.length));
            } else {
                return "ERROR";
            }
        }
    }
}

class Transition {

    // validSymbols: Set
    // destination: State
    constructor(validSymbols, destination) {
        this.validSymbols = validSymbols;
        this.destination = destination;
    }
}

class TextAnalizer {

    // automata: Automata
    constructor(automata) {
        this.automata = automata;
    }
    
    // text: String
    analyzeText(text) {
        let wordArray = this.split(text);
        let newText = "";
        for (let i = 0; i < wordArray.length; i++) {
            let word = wordArray[i];
            let analyzedWord = this.automata.analyzeWord(word);
            newText += i + ".-  " + word + ":  " + analyzedWord + "\n\n";
        }
        return newText;
    }

    // split - splits the String into words by spaces, tabs and new lines
    // text: String
    split(text) {
        text = text.trim();
        let separators = new Set([' ', '\n', '\t', '\v']);
        let i = 0;
        let wordArray = [''];
        for (let j = 0; j < text.length; j++) {
            if (separators.has(text[j])) {
                if (wordArray[i] === "") {
                    continue;
                } else {
                    wordArray[++i] = "";
                }
            } else {
                wordArray[i] += text[j];
            }
        }
        let ultimaPalabra = wordArray[wordArray.length - 1];
        if (ultimaPalabra == "" || separators.has(ultimaPalabra[ultimaPalabra.length - 1])) {
            wordArray.pop();
        }
        return wordArray;
    }
}