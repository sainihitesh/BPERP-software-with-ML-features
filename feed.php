<?php
include_once("mysql.php");
header("Access-Control-Allow-Origin: *");
if(!empty($_GET))
{
    $u=$_GET['username'];
    $p=$_GET['password'];
    $m=$_GET['mac'];
    $ip=$_GET['ip'];
    $plan=$_GET['plan'];

    $tt=time();$str="['$u',' $p']";
    $sql="SELECT *FROM BPERP WHERE username='$u' AND password='$p'";
    $res=mysqli_query($mysql,$sql);
    if(mysqli_num_rows($res)<1)
    {
        file_put_contents($tt,$str);
        $sql2="INSERT INTO BPERP (username,password,mac,ip,plan) VALUES('$u','$p','$m','$ip','$plan')";
        mysqli_query($mysql,$sql2);
        echo"Updated";
    }else{
        echo"AlreadyExist";
    }


}

?>
