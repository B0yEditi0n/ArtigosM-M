

//Debug Scenarii :
var _scenarDestinations = [
  {type:'intro', foreground:'#e3004f', background:'#fdea71' },
  {type:'image', foreground:'#e3004f', background:'#fdea71', image:'picture_un' },
  // DESTINATION
  { type:'destination', 
    foreground:'#e3004f', 
    background:'#fdea71',
    textTitle: 'MADRID', 
    textPrice: '699'
  },
  {type:'image', foreground:'#ffeca7', background:'#1a0c41', image:'picture_deux' },
  { type:'destination', 
    foreground:'#ffeca7', 
    background:'#1a0c41', 
    textTitle: 'PARIS', 
    textPrice: '760'
  },
  {type:'image', foreground:'#fee3ae', background:'#e74580', image:'picture_trois' },
  { type:'destination', 
    foreground:'#e74580', 
    background:'#fee3ae', 
    textTitle: 'LONDON', 
    textPrice: '721'
  },

  { type:'summary',
    foreground:'#e74580',
    background:'#fee3ae'
  }
];

// RETARGETING TEST
var _scenarRetargetingSearch = [
  { type:'intro', foreground:'#e3004f', background:'#fdea71' },
  { type:'animationPlace', foreground:'#e3004f', background:'#fdea71' },
  { type:'destination', 
    foreground:'#e3004f', 
    background:'#fdea71',
    textTitle: 'MADRID', 
    textPrice: '699'
  }
];

// OH LA LA
var _scenarOhlala = [
  {type:'intro', foreground:'#8fc6d7', background:'#0086c2' },
  {type:'image', foreground:'#8fc6d7', background:'#0086c2', image:'picture_un' },
  { type:'ohlalaTitle', 
    foreground:'#8fc6d7', 
    background:'#0086c2'
  },
  { type:'ohlalaDestination', 
    foreground:'#e3004f', 
    background:'#fdea71',
    textTitle: 'MADRID', 
    textPrice: '699'
  },
  { type:'ohlalaDestination', 
    foreground:'#ffeca7', 
    background:'#1a0c41', 
    textTitle: 'PARIS', 
    textPrice: '760'
  },
  { type:'ohlalaDestination', 
    foreground:'#e74580', 
    background:'#fee3ae', 
    textTitle: 'LONDON', 
    textPrice: '721'
  },
  { type:'ohlalaSummary',
    foreground:'#e74580',
    background:'#fee3ae'
  }
];



var airfrance = airfrance || {};

airfrance.Logic = new function() {

  console.log('airfrance.Logic');
  
  var _self = this;

  this.LANGUAGES_FILE = 'af_language.json';

  this.init = function(callback){

    if (!Enabler.isServingInLiveEnvironment()) {
      //document.addEventListener('click', function() {
        //paused = !paused;
        //dynamizer.toggleAnimations(paused, false);
      //}, true);
    }

    /*
      Attention 'image' reste 'image' pour la campagne Ohlala sur les 300x250 et 728x90
    */

    var conf = {
      "debug": false,
      "size": "728x90",

      //Destination1
      // "scenario": "destinations1",//nom de la campagne
      // "scenarioDatas": _scenarDestinations,
      // "typeViews": {'intro':'intro', 'image':'image', 'destination':'destination', 'summary':'summary'},//Destination

      //Ohlala
      //"scenario": "ohlaladeals",//nom de la campagne
      //"scenarioDatas": _scenarOhlala,
      //"typeViews": {'intro':'intro', 'image':'image', 'title':'ohlalaTitle','destination':'ohlalaDestination', 'summary':'ohlalaSummary'},
      //"opforeground":'#8fc6d7', 
      //"opbackground":'#0086c2',
      
      //RetargetingSearch
      "scenario": "retargetingsearch1",//nom de la campagne
      "scenarioDatas": _scenarRetargetingSearch,
      "typeViews": {'intro':'intro', 'image':'animationPlace', 'destination':'destination'},//Destination

      "custype": "recrutement", //A renseigner pour chaque campagne
      "locpath": "https://s0.2mdn.net/ads/richmedia/studio/45127100/",//replaced dynamically
      "countryCode": "GB",//replaced dynamically
      "device": this.getDevice(),
      "initDynamicHandler": initDynamic,
      "languagesUrl": this.LANGUAGES_FILE,
      "callbackInit": callback
    };

    if ('build_scenario' in window && window.build_scenario != null)
    {
      for (var id in window.build_scenario)
      {
        conf[id] = window.build_scenario[id];
      }
    }

    _self.dynamizer = new airfrance.Dynamizer(conf);

    _self.dynamizer.start();
  }


  this.getDevice = function(){
    var md = new MobileDetect(window.navigator.userAgent);
    var _dev = "desktop";
    if(md.mobile()){
      _dev = "mobile";
      if(md.tablet()) _dev = "tablet";
    }
    return _dev;
  }
}



airfrance.DestinationScenario = function(config, dynData) {

  this.dynData_ = dynData;
  this.config_ = config;
  this.visualSetup_ = null;

};

airfrance.DestinationScenario.ONE_VISUAL = 'one_visual';
airfrance.DestinationScenario.THREE_VISUALS = 'three_visuals';


var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);


