// const Caver = require('caver-js');
// import Caver from "caver-js"
// const cav = new Caver('https://api.baobab.klaytn.net:8651');

const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651'
}

// const cav = new Caver(config.rpcURL);
function login_script() {
    App.handleLogin();
    App.getBirth_day();
}
const App = {
    auth: {
        accessType: 'keystore',
        keystore: '',
        password: ''
    },
/////// Client Side에서  Server API 호출 ////////
    start: async function () {
        var jqxhr = $.ajax("/test").done(function (result) { 
            alert(result);
        }).fail(function () { 
            alert("서버 에러입니다.");
        });
    },

    wallet: async function () {
        var jqxhr = $.ajax("/wallet").done(function (result) {
            alert("" + result);
        }).faile(function() {
            alert("wallet error");
        });
    },
///////////////////////////////////////////////

    handleImport: function () {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = (event) => {
            try {
                if (!this.checkValidKeystore(event.target.result)) {
                    document.getElementById('message').innerHTML = "유효하지 않은 keystore 파일입니다.";
                    return;
                }
                this.auth.keystore = event.target.result;
                document.getElementById('message').innerHTML = "keystore 통과. 비밀번호를 입력하세요.";
                document.querySelector('#input-password').focus();
            } catch (event) {
                document.getElementById('message').innerHTML = "유효하지 않은 keystore 파일입니다.";
                return;
            }
        }
    },

    checkValidKeystore: function (keystore) {
        const parsedKeystore = JSON.parse(keystore);
        const isValidKeystore = parsedKeystore.version &&
            parsedKeystore.id &&
            parsedKeystore.address &&
            parsedKeystore.crypto;

        return isValidKeystore;
    },

    handlePassword: async function () {
        this.auth.password = event.target.value;
        // location.href = "../index.html";
    },

    handleLogin: async function () {
        if(this.auth.accessType === 'keystore') {
            try {
                var jqxhr = $.ajax({
                    url: "/login",
                    data: { 
                        keystore: this.auth.keystore,
                        password: this.auth.password
                    }
                }).done(function (result) { 
                    console.log(result);
                    if(result === "Password is wrong!") {
                        alert(result);
                        document.querySelector('#input-password').focus();
                    } else {
                        alert("Public Key = " + result + "\n로그인하였습니다.")
                        sessionStorage.setItem("public", result);
                        // location.href = "enroll-member.html";

                        // this.getBirth_day();
                    }
                }).fail(function () { 
                    alert("서버 에러입니다.");
                }).always(function () {
                    // alert("항상불러불러");
                });
            } catch (e) {
                console.log(e);
            }
        }
    },

    isEnrolledAddress: async function (public_key) {
        // 회원가입이 되어 있는 상태라면, true 반환.
        // 안되어있는 상태라면, false 반환.
        // try {
        //     var jqxhr = $.ajax({
        //         url: "/login",
        //         data: { 
        //         }
        //     }).done(function (result) { 
                
        //     }).fail(function () { 
        //         alert("서버 에러입니다.");
        //     });
        // } catch (e) {
        //     console.log(e);
        // }
        return false;
    },

    getBirth_day: async function () {
        try {
            var jqxhr = $.ajax({
                url: "/getBirth",
                data: { 
                    address: sessionStorage.getItem('public')
                }
            }).done(function (result) { 
                if(result == "0") {
                    location.href = "enroll-member.html";
                } else {
                    location.href = "home-after-login.html";
                }
            }).fail(function () { 
                alert("서버 에러입니다.");
            }).always(function () {
                // alert("항상불러불러");
            });
        } catch (e) {
            console.log(e);
        }
    },

    handleLogout: async function () {

    },

    generateNumbers: async function () {

    },

    submitAnswer: async function () {

    },

    deposit: async function () {

    },

    callOwner: async function () {

    },

    callContractBalance: async function () {

    },

    getWallet: function () {

    },

    integrateWallet: function (privateKey) {

    },

    reset: function () {

    },

    changeUI: async function (walletInstance) {

    },

    removeWallet: function () {

    },

    showTimer: function () {

    },

    showSpinner: function () {

    },

    receiveKlay: function () {

    }
};

var opts = {
    lines: 10, // The number of lines to draw
    length: 30, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#5bc0de', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};