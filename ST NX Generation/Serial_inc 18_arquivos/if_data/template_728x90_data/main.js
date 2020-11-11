//This is called before we start the createjs stage, so we can add assets in the animate library dynamically

var isSecondaryFontUsed = false;

//Need Change for each size format
var widthPictFormat = 740;
var heightPictFormat = 73;

function InjectDynamicAssets(lib, img, cjs) {

	var _dynProps = lib.properties.dynamic

	// console.log("## InjectDynamicAssets ##");

	var _dynData = airfrance.Logic.dynamizer.getDynData();
	var _locData = airfrance.Logic.dynamizer.getLocData();
	var _scenario = airfrance.Logic.dynamizer.getScenario();
	var _config = airfrance.Logic.dynamizer.getConfig();

	// console.log("# DATAS #");
	// console.log(_dynData);
	// console.log(_locData);
	// console.log(_scenario);
	// console.log(_config);

	// TODO : Check local to use default font or not

	var resultText = {};
	var datas = {
		'city' : getAirportLabel(_dynData['departureAirportCode']),
		'fare' : "",
		'date' : _dynData['untilDate']
	};

	var template = Handlebars.compile(_locData['departing_from']);
		resultText['departing_from'] = template(datas);

		template = Handlebars.compile(_locData['price_from']);
		resultText['price_from'] = template(datas);

		// console.log("_dynData.flights[0]['Until']");
		// console.log(_dynData['untilDate']);
		
		if('untilDate' in _dynData){

			var langDate = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
			var _m = moment.unix(_dynData['untilDate']);
				_m.locale(langDate.toLowerCase());
			datas['date'] = _m.format('L');

			template = Handlebars.compile(_locData['book_until']);
			resultText['book_until'] = template(datas).toUpperCase();
		}else{
			resultText['book_until'] = "";
		}

		resultText['cta_click_here'] = _locData['cta_click_here'].toUpperCase();

		resultText['see_conditions'] = _locData['see_conditions'].toUpperCase();

		resultText['taxes_inc'] = _locData['taxes_inc'].toUpperCase();

		resultText['terms'] = _locData['terms'];

		resultText['rmkt_txt_anim'] = _locData['rmkt_txt_anim'];
		resultText['rmkt_txt_screen_one'] = _locData['rmkt_txt_screen_one'];
		resultText['rmkt_txt_screen_two'] = _locData['rmkt_txt_screen_two'];

	lib.properties.dynamic = {
		
		// currency parameters
		textCurrency: _dynData.flights[0].Currency,
		textAti: getArLabel()+'\n'+resultText['taxes_inc'],//A/R\nTTC
		currencyIsBefore: getCurrencyIsBefore(),
		asianFromPosition: getIsAsianPosition(),
		
		// common texts
		textFromPrice: resultText['price_from'].trim(),
		textAirport: resultText['departing_from'].trim(), 
		textCTA: resultText['cta_click_here'].trim(),
		textConditions: resultText['book_until'].trim() + '\n' + resultText['see_conditions'].trim(),
		//ToDo: Remplacer les caractere br ou saut de ligne par des \n
		textConditionsScreen: resultText['terms'].trim(),

		//ToDo

		//Animation Place
		textReserved: resultText['rmkt_txt_anim'].trim(),
		textAnimationPlaceContent1: resultText['rmkt_txt_screen_one'].trim(),
		textAnimationPlaceContent2: resultText['rmkt_txt_screen_two'].trim(),
		
		scenario:[]
	};


	for (var i = 0; i < _dynData.flights.length; i++) {

		if(!_config['debug']){

			var flightData = _dynData.flights[i];
			var pantoneFlight = (_scenario.visualSetup_ == airfrance.DestinationScenario.THREE_VISUALS)?_dynData.flights[i]:_dynData.flights[0];

			var pantonePosition = (_scenario.visualSetup_ == airfrance.DestinationScenario.THREE_VISUALS)? "1" :flightData.Position;
			var colorA = pantoneFlight['Pantone_Pos' + pantonePosition + '_A'];
			var colorB = pantoneFlight['Pantone_Pos' + pantonePosition + '_B'];


			var imageObj = '';
			var colorObj = {};
			try{
				if(flightData['Dest_Image_' + _config.size] != "" && _config['scenario'].indexOf('retargetingsearch') < 0)
					imageObj = JSON.parse(flightData['Dest_Image_' + _config.size])[_config['scenario']];
			}catch(e){

			}


			if(flightData['Dest_JSON'] != "" && flightData['Dest_JSON'] != undefined){

				colorObj = JSON.parse(flightData['Dest_JSON']);

				if(_config['scenario'] in colorObj  && i<1){
					_scenario.visualSetup_ = airfrance.DestinationScenario.ONE_VISUAL;
					colorA = colorObj[_config['scenario']]['opforeground'];
					colorB = colorObj[_config['scenario']]['opbackground'];
				}

			}

			//INTRO
			if(i<1){
				lib.properties.dynamic.scenario.push({type:_config['typeViews']['intro'], foreground:colorA, background:colorB });
			}

			//_scenario.visualSetup_ != airfrance.DestinationScenario.ONE_VISUAL
			if(_scenario.visualSetup_ == airfrance.DestinationScenario.THREE_VISUALS || i<1){

				// if(!_config['debug'])
				if(_config['scenario'].indexOf('retargetingsearch') < 0)
					InjectImageAsset(imageObj, 'picture_'+flightData.Position, widthPictFormat, heightPictFormat);
				
				lib.properties.dynamic.scenario.push({
					type:_config['typeViews']['image'], 
					foreground:colorA, 
					background:colorB, 
					image:'picture_'+flightData.Position 
				});

			}

			//EXCEPTIONS TITLE
			if('title' in _config['typeViews'] && i<1){
				lib.properties.dynamic.scenario.push({	
					type:_config['typeViews']['title'], 
					foreground:colorA, 
					background:colorB
				});

			}

			// colorA = pantoneFlight['Pantone_Pos' + flightData.Position + '_A'];
			// colorB = pantoneFlight['Pantone_Pos' + flightData.Position + '_B'];

			colorA = pantoneFlight['Pantone_Pos' + pantonePosition + '_A'];
			colorB = pantoneFlight['Pantone_Pos' + pantonePosition + '_B'];
			//DESTINATION PRICES

			var moneyFormat = {
				symbol: "",
				// symbol: _dynData.currency,
				// format: dynData.priceFormat,
				thousand:_dynData.thousandsSep,
				precision: 0
			};

			lib.properties.dynamic.scenario.push({	
				type:_config['typeViews']['destination'], 
				foreground:colorA, 
				background:colorB,
				textTitle: getAirportLabel(flightData["Destination"]), 
				// textPrice: flightData["Price"]
				textPrice: accounting.formatMoney(flightData["Price"], moneyFormat)
			});


			// if (typeof(this.config_.flightParsingHandler) == 'function') {
			// 	this.config_.flightParsingHandler(flightData, this.dynData_);
			// }
		
		}
	}

	
	//summary
	lib.properties.dynamic.scenario.push({type:_config['typeViews']['summary'],foreground:colorA,background:colorB});

	// console.log("lib.properties.dynamic.scenario");
	// console.log(lib.properties.dynamic.scenario);

	lib.properties.dynamic.fonts = lib.properties.dynamic.fonts || {};
	
	if(isSecondaryFontUsed)
		lib.properties.dynamic.fonts['Excellence In Motion V2'] = 'Arial';


	if(_config['debug']){

		if(_config['scenario'].indexOf('retargetingsearch') < 0){
			if(_config['scenario'].indexOf('ohlala') > -1){
				InjectImageAsset('https://s0.2mdn.net/ads/richmedia/studio/45521296/picture_paris_ohlala_728x90.jpg', 'picture_un', widthPictFormat, heightPictFormat);
			}else{
				InjectImageAsset('https://s0.2mdn.net/ads/richmedia/studio/37721882/picture_paris_728x90.jpg', 'picture_un', widthPictFormat, heightPictFormat);
				InjectImageAsset('https://s0.2mdn.net/ads/richmedia/studio/37721882/picture_paris_728x90.jpg', 'picture_deux', widthPictFormat, heightPictFormat);
				InjectImageAsset('https://s0.2mdn.net/ads/richmedia/studio/37721882/picture_paris_728x90.jpg', 'picture_trois', widthPictFormat, heightPictFormat);
			}
		}
		

		lib.properties.dynamic = {
			// currency parameters
			textCurrency: '$',
			textAti: 'R/T\nALL INC.',//A/R\nTTC
			currencyIsBefore: true,
			asianFromPosition: false,

			
			// common texts
			textFromPrice: 'FROM', 
			textAirport: 'DEPARTING FROM NEW YORK', 
			textCTA: 'BOOK NOW', 
			textConditions: 'ACHETEZ JUSQU\'AU 10\/12\/2017\nSEE CONDITIONS',
			textConditionsScreen: "Terms and conditions apply\nCredit cards surcharge applies\nFares subject to change\n40 days advanced purchase",

			/* ToDo */
			textReserved: 'Réservé',
			textAnimationPlaceContent1: 'Chic !\nIl en reste une !\nEt demain ?',
			textAnimationPlaceContent2: 'Réservez vite !',

			scenario: _config['scenarioDatas']
		}
	}//end isDebug

    // console.log("dynamic text conditions is ", lib.properties.dynamic.textConditionsScreen);
		

	function getArLabel(){
		var _locData = airfrance.Logic.dynamizer.getLocData();
		// if(_dynData.flights[0]['A/R'] == 'true'){
		if(_dynData.flights[0]['A_R']){
			return _locData['round_trip'];
		}else{
			return _locData['simple_trip'];
		}
	}

	function getAirportLabel(code){
		// console.log("getAirportLabel : " + code);
		var _locData = airfrance.Logic.dynamizer.getLocData();
		// console.log(_locData[code]);
		return _locData[code];
	}

	function getCurrencyIsBefore(){
		//var _dynData = airfrance.Logic.dynamizer.getDynData();
		var priceFormat = _dynData.priceFormat.replace(/\s/g, '');
		var res = false;
		if(priceFormat == "%s%v") res = true;

		return res;
	}

	function getIsAsianPosition(){
		
		return airfrance.Logic.dynamizer.getIsAsianPosition_();

	}

	function InjectImageAsset(src, id, width, height){
		lib.properties.manifest.push( {src:src, id:id} );
		
		var p;
		(lib[id] = function() {
			this.initialize(img[id]);
		}).prototype = p = new cjs.Bitmap();
		p.nominalBounds = new cjs.Rectangle(0, 0, width, height);
	};
	
}



