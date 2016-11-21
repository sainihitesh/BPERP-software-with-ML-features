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
            <script type="text/javascript" src="js/bperp.js"></script> 
            <!-- <script type="text/javascript" src="js/helpers/arrays.js"></script> -->
            <!-- <script type="text/javascript" src="scripts/shCore.js"></script> -->
            <script src="css/js/jquery.js"></script>
            <script src="css/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="help/help.js"></script>
            <script type="text/javascript">
                document.onload=function(){}
            </script>
            <!-- <script src="js/typeahead.bundle.js"></script> -->
            <!-- <link type="text/css" rel="stylesheet" href="styles/shCoreDefault.css"/> -->
            <link href="css/commoncss..css" rel="stylesheet"/>
            <script type="text/javascript" src="plugins/notyn/jquery.noty.packaged.min.js"></script>
    <script type="text/javascript" src="plugins/jquery-ui/jquery-ui.js"></script>
    <link type="text/css" href="plugins/jquery-ui/jquery-ui.chatbox.css" rel="stylesheet" />
    <script type="text/javascript" src="plugins/jquery-ui/jquery-ui.chatbox.js"></script>
  <script src="plugins/jquery.terminal/js/jquery.mousewheel-min.js"></script>
    <script src="plugins/jquery.terminal/js/jquery.terminal.min.js"></script>
    <link href="plugins/jquery.terminal/css/jquery.terminal.css" rel="stylesheet"/>
    <script type="text/javascript" src="js/canvasjs.min.js"></script>
    <script type="text/javascript">
   $(document).ready(function()
    {
      /*
        declare gloabl box variable,
        so we can check if box is alreay open,
        when user click toggle button
      */
      var box = null;
      
      /*
        we are now adding click hanlder for 
        toggle button.
      */
      
      $("#OpenTerminal").click(function(event, ui)
      {
        /*
          now if box is not null,
          we are toggling chat box.
        */
        if(box)
        {
          /*
            below code will hide the chatbox that 
            is active, when first clicked on toggle button
          */
          box.chatbox("option", "boxManager").toggleBox();
        }
        else
        {
          /*
            if box variable is null then we will create
            chat-box.
          */
          box = $("#chat_div").chatbox(
          {
            /*
              unique id for chat box
            */
            id:"GHOST",
                        user:
            {
              key : "value"
            },
            /*
              Title for the chat box
            */
            title : "GHOST Terminal",
            /*
              messageSend as name suggest,
              this will called when message sent.
              and for demo we have appended sent message to our log div.
            */
            messageSent : function(id, user, msg)
            {
               
             }
          });
          
    $('#chat_div').terminal(function(command, term) {
      
        if (command !== ''){
            if (command== 'help') 
            {
              var stringData='';
              for (var i = 0; i < TerminalHelp.length; i++) {
                    stringData+=TerminalHelp[i]+", ";
              }
              term.echo("Help is avail for "+stringData);
              return; 
            }
            var str = new RegExp("help[ ]+(.)*");
            var result=command.match(str);
            if (result) 
            {
            var results=result[0].substr(result[0].indexOf(' '),result[0].length-1);
                results=results.replace(/\s/g, '');
              if (TerminalHelp.contains(results)) 
                  {
                    term.echo("Help for "+results+" \n");
                    var http=new XMLHttpRequest();
                    var url="help/"+results+".txt";    
                    http.open("GET",url);
                    http.onreadystatechange=function(){
                      if (http.status==200&&http.readyState == 4) 
                      {
                        term.echo(http.responseText);
                      }
                  }
                    http.send(); 
                }
               else
               {
                    term.echo("Help is not avail for "+results);
               } 
              
            }else{
            try {
                var resultt = window.eval(command);
                if (resultt !== undefined) {
                    term.echo(new String(resultt));
                }
            } catch(e) {
                term.error(new String(e));
            }
           } 
        } else {
           term.echo('');
        }
    }, {
        greetings: 'GHOST\'s Terminal',
        name: 'MyTerminal',
        height: 200,
        prompt: 'hs> '
    });
 
        }
      });
    });
    </script>
    <style type="text/css">
      .canvasjs-chart-canvas{
        width: inherit;
      }
    </style>
    <link rel="stylesheet" type="text/css" href="css/see.css">
    <link rel="stylesheet" type="text/css" href="plugins/notyn/buttons.css"/>
    <link rel="stylesheet" type="text/css" href="plugins/notyn/animate.css"/>
    <link rel="stylesheet" href="plugins/notyn/font-awesome/css/font-awesome.min.css"/>
    <script type="text/javascript" src="plugins/annyang/annyang.min.js"></script>
    <!-- <script type="text/javascript" src="plugins/notyn/main.js"></script> -->
        </head>
        <body>
        <div class="container">  
            
            <ol class="breadcrumb" style="margin-bottom: 0px; ">
                <li><a href="index.php?who=Tunechi99">Home</a></li>
                <li class="active">See Data</li>
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
             
            <div id="demo" class="collapse">
            <select name="sel" id="select" class="form-control">
                <option selected disabled>Select Type</option>
               <option>Name</option>
                <option>Plan</option>
                 <option>Stat</option>
                <option>Username</option>
                <option>Password</option>
                <option>MAC</option>
                <option>IP</option>
            </select>
            <h4><input id="s" class="form-control" placeholder="Search[RegExp]"/></h4>
            </div>
              <ul class="nav nav-tabs"  style="background: #b2d8ff;">
  <li class="active"><a href="#collapseSeePage" data-toggle="tab">See Data</a></li>
  <li><a href="#DataUses" data-toggle="tab" onclick="BPERP.Graph.DataUsesPredictionGraph();">Uses Statistics</a></li>
  <li><a href="#ReasonOfLogOff" data-toggle="tab">Predict about Data</a></li>   
   <li><a id="AboutHeading" href="#AboutBPERP" data-toggle="tab">About </a></li>        
              </ul>
              <div class="tab-content">
              <div id="collapseSeePage"  class="tab-pane active">
                
            <div class="well well-lg" style="    background: white;border-radius:0px ">
                
                <div class="panel panel-default" style="    border-color: rgba(221, 221, 221, 0);min-height:700px">
                    <table class="table">
                        <k class="list-group-item" id="tott" style="border-color: white;">total=</k>  
                        
                        <tr>
                        <td>
                        <k id="rtotal">&nbspRemaining Data=00.00000 GB</k>
                        </td>
                        <td id="ViewPanel1">
                          <div id='ViewPanel2' class="btn-group" role="group" aria-label="...">
    <div class="btn-group" role="group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="glyphicon glyphicon-cog"></span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#" id="OpenTerminal">Open Terminal</a></li>
      <li><a  data-toggle='modal' data-target="#FakeMacModal" onclick="BPERP.History.flushFakeTable({TableFakeMacs:'TableFakeMacs'});" style="cursor: hand">Who's Running Through FAKE MAC</a></li>
      <li><a href="#" onclick="BPERP.Util.checkLogins({tableId:'contentpane',totalId:'tott',rTotal:'rtotal',rTotalId:'rtotal'});">Who's Online?</a></li>
    </ul>
  </div>

 <select id="ViewSetting" class="btn btn-default" onchange="BPERP.editView(this,{tableId:'contentpane',TotalId:'tott',totalId:'tott',rTotalId:'rtotal',divId:'circleGs'});">
                             <option selected disabled>Select View</option>
                             <option value='viewAll'>View All accounts</option>
                             <option value='viewActive'>View Active Accounts</option>
                              <option value='Expired'>View Expired accounts</option>
                              <option value='null'>View other accounts</option>
