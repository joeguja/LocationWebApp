<?php
	//Check if the locations.xml file exists, if it does encode it to JSON for the app
	if (file_exists('locations.xml')) {
    	$xml = simplexml_load_file('locations.xml');
    	$json = json_encode($xml);
    	print_r($json);
	} else {
    	exit('Failed to open locations.xml.');
	}
?>