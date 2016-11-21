<?php
include 'mysql.php';
include 'loginToken/token.php';
session_start();
/*
#: Title:
#: Date:
#: Author: "Anon" <>
#: Version: 1.0
#: Description :
#: Options:
*/
if(!empty($_GET))
{
    if($_SESSION['u']==$cred_email)
    {
    if ($_GET['who'] == 'Tunechi99')
    {
    if (is_file("api/Sorted_data/".$_GET["u"]))
    {
    $u=$_GET["u"];
    $fn='ComputeTheta.m';
    $cont=file_get_contents($fn);
    $newData=str_replace("ex1data1.txt","api/Sorted_data/".$u, $cont);
    file_put_contents($fn, $newData);
    exec("octave-gui ComputeTheta.m 2>&1", $output, $return_var);
    $out = $output[0];
    $sql = "update bperp set PerDayUseInMB=$out where username='$u'";
    mysqli_query($mysql,$sql);
    file_put_contents($fn, $cont);
    
    }
    }

    }
    else
        header("Location:login.php");
}

?>
