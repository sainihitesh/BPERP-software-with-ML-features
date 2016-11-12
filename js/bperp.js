var BPERP = {
    //data which is to be fetched from database
    data:'',
    //data crawled from pgc website
    officialData:''
};
    BPERP.thirdParty = {};
    BPERP.Util={};
    BPERP.Graph={};   
    BPERP.History={};
    BPERP.Prediction={};
    BPERP.draw={};

BPERP.Graph.DataUsesPredictionGraph=function()
{
    var dat={"x":0,"y":0,"indexLabel":"indexLabel"}, http,url="get.php?who=chutiya&dataUses=yes";
    var datas=[];var vale=0,Pred_Data;
                for (var i = BPERP.data.length - 1; i >= 0; i--) 
                     {
                         dat.indexLabel=BPERP.data[i].name;   
                         Pred_Data=parseInt(BPERP.data[i].PerDayUseInMB);  
                         if(Pred_Data>0&&BPERP.data[i].stats=="Active") 
                         {
                         datas.push({"x":vale,"y":parseInt(BPERP.data[i].PerDayUseInMB),"indexLabel":dat.indexLabel,"name":BPERP.data[i].name,"plan":BPERP.data[i].plan,"remainingData":BPERP.data[i].remainingData,"uname":BPERP.data[i].username});
                         vale+=5;
                         }                        
                     }
                     datas=BPERP.Util.sortData(datas); 
                     var chart = new CanvasJS.Chart("chartContainer1", {
                title: {
                    text: "Todays Data Uses of users(Frequent Users)"
                },
                axisX: {
                    interval:5
                },
                dataPointWidth:20,
                data: [{
                    type: "column",
                    indexLabelLineThickness: 2,
                    toolTipContent: "<span style='\"'color: {"+BPERP.Util.rgba()+"};'\"'> </span>  <a href=\"#\" target='_blank' onclick='BPERP.openStatPage(this)'>{name},{uname}</a> , {plan} <br/>  Todays data uses pediction={y}MB <br>remaining Data={remainingData}",
                    dataPoints: datas
                }]
            });
            chart.render();     
}     
//noty plugin func
BPERP.thirdParty.generate=function(type, text,layout){
        var n = noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        layout      : layout,
        closeWith   : ['click'],
        theme       : 'relax',
        maxVisible  : 10,
        animation   : {
            open  : 'animated bounceInRight',
            close : 'animated bounceOutRight',
            easing: 'swing',
            speed : 500
        }
    });
    }
