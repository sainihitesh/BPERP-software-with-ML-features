<?php
if (!empty($_GET["u"])) 
{
if (is_file("history/".$_GET["u"])) 
{
$fd=fopen("history/".$_GET["u"], "r");	
$file_content=array();
$files=array();
$final_content=array();
$final_total_content=array();
while(! feof($fd))
  			{
  				array_push($file_content,fgetcsv($fd));
  				
  			}
fclose($fd);
$dts='';
	$ij= 1;$ik=count($file_content)-1;
	foreach ($file_content as $key => $value) 
	{
	if($ij==$ik)
	   break;
	array_push($files, $value);
	$ij++;
	}
    for($i=0;$i<count($files);$i++)
     {
     	 if (!preg_match("/(^(02)(.)*)/",$files[$i][6])) 
     	 {
     	 	 $final_content[0]=getStartingHours($files[$i][3]);
     		 $final_content[1]=UD_Speed($files[$i][7],$files[$i][4]);
     		 $final_content[2]=UD_Speed($files[$i][8],$files[$i][4]);
     	 	 $final_content[3]=getOutputClass($files[$i][10]);
     	 	 //data to store
     	 	 $dts.=$final_content[0] .",".$final_content[1].",".$final_content[2].",".$final_content[3].PHP_EOL;
     	 	 	
     	 }
     }
     		touch("logoff_processed_data/".$_GET["u"]);	
     		file_put_contents("logoff_processed_data/".$_GET["u"], $dts);
	}
}
 
function getOutputClass($str)
{
	$classID= 0;
	if ($str=="Idle-Timeout") {
		$classID= 0;
	}
	else if ($str=="User-Error") {
		$classID= 1;
	}
	else if ($str=="User-Request") {
		$classID= 2;
	}
	return $classID;
}

function getStartingHours($str)
{
	//$dt = DateTime::createFromFormat("d-m-Y H:i", "9-21-2016 12:35");
	$dt = DateTime::createFromFormat("Y-m-d H:i:s",$str);
	$hours = floatval($dt->format('H'));
	$min = floatval($dt->format('i'))/60;
	return($hours+$min); 
}
function UD_Speed($amout,$duration)
{
	$dt = DateTime::createFromFormat("d:h:i:s", "00:03:09:56");	
	$hours =floatval($dt->format('H'));
	$min =  floatval($dt->format('i'));
	$sec =  floatval($dt->format('s'));
	$days =  floatval($dt->format('d'));
	$Totalhours=((24*$days)+$hours+($min/60)+($sec/3600));
	$amout=str_replace("MB", "", $amout);
	$amout=str_replace("KB", "", $amout);
	$amout=str_replace("GB", "", $amout);
	$amout=str_replace("K", "",  $amout);
	$amout=floatval($amout);
	return($amout/$Totalhours);
}                                                    
?>