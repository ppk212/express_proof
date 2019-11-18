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

var number, price, car_type, cc, made_year, dash_cam;

const App = {
    logOut: async function () {
        sessionStorage.setItem('public', "none");
        location.href = "../../index.html";
    },

    setNumber: async function () {
        this.number = event.target.value;
    },
    setPrice: async function () {
        this.price = event.target.value;
    },
    setCarType: async function () {
        this.car_type = event.target.value;
    },
    setCc: async function () {
        this.cc = event.target.value;
    },
    setMadeYear: async function () {
        this.made_year = event.target.value;
    },
    setDashCam: async function () {
        this.dash_cam = event.target.value;
    },
    addCarInfo: async function () {
        console.log("carInfoAddStart");

        let num;

        if(this.car_type == "경차") {
            num = 0;
        } else if (this.car_type == "소형차") {
            num = 1;
        } else if (this.car_type == "준중형") {
            num = 2;
        } else if (this.car_type == "중형차") {
            num = 3;
        } else if (this.car_type == "대형차") {
            num = 4;
        }

        try {
            var jqxhr = $.ajax({
                url: "/editCarInfo",
                data: { 
                    address: sessionStorage.getItem('public'),
                    car_name: this.number,
                    car_price: this.price,
                    car_type: num,
                    car_cc: this.cc,
                    made_year: this.made_year
                }
            }).done(function (result) { 
                if(result == "수정완료") {
                    alert("차량 정보를 입력하였습니다.");
                } else {
                    alert("차량 정보를 입력하지 못하였습니다.");
                }
            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },
}
