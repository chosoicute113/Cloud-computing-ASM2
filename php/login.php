<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    $success =0;
    $db_username = $db_fullname= $db_phone= $db_birthday= $db_age ="";
    include("database.php");
    $db = getDb();

    if($db)
    {
        $query = "select * from account where username='$username'";
        $result = pg_query($query);
        if($result)
        {
            $db_username = pg_result($result, 0, "username");
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
                           'username' => $db_username,
                           'birthday' => $db_birthday,
                           'age' => $db_age));
?>