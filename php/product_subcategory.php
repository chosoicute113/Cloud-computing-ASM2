<?php
if (isset($_POST['SUBCATEGORY'])) {
    include('database.php');
    if ( getDb() ) {
        $subcategory = $_POST['SUBCATEGORY'];

        $query="SELECT PRODUCT.* FROM PRODUCT,SUB_PRODUCT,SUB_CATEGORY 
                    WHERE PRODUCT.id = SUB_PRODUCT.product_id 
                    AND SUB_PRODUCT.sub_id = SUB_CATEGORY.id 
                    AND SUB_CATEGORY.name = '$subcategory'";
        $result = pg_query($query);

        if ($result) {
            $arr = pg_fetch_all($result);
            echo json_encode($arr);
        }

        
    }
}