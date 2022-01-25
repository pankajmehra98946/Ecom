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
include_once 'config/dbconfig.php';
// get posted data
$dataa = json_decode(file_get_contents("php://input"));
  

        if($_POST['tokenId']) {
            require_once('vendor/autoload.php');
            //stripe secret key or revoke key
            $stripeSecret = 'sk_test_51K9YM1IVjnoXHCP63gXV3Zw0yrkvzjDeJcJzfQFnB434HqB6d2p4VWCVVcPe8300NfI79zREcdIPvJ73hwBwQcTr00VXCCYLEx';
            // See your keys here: https://dashboard.stripe.com/account/apikeys
            \Stripe\Stripe::setApiKey($stripeSecret);
            // Get the payment token ID submitted by the form:
            $token = $_POST['tokenId']['id'];
            $totalamount=$_POST['amount']*100;
            // Charge the user's card:
            $charge = \Stripe\Charge::create(array(
            "amount" => $totalamount,
            "currency" => "usd",
            "description" => "stripe integration in PHP ",
            "source" => $token,
            ));
            // after successfull payment, you can store payment related information into your database
            $data = array('success' => true, 'data'=> $charge);
            $amount=($charge->amount)/100;
            $userid= $_POST['user_id'];
            $totalitems=1;
            $txn_id=$charge->balance_transaction;
            $payment_status=$charge->status;
            $created_at=date('d-m-y h:i:s');
            $itemprice=$amount;
            $currency=$charge->currency;

                    $sql = "INSERT INTO `orders`(  `user_id`, `item_numbers`, `txn_id`, `payment_status`, `created_at`, `item_price`, `currency`) VALUES ('".$userid."','".$totalitems."','".$txn_id."','". $payment_status."','".$created_at."','".$itemprice."','".$currency."')";

                    if ($conn->query($sql) === TRUE) {
                        
                                     $orderid = mysqli_insert_id($conn);

                                     $dataa=$_POST['product_ids'];
                                     $arr=explode(",",$dataa);
                                     $quantity=$_POST['quantity'];
                                        $quantitytotal=explode(",",$quantity);
                                        $i=0;
                                    foreach($arr as $value){  
                                        
                                        $remains=$_POST['product_remains'];
                                        $remainsarray=explode(",",$remains);
                                       
                                        foreach($remainsarray as $product_quantity){
                                        $sqlll = "UPDATE `products` SET `id`=$value,`product_quantity`=$product_quantity WHERE id=$value";

                                         if (mysqli_query($conn, $sqlll) > 0) {
                                          //  echo "updated successfully";
                                         }else {
                                            echo "Error: " . $sqlll . "<br>" . $conn->error;
                                            }
                                            

                                         }
                                      
                                       

                                    // insert into order details table
                                    $sqll = "INSERT INTO `order_details`(`product_id`, `order_id`,`user_id`,`quantity`) VALUES ('".$value."','".$orderid ."' ,'".$userid ."','".$quantitytotal[$i++] ."')";

                                            if ($conn->query($sqll) === TRUE) {
                                                
                                         //   echo "New record created successfully";
                                            } else {
                                            echo "Error: " . $sqll . "<br>" . $conn->error;
                                            }

                                        
                                            
                                    }
                       

                   // echo "New record created successfully";
                    echo json_encode(array("message" => "done."));
                    } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                    }
            


        }

?>