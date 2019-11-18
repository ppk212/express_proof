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

    App.viewDrivingScore();
}
var total = 0;
var speeding_rate = 0;
var sharp_turn_rate = 0;
var abrupt_deceleration_rate = 0;
var rapid_acceleration_rate = 0;


const App = {
    logOut: async function () {
        sessionStorage.setItem('public', "none");
        location.href = "../../index.html";
    },

    settotal: async function () {
        this.number = event.target.value;
    },
    setPrice: async function () {
        this.price = event.target.value;
    },
    setCarType: async function () {
        this.car_type = event.target.value;
    },
    setCc: async function () {
        this.number = event.target.value;
    },
    setMadeYear: async function () {
        this.made_year = event.target.value;
    },
    setDashCam: async function () {
        this.dash_cam = event.target.value;
    },
    editDrivingScore: async function () {
        console.log("drivingScoreStart");
        try {
            var jqxhr = $.ajax({
                url: "/editDrivingScore",
                data: { 
                    address: sessionStorage.getItem('public'),
                    speeding_rate: this.speeding_rate,
                    sharp_turn_rate: this.sharp_turn_rate,
                    abrupt_deceleration_rate: this.abrupt_deceleration_rate,
                    rapid_acceleration_rate: this.rapid_acceleration_rate
                }
            }).done(function (result) { 
                alert("데이터를 수정하였습니다.");
                location.href("home-after.login.html");
            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },
    viewDrivingScore: async function () {
        console.log("drivingScoreStart");
        try {
            var jqxhr = $.ajax({
                url: "/viewDrivingScore",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                obj = JSON.parse(result);
                console.log(result);

                this.total = obj.total;
                this.speeding_rate = obj.speeding_rate;
                this.sharp_turn_rate = obj.sharp_turn_rate;
                this.abrupt_deceleration_rate = obj.abrupt_deceleration_rate;
                this.rapid_acceleration_rate = obj.rapid_acceleration_rate;

                $('#text_total').val(obj.total);
                $('#text_speeding_rate').val(obj.speeding_rate);
                $('#text_sharp_turn_rate').val(obj.sharp_turn_rate);
                $('#text_abrupt_deceleration_rate').val(obj.abrupt_deceleration_rate);
                $('#text_rapid_acceleration_rate').val(obj.rapid_acceleration_rate);

            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },
}
