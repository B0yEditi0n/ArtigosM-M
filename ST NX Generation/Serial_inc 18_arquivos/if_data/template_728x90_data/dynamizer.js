
//var IS_PREVIEWMODE = true; 

var airfrance = airfrance || {};

/**
 * Centralized class enabling to dynamize Air France creatives.
 */
airfrance.Dynamizer = function(config) {
  
  /**
   * @private {Boolean} The current fetched state of the creative.
   */
  this.fetched = false;


  /**
   * @private {Boolean} The current debug state of the creative.
   */
  this.debug = false;

  
  /**
   * @private {string} The fallback language if the browser language wasn't detected.
   */
  // this.fallbackLangCode_ = 'hu_HU';

  //CN / HK / KR / JP

  // this.fallbackLangCode_ = 'tw_HK';
  // this.fallbackLangCode_ = 'ko_KR';
  // this.fallbackLangCode_ = 'zh_CN';
  // this.fallbackLangCode_ = 'ja_JP';

//https://tc.airfrance.com/c

  this.fallbackLangCode_ = 'en_GB';
  
  // this.fallbackLangCode_ = 'dk_DK';
  // this.fallbackLangCode_ = 'cs_CZ';
  // this.fallbackLangCode_ = 'fr_FR';
  // this.fallbackLangCode_ = 'en_FR';
  // this.fallbackLangCode_ = 'sv_SE';

  /**
   * @private {Array} List of available languages for translations.
   */
  this.availableLanguages_ = [];

  /**
   * @private {DynamizerScenario} The dynamisation scenario to use.
   */
  this.scenario_ = null;

  /**
   * @private {Object} The configuration for the dynamization.
   */
  this.config_ = config;

  /**
   * @private {Number} The current ready state of the creative.
   */
  this.readyState_ = 0;

  /**
   * @private {Number} Number of loops which ran since the creative started being displayed.
   */
  this.loopCount_ = 0;

  

  /**
   * @private {number} Number of texts to measure.
   */
  this.measuredTexts_ = 0;



  /**
   * @private {!Object} The language dictionary.
   */
  this.lang_ = {};

  /**
   * @private {?Object} The dynamic elements issued by the DoubleClick profile.
   */
  this.dynData_ = null;

  this.force_codelng = null;

  /**
   * @private {!Object} Logo colors rotation.
   */
  this.logoColors_ = {};

  this.readyStates_ = [
    airfrance.Dynamizer.PAGE_LOADED,
    airfrance.Dynamizer.LANGUAGE_LOADED,
    airfrance.Dynamizer.LOCALES_LOADED
  ];
};



/**
   * @private {!Array}Â States to check ensuring the creative is ready to show.
   */



/**
 * Ready state saying the page is loaded.
 * @const
 */
airfrance.Dynamizer.PAGE_LOADED = 1;


/**
 * Ready state saying the languages are loaded.
 * @const
 */
airfrance.Dynamizer.LANGUAGE_LOADED = 2;

airfrance.Dynamizer.LOCALES_LOADED = 4;


/**
 * Ready state saying the languages are loaded.
 * @const
 */
//airfrance.Dynamizer.CSS_LOADED = 4;


/**
 * Ready state saying the fonts are loaded.
 * @const
 */
//airfrance.Dynamizer.FONTS_LOADED = 8;


if('console' in window)
{
  //window['biborg'] = {};
  //window.biborg['log'] = console.log.clone();
  console.info = function(){};
  console.log = function(){};
  console.debug = function(){};
  console.error = function(){};
}

/**
 * Initialization routine.
 */
airfrance.Dynamizer.prototype.start = function() {

  var doc = document.documentElement;
      doc.setAttribute('data-useragent', navigator.userAgent);


  this.setReadyState_(airfrance.Dynamizer.FONTS_LOADED);

  if (Enabler.isInitialized()) {
    this.init_();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, this.init_.bind(this));
  }
};


/**
 *
*/
airfrance.Dynamizer.prototype.getVarURL = function(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;
  }

  return vars;
};

/**
 * Enabler is initialized.
 * @private
 */