</select>

</div>
                        </td>
                        </tr>
                        <ul class="list-group">
                            <table class='table' id="contentpane" style="border:1px solid blue">
                            
                            </table>
                         <div id="circleGs"> 
                         <div id="circleG">
  <div id="circleG_1" class="circleG"></div>
  <div id="circleG_2" class="circleG"></div>
  <div id="circleG_3" class="circleG"></div>
                            </div>
                            </div>   
                        </ul>
                    </table>
                     
    <!--Chat box will be generated in this container-->
    <div id="chat_div"></div>
                </div>
            </div>
              </div>    
  <!--Data Statistics from linear regression-->            
  <div class="tab-pane" id="DataUses"  style="width: 100% ;min-height:700px">
   <div id="chartContainer1"  style="width: 100% ;min-height:500px;min-width: 700px;">
   <div class="panel panel-default" style="    border-color: rgba(221, 221, 221, 0);min-height:700px">
     <h1>Todays Data Uses of users(Frequent Users)</h1>
    <table class="table">
    </table>
    </div>
   </div>
  </div>  
  <!--Prediction for reason of Log Off for current logged in Accounts-->     
  <div class="tab-pane" id="ReasonOfLogOff"   style="width: 100% ;min-height:700px">
    <div class="panel panel-default" style="    border-color: rgba(221, 221, 221, 0);">
        <div class="flipbutt"  style="text-align: right;width: 100%">
        
      <div class="btn-group">
        <a href="#logoff" title="Logoff prediction" data-toggle="tab" class="btn btn-primary"><span class="glyphicon glyphicon-arrow-left"></span></a>
        <a type="button" title="Likely login prediction" href="#likelylogin" data-toggle="tab" class="btn btn-primary"><span class="glyphicon glyphicon-arrow-right"></span></a>
      </div>  Choose prediction  
        </div>
         <div class="tab-content">
              <div id="logoff"  class="tab-pane active" style="min-height: 600px">
    <h1>LogOff Prediction</h1>
        
        <hr>
        अनुमान लगाने से पहले एतिहास अद्यतन करे
    <table class="table">
     <tr>
       <td>LogOff Prediction</td>
       <td style="text-align: right;">
          <div id='ViewPanel2' class="btn-group" role="group" aria-label="...">
    <div class="btn-group" role="group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="glyphicon glyphicon-cog"></span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a onclick="BPERP.Prediction.flushFakeTableData({RemainingInfo:'RemainingInfo'})" style="cursor: hand">Update Logoff Predictions details</a></li>
    </ul>
  </div>
 <button id="ViewSettings" class="btn btn-default" onclick="BPERP.FetchAllCurrentLoggedInAccounts({MsgPanel:'MsgPanel',LogOffDetailsTable:'LogOffDetailsTable'})">Start Fetching Current Logins</button>