BPERP.Util.sortData=function(data)
{
  var i,j,key,temp;
  for (i =0 ; i < data.length ; i++) 
  {
      key=data[i];
      for (j =0 ; j < data.length ; j++) 
      {
              if (key.PerDayUseInMB<data[j].PerDayUseInMB) 
              {
                  temp = key;
                  key  = data[j] ;
                  data[j] =temp;
              }
      }
  }
  return data;
}
BPERP.Util.officialDataSearch=function(data,key)
{
    var i, ret = null;
    for (i = BPERP.officialData.length - 1; i >= 0; i--){if (key==BPERP.officialData[i].studM){return BPERP.officialData[i];}}
    return ret;
}
BPERP.Util.getCookie=function(cname)
{
  var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
BPERP.Util.rgba=function() 
{
var r = parseInt(Math.random() * 200);
var g = parseInt(Math.random() * 200);
var b = parseInt(Math.random() * 200);
var a = Math.random() * 10;
return ("rgba(" + r + "," + g + "," + b + "," + a + ")");
}
BPERP.Util.checkLogins=function(argument2)
{
document.cookie="UserLog=valueTrue";
document.getElementById(argument2.tableId).innerHTML='';
BPERP.processHtml({data:BPERP.data,viewCondition:'Active'},{tableId:argument2.tableId,totalId:argument2.totalId,rTotalId:argument2.rTotalId});
document.cookie ='UserLog=valueTrue;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
BPERP.Util.openAccDetail=function(creds)
{
  try{
    var data = eval(creds.getAttribute("creds"));
    document.getElementById('username_Acc').value=data[0];
    document.getElementById('password_Acc').value=data[1];
    window.open("http://203.122.12.242:2002/userportal/pages/action/userportal_index.jsp", '_blank', 'location=yes,height=700,width=720,scrollbars=yes,status=yes');
    //noinspection JSAnnotator
      document.getElementById("Acc_detail_login").submit()=true;
       }catch(e){console.log("error occured in function: openAccDetail");}
}
BPERP.Util.randIP=function(){return ("20.0." + parseInt(100 * Math.random()) + "." + parseInt(100 * Math.random()));}
BPERP.Util.updateStatus=function()
{
    var url,http;
                    url="updateStat.php?pn="+phonenumber+"&stats="+id.value;
                    http=new XMLHttpRequest();
                    http.open("GET",url);
                    http.send();
}
BPERP.Util.CheckAvail= function(obj,argument2)
{
                    var i,json,http,count,url,ac,net,url2,htp;
                    http=new XMLHttpRequest();
                        json =JSON.parse(id.getAttribute("vals"));
                        url="post.php?u="+json.username+"&p="+json.password+"&type=1";
                        http.open("GET",url);
                        http.send();
                        http.onreadystatechange=function(e)
                        {
                            if(http.status==200&&http.readyState==4)
                            {
                                ac=JSON.parse(http.responseText);
                                if(ac.errorMessage=="Account Login Success")
                                {
                                    document.getElementById(argument2.acc).style.backgroundColor="blue";
                                    document.getElementById(argument2.acc).innerHTML="For Acc:<p>"+ac.errorMessage;
                                }else{
                                    document.getElementById(argument2.acc).style.backgroundColor="red";
                                    document.getElementById(argument2.acc).innerHTML="For Acc: <p>"+ac.errorMessage;
                                }
                            }
                        }
                    htp=new XMLHttpRequest();
                    url2="post.php?u="+json.username+"&p="+json.password+"&type=2";
                    htp.open("GET",url2);
                    htp.send();
                    htp.onreadystatechange=function(e)
                    {
                        if(htp.status==200&&htp.readyState==4)
                        {
                            ac=JSON.parse(htp.responseText);
                            if(ac.errorMessage=="Account Login Success")
                            {
                                document.getElementById(argument2.net).style.backgroundColor="blue";
                                document.getElementById(argument2.net).innerHTML="For Acc:<p>"+ac.errorMessage;
                            }else{
                                document.getElementById(argument2.net).style.backgroundColor="red";
                                document.getElementById(argument2.net).innerHTML="For Acc: <p>"+ac.errorMessage;
                            }
                        }
                    }
}
BPERP.Util.selectThis = function(ele)
{
                    if (ele.type == 'password') 
                    {
                        ele.type = 'text';
                        ele.select();
                        ele.addEventListener("blur", function (e) {
                            ele.type = 'password';
                        });
                    }
                    else if (ele.type == 'text') {ele.select();}
}


url = "get.php?who=chutiya";
                http = new XMLHttpRequest();
                http.open("GET", url);
                http.send();
                http.onreadystatechange = function () {
                    if (http.status == 200 && http.readyState == 4) {
                        BPERP.data = eval(http.responseText);
                        //DataStruct=data; 
                        //document.getElementById("rtotal").innerHTML="&nbsp;Remaining Data="+calculateFupData(data)+" GB";
                        BPERP.processHtml({'data':BPERP.data,viewCondition:'Active'},{tableId:'contentpane',totalId:'tott',rTotalId:'rtotal'});  
                        //BPERP.data=data;                     
                    }
                }
/*
Description: 
Name:sort 
Onhover and click on label to sort the data
Parameters:
argument1 :className 
*/
//Start BPERP.sort 
BPERP.sort=function(argument1)
{
	var elements = document.getElementsByClassName(argument1.getAttribute("class"));
    for (var i = 0; i < elements.length; i++) 
    {
        elements[i].style.backgroundColor="rgba(0, 128, 110, 0.75)";
    }
}
//End BPERP.sort




/*
Description: 
Name:calculateFupData 
Onhover and click on label to unsort the data
Parameters:
argument1 :className 
*/
//Start BPERP.calculateFupData 
BPERP.calculateFupData=function()
{
  var rbalance,unit,i,total =0;
                  for ( i=0; i < this.data.length; i++) 
                     {   
                        try
                        {
                         unit=this.data[i].remdunit ;
                           if(this.data[i].remdunit=="GB"){rbalance=1024* parseInt(this.data[i].remainingData);}
                           else { rbalance = parseInt(this.data[i].remainingData); }  
                         // calculating the remaining data in  main balance and fup balance
                         var reg1 = new RegExp("MB"),reg2 = new RegExp("Active"),reg3 = new RegExp("GB");
                         var currentdate = new Date();
                         var hours =parseInt(currentdate.getHours());  
                         if ((reg1.exec(this.data[i].remdunit)||reg3.exec(this.data[i].remdunit))&&(rbalance>0)&&reg2.exec(this.data[i].stats)) 
                         {
                                 if(hours>18)
                                 {
                                    if(this.data[i].plan!="staff")
                                    {
                                      total+=rbalance;  
                                    }
                                 }   
                                 else
                                 {
                                    total+=rbalance;
                                 }        
                         } 
                        }
                        catch(e)
                        {
                            console.log("this data is without unit"+this.data[i].username);
                        }
                    }
                   return (total/1024); 
}
//End BPERP.calculateFupData


/*
Description: 
Name:unSort 
Onhover and click on label to unsort the data
Parameters:
argument1 :className 
*/
//Start BPERP.unSort 
BPERP.unSort=function(argument1)
{
	var elements = document.getElementsByClassName(argument1.getAttribute("class"));
    for (var i = 0; i < elements.length; i++) 
    {
        elements[i].style.backgroundColor="transparent";
    }
}
//End BPERP.unSort


/*
Description: 
Name:dataSortAD 
on click sort Data View on see.php page
Parameters:
argument1 :{colomnName:'',orderBy:''}
argument2 :{rTotalId:'',tableId:'',totalId:''}
*/
//Start BPERP.dataSortAD 
BPERP.dataSortAD=function(argument1,argument2)
{
	var http,url,data;
    url="pluginTools/saveSettingPreference.php?who=chutiya&orderBy="+argument1.colomnName+"&AscDescOrder="+argument1.orderBy;
    http=new XMLHttpRequest();
    http.open("GET",url);
    http.onreadystatechange=function(){
      if (http.status==200&&http.readyState==4) 
      {
         document.getElementById(argument2.rTotalId).innerHTML="&nbsp;Remaining Data="+BPERP.calculateFupData()+" GB";
      	 BPERP.thirdParty.generate("success","<span class='glyphicon glyphicon-ok'></span> Order by "+argument1.colomnName+" in "+argument1.orderBy+" Order","topRight"); 
      	 document.getElementById(argument2.tableId).innerHTML='';
      	 BPERP.fetchData({data:this.data,viewCondition:'Active'},argument2);
      }
    }
    http.send();
}
//End BPERP.dataSortAD


BPERP.fetchData=function(argument1,argument2)
{
  var url = "get.php?who=chutiya";
               var http = new XMLHttpRequest();
                http.open("GET", url);
                http.send();
                http.onreadystatechange = function () {
                    if (http.status == 200 && http.readyState == 4) {
                        argument1.data = eval(http.responseText);
                        BPERP.data=argument1.data;
                        //DataStruct=data;console.log("El");
                        //document.getElementById("rtotal").innerHTML="&nbsp;Remaining Data="+calculateFupData(data)+" GB";
                        //BPERP.processHtml({'data':BPERP.data,viewCondition:'Active'},{tableId:'contentpane',TotalId:'tott',rTotalId:'tott'});  
                        //BPERP.data=data;                     
                        BPERP.processHtml(argument1,argument2);
                    }
                }
}

/*
Description: 
Name:processHtml 
process Html onload initial view on Content Panel
Parameters:
argument1 : {data:BPERP.data,viewCondition:'Active|Expired|Unknown'}
argument2 : {tableId:'',TotalId:''}
*/
//Start BPERP.processHtml 
BPERP.processHtml=function(argument1,argument2) 
{
BPERP.Util.loading(argument2,'on');
document.getElementById(argument2.tableId).innerHTML='';
 if (document.getElementById(argument2.tableId).innerHTML=='') 
                    {
                      var tr="";
 var tr="";
tr += "<tr style=\"background: white\">";
tr += "    <td id=\"Ssno\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\" class=\"Ssno\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> S.No<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ID',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ID',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"user\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\" class=\"user\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Username<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'username',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'username',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Spassword\" class=\"Spassword\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Password<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'password',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'password',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Smac\" class=\"Smac\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Mac<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'mac',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'mac',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Sip\" class=\"Sip\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> IP<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ip',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ip',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Splan\" class=\"Splan\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Plan<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'plan',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'plan',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Saccc\" class=\"Saccc\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">ac<\/td>";
tr += "    <td id=\"SStat\" class=\"SStat\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Stat<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\">Ascending<\/a> <a class=\"dropdown-item\" href=\"#\">Descending<\/a>";
tr += "            <\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"SRemData\" class=\"SRemData\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> RemData<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\"";
tr += "                                          onclick=\"BPERP.dataSortAD({colomnName:'remainingData',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'remainingData',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "<\/tr>";
document.getElementById(argument2.tableId).innerHTML=tr;
                    }
                    var i, ele, color, container = [], ac, vals, stats,statval;
                    var currentdate = new Date();    
                    var hours =parseInt(currentdate.getHours());
                    var views = new RegExp(argument1.viewCondition);
                    var url = "getStat.php?username=", http = new XMLHttpRequest();
                    var data_clasific={Active:0,Expired:0,Unknown:0};        
                    for (i = this.data.length - 1; i > -1; i--) { 
                        vals = JSON.stringify(this.data[i]);
                        statval=this.data[i].stats;
                        if(statval=="Expired")
                            statval="<k style='color:red;font-weight:bold;'>"+statval+"</k>";
                        else if(statval=="Active")
                            statval="<k style='color:green;font-weight:bold;'>"+statval+"</k>"
                        else if(statval=="Expired")
                            statval="<k style='color:yellow;font-weight:bold;'>"+statval+"</k>";
                        else if(statval=="Faculty")
                            statval="<k style='color:blue;font-weight:bold;'>"+statval+"</k>";
                        ac = "<button val='" + vals + "' onclick=\"BPERP.popup(this,{tableId:'contentpane',TotalId:'tott',P_link:'P_link',view:'view',OfficialDetail:'OfficialDetail'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                        if(this.data[i].stats=="null"){
                         ele = "<tr class='undefined' id='trview"+i+"'>";
                         data_clasific.Unknown++;
                       }
                        else if(this.data[i].stats=="Expired"){
                          ele = "<tr class='undefined1' id='trview"+i+"'>";
                          data_clasific.Expired++;  
                        }
                        else if(this.data[i].stats=="Active"){
                          ele = "<tr class='undefined2' id='trview"+i+"'>";
                          data_clasific.Active++;  
                        }
                        else{ ele = "<tr  id='trview"+i+"'>"; }
                        ele += "<td class='Ssno'>" + this.data[i].ID + "</td>" + "<td  class='user'><input data-toggle='tooltip'  title='"+this.data[i].name+"' value='" + this.data[i].username + "' class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' value='" + this.data[i].username + "'/></td>" + "<td class='Spassword'><div class='input-group'><span style='coursor:hand'  title='Open Account Details' creds=\"['"+this.data[i].username+"','"+this.data[i].password +"']\" onclick='BPERP.Util.openAccDetail(this)' class='input-group-addon' id='"+i+"'>"+this.data[i].password.length+"</span><input class='form-control' onclick='BPERP.Util.selectThis(this)' id='pass1' type='password'  data-toggle='tooltip' title='"+this.data[i].password.length+"' value='" + this.data[i].password + "'/></div></td>" + "<td class='Smac'>" + this.data[i].mac + "</td>" + "<td class='Sip'>" + this.data[i].ip + "</td>" + "<td class='Splan'>" + this.data[i].plan + "</td><td class='Saccc'>" + ac + "</td><td  class='SStat'>" + statval + "</td><td  class='SRemData'>"+this.data[i].remainingData+" "+this.data[i].remdunit+"</td>";
                        ele += "</tr>";  
                      if(views.exec(this.data[i].stats))
                        {   
                        if(hours>18)
                                 {
                                    if(this.data[i].plan!="staff")
                                        {
                                      if(this.data[i].stats=="Active"&&BPERP.Util.getCookie('UserLog')!='')
                                        {this.checkAvailability({u:this.data[i].username,p:this.data[i].password,id:i});}
                                         document.getElementById(argument2.tableId).innerHTML += ele;
                                        } 
                                    }
                           else{
                                   if(this.data[i].stats=="Active"&&BPERP.Util.getCookie('UserLog')!='')
                                        {this.checkAvailability({u:this.data[i].username,p:this.data[i].password,id:i});}
                                         document.getElementById(argument2.tableId).innerHTML += ele;     
                           }         
                                 }    
                        
                    }
                    document.getElementById(argument2.totalId).innerHTML = "<b><k style='color:rgb(51, 51, 51);'>Total=" + this.data.length + ",</k> <k style='color:#001dff;'> Active="+data_clasific.Active+"</k>,<k style='color:red'> Expired="+data_clasific.Expired+"</k>,<k style='color:#ff8f00;'> Unknown="+data_clasific.Unknown+"</k></b>";
                    document.getElementById(argument2.rTotalId).innerHTML="&nbsp;Remaining Data="+BPERP.calculateFupData()+" GB";
                    //BodyView = document.getElementById(argument2.tableId).innerHTML;
                    if (document.getElementById(argument2.tableId).innerHTML=='') {document.getElementById(argument2.tableId).innerHTML="<h1>Nothing Found!!</h1>";}
                    BPERP.Util.loading(argument2,'off');
}
//End BPERP.processHtml  



/*
Description: 
Name:checkAvailability 
check if user is online or offline
Parameters:
argument1 :{u:this.data[i].username,p:this.data[i].password,id:i} 
*/
//Start BPERP.checkAvailability 
BPERP.checkAvailability=function(argument1)
{
   var url = "checkAvailability.php?u="+argument1.u+"&p="+argument1.p;
            var http = new XMLHttpRequest();
            var signal;
                http.open("GET", url);
                http.onreadystatechange=function()
                {
                   try{
                    signal = JSON.parse(http.responseText);
                    if(signal.Stat=="Online")
                    document.getElementById(argument1.id).style.background = "green";    
                    else if(signal.Stat=="Offline") 
                    document.getElementById(argument1.id).style.background = "red";
                    else
                    document.getElementById(argument1.id).style.background = "yellow";
                   }catch(e)
                   {
                    console.log("Error in function:checkAvailability  , "+e);
                   }   
                }

                http.send(); 
}
//End BPERP.checkAvailability


/*
Description: 
Name:editView 
check if user is online or offline
Parameters:
argument2 : {tableId:'',TotalId:''}
*/
//Start BPERP.editView 
BPERP.editView=function(cmd,argument2)
{
                document.getElementById(argument2.tableId).innerHTML='';
               if(cmd.value=="viewActive")  {BPERP.processHtml({data:this.data,viewCondition:'Active'},argument2);}
               else if(cmd.value=="viewAll"){BPERP.processHtml({data:this.data,viewCondition:'[a-zA-Z]'},argument2);}
               else if(cmd.value=="Expired"){BPERP.processHtml({data:this.data,viewCondition:'Expired'},argument2);}
               else if(cmd.value=="null")   {BPERP.processHtml({data:this.data,viewCondition:'null'},argument2);}
}
//End BPERP.editView



/*
Description: 
Name:popup 
check if user is online or offline
Parameters:
argument1 : this
argument2 : {tableId:'',TotalId:'',P_link:'',view:'',OfficialDetail:''}
*/
//Start BPERP.popup 
BPERP.popup=function(v,argument2)
{               
                    var http,oinfo,url, htm,phonenumber,stats,selhtm,data = JSON.parse(v.getAttribute("val"));
                    data.mac = data.mac;
                    data.ip = data.ip;
                    data.plan = data.plan;
                    phonenumber=data.username;
                    stats=data.stats
                    document.getElementById(argument2.P_link).href = "prediction.php?who=Tunechi99&u="+data.username;
                    selhtm="<tr><td>Change Status</td><td><select class='form-control' onchange='BPERP.Util.updateStatus(this,"+phonenumber+")'><option selected disabled>Select</option><option>Expired</option><option>Running</option><option>Faculty</option><option>ChainUser</option><option>Wrong Creds</option><option>Subs about to end</option></select></td></tr><tr><td>Check Avaliability</td><td><button class='form-control' style='background: black;color:white' vals='"+v.getAttribute("val")+"' onclick='BPERP.Util.CheckAvail(this,{net:'net',acc:'acc'})'>Check</button></td></tr><tr><td id='acc'>For Acc</td><td id='net'>For Net</td></tr>";
                    if (data.mac == '') {
                        htm = "macchanger -r eth0  <br>ifconfig eth0 up " + BPERP.Util.randIP() + " <hr/><h4>Creds</h4>  <table class='table'><tr><td>Username of ["+ data.name +"] </td><td><input class='form-control'  type='text' onclick='BPERP.Util.selectThis(this)' value='" + data.username + "' /></td></tr><tr><td>password</td><td><input type='password' class='form-control' onclick='selectThis(this)' value='" + data.password + "' /></td></tr>"+selhtm+"</table>";
                    }else {
                        htm = "macchanger -m " + data.mac + " <br>ifconfig eth0 up " + data.ip + " <hr/><h4>Creds</h4>  <table class='table'><tr><td>Username of ["+ data.name +"]</td><td><input class='form-control'  type='text' onclick='BPERP.Util.selectThis(this)' value='" + data.username + "' /></td></tr><tr><td>password</td><td><input type='password' class='form-control' onclick='BPERP.Util.selectThis(this)' value='" + data.password + "' /></td></tr>"+selhtm+"</table>";
                    }
                    document.getElementById(argument2.view).innerHTML = htm;
                    oinfo = BPERP.Util.officialDataSearch(BPERP.officialData,data.username);
                    if (oinfo) 
                    {
                        document.getElementById(argument2.OfficialDetail).innerHTML="<tr><td> Name</td><td> Reg.No.</td><td> Father's Name</td><td> Mobile</td></tr>";
                        document.getElementById(argument2.OfficialDetail).innerHTML+="<tr><td> "+oinfo.Name+"</td><td> "+oinfo.RegNo+"</td><td>"+oinfo.FatherName+"</td><td>"+oinfo.studM+"</td></tr>";    
                    }
                    else
                    {
                        document.getElementById(argument2.OfficialDetail).innerHTML="No Details";
                    }
}
//End BPERP.popup



/*
Description: 
Name:search 
Search in BPERP database
Parameters:
argument1 : evt
argument2 : {tableId:'',TotalId:'',P_link:'',view:'',OfficialDetail:'',searchInputId:'',selectType:''}
*/
//Start BPERP.search 

BPERP.search=function(evt,argument2)
{
    console.log("Search in bperp database");
    var i, reg, html, statval, ac, ele, vals, uval, planval,count=0, stype = document.getElementById(argument2.selectType).value;
                    try{
                    var i, ele, color, container = [], ac, vals, stats,statval;
                    var url = "getStat.php?username=", http = new XMLHttpRequest();
                    var data_clasific={Active:0,Expired:0,Unknown:0};     
                    }catch(e){console.log("var already delared in function : keypressHandler");}
    var tr="";
tr += "<tr style=\"background: white\">";
tr += "    <td id=\"Ssno\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\" class=\"Ssno\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> S.No<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ID',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ID',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"user\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\" class=\"user\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Username<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'username',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'username',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Spassword\" class=\"Spassword\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\"";
tr += "        style=\"background-color: transparent;\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Password<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'password',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'password',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Smac\" class=\"Smac\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Mac<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'mac',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'mac',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Sip\" class=\"Sip\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> IP<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ip',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'ip',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Splan\" class=\"Splan\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Plan<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'plan',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'plan',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"Saccc\" class=\"Saccc\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">ac<\/td>";
tr += "    <td id=\"SStat\" class=\"SStat\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> Stat<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\">Ascending<\/a> <a class=\"dropdown-item\" href=\"#\">Descending<\/a>";
tr += "            <\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "    <td id=\"SRemData\" class=\"SRemData\" onmouseover=\"BPERP.sort(this)\" onmouseout=\"BPERP.unSort(this)\">";
tr += "        <div class=\"btn-group\">";
tr += "            <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\"";
tr += "                    aria-haspopup=\"true\" aria-expanded=\"false\"> RemData<span";
tr += "                    class=\"glyphicon glyphicon-option-vertical\"><\/span><\/button>";
tr += "            <div class=\"dropdown-menu\"><a class=\"dropdown-item\"";
tr += "                                          onclick=\"BPERP.dataSortAD({colomnName:'remainingData',orderBy:'ASC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Ascending<\/a> <a";
tr += "                    class=\"dropdown-item\" onclick=\"BPERP.dataSortAD({colomnName:'remainingData',orderBy:'DESC'},{rTotalId:'rtotal',tableId:'contentpane',totalId:'tott'})\">Descending<\/a><\/div>";
tr += "        <\/div>";
tr += "    <\/td>";
tr += "<\/tr>";
document.getElementById(argument2.tableId).innerHTML=tr;                
        if (stype == "Select Type")
                        alert("Pick a search Criteria");
        else
        {
           reg = new RegExp(document.getElementById(argument2.searchInputId).value);
                        if (stype == "Plan") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan.replace(document.getElementById(argument2.searchInputId).value, "<k style='color:blue;'>" + document.getElementById(argument2.searchInputId).value + "</k>")
                                if (reg.exec(BPERP.data[i].plan, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="&nbsp;Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        //else if
                        else if (stype == "Username") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].username, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="&nbsp;Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        else if (stype == "Password") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].password, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="&nbsp;Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        else if (stype == "Stat") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].stat, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        else if (stype == "Name") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].name, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' title='"+BPERP.data[i].name+"' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        else if (stype == "MAC") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].mac, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' title='"+BPERP.data[i].name+"' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
                        else if (stype == "IP") 
                        {
                            for (i = BPERP.data.length - 1; i > -1; i--) {
                                planval = BPERP.data[i].plan;
                                if (reg.exec(BPERP.data[i].ip, "i")) {
                                    count++;
                                    statval = BPERP.data[i].stats;
                                    ac = "<button val='" + JSON.stringify(BPERP.data[i]) + "' onclick=\"BPERP.popup(this,{tableId:'"+argument2.tableId+"',totalId:'"+argument2.totalId+"',P_link:'"+argument2.P_link+"',view:'"+argument2.view+"',OfficialDetail:'"+argument2.OfficialDetail+"'});\"  data-toggle='modal' data-target='#acModal'><span class='glyphicon glyphicon-cog'></span></button>";
                                    ele = "<tr>";
                                    ele += "<td>" + BPERP.data[i].ID + "</td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='text' title='"+BPERP.data[i].name+"' value='" + BPERP.data[i].username + "'/></td>" + "<td><input class='form-control' onclick='BPERP.Util.selectThis(this)' type='password' value='" + BPERP.data[i].password + "'/></td>" + "<td>" + BPERP.data[i].mac + "</td>" + "<td>" + BPERP.data[i].ip + "</td>" + "<td>" + planval + "</td><td>" + ac + "</td><td>" + statval + "</td>"+ "</td><td>" + BPERP.data[i].remainingData+' '+ BPERP.data[i].remdunit+ "</td>";
                                    ele += "</tr>";
                                    document.getElementById(argument2.tableId).innerHTML += ele;
                                }
                            }
                             document.getElementById(argument2.totalId).innerHTML="Total="+count;
                             document.getElementById(argument2.rtotal).innerHTML="Remaining Data="+BPERP.calculateFupData()+" GB";
                        }
        }                
}
//End BPERP.search
BPERP.Prediction.flushFakeTableData = function(argument2)
{
BPERP.thirdParty.generate("information","<span class='glyphicon glyphicon-download-alt'> </span> updating LogOff Prediction Data!!<br>","topRight");
BPERP.thirdParty.generate("success","<span id='RemainingInfo'>"+ BPERP.data.length+" Accounts are remaining! </span>","bottomRight");
BPERP.Prediction.getLogOffData(BPERP.data,BPERP.data.length-1,argument2);
}
BPERP.Prediction.getLogOffData=function(data, count,argument2)
{
    var http, url,resText;
    if(count>-1) {
        if(data[count].stats=="Active") 
        {
        http = new XMLHttpRequest();
        url = "api/process_logoff_data.php?u=" + data[count].username + "&p=" + data[count].password;
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                var urls = "api/calculate_logoff_data.php?u="+data[count].username;
                var https= new XMLHttpRequest();
                    https.open("GET", urls);
                    https.onreadystatechange = function ()
                    {
                         if (https.status == 200 && https.readyState == 4) 
                         {
                            document.getElementById(argument2.RemainingInfo).innerHTML=count+" Accounts are remaining! ";
                            BPERP.Prediction.getLogOffData(data, count - 1,argument2);
                         } 
                    }
                https.send();    
            }

        }
        }else
        {
               BPERP.Prediction.getLogOffData(data, count - 1,argument2);
        }
    }
    else
    {
        BPERP.thirdParty.generate("warning",'<div class="activity-item"> <i class="fa fa-check text-success"></i> <div class="activity"> System Data has been updated.<br></div> </div>');
        window.location.reload();
    }
}

