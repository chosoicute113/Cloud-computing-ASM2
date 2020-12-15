$(document).on("submit","#form_register",showRegistry);
$(document).on("submit","#form_login", showLogin);
$(".nav-item").ready(Ready);
$(document).on("DOMContentLoaded", DOMLoaded);
$("#showAllProduct").ready(showProduct_php);

function DOMLoaded() {
    $("#NavBar").load("../html/nav.html");
}

function Ready() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $(".nav-item a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '') {
            $(this).addClass("active");
        }
    });
}
function showLogin(e){
    e.preventDefault();
    $.ajax({
        type: "POST", url: "../php/login.php",
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

function showRegistry(e){
    e.preventDefault();
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

function showProduct_php(){
    $.ajax({
        type: "POST", url: "../php/product.php",
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                showProduct(result);
            }
            else{
                return;
            }
        }
    });
}

function showProduct(products){
    $("#showAllProduct").empty();
    
    for(item of products){   
        var text = `<div class="card">
                        <div class="card" style="width: 18rem; text-align;">
                            <img class="card-img-top" src="${item.img}">
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text"></p>
                            </div>
                             <div class="card-footer">
                                <small>${item.price}</small>
                            </div>
                        </div>
                    </div>`;
        
        $("#showAllProduct").append(text);
    }
}

/*$(document).on("click", "btn-view-detail", ViewDetails(this));
function ViewDetails(product){
    var id = product.getAttribute("data-product-id");
    alert(id);
}*/