</div>
     </td>
     </tr>
    </table>
    <div  class="table-responsive">
    <table class="table" id="LogOffDetailsTable">
      
    </table>
    </div>
    <div id="MsgPanel" style="background: white;color:black;font-size: xx-large;"></div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <h1 style="text-align: center;">Currently Logged In Accounts</h1>
        </thead>
      </table>
    </div>
    </div>
    <div id="likelylogin"  class="tab-pane"  style="min-height: 600px">
         <h1>Likely to Login Prediction</h1>
        
        <hr>
        अनुमान लगाने से पहले एतिहास अद्यतन करे
    <table class="table">
     <tr>
       <td>Likely to Login Prediction</td>
       <td style="text-align: right;">
          <div id='ViewPanel2' class="btn-group" role="group" aria-label="...">
    <div class="btn-group" role="group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="glyphicon glyphicon-cog"></span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a onclick="flushFakeLLTableData()" style="cursor: hand">Update Likely Login Predictions details</a></li>
    </ul>
  </div>
 <button id="ViewSettings" class="btn btn-default" onclick="BPERP.History.FetchAllCurrentLikelyLoggedInAccounts()">Start Fetching Accounts</button>
</div>
     </td>
     </tr>
    </table>
    <div  class="table-responsive">
    <table class="table" id="LogOffDetailsTable">
      
    </table>
    </div>
    <div id="MsgPanel" style="background: white;color:black;font-size: xx-large;"></div>
    <div class="table-responsive">
      <table class="table">
        <thead>
        <h1 style="text-align: center;">Likely to  Log In Accounts</h1>
        </thead>
      </table>
    </div>
    </div>

    </div>
    </div>
  </div>
  <div class="tab-pane" id="AboutBPERP"   style="width: 100% ;min-height:700px">
    <div class="panel panel-default" style="    border-color: rgba(221, 221, 221, 0);min-height:700px">
    <h1>About BPERP</h1>
    BPERP stands for Bangon Password Enterprises Resourse Planning.  
    <!--Canvas Element Insertion Start -->
    <div  id="CanvasParent" style="height: 100%;width: 100%">
    </div>
    <!--Canvas Element Insertion End -->
    </div>
  </div>  
  </div>                                 

            <div class="modal fade" id="acModal" tabindex="-1" role="dialog" aria-labelledby="acModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Settings</h4>
                        </div>
                        <div class="modal-body">
                        <h1>Official Info</h1>
                        <div>
                          <table class="table" id="OfficialDetail">
                            
                          </table>
                        </div>
                          <hr>
                        <pre class=" " id="view">
                        </pre>
                        
                        
                        </div>

                        <div class="modal-footer">
                            <a id="P_link"href="#" class="btn btn-default">See Prediction</a>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="FakeMacModal" tabindex="-1" role="dialog" aria-labelledby="FakeMacModal">
                <div class="modal-dialog" role="document" style="width: 74%;">
                    <div class="modal-content" style="    background: #433f3f;color: black">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <h2 class="modal-title" id="FakeMacModalS">Finding who's logged in using Fake MAC</h2>
                        </div>
                        <div id="modalBodyFM" class="modal-body" style="background: aliceblue;font-family: -webkit-body;font-size:medium;">
                         <h1 id="FakeMac_h1">Checking Who is Online with FAKE Mac...</h1> 
                        <table class="table" id="TableFakeMacs" style="border:1px solid black;border-color:black; ">
                          
                          
                        </table>
                        </div>
                        <div id="MsgPane" style="background: white;color:black;font-size: xx-large;"></div>
                        <div class="modal-footer">
                            <a id="FakeMacModalSS" onclick="BPERP.History.macCheck({MsgPane:'MsgPane',TableFakeMacs:'TableFakeMacs'});" href="#" class="btn btn-default">Start Searching FakeMacs</a>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>
             <div class="modal fade" id="dataStatisticsModal" tabindex="-1" role="dialog" aria-labelledby="dataStatisticsModal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Data  Statistics</h4>
                        </div>
                        <div class="modal-body" style="height:800px;width: 700px">
                        </div>

                       
                    </div>
                </div>
            </div>
            <form id='Acc_detail_login'   name="loginForm" action='http://203.122.12.242:2002/userportal/newlogin.do' method='post'>
            <input type='hidden' name='type' value='1'/>
            <input id='username_Acc' type='hidden' name='username' value=''/>
            <input id='password_Acc' type='hidden' name='password' value=''/>
            <input id='phone_Acc' type='hidden' name='phone' value='0'/>
            <input id='loginBtn' type='hidden' name='loginBtn' value='Login'/>
            <input id='phone_Acc' type='hidden' name='jsonresponse' value='true'/>
            </form><!-- 
