window.onload = function() {
    App.getIsSetted();

    let _key = sessionStorage.getItem('public');
    // let _key = "";
    if(_key === "") {
        $('public_key').text("NOPE");
    } else {
        this.document.getElementById('public_key').innerHTML = "Public Key : " + _key;
    }
    
    App.viewCarInfo();
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
                }
            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },

    viewCarInfo: async function () {
        console.log("carInfoStart");
        try {
            var jqxhr = $.ajax({
                url: "/viewCarInfo",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                obj = JSON.parse(result);

                let str = "";
                if(obj.car_class == 0) {
                    str = "경차";
                } else if (obj.car_class == 1) {
                    str = "소형차";
                } else if (obj.car_class == 2) {
                    str = "준중형";
                } else if (obj.car_class == 3) {
                    str = "중형차";
                } else if (obj.car_class == 4) {
                    str = "대형차";
                }

                $('#text_number').val(obj.car_name);
                $('#text_price').val(obj.car_price);
                $('#text_car_type').val(str);
                $('#text_cc').val(obj.car_cc);
                $('#text_made_year').val(obj.model_year);

            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },
    editCarInfo: async function () {
        console.log("carInfoEditStart");

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
                    alert("차량 정보를 수정하였습니다.");
                } else {
                    alert("차량 정보를 수정하지 못하였습니다.");
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
