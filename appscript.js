
var duqyuy = true
// hàm đảo ngược chuỗi 0101...
function rev(bin){
    i = bin.length - 1
    out = ''
    while(i>=0){
        out += bin[i]
        i --
    }
    return out
}
// hàm thêm count số 0 vào chuỗi
function add0(count){
    out = ''
    while(count > 0){
        out += '0'
        count --
    }
    return out
}
// 10 -> 2
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
// 10 -> 2 với độ dài len
function bool(dec, len){
    return add0(len - dec2bin(dec).length) + dec2bin(dec)
}
// dãy nhị phân -> mảng nhị phân tương úng
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
// 2 -> tuyển chuẩn tắc
function bool2AddFun(bool){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    var i = 0
    var str = ''
    while(i<bool.length){
        str += bool[i] == '1' ? alpha[i] : `(-${alpha[i]})`
        i ++
    }
    return str
}
// 2 -> hội chuẩn tắc
function bool2Fun(bool){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    var i = 0
    var str = '['
    while(i<bool.length){
        str += bool[i] == '0' ? alpha[i] : `(-${alpha[i]})`
        if(i<bool.length - 1){
            str += '+'
        }
        i ++
    }
    str += ']'
    return str
}
// dãy nhị phân -> hội, tuyển chuẩn tắc
function number2function(number){
    var boolArray = number2bool(number)
    var i = 0
    var funArray = []
    funArray[0] = []
    funArray[1] = []
    while(i<boolArray.length)
    {
        if(number[i]=='1'){
            funArray[0].push(bool2AddFun(boolArray[i]))
        }
        else{
            funArray[1].push(bool2Fun(boolArray[i]))
        }
        i ++
    }
    return funArray
    
}
function boolAddFun2str(fun) {
    var i = 0
    var str =''
    while(i<fun.length){
        str += fun[i]
        str += i!= fun.length - 1 ? ' + ' : '' 
        i ++
    }
    return str
}
function boolFun2str(fun){
    var i = 0
    var str = ''
    while(i<fun.length){
        str += fun[i]
        i ++
    }
    return str
}
function number2FunStr(number){
    var arr = []
    arr.push(boolAddFun2str(number2function(number)[0]))
    arr.push(boolFun2str(number2function(number)[1]))
    return arr
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
function note(){
    if(document.querySelector('.note').classList[1]){
        noteClose()
    }
    else{
        noteOpen()
    }
}
function noteOpen(){
    document.querySelector('.note').classList.add('active')
    duqyuy = false
}
function noteClose(){
    document.querySelector('.note').classList.remove('active')
    duqyuy = false
}
function fun2S(arr){
    if(arr[1].length==0)
    {
        return '1'
    }
    else if(arr[0].length==0){
        return '0'
    }
    else{
        var len = arr[0].length + arr[1].length
        len = Math.log(len)/Math.log(2)
        var alpha = 'abcdefghijklmnopqrstuvwxyz'
        var arr = arr[0]
        var table = []
        var i = 0
        while(i<len){
            table = []
            table.push(addIndex(arr,`-${alpha[i]}`))
            arr = deleteIndex(arr, `-${alpha[i]}`)
            table.push(addIndex(arr,alpha[i]))
            arr = deleteIndex(arr, `${alpha[i]}`)
            table.push(arr)
            table.push(matchcheck(table, len, alpha[i]))
            arr = arrayConvert(table)
            arr = toSimple(arr)
            i ++
        }
        return arr
    }
    
}
function addIndex(arr, x){
    var out = []
    var i = 0
    while(i<arr.length){
        if(arr[i].indexOf(x)!=-1){
            out.push(arr[i])
        }
        i ++
    }
    return out
}
function deleteIndex(arr, x){
    var out = []
    var i = 0
    while(i<arr.length){
        if(arr[i].indexOf(x)==-1){
            out.push(arr[i])
        }
        i ++
    }
    return out
}
function arrayConvert(arr){
    var out = []
    var i = 0
    while(i<arr.length){
        var j = 0
        while(j<arr[i].length){
            out.push(arr[i][j])
            j ++
        }
        i ++
    }
    return out
}
function checks(arr, len, x, y){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    var i = 0
    var c = true
    while(i<len){
        if(alpha[i]==x){
        }
        else{
            if((arr[0].indexOf('-'+alpha[i])==-1&&arr[0].indexOf(alpha[i])!=-1&&arr[1].indexOf('-'+alpha[i])!=-1)||(arr[1].indexOf('-'+alpha[i])==-1&&arr[0].indexOf('-'+alpha[i])!=-1&&arr[1].indexOf(alpha[i])!=-1)){
                c = false
                break
            }
        }
        i ++
    }
    return c
}
function match(arr, len, x, y){
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    if(checks(arr, len, x, y)){
        var str = ''
        var i = 0
        while(i<len){
            if(x!=alpha[i]){
                if((arr[0].indexOf(alpha[i])!=-1&&arr[1].indexOf(alpha[i])==-1)||(arr[1].indexOf(alpha[i])!=-1&&arr[0].indexOf(alpha[i])==-1)){
                    if(arr[0].indexOf(`-${alpha[i]}`)!=-1||arr[1].indexOf(`-${alpha[i]}`)!=-1){
                        str += `(-${alpha[i]})`
                    }
                    else{
                        str += alpha[i]
                    }
                }
                else if(arr[0].indexOf(`-${alpha[i]}`)!=-1&&arr[1].indexOf(`-${alpha[i]}`)!=-1)
                {
                    str += `(-${alpha[i]})`
                }
                else if((arr[0].indexOf(`-${alpha[i]}`)!=-1&&arr[1].indexOf(`-${alpha[i]}`)==-1)||(arr[1].indexOf(`-${alpha[i]}`)!=-1&&arr[0].indexOf(`-${alpha[i]}`)==-1)){
                    
                }
                else if(arr[0].indexOf(`-${alpha[i]}`)!=-1||arr[1].indexOf(`-${alpha[i]}`)!=-1){
                    str += alpha[i]
                }
            }
            i ++
        }
        return str
    }
}
function matchcheck(arr, len, x){
    var out = []
    var i = 0
    while(i<arr[0].length){
        var j = 0
        while(j<arr[1].length){
            var temp = []
            temp.push(arr[0][i])
            temp.push(arr[1][j])
            if(match(temp, len, x, '-'+x)){
                out.push(match(temp, len, x, '-'+x))
            }
            j ++
        }
        i ++
    }
    return out
}
function toStringxxx(arr){
    var i = 0
    var str = ''
    while(i<arr.length){
        str += arr[i]
        str += i < arr.length - 1 ? ', ': '';
        i ++
    }
    return str
}
function checkin(x, y){
    var xrr = fun2Array(x)
    var yrr = fun2Array(y)
    var i = 0
    var c = 0
    while(i<yrr.length){
        if(xrr.indexOf(yrr[i])!=-1)
        {
            c ++
        }
        i ++
    }
    return c == yrr.length ? true : false
}
function fun2Array(x){
    var i = 0
    var arr = []
    while(i<x.length){
        if(x[i]=='('){
            arr.push(x[i]+x[i+1]+x[i+2]+x[i+3])
            i += 3
        }
        else
        {
            arr.push(x[i])
        }
        i ++
    }
    return arr
}
// Hàm đơn giản các phần tử trong mảng
function toSimple(arr){
    var out = []
    var i = 0
    while(i<arr.length){
        var j = i + 1
        var c = true
        while(j<arr.length){
            if(checkin(arr[i], arr[j])){
                c = false
                break
            }
            j ++
        }
        if(c){
            out.push(arr[i])
        }
        i ++
    }
    return out
}

// Tạo các nguyên nhân nguyên tố.end
//karnaugh.start
function karnaughDelete(){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = ``
}
function karnaugh0(fun){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = `<tr>
        <td>
            ${fun[0]}
        </td>
    </tr>`
}
function karnaugh1(fun){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = `<tr>
        <td>
            a
        </td>
        <td>
            -a
        </td>
    </tr>
    <tr>
        <td x = "1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
    </tr>`
    var td = document.querySelectorAll('#karnaugh td')
    var i = 0
    while(i<td.length){
        if(td[i].getAttribute('x')==fun[0][0]){
            td[i].classList.add('active')
        }
        i ++
    }
}
function karnaugh2(fun){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = `<tr>
        <td></td>
        <td>
            a
        </td>
        <td>
            -a
        </td>
    </tr>
    <tr>
        <td>b</td>
        <td x = "1" y="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
    </tr>
    <tr>
        <td>-b</td>
        <td x = "1" y="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
    </tr>
    `
    var td = document.querySelectorAll('#karnaugh td')
    var i = 0
    while(i<td.length){
        var j = 0
        while(j<fun.length){
            if(td[i].getAttribute('x') == fun[j][0] && td[i].getAttribute('y') == fun[j][1]){
                td[i].classList.add('active')
            }
            j ++;
        }
        i ++
    }
}
function karnaugh3(fun){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = `
    <tr>
        <td></td>
        <td>
            a
        </td>
        <td>
            a
        </td>
        <td>
            -a
        </td>
        <td>
            -a
        </td>
    </tr>
    <tr>
        <td>c</td>
        <td x = "1" y="0" z="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
    </tr>
    <tr>
        <td>-c</td>
        <td x = "1" y="0" z="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            -b
        </td>
        <td>
            b
        </td>
        <td>
            b
        </td>
        <td>
            -b
        </td>
    </tr>
    `
    var td = document.querySelectorAll('#karnaugh td')
    var i = 0
    while(i<td.length){
        var j = 0
        while(j<fun.length){
            if(td[i].getAttribute('x') == fun[j][0] && td[i].getAttribute('y') == fun[j][1] && td[i].getAttribute('z') == fun[j][2]){
                td[i].classList.add('active')
                break
            }
            j ++
        }
        i ++
    }
}
function karnaugh4(fun){
    var tableE = document.querySelector('#karnaugh')
    tableE.innerHTML = `
    <tr>
        <td></td>
        <td>
            a
        </td>
        <td>
            a
        </td>
        <td>
            -a
        </td>
        <td>
            -a
        </td>
        <td></td>
    </tr>
    <tr>
        <td>c</td>
        <td x = "1" y="0" z="1" t="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="1" t="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="1" t="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="1" t="0" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td>-d</td>
    </tr>
    <tr>
        <td>c</td>
        <td x = "1" y="0" z="1" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="1" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="1" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="1" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td>d</td>
    </tr>
    <tr>
        <td>-c</td>
        <td x = "1" y="0" z="0" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="0" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="0" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="0" t="1" style ="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td>d</td>
    </tr>
    <tr>
        <td>-c</td>
        <td x = "1" y="0" z="0" t="0" style="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "1" y="1" z="0" t="0" style="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="1" z="0" t="0" style="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td x = "0" y="0" z="0" t="0" style="--i: ${Math.floor(Math.random()*256)}; --j :${Math.floor(Math.random()*256)}; --k: ${Math.floor(Math.random()*256)};">
            
        </td>
        <td>-d</td>
    </tr>
    
    <tr>
        <td></td>
        <td>
            -b
        </td>
        <td>
            b
        </td>
        <td>
            b
        </td>
        <td>
            -b
        </td>
        <td></td>
    </tr>
    `
    var td = document.querySelectorAll('#karnaugh td')
    var i = 0
    while(i<td.length){
        var j = 0
        while(j<fun.length){
            if(td[i].getAttribute('x') == fun[j][0] && td[i].getAttribute('y') == fun[j][1] && td[i].getAttribute('z') == fun[j][2] && td[i].getAttribute('t') == fun[j][3]){
                td[i].classList.add('active')
            }
            j ++
        }
        i ++
    }
}
function karnaugh(fun, len){
    if(len==0){
        karnaugh0(fun)
    }
    else if(len == 1){
        karnaugh1(fun)
    }
    else if(len == 2){
        karnaugh2(fun)
    }
    else if(len == 3){
        karnaugh3(fun)
    }
    else if(len==4){
        karnaugh4(fun)
    }
    else{
        karnaughDelete()
    }
}
//lấy tuyển chuẩn tắc dạng nhị phân
function getTrue(number){
    var fun = number2bool(number)
    var i = 0
    var arr = []
    while(i<number.length){
        if(number[i]=='1'){
            arr.push(fun[i])
        }
        i ++
    }
    return arr
}
//karnaugh.end
//Hàm chính
function app(){
    if(duqyuy && !document.querySelector('.note').classList[1]){
        var input = document.getElementById('input').value
        var fun = number2function(String(input))
        var answerArray = document.querySelectorAll('#answer .array')
        if(valiedate(input)){
            answerArray[0].innerHTML = `<div>1 = ${boolAddFun2str(fun[0])||1}</div>`
            document.querySelectorAll('#answer .array div')[0].style.width = `${boolAddFun2str(fun[0]).length*10}px`
            answerArray[1].innerHTML = `<div>0 = ${boolFun2str(fun[1])||0}</div>`
            document.querySelectorAll('#answer .array div')[1].style.width = `${boolFun2str(fun[1]).length*10}px`
            answerArray[2].innerHTML = `<div>${toStringxxx(fun2S(fun))}</div>`
            document.querySelectorAll('#answer .array div')[2].style.width = `${fun2S(fun).length*20}px`
            tableDraw()
            karnaugh(getTrue(input), Math.log(input.length)/Math.log(2))
        }
        else{
            alert("Số nhập vào không hợp lệ")
        }
    }
    else{
        duqyuy = true
    }
}