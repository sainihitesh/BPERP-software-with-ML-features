<?php
include_once("../LoginToken/token.php");
include_once("includes/functions.sortHistry.php");
session_start();

if($_GET["who"]=="chutiya") 
{
 if($_SESSION['u']==$cred_email)
 {
    $u=$_GET['u'];
    $sorted_content_dir = "Sorted_data/";
  	$file_content=array();
    if (is_file("history/".$u)) 
    {
    	 $fd=fopen("history/".$u,"r");	
    	 while(! feof($fd))
  			{
  				array_push($file_content,fgetcsv($fd));
  			}
			fclose($fd);
			$dta= sortAddData(sortOMore(sortData(getCoords($file_content))));
			$dtts='';
	$ij= 1;$ik=count($dta)-1;
	foreach ($dta as $key => $value) 
	{
	if($ij==$ik)
	   break;
	$dtts.=$key.",".$value.PHP_EOL;
	$ij++;

	}
	touch("Sorted_data/".$u);
	file_put_contents("Sorted_data/".$u,$dtts);	


    }
    else
    {

    }
 }
}
?>
	 