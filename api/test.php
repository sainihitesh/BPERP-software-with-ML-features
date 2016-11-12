<?php
require '../mysql.php';	
if (!empty($_GET["u"])) 
{
	 if(is_file("logoff_processed_data/".$_GET["u"])) 
	 {
    $u=$_GET["u"];
    $fn='ComputeLogOffReason.m';
    $cont=file_get_contents($fn);
    $newData=str_replace("ex1data1.txt","logoff_processed_data/".$u, $cont);
    file_put_contents($fn, $newData);
    exec("octave-gui ComputeLogOffReason.m", $output, $return_var);
    var_dump($output[3]);
    $out=0;
    if (preg_match("/^[[(.)*)]]$/", $out ,$match)) {
    	 $sql = "update bperp set logoff_thetas='$match' where username='$u'";
    }else{
    	 $sql = "update bperp set logoff_thetas='0' where username='$u'";
    }
    mysqli_query($mysql,$sql);
    file_put_contents($fn, $cont);
	}
}

?>