<?php
$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$fullname = $_POST['fullname'];
$phone = $_POST['phone'];
$birthday =$_POST['birthday'];
$age = intval($_POST['age']);
$success =false;
include("database.php");
$db = getDb();

if($db)
{
	pg_query("create table if not exists user_registered(
	username varchar(50) primary key,
	password text not null,
	fullname text not null,
	phone text,
	birthdate date,
	age int)");
	if(isset($username) && isset($password) && isset($fullname))
	{
		$success = pg_query("INSERT INTO user_registered VALUES('$username', '$password','$fullname','$phone', '$birthday', $age)");
	}
}
echo json_encode(array('success' => $success));
?>