<?php
            include_once("mysql.php");
            include_once("LoginToken/token.php");
            session_start();
            header("Access-Control-Allow-Origin: *");
    if(!empty($_GET['who'])&&!empty($_SESSION["u"])&&empty($_GET['dataUses']))
      {
        if($_GET['who']=='chutiya'&&$_SESSION["u"]==$cred_email)
        {
            //for getting the values for showing it on page
                if($mysql)
                    echo mysqli_connect_error();
                $re=mysqli_query($mysql,"select *from bperp_setting");
                $data=mysqli_fetch_assoc($re);
                $orderby=$data["order_by"];
                $ascDescOrder=$data["AscDescOrder"];
                $sql="SELECT *FROM bperp ORDER BY $orderby $ascDescOrder";
                $res=mysqli_query($mysql,$sql);
                $arr=array();
                while($data=mysqli_fetch_assoc($res))
                {
                    array_push($arr,$data);
                }
                $d=json_encode($arr);
                echo $d;
        }
    }
    if(!empty($_GET['who'])&&!empty($_SESSION["u"])&&!empty($_GET['dataUses']))
    {
        if($_GET['who']=='chutiya'&&$_SESSION["u"]==$cred_email)
        {
            //for getting the values for showing it on page
                if($mysql)
                echo mysqli_connect_error();
                $sql="SELECT *FROM bperp ORDER BY PerDayUseInMB ASC";
                $res=mysqli_query($mysql,$sql);
                $arr=array();
                while($data=mysqli_fetch_assoc($res))
                {
                    array_push($arr,$data);
                }
                $d=json_encode($arr);
                echo $d;
        }
    }

?>
