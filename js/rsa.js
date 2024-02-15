const p = +prompt("Введите простое 1 число")
if (!isPrime(p)) {
  alert(`Число ${p} не является простым`)
  throw new Error()
}
const g = +prompt("Введите простое 2 число")
if (!isPrime(g)) {
  alert(`Число ${g} не является простым`)
  throw new Error()
}
const message = prompt("Введите сообщение").toLowerCase()
const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".toLowerCase()
const publicKey = generatePublicKey(p, g)
const privateKey = generatePrivateKey(p,g)

const encryptedMessage = encrypt(message, publicKey)
console.log(encryptedMessage)

const inputEncryptedMessage = prompt("Введите зашифрованную фразу").toLowerCase()


const messageArray = [];
for (let i = 0; i < inputEncryptedMessage.length; i++) {
  const char = inputEncryptedMessage[i];
  const charIndex = alphabet.indexOf(char);
  if (charIndex !== -1) {
    messageArray.push(charIndex + 1);
  }
}
const decryptedMessage = decrypt(messageArray, privateKey)
console.log(decryptedMessage)






// Генерация публичного ключа
function generatePublicKey(p, g) {
  const ri = p * g;
  const phi_ri = (p - 1) * (g - 1);
  const c = findCoprime(phi_ri);
  return { c, ri };
}

// Генерация закрытого ключа
function generatePrivateKey(p, g) {
  const ri = p * g;
  const phi_ri = (p - 1) * (g - 1);
  const c = findCoprime(phi_ri);
  const d = findMultiplicativeInverse(c, phi_ri);
  return { d, ri };
}

// Поиск взаимно простого числа
function findCoprime(phi) {
  for (let i = 2; i < phi; i++) {
    if (gcd(i, phi) === 1) {
      return i;
    }
  }
  return null;
}


// Функция является ли число простым
function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num > 1;
}


// Функция шифрования сообщения
function encrypt(message, publicKey) {
  const { c, ri } = publicKey;
  let encryptedMessage = "";

  for (let i = 0; i < message.length; i++) {
    const charIndex = alphabet.indexOf(message[i]);
    const encryptedCharIndex = ((charIndex + 1) ** c) % ri;
    encryptedMessage += alphabet[(encryptedCharIndex - 1) % alphabet.length];
  }

  return encryptedMessage;
}

// Функция расшифрования
function decrypt(message, privateKey) {
  try {
    const { d, ri } = privateKey;
    let decryptedMessage = "";

    for (let i = 0; i < message.length; i++) {
      const decryptedCharIndex = (message[i] ** d) % ri - 1;

      decryptedMessage += alphabet[(decryptedCharIndex + alphabet.length) % alphabet.length];
    }
    return decryptedMessage;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Вычисление НОД
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}


function findMultiplicativeInverse(a, m) {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return null;
}
