<?php

// https://api.telegram.org/bot6881304146:AAGHrR2ulLF_FlfZKp8USSXKT5onsF1YeA0/getUpdates
$token = "6881304146:AAGHrR2ulLF_FlfZKp8USSXKT5onsF1YeA0";
$chat_id = "-4191750248";

$name = $_POST['name'];
$email = $_POST['email'];
$promote = $_POST['promote'];
$ftds = $_POST['ftds'];
$messenger = $_POST['messenger'];
$messenger__link = $_POST['messenger__link'];
$messege = $_POST['messege'];
$arr = array(
    '👤 Имя: ' => $name,
    '📧 E-mail: ' => $email,
    '🔗 Messenger: ' => $messenger__link,
    '🎙 Promotion: ' => $promote,
    '💵 Monthly FTD’s: ' => $ftds,
    '✍️ Message: ' => $messege
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
