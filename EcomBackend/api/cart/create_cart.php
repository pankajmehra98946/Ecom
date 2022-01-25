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
 
   
		// create the product
        $product_id=$data->product_id;	
        $status=1;
        $user_id=$data->user_id;
        $created_at=date('d-m-y h:i:s');
        $productquantity_id=$data->product_quantity;
        $sql = "INSERT INTO `cart`(`product_id`, `user_id`, `status`, `created_at`, `quantity`) VALUES ('".$product_id."','".$user_id."','".$status."','".$created_at."','".$productquantity_id."')";

            if ($conn->query($sql) === TRUE) {
            

           // we need to re-generate jwt because user details might be different
			$token = array(
                "iss" => $iss,
                "aud" => $aud,
                "iat" => $iat,
                "nbf" => $nbf,
                "data" => array(                  
                    "email" => $user->email
                )
             );
             $jwt = JWT::encode($token, $key);
              
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "message" => "product added in cart.",
                         "status" => true
                     )
                 );






		
	
		// message if unable to update user
		}else{

            echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "Unable to insert .",
            "error" =>$conn->error));
		}
    
 
   


?>