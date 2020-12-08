$(document).on("click","#btn_register",showRegistry);
$(document).on("click","#btn_login", showLogin);

function showLogin(){
    $.ajax({
        type: "POST", url: "../php/register.php",
        data: $("#form_login").serialize(),
        success: function(result){
            result = $.parseJSON(result);
            if(result.success){
                alert("Login successfully \n"+
                      "Full name: " + result.fullname+"\n"+
                      "Phone: "+result.phone+"\n"+
                      "Birthdate: "+result.birthday +"\n"+
                      "Age: "+ result.age);
            }
            else{
                alert("Login unseccessfully");
            }
        }
    });
}

function showRegistry(){
    if($("#input_password2").val() == $("#input_password").val()){
        $.ajax({
            type: "POST", url: "../php/register.php",
            data: $("#form_registor").serialize(),
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