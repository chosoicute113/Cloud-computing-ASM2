<?php
$username = $_POST['username'];
$password = $_POST['password'];
$fullname = $_POST['fullname'];
$phone = $_POST['phone'];
$birthday = $_POST['birthday'];
$age = $_POST['age'];

include ('database.php');
$db = getDb();

if($db)
{
	pg_query("create table if not exist user_registered(
	username text,
	password text,
	fullname text,
	phone int,
	birthdate text,
	age int
	)");
	$db_add = "insert into user_registered values(
	$username, $password,$fullname,$phone,$birthday,$age
	)";
	pg_query($db_adD);
}
?>