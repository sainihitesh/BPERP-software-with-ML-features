<?php
require_once("LoginToken/token.php");
session_start();
/*
#: Title: 
#: Date: 
#: Author: "Anon" <Anon@Anonymous>
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
        <html xmlns="http://www.w3.org/1999/html">
        <title>BPERP</title>
        <head>
            <link href="css/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="styles/styleTable.css" rel="stylesheet"/>
            <script type="text/javascript" src="scripts/shCore.js"></script>
            <script src="css/js/jquery.js"></script>
            <script src="css/js/bootstrap.js"></script>
            <script type="text/javascript">
                document.onload=function(){}
            </script>
            <script src="js/typeahead.bundle.js"></script>
            <script src="js/scrap.js"></script>
            <script type="text/javascript" src="js/scrap_history.js"></script>
            <script type="text/javascript">SyntaxHighlighter.all();</script>
            <link type="text/css" rel="stylesheet" href="styles/shCoreDefault.css"/>
            <script type="text/javascript" src="plugins/notyn/jquery.noty.packaged.min.js"></script>
             <style>
                @font-face {
                    font-family: 'Creditverse';
                    src: url('fonts/creditverse_font.ttf');
                }
                body{
                    transition: ease-in-out ;
                }

                li.list-group-item ,#rtotal,#tott{
                    font-family: 'Creditverse';
                    font-size: large;
                }
                #acc,#net{
                    height: 55px;
                    border: 1px solid black;
                }
                #pass1{
                        width: 81%;
                }    
                .input-group-addon{
                        width: 19%;
                        background: black;
                        color: white;
                }span{cursor: hand;}
           html {
            height: 100%;
            width: 100%;
                }
          span#open_Acc{
            cursor: hand;
          }      
          tr.undefined{
            background:rgb(255, 255, 199);
          }
          tr.undefined1{
            background:rgba(165, 42, 42, 0.94);
          }
          tr.undefined2{
            background: rgba(0, 128, 110, 0.75);
            transition: background-color 0.5s ease;
          }
          tr.undefined2:hover{
            background-color:black;
            transition: background-color 0.3s ease;
               color: antiquewhite;
          }
        body {
            font-family: 'PT Sans', Tahoma, Arial, serif;
            line-height:20px
             }
   
    </style>

    <link rel="stylesheet" type="text/css" href="plugins/notyn/buttons.css"/>
    <link rel="stylesheet" type="text/css" href="plugins/notyn/animate.css"/>
    <link rel="stylesheet" href="plugins/notyn/font-awesome/css/font-awesome.min.css"/>
    <script type="text/javascript" src="plugins/notyn/main.js"></script>
    <script type="text/javascript" src="js/setting.js"></script>
    <link href="css/commoncss..css" rel="stylesheet"/>
    </head>
        <body>
        <div class="container">
            <hr/>
            <ol class="breadcrumb">
                <li><a href="index.php?who=Tunechi99">Home</a></li>
                <li><a href="see.php?who=Tunechi99">See Data</a></li>
                <li><a href="user.php?who=Tunechi99">Feed Data</a></li>
                 <li><a href="dstat.php?who=Tunechi99">See Statistics </a></li>
                 <li><a onclick="scrap();" href="#">Update Data</a></li>
                 <li><a onclick="scrapHistory();" href="#">Update History Details</a></li>
                 <li><a href="prediction.php?who=Tunechi99">See Prediction</a></li>
                 <li class="active">Settings</li>
                 <li><a href="about.php?who=Tunechi99">About</a></li>
                 <li><a href="logout.php?who=Tunechi99">Logout</a></li>
            </ol> 
           	<h1>Settings</h1>
           	<table class="table" style="border:1px solid black">
           		<tr>
           		<td>Order by</td>
           		<td>Asc/Desc</td>
           		</tr>
           		<tr>
           		<td>
           		<select name="gb" class="form-control" onchange="selPref(this,'orderBy')">
           			<option selected disabled>Select Order by Option</option>
           			<option value="ID">Collection Time</option>
           			<option value="username">Username</option>
           			<option value="password">password</option>
           			<option value="mac">MAC</option>
           			<option value="ip">IP</option>
           			<option value="plan">PLAN</option> 
           			<option value="remainingData">Remaining Data</option>
           			<option value="name">PerDayUseInMB</option>
           		</select>
           		</td>
           		<td>
           		<select name="ob" class="form-control" onchange="selPref(this,'ascDescOrder')">
           			<option selected disabled>Select A/D Order</option>
           			<option value="ASC">Ascending </option>
           			<option value="DESC">Descending</option>
           		</select>
           		</td>
           		</tr>
           		
           	</table>

 

        <?php 
    }
      require_once('footbar.php');
       echo "</div></body></html>";
    }
    else
        header("Location:login.php");
}

?>
