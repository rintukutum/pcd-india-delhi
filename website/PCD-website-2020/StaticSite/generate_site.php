<?php
$root_path="http://localhost/~mikecj/PCD2020/Git/pcd-delhi/website/PCD-website-2020/CMS/";
$content_path="/Users/mikecj/Sites/PCD2020/Git/pcd-delhi/website/PCD-website-2020/CMS/";
$static_path="./public/";

// Copy index files
copy($root_path, $static_path."index.html");
copy($root_path."?/about/", $static_path."about.html");
copy($root_path."?/tickets/", $static_path."tickets.html");
copy($root_path."?/opencall/", $static_path."opencall.html");
copy($root_path."?/contact-me/", $static_path."contact-us.html");

// Copy css file
copy($root_path."/public/docs/css/screen.css", $static_path."screen.css");

// Copy js files
$js_files=array("gallery.js", "init-gallery.js", "jquery-1.3.2.js", "opSketch.js");
for ($x = 0; $x < count($js_files); $x++) {
	copy($root_path."/public/docs/js/".$js_files[$x],$static_path.$js_files[$x]);
}

// Fix relative links with html files
$files = array("index.html", "about.html", "tickets.html", "opencall.html", "contact-us.html");
for ($x = 0; $x < count($files); $x++) {
  $file_to_mod = $static_path.$files[$x];
	//
	$file_contents = file_get_contents($file_to_mod);
	// HTML files
	$file_contents = str_replace("./?/about/","about.html",$file_contents);
	$file_contents = str_replace("./?/tickets/","tickets.html",$file_contents);
	$file_contents = str_replace("./?/opencall/","opencall.html",$file_contents);
	$file_contents = str_replace("./?/contact-me/","contact-us.html",$file_contents);
	// CSS file
	$file_contents = str_replace(".//public/docs/css/screen.css","screen.css",$file_contents);
	// JS files
	for($y = 0; $y < count($js_files); $y++){
		$file_contents = str_replace(".//public/docs/js/".$js_files[$y],$js_files[$y],$file_contents);
	}
    // Images and Fonts
    $file_contents = str_replace("public/fonts/","fonts/",$file_contents);
    $file_contents = str_replace(".//public/images/","images/",$file_contents);

	//
	file_put_contents($file_to_mod,$file_contents);
}

echo "Completed.\n";



// Copy content and public
custom_copy($content_path."content/", $static_path."content/");
custom_copy($content_path."public/", $static_path);

function custom_copy($src, $dst) {

    // open the source directory
    $dir = opendir($src);

    // Make the destination directory if not exist
    @mkdir($dst);

    // Loop through the files in source directory
    while( $file = readdir($dir) ) {

        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) )
            {

                // Recursively calling custom copy function
                // for sub directory
                custom_copy($src . '/' . $file, $dst . '/' . $file);

            }
            else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }

    closedir($dir);
}

?>
