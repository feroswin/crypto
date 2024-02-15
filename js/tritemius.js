
let alfavit = "абвгдеёжзийклмнопрстуфхцчшщыьэюя"
let key = prompt("Введите ключ длинной 6").toLowerCase()

// Проверка ключа
if (key.length !== 6) {
    alert("Ключ должен быть длинной 6 символов")
    throw new Error()
}

let message = prompt("Введите сообщение длинной от 10 до 25 символов")

// Проверка сообщения
if (message.length < 10 || message.length > 25) {
    alert("Сообщение должно быть длинной от 10 до 25 символов")
    throw new Error()
}

// Форматирование сообщения
let formatMessage = replaceChar(message)
console.log(formatMessage)

// Будущий шифр
let code = ""

for (let i = 0; i < formatMessage.length; i++) {
    const messageChar = formatMessage[i]
    const indexMessageChar = alfavit.indexOf(messageChar)
    const keyChar = key[i % key.length]
    const indexKeyChar = alfavit.indexOf(keyChar)
    code += alfavit[(indexKeyChar + indexMessageChar) % alfavit.length]
}
alert(code)


function replaceChar(string) {
    return string.
    toLowerCase().
    replace(/й/g, "и").
    replace(/ё/g, "е").
    replace(/ъ/g, "ь").
    replace(/ /g, "")
}