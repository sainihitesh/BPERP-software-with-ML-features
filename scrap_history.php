<?php
include_once("includes/simple_html_dom.php");

function httpPost($url,$params)
{
  $postData = '';
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
  $data = array();
  $ch = curl_init();
  $url = "http://203.122.12.242:2002/userportal/sessionHistory.do?submit=Go&6578706f7274=1&pageTitle=Session+History&fromdate=2014-08-01&d-49653-e=1&todate=".date("Y-m-d")."&period=last12hrs&actid=".$u;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpfname = dirname(__FILE__).'/cookies\/'.$u;
    curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);
  $out = curl_exec($ch);
  touch("api/history/".$u);
  file_put_contents("api/history/".$u,$out);
  curl_close($ch);
}
 if(json_decode(httpPost("http://203.122.12.242:2002/userportal/newlogin.do",array('type' => 1,'username'=>$_GET['u'],'password'=>$_GET['p'],'phone'=>0,'jsonresponse'=>'true' )))->errorMessage=="Account Login Success")
 {
  $res = scrapdetails($_GET['u']);
  echo "right one";
 }
else{
  echo "wrong Creds";
} 

?>