airfrance.Dynamizer.prototype.init_ = function() {

  this.fetched = false;

  if (typeof(this.config_.initDynamicHandler) == 'function') {

    // if (this.config_.debug) {
    if (Enabler.getParameter("IS_PREVIEWMODE") == "true") {
    // if (this.getVarURL('IS_PREVIEWMODE') == "true") {
    // if (IS_PREVIEWMODE == "true") {
      // Post message to receive mock data from previewer.
      window.addEventListener('message', this.previewMessageHandler_.bind(this), false);

      var creativeId = Enabler.getDartCreativeId();

      try {
        var myJS = 'if (typeof(initCreative) == "function") {' +
          '  initCreative("' + creativeId + '");' +
          '}';
        Enabler.invokeExternalJsFunction(myJS);
      }
      catch(e) {}
    } else {
      this.dynData_ = this.config_.initDynamicHandler(); //INIT du profil Dynamique
      this.dynDataInitHandler_();
    }

  }

};

/**
 * Window's onmessage handler getting the dynamic content from the previewer.
 * @param {Event} e The message event.
 */
airfrance.Dynamizer.prototype.previewMessageHandler_ = function(e) {
  if (e.data) {
    try {
      var eventData = JSON.parse(e.data);
      switch (eventData.command) {
        case 'initialized':
          this.loadMockDynData_();
        break;
        case 'preview_retargeting':
          console.debug(eventData.result);
          if(this.fetched || !('codelng' in eventData.result)) return;
          this.fetched = true;

          this.force_codelng = eventData.result['codelng'];

          this.dynData_ = this.config_.initDynamicHandler();
          this.dynDataInitHandler_();
        break;
        case 'fetchPayload':

          if(this.fetched || !('flights' in eventData.result)) return;

          console.info("eventData.result");
          console.info(eventData.result);


          this.fetched = true;

          var oResult = eventData.result;
          var oFlights = eventData.result['flights'];

            for(var i = 0;i< oFlights.length;i++)
            {
                for(var e in oFlights[i])
                {
                    if(e.indexOf('Dest_Image_') == 0){
                        if(oFlights[i][e].trim() == '')
                        {
                            oFlights[i][e] = '{ "destinations": "images/_pixel_hack_dont_remove_.png"}';
                        }
                    }
                }
            }


          this.dynData_ =  {
            "locPath": "https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45127100\/",
            "flights": oFlights,
            "priceFormat": oFlights[0].Price_format,

            "LP_URL": oFlights[0]['LP_URL'],
            "LP_prefix": oFlights[0]['LP_prefix'],
            "LP_suffix": oFlights[0]['LP_suffix'],

            "thousandsSep": (oFlights[0].Thousands != undefined) ?oFlights[0].Thousands:'',
            "departureAirportCode": oFlights[0].Departure,
            "untilDate": oFlights[0].Until,
            "currency": oFlights[0].Currency,
            "Preview_Locale":oResult['Preview_Locale']
          };
          
          console.debug("############# PREVIEW #################");
          console.log(this.dynData_['flights']);

          var targetPositions = ["1", "2", "3"];
          var aflights = this.dynData_['flights'];

          var _aScenarii = ['ohlaladeals','business','premiumeconomy'];

          if(this.config_['scenario'] == "destinationunique") aflights.splice(1, 2);

          for (var i = 0, count = aflights.length; i < count; i++) {
            var flightData = aflights[i];
                flightData.Position = targetPositions[i];

              if(_aScenarii.indexOf(this.config_['scenario']) != -1){
                var colorA = this.config_['opforeground'];
                var colorB = this.config_['opbackground'];

                flightData.Pantone_Pos1_A = colorA;
                flightData.Pantone_Pos1_B = colorB;
                flightData.Pantone_Pos2_A = colorA;
                flightData.Pantone_Pos2_B = colorB;
                flightData.Pantone_Pos3_A = colorA;
                flightData.Pantone_Pos3_B = colorB;

              }

              if('oCustomColors' in window){
                if(this.config_['scenario'] in oCustomColors){

                  flightData['Dest_JSON'] = '{"'+this.config_['scenario']+'" : {"opforeground":"'+oCustomColors[this.config_['scenario']]["0_A"]+'", "opbackground":"'+oCustomColors[this.config_['scenario']]["0_B"]+'"}}';

                  flightData.Pantone_Pos1_A = oCustomColors[this.config_['scenario']]["1_A"];
                  flightData.Pantone_Pos1_B = oCustomColors[this.config_['scenario']]["1_B"];
                  flightData.Pantone_Pos2_A = oCustomColors[this.config_['scenario']]["2_A"];
                  flightData.Pantone_Pos2_B = oCustomColors[this.config_['scenario']]["2_B"];
                  flightData.Pantone_Pos3_A = oCustomColors[this.config_['scenario']]["3_A"];
                  flightData.Pantone_Pos3_B = oCustomColors[this.config_['scenario']]["3_B"];
                }
              }



          };

          //console.log(this.dynData_['flights']);

          console.debug("############# PREVIEW END ##############");


          this.dynDataInitHandler_();
          break;
        case 'reload':
          this.init_();
          break;
      }
    } catch (e) {
      // Silent fail, we may receive messages not destined to this creative.
    }
  }
};

