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

    App.viewInsuranceFee();
}

const App = {
    logOut: async function () {
        sessionStorage.setItem('public', "none");
        location.href = "../../index.html";
    },

    viewInsuranceFee: async function () {
        console.log("viewInsuranceFeeStart");
        try {
            var jqxhr = $.ajax({
                url: "/viewInsuranceFee",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                obj = JSON.parse(result);

                let str = "";
                if(obj.car == 0) {
                    str = "경차";
                } else if (obj.car == 1) {
                    str = "소형차";
                } else if (obj.car == 2) {
                    str = "준중형";
                } else if (obj.car == 3) {
                    str = "중형차";
                } else if (obj.car == 4) {
                    str = "대형차";
                }
                
                var klay = obj.finalScore / 1000000000000000000;

                $('#text_total_score').val(klay);
                $('#text_accident_count').val(obj.accident_count);
                $('#text_insur_date').val(obj.insur_date);
                $('#text_recent_pay_day').val(obj._recent_pay_day);
                $('#text_violation_count').val(obj.violation_count);
                $('#text_car_class').val(str);
                $('#text_model_year').val(obj.model_year);

            }).fail(function () {
                alert("서버 에러입니다.");
            });
        } catch (e) {
            console.log(e);
            alert(e);
        }
    },
}
