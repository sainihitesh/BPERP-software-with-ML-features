<?php
include_once("LoginToken/token.php");
session_start();

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
            <script src="js/typeahead.bundle.js"></script>
            <script src="js/scrap.js"></script>
            <script type="text/javascript" src="js/scrap_history.js"></script>
            <script type="text/javascript">SyntaxHighlighter.all();</script>
            <link type="text/css" rel="stylesheet" href="styles/shCoreDefault.css"/>
            <script type="text/javascript" src="plugins/notyn/jquery.noty.packaged.min.js"></script>
            <link href="css/commoncss..css" rel="stylesheet"/>
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
                #pass1{
                        width: 81%;
                }    
                #basic-addon1{
                        width: 19%;
                        background: black;
                        color: white;
                }
                #SubForm{
                    width: 24%;
                    height: 152%;
            }
           html {
            height: 100%;
            width: 100%;
                }
button#infos{
    width: 12%;
    height: 189%
}
        body {
            font-family:cursive;
            font-weight: bold;
            line-height:20px;
             }
   
    </style>

    <link rel="stylesheet" type="text/css" href="plugins/notyn/buttons.css"/>
    <link rel="stylesheet" type="text/css" href="plugins/notyn/animate.css"/>
    <link rel="stylesheet" href="plugins/notyn/font-awesome/css/font-awesome.min.css"/>
    <script type="text/javascript" src="plugins/notyn/main.js"></script>
        </head>
        <body>
        <div class="container">
            <hr/>
            <ol class="breadcrumb">
                <li><a href="see.php?who=Tunechi99">Home</a></li>
                 <li><a href="see.php?who=Tunechi99">See Data</a></li>
                 <li class="active">Feed Data</li>
                 <li><a href="dstat.php?who=Tunechi99">See Statistics </a></li>
                 <li><a onclick="scrap();" href="#">Update Data</a></li>
                 <li><a onclick="scrapHistory();" href="#">Update History Details</a></li>
                 <li><a href="prediction.php?who=Tunechi99">See Prediction</a></li>
                 <li><a href="about.php?who=Tunechi99">About</a></li>
            </ol> 
            <h4>User Panel </h4>
            <hr/>
            <table class="table" border="1px solid blue">
            <tr style="background: antiquewhite;">
            <td>Username</td>
            <td>Password</td>
            </tr>
            <tr>
            <td><input type="text" id="userid" placeholder="Username" class="form-control"/></td>
            <td><input type="text" id="passid" placeholder="Password" class="form-control"/></td>
            </tr>
            <tr>
            <td>
                <input id="SubForm" type="button" class="btn btn-info" value="Submit"/>
            </td>
            </tr>
            </table>
             
            <div id="Content_Pane">
            
            </div>


<script>
var Subbtn = document.getElementById("SubForm");
    Subbtn.addEventListener("click",SubclickHandler,false);

function SubclickHandler()
{
    var u = document.getElementById("userid").value;
    var p = document.getElementById("passid").value;
    var div_id=document.getElementById("Content_Pane");
    var url,http;
    if(u==''||p=='')
        return ;
    http = new XMLHttpRequest();
    url = "feed.php?username="+u+"&password="+p+"&mac=null&ip=null&plan=null";
    http.open("GET",url);
    http.onreadystatechange=function()
    {
        if(http.status==200&&http.readyState==4)
        {
            if(http.responseText=="Updated")
            {
                ShowOperationTable({u:u,p:p},div_id);
            }
            else if(http.responseText="AlreadyExist")
            {
                alert("Already Exist");
            }
        }
    }
    http.send();

}
function ShowOperationTable(cred ,div_id)
{
    div_id.innerHTML = "<table class=\"table\" border=\"1px solid blue\"><tr style=\"background: antiquewhite;\"><td>Username</td><td>Password</td></tr><tr><td><input type=\"text\" class=\"form-control\" value='"+cred.u+"' disabled/></td><td><input type=\"text\" class=\"form-control\" value='"+cred.p+"' disabled/></td></tr><tr><td><button id='infos' class='btn btn-info'><span class='glyphicon glyphicon-save' onclick='"+SendReq(cred,"VerifyData")+"'></span></button><button id='infos' class='btn btn-info'><span class='glyphicon glyphicon-sort' onclick='"+SendReq(cred,"VerifyData")+"'></span></button></td></tr></table>";
   
    

}
function SendReq(cred , typeOfCall)
{
    
}  
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