/**
 * Requests the payload from the previewer when in this mode.
 */
airfrance.Dynamizer.prototype.loadMockDynData_ = function() {

  window.parent.postMessage(JSON.stringify({command: 'fetchPayload'}), '*');

};

/**
 * Called once the dynamic data has been successfully loaded to proceed with the
 * remaining elements.
 */
airfrance.Dynamizer.prototype.dynDataInitHandler_ = function() {

  console.log(this.dynData_);

  if(this.dynData_.untilDate != null && this.dynData_.untilDate != 'null'){
    if (typeof this.dynData_.untilDate == 'string')
    {
      this.dynData_.untilDate = parseInt(this.dynData_.untilDate);
    }

    // Converting ms timestamp to sec timestamp
    this.dynData_.untilDate /= 1000;
    if (Number.isNaN(this.dynData_.untilDate))
    {
      this.dynData_.untilDate = null;
      delete this.dynData_['untilDate'];
    }
  }else{
    this.dynData_.untilDate = null;
    delete this.dynData_['untilDate'];
  }
    

  this.dynData_.LP_URL = this.dynData_.LP_URL.trim();
  this.dynData_.LP_prefix = this.dynData_.LP_prefix.trim();
  this.dynData_.LP_suffix = this.dynData_.LP_suffix.trim();

  if (this.dynData_.LP_URL.lastIndexOf('?') != this.dynData_.LP_URL.length - 1)
  {
    this.dynData_.LP_URL += '?';
  }

  this.scenario_ = new airfrance.DestinationScenario(this.config_, this.dynData_);

  this.scenario_.visualSetup_ = this.setVisualSetup_(this.config_, this.dynData_);


  //console.info("this.scenario_.visualSetup_ :: " + this.scenario_.visualSetup_);


  this['config_']['custype'] = (this['dynData_']['isRemarketing'] == true) ? 'retargeting' : 'recrutement';

  this['config_']['strategy'] = (this['dynData_']['isRemarketing'] == true) ? 'Retargeting' : 'Prospecting';
  
  this['config_']['locpath'] = this['dynData_']['locPath'];

  this.loadLocales_(this['config_']['locpath']+'locales.json');

  // Polite loading
  if (Enabler.isPageLoaded()) {
    this.setReadyState_(airfrance.Dynamizer.PAGE_LOADED);
  }else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function() {
      this.setReadyState_(airfrance.Dynamizer.PAGE_LOADED);
    }.bind(this));
  }
};



/**
 * Updates the ready state of the creative and launches the showCreative_ method if it's ready.
 * @param {Number} state The state to add to the ready state.
 * @private
 */
airfrance.Dynamizer.prototype.setReadyState_ = function(state) {

  this.readyState_ = this.readyState_ | state;

  if (this.isReady_()) {
    // this.showCreative_();
    if (typeof(this.config_.callbackInit) == 'function') {
      this.config_.callbackInit();
    }

  }
};


/**
 * @param {number=} opt_stage The state to check, leave undefined to check upon all stages
 * @return {boolean} true if the creative is ready.
 */
