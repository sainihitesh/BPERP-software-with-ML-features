<?php
include_once("mysql.php");
header("Access-Control-Allow-Origin: *");
if(!empty($_GET))
{
    $pn   = $_GET['pn'];
    $stat = $_GET['stats']; 
    $sql="UPDATE BPERP SET stats='$stat' WHERE username='$pn'";
    $res=mysqli_query($mysql,$sql);
}

?>
