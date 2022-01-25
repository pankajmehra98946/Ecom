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
$headers = apache_request_headers();
if (isset($headers['Authorization'])) {
     $jwttt = trim($headers["Authorization"]);  
     if (preg_match('/Bearer\s(\S+)/', $jwttt, $matches)) {
       $jwtt= $matches[1];
    }  
}
// get jwt
$jwt=isset($jwtt) ? $jwtt : "";
// get posted data
$data = json_decode(file_get_contents("php://input"));

 
// if jwt is not empty
if($jwt){
 
    // if decode succeed, show user details
    try {
 
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        // set user property values        
            $id=$data->id;
            $product_name=$data->product_name;	
        $product_discription=$data->product_discription;
        $product_price=$data->product_price;	
        $product_image=  $data->product_image;
        $product_quantity=$data->product_quantity;
        $product_category=$data->product_category;
        $product_subcategory=$data->product_subcategory;
        
         $folderPath = "upload/";
   
   
         if(strlen($product_image )>=25){
            list($dataType, $imageData) = explode(';',  $product_image);

            // image file extensio
            $imageExtension = explode('/', $dataType)[1];

            // base64-encoded image data
            list(, $encodedImageData) = explode(',', $imageData);


            // decode base64-encoded image data
            $decodedImageData = base64_decode($encodedImageData);
            $imagename=uniqid() .'.'.$imageExtension;
            // save image data as file
            file_put_contents($folderPath .$imagename , $decodedImageData);   

         }else{
            $imagename=$data->product_image;
         }
                   
            $product_status=1;
            $modified= date('d-m-y h:i:s');
            $sql = "UPDATE `products` SET `id`=$id,`product_name`='$product_name',`product_discription`='$product_discription',`product_price`='$product_price',`product_image`='$imagename',`product_quantity`=$product_quantity,`product_category`=$product_category,`product_subcategory`=$product_subcategory,`product_status`=$product_status,`modified`='$modified' WHERE id=$id";

        
        if (mysqli_query($conn, $sql) > 0) {
        
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "status" => "successfully updated",                         
                     )
                 );

		// message if unable to update user
		}else{

            echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "Unable to update.",
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