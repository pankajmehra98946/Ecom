<?php
// required headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
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

    // if decode succeed, show user details
    try {
 
       
        // set user property values   
        
        if(isset($_GET['code'])){
            $code=$_GET['code'];
            $sql = "SELECT * FROM `coupon` where coupon_code= '$code'";

        }elseif(isset($_GET['id'])){
            $id=$_GET['id'];
            $sql = "SELECT * FROM `coupon` where id= '$id'";

        }

        else{
            $sql = "SELECT * FROM `coupon`";
        }

         $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
        
            $data= mysqli_fetch_all($result, MYSQLI_ASSOC);
 
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "status" => true,
                         "data" => $data
                     )
                 );

		// message if unable to update user
		}else{

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