<?php
  $challengeSolutions = array(
    array('na', 'pigpen.html'),
    array('cipher', 'caeser.html'),
    array('gwpitfloewitphagt', 'polybius.html'),
    array('polybius', 'morse.html'),
    array('whathathgodwrought', 'otp.html'),
    array('philanthropy', 'vigenere.html'),
    array('sundowner', 'playfair.html'),
    array('zanzibarland', 'base64.html'),
    array('emmerich', 'coordinates.html'),
    array('phoenix', 'tapcode.html'),
    array('ocelot', 'enigma.html'),
    array('patriot', 'solitaire.html'),
    array('outerheaven', 'final.html'),
    array('ovaltine', 'realfinal.html'),
  );

  // get the q parameter from URL
  $passwordAttempt = strtolower(preg_replace('/\s/', '', base64_decode($_REQUEST["pass"])));
  $currentChallengeNum = $_REQUEST["current"];

  $currentChallenge = $challengeSolutions[$currentChallengeNum];
  if($currentChallengeNum ==  0 || $passwordAttempt == $currentChallenge[0]) {
    echo '{"challengeNumber": ' . ($currentChallengeNum + 1) . ', "challengeHtml":' . json_encode(file_get_contents('kryptohtml/' . $currentChallenge[1])) . '}';
  }
  else {
    echo 'bad';
  }
?>
