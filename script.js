class AutoSuggest {
    constructor() {
        this.wordFrequencies = {};
        this.words = [];
    }

    insert(word, frequency = 1) {
        if (!this.wordFrequencies[word]) {
            this.words.push(word); // Store unique words
        }
        this.wordFrequencies[word] = (this.wordFrequencies[word] || 0) + frequency;
    }

    search(query, k = 5) {
        if (query.length === 0) return this.words.slice(0, k); // Show common words initially

        let results = [];
        for (let word of this.words) {
            if (word.startsWith(query)) { // Suggest only words starting with query (like keyboard)
                results.push([-this.wordFrequencies[word], word]);
            }
        }

        results.sort((a, b) => a[0] - b[0]); // Sort by frequency
        return results.slice(0, k).map(([_, word]) => word);
    }
}

// Initialize AutoSuggest with sample data
let autoSuggest = new AutoSuggest();
let words = [
    // A
    ["apple", 12], ["application", 18], ["arrow", 8], ["art", 6], ["awesome", 10],
    // B
    ["banana", 9], ["bat", 4], ["batman", 3], ["butterfly", 7], ["ball", 11],
    // C
    ["cat", 8], ["camera", 13], ["carry", 7], ["candle", 5], ["candy", 6],
    // D
    ["dog", 14], ["danger", 10], ["dark", 9], ["diamond", 6], ["dream", 12],
    // E
    ["elephant", 11], ["energy", 8], ["eagle", 7], ["earth", 13], ["echo", 5],
    // F
    ["flower", 12], ["fire", 10], ["fish", 8], ["fantasy", 9], ["frozen", 6],
    // G
    ["game", 15], ["garden", 8], ["galaxy", 9], ["guitar", 7], ["goal", 5],
    // H
    ["hello", 20], ["help", 10], ["hero", 8], ["hermit", 7], ["horizon", 9],
    // I
    ["ice", 11], ["island", 9], ["idea", 10], ["impact", 8], ["image", 7],
    // J
    ["jungle", 9], ["jump", 6], ["jazz", 7], ["justice", 8], ["journey", 11],
    // K
    ["kite", 8], ["king", 10], ["keyboard", 6], ["knowledge", 9], ["kitten", 7],
    // L
    ["lion", 12], ["light", 15], ["love", 13], ["laptop", 10], ["lucky", 8],
    // M
    ["moon", 10], ["mountain", 14], ["magic", 12], ["mango", 9], ["mirror", 7],
    // N
    ["night", 10], ["nature", 12], ["noble", 8], ["nest", 6], ["network", 9],
    // O
    ["ocean", 10], ["orange", 8], ["owl", 5], ["orbit", 7], ["opinion", 9],
    // P
    ["planet", 11], ["pencil", 9], ["parrot", 7], ["perfect", 12], ["peace", 10],
    // Q
    ["queen", 10], ["question", 8], ["quick", 9], ["quality", 7], ["quiet", 6],
    // R
    ["rain", 10], ["rocket", 12], ["river", 8], ["riddle", 7], ["rhythm", 9],
    // S
    ["sun", 14], ["star", 12], ["science", 10], ["space", 9], ["storm", 7],
    // T
    ["tree", 13], ["tiger", 11], ["travel", 9], ["treasure", 10], ["thunder", 8],
    // U
    ["universe", 9], ["umbrella", 7], ["unique", 10], ["unlock", 8], ["uplift", 6],
    // V
    ["victory", 10], ["village", 8], ["volcano", 9], ["violet", 7], ["vision", 6],
    // W
    ["water", 12], ["winter", 10], ["world", 14], ["whale", 8], ["wisdom", 9],
    // X
    ["xylophone", 7], ["x-ray", 8], ["xerox", 6], ["xenon", 5], ["xylem", 4],
    // Y
    ["yellow", 9], ["youth", 8], ["yogurt", 7], ["year", 10], ["yawn", 6],
    // Z
    ["zebra", 8], ["zoom", 9], ["zodiac", 7], ["zigzag", 6], ["zero", 5]
];


words.forEach(([word, freq]) => autoSuggest.insert(word, freq));

function getSuggestions() {
    let inputBox = document.getElementById("searchBox");
    let suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";

    let text = inputBox.value.toLowerCase().trim();
    let wordsArray = text.split(" "); // Split input by spaces
    let currentWord = wordsArray[wordsArray.length - 1]; // Get the last word being typed

    if (currentWord === "") return; // Don't suggest if no input

    let results = autoSuggest.search(currentWord);

    results.forEach(word => {
        let li = document.createElement("li");
        li.textContent = word;
        li.onclick = () => {
            wordsArray[wordsArray.length - 1] = word; // Replace only the last word
            inputBox.value = wordsArray.join(" ") + " "; // Update text with space
            suggestionBox.innerHTML = "";
        };
        suggestionBox.appendChild(li);
    });
}