BPERP.FetchAllCurrentLoggedInAccounts=function(argument2)
{
    BPERP.CurrentLogs(argument2);
}
BPERP.CurrentLogs=function(argument2)
{
document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-info'>Checking for fake MACS..</div>"
document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-info'>"+BPERP.data.length +" Accounts are remaining! </div>";
BPERP.currentLogsCheck(BPERP.data,BPERP.data.length-1,argument2);
}
BPERP.currentLogsCheck=function(data, count,argument2)
{
    var http, url,resText,ymd;
    var date = new Date();
    var mon= ''+(date.getMonth() + 1);
    var days=''+date.getDate();
    if (mon.length<2)   {mon='0'+date.getMonth();}
    if (days.length<2)  {days='0'+date.getDate();}
    var ymd= date.getFullYear()+'-'+mon+'-'+days;
    document.getElementById(argument2.LogOffDetailsTable).innerHTML='';
    if(count>-1) {
        http = new XMLHttpRequest();
        if (data[count].stats=="Active") 
        {
        url = "pluginTools/currentLogins.php?u=" + data[count].username + "&p=" + data[count].password+"&YYMMDD="+ymd;
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                try{
                    resText = JSON.parse(http.responseText);                
                if(resText.finalStat=="wrong Creds")
                   document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-error'>Wrong cred found..</div>"; 
                else    
                  {
                    if(resText.stat=="Active")
                        document.getElementById(argument2.MsgPanel).innerHTML="";
                    else
                        document.getElementById(argument2.MsgPanel).innerHTML="";
                  }
                  }catch( e){
                    console.log(e);
                }
                document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-info'>"+count +" Accounts are remaining! </div>";
                BPERP.currentLogsCheck(data, count-1,argument2);
            }
        }
    }else{
        BPERP.currentLogsCheck(data, count-1,argument2);
    }
    }
    else
    {
        document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-info'>Checking is Done Now..Getting the fake mac list</div>"
        url = "pluginTools/readParsedCurrentLogins.php?who=Tunechi99";
        http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        var json,datas=[],lengths;
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                try{
                    json=JSON.parse(http.responseText);
                    document.getElementById(argument2.MsgPanel).innerHTML="<div class='alert alert-success'>Done!</div>"                        
                    document.getElementById(argument2.MsgPanel).innerHTML="";
                    datas=BPERP.History.JSONPARSE(json);
                    BPERP.process_acc_logoff_html(datas,argument2);
                }catch(e){
                    console.log("Error in function fakeMacCheck"+e);
                }  
            }
        }
    }
}