airfrance.Dynamizer.prototype.isReady_ = function(opt_stage) {
  //console.log("airfrance.Dynamizer.prototype.isReady_");
  if (opt_stage != undefined) {
    return this.readyState_ & opt_stage;
  }


  for (var i = 0, l = this.readyStates_.length; i < l; i++) {
    if (this.readyState_ & this.readyStates_[i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
};



airfrance.Dynamizer.prototype.setVisualSetup_ = function(config, dynData) {

  var testedImages = [];

  for (var i = dynData.flights.length - 1; i >= 0; i--) {

    var flightData = dynData.flights[i];

    if (flightData['Dest_Image_' + config.size] == "") {
      return airfrance.DestinationScenario.ONE_VISUAL;
    }

    var oJsonImage = JSON.parse(flightData['Dest_Image_' + config.size]);

    var imageData = oJsonImage[config['scenario']];

    if (!imageData || testedImages.indexOf(imageData) >= 0) {
      return airfrance.DestinationScenario.ONE_VISUAL;
    }

    testedImages.push(imageData);
  };

  
  return airfrance.DestinationScenario.THREE_VISUALS;
  

};


airfrance.Dynamizer.prototype.loadLocales_ = function(url) {


  this.loadText_(url, function(val) {

    var result = JSON.parse(val);

    this.availableLanguages_ = result['data'];

    this.loadLanguages_(this.config_.languagesUrl);

    this.setReadyState_(airfrance.Dynamizer.LOCALES_LOADED);

  }.bind(this), 'Locales file not found');

};


/**
 *
 *
 */
airfrance.Dynamizer.prototype.getIsAsianPosition_ = function(){

  var asianFiltreTextFrom = ['ko_KR','tw_HK','zh_CN','ja_JP'];
  var currentLg = this.detectLanguage_();

  console.log( asianFiltreTextFrom.indexOf(currentLg) );


  if( asianFiltreTextFrom.indexOf(currentLg) > -1 ){
    return true;  
  }

  return false;
}


/**
 * Detects the browser's language.
 * @private
 */
airfrance.Dynamizer.prototype.detectLanguage_ = function() {

  var lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);

  var available_locales = this.availableLanguages_;

  var finalLocale = '';

  //console.info(this.dynData_);

  if('Preview_Locale' in this.dynData_){

    if(this.dynData_['Preview_Locale'] != undefined) {
      finalLocale = this.dynData_['Preview_Locale'];
    }else {
      var stLang = finalLocale = this.dynData_['flights'][0]['Default_Lang'];
      finalLocale = stLang.split(',')[0];
    }

    var locale_country = finalLocale.split("_")[1];
    this['config_']['countryCode'] = locale_country;


  }else{
    var langBrowser = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        langBrowser = langBrowser.replace(/-/g, '_');

    var aDefault_Lang = this.dynData_['Default_Lang'].split(",");

    var locale_lang = langBrowser.split("_")[0];

    var locale_country = aDefault_Lang[0].split("_")[1];

    this['config_']['countryCode'] = locale_country; /* IMPORTANT */

    finalLocale = locale_lang+'_'+locale_country;

    if (aDefault_Lang.indexOf(finalLocale) < 0) {
      finalLocale = aDefault_Lang[0];
    }
  }




 

  if (Enabler.getParameter("appnexus_country") != null){
    
    //if(this['config_']['strategy'] == "Retargeting") this['config_']['countryCode'] = dynamicContent.Profile[0].echoCountry[0];
    //else this['config_']['countryCode'] = Enabler.getParameter("appnexus_country");
    
    this['config_']['countryCode'] = Enabler.getParameter("appnexus_country");

    /* retargeting fix to force country  and language user are used on retargeting banners ECHO Price + Sync*/
    if ('echoDestination' in dynamicContent.Profile[0]) {

      finalLocale = locale_lang+'_'+this['config_']['countryCode'];

      if (available_locales.indexOf(finalLocale) < 0) {
        finalLocale = aDefault_Lang[0];
      }
    }

  }

  //console.info(finalLocale);
  //console.info(available_locales);

  if(this.force_codelng != null) return this.force_codelng;


  if (available_locales.indexOf(finalLocale) < 0 || this.debug == true) {
    return this.fallbackLangCode_;
  }

  return finalLocale;

};

/**
 * Sets the languages dictionary URL to load the CSV files containing definitions of language strings.
 * @param {string} url The URL of the languages.csv file.
 * @private
 */
airfrance.Dynamizer.prototype.loadLanguages_ = function(url) {

  var detectedLangCode = this.detectLanguage_();

  console.info( "loadLanguages_ :: " + detectedLangCode );


  /* Fix Cananda FR & EN */
  var fMarketCurrencyBefore = ['en_CA','en_CZ'];
  var fMarketCurrencyAfter = ['fr_CA','cs_CZ'];
  /*currency before*/
  if(fMarketCurrencyBefore.indexOf(detectedLangCode) > -1){
  // if(detectedLangCode == "en_CA"){
    this.dynData_.priceFormat = "%s %v";
  }
  
  /*currency after*/
  if(fMarketCurrencyAfter.indexOf(detectedLangCode) > -1){
  // if(detectedLangCode == "fr_CA"){
    this.dynData_.priceFormat = "%v %s";
  }


  var langUrl = this.config_.locpath + '' + detectedLangCode + '_' + url;

  this.loadText_(langUrl, function(text) {

    var result = JSON.parse(text);

    for(var item in result){
      this.lang_[item] = (result[item] != null) ? result[item].replace(/\n/g, '\n') : "";
    }

    if(!('terms' in this.lang_)){
      this.lang_['terms'] = '';
    }

    this.setReadyState_(airfrance.Dynamizer.LANGUAGE_LOADED);

  }.bind(this), 'Language file not found');

};





/**
 * Utility method which loads the given URL and calls the handler with the responseText
 * or shows a custom error message in the console on error.
 */
airfrance.Dynamizer.prototype.loadText_ = function(url, handler, errorMessage) {
  var req = new XMLHttpRequest();
  req.open('GET', Enabler.getUrl(url), true);
  // req.overrideMimeType('text/plain; charset=utf-8');
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        handler(req.responseText);
      } else {
        console.error(errorMessage);
      }
    }
  };
  req.send(null);
};


