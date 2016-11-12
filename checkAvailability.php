<?php
session_start();
include_once("includes/simple_html_dom.php");
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
function scrapdetails($u)
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
  }else
  echo"{ \"Stat\":\"Offline\"}";
  curl_close($ch);
  
}
if ($_SESSION['u']!=null) 
{
if(json_decode(httpPost("http://203.122.12.242:2002/userportal/newlogin.do",array('type' => 1,'username'=>$_GET['u'],'password'=>$_GET['p'],'phone'=>0,'jsonresponse'=>'true' )))->errorMessage=="Account Login Success")
  {
  $res = scrapdetails($_GET['u']);
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