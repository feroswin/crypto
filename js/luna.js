
// 2758620842000213

function main(){
    let card= prompt("Введите номер карты состящий из 16 цифр:")
    if(card.length !== 16){
        console.log("Вы ввели данные не так")
        return;
    }
    let cardArr = card.split("");
    let ost=[];
    cardArr.forEach((el,index) => {
        if((index + 1) % 2 !==0){
           let newel= (el*2)%9
           ost.push(newel)
        }
    });
    console.log("Массив остатков "+ost)

    let sumOst=ost.reduce((acc,val)=>acc+val,0)
    console.log("Сумма остатков ", sumOst)

    let sumEven=0
    let controlNum

    cardArr.forEach((el,index) => {
        if((index + 1) % 2 === 0 && index < cardArr.length - 1){
            sumEven += parseInt(el)

        }
        else{
            controlNum = parseInt(el)
        }
    });
    console.log("Сумма четных ", sumEven)
    console.log("Контрольная цифра ", controlNum)

    let final=(sumEven + sumOst + controlNum) % 10
    console.log("Конец ", final)
}
main()