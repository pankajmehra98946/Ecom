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


// get posted data
$data = json_decode(file_get_contents("php://input"));

 
 
    // if decode succeed, show user details
    try {
 
            $token=$data->id;
            $sql = "SELECT * FROM `users` where reset= '$token'";

            $result = mysqli_query($conn, $sql);
   
           if (mysqli_num_rows($result) > 0) {
            $dataa= mysqli_fetch_assoc($result);
             $id=$dataa['id'];
            $password=password_hash($data->password, PASSWORD_BCRYPT);
            $modified= date('d-m-y h:i:s');
            $sqll = "UPDATE `users` SET `id`=$id,`password`='$password',`reset`=1,`modified`='$modified' WHERE id=$id";

        
                    if (mysqli_query($conn, $sqll) > 0) {
                    
                        // set response code
                        http_response_code(200);
                        
                        // response in json format
                        echo json_encode(
                                array(
                                    "status" => true,
                                    "message" => "successfully updated"                        
                                )
                            );

                    // message if unable to update user
                    }else{

                                echo "Error: " . $sqll . "<br>" . $conn->error;
                                // set response code
                                http_response_code(401);
                            
                                // show error message
                                echo json_encode(array("message" => "Unable to update.",
                                "error" =>$conn->error));
                            }

           }else{
            // echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "token expired .",
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