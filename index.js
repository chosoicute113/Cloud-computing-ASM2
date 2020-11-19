$(document).on("click","#btn_register",showRegistry)



function showRegistry(){
    var message;
    if($("#input_password2").val() != $("#input_password").val()){
        $("#showError").text("Wrong password");
        return;
    }
    message += $("#input_email").val() +"\n";
    message += $("#input_password").val()+"\n";
    message += $("#input_name").val()+"\n";
    message += $("#input_phone").val()+"\n";
    message += $("#input_dob").val()+"\n";
    message += $("#input_age").val()+"\n";
    
    location.href="login.html";
    alert(message);
}