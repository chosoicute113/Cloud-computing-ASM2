<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $success =0;
    $db_fullname= $db_phone= $db_birthday= $db_age ="";
    include("database.php");
    $db = getDb();

    if($db)
    {
        $query = "select * from user_registered where username='$username'";
        $result = pg_query($query);
        if($result)
        {
            $db_password = pg_result($result, 0, "password");
            $db_fullname = pg_result($result, 0, "fullname");
            $db_phone = pg_result($result, 0, "phone");
            $db_birthday = pg_result($result, 0, "birthday");
            $db_age = pg_result($result, 0,"age");

            if(password_verify($password,$db_password))
            {
                $success = 1;
            }
        }
    }
    echo json_encode(array('success' => $success,
                           'fullname' => $db_fullname,
                           'phone' => $db_phone,
                           'birthday' => $db_birthday,
                           'age' => $db_age));
?>