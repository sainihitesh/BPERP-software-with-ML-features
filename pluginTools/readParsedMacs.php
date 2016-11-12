<?php
require_once("../LoginToken/token.php");
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
 			
 				  $data =array();	
 			      $open = opendir("api/processed");
 			      while ($read=readdir($open)) {
 			      	if ($read!='..'&&$read!='.'&&$read!='index.html') {
 			      		 $fd=file_get_contents("api/processed/".$read);
 			      		 //unlink("api/processed/".$read);
 			      		 array_push($data, $fd);
 			      	}
 			      }
 			      echo json_encode($data);
      } 
    }
}      