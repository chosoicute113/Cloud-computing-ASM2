<?php
if (isset($_POST['username'])) {
    include('database.php');

    if ( getDb() ) {
        $username = $_POST['username'];

        $query = "SELECT PRODUCT.* FROM PRODUCT,CART
                  WHERE PRODUCT.id = CART.product_id
                  AND CART.username ='$username'";
        $result = pg_query($query);
        if($result){
            echo json_encode($result);
        }
    };
}
?>