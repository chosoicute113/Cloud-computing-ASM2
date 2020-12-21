<?php
if (isset($_POST['SEARCH_ITEM'])) {
    include('database.php');
    if ( getDb() ) {
        $search_item = $_POST['SEARCH_ITEM'];

        $query="SELECT * FROM PRODUCT
                WHERE name ~* '(?<!\w)(?:$search_item)(?!\w)'";

        $result = pg_query($query);

        if ($result) {
            $arr = pg_fetch_all($result);
            echo json_encode($arr);
        }
    }
}
