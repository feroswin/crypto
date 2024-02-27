function main(){
    let shtrih= prompt("Введите штрих код 13 цифр:")
    if(shtrih.length!=13){
        console.log("Вы ввели данные не так")
        return;
    }
    let shtrihArr = shtrih.split("");
    let sumnch=0;
    let cd

    shtrihArr.forEach((el,index) => {
        if((index+1)%2!=0&&index < shtrihArr.length - 1){
            sumnch+=parseInt(el)

        }
        else{
            cd=parseInt(el)
        }
    });
    console.log("Сумма нечетных "+sumnch)
    console.log("Контрольная цифра "+cd)

    let sumch=0

    shtrihArr.forEach((el,index) => {
        if((index+1)%2==0){
            sumch+=parseInt(3*el)

        }
    });
    console.log("Сумма четных "+sumch)

    let final=(sumch+sumnch+cd)%10
    console.log("Конец "+final)
}
main()

//5901234123457