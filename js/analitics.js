
function editMessage(message) {
    return message.replace(/ /g, "").toLowerCase()
}

function splitIndexCharsMessage(indexCharsMessage , lengthKey) {
    const countVectors = indexCharsMessage.length / lengthKey
    const newarr = []
    for (let i = 0; i < countVectors; i++) {
        newarr.push(indexCharsMessage.slice(i* lengthKey, (i +1) * lengthKey))
    }
    return newarr
}

let alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ".toLowerCase()
let lengthKey = +prompt("Введите длину ключа")

let key = []
for (let i= 0; i < lengthKey; i++) {
    key[i] = []
    for (let j = 0; j < lengthKey; j++) {
        key[i][j] = +prompt("Введите число для ключа")
    }
}

let message = editMessage(prompt(`Введите сообщение кратное ${lengthKey}`))
if (message.length % lengthKey !== 0){
    throw new Error(`Сообщение не кратно ${lengthKey}`)
}

let indexCharsMessage = []
for(let i = 0; i < message.length; i++) {
    let charMessage = message[i]
    indexCharsMessage.push(alphabet.indexOf(charMessage))
}
let prepareVectors = splitIndexCharsMessage(indexCharsMessage, lengthKey)
// console.log(prepareVectors)

let result = []
for (let k = 0; k < prepareVectors.length; k++) {
    for (let i = 0; i < lengthKey; i++) {
        let sum = 0
        for (let j = 0; j < lengthKey; j++) {
            sum += key[i][j] * prepareVectors[k][j]
        }
        result.push(sum)
    }
}
alert(result.join(" "))
// console.log(result)


// Расшифровка
let messageCode = prompt(`Введите шифр разделяя цифры пробелом. Важно! Количество цифр кратно ${lengthKey}`)
if (messageCode.split(" ").length % lengthKey !== 0) {
    throw new Error(`Шифр должен быть кратен ${lengthKey}`)
}
messageCode = messageCode.split(" ").map(item => +item)
let prepareCodeVectors = splitIndexCharsMessage(messageCode, lengthKey)

function cofactor(matrix, row, col) {
    // Удаление строки row и столбца col
    const minorMatrix = matrix.filter((_, i) => i !== row)
        .map(row => row.filter((_, j) => j !== col));

    // Вычисление минора и умножение на (-1)^(row+col)
    const minor = determinant(minorMatrix);
    return Math.pow(-1, row + col) * minor;
}

function determinant(matrix) {
    const n = matrix.length;

    // Рекурсивное вычисление определителя для матрицы размером 2x2
    if (n === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let col = 0; col < n; col++) {
        det += matrix[0][col] * cofactor(matrix, 0, col);
    }

    return det;
}

function allCofactors(matrix) {
    const n = matrix.length;
    const cofactors = [];

    for (let i = 0; i < n; i++) {
        cofactors[i] = [];
        for (let j = 0; j < n; j++) {
            cofactors[i][j] = cofactor(matrix, i, j);
        }
    }

    return cofactors;
}

function transpon(matrix) {
    const transposedMatrix = Array.from({ length: lengthKey }, () => Array(lengthKey));
    for (let i = 0; i < lengthKey; i++) {
        for (let j=0; j < lengthKey; j++) {
            transposedMatrix[j][i] = matrix[i][j]
        }
    }
    return transposedMatrix
}
let determ = determinant(key)

if (determ === 0) {
    throw new Error("Определитель равен 0")
}

let cofactors = allCofactors(key)
let transponMatrix = transpon(cofactors)

let vectorsCode = []
console.log(determ)
for (let i = 0; i < lengthKey; i++) {
    vectorsCode.push(transponMatrix[i].map(item => {
        console.log(item * (1 / determ))
        return item * (1 / determ)
    }))
}


let decodeMatrix = []
for (let k = 0; k < prepareCodeVectors.length; k++) {
    for (let i = 0; i < lengthKey; i++) {
        let sum = 0
        for (let j = 0; j < lengthKey; j++) {
            sum +=  (vectorsCode[i][j] * prepareCodeVectors[k][j])
        }
        decodeMatrix.push(sum)
    }
}
alert(decodeMatrix.join(" "))

const phrase =  decodeMatrix.map(item => {
    return alphabet.charAt(item)
}).join("")
alert(phrase)