BPERP.process_acc_logoff_html=function(data,argument2)
{
    var body=document.getElementById(argument2.LogOffDetailsTable);
    var tbRow="";
    var ele='';
var TableRow="";
TableRow += "<thead class=\"thead-inverse\"><tr style=\"background: white\">";
TableRow += "   <td    style=\"background-color: transparent;\">";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> Name<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('ID','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('ID','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td  style=\"background-color: transparent;\">";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> Username<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('username','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('username','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td  style=\"background-color: transparent;\">";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> Password<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('password','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('password','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td>";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> Mac<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('mac','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('mac','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td>";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> IP<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('ip','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('ip','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td>";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> Duration<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "         <div class=\"dropdown-menu\"> <a class=\"dropdown-item\" onclick=\"DataSortAD('plan','ASC')\">Ascending<\/a> <a class=\"dropdown-item\" onclick=\"DataSortAD('plan','DESC')\">Descending<\/a> <\/div>";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "   <td>Used<\/td>";
TableRow += "    ";
TableRow += "   <td>";
TableRow += "      <div class=\"btn-group\">";
TableRow += "         <button id=\"SortActBtn\" type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Prediction(L.R.)<span class=\"glyphicon glyphicon-option-vertical\"><\/span> <\/button> ";
TableRow += "          ";
TableRow += "      <\/div>";
TableRow += "   <\/td>";
TableRow += "<\/tr></thead>";

    var statval=0;
    if (data.length>0) 
    {
    body.innerHTML=TableRow;
    for (var i = data.length - 1; i >= 0; i--) 
    {
        ele+='<tr>';
        ele +="<td>" + data[i][1] + "</td>" + "<td  class='user'><input data-toggle='tooltip'  title='"+data[i][1]+"' value='" + data[i][2] + "' class='form-control' onclick='selectThis(this)' type='text' value='" + data[i][2] + "'/></td>" + "<td class='Spassword'><div class='input-group'><span style='coursor:hand'  title='Open Account Details' creds=\"['"+data[i][2]+"','"+data[i][11] +"']\" onclick='openAccDetail(this)' class='input-group-addon' id='"+i+"'>"+data[i][11].length+"</span><input class='form-control' onclick='selectThis(this)' id='pass1' type='password'  data-toggle='tooltip' title='"+data[i][11].length+"' value='" + data[i][11] + "'/></div></td>" + "<td class='Smac'>" + data[i][6] + "</td>" + "<td class='Sip'>" + data[i][5]+ "</td><td  class='SRemData'>"+data[i][4]+"</td>"+"<td>"+data[i][9]+"</td><td><button class='btn btn-danger' onclick='BPERP.Prediction.PredictLogOff(this)' dats=\"['"+data[i][3]+"','"+data[i][4]+"','"+data[i][7]+"','"+data[i][8]+"','"+data[i][2]+"']\">predict LogOff reason</button></td>";
        ele+='</tr>';
    }
    body.innerHTML+=ele;
    }
    else
    {
        body.innerHTML="<h2>No Fake Mac Logins...though!!</h2>"
    }
}
BPERP.Prediction.PredictLogOff=function(obj)
{
    var classes=['Idle-Timeout','User-error','User-request'];
    var dats=eval(obj.getAttribute("dats"));
    var us,ds,X=[],http,url,thetas,vals=[0,0,0];
    var date= new Date(dats[0]);
    var starting_time=(date.getHours()+date.getMinutes()/60+date.getSeconds()/3600);
        date = dats[1].split(":");
    var duration =(24*parseInt(date[0])+parseInt(date[1])+parseInt(date[2])/60+parseInt(date[3])/3600);
    
    if (dats[2].match("MB")) { dats[2] = parseFloat(dats[2].replace("MB","",dats[2])); }
    else if(dats[2].match("GB")){dats[2] = 1024*parseFloat(dats[2].replace("GB","",dats[2]));}
    else if(dats[2].match("KB")) {dats[2] = parseFloat(dats[2].replace("KB","",dats[2]))/1024;}
    else{dats[2]=0;}   

    if (dats[3].match("MB")) { dats[3] = parseFloat(dats[3].replace("MB","",dats[3])); }
    else if(dats[3].match("GB")){dats[3] = 1024*parseFloat(dats[3].replace("GB","",dats[3]));}
    else if(dats[3].match("KB")) {dats[3] = parseFloat(dats[3].replace("KB","",dats[3]))/1024;}
    else{dats[3]=0;} 
    us=dats[2]/duration;
    ds=dats[3]/duration;
    X=[1,starting_time,us,ds];
    url = "pluginTools/getThetas.php?u="+dats[4];
    http = new XMLHttpRequest();
    http.open("GET",url);
    http.onreadystatechange=function()
    {
        if (http.status==200&&http.readyState==4) 
        {
              try{
                thetas = eval(http.responseText);
                console.log(thetas);
                vals[0]=BPERP.sigmoid(X,thetas[0]);
                vals[1]=BPERP.sigmoid(X,thetas[1]);
                vals[2]=BPERP.sigmoid(X,thetas[2]);
                var maxX = BPERP.Util.max(vals); 
                var index = vals.indexOf(maxX);
                obj.innerHTML=classes[index];
            }catch(e){
                obj.innerHTML="No Reason!!";
                console.log("Error in func PredictLogOff"+e);
            }
        }
    }
    http.send();
}
 
BPERP.sigmoid=function(x,theta)
{   var i,hyperplane=0;
    hyperplane+=theta[0];
    for( i= 1; i <x.length; i++){hyperplane+=x[i]*theta[i];}
    return (1/(1+Math.exp(-hyperplane)));
}
BPERP.openStatPage=function(obj)
{
    var u = obj.innerHTML.split(",")[1];
    var url ="prediction.php?who=Tunechi99&u="+u;
    obj.href=url;
}
BPERP.History.scrap=function()
{
  BPERP.thirdParty.generate("information","<span class='glyphicon glyphicon-download-alt'> </span> updation has been started!!<br>","topRight");
  BPERP.thirdParty.generate("success","<span id='RemainingInfo'>"+ BPERP.data.length+" Accounts are remaining! </span>","bottomRight");
  BPERP.History.updateAcc(BPERP.data,BPERP.data.length-1);
}
BPERP.History.updateAcc=function(data, count)
{
    var http, url,resText;
    if(count>-1) {
        http = new XMLHttpRequest();
        url = "curl.php?u=" + data[count].username + "&p=" + data[count].password;
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                try{
                resText = JSON.parse(http.responseText);                
                if(resText.finalStat=="wrong Creds")
                  BPERP.thirdParty.generate("error"," "+ data[count].name+" has given the wrong Creds","topRight");  
                else    
                  {
                    if(resText.stat=="Active")
                        BPERP.thirdParty.generate("success"," "+ data[count].name+"'s Account is [ <k style='color:blue'>"+ resText.stat+"</k> ]","topRight");
                    else
                        BPERP.thirdParty.generate("success"," "+ data[count].name+"'s Account is [ <k style='color:red'>"+ resText.stat+"</k> ]","topRight");
                  }
                  }catch( e){
                    console.log(e);
                }
                document.getElementById('RemainingInfo').innerHTML=count+" Accounts are remaining! ";
                BPERP.History.updateAcc(data, count - 1);
            }
        }
    }
    else
    {
        BPERP.thirdParty.generate("warning",'<div class="activity-item"> <i class="fa fa-check text-success"></i> <div class="activity"> System Data has been updated.<br></div> </div>');
        window.location.reload();
    }
}

BPERP.History.macCheck=function(argument2)
{
document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-info'>Checking for fake MACS..</div>"
document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-info'>"+BPERP.data.length +" Accounts are remaining! </div>";
BPERP.History.fakeMacCheck(BPERP.data,BPERP.data.length-1,argument2);
}
BPERP.History.fakeMacCheck=function(data, count,argument2)
{
    var http, url,resText,ymd;
    var date = new Date();
    var mon= ''+(date.getMonth() + 1);
    var days=''+date.getDate();
    if (mon.length<2)   {mon='0'+date.getMonth();}
    if (days.length<2)  {days='0'+date.getDate();}
    var ymd= date.getFullYear()+'-'+mon+'-'+days;
    document.getElementById(argument2.TableFakeMacs).innerHTML='';
    if(count>-1) {
        http = new XMLHttpRequest();
        if (data[count].stats=="Active") 
        {
        url = "pluginTools/fakeMacCheckUp.php?u=" + data[count].username + "&p=" + data[count].password+"&YYMMDD="+ymd;
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                try{
                    resText = JSON.parse(http.responseText);                
                if(resText.finalStat=="wrong Creds")
                   document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-error'>Wrong cred found..</div>"; 
                else    
                  {
                    if(resText.stat=="Active")
                        document.getElementById(argument2.MsgPane).innerHTML="";
                    else
                        document.getElementById(argument2.MsgPane).innerHTML="";
                  }
                  }catch( e){
                    console.log(e);
                }
                document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-info'>"+count +" Accounts are remaining! </div>";
                BPERP.History.fakeMacCheck(data, count-1,argument2);
            }

        }
    }else{
        BPERP.History.fakeMacCheck(data, count - 1,argument2);
    }
    }
    else
    {
        document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-info'>Checking is Done Now..Getting the fake mac list</div>"
        url = "pluginTools/readParsedMacs.php?who=Tunechi99";
        http = new XMLHttpRequest();
        http.open("GET", url);
        http.send();
        var json,datas=[],lengths;
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                try{
                    json=JSON.parse(http.responseText);
                    document.getElementById(argument2.MsgPane).innerHTML="<div class='alert alert-success'>Done!</div>"                        
                    document.getElementById(argument2.MsgPane).innerHTML="";
                    datas=BPERP.History.JSONPARSE(json);
                    BPERP.History.process_fakeMac_html(datas,argument2);
                }catch(e){
                    console.log("Error in function fakeMacCheck"+e);
                }       
            }
        }
    }
}
BPERP.History.process_fakeMac_html=function(data,argument2)
{
    var body=document.getElementById(argument2.TableFakeMacs);
    var tbRow="";
    var ele='';
    tbRow += "<tr style=\"border:1px solid black; \">";
tbRow += "                          <td>Name<\/td>";
tbRow += "                          <td>Username<\/td>";
tbRow += "                          <td>Password<\/td>";
tbRow += "                          <td>Mac<\/td>";
tbRow += "                          <td>IP<\/td>";
tbRow += "                          <td>Duration<\/td>";
tbRow += "                          <td>+Download<\/td>";
tbRow += "                          <\/tr>";
    var statval=0;
    if (data.length>0) 
    {
    body.innerHTML=tbRow;
    for (var i = data.length - 1; i >= 0; i--) 
    {
        ele+='<tr>';
        ele +="<td>" + data[i][1] + "</td>" + "<td  class='user'><input data-toggle='tooltip'  title='"+data[i][1]+"' value='" + data[i][2] + "' class='form-control' onclick='selectThis(this)' type='text' value='" + data[i][2] + "'/></td>" + "<td class='Spassword'><div class='input-group'><span style='coursor:hand'  title='Open Account Details' creds=\"['"+data[i][2]+"','"+data[i][11] +"']\" onclick='openAccDetail(this)' class='input-group-addon' id='"+i+"'>"+data[i][11].length+"</span><input class='form-control' onclick='selectThis(this)' id='pass1' type='password'  data-toggle='tooltip' title='"+data[i][11].length+"' value='" + data[i][11] + "'/></div></td>" + "<td class='Smac'>" + data[i][6] + "</td>" + "<td class='Sip'>" + data[i][5]+ "</td><td  class='SRemData'>"+data[i][4]+"</td>"+"<td>"+data[i][9]+"</td>";
        ele+='</tr>';
    }
    body.innerHTML+=ele;
    }
    else
    {
        body.innerHTML="<h2>No Fake Mac Logins...though!!</h2>"
    }
}

