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
    $("#showError").empty();
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
                $("#showError").text("There is something wrong! please check your username and password");
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
        item.price = numberWithCommas(item.price);   
        var text = `
        <div class="card" style="width: 18rem;padding: 0px 10px; margin: 0 auto;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
              <h3 class="card-title">${item.name}</h3>
              <h5 class="card-text">${item.price}$</h5>
            </div>
            <div class="card-body">
              <a href="#" class="btn btn-primary">View in detail</a>
              <a href="#" class="btn btn-primary">Put to cart</a>
            </div>
         </div>
        `;
        
        $("#showAllProduct").append(text);
    }
}
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

/*$(document).on("click", "btn-view-detail", ViewDetails(this));
function ViewDetails(product){
    var id = product.getAttribute("data-product-id");
    alert(id);
}*/