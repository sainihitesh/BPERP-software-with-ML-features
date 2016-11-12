<?php
include_once("../mysql.php");
include_once("../LoginToken/token.php");
session_start();
header("Access-Control-Allow-Origin: *");
    if(!empty($_GET['who'])&&!empty($_SESSION["u"]))
    {
        if($_GET['who']=='chutiya'&&$_SESSION["u"]==$cred_email)
        {   
        	$order_by=$_GET["orderBy"];
            $ASC=$_GET['AscDescOrder'];
        	$sql="UPDATE bperp_setting SET order_by='$order_by',AscDescOrder='$ASC'";
            $re=mysqli_query($mysql,$sql);
             
        }
    }    	

?>   