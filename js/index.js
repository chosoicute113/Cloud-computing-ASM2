$(document).on("submit","#form_registor",showRegistry);
$(document).on("submit","#form_login", showLogin);
$(".nav-item").ready(Ready);
$(document).on("DOMContentLoaded", DOMLoaded);
$("#showAllProduct").ready(function(){
    if(!localStorage.getItem("search_item")){
        showProduct_php();
    }
    else {
        searchBar_php();
        localStorage.removeItem("search_item");
        }
});
$("#showCategorized").ready(function(){
    if(localStorage.getItem("Category")){
        showCategorized_php();
    }
    else if(localStorage.getItem("subCategory")){
        showSubCategorized_php();
    }
});

$("#detailshow").hide();




////////////////////////// LOAD NAVBAR //////////////////////////////
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


function logoutAccount(){
    $("#fullname_box").empty();
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    $("#btn_login").show();
    $("#login_indicator").hide();
};

///////////////////////////// LOGIN AND REGISTRATION ////////////////////
function showLogin(e){
    $("#showError").empty();
    e.preventDefault();
    $.ajax({
        type: "POST", url: "../php/login.php",
        data: $("#form_login").serialize(),
        success: function(result){
            result = $.parseJSON(result);
            console.log(result);
            if(result.success){
                alert("Login successfully");
                localStorage.setItem("name",result.fullname);
                localStorage.setItem("login",true);
                localStorage.setItem("username",result.username);
                location.href = "home.html"
            }
            else{
                $("#showError").text("There is something wrong! please check your username and password");
            }
        }
    });
}

