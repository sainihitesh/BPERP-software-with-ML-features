<?php
session_start();
		if($_SESSION["u"])
		{
			session_destroy();
		}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Sending to login page....</title>
</head>
<body>
<script type="text/javascript">
	window.location.href="login.php";
</script>
</body>
</html>