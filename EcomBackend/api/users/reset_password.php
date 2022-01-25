<?php
// required headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
 
// required to encode json web token
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// files needed to connect to database
include_once '../config/dbconfig.php';


 
$data = json_decode(file_get_contents("php://input"));
 

   
    try {
 
        
        // set user property values   
        
       
            $sql = "SELECT * FROM `users` where email= '$data->email'";

       

         $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
        
            $dataa= mysqli_fetch_assoc($result);
            $str = rand();
            $token = hash("sha256", $str);
            $id=$dataa['id'];
            $sqlup = "UPDATE `users` SET `id`=$id,`reset`='$token' WHERE id=$id";

        
            if (mysqli_query($conn, $sqlup) > 0) {
                $url ="http://localhost:4200/changepassword/".$token;
             

                //    mail("pankajmehra98946@gmail.com","My subject",$url);
                  
                $urllink  =  'reset password link: '+$url;
                $data = array(
                    'from'=> "Mailgun Sandbox <postmaster@sandbox891b25f1406d40ca9ca2bd7bcece79e6.mailgun.org>",
                    "subscribed"  => "True",
                    "to" => $data->email,
                    "name" => "Bob Bar",
                    "subject" =>'Mailgun test',
                    // "text"=>'Testing some Mailgun awesomeness!',
                    'text' => $url
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
                
        
        
                
                     // set response code
                     http_response_code(200);
                      
                     // response in json format
                     echo json_encode(
                             array(
                                 "status" => "success.",
                                
                             )
                         );
            
            }else{

                echo "Error: " . $sqlup . "<br>" . $conn->error;
                // set response code
                http_response_code(401);
             
                // show error message
                echo json_encode(array("message" => "Unable to show.",
                "error" =>$conn->error));
            }
          

		// message if unable to update user
		}else{

            echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "Unable to show.",
            "error" =>$conn->error));
		}
    }
 
    // if decode fails, it means jwt is invalid
	catch (Exception $e){
	 
	    // set response code
	    http_response_code(401);
	 
	    // show error message
	    echo json_encode(array(
	        "message" => "Access denied.",
	        "error" => $e->getMessage()
	    ));
	}





?>