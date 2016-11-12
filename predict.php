<?php
session_start();
/*
#: Title: 
#: Date: 
#: Author: 
#: Version: 1.0
#: Description :
#: Options:  
*/
if(!empty($_GET))
{
    if($_SESSION['u'])
    {
     if ($_GET['who'] == 'Tunechi99') 
     	{
        ?>
<!DOCTYPE html>
<html>
<head>
	<title>Data Uses Prediction</title>
	<script type="text/javascript" src="plugins/d3/d3.v4.min.js"></script>
</head>
<body>

</body>
</html>        	


?>
<?php
    	}
    else
        header("Location:login.php");
	}
}
?>