<?php										
/* 	RSS FEED ENGINE - sorting is on HTML page, but unique identifiers have to go here
	thanks to: http://digital-grief.com/programming/how-to-read-rss-feeds-with-php-and-jquery/ */
$url = "http://rss.netflix.com/QueueEDRSS?id=P5295295130861121214930881873538473";/* ID needs to be dynamically loaded */
$xml = simplexml_load_file($url);
 
$feed_title = $xml->channel->title;
$feed_description = $xml->channel->description;
$feed_link = $xml->channel->link;
 
echo "<p><h1>Mario's <a href=".$feed_link.">". $feed_title. "</a>, sorting options are being worked on.</h1></p><small>".$feed_description."</small><p>";
 
$item = $xml->channel->item;
for ($i = 0; $i < 500; $i++) {
	$new_entry = array();
	$article_title = substr($item[$i]->title, 4);	/* strip numerics off of title!	*/
	$article_description = $item[$i]->description;
	$article_link = $item[$i]->link;
	echo "<p><h3><a href=".$article_link.">". $article_title. "</a></h3></p><small>".$article_description."</small><p>";
}
function addkeyword() {
	/* this has to add keywords to the temp XML file that holds feed data, received in a post from the html file*/
}
?>					