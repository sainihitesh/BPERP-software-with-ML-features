<?php
/*
#: Title: 
#: Date: 
#:  
#: Version: 1.0
#: Description :
#: Options:
*/
if(!empty($_GET))
{
$url ="http://203.122.12.242:2002/userportal/newlogin.do";
$data = array('type' => $_GET['type'], 'username' => $_GET['u'],'password'=>$_GET['p'],'phone'=>0,'jsonresponse'=>true);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n".
			     "Cookie: 72C50786EA5D86B8FDA628648225C244"	,
        'method'  => 'POST',
        'content' => http_build_query($data),
    ),
);
$context  = stream_context_create($options);
$result = file_get_contents($url,false, $context);
if ($result === FALSE) { /* Handle error */ }

echo $result;


}


?>
