var name = "";
var birth_day = "";

window.onload = function() {
    let _key = sessionStorage.getItem('public');
    // let _key = "";
    if(_key === "") {
        $('public_key').text("NOPE");
    } else {
        console.log("before Jquery text");
        this.document.getElementById('public_key').innerHTML = "Public Key : " + _key;
        console.log("after Jquery text");
    }
}

const App = {
    logOut: async function () {
        sessionStorage.setItem('public', "none");
        location.href = "../../index.html";
    },

    getIsSetted: async function () {
        try {
            var jqxhr = $.ajax({
                url: "/getIsSetted",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                console.log("getIsSetted : " + result);
                if(result == 0) {
                    alert("입력된 차량 정보가 없습니다.");
                    location.href = "addCarInfo.html";
                } else {
                    location.href = "viewCarInfo.html";
                }
            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }
}