airfrance.Dynamizer.prototype.getDynData = function() {
  return this.dynData_;
};

airfrance.Dynamizer.prototype.getLocData = function() {
  return this.lang_;
};

airfrance.Dynamizer.prototype.getScenario = function() {
  return this.scenario_;
};

airfrance.Dynamizer.prototype.getConfig = function() {
  return this.config_;
};






airfrance.Dynamizer.prototype.setPixelImpression = function() 
{

  if (/127\.0\.0\.1/.test(window.location.href)) return;
  
  var _dynData = this.getDynData();

  var _scenario = this.getScenario();

  var s = _dynData['LP_prefix'];

  s = s.replace('&url=', "&ts="+new Date().getTime().toString());

  var cmp = _scenario['config_']['scenario'];

  if (Enabler.getParameter("rmkt_fallback") != null){
    cmp = Enabler.getParameter("rmkt_fallback");
  }


  var datas = {
    'ctycmp' : _scenario['config_']['countryCode'],
    'cmp' : cmp,
    'custyp' : _scenario['config_']['custype'],
    'dev' : _scenario['config_']['device'],
    'strategy':('strategy' in _scenario['config_']) ? _scenario['config_']['strategy'] : 'Prospecting',
    'cachebuster': Math.random()*10000000000000000
  };

  //strategy : Retargeting | Prospecting

  //if (Enabler.getParameter("IS_PREVIEWMODE") == "true"){}

  // if (Enabler.getParameter("appnexus_country") != null){
  //   datas['ctycmp'] = Enabler.getParameter("appnexus_country");
  // }
  //WT.mc_id=c_{{ctycmp}}_display_rtb_{{cmp}}_{{custyp}}_null_d{{dev}}&WT.tsrc=display

  //&utm_medium=Display_Banner_[strategy]&utm_source=RTB&utm_campaign=[campaign]&ESV_market=[market]&ESV_device=[device]

  //&utm_medium=Display_Banner_{{strategy}}&utm_source=RTB&utm_campaign={{cmp}}&ESV_market={{ctycmp}}&ESV_device={{dev}}

  var template = Handlebars.compile(s);
  var result = template(datas);

  document.getElementById('remarketing-pixels').innerHTML = '';
  var img = document.createElement('img');
      img.src = result;
  document.getElementById('remarketing-pixels').appendChild(img);


  var templateCacheBuster = Handlebars.compile("https://tc.airfrance.com/v/?tcs=324&chn=display&ctycmp={{ctycmp}}&src=rtb&cmp={{cmp}}&custyp={{custyp}}&plc=null&dev={{dev}}&ts={{cachebuster}}");
  var resultCacheBuster = templateCacheBuster(datas);

  var imgCacheBuster = document.createElement('img');
      imgCacheBuster.src = resultCacheBuster;
  document.getElementById('remarketing-pixels').appendChild(imgCacheBuster);

  // console.debug("Pixel Classique");
  // console.debug(result);
  // console.debug("Pixel CacheBuster");
  // console.debug(resultCacheBuster);

  /* esvtagv_50153_2 tracking */

  var stringParameters="&utm_medium=Display_Banner_{{strategy}}&utm_source=RTB&utm_campaign={{cmp}}&ESV_market={{ctycmp}}&ESV_device={{dev}}";

  var templateParameters = Handlebars.compile(stringParameters);
  var dataParameters = templateParameters(datas);

  var u = "http" + (("https:" == document.location.protocol) ? "s" : "") + "://trackv.esearchvision.com/50153/tagv_50153_2.js";
  var d = document, 
      g = d.createElement("script");

      g.type = "text/javascript";
      g.defer = true;
      g.async = true;
      g.src = u;
      g.id = "esvtagv_50153_2";

  g.setAttribute("data-parameters", dataParameters);

  //console.debug("ESV TAG");
  //console.debug(stringParameters);

  d.body.appendChild( g );

};




