
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
 
// files needed to connect to database
include_once '../config/dbconfig.php';
//include_once 'objects/user.php';
 

// instantiate user object
//$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
//$user->email = $data->email;
//$email_exists = $user->emailExists();
 
// generate json web token
include_once '../config/core.php';
include_once '../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../libs/php-jwt-master/src/ExpiredException.php';
include_once '../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// select data

// Check connection

  $sql = "SELECT `admin_email`, `admin_password` FROM `admin` WHERE admin_email='$data->admin_email' and admin_password ='$data->admin_password'";
  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    // output data of each row
    // while($row = mysqli_fetch_assoc($result)) {
    //   echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    // }


// check if email exists and if password is correct
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => array(
           "email" => $data->admin_email,
          
       )
    );
 
        // set response code
        http_response_code(200);
    
            // generate jwt
            $jwt = JWT::encode($token, $key);
            echo json_encode(
                    array(
                        "status"=>true,
                        "message" => "Successful login.",
                        "token" => $jwt
                    )
                );
 
        }
        
        // login failed
        else{
        
            // set response code
            http_response_code(401);
        
            // tell the user login failed
            echo json_encode(array(
                "status"=>false,
                "message" => "Login failed.")
            );
        }




 

?>