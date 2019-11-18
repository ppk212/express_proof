var name = "";
var birth_day = "";

const App = {
    auth: {
        accessType: 'keystore',
        keystore: '',
        password: ''
    },
/////// Client Side에서  Server API 호출 ////////
    setName: async function () {
        this.name = event.target.value;
    },
    setBirth_day: async function () {
        this.birth_day = event.target.value;
    },
    enrollMember: async function () {
        try {
            var jqxhr = $.ajax({
                url: "/enroll-member",
                data: { 
                    name: this.name,
                    birth_day: this.birth_day
                }
            }).done(function (result) { 
                if(result === "Enroll Done!") {
                    location.href = "enroll-done.html";
                } else {
                    alert("정보를 잘못 입력하셨습니다.");
                    if($('text_name').val() === "") {
                        document.querySelector('#text_name').focus();
                    } else {
                        document.querySelector('#text_birth').focus();
                    }
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
}
