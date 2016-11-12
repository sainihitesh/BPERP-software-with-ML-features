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
    $out=$output[3];
    var_dump($out);
    	 $sql = "update bperp set logoff_thetas='$out' where username='$u'";
    mysqli_query($mysql,$sql);
    file_put_contents($fn, $cont);
	}
}

?>