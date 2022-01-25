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
// get jwt

 
// if jwt is not empty
if($jwt){
 
 
    try {

		// create the product
            $coupon_name=$data->coupon_name;	
             $coupon_code=$data->coupon_code;
            $coupon_value=$data->coupon_value;
            $coupon_start=$data->coupon_start;;
            $coupon_end=$data->coupon_end;;
            $coupon_limit=$data->coupon_limit;
    
            $coupon_status=$data->coupon_status;

            $sql = "INSERT INTO `coupon`( `coupon_name`, `coupon_code`, `coupon_value`, `coupon_start`, `coupon_end`, `coupon_limit`, `coupon_status`) VALUES 
            ('".$coupon_name."','".$coupon_code."','".$coupon_value."','".$coupon_start."','".$coupon_end."','".$coupon_limit."','".$coupon_status."')";

            if ($conn->query($sql) === TRUE) {
            
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "message" => "coupon created..",
                         "status" => true
                     )
                 );

		}else{

		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array(
                "message" => "Unable to create coupon.",
                "error" =>$conn->error,
                "status" => true
            ));
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

else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
?>