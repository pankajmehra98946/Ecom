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
require 'vendor/autoload.php';


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
 
        // set user property values
         
		// create the product
        $product_name=$data->product_name;	
        $product_discription=$data->product_discription;
        $product_price=$data->product_price;	
  $product_image=  $data->product_image;
        $product_quantity=$data->product_quantity;
        $product_category=$data->product_category;
        $product_subcategory=$data->product_subcategory;
        $product_nestedcategory=$data->product_nestedsubcategory;
        
         $folderPath = "upload/";
   
                    list($dataType, $imageData) = explode(';',  $product_image);

            // image file extension
            $imageExtension = explode('/', $dataType)[1];

            // base64-encoded image data
            list(, $encodedImageData) = explode(',', $imageData);


            // decode base64-encoded image data
            $decodedImageData = base64_decode($encodedImageData);
            $imagename=uniqid() .'.'.$imageExtension;
            // save image data as file
            file_put_contents($folderPath .$imagename , $decodedImageData);
             // This will output the barcode as HTML output to display in the browser
           
            // $generator = new Picqer\Barcode\BarcodeGeneratorJPG();
            // file_put_contents('barcode.jpg', $generator->getBarcode('081231723897', $generator::TYPE_CODABAR));
    //    echo $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
    //    $img = str_replace('data:image/png;base64,', '', $img);
    //    $img = str_replace(' ', '+', $img);
    //    $data = base64_decode($img)
    $product_status=1;
    $created= date('d-m-y h:i:s');
    $modified= date('d-m-y h:i:s');
    $MRP = $product_price;
    $MFGDate = strtotime($created);
    $productData = "098{$MRP}10{$MFGDate}55";
    $svgname=$productData.'.svg';
    file_put_contents('barcode/'.$productData.'.svg', (new Picqer\Barcode\BarcodeGeneratorSVG())->getBarcode($productData, Picqer\Barcode\BarcodeGeneratorSVG::TYPE_KIX));
       

        $sql = "INSERT INTO `products`(`product_name`, `product_discription`, `product_price`, `product_image`, `product_quantity`, `product_category`, `product_subcategory`, `product_nestedcategory`,`product_status`, `created`, `modified`,`barcode`) VALUES ('".$product_name."','".$product_discription."','".$product_price."','".$imagename."','".$product_quantity."','".$product_category."','".$product_subcategory."','".$product_nestedcategory."','".$product_status."','".$created."','".$modified."','".$svgname."')";

            if ($conn->query($sql) === TRUE) {
            
             // set response code
             http_response_code(200);
              
             // response in json format
             echo json_encode(
                     array(
                         "message" => "product inserted.",
                         "jwt" => $jwt
                     )
                 );






		
	
		// message if unable to update user
		}else{

            echo "Error: " . $sql . "<br>" . $conn->error;
		    // set response code
		    http_response_code(401);
		 
		    // show error message
		    echo json_encode(array("message" => "Unable to update user.",
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