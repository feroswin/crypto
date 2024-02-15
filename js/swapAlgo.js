// Функция свапа колонок
function swapColumns(matrix, columnOrder) {
    const newMatrix = matrix.map(row => []);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < columnOrder.length; j++) {
            newMatrix[i][j] = matrix[i][columnOrder[j]];
        }
    }
    return newMatrix;
}

// Шифрование матрицы
function cryptMatrix(matrix, columnOrder) {
    const encryptedMatrix = matrix.map(row => []);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < columnOrder.length; j++) {
            encryptedMatrix[i][columnOrder[j]] = matrix[i][j];
        }
    }

    return encryptedMatrix;
}

// Функция преобразования матрицы в строку
function matrixToString(matrix) {
    // Собираем элементы матрицы в строку
    const flattenedMatrix = matrix.reduce((accumulator, row) => accumulator.concat(row), []);

    // Преобразуем массив элементов в строку
    const resultString = flattenedMatrix.join("");

    return resultString.replace(/_/g, " ");
}

// Функция свапа строк
function swapRows(matrix, rowOrder) {
    const newMatrix = rowOrder.map(index => matrix[index]);

    return newMatrix;
}

function decryptColumns(matrix, columnOrder) {
    const newMatrix = matrix.map(row => []);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < columnOrder.length; j++) {
            newMatrix[i][columnOrder[j]] = matrix[i][j];
        }
    }

    return newMatrix;
}

// Начальная матрица первого задания
let originalMatrix1 = [
    ["Р", "П", "П", "О", "Е"],
    ["А", "А", "Д", "Т", "В"],
    ["Л", "_", "Е", "Б", "Ь"],
    ["Л", "Н", "Ы", "Е", "_"],
    ["П", "А", "_", "В", "Р"]
];
let newMatrix1 = swapColumns(originalMatrix1, [2, 0, 4, 1, 3]);
console.log("Начальная матрица:");
console.log(originalMatrix1);
console.log("Конечная матрица:");
console.log(matrixToString(newMatrix1));


console.log("Обратное действие")
let encryptedMatrix = cryptMatrix(originalMatrix1, [0, 1, 2, 3, 4]);
console.log("Конечная матрица:");
console.log(encryptedMatrix);



// Задание 2
console.log("Задание № 2")
let originalMatrix2 = [
    ["Ф", "И", "_", "З", "И"],
    ["М", "М", "У", "Ы", "Н"],
    ["У", "У", "К", "Б", "_"],
    ["Е", "_", "Д", "Ь", "Ш"],
    ["Ы", "И", "В", "Ч", "У"]
];
console.log("Начальная матрица")
console.log(originalMatrix2)

let newMatrix2 = swapColumns(originalMatrix2, [2,0, 4, 3,1])
let newMatrix3 = swapRows(newMatrix2, [4,0,2,3,1])
console.log("Сообщение")
console.log(matrixToString(newMatrix3))

console.log("Обратное действие")
let newMatrix4 = swapRows(newMatrix3, [1,4,2,3,0])
let newMatrix5 = swapColumns(newMatrix4, [1,4,0,3,2])
console.log(matrixToString(newMatrix5))