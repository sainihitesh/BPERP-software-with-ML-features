<?php
function getCoords($vals)
{
		$data =array();
		$daysData =  array('name'=>null,'duration'=>null,'DateTime'=>null,'days' =>null ,'dataUsed'=>null,'' );
		$init_d = "2016-02-09 00:00:00";
		$date1 = strtotime($init_d);
		foreach ($vals as $value) 
		{
				 $date2 =strtotime($value[3]);	
				 $datediff = $date2- $date1;
    			 $daysData["name"]=$value[2];
    			 $daysData["duration"]=$value[4];
    			 $daysData["DateTime"]=$value[3];
    			 $daysData["days"]= floor($datediff/(60*60*24));
    			 $daysData["dataUsed"]=$value[8];
    			 array_push($data, $daysData); 	
		}
		return $data;
}	
function sortData($data)
{
	for ($i=0; $i <count($data) ; $i++) 
	{ 
	     solveDataUsed($data[$i]);
	}
	for ($i=0; $i <count($data)-1 ; $i++) 
	{ 
	      $ini_d =$data[$i]["days"];
	      $ini_da = $data[$i+1]["dataUsed"]; 
	      $init = $i;
	      for ($j=$init; $j <count($data)-1 ; $j++) 
	      { 
	        if ($ini_d==$data[$j+1]["days"]) 
	         {
	      	 		$data[$i]["dataUsed"]+=$data[$j+1]["dataUsed"];
	      	 		 
	         }else
	         {
	         	 
	         	break;
	         }
	      }
	}
		return $data;
}	
function sortOMore($data)
{
	$dt= array();
	for ($i=0; $i <count($data) ; $i++) 
	{ 
		 
		if(!array_key_exists(intval($data[$i]["days"]), $dt)) 
		 {
		 	 //array_push(array, var)
		 	$dt[$data[$i]["days"]] = $data[$i]["dataUsed"];
		 }
	}
	return $dt;
}
function solveDataUsed(&$value)
{
		if(preg_match("/(MB)/",$value["dataUsed"]))
		{
			$value["dataUsed"]=floatval(str_replace("MB", "",$value["dataUsed"]));
		}
		elseif (preg_match("/(GB)/",$value["dataUsed"])) 
		{
			$value["dataUsed"]=str_replace("GB", "",$value["dataUsed"]);
			$value["dataUsed"]=1024*floatval($value["dataUsed"]);
		}
		elseif (preg_match("/(B)/",$value["dataUsed"])) 
		{
			$value["dataUsed"]=str_replace("B", "",$value["dataUsed"]);
			$value["dataUsed"]=floatval($value["dataUsed"])/1024;
		}
}
function sortAddData($data)
{
	$dtat = array();
	foreach ($data as $key => $value)
	{
		$dtat[$key] = 0;
		foreach ($data as $k => $v) 
		{
			if ($k==$key) 
			 {
			 	break;
			 } 
		$dtat[$key]+= $v; 	 
		}
	}
	return $dtat;
}


?>