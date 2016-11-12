<?php
session_start();
require_once("mysql.php");
/*
#: Title: 
#: Date: 
#: Author: 
#: Version: 1.0
#: Description :
#: Options:  
*/
if(!empty($_GET))
{
    if($_SESSION['u'])
    {
     if ($_GET['who'] == 'Tunechi99') {

        ?>

        <html xmlns="http://www.w3.org/1999/html">
        <title>BPERP</title>
        <head>
            <link href="css/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="styles/styleTable.css" rel="stylesheet"/>
            <script type="text/javascript" src="scripts/shCore.js"></script>
            <script type="text/javascript" src="scripts/shBrushBash.js"></script>
            <script src="css/js/jquery.js"></script>
            <script src="css/js/bootstrap.js"></script>
            <script src="js/typeahead.bundle.js"></script>
            <link href="css/css/bootstrap.min.css" rel="stylesheet"/>
<link href="styles/styleTable.css" rel="stylesheet"/>
            <script type="text/javascript" src="scripts/shCore.js"></script>
            <script type="text/javascript" src="scripts/shBrushBash.js"></script>
            <script src="css/js/jquery.js"></script>
            <script type="text/javascript" src="js/canvasjs.min.js"></script>
            <script src="css/js/bootstrap.js"></script>
            <script type="text/javascript">SyntaxHighlighter.all();</script>
            <link type="text/css" rel="stylesheet" href="styles/shCoreDefault.css"/>
            <script src="js/scrap.js"></script>
            <link href="css/commoncss..css" rel="stylesheet"/>
            <style type="text/css">
              body{font-family: cursive;font-weight: bold;}
            </style>
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
                 <li  class="active">See Prediction</li>
                 <li><a href="setting.php?who=Tunechi99">Settings</a></li>
                 <li><a href="about.php?who=Tunechi99">About</a></li>
                 <li><a href="logout.php?who=Tunechi99">Logout</a></li>
            </ol> 
            <h4>See Prediction</h4>
          
            <div class="well well-lg">
                <div class="panel panel-default">
                 <table class="table">
                 <input id="dateTime" type="date" class="form-control" placeholder="Type no. of Days"/>
                 <hr/>
                 <input id="btn1"  onclick="render1();"  class="btn btn-success" type="button" value="Real Data Graph"/>
                 <input id="btn2" onclick="click2();"  class="btn btn-success" type="button" value="Predicted Data Graph"/>
                 <hr/>
                 <li class="list-group-item" id="rtotal"> </li>
                 </table>
                    <table class="table">
                        <li class="list-group-item" id="rtotal">real Data Graph for
                         <?php
                          $u=$_GET["u"];
                          $sql="select *from bperp where username='$u'";
                          $res=mysqli_query($mysql, $sql);
                          $d=mysqli_fetch_assoc($res);
                          //var_dump($d);
                          echo "<h1>".$d["name"]."</h1>";
                          mysqli_close($mysql);
                         ?>   
                        </li>
                        <ul class="list-group">

                        </ul>
                        
                <div id="chartContainer" style=" ">
                </div>
                 
                    </table>

                </div>
            </div>
              
        
 <script>
  var X=[
   <?php
   if(is_file( "api/Sorted_data/".$_GET["u"]))
   { 
    $file = fopen("api/Sorted_data/".$_GET["u"], 'r');
	while (($line = fgetcsv($file)) !== FALSE) 
	{							
		echo $line[0].',';
	}
	echo "0];";
	echo " var Y=[";
	//fclose($file);
	$file = fopen("api/Sorted_data/".$_GET["u"], 'r');
	while (($line = fgetcsv($file)) !== FALSE) 
	{							
		echo $line[1].',';
		
	}
	echo "0];";

	fclose($file);
  }else{
     
   }
   ?>;   
    
  <?php if (is_file("api/Sorted_data/".$_GET["u"])) {
     
    echo "theta=[0,".$d['PerDayUseInMB'].'];';
    
    ?>
   var http , url;
   http=new XMLHttpRequest();
   http.open("GET","<?php echo "getD.php?url=api/Sorted_data/".$_GET["u"]; ?>");
   http.send();
                    http.onreadystatechange=function(e)
                    {
                        if(http.status==200&&http.readyState==4)
                        {
                            data=JSON.parse(http.responseText);
                             render1();
                                                      
                        }
                    }
    <?php
    }
    ?>                
function render1()
{
    var chart1 = new CanvasJS.Chart("chartContainer",
           {
            title:{
                text: "BPERP Net uses real Graph",      
                fontFamily: "arial black",
                fontColor: "DarkSlateGrey"
            },
                        animationEnabled: true,
            axisX: {
                title:"no. of days ",
                titleFontFamily: "arial"

            },
            axisY:{
                title: "data uses in mb",
                titleFontFamily: "arial",
                titleFontSize: 5
            },

            data: [
            {        
                type: "scatter",  
                toolTipContent: "<span style='\"'color: {color};'\"'> </span> In {x} days<br/>  used data={y}MB ",
                dataPoints:data
            }
            ]
        });
    chart1.render();
}
function render2(data)
{
    var chart1 = new CanvasJS.Chart("chartContainer",
           {
            title:{
                text: "BPERP Net uses Predicted Graph",      
                fontFamily: "arial black",
                fontColor: "DarkSlateGrey"
            },
                        animationEnabled: true,
            axisX: {
                title:"no. of days ",
                titleFontFamily: "arial"

            },
            axisY:{
                title: "data uses in mb",
                titleFontFamily: "arial",
                titleFontSize: 5
            },

            data: [
            {        
                type: "scatter",  
                toolTipContent: "<span style='\"'color: {color};'\"'> </span> In {x} days<br/>  used data={y}MB ",
                dataPoints:data
            }
            ]
        });
    chart1.render();
}
function click2()
{
  var data1=[],y;
for(var jj=0; jj<200;jj++)
{  
   y=theta[0]+theta[1]*jj;
   if(y>0)
   {
    data1.push({x:jj,y:y});
   }
}
render2(data1);
}
Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
var stat="<?php echo $d["stats"];?>";
if(stat!="Expired")
{
  var dayDiffupNow= Date.daysBetween(new Date("2014-08-01"),new Date());
  console.log("Day difference "+dayDiffupNow);
  var datadifff=    theta[0]+theta[1]*(dayDiffupNow)-(theta[0]+theta[1]*(dayDiffupNow-1));
  document.getElementById("rtotal").innerHTML= "Today "+datadifff +" MB data is being used by <?php echo $d["name"]; ?>.  " ;  

}

document.getElementById("dateTime").addEventListener("change",function(){alert("Hello");});
</script> 

        <?php
    }
 
    echo "</body></html>";
    }
    else
        header("Location:login.php");
}

?>

       