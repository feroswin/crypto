function main(){
    let code= prompt("Введите штрих код 13 цифр:")
    if(code.length !== 13){
        console.log("Вы ввели данные не так")
        return;
    }
    let codeArr = code.split("");
    let sumOdd= 0;
    let controlNum

    codeArr.forEach((el,index) => {
        if((index + 1) % 2 !== 0 && index < codeArr.length - 1){
            sumOdd += parseInt(el)
        }
        else{
            controlNum=parseInt(el)
        }
    });
    console.log("Сумма нечетных ", sumOdd)
    console.log("Контрольная цифра ", controlNum)

    let sumEven=0

    codeArr.forEach((el,index) => {
        if((index + 1) % 2 === 0){
            sumEven += parseInt(3 * el)

        }
    });
    console.log("Сумма четных ", sumEven)

    let final=(sumEven + sumOdd + controlNum) % 10
    console.log("Конец ", final)
}
main()

//5901234123457