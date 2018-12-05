<?php
  $challengeSolutions = array(
    array('na', 'pigpen.html'),
    array('cipher', 'caeser.html'),
    array('gwpitfloewitphagt', 'polybius.html'),
    array('polybius', 'morse.html'),
    array('whathathgodwrought', 'otp.html'),
    array('philanthrophy', 'standby.html'),
  );

  // get the q parameter from URL
  $passwordAttempt = $_REQUEST["pass"];
  $currentChallengeNum = $_REQUEST["current"];

  $currentChallenge = $challengeSolutions[$currentChallengeNum];
  if($currentChallengeNum ==  0 || $passwordAttempt == $currentChallenge[0]) {
    echo '{"challengeNumber": ' . ($currentChallengeNum + 1) . ', "challengeHtml":' . json_encode(file_get_contents('kryptohtml/' . $currentChallenge[1])) . '}';
  }
  else {
    echo 'bad';
  }
?>
