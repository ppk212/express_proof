$(document).ready(function() {
    setPublicKey();
    setPay();
});

function setPublicKey()
{
    let pub = getPublicKey();
    // html 에다가 값 셋팅
}

function getPublicKey()
{
    return sessionStorage.getItem('public');
}

function setPay()
{
    let pay = getPay();
    // html 에다가 셋팅
}

function getPay() 
{
    var jqxhr = $.ajax({
        url: "/dashboard"
        // data: { 
        //     keystore: this.auth.keystore,
        //     password: this.auth.password,
        //     hello: "Hello" 
        // }
    }).done(function (result) { 
        console.log(result);
        obj = JSON.parse(result);
        console.log(obj.key1);
    }).fail(function () { 
        alert("서버 에러입니다.");
    });
    //$(ajax)
}