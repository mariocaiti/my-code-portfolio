<?php
//get the q parameter from URL
$q=$_GET["q"];

//find out which feed was selected
switch($q) {
	case "Slashdot":
	$xml=("http://rss.slashdot.org/Slashdot/slashdot");
	break;
	case "Craigslist":
	$xml=("http://newyork.craigslist.org/jjj/index.rss");
	break;
 	case "Netflix":
 	$xml=("http://rss.netflix.com/QueueEDRSS?id=P5295295130861121214930881873538473");
 	break;
 	case "Savant":
 	$xml=("http://feeds.feedburner.com/dvdtalk");
 	break;
 	case "Mandy":
 	$xml=("http://www.mandy.com/1/feed.cfm?loc=nyc&skill=pst");
 	break;
}

$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

//get elements from "<channel>"
$channel=$xmlDoc->getElementsByTagName('channel')->item(0);
$channel_title = $channel->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
$channel_link = $channel->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
$channel_desc = $channel->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;

//output elements from "<channel>"
echo("<p><a href='" . $channel_link . "'>" . $channel_title . "</a><br />" . $channel_desc . "</p>");

//get and output "<item>" elements
$x=$xmlDoc->getElementsByTagName('item');
for ($i=0; $i<=500; $i++)
  {
  $item_title=$x->item($i)->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
  $item_link=$x->item($i)->getElementsByTagName('link')->item(0)->childNodes->item(0)->nodeValue;
  $item_desc=$x->item($i)->getElementsByTagName('description')->item(0)->childNodes->item(0)->nodeValue;

  echo ("<p><a href='" . $item_link . "'>" . $item_title . "</a><br />" . $item_desc . "</p>");// or die("<p>That's all for today...</p>");
  }
?> 				