<script type="text/javascript" src="js/see.js"></script> -->


        <script>
$(document).ready(function(){
    $("input").tooltip(); 
});
$('[data-toggle="tooltip"]').tooltip();
</script>
<script type="text/javascript">
  var url = "get.php?who=chutiya";
               var http = new XMLHttpRequest();
                http.open("GET", url);
                http.send();
                http.onreadystatechange = function () {
                    if (http.status == 200 && http.readyState == 4) {
                        BPERP.data = eval(http.responseText);
                         BPERP.processHtml({'data':BPERP.data,viewCondition:'Active'},{tableId:'contentpane',totalId:'tott',rTotalId:'rtotal',divId:'circleGs'});
                         document.getElementById('circleGs').innerHTML=''; 
                        //BPERP.data=data;                     
                    }
                }
   document.getElementById("select").addEventListener("change", function (e) {
                    if (document.getElementById("select").value != 'Select Type') {
                        document.getElementById("s").focus();
                    }
                });

document.getElementById("s").addEventListener("keyup", function(evt){BPERP.search(evt,{tableId:'contentpane',totalId:'tott',P_link:'P_link',view:'view',OfficialDetail:'OfficialDetail',searchInputId:'s',selectType:'select',rtotal:'rtotal'})});

BPERP.thirdParty.SpeechRecognition({tableId:'contentpane',totalId:'tott',rTotal:'rtotal',rTotalId:'rtotal'});
setInterval(function(){
  if (!navigator.onLine) 
  {
    alert("System is Offline!");
  }
},10000);
</script>
<script type="text/javascript" src="js/about.js"></script>
<script type="text/javascript" src="js/OfficialData.js"></script>
<!-- <script type="text/javascript">SyntaxHighlighter.all();</script>            -->
<?php 
    }
      require_once('footbar.php');
       echo "</body></html>";
    }
    else
        header("Location:login.php");
}

?>
