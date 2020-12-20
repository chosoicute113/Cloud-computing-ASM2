<?php
if (isset($_POST['id'])) {
    include('database.php');

    if ( getDb() ) {
        $id = $_POST['id'];

        $query = "SELECT * FROM PRODUCT WHERE id = '$id'";
        $result = pg_query($query);

        if ($result) {
            $arr = pg_fetch_all($result);
            echo json_encode($arr);
        }
    }
}
?>