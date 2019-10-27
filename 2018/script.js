$(document).ready(function() {
	loadPage();
	
  loadCheckboxes();

  $('a.matchlink').click(function(event) {
    clickMatch();
    scrollToLocation(event, 'a[name="matchanchor"]');
  });

  $('a.grinchrelieflink').click(function(event) {
    clickGrinchRelief();
    scrollToLocation(event, 'a[name="grinchreliefanchor"]');
  });

  $('a.rafflelink').click(function(event) {
    clickRaffle();
    scrollToLocation(event, 'a[name="raffleanchor"]');
  });

  $('a.joinuplink').click(function(event) {
    clickJoinUp();
    scrollToLocation(event, 'a[name="joinupanchor"]');
  });

  $('a.contactlink').click(function(event) {
    clickContact();
    scrollToLocation(event, 'a[name="contactanchor"]');
  });

  $('a.lastsleighlink').click(function(event) {
    clickMatch();
    scrollToLocation(event, 'a[name="lastsleighanchor"]');
  });

  $('a.giftdeadlinelink').click(function(event) {
    clickMatch();
    scrollToLocation(event, 'a[name="giftdeadlineanchor"]');
  });

  $('a.schedulelink').click(function(event) {
    clickBattlePlan();
    scrollToLocation(event, 'a[name="scheduleanchor"]');
  });

  $('a.raffleticketlink').click(function(event) {
    clickRaffle();
    scrollToLocation(event, 'a[name="raffleticketanchor"]');
  });

  $('li.kryptotab a.nav-link').click(function(event) {
    event.preventDefault();
    window.location = '/krypto/krypto.php';
  });

  $('input[type="checkbox"]').change(function() {
    var checkboxValues = {};
    $('input[type="checkbox"]').each(function() {
      checkboxValues[$(this).prop('id')] = $(this).prop('checked');

      Cookies.set('sekretSantaBattlePlanCheckboxes', checkboxValues, { expires: 90 });
    });
  });
});

var clickBattlePlan = function() {
  $('li.battleplantab a').trigger('click');
}

var clickFAQ = function() {
  $('li.faqtab a').trigger('click');
}

var clickMatch = function() {
  $('li.matchtab a').trigger('click');
}

var clickGrinchRelief = function() {
  $('li.grinchrelieftab a').trigger('click');
}

var clickRaffle = function() {
  $('li.raffletab a').trigger('click');
}

var clickJoinUp = function() {
  $('li.joinuptab a').trigger('click');
}

var clickContact = function() {
  $('li.contacttab a').trigger('click');
}

var scrollToLocation = function(event, locString) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: ($(locString).offset().top)
  }, 500);
}

var loadCheckboxes = function() {
  var cookieJSON = Cookies.get('sekretSantaBattlePlanCheckboxes');
  if(cookieJSON) {
    cookie = JSON.parse(cookieJSON);
    $('input[type="checkbox"]').each(function() {
      $(this).prop('checked', cookie[$(this).prop('id')]);
    });
  }
}

var loadPage = function() {
	var urlParam = getUrlParameter('tab');
	console.log(urlParam);
	
	if(urlParam == 'battleplan') {
		clickBattlePlan();
	}

	if(urlParam == 'faq') {
		clickFAQ();
	}

	if(urlParam == 'match') {
		clickMatch();
	}

	if(urlParam == 'grinchrelief') {
		clickGrinchRelief();
	}

	if(urlParam == 'raffle') {
		clickRaffle();
	}

	if(urlParam == 'joinup') {
		clickJoinUp();
	}

	if(urlParam == 'contact') {
		clickContact();
	}
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
