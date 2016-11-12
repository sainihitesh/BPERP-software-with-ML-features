<?php
exec("octave-gui perform.m 2>&1", $output, $return_var);
var_dump($output);
?>