<?php
if (isset($_POST['CATEGORY'])) {
    include('database.php');
    if ( getDb() ) {
        $category = $_POST['CATEGORY'];

        $query="SELECT PRODUCT.*, CATEGORY.description as cate_des FROM PRODUCT,SUB_PRODUCT,SUB_CATEGORY,CATEGORY 
                    WHERE PRODUCT.id = SUB_PRODUCT.product_id 
                    AND SUB_PRODUCT.sub_id = SUB_CATEGORY.id 
                    AND SUB_CATEGORY.cate_id = CATEGORY.id 
                    AND CATEGORY.name = '$category'";
        $result = pg_query($query);
        if ($result) {
            echo json_encode($arr);
        }
    }
}