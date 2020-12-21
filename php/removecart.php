<?php
if (isset($_POST['username'])) {
    include('database.php');

    if ( getDb() ) {
        $product_id = $_POST['product_id'];
        $username = $_POST['username'];

        $query = "DELETE FROM CART 
                  WHERE username = '$username'
                  AND product_id = '$product_id'";
        pg_query($query);
    }
}
?>