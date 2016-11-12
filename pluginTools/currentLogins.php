<?php
session_start();
include_once("../includes/simple_html_dom.php");
function httpPost($url,$params)
{
  $postData = '';
   //create name value pairs seperated by &
   foreach($params as $k => $v) 
   { 
      $postData .= $k . '='.$v.'&'; 
   }
   $postData = rtrim($postData, '&');
    $ch = curl_init();  
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_HEADER, false); 
    curl_setopt($ch, CURLOPT_POST, count($postData));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData); 
  $tmpfname = dirname(__FILE__)."/cookies\/".$_GET['u'];
    curl_setopt($ch, CURLOPT_COOKIEJAR, $tmpfname);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);
    curl_setopt($ch, CURLOPT_HEADER, false);
    $output=curl_exec($ch);
    curl_close($ch);
   return $output;
}
function scrapdetails2($u,$time,$p,$yymmdd)
{
  $data = array();
  $ch = curl_init();
  $pd=$yymmdd;
  $url = "http://203.122.12.242:2002/userportal/sessionHistory.do?submit=Go&6578706f7274=1&pageTitle=Session+History&fromdate=".$pd."&d-49653-e=1&todate=".$pd."&period=last12hrs&actid=".$u;
  echo $url;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpfname = dirname(__FILE__).'/cookies\/'.$u;
    curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);
  $out = curl_exec($ch);
  touch("api/LogOff_temp/".$u);
  file_put_contents("api/LogOff_temp/".$u,$out);
  curl_close($ch);
  parseMac($time,$u,$p);
}
function parseMac($date,$u,$p)
{
	if (is_file("api/LogOff_temp/".$u)) {
    $fd=fopen("api/LogOff_temp/".$u,"r"); 
  $dat=str_replace("<td>", "", $date);
  $da=str_replace("</td>", "", $dat);
  $d=trim($da);
  while(!feof($fd))
        {
          $fcv=fgetcsv($fd);
          var_dump($fcv);
          if (count($fcv)>1) {
          if ($fcv[3]==$d) 
           {
              
              array_push($fcv,$p);
              file_put_contents("api/LogOff_temp_processed/".$u, json_encode($fcv));
              //unlink("api/LogOff_temp/".$u);
                break;
              
           } 
           else{
              
           }
          }
            
        }
  }

}
function scrapdetails($u,$p,$yymmdd)
{
  $remainingData='';
  $data = array();
  $ch = curl_init();
  $url="http://203.122.12.242:2002/userportal/currentSessions.do";
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpfname = dirname(__FILE__).'/cookies\/'.$u;
  curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);
  $out = curl_exec($ch);
  $output=str_get_html($out);
  $ret = $output->find('tr.odd'); 
  //var_dump($ret);
  if ($ret) {
  	echo"{ \"Stat\":\"Online\"}";
  	$datt = str_get_html($ret[0]);
  	$retn=$datt->find("td");
  	scrapdetails2($u,$retn[4],$p,$yymmdd);
  }else
  echo"{ \"Stat\":\"Offline\"}";
  curl_close($ch);
  
}
if ($_SESSION['u']!=null) 
{
if(json_decode(httpPost("http://203.122.12.242:2002/userportal/newlogin.do",array('type' => 1,'username'=>$_GET['u'],'password'=>$_GET['p'],'phone'=>0,'jsonresponse'=>'true' )))->errorMessage=="Account Login Success")
  {
  $res = scrapdetails($_GET['u'],$_GET['p'],$_GET['YYMMDD']);
  }
 else
  {
  echo"{ \"Stat\":\"null\"}";
  } 

}
else
{
  echo"{ \"Stat\":\"null\"}";
}
?>