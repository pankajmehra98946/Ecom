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
//     $image=json_decode(json_encode($data->product_image), true);
// print_r($image[0]); die();
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
 
    // if decode succeed, show user details
    try {
 
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
 
                    
                  $product_id=$data->product_id;
                   $user_id=$data->user_id;
                    $rating=$data->rating;
                    $status=1;
                    $created= date('d-m-y h:i:s');
                    $feedback=$data->feedback;
                  
       $sqll="SELECT * FROM `reviews` WHERE `user_id`=$user_id and `product_id`=$product_id";
       $result = mysqli_query($conn, $sqll);

if (mysqli_num_rows($result) > 0) {
     
            
        // set response code
    http_response_code(401);
 
    // show error message
    echo json_encode(array("message" => "already added.",
    "status"=>false,
    "error" =>$conn->error));

   // message if unable to update user
   }else{

    $sqluser="SELECT * FROM `users` WHERE `id`=$user_id ";
    $resultuser = mysqli_query($conn, $sqluser);

if (mysqli_num_rows($resultuser) > 0) {

    $dataa=  mysqli_fetch_assoc( $resultuser );
    $user_name=$dataa['firstname'];


}

    $sql = "INSERT INTO `reviews`(`product_id`, `user_id`, `rating`, `status`, `created_at`, `feedback`,`user_name`) VALUES ('".$product_id."','".$user_id."','". $rating."','".$status."','".$created."','".$feedback."','".$user_name."')";


if (mysqli_query($conn, $sql)) {
    
     // set response code
     http_response_code(200);
      
     // response in json format
     echo json_encode(
             array(
                 "message" => "review inserted.",
                 "status" => true
             )
         );

// message if unable to update user
}else{

  
    // set response code
    http_response_code(401);
 
    // show error message
    echo json_encode(array("message" => "Unable to update user.",
    "status"=>false,
    "error" =>$conn->error));
}      


   
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