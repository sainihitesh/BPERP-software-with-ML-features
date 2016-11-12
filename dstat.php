<?php
require_once("LoginToken/token.php");
session_start();  
/*
#: Title: 
#: Date: 
#: Author: Anon
#: Version: 1.0
#: Description :
#: Options:
*/
if(!empty($_GET))
{
    if($_SESSION['u']==$cred_email)
    {
     if ($_GET['who'] == 'Tunechi99') {
        ?>
<!DOCTYPE html>
<html>
<head> 
	<title>Data Statistics</title>
<link href="css/css/bootstrap.min.css" rel="stylesheet"/>
<link href="styles/styleTable.css" rel="stylesheet"/> 
<script src="css/js/jquery.js"></script>
<script type="text/javascript" src="plugins/notyn/jquery.noty.packaged.min.js"></script>
<link rel="stylesheet" type="text/css" href="plugins/notyn/buttons.css"/>
    <link rel="stylesheet" type="text/css" href="plugins/notyn/animate.css"/>
    <link rel="stylesheet" href="plugins/notyn/font-awesome/css/font-awesome.min.css"/>
            <script type="text/javascript" src="js/canvasjs.min.js"></script>
            <script src="css/js/bootstrap.min.js"></script>
            <script src="js/bperp.js"></script> 
            <script type="text/javascript">
    
    var http, url, data,Cords=[],Cords2=[];
                var BodyView;
                url = "get.php?who=chutiya";
                http = new XMLHttpRequest();
                http.open("GET", url);
                http.send();
                http.onreadystatechange = function () {
                    if (http.status == 200 && http.readyState == 4) 
                    {
                         BPERP.data = eval(http.responseText);
                         BPERP.draw.render1(BPERP.data);
                    }

                }

            </script>
            <style>
                @font-face {
                    font-family: 'Creditverse';
                    src: url('fonts/creditverse_font.ttf');
                }

                li.list-group-item {
                    font-family: 'Creditverse';
                    font-size: large;
                }
                #acc,#net{
                    height: 55px;
                    border: 1px solid black;
                }
body{font-family:cursive;font-weight: bold;}
            </style>
            <link href="css/commoncss..css" rel="stylesheet"/>
</head>
<body>
 <div class="container">
            <hr/>
            <ol class="breadcrumb">
                <li><a href="index.php?who=Tunechi99">Home</a></li>
                <li><a href="see.php?who=Tunechi99">See Data</a></li>
                <li><a href="user.php?who=Tunechi99">Feed Data</a></li>
                 <li  class="active">See Statistics</li>
                 <li><a onclick="BPERP.History.scrap();" href="#">Update Data</a></li>
                 <li><a onclick="BPERP.History.scrapHistory();" href="#">Update History Details</a></li>
                 <li><a href="prediction.php?who=Tunechi99">See Prediction</a></li>
                 <li><a href="setting.php?who=Tunechi99">Settings</a></li>
                 <li><a href="about.php?who=Tunechi99">About</a></li>
                 <li><a href="logout.php?who=Tunechi99">Logout</a></li>
                 <li class="navbar-text navbar-right" style="margin-top: 0em;">Switch b/w  Graphs <button onclick="BPERP.draw.render1(BPERP.data);"><span class="glyphicon glyphicon-arrow-left"></span></button><button onclick="BPERP.draw.render2(BPERP.data);"><span class="glyphicon glyphicon-arrow-right"></span></button></li>
            </ol> 
            <h4>Data Statistics</h4>
              
            <div class="well well-lg" style="    background: white;border-radius:0px ">
            	<div id="chartContainer" style=" ">
            	</div>
            </div>    
          
<script type="text/javascript">


  
</script>    
         	
</body>
</html>



       <?php
    }

    }
    else
        header("Location:login.php");
}

?>
