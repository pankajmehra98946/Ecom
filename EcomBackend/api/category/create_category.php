<?php
// required headers
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

// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// get header data
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
     $jwttt = trim($headers["Authorization"]);  
     if (preg_match('/Bearer\s(\S+)/', $jwttt, $matches)) {
       $jwtt= $matches[1];
    }  
}
// get jwt
$jwt=isset($jwtt) ? $jwtt : "";

 
// if jwt is not empty
if($jwt){
 
    // if decode succeed, show user details
    try {
 
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
 
        // set user property values
         
		// create the product
        $parent_id=$data->parent_id;	
        $category=$data->category;
        $sql = "INSERT INTO `categories`(`parent_id`, `category`) VALUES ('".$parent_id."','".$category."')";

            if ($conn->query($sql) === TRUE) {
            

          
              
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "message" => "New category created successfully."
                        
                     )
                 );






		
	
		// message if unable to update user
		}else{

            echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "Unable to create .",
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
}

// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
?>