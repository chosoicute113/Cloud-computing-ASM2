<?php
if (isset($_POST['id'])) {
    include('database.php');
    if ( getDb() ) {
        $id = $_POST['id'];

        $query="SELECT * 
                FROM PRODUCT,SUB_PRODUCT,SUB_CATEGORY,CATEGORY
                WHERE PRODUCT.id = SUB_PRODUCT.product_id
                AND SUB_PRODUCT.sub_id = SUB_CATEGORY.id
                AND SUB_CATEGORY.cate_id = CATEGORY.id
                AND CATEGORY.name = '$category'";
        $result = pg_query($query);

        if ($result) {
            $arr = pg_fetch_all($result);
            echo json_encode($arr);
        }
    }
}