function hammingEncode(data) {
    // Определить количество контрольных битов, необходимых для кода
    let r = 1;
    while (Math.pow(2, r) < data.length + r + 1) {
        r++;
    }

    let totalLength = data.length + r;
    let encodedData = new Array(totalLength).fill(0);
    let j = 0;

    // Расставить информационные биты и контрольные биты
    for (let i = 1; i <= totalLength; i++) {
        if (Math.log2(i) % 1 === 0) { // Если i является степенью двойки, то это место для контрольного бита
            continue;
        } else {
            encodedData[i - 1] = data[j];
            j++;
        }
    }

    // Вычислить контрольные биты
    for (let i = 0; i < r; i++) {
        let controlBitIndex = Math.pow(2, i) - 1;
        let sum = 0;
        for (let j = 0; j < totalLength; j++) {
            if (((j + 1) & (1 << i)) != 0) {
                sum ^= encodedData[j];
            }
        }
        encodedData[controlBitIndex] = sum;
    }

    return encodedData.join('');
}

function hammingDecode(encodedData) {
    let r = 0;
    let n = encodedData.length;

    while (Math.pow(2, r) < n) {
        r++;
    }

    let errorPosition = 0;
    let dataBits = encodedData.split('').map(bit => parseInt(bit, 10));

    // Определить позицию ошибки
    for (let i = 0; i < r; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
            if (((j + 1) & (1 << i)) !== 0) {
                sum ^= dataBits[j];
            }
        }
        errorPosition += sum * (1 << i);
    }

    // Исправить ошибку, если она есть
    if (errorPosition !== 0) {
        dataBits[errorPosition - 1] ^= 1;
        console.log(`Ошибка обнаружена и исправлена на позиции ${errorPosition}`);
    }

    // Удалить контрольные биты и вернуть исправленные данные
    let result = '';
    for (let i = 0; i < n; i++) {
        if (Math.log2(i + 1) % 1 !== 0) {
            result += dataBits[i];
        }
    }

    return result;
}


function introduceError(encodedData, errorPosition) {
    // Проверить, что позиция ошибки находится в пределах диапазона данных
    if (errorPosition < 1 || errorPosition > encodedData.length) {
        console.log("Ошибка: Позиция ошибки выходит за пределы диапазона данных.");
        return encodedData;
    }

    // Инвертировать бит в указанной позиции
    let modifiedData = encodedData.split('');
    modifiedData[errorPosition - 1] = modifiedData[errorPosition - 1] === '1' ? '0' : '1';

    return modifiedData.join('');
}

// 11001010
// Пример использования
let originalData = prompt("Введите двоичное число");
console.log('Оригинальные данные:', originalData);
let encodedData = hammingEncode(originalData);
console.log('Закодированные данные:', encodedData);

let errorPosition = Number(prompt("Введите позицию ошибки"));
let erroneousData = introduceError(encodedData, errorPosition);
console.log(`Данные с ошибкой в позиции ${errorPosition}:`, erroneousData);

let decodedData = hammingDecode(erroneousData);
console.log('Декодированные данные:', decodedData);
