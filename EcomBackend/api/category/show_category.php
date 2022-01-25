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

// get header data

 
    // if decode succeed, show user details
    try {
  
        if(isset($_GET['id'])){
            $id=$_GET['id'];
            $sql = "SELECT * FROM `categories` where id= '$id'";

        }elseif(isset($_GET['pid'])){
            $pid=$_GET['pid'];
            $sql = "SELECT * FROM `categories` where parent_id= '$pid'";
        }
        
        else{
            $sql = "SELECT * FROM `categories`";
        }

         $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
        
            $data= mysqli_fetch_all($result, MYSQLI_ASSOC);
 
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "status" => "success.",
                         "data" => $data
                     )
                 );

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