airfrance.Dynamizer.prototype.getClickThrough = function() 
{


  var _dynData = this.getDynData();
  var _scenario = this.getScenario();


  if(_scenario['config_']['strategy'] == "Retargeting"){


    _dynData['LP_URL'] = _dynData['LP_URL'].replace("DisplayFlightPageAction","SearchPrefillAction");


    if (!/^https?:\/\//i.test(_dynData['LP_URL'])) {
        _dynData['LP_URL'] = 'http://' + _dynData['LP_URL'];
    }

    //_dynData['LP_URL'] = "http://"+_dynData['LP_URL'];

    var datasRmtk = {
      'ori' : _dynData.flights[0]['Departure'],
      'dest' : _dynData.flights[0]['Destination']
    };

    var mainUrlRmtk = "from={{ori}}&to={{dest}}";

    var templateRmtk = Handlebars.compile(mainUrlRmtk);
    var resultRmtk = templateRmtk(datasRmtk);


    _dynData['LP_URL'] = _dynData['LP_URL'] + resultRmtk;

  }






  var mainUrl = _dynData['LP_prefix'];
  var secondeURL = _dynData['LP_URL'] + "&" + _dynData['LP_suffix'];


  var cmp = _scenario['config_']['scenario'];

  if (Enabler.getParameter("rmkt_fallback") != null){
    cmp = Enabler.getParameter("rmkt_fallback");
  }

  var datas = {
    'ctycmp' : _scenario['config_']['countryCode'],
    'USER' : _scenario['config_']['countryCode'],
    'cmp' : cmp,
    'custyp' : _scenario['config_']['custype'],
    'dev' : _scenario['config_']['device'],
    'strategy':('strategy' in _scenario['config_']) ? _scenario['config_']['strategy'] : 'Prospecting'
  };


  var templateOne = Handlebars.compile(mainUrl);
  var templateTwo = Handlebars.compile(secondeURL);

  var resultOne = templateOne(datas);
  var resultTwo = escape(templateTwo(datas));

  var result = resultOne+resultTwo;

  console.debug(result);

  if (/127\.0\.0\.1/.test(window.location.href)) return;

  return result;
};







/**
 * Utility method which loads the given URL and calls the handler
 * or shows a custom error message in the console on error.
 */
airfrance.Dynamizer.prototype.loadFont_ = function(url, handler, errorMessage) {
  var req = new XMLHttpRequest();
  req.open('GET', Enabler.getUrl(url), true);
  req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
      if (req.status == 200) {
        handler();
      } else {
        console.error(errorMessage);
      }
    }
  };
  req.send(null);
};