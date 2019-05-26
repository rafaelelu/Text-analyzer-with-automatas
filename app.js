const textAreaInput = document.getElementById('textareaInput');
const textAreaOutput = document.getElementById('textareaOutput');
const bAnalyze = document.getElementById('bAnalyze');
const bReset = document.getElementById('bReset');
const bImport = document.getElementById('bImport');

bAnalyze.addEventListener('click', function () {
    let inputText = textAreaInput.value;
    let analyzedText = textAnalyzer.analyzeText(inputText);
    textAreaOutput.value = analyzedText;
});

bReset.addEventListener('click', function () {
    textAreaInput.value = "";
    textAreaOutput.value = "";
});