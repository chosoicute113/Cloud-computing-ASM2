<?php
$username = $_POST['username'];
$password = $_POST['password'];
$fullname = password_hash($_POST['fullname'], PASSWORD_DEFAULT);
$phone = $_POST['phone'];
$birthday = new DateTime($_POST['birthday']);
$age = intval($_POST['age']);
$success =0;
include ("database.php");
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
	$db_add = "insert into user_registered values(
	'$username', '$password','$fullname','$phone',$birthday,$age)";
	if(isset($username) && isset($password) && isset($fullname))
	{
		pg_query($db_add);
		$success = 1;
	}
}
echo json_encode(array('success' => $success));
?>