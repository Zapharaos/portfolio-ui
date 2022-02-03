<?php
        if(isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] == "https://www.matthieu-freitag.com"){
            if($_SERVER['REQUEST_METHOD'] == 'POST') {
                if(isset($_REQUEST['spam']) && empty($_REQUEST['spam'])){
                    if( isset($_REQUEST['name']) && !empty($_REQUEST['name']) &&
                        isset($_REQUEST['email']) && !empty($_REQUEST['email']) &&
                        isset($_REQUEST['subject']) && !empty($_REQUEST['subject']) &&
                        isset($_REQUEST['message']) && !empty($_REQUEST['message'])
                    ){

                        $name = htmlspecialchars($_REQUEST["name"]);
                        $email =  htmlspecialchars($_REQUEST["email"]);
                        $subject = htmlspecialchars($_REQUEST["subject"]);
                        $message = htmlspecialchars($_REQUEST["message"]);

                        /* if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                            echo 0;
                        } */

                        $to = "contact@matthieu-freitag.com";
                        $headers = [
                            "From" => "no-reply@matthieu-freitag.com",
                            "Reply-To" => $email
                        ];

                        $body = "Name : " . $name . "\r\n";
                        $body = $body . "Reply-To : " . $email . "\r\n\n";
                        $body = $body . "Subject : " . $subject . "\r\n\n";
                        $body = $body . "Message : " . $message . "\r\n";

                        $send_email = mail($to, $subject, $body, $headers);
                        echo ($send_email) ? 1 : 0;
                    }
                    else { echo 0; }
                }
            }
        }
?>