BPERP.History.JSONPARSE=function(json_arr)
{
    var arr=[],len;
    len=arr.length;
    for (var i = json_arr.length - 1; i >= 0; i--) 
    {
        arr[i]=JSON.parse(json_arr[i]);
    }
    return arr;
}
BPERP.History.scrapHistory=function()
{
BPERP.thirdParty.generate("information","<span class='glyphicon glyphicon-download-alt'> </span> updation has been started!!<br>","topRight");
BPERP.thirdParty.generate("success","<span id='RemainingInfo'>"+ BPERP.data.length+" Accounts are remaining! </span>","bottomRight");
BPERP.History.updateHistory(BPERP.data,BPERP.data.length-1);
}
BPERP.History.updateHistory=function(data,count)
{
    var http, url;
    if(count>0) {
        http = new XMLHttpRequest();
        url = "scrap_history.php?u=" + data[count].username + "&p=" + data[count].password;
        http.open("GET", url);
        http.send();
        http.onreadystatechange = function ()
        {
            if (http.status == 200 && http.readyState == 4)
            {
                if(http.responseText=="wrong Creds")
                  BPERP.thirdParty.generate("error"," "+ data[count].name+" has given the wrong Creds","topRight");  
                else    
                 {
                  BPERP.thirdParty.generate("success"," "+ data[count].name+"'s Data has been updated!!","topRight");
                  document.getElementById('RemainingInfo').innerHTML=count+" Accounts are remaining! ";
                  BPERP.History.parseData(data[count].username) ;
                 }
                  BPERP.History.updateHistory(data, count - 1);
            }
        }
    }
    else
    {
            console.log("scrapHistory Done!!");
            window.location.reload();
    }
} 
BPERP.History.parseData=function(username)
{
var http, url, data;
var BodyView;
url = "api/sortData.php?who=chutiya&u="+username;
http = new XMLHttpRequest();
http.open("GET", url);
http.send();
http.onreadystatechange = function () {
    if (http.status == 200 && http.readyState == 4) {
         
                http=new XMLHttpRequest();
                url = "Compute.php?who=Tunechi99&u="+username;
                http.open("GET",url);
                http.send();
        }
    }
}
BPERP.History.flushFakeTable=function(argument2)
{
    document.getElementById(argument2.TableFakeMacs).innerHTML='';
}
BPERP.History.FetchAllCurrentLikelyLoggedInAccounts=function()
{
  console.log("Under construction");
}
//cheking if array value exist or not
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
BPERP.Util.MAX=function(){return Math.max(...vals);}
BPERP.Util.loading=function(argument2,mode)
{
var ld="";
if (mode=='on') 
{
  ld += "<div id=\"circleG\">";
ld += "  <div id=\"circleG_1\" class=\"circleG\"><\/div>";
ld += "  <div id=\"circleG_2\" class=\"circleG\"><\/div>";
ld += "  <div id=\"circleG_3\" class=\"circleG\"><\/div>";
ld += "                            <\/div>";
document.getElementById('circleGs').innerHTML=ld;
}
else
{
document.getElementById('circleGs').innerHTML='';  
}
}
BPERP.draw.render1=function(Cords)
{
  var cors=BPERP.draw.calculateCoords(Cords)
    var chart1 = new CanvasJS.Chart("chartContainer",
           {
            title:{
                text: "BPERP Data Statistics",      
                fontFamily: "arial black",
                fontColor: "DarkSlateGrey"
            },
                        animationEnabled: true,
            axisX: {
                title:"Occurrence of username(chars) in password",
                titleFontFamily: "arial"

            },
            axisY:{
                title: "Occurrence of password(chars) in username",
                titleFontFamily: "arial",
                titleFontSize: 12
            },

            data: [
            {        
                type: "scatter",  
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span> <br/> <strong>username/password </strong> {x} times<br/> <strong>password/username </strong> {y} times",
                dataPoints:cors
            }
            ]
        });
  chart1.render();
}
BPERP.draw.render2=function(data)
{
   var http, url, data,Cords=[],Cords2=[];
                var BodyView;
                var chart2 = new CanvasJS.Chart("chartContainer",{
              title:{
                text: "BPERP Data Statistics",      
                fontFamily: "arial black",
                fontColor: "DarkSlateGrey"
            },
                        animationEnabled: true,
            axisX: {
                title:"length of username",
                titleFontFamily: "arial"

            },
            axisY:{
                title: "length of password",
                titleFontFamily: "arial",
                titleFontSize: 12
            },

            data: [
            {        
                type: "scatter",  
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span> <br/> <strong>username length </strong> {x} <br/> <strong>password length </strong> {y} ",
                dataPoints:Cords2
            }
            ]
           });
                for (var i=0;i<data.length;i++) 
                            {
                                Cords2.push({name:"username:"+data[i].username+" password:"+data[i].password,x:data[i].username.length,y:data[i].password.length});
                            }   
                                    chart2.render();

}
BPERP.draw.calculateOccurence=function(un,pass) {
         var i ,j ,match,count=0;
         for (var i= 0;i<un.length;i++) 
         {
           match=un[i];
           for (var j =0;j<pass.length;j++) 
           {
            if (match==pass[j]) 
            {
              count++;
              break;
            }
           }
         }
    return count;
  }
BPERP.draw.calculateCoords=function(data)
  {
       var i,j,x,y,ext,name;
       var Cozs=[];var reg = new RegExp("^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$");
       for (var i= 0;i<data.length;i++) 
       {
          name=reg.exec(data[i].password)?"username:"+data[i].username+" password:"+data[i].password+" ( Good password)":"username:"+data[i].username+" password:"+data[i].password+"( bad password)";    
                   x=BPERP.draw.calculateOccurence(data[i].username,data[i].password);
                   y=BPERP.draw.calculateOccurence(data[i].password,data[i].username);
           Cozs.push({x:x,y:y,name:name});
          
       }     
        return Cozs;
  }