<?php 
// define('MAILGUN_URL', 'https://api.mailgun.net/v3/sandbox891b25f1406d40ca9ca2bd7bcece79e6.mailgun.org/messages');
// define('MAILGUN_KEY', 'a4e8d5fd6d799e48709de084af135c00-1831c31e-5bc6e255'); 

// $mailfrom="Mailgun Sandbox <postmaster@sandbox891b25f1406d40ca9ca2bd7bcece79e6.mailgun.org>";
// $subject="asd";

// sendmailbymailgun();

// function sendmailbymailgun($to,$toname,$mailfromname,$mailfrom,$subject,$html,$text,$tag,$replyto){
//     $array_data = array(
// 		'from'=> $mailfromname .'<'.$mailfrom.'>',
// 		'to'=>$toname.'<'.$to.'>',
// 		'subject'=>$subject,
// 		'html'=>$html,
// 		'text'=>$text,
// 		'o:tracking'=>'yes',
// 		'o:tracking-clicks'=>'yes',
// 		'o:tracking-opens'=>'yes',
// 		'o:tag'=>$tag,
// 		'h:Reply-To'=>$replyto
//     );

//     $session = curl_init(MAILGUN_URL.'/messages');
//     curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
//   	curl_setopt($session, CURLOPT_USERPWD, 'api:'.MAILGUN_KEY);
//     curl_setopt($session, CURLOPT_POST, true);
//     curl_setopt($session, CURLOPT_POSTFIELDS, $array_data);
//     curl_setopt($session, CURLOPT_HEADER, false);
//     curl_setopt($session, CURLOPT_ENCODING, 'UTF-8');
//     curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
//     $response = curl_exec($session);
//     curl_close($session);
//     $results = json_decode($response, true);
//     return $results;
// }
$html  = file_get_contents('my_template.html');
$data = array(
    'from'=> "Mailgun Sandbox <postmaster@sandbox891b25f1406d40ca9ca2bd7bcece79e6.mailgun.org>",
    "subscribed"  => "True",
    "to" => "pankajmehra98946@gmail.com",
    "name" => "Bob Bar",
    "subject" =>'Mailgun test',
    // "text"=>'Testing some Mailgun awesomeness!',
    'html' => $html
  );
  
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, 'https://api.mailgun.net/v3/sandbox891b25f1406d40ca9ca2bd7bcece79e6.mailgun.org/messages');
  curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  curl_setopt($curl, CURLOPT_USERPWD, "api:a4e8d5fd6d799e48709de084af135c00-1831c31e-5bc6e255");
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_POST, true); 
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  
  $result = curl_exec($curl);
  curl_close($curl);
  print_r($result);

?>