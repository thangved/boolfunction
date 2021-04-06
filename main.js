function rev(bin){
    i = bin.length - 1
    out = ''
    while(i>=0){
        out += bin[i]
        i --
    }
    return out
}
function add0(count){
    out = ''
    while(count > 0){
        out += '0'
        count --
    }
    return out
}
function dec2bin(dec){
    bin = ''
    while(dec!=0){
        if(dec%2==0){
            bin += '0'
            dec /= 2
        }
        else{
            bin += '1'
            dec = (dec - 1)/2
        }
    }
    return rev(bin)
}
function bool(dec, len){
    return add0(len - dec2bin(dec).length) + dec2bin(dec)
}
function number2bool(number){
    boolArray = []
    len = Math.sqrt(number.length)
    var i = 0
    while(i<Math.pow(len, 2)){
        boolArray.push(bool(i, len))
        i ++
    }
    return boolArray
}
function bool2function(bool){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    var i = 0
    var str = ''
    while(i<bool.length){
        str += bool[i] == '1' ? alpha[i] : `(-${alpha[i]})`
        i ++
    }
    return str
}
function number2function(number){
    var boolArray = number2bool(number)
    var i = 0
    var funArray = []
    while(i<boolArray.length)
    {
        if(number[i]=='1'){
            funArray.push(bool2function(boolArray[i]))
        }
        i ++
    }
    return funArray
}
function boolFun2str(fun) {
    var i = 0
    var str =''
    while(i<fun.length){
        str += fun[i]
        str += i!= fun.length - 1 ? ' + ' : '' 
        i ++
    }
    return str
}
function number2FunStr(number){
    return boolFun2str(number2function(number))
}
function app(){
    var input = document.getElementById('input').value
    if(valiedate(input)){
        document.querySelector('#answer .array').innerHTML = `<div>${number2FunStr(input)}</div>`
        document.querySelector('#answer .array div').style.width = `${number2FunStr(input).length*5.5}px`
    }
    else{
        alert("Số nhập vào không hợp lệ")
    }
}
function valiedate(number){
    var i = 0
    check = true
    while(i<number.length){
        if(number[i]!='0' && number[i]!='1'){
            check = false
            break
        }
        i ++
    }
    var len = number.length
    if((Math.log(len)/Math.log(2))%1==0){

    }
    else{
        check = false
    }
    return check
}