<?php
if (isset($_POST['username'])) {
    include('database.php');

    if ( getDb() ) {
        $product_id = $_POST['product_id'];
        $username = $_POST['username'];

        $query = "INSERT INTO CART values('$username','$product_id')";
        pg_query($query);
    }
}
?>