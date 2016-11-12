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
            <script src="js/jquery.js"></script>
            <script src="css/js/bootstrap.min.js"></script> 
             <script type="text/javascript" src="js/bperp.js"></script> 
    <link rel="stylesheet" type="text/css" href="plugins/notyn/buttons.css"/>
    <link rel="stylesheet" type="text/css" href="plugins/notyn/animate.css"/>
    <script type="text/javascript" src="plugins/notyn/jquery.noty.packaged.min.js"></script>
    <link rel="stylesheet" href="plugins/notyn/font-awesome/css/font-awesome.min.css"/>
            <style type="text/css">
            	#SearchBox{
             
             height: 48px;
   			     width: 423px;	
    		 font-family: sans-serif;
    /* border: white; */
    		 border-left-width: thick;
    		 border-color: teal; 
   			 background: rgba(43, 26, 26, 0);
   			 color: #0e1415;
        	 position: relative;
   			 vertical-align: top;

            	}
            </style> 
            
            <link href="css/commoncss..css" rel="stylesheet"/>
    
    <link rel="stylesheet" type="text/css" href="css/see.css"> 
 
        </head>
        	<body>
        	<div class="container">
        		<ol class="breadcrumb" style="margin-bottom: 0px; ">
                <li  class="active">Home</li>
                <li><a href="see.php?who=Tunechi99">See Data</a></li>
                <li><a href="user.php?who=Tunechi99">Feed Data</a></li>
                 <li><a href="dstat.php?who=Tunechi99">See Statistics </a></li>
                 <li><a onclick="BPERP.History.scrap();" href="#">Update Data</a></li>
                 <li><a onclick="BPERP.History.scrapHistory();" href="#">Update History Details</a></li>
                 <li><a href="prediction.php?who=Tunechi99">See Prediction</a></li>
                 <li><a href="setting.php?who=Tunechi99">Settings</a></li>
                 <li><a href="about.php?who=Tunechi99">About</a></li>
                 <li><a href="#" data-toggle="collapse" data-target="#demo">Search</a></li>
                 <li><a href="logout.php?who=Tunechi99">Logout</a></li>
            </ol> 

           			<div class="well well-lg" style="    background: #f5f5f5;border-radius:0px ">
                <div class="panel panel-default" style="background: #f5f5f5; border-color: rgba(221, 221, 221, 0);min-height:700px">
            	<div class="row">
            		<div class="col-md-3"></div>
            		<div class="col-md-8">
            			  
  							<input id="SearchBox" type="text"  class="form-control"  placeholder="Search IP,Macs,etc." style=" ">
						 
            		</div>
            	</div>
            	</div>
            		</div>	
            </div>		
            </body>
         </html> 
<script type="text/javascript" src="js/OfficialData.js"></script>
<script type="text/javascript">
    var url = "get.php?who=chutiya";
               var http = new XMLHttpRequest();
                http.open("GET", url);
                http.send();
                http.onreadystatechange = function () {
                    if (http.status == 200 && http.readyState == 4) {
                        BPERP.data = eval(http.responseText);                   
                    }
                }
</script> 
      
<?php 
    }
      require_once('footbar.php');
       echo "</body></html>";
    }
    else
        header("Location:login.php");
}else
        header("Location:login.php");

?>
