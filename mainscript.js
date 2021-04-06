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
    len = Math.log(number.length)/Math.log(2)
    var i = 0
    while(i<number.length){
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
function table(){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    var input = document.getElementById('input').value
    var tb = number2bool(input)
    var tr = number2bool(input).length
    var len = tb[0].length
    var td = []
    var i = 0
    while(i<len)
    {
        td.push(alpha[i])
        i ++
    }
    i = 0
    while(i<tr)
    {
        var j = 0
        while(j<len)
        {
            td.push(number2bool(input)[i][j])
            j ++
        }
        i ++
    }
    return td
}
function tableDraw(){
    var input = document.getElementById('input').value
    var inputarr = []
    inputarr.push("function()")
    var i = 0
    while(i<input.length){
        inputarr.push(input[i])
        i ++
    }
    var tb = document.getElementById('table')
    tb.innerHTML = ``
    var td = table()
    var columns = number2bool(input)[0].length
    var rows = number2bool(input).length + 1
    var i = 0
    while(i<rows){
        tb.innerHTML += `<tr></tr>`
        i ++
    }
    var tr = document.querySelectorAll('#table tr')
    i = 0
    while(i<rows){
        var j = 0
        while(j<columns){
            tr[i].innerHTML += `<td>${td[i*columns + j]}</td>`
            j ++
        }
        tr[i].innerHTML += `<td>${inputarr[i]}</td>`
        i ++
    }
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
    tableDraw()
}