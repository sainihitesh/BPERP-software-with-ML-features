<?php
if(is_file($_GET["url"]))
{
	$fd=fopen($_GET["url"],"r");
	$data=array();
	$dr=array();
	while(! feof($fd))
  			{
  				$d=fgetcsv($fd);
  				$dr["x"]=floatval($d[0]);$dr["y"]=floatval($d[1]);
  				array_push($data,$dr);
  				 
  			}
  	        $dt=json_encode($data);
  	        echo $dt;		
			fclose($fd);	
}
?>