

const message = prompt("Введите сообщение длиной не менее 25 символов")
if (message.length < 25)
    throw new Error("Длина сообщения менее 25 символов")

const messageLength = message.length

class Node {
    constructor(character, frequency, left = null, right = null) {
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }
}

const frequencyPrepare = {};
for (const char of message) {
    if (!frequencyPrepare[char]) {
        frequencyPrepare[char] = 0;
    }
    frequencyPrepare[char]++;
}

const frequency = {}
for (const char in frequencyPrepare) {
    frequency[char] =  frequencyPrepare[char] / messageLength
}

function buildHuffmanTree() {
    let nodes = Object.keys(frequency).map(char => [char, frequency[char], null, null]);
    while (nodes.length > 1) {
        nodes.sort((a, b) => a[1] - b[1]);
        const left = nodes.shift();
        const right = nodes.shift();
        const newNode = [null, left[1] + right[1], left, right];
        nodes.push(newNode);
    }

    return nodes[0];
}

function generateCodes(node, prefix = "", frequency = null) {
    let codes = [];
    if (node[0] !== null) {
        codes.push([node[0], prefix.length, node[1]]);
    } else {
        codes = codes.concat(generateCodes(node[2], prefix + "0", node[1]));
        codes = codes.concat(generateCodes(node[3], prefix + "1", node[1]));
    }

    // Возвращаем отсортированный массив по частоте в убывающем порядке, если это конечный вызов
    return codes.sort((a, b) => b[2] - a[2]);
}

const tree = buildHuffmanTree();
const codes = generateCodes(tree);

// Считаем энтропию источника
const entropy = []
for (let freq in frequency) {
    entropy.push(Math.log2(frequency[freq])*frequency[freq])
}
const sumEntropy = -entropy.reduce((acc, item) => acc + item, 0)
console.log("Энтропия источника", sumEntropy)


// ср. число двоич символов на букву
const avgBinary = []
for (let code in codes) {
    const char = codes[code][0]
    avgBinary.push(codes[code][1] * frequency[char])
}
const sumAvgBinary = avgBinary.reduce((acc, item) => acc + item, 0)
console.log("Среднее число двоич символов на букву", sumAvgBinary)


// вычилсяем избыточность кода
const redundancy = 1 - (sumEntropy / sumAvgBinary)
console.log("Избыточность кода", redundancy)