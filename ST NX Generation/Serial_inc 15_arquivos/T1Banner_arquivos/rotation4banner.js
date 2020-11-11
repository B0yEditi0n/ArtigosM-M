
thisAd = 1
thisAdauto = 1
imgCt = 5
counter = 0;

function start()
{
	disableall();
	 rotate();
}

function rotate() {
    if (document.images) {
        thisAdauto++
        if (thisAdauto == imgCt) {
            thisAdauto = 1
            counter = 1;
        }

        displaybanner(thisAdauto);
        if (counter == 0) {
            setTimeout("rotate()", 3 * 900)
        }
        else if (getParameterByName("rt") == 100) {
            alert(getParameterByName("rt"));
            thisAdauto = 1
            counter = 0;
            setTimeout("rotate()", 3 * 900)
        }

    }
}
function rotateFront() {
    if (document.images) {
        thisAd = thisAd + 1;
        if (thisAd == imgCt) {
            thisAd = 1
        }
        if (thisAd >= 5) {
            thisAd = 1;
        }
        displaybanner(thisAd);

    }
}
function rotateback() {
    if (thisAd == 1) {
        thisAd = thisAd + 3;
    }
    else if (thisAd <= 4) {
        thisAd = thisAd - 1;
    }
    else {
        thisAd = thisAd - 1;
    }
    displaybanner(thisAd);
}

if (getParameterByName("rt") != 101) {
    window.onload =  setTimeout("start()", 5 * 900)
}
function rotatebanner(bannername) {
	zxcFade("d1", 50, 0);
    zxcFade("d2", 50, 0);
    zxcFade("d3", 50, 0);
    zxcFade("d4", 50, 0);
	disableall();
	activateOne(bannername);
    //thisAd = 1;
}
function displaybanner(Activad) {
	 zxcFade("d1", 50, 0);
    zxcFade("d2", 50, 0);
    zxcFade("d3", 50, 0);
    zxcFade("d4", 50, 0);
	disableall();
	activateOne(Activad);
	//thisAd = 1;
}
function disableall()
{
	document.getElementById("d1").style.display = "none";
    document.getElementById("d2").style.display = "none";
    document.getElementById("d3").style.display = "none";
    document.getElementById("d4").style.display = "none";

    document.getElementById("d1").className = "inactive";
    document.getElementById("d2").className = "inactive";
    document.getElementById("d3").className = "inactive";
    document.getElementById("d4").className = "inactive";
	
	document.getElementById("d1").style.opacity = "0";
    document.getElementById("d2").style.opacity = "0";
    document.getElementById("d3").style.opacity = "0";
    document.getElementById("d4").style.opacity = "0";
}
function activateOne(Activad)
{
	var sid = "d" + Activad;
    document.getElementById(sid).style.display = "block";   
    document.getElementById(sid).className = "active";	
	 zxcFade(sid, 100, 1000);
	 
}
function getParameterByName(name) {
    var rurl = "";
    if (document.getElementById("adRet") == null)
        rurl = window.location;
    else
        rurl = document.getElementById("adRet").getAttribute('src');

    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(rurl);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}


function zxcFade(id, t, ms) {
    var obj = document.getElementById(id), o = zxcFade['zxc' + id], f;
    if (obj && !o) {
        o = zxcFade['zxc' + id] = {};
    }
    if (o) {
        clearTimeout(o.dly);
        f = o.now || 0;
        t = typeof (t) == 'number' && t >= 0 && t <= 100 ? t : 0;
        animate(o, obj, f, t, new Date(), (ms || 1000) * Math.abs(f - t) / 100 + 5);
    }
}

function animate(o, obj, f, t, srt, mS) {
    var oop = this, ms = new Date().getTime() - srt, now = (t - f) / mS * ms + f;
    if (isFinite(now)) {
        obj.style.filter = 'alpha(opacity=' + now + ')';
        obj.style.opacity = obj.style.MozOpacity = obj.style.WebkitOpacity = obj.style.KhtmlOpacity = now / 100 - .001;
        o.now = now;
    }
    if (ms < mS) {
        o.dly = setTimeout(function () { animate(o, obj, f, t, srt, mS); }, 10);
    }
	else
	{
		if (t > 50)
		{obj.style.opacity = 1;}
	}
}


// End hide script from old browsers -->
