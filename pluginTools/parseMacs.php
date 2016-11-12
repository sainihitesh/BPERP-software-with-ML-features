<?php
$con=$_GET["u"];
$fd=fopen("api/history/".$con,"r");	
$file_content[$con]=array(); $f_content=array();
$template=file_get_contents("api/template");
$data=file_get_contents("api/history/".$con);
if ($template!=$data) 
{
	while(! feof($fd))
  			{
  				$fcv=fgetcsv($fd);
  				array_push($file_content[$con],$fcv);
  				var_dump($fcv);
  				echo "<br>";
  					
  			}
			fclose($fd);
			foreach ($file_content as $key => $value) 
					{
	       				foreach ($value as $keys => $values) 
	       				{
	       	 				array_push($f_content, $values); 	 
	       				}
					}
	 if ($f_content[count($f_content)-2][10]=='') 
     {
	  			$name=$f_content[count($f_content)-2][1];
	 			$Mobile=$f_content[count($f_content)-2][2];
	 			$startTime=$f_content[count($f_content)-2][3];
	 			$duration=$f_content[count($f_content)-2][4];
	 			$ipAdress=$f_content[count($f_content)-2][5];
	 			$Mac=$f_content[count($f_content)-2][6];
	 			$upload=$f_content[count($f_content)-2][7];
	 			$downloads=$f_content[count($f_content)-2][8];
	 			$total=$f_content[count($f_content)-2][9];
	 			$reasonLogOff=$f_content[count($f_content)-2][10];
	 	$dat= "{\"name\":\"$name\",\"Mobile\":\"$Mobile\",\"startTime\":\"$startTime\",\"duration\":\"$duration\",\"ipAddress\":\"$ipAdress\",\"Mac\":\"$Mac\",\"upload\":\"$upload\",\"downloads\":\"$downloads\",\"total\":\"$total\",\"reasonLogOff\":\"$reasonLogOff\",\"fakeMac\":\"yes\"}";
	 	echo $dat;
	 	file_put_contents("api/processed/".$con, $dat);

	  
	}
}

?>