function Main(root)
{
	this.root = root;
	
	var totalDuration;
	var currentModuleIndex;
	var modules;
	var duration;
	var loop;
	var currentWaitForLabelInterval;
	var mainAnim;
	
	var topMarge;
	var bottomMarge;
	var freezeInterval;

	var isConditionsShown;
	var isFrozen;

	this.Init = function()
	{
		isOnFirefox = navigator.userAgent.indexOf('Firefox/') != -1;

		currentModuleIndex = 0;
		modules = new Array();
		duration = 0;
		loop = 0;
		currentWaitForLabelInterval = -1;
		contentMarge = 60;
		topMarge = 10;
		bottomMarge = 10;
		isConditionsShown = false;
		isFrozen = false;

		/*Js Template*/
		var _aManifest = ['js/introModule.js','js/imageModule.js','js/priceModule.js','js/endshotModule.js', 'js/ohlalaTitleModule.js', 'js/animationPlaceModule.js'];

		/* Js Google */
		/*_aManifest.push('jsg/accounting.min.js');
		_aManifest.push('jsg/af_dclk_profile.js');
		_aManifest.push('jsg/dynamizer.js');
		_aManifest.push('js/logic.js');
		*/


		if(window['Enabler'] != undefined)
		{
			for(var key in _aManifest)
				_aManifest[key] = Enabler.getUrl(_aManifest[key]);
		}

		Utils.LoadScripts(_aManifest, ScriptsLoaded);
	};
	
	function ScriptsLoaded()
	{
		AddContent();
		
		stage.enableMouseOver();
		mainAnim.btnClickThrough.addEventListener('click', OnClickThrough);
		mainAnim.btnConditions.addEventListener('click', OnClickConditions);
		mainAnim.btnConditions.addEventListener('mouseover', OnOverConditions);
		
		// if(duration < (totalDuration - 1) * 0.5)
			// loop = Math.floor(totalDuration/duration);

		loop = 1;
		totalDuration = duration*2;
		// console.log('duration :', duration,'totalDuration :', totalDuration, 'loop :', loop);
		
		freezeInterval = setInterval(function ()
		{
			Freeze();
		}, totalDuration * 1000);

		ShowCurrentModule();
		setPixelImpression();
	};
	
	function AddContent()
	{
		totalDuration = 30;

		var dynamic = lib.properties.dynamic;
		var destinations = [];
		var pastBackgroundColor;

		AddMainAnim(dynamic.textConditionsScreen.toUpperCase());

		for(var i in dynamic.scenario)
		{
			var module = dynamic.scenario[i];

			switch(module.type)
			{
				case 'intro':
					AddIntroModule(module.foreground, module.background);
					break;

				case 'image':
					AddImageModule(module.foreground, module.background, pastBackgroundColor, module.image);
					break;

				case 'ohlalaDestination':
				case 'destination':
					destinations.push(
					{
						textTitle: module.textTitle.toUpperCase(), 
						textPrice: module.textPrice.toUpperCase()
					});
					
					AddPriceModule(
						module.foreground,
						module.background,
						{	textTitle: module.textTitle.toUpperCase(), 
							textPrice: module.textPrice.toUpperCase(),
							textCurrency: dynamic.textCurrency.toUpperCase(),
							textAti: dynamic.textAti.toUpperCase(),
							currencyIsBefore: dynamic.currencyIsBefore,
							asianText: dynamic.asianFromPosition
						},
						dynamic.textFromPrice.toUpperCase(),
						dynamic.textAirport.toUpperCase(),
						dynamic.textCTA.toUpperCase(),
						dynamic.textConditions.toUpperCase(),
						module.type == 'ohlalaDestination'
					);
					break;

				case 'ohlalaSummary':
				case 'summary':
					AddEndshotModule(
						module.foreground,
						module.background,
						destinations.map(function(d)
						{
							return{
								textTitle: d.textTitle.toUpperCase(),
								textPrice: d.textPrice.toUpperCase(),
								textCurrency: dynamic.textCurrency.toUpperCase(),
								textAti: dynamic.textAti.toUpperCase(),
								currencyIsBefore: dynamic.currencyIsBefore,
								asianText: dynamic.asianFromPosition
							};
						}),
						dynamic.textFromPrice.toUpperCase(),
						dynamic.textAirport.toUpperCase(),
						dynamic.textCTA.toUpperCase(),
						dynamic.textConditions.toUpperCase(),
						module.type == 'ohlalaSummary'
					);
					destinations.length = 0; // reset destinations, if you want you could have another set of destinations and another summary
					break;

				case 'ohlalaTitle':
					AddOhlalaTitleModule(module.foreground, module.background);
					break;

				case 'animationPlace':
					AddAnimationPlaceModule(
						module.foreground,
						module.background,
						pastBackgroundColor,
						dynamic.textCTA.toUpperCase(),
						dynamic.textConditions.toUpperCase(),
						dynamic.textReserved.toUpperCase(),
						dynamic.textAnimationPlaceContent1.toUpperCase(),
						dynamic.textAnimationPlaceContent2.toUpperCase()
					);
					break;
			}
			pastBackgroundColor = module.background;
		}
		
		//AddIntroModule('#92C5D8', '#0085C1');

		//AddImageModule('#92C5D8', '#0085C1', 'alain_surprise');

		//AddPriceModule('#4D2669', '#0FA5B3',
		//	{textTitle: 'PARIS', textPrice: '281', textCurrency: '€', textAti: 'A/R\nTTC', currencyIsBefore: false},
		//	'AU DÉPART DE AMSTERDAM',
		//	'CLIQUEZ, DÉCOLLER',
		//	'VOIR CONDITIONS'
		//);

		//AddEndshotModule('#4D2669', '#0FA5B3',
		//	[
		//		{textTitle: 'PARIS', textPrice: '888888', textCurrency: '€', textAti: 'A/R\nTTC', currencyIsBefore: false},
		//		{textTitle: 'NEW', textPrice: '8', textCurrency: '€', textAti: 'A/R\nTTC', currencyIsBefore: false},
		//		{textTitle: 'REP. DOMINICAINE', textPrice: '188', textCurrency: '€', textAti: 'A/R\nTTC', currencyIsBefore: false}
		//	],
		//	'AU DÉPART DE AMSTERDAM',
		//	'CLIQUEZ, DÉCOLLER',
		//	'VOIR CONDITIONS'
		//);
	}

	function AddMainAnim(text)
	{
		mainAnim = new lib.MainAnim();
		root.addChild(mainAnim);

var mcTextLegals = mainAnim.screenConditions.textConditions;
var textLegals = mainAnim.screenConditions.textConditions.text;

		Utils.SetText(mainAnim.screenConditions.textConditions.text, text, isOnFirefox ? 3 : 0);
        
        mainAnim.screenConditions.textConditions.text.lineWidth = stage.canvas.clientWidth - contentMarge;

		var bounds = mainAnim.screenConditions.textConditions.text.getBounds();

var lineHeight = bounds.height;
var scale = Math.min(1, (stage.canvas.clientHeight - contentMarge*.5) / lineHeight);
mcTextLegals.scaleX = mcTextLegals.scaleY = scale;

		var heightMax = stage.canvas.clientHeight - topMarge - bottomMarge;
		mainAnim.screenConditions.textConditions.y = topMarge + parseInt((heightMax - bounds.height*scale) * 0.5);

	}
	
	function AddIntroModule(headerColor, backgroundColor)
	{
		var module = new IntroModule(headerColor, backgroundColor);
		modules.push({module: module, isEndShot: false, canShowConditions: false});
	};
	
	function AddImageModule(headerColor, backgroundColor, pastBackgroundColor, image_id)
	{
		var module = new ImageModule(headerColor, backgroundColor, pastBackgroundColor, image_id);
		duration += Utils.GetDuration(module.asset);
		modules.push({module: module, isEndShot: false, canShowConditions: false});
	};
	
	function AddPriceModule(headerColor, backgroundColor, priceLine, textFromPriceContent, textFromContent, textCtaContent, textConditionsContent, isOhlala)
	{
		var module = new PriceModule(headerColor, backgroundColor, priceLine, textFromPriceContent, textFromContent, textCtaContent, textConditionsContent, isOhlala);
		duration += Utils.GetDuration(module.asset);
		modules.push({module: module, isEndShot: false, canShowConditions: true});
	};
	
	function AddEndshotModule(headerColor, backgroundColor, priceLines, textFromPriceContent, textFromContent, textCtaContent, textConditionsContent, isOhlala)
	{
		var module = new EndshotModule(headerColor, backgroundColor, priceLines, textFromPriceContent, textFromContent, textCtaContent, textConditionsContent, isOhlala);
		duration += Utils.GetDuration(module.asset);
		modules.push({module: module, isEndShot: true, canShowConditions: true});
	};

	function AddOhlalaTitleModule(headerColor, backgroundColor)
	{
		var module = new OhlalaTitleModule(headerColor, backgroundColor);
		duration += Utils.GetDuration(module.asset);
		modules.push({module: module, isEndShot: false, canShowConditions: false});
	}

	function AddAnimationPlaceModule(headerColor, backgroundColor, pastBackgroundColor, textCtaContent, textConditionsContent, textReserved, textContent1, textContent2)
	{
		var module = new AnimationPlaceModule(headerColor, backgroundColor, pastBackgroundColor, textCtaContent, textConditionsContent, textReserved, textContent1, textContent2);
		duration += Utils.GetDuration(module.asset);
		modules.push({module: module, isEndShot: false, canShowConditions: false});
	};
	
	function ShowCurrentModule()
	{
		var currentModule = modules[currentModuleIndex].module.asset;
		var isEndShot = modules[currentModuleIndex].isEndShot;
		mainAnim.modulesHolder.addChild(currentModule);
		
		currentModule.gotoAndPlay('show');
		if(currentModule.strokes != null) currentModule.strokes.gotoAndPlay('show');
		if(currentModule.content != null) currentModule.content.gotoAndPlay('show');
		if(currentModule.sides != null)
			isEndShot ? currentModule.sides.gotoAndPlay('hide') : currentModule.sides.gotoAndPlay('show');
		
		if(currentWaitForLabelInterval != -1)
		{
			clearInterval(currentWaitForLabelInterval);
			currentWaitForLabelInterval = -1;
		}
		
		currentWaitForLabelInterval = Utils.WaitForLabel(currentModule, 'shown', NextModule);
	};
	
	function NextModule()
	{
		++currentModuleIndex;
		if(currentModuleIndex >= modules.length)
		{
			--currentModuleIndex;
			if(loop == 0)
				return;
			
			--loop;
			currentModuleIndex = 0;
		}
		
		if(currentModuleIndex > 1)
			mainAnim.modulesHolder.removeChildAt(0);
		
		ShowCurrentModule();
	};

	function Freeze()
	{
		if(isFrozen)
			return;

		// console.log('Freeze');

		isFrozen = true;
		clearInterval(freezeInterval);

		currentModuleIndex = modules.length - 1;
		var currentModule = modules[currentModuleIndex].module.asset;
		mainAnim.modulesHolder.addChild(currentModule);
		currentModule.gotoAndStop('shown');
		
		for(var a = 0; a < root.numChildren; ++a)
			mainAnim.modulesHolder.removeChildAt(0);
		
		if(currentWaitForLabelInterval != -1)
		{
			clearInterval(currentWaitForLabelInterval);
			currentWaitForLabelInterval = -1;
		}
		/*
		mainAnim.btnClickThrough.removeEventListener('click', OnClickThrough);
		mainAnim.btnConditions.removeEventListener('mouseover', OnOverConditions);
		mainAnim.btnConditions.removeEventListener('mouseout', OnOutConditions);
		mainAnim.btnConditions.removeEventListener('click', OnClickConditions);

		mainAnim.screenConditions.gotoAndStop('hidden');*/
	};
	
	function setPixelImpression()
	{
		airfrance.Logic.dynamizer.setPixelImpression();
	}

	function OnClickThrough()
	{
		if(isConditionsShown){
			OnOutConditions();
			return;
		}else{
			Freeze();
		}

		// console.log("#### EXIT ####");

		Enabler.exitOverride('Default_Exit', airfrance.Logic.dynamizer.getClickThrough());
		
	};

	
	function OnClickConditions()
	{
		if(!isConditionsShown)
		{
			if(modules[currentModuleIndex].canShowConditions)
				OnOverConditions();
			else
				Freeze();
		}
		else
		{
			OnOutConditions();
		}
	};

	function OnOverConditions()
	{
		if(!modules[currentModuleIndex].canShowConditions)
			return;

		isConditionsShown = true;

		mainAnim.btnConditions.removeEventListener('mouseover', OnOverConditions);
		mainAnim.btnConditions.addEventListener('mouseout', OnOutConditions);

		mainAnim.screenConditions.gotoAndPlay('show');
	};
	
	function OnOutConditions()
	{
		isConditionsShown = false;
		
		mainAnim.btnConditions.removeEventListener('mouseout', OnOutConditions);
		mainAnim.btnConditions.addEventListener('mouseover', OnOverConditions);

		mainAnim.screenConditions.gotoAndPlay('hide');
	};
}