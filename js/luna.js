function main(){
    let card= prompt("Введите номер карты 16 цифр:")
    if(card.length!=16){
        console.log("Вы ввели данные не так")
        return;
    }
    let cardArr = card.split("");
    let ost=[];
    cardArr.forEach((el,index) => {
        if((index+1)%2!=0){
           let newel= (el*2)%9

           ost.push(newel)
        }
    });
    console.log("Массив остатков "+ost)

    let sumost=ost.reduce((acc,val)=>acc+val,0)
    console.log("Сумма остатков "+sumost)

    let sumch=0
    let cd

    cardArr.forEach((el,index) => {
        if((index+1)%2==0&&index < cardArr.length - 1){
            sumch+=parseInt(el)

        }
        else{
            cd=parseInt(el)
        }
    });
    console.log("Сумма четных "+sumch)
    console.log("Контрольная цифра "+cd)

    let final=(sumch+sumost+cd)%10
    console.log("Конец "+final)

    



}
main()

// 2758620842000213