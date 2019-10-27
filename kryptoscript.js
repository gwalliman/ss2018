var currentChallenge = 0;

function loadFirstChallenge() {
  var existingCookie = getKryptoCookie();

  if(existingCookie.length == 0) {
    loadChallengeHtml(0, 'na');
  }
  else {
    var currentChallengeCookie = getCurrentChallengeCookie(existingCookie);
    loadChallengeHtml(currentChallengeCookie.currentChallenge, currentChallengeCookie.password);
  }
}

function loadChallenge() {
  $('#badresponse').hide();

  var password = $('input#passwordinput').val();

  if(!password && currentChallenge > 0) {
    return;
  }

  loadChallengeHtml(currentChallenge, password);
}

function loadChallengeHtml(currentChallengeVar, password) {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText == 'bad') {
        $('#badresponse').show();
      }
      else {
        var responseText = this.responseText;
        $('#kryptochallengewrapper').fadeOut(250, function() {
          $('#kryptospinner').fadeIn();
        });

        $('input#passwordinput').val('');

        setTimeout(function() {

          var response = JSON.parse(responseText);
          currentChallenge = response.challengeNumber;

          document.getElementById("kryptochallengewrapper").innerHTML = response.challengeHtml;
          setKryptoCookie(currentChallengeVar, password);

          $('#kryptospinner').fadeOut(250, function() {
            loadKryptoMenu();
            $('#kryptochallengewrapper').fadeIn(250, function() {
              puzzlescript();
            });
          });

        }, 500);
      }
    }
  };

  xmlhttp.open("GET", "kryptochecker.php?pass=" + btoa(password) + "&current=" + currentChallengeVar, true);
  xmlhttp.send();
}

function getKryptoCookie() {
  var cookie = Cookies.get('sekretSanta2018KryptoChallenge');
  if(cookie == null) {
    return [];
  }
  else {
    return JSON.parse(cookie);
  }
}

function getCurrentChallengeCookie(existingCookie) {
  var greatestChallenge = existingCookie[0];
  for(var x = 1; x < existingCookie.length; x++) {
    if(existingCookie[x].currentChallenge > greatestChallenge.currentChallenge) {
      greatestChallenge = existingCookie[x];
    }
  }

  return greatestChallenge;
}

function setKryptoCookie(currentChallenge, password) {
  var existingCookie = getKryptoCookie();

  if(existingCookie.length == 0) {
    existingCookie = [{'currentChallenge': currentChallenge, 'password':password}];
  }
  else {
    var foundChallenge = false;

    for(var x = 0; x < existingCookie.length; x++) {
      if(existingCookie[x].currentChallenge == currentChallenge) {
        foundChallenge = true;
      }
    }

    if(!foundChallenge) {
      existingCookie.push({'currentChallenge': currentChallenge, 'password':password});
    }
  }

  Cookies.set('sekretSanta2018KryptoChallenge', existingCookie, { expires: 90 });
}

function puzzlescript() {
  $('div.hint').hover(function() {
    $(this).removeClass('hidden');
  }, function() {
    $(this).addClass('hidden');
  });

  var countdown = new Countdown({
    selector: "div.ciphertext .countdown",
    msgPattern: "{days}:{hours}:{minutes}:{seconds}",
    dateStart: new Date(),
    dateEnd: new Date('December 20, 2018 00:00'),
    leadingZeros: true,
    onStart: function() {
    }
  });
}

function loadKryptoMenu() {
  var existingCookie = getKryptoCookie();
  var cookieList = [];

  for(var x = 0; x < existingCookie.length; x++) {
    var currentCookieIteration = existingCookie[x];
    cookieList[currentCookieIteration.currentChallenge] = currentCookieIteration;
  }

  $('div#kryptomenuwrapper ul').html('');
  for(var y = 0; y < cookieList.length; y++) {
    var menuItem = cookieList[y];
    $('div#kryptomenuwrapper ul').append('<li data-val=' + menuItem.currentChallenge + '>' + (menuItem.currentChallenge + 1) + '</li>');
  }

  $('div#kryptomenuwrapper ul li').each(function() {
    $(this).click(function() {
      var challengeNumber = $(this).attr('data-val');
      var existingCookie = getKryptoCookie();
      for(var z = 0; z < existingCookie.length; z++) {
        if(existingCookie[z].currentChallenge == challengeNumber) {
          loadChallengeHtml(existingCookie[z].currentChallenge, existingCookie[z].password);
          break;
        }
      }
    });
  });
}

$(document).ready(function() {
  loadFirstChallenge();
  loadKryptoMenu();
  puzzlescript();
});

$('button#passwordbutton').click(function() {
  loadChallenge();
});

$("input#passwordinput").keyup(function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    loadChallenge();
  }
});


