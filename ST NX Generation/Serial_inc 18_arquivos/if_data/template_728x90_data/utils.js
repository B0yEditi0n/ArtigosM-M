var Utils = {};

Utils.SetColor = function(content, color, customBounds)
{
	var bounds = content.getBounds();
	var posX = customBounds ? customBounds.x : (bounds != null ? parseInt(bounds.x) + (bounds.x < 0 ? -1 : 1) : 0);
	var posY = customBounds ? customBounds.y : (bounds != null ? parseInt(bounds.y) + (bounds.y < 0 ? -1 : 1) : 0);
	var width = customBounds ? customBounds.width : (bounds != null ? parseInt(bounds.width) + 2 : stage.canvas.clientWidth);
	var height = customBounds ? customBounds.height : (bounds != null ? parseInt(bounds.height) + 2 : stage.canvas.clientHeight);
	content.filters = [
		new createjs.ColorFilter(0, 0, 0, 1, HexToR(color), HexToG(color), HexToB(color), 0)
	];
	content.cache(posX, posY, width, height);
}

Utils.WaitForLabel = function (sym, label, callback)
{
	if (callback == null) return;
	
	var interval = setInterval(function ()
	{
		if (sym.currentLabel == label)
		{
			clearInterval(interval);
			callback();
		}
	}, 100);
	
	return interval;
}

Utils.LoadScript = function(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
};

Utils.LoadScripts = function(urls, callback)
{
	Utils.LoadScript(urls[0], function()
	{
		var url = urls.splice(0, 1);
		if(urls.length == 0)
			callback();
		else
			Utils.LoadScripts(urls, callback);
	});
}

Utils.SetText = function(textfield, text, yOffset)
{
	var fontLib = lib.properties.dynamic.fonts;
	var fontBase = textfield.font;
	for ( var fontFrom in fontLib ) {
		var fontTo = fontLib[fontFrom];
		fontBase = fontBase.replace( fontFrom, fontTo );
	}
	textfield.font = fontBase;
    textfield.text = text;
    textfield.y += yOffset == null ? (isOnFirefox ? 1 : 0) : yOffset;
};

Utils.GetDuration = function(clip)
{
	var showPosition = 0;
	var shownPosition = 0;
	clip.labels.forEach(function(element, array, position)
	{
		if(element.label == 'show')
			showPosition = element.position;
		else if(element.label == 'shown')
			shownPosition = element.position;
	});
	
	return (shownPosition - showPosition) * 0.04;
}

function HexToR(hexColor)
{
	return parseInt((CutHex(hexColor)).substring(0, 2), 16);
}

function HexToG(hexColor)
{
	return parseInt((CutHex(hexColor)).substring(2, 4), 16);
}

function HexToB(hexColor)
{
	return parseInt((CutHex(hexColor)).substring(4, 6), 16);
}

function CutHex(hexColor)
{
	return hexColor.charAt(0) == "#" ? hexColor.substring(1, 7) : hexColor;
}

// Dependency to CSVToArray function
function CSVToArray(e,b){b=b||",";for(var f=new RegExp("(\\"+b+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+b+"\\r\\n]*))","gi"),c=[[]],a=null;a=f.exec(e);){var d=a[1];d.length&&d!==b&&c.push([]);a=a[2]?a[2].replace(RegExp('""',"g"),'"'):a[3];c[c.length-1].push(a)}return c};

	