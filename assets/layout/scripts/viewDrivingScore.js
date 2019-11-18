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
    this.makeHighChart();
}
var total = 83;
var speeding_rate = 98;
var sharp_turn_rate = 78;
var abrupt_deceleration_rate = 89;
var rapid_acceleration_rate = 69;

function makeHighChart() {
    Highcharts.chart('container', {
        chart: {
            backgroundColor: '#18191C',
            polar: true,
            type: 'line'
        },
        title: {
            text: '',
            x: 0
            // text_color: '#fff'
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: ['과 속', '급 회전', '급 감속', '급 가속'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                style: {
                    color: 'white',
                    fontSize:'20px'
                }
            }
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
        },
        series: [{
            name: '',
            data: [speeding_rate, sharp_turn_rate, abrupt_deceleration_rate, rapid_acceleration_rate],
            pointPlacement: 'on'
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 250
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom'
                    },
                    pane: {
                        size: '70%'
                    }
                }
            }]
        }
    });
}

var total, price, car_type, cc, made_year, dash_cam;

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
        this.number = event.target.value;
    },
    setMadeYear: async function () {
        this.made_year = event.target.value;
    },
    setDashCam: async function () {
        this.dash_cam = event.target.value;
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

    editDrivingScore: async function () {
        console.log("drivingScoreStart");
        try {
            var jqxhr = $.ajax({
                url: "/editDrivingScore",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                

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
