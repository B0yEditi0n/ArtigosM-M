/**
 * DESTINATION 1
 */

var oCustomColors = {
    "business":{
        "0_A":"#6199ab", 
        "0_B":"#ffdf33", 
        "1_A":"#604a7b", 
        "1_B":"#9db1e2", 
        "2_A":"#b02369", 
        "2_B":"#9ccdbb", 
        "3_A":"#31859c", 
        "3_B":"#b7dee8" 
    },
    "premiumeconomy":{
        "0_A":"#fac9a4", 
        "0_B":"#0086c7",
        "1_A":"#255ba0", 
        "1_B":"#93cddd", 
        "2_A":"#803a6a", 
        "2_B":"#bea4be", 
        "3_A":"#1185a1", 
        "3_B":"#e4a4aa" 
    },
    "ohlaladeals":{
        "0_A":"#8fc6d7",
        "0_B":"#0086c2",
        "1_A":"#8fc6d7", 
        "1_B":"#0086c2", 
        "2_A":"#8fc6d7", 
        "2_B":"#0086c2", 
        "3_A":"#8fc6d7", 
        "3_B":"#0086c2" 
    }
};

function initDynamic() {
    console.log("## initDynamic 2 ##");

    var _config = airfrance.Logic.dynamizer.getConfig();

    var devDynamicContent = {};

    devDynamicContent.Profile= [{}];
    devDynamicContent.Profile[0]._id = 0;

        devDynamicContent.Profile[0].URL_IMAGES = "https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/";
        devDynamicContent.Profile[0].URL_LOC = "https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45127100\/";
        //devDynamicContent.Profile[0].URL_LOC = "lang\/";

    devDynamicContent.AirFrance_feed_profiles_destidep= [{}];
    devDynamicContent.AirFrance_feed_profiles_destidep[0]._id = 0;

        devDynamicContent.AirFrance_feed_profiles_destidep[0].ID = 1;
        devDynamicContent.AirFrance_feed_profiles_destidep[0].IATA = "DXB";

    devDynamicContent.AirFrance_feed_profiles_destinations= [{},{},{}];
    devDynamicContent.AirFrance_feed_profiles_destinations[0]._id = 0;

    devDynamicContent.AirFrance_feed_profiles_destinations[0].Unique_Id = "FRA_FDF";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Reporting_Label = "FRA_FDF";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Is_Default = false;
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Default_Lang = "fr_CA";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Currency = "$";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Price_format = "%s %v";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Thousands = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].LP_prefix = "https:\/\/tc.airfrance.com\/c\/?tcs=324&chn=display&ctycmp={{ctycmp}}&src=rtb&cmp={{cmp}}&custyp={{custyp}}&plc=null&dev={{dev}}&url=";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].LP_URL = "https:\/\/www.airfrance.de\/DE\/de\/local\/resainfovol\/meilleuresoffres\/tarifs_promotions.htm";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].LP_suffix = "WT.mc_id=c_{{ctycmp}}_display_rtb_{{cmp}}_{{custyp}}_null_d{{dev}}&WT.tsrc=display";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Market_JSON = "{}";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Departure = "FRA";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Destination = "FDF";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Position = "1";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Until = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Price = "5450";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Cabin = "Economy";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].A_R = true;
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Dest_Image_300x250 = "{ \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/afrique-330x260.jpg\", \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/afrique-330x260.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/afrique-330x260.jpg\",\"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x250.jpg\",\"retargetingvisitors\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x250.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Dest_Image_300x600 = "{ \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\",\"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x600.jpg\", \"retargetingvisitors\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Dest_Image_160x600 = "{ \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_160x600.jpg\", \"retargetingvisitors\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_160x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Dest_Image_728x90 = "{ \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_728x90.jpg\", \"retargetingvisitors\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_728x90.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos1_A = "#0D0B43";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos1_B = "#F7931F";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos2_A = "#D3D824";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos2_B = "#00A388";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos3_A = "#6E1E91";
    devDynamicContent.AirFrance_feed_profiles_destinations[0].Pantone_Pos3_B = "#FF6600";

    devDynamicContent.AirFrance_feed_profiles_destinations[0].Dest_JSON = "{ \"ohlaladeals\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"retargetingsearch1\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"business\" : {\"opforeground\":\"#ffdf33\", \"opbackground\":\"#6199ab\", \"logocolor\":\"#FFFFFF\"},\"premiumeconomy\" : {\"opforeground\":\"#0086c7\", \"opbackground\":\"#fac9a4\", \"logocolor\":\"#FFFFFF\"}}";

    devDynamicContent.AirFrance_feed_profiles_destinations[1].Unique_Id = "FRA_HAV";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Reporting_Label = "FRA_HAV";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Is_Default = false;
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Default_Lang = "fr_FR";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Currency = "JPN";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Price_format = "%s %v";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Thousands = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].LP_prefix = "https:\/\/tc.airfrance.com\/c\/?tcs=324&chn=display&ctycmp={{ctycmp}}&src=rtb&cmp={{cmp}}&custyp={{custyp}}&plc=null&dev={{dev}}&url=";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].LP_URL = "https:\/\/www.airfrance.de\/DE\/de\/local\/resainfovol\/meilleuresoffres\/tarifs_promotions.htm";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].LP_suffix = "WT.mc_id=c_{{ctycmp}}_display_rtb_{{cmp}}_{{custyp}}_null_d{{dev}}&WT.tsrc=display";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Market_JSON = "{}";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Departure = "FRA";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Destination = "FDF";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Position = "2";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Until = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Price = "550";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Cabin = "Economy";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].A_R = true;
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Dest_Image_300x250 = "{ \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/afrique-330x260.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/afrique-du-sud-330x260.jpg\",\"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x250.jpg\"}";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Dest_Image_300x600 = "{ \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\",\"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Dest_Image_160x600 = "{ \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_160x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Dest_Image_728x90 = "{ \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_728x90.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos1_A = "#0D0B43";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos1_B = "#F7931F";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos2_A = "#D3D824";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos2_B = "#00A388";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos3_A = "#6E1E91";
    devDynamicContent.AirFrance_feed_profiles_destinations[1].Pantone_Pos3_B = "#FF6600";

    devDynamicContent.AirFrance_feed_profiles_destinations[1].Dest_JSON = "{ \"ohlaladeals\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"retargetingsearch1\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"business\" : {\"opforeground\":\"#ffdf33\", \"opbackground\":\"#6199ab\", \"logocolor\":\"#FFFFFF\"},\"premiumeconomy\" : {\"opforeground\":\"#0086c7\", \"opbackground\":\"#fac9a4\", \"logocolor\":\"#FFFFFF\"}}";

    devDynamicContent.AirFrance_feed_profiles_destinations[2].Unique_Id = "FRA_LIM";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Reporting_Label = "BRE_LIM";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Is_Default = false;
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Default_Lang = "fr_FR";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Currency = "JPN";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Price_format = "%s %v";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Thousands = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].LP_prefix = "https:\/\/tc.airfrance.com\/c\/?tcs=324&chn=display&ctycmp={{ctycmp}}&src=rtb&cmp={{cmp}}&custyp={{custyp}}&plc=null&dev={{dev}}&url=";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].LP_URL = "https:\/\/www.airfrance.de\/DE\/de\/local\/resainfovol\/meilleuresoffres\/tarifs_promotions.htm";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].LP_suffix = "WT.mc_id=c_{{ctycmp}}_display_rtb_{{cmp}}_{{custyp}}_null_d{{dev}}&WT.tsrc=display";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Market_JSON = "{}";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Departure = "FRA";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Destination = "FDF";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Position = "2";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Until = "";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Price = "51450";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Cabin = "Economy";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].A_R = true;
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Dest_Image_300x250 = "{  \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/amerique-du-sud-330x260.jpg\", \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/amerique-du-sud-330x260.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/amerique-du-sud-330x260.jpg\",\"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x250.jpg\"}";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Dest_Image_300x600 = "{ \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\",\"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/picture_bresil_310x393.png\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_300x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Dest_Image_160x600 = "{  \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/160x600Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_160x600.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Dest_Image_728x90 = "{  \"destinations1\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"destinations2\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"retargetingvisitors\": \"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/37721882\/728x90Bresil.jpg\", \"ohlaladeals\":\"https:\/\/s0.2mdn.net\/ads\/richmedia\/studio\/45521296\/picture_paris_ohlala_728x90.jpg\" }";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos1_A = "#0D0B43";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos1_B = "#F7931F";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos2_A = "#D3D824";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos2_B = "#00A388";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos3_A = "#6E1E91";
    devDynamicContent.AirFrance_feed_profiles_destinations[2].Pantone_Pos3_B = "#FF6600";

    devDynamicContent.AirFrance_feed_profiles_destinations[2].Dest_JSON = "{ \"ohlaladeals\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"retargetingsearch1\" : {\"opforeground\":\"#8fc6d7\", \"opbackground\":\"#0086c2\"},\"business\" : {\"opforeground\":\"#ffdf33\", \"opbackground\":\"#6199ab\", \"logocolor\":\"#FFFFFF\"},\"premiumeconomy\" : {\"opforeground\":\"#0086c7\", \"opbackground\":\"#fac9a4\", \"logocolor\":\"#FFFFFF\"}}";


    Enabler.setDevDynamicContent(devDynamicContent);

    console.debug(dynamicContent);

  var profileDepartFeedName = "AirFrance_feed_profiles_destidep";
  var profileFeedName = "AirFrance_feed_profiles_destinations";


  var departureAirportCode = dynamicContent[profileFeedName][0].Departure;
  var locPath = dynamicContent.Profile[0].URL_LOC;

  

  var targetPositions = ["1", "2", "3"];
  var flights = new Array(dynamicContent[profileFeedName].length);




  for (var i = 0, count = dynamicContent[profileFeedName].length; i < count; i++) {
    var flightData = dynamicContent[profileFeedName][i];
    index = targetPositions.indexOf(flightData.Position);
    if (index < 0) {
      flightData.Position = targetPositions.pop();
    } else {
      targetPositions.splice(index, 1);
    }
    flights[parseInt(flightData.Position) - 1] = flightData;


    if(flightData['Dest_JSON'] != "" && flightData['Dest_JSON'] != undefined){


        var colorObj = JSON.parse(flightData['Dest_JSON']);

        if(_config['scenario'] in colorObj){


            var colorA = colorObj[_config['scenario']]['opforeground'];
            var colorB = colorObj[_config['scenario']]['opbackground'];

            flightData.Pantone_Pos1_A = oCustomColors[_config['scenario']]["1_A"] || colorA;
            flightData.Pantone_Pos1_B = oCustomColors[_config['scenario']]["1_B"] || colorB;
            flightData.Pantone_Pos2_A = oCustomColors[_config['scenario']]["2_A"] || colorA;
            flightData.Pantone_Pos2_B = oCustomColors[_config['scenario']]["2_B"] || colorB;
            flightData.Pantone_Pos3_A = oCustomColors[_config['scenario']]["3_A"] || colorA;
            flightData.Pantone_Pos3_B = oCustomColors[_config['scenario']]["3_B"] || colorB;

            if( "logocolor" in colorObj[_config['scenario']]){
                flightData.logocolor = colorObj[_config['scenario']]['logocolor'];
            }
            
        }
        
    }

  };


    
  return {
    "locPath": locPath,
    "flights": flights,
    "Default_Lang": flights[0].Default_Lang,
    "priceFormat": flights[0].Price_format,
    "isRemarketing": ('IS_RETARGETING' in dynamicContent.Profile[0]) ? true:false,

    "LP_URL": flights[0]['LP_URL'],
    "LP_prefix": flights[0]['LP_prefix'],
    "LP_suffix": flights[0]['LP_suffix'],
    
    "thousandsSep": (flights[0].Thousands != undefined) ?flights[0].Thousands:'',
    "departureAirportCode": flights[0].Departure,
    "untilDate": flights[0].Until,
    "currency": flights[0].Currency
  }
}

var setScenarioColor = function(obj, color){


}