function showRegistry(e){
    e.preventDefault();
    console.log("Registering");
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
/////////////////////////////// MAIN PAGE PRODUCT /////////////////////////



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
        <div class="card" style="width: 18rem;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
                <h3 class="card-title ">${item.name}</h3>
                <h5 class="card-text" style="color: #66ccff;">$${item.price}</h5>
            </div>
            <div class="card-body">
                <a id="btn-view" data-product-id='${item.id}'  onclick = 'ViewDetails(this)' class="btn btn-primary">View in detail</a>
                <a id="btn-add" class="btn btn-primary">Put to cart</a>
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

///////////////////////////////// SHOWING PRODUCT DETAIL /////////////////////


function ViewDetails(product){
    $("#sDescription").empty();
    $("#sName").empty();
    console.log(product);
    var ID= product.getAttribute('data-product-id');
    console.log(ID);
    $.ajax({
        type: "POST", url: "../php/product_detail.php",
        data: {id: ID},
        success: function(result){
            result = $.parseJSON(result);
            $("#sDescription").append(result[0].description);
            console.log(result);
            $("#sName").append(result[0].name);
            console.log(result[0].img);
            document.getElementById("imgchange").src = result[0].img;
            
        }
    });
    $("#labelselect").hide();
    $("#detailshow").show();
}
////////////////////////////////// MAIN CATEGORIZED CODE ///////////////////////////

function transferData_cate(category){
    var key = category.getAttribute('data-product-id');
    console.log(key);

    localStorage.setItem("Category",key)
}
function showCategorized_php(){
    var category = localStorage.getItem("Category");
    $.ajax({
        type: "POST", url: "../php/product_category.php",
        data: {CATEGORY:category},
        success: function(result){
            result = $.parseJSON(result);
            var category_des = result[0].cate_desc; 
            if(result){
                console.log(result);
                $("#factbox").append(category_des);
                $("#factbox").show();
                showCategorized(result);
            }
            else{
                return;
            }
        }
    });
}
function showCategorized(products){
    $("#showCategorized").empty();
    
    for(item of products){
        item.price = numberWithCommas(item.price);

        var text = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
                <h3 class="card-title ">${item.name}</h3>
                <h5 class="card-text" style="color: #66ccff;">$${item.price}</h5>
            </div>
            <div class="card-body">
                <a id="btn-view" data-product-id='${item.id}'  onclick = 'ViewDetails(this)' class="btn btn-primary">View in detail</a>
                <a id="btn-add" class="btn btn-primary">Put to cart</a>
            </div>
        </div>
        `;
        
        $("#showCategorized").append(text);
    }
}
/////////////////////////////// SUB CATEGORY CODE /////////////////////

function transferData_subcate(category){
    var key = category.getAttribute('data-product-id');
    console.log(key);

    localStorage.removeItem("Category");
    localStorage.setItem("subCategory",key)
}

function showSubCategorized_php(){
    var subCategory = localStorage.getItem("subCategory");
    $.ajax({
        type: "POST", url: "../php/product_subcategory.php",
        data: {SUBCATEGORY:subCategory},
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                console.log(result);
                $("#factbox").hide();
                showSubCategorized(result);
            }
            else{
                return;
            }
        }
    });
}
function showSubCategorized(products){
    $("#showCategorized").empty();
    
    for(item of products){
        item.price = numberWithCommas(item.price);

        var text = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
                <h3 class="card-title ">${item.name}</h3>
                <h5 class="card-text" style="color: #66ccff;">$${item.price}</h5>
            </div>
            <div class="card-body">
                <a id="btn-view" data-product-id='${item.id}'  onclick = 'ViewDetails(this)' class="btn btn-primary">View in detail</a>
                <a id="btn-add" class="btn btn-primary">Put to cart</a>
            </div>
        </div>
        `;
        
        $("#showCategorized").append(text);
    }
}

///////////////////////////////////// SEARCH BAR /////////////////////////////////

function activateBtn(){
    var search_item = $("#search_bar").val();
    console.log("Success");
    localStorage.setItem("search_item",search_item);
    window.href="product.html";
};

function searchBar_php(){
    var search_item = localStorage.getItem("search_item").toLowerCase();

    $.ajax({
        type: "POST", url: "../php/product_search.php",
        data: {SEARCH_ITEM:search_item},
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                console.log(result);
                showProduct(result);
                
            }
            else{
                return;
            }
        }
    });
}
function searchBar(products){
    $("#showAllProduct").empty();
    
    for(item of products){
        item.price = numberWithCommas(item.price);

        var text = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
                <h3 class="card-title ">${item.name}</h3>
                <h5 class="card-text" style="color: #66ccff;">$${item.price}</h5>
            </div>
            <div class="card-body">
                <a id="btn-view" data-product-id='${item.id}'  onclick = 'ViewDetails(this)' class="btn btn-primary">View in detail</a>
                <a id="btn-add" class="btn btn-primary">Put to cart</a>
            </div>
        </div>
        `;
        
        $("#showAllProduct").append(text);

    }
}
///////////////////////////////////////// CART FUNCTION ////////////////////////////////////

function showSubCategorized_php(){
    var subCategory = localStorage.getItem("subCategory");
    $.ajax({
        type: "POST", url: "../php/product_subcategory.php",
        data: {SUBCATEGORY:subCategory},
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                console.log(result);
                $("#factbox").hide();
                showSubCategorized(result);
            }
            else{
                return;
            }
        }
    });
}
function showSubCategorized(products){
    $("#showCategorized").empty();
    
    for(item of products){
        item.price = numberWithCommas(item.price);

        var text = `
        <div class="card" style="width: 18rem;">
            <img src="${item.img}"class="card-img-top"alt="${item.name}"/>
            <div class="card-body">
                <h3 class="card-title ">${item.name}</h3>
                <h5 class="card-text" style="color: #66ccff;">$${item.price}</h5>
            </div>
            <div class="card-body">
                <a id="btn-view" data-product-id='${item.id}'  onclick = 'ViewDetails(this)' class="btn btn-primary">View in detail</a>
                <a id="btn-add" data-product-id='${item.id}' onclick = 'addProduct(this)' class="btn btn-primary">Put to cart</a>
            </div>
        </div>
        `;
        
        $("#showCategorized").append(text);
    }
}
function addProduct(product){

    console.log(product);
    if(localStorage.getItem("name"))
    {
        var USERNAME= localStorage.getItem("username");
        var PRODUCT_ID= product.getAttribute('data-product-id');
        console.log(PRODUCT_ID);
        $.ajax({
            type: "POST", url: "../php/addcart.php",
            data: {username: USERNAME, product_id: PRODUCT_ID},
            success: function(){
                console.log("PRODUCT ADDED");
            }
        });
    }
    
}

function showCart_php(){

    if(localStorage.getItem("name"))
    {
        var USERNAME= localStorage.getItem("username");
        console.log("GETTING PRODUCT");
        $.ajax({
            type: "POST", url: "../php/getcart.php",
            data: {username: USERNAME},
            success: function(result){
                console.log("PRODUCT ADDED");
                result = $.parseJSON(result);
                if(result){
                    showCart(result);
                }
                else{
                    return;
                }
            }
        });
    }
    
}

function showCart(products){
    $("#cartZone").empty();
    
    for(item of products){
        item.price = numberWithCommas(item.price);

        var text = `
        <div class="row setBorder" style="width: 100%; background-color: white;margin-top: 5px;">
        <div class=" col-md-4">
            <img style="width: 100%; height:100%;"
                src="${item.img}" alt="${item.name}">
        </div>
        <div class="col ">
            <div class="row" style="padding-bottom:40px; margin: 5px 5px;font-size: 15px;">
                ${item.name}
            </div>
            <div class="row " style="border-top: black solid 1px;">
                <div class=" col-md-4">
                    Price
                </div>
                <div class=" col-md-4">
                    $${item.price}
                </div>
                <div class=" col-md-4">
                    <a href="cart.html" type="button" onclick="removeCart(this)"
                        style="width: 100%; height: 100%;text-align: center; background-color: red;color: white;"
                        class="">X</a> 
                </div>
            </div>
        </div>
        `;
        
        $("#cartZone").append(text);
    }
}
function removeCart(product){

}
