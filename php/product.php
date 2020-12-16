<?php>
include("database.php");
if(getdb()){
    $query="SELECT * FROM productlist_figurine";
    $result=pg_query($query);

    if($result){
        $arr=pg_fetch_all($result);
        echo json_encode($arr); 
    }
}
?>