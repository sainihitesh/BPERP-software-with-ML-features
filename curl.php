<?php
include_once("includes/simple_html_dom.php");
include_once("mysql.php");
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
  $mysql=$GLOBALS['mysql'];
  $url = "http://203.122.12.242:2002/userportal/subs.do";
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $tmpfname = dirname(__FILE__).'/cookies\/'.$u;
  curl_setopt($ch, CURLOPT_COOKIEFILE, $tmpfname);
  $out = curl_exec($ch);
  $output=str_get_html($out);
  $ret = $output->find('tr.odd td'); 
  $data['status']=$ret[6];
  $st= str_replace("<td>","",$data['status']);
  $stat=str_replace("</td>","",$st);
  $stat=trim($stat);
  $pl = str_replace("<td>","",$ret[3]);
  $plan=str_replace("</td>","",$pl);
  $na = str_replace("<td>","",$ret[1]);
  $name = str_replace("</td>","",$na);
  //echo $stat;
if($plan=="poornimafree2"||$plan=="Twodaypass"||$plan=="Girls Monthly Plan"||$plan=="2GB 7 Days Plan")
  {
  preg_match("/((-)?[0-9]+\.[0-9]+)/",$ret[7],$datar);
  preg_match("/(MB)|(GB)|(K)|(B)/",$ret[7],$dr);
  $dm =$dr[0];
  $rd=$datar[0];
  }else
  {
  preg_match("/((-)?[0-9]+\.[0-9]+)/",$ret[11],$datar);
  preg_match("/(MB)|(GB)|(K)|(B)/",$ret[11],$dr);
  $dm =$dr[0];
  $rd=$datar[0];
  }
  if (!$rd) {
     $rd=0;
   } 
  $dm=trim($dm);$rd=trim($rd);
  $sql = "UPDATE bperp SET remainingData=$rd, stats='$stat' , plan='$plan',remdunit='$dm', name='$name' where username=$u";
  mysqli_query($mysql,$sql);
  curl_close($ch);
  echo "{ \"remData\":\"$rd\", \"stat\":\"$stat\",\"plan\":\"$plan\",\"remDunit\":\"$dm\",\"name\":\"$name\",\"username\":\"$u\",\"finalStat\":\"rightOne\" }";
  return $data;
}
 if(json_decode(httpPost("http://203.122.12.242:2002/userportal/newlogin.do",array('type' => 1,'username'=>$_GET['u'],'password'=>$_GET['p'],'phone'=>0,'jsonresponse'=>'true' )))->errorMessage=="Account Login Success")
 {
  $res = scrapdetails($_GET['u']);
 }
else{
  $u=$_GET['u'];
  $mysql=mysqli_connect("localhost","root","123456","hs");
  $sql = "UPDATE bperp SET  stats='null' ,remdunit='null' where username=$u";
  mysqli_query($mysql,$sql);
  echo"{ \"remData\":\"null\",\"stat\":\"null\",\"plan\":\"null\",\"remDunit\":\"null\",\"name\":\"null\",\"username\":\"null\",\"finalStat\":\"wrongOne\"}";
} 



?>