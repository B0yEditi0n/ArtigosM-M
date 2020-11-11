(function(){
	window.biborgFixAnimateLibrary = function(lib){
		fixLibraryGFont(lib);
	};

	function fixLibraryGFont(ilb){
		// replace faulty script in library
		lib.addElementsToCache = function (textInst, cacheList) {		
			var cur = textInst;		
			while(cur != exportRoot) {		
				if(cacheList.indexOf(cur) != -1 || cur.parent == null)		
					break;		
				cur = cur.parent;		
			}		
			if(cur != exportRoot) {	//we have found an element in the list		
				var cur2 = textInst;		
				var index = cacheList.indexOf(cur);		
				while(cur2 != cur) { //insert all it's children just before it		
					cacheList.splice(index, 0, cur2);		
					cur2 = cur2.parent;		
					index++;		
				}		
			}		
			else {	//append element and it's parents in the array
				cur = textInst;		
				while(cur != exportRoot) {		
					cacheList.push(cur);		
					cur = cur.parent;		
				}		
			}		
		};
	}
	
	window.biborgInjectLoadFonts = function(lib) {
		
		window.isFontAvailable = function(font, obj) {
			
			if(typeof font === 'string')
				font = { familly: font };
		
			var timeOut = 5000;
			var delay = 200;
			var interval = 0;
			var timeElapsed = 0;
			function checkFont() {				
				var node = document.createElement("span");				
				node.innerHTML = "giItT1WQy@!-/#";				
				node.style.position      = "absolute";				
				node.style.left          = "-1000px";				
				node.style.top           = "-1000px";				
				// Large font size makes even subtle changes obvious				
				node.style.fontSize      = "300px";				
				node.style.fontFamily    = "sans-serif";				
				node.style.fontVariant   = font.variant || "normal";				
				node.style.fontStyle     = font.style || "normal";				
				node.style.fontWeight    = font.weight || "normal";
				node.style.letterSpacing = "0";				
				document.body.appendChild(node);				
				var width = node.offsetWidth;				
				node.style.fontFamily = font.familly;
				// Compare current width with original width				
				var returnVal = false;				
				if((node && node.offsetWidth != width) || timeElapsed >=timeOut) {
					console.log(node.offsetWidth, width, "we have loaded", font);
					obj.loadedFonts++;
					if(interval)
						clearInterval(interval);
					obj.callOnLoad(font, obj.totalFonts);				
					returnVal = true;
				}
				if(node) {
					node.parentNode.removeChild(node);				
					node = null;				
				}				
				timeElapsed += delay;				
				return returnVal;				
			}
			if(!checkFont()) {				
				interval = setInterval(checkFont, delay);				
			}
		};
		
		window.LoadFonts = function(families, callback) {
			var fontsLoaderObject = {type: "Web", loadedFonts: 0, totalFonts: families.length };
			fontsLoaderObject.callOnLoad = function(){
				if(fontsLoaderObject.loadedFonts == fontsLoaderObject.totalFonts && callback)
					callback();
			};
			console.log("loading fonts", families);
			for(var i =0; i < families.length; i++)
				isFontAvailable(families[i], fontsLoaderObject);
		};
		
	}
	
	
	window.biborgFixCreateJS = function(){
		
	};
	
}());