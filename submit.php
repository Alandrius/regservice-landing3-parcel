<?php
/* Емэйл, куда отправляются письма */
$emailAddress = 'info@regservis.com';
//$emailAddress = 'alex.shokotko@gmail.com';
$emailAddress2 = '9796979@mail.ru';
$emailAddress3 = 'kuznecovajuli@ya.ru';
/* config end */
require "phpmailer/class.phpmailer.php";
if (!empty($_POST['dataform'])) {$dataform = $_POST['dataform'];}
if (!empty($_POST['formname'])) {$formname = clearVar($_POST['formname']);}


$err = array();

if(!empty($err))
{
	header('Content-Type: text/html; charset=utf-8');
	echo $err;
	exit;
}


$msg='С сайта отправлена заявка<br />';
$msg.='Из формы "' . $formname . '"<br />';
foreach ($dataform as $key => $value) {
	$msg.=$value.'<br />';
}

$msgsms = '';
foreach ($dataform as $key => $value) {
	$msgsms.=$value.',';
}
// include "smsc_api.php";
// //Отправка сообщения
// list($sms_id, $sms_cnt, $cost, $balance) = send_sms("74959798894", $msgsms, 0);

// $balance = get_balance();


// Тема письма
$subject = "С сайта отправлена заявка";

$mail = new PHPMailer();
$mail->IsMail();

// Емэйл который будет в "Отправителе"
$mail->AddReplyTo('info@regservis.com', $name);
$mail->AddAddress($emailAddress);
$mail->AddAddress($emailAddress2);
$mail->AddAddress($emailAddress3);
$mail->SetFrom('info@regservis.com', $name);
$mail->Subject = "=?utf-8?b?". base64_encode("3: ".$subject) ."?=";

$mail->MsgHTML($msg);

$mail->Send();
header('Content-Type: text/html; charset=utf-8');
	echo 'Сообщение отправленно';

function clearVar($var){
	return htmlspecialchars(strip_tags(stripslashes($var)));
}

function checkLen($str,$len=2)
{
	return mb_strlen(strip_tags($str),"utf-8") > $len;
}

function checkEmail($str)
{
	return preg_match("/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/", $str);
}