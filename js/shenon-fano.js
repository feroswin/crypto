// Любая фраза больше 35 символов включая пробелы и знаки
/*
разработчик нашёл в своей программе баг
 */

let message = prompt("Введите сообщение длинной не меньше 35 символов").toLowerCase()
if (message.length < 35) {
    throw new Error("Сообщение слишком короткое")
}
let messageLength = message.length

// Количество каждой буквы в сообщении
let charsCount = {}
message.split("").map(item => {
    if (charsCount[item]) {
        charsCount[item]++
    }
    else charsCount[item] = 1
})

// Вероятности букв
let charsProbabilities = {}
for (let char in charsCount) {
    charsProbabilities[char] = +(charsCount[char]/messageLength).toFixed(6)
}
console.log("Вероятности букв", charsProbabilities)

// Сортируем вероятности букв по убыванию
let sortableCharsProbabilities = []
for (let charProbability in charsProbabilities) {
    sortableCharsProbabilities.push([charProbability, charsProbabilities[charProbability]])
}
sortableCharsProbabilities = sortableCharsProbabilities.sort(([,a], [,b]) => b-a)
console.log("Отсортированный массив букв с вероятностями",sortableCharsProbabilities)


// Здесь логика получения ср.числа двоич чисел на букву
class Node {
    constructor(symbol, probability) {
        this.symbol = symbol;
        this.probability = probability;
        this.bitCode = '';
        this.left = null;
        this.right = null;
    }
}

function shannonFano(data, start, end) {
    if (start >= end - 1) return;

    let sum = 0;
    for (let i = start; i < end; i++) {
        sum += data[i][1];
    }

    let midSum = 0;
    let minDiff = Infinity;
    let partitionIndex = -1;

    for (let i = start; i < end; i++) {
        midSum += data[i][1];
        const diff = Math.abs(midSum - sum / 2);
        if (diff < minDiff) {
            minDiff = diff;
            partitionIndex = i;
        } else {
            break;
        }
    }

    for (let i = start; i < end; i++) {
        if (i <= partitionIndex) {
            data[i][2].bitCode += '0';
        } else {
            data[i][2].bitCode += '1';
        }
    }

    shannonFano(data, start, partitionIndex + 1);
    shannonFano(data, partitionIndex + 1, end);
}
const sortedData = sortableCharsProbabilities.map(([symbol, probability]) => [symbol, probability, new Node(symbol, probability)]);
shannonFano(sortedData, 0, sortedData.length);

// получение количества двоичных символов на букву
const countBitCode = []
sortedData.forEach(([symbol, probability, node]) => {
    countBitCode.push([symbol, node.bitCode.length])
});
console.log("Получение количества двоичных символов на букву", countBitCode)


// получение ср. количества двоичных символов на букву
const middleCountChars = []
for (let i = 0; i < sortableCharsProbabilities.length; i++){
    middleCountChars.push(sortableCharsProbabilities[i][1] * countBitCode[i][1])
}
const middleValueChars = middleCountChars.reduce((acc, item) => acc + item, 0)
console.log("Среднее количество двоичных символов на букву", middleValueChars)


// Получение значений логарифма
const logsSortableCharsProbabilities = []
sortableCharsProbabilities.map(sortChar => {
    logsSortableCharsProbabilities.push(+(Math.log2(sortChar[1])).toFixed(5))
})
console.log("Получение значений логарифма", logsSortableCharsProbabilities)


// Получение энтропий по каждому символу
const entropy = []
for (let i = 0; i < sortableCharsProbabilities.length; i++) {
    entropy.push([sortableCharsProbabilities[i][0], +(sortableCharsProbabilities[i][1] * logsSortableCharsProbabilities[i]).toFixed(5)])
}
console.log("Энтропия по каждому символу", entropy)

// Энтропия источника
const sumEntropy = -entropy.reduce((acc, item) => acc + item[1], 0)
console.log("Энтропия источника", sumEntropy)

// Подсчет избыточности
const redundancy = 1 - (sumEntropy / middleValueChars)
console.log("Избыточность: ", redundancy)
