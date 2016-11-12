<?php
include_once("includes/functions.sortHistry.php");

if ($_GET["who"]="chutiya") 
{
 	$sorted_content_dir = "Sorted_data/";
	$dir=opendir("history/");
	$dir_content=array();
	$file_content=array();
	while($con=readdir($dir))
	{
		if($con!='.'&&$con!='..'&&$con!='index.php')
		{
			array_push($dir_content,$con);
			$fd=fopen("history/".$con,"r");	
			$file_content[$con]=array();
			while(! feof($fd))
  			{
  				array_push($file_content[$con],fgetcsv($fd));
  				array_push($dir_content,$con);
  			}
			fclose($fd);
		}
	}

//wrting the sorted data into a saperated directory
for ($lk=0; $lk < count($dir_content); $lk++) 
{ 
	 $dta= sortAddData(sortOMore(sortData(getCoords($file_content[$dir_content[$lk]]))));
	 $dtts='';
	$ij= 1;$ik=count($dta)-1;
	foreach ($dta as $key => $value) 
	{
	if($ij==$ik)
	   break;
	$dtts.=$key.",".$value.PHP_EOL;
	$ij++;

	}
	touch("Sorted_data/".$dir_content[$lk]);
	file_put_contents("Sorted_data/".$dir_content[$lk],$dtts);
}

}