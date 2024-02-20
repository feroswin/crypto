
// 011110001010

const message = prompt("Ввведите двоичное число")

function findErrorInHammingCode(encodedMessage) {
    let errorPos = 0;
    let n = encodedMessage.length;

    // Вычисление контрольных битов и определение позиции ошибки
    for (let i = 0; i < Math.log2(n) + 1; i++) {
        let checkBitPos = 1 << i; // Вычисляем позицию контрольного бита
        let count = 0;

        for (let j = 1; j <= n; j++) {
            if ((j & checkBitPos) && (encodedMessage[n - j] === '1')) {
                count++; // Считаем количество единиц в позициях, которые контролирует данный бит
            }
        }

        // Если количество единиц нечетное, значит в этой группе есть ошибка
        if (count % 2 !== 0) {
            errorPos += checkBitPos; // Добавляем позицию контрольного бита к позиции ошибки
        }
    }

    return errorPos; // Возвращаем позицию ошибки (0, если ошибок нет)
}

// Пример использования
let errorPosition = findErrorInHammingCode(message);
if (errorPosition === 0) {
    console.log("No errors detected.");
} else {
    console.log("Error detected at position:", errorPosition);
}
