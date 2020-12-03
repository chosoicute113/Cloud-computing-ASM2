$(document).on("click","#btn_register",showRegistry)



function showRegistry(){
    var message;
    if($("#input_password2").val() == $("#input_password").val()){
        $.ajax({
            type: "POST", url: "register.php",
            data: {
                username: $("#input_email").val(),
                password: $("#input_password").val(),
                fullname: $("#input_name").val(),
                phone: $("#input_phone").val(),
                birthday: $("#input_dob").val(),
                age: $("#input_age").val()
            },
            success: function(result){
                result = $.parseJSON(result);
                if(result.success){
                    alert("Regisered successfully");
                    location.href="login.html";
                }
                else{
                    alert("Registered unseccessfully");
                }
            }
        });
        location.href="login.html";
    }
    else {
        $("#showError").text("Wrong password");
        return;
    }
}