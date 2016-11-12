<?php
	session_start(); 
	require_once("../mysql.php");
	if (!empty($_SESSION["u"])) 
	{
		if (!empty($_GET["u"])) 
		{
			$u = $_GET["u"];
			$sql = "select logoff_thetas from bperp where username='$u'";		 
			$res= mysqli_query($mysql,$sql);
			$d=mysqli_fetch_assoc($res);
			echo $d["logoff_thetas"];
		}
	}
?>