function startup(Cesium) {
    'use strict';
	
	Cesium.BingMapsApi.defaultKey='AtY1kYr6lhh9xdzGagEbKz8-yBzMO4YcHXQ6u22ViKjhf3mTCsqcF7vfEJ4ZzVh3';

	var viewer = new Cesium.Viewer('cesiumContainer', {
		vrButton : true
	});
	
	//Allow scripts in the infoBox
	var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0];
	iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms'); 
	
	
	viewer.scene.skyBox.show = false;
	viewer.scene.sun.show = false;
	viewer.scene.moon.show = false;

	viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2004-01-01");
	viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2014-01-01");
	viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2004-01-01")
	viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
	viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
	viewer.clock.multiplier = 50000000;

	//Seed the random number generator for repeatable results.
	Cesium.Math.setRandomNumberSeed(0);

	var options = [{
		text : 'Choose Country',
		onselect : function() {
					viewer.dataSources.add(Cesium.GeoJsonDataSource.load('static/topojson/MyEurope.topojson'));
					FlyToEurope()
				}
	},
	{
		text : 'Austria',
		onselect : function() {
				D4func('Austria');
				}
	},
	{
		text : 'Belgium',
		onselect : function() {
				D4func('Belgium');
				}
	},
	{
		text : 'Bulgaria',
		onselect : function() {
				D4func('Bulgaria');
				}
	},
	{
		text : 'Croatia',
		onselect : function() {
				D4func('Croatia');
				}
	},
	{
		text : 'Denmark',
		onselect : function() {
				D4func('Denmark');
				}
	},
	{
		text : 'Estonia',
		onselect : function() {
				D4func('Estonia');
				}
	},
	{
		text : 'France',
		onselect : function() {
				D4func('France');
				}
	},
	{
		text : 'Germany',
		onselect : function() {
				D4func('Germany');
				}
	},
	{
		text : 'Greece',
		onselect : function() {
				D4func('Greece');
				}
	},
	{
		text : 'Hungary',
		onselect : function() {
				D4func('Hungary');
				}
	},
	{
		text : 'Iceland',
		onselect : function() {
				D4func('Iceland');
				}
	},
	{
		text : 'Ireland',
		onselect : function() {
				D4func('Ireland');
				}
	},
	{
		text : 'Italy',
		onselect : function() {
				D4func('Italy');
				}
	},
	{
		text : 'Latvia',
		onselect : function() {
				D4func('Latvia');
				}
	},
	{
		text : 'Lithuania',
		onselect : function() {
				D4func('Lithuania');
				}
	},
	{
		text : 'Luxembourg',
		onselect : function() {
				D4func('Luxembourg');
				}
	},
	{
		text : 'Netherlands',
		onselect : function() {
				D4func('Netherlands');
				}
	},
	{
		text : 'Poland',
		onselect : function() {
				D4func('Poland');
				}
	},
	{
		text : 'Portugal',
		onselect : function() {
				D4func('Portugal');
				}
	},
	{
		text : 'Romania',
		onselect : function() {
				D4func('Romania');
				}
	},
	{
		text : 'Slovakia',
		onselect : function() {
				D4func('Slovakia');
				}
	},
	{
		text : 'Slovenia',
		onselect : function() {
				D4func('Slovenia');
				}
	},
	{
		text : 'Spain',
		onselect : function() {
				D4func('Spain');
				}
	},
	{
		text : 'Sweden',
		onselect : function() {
				D4func('Sweden');
				}
	},
	{
		text : 'Eastern Europe',
		onselect : function() {
				D4func('EasternEurope');
				}
	},
	{
		text : 'Northern Europe',
		onselect : function() {
				D4func('NorthernEurope');
				}
	},
	{
		text : 'Southern Europe',
		onselect : function() {
				D4func('SouthernEurope');
				}
	},
	{
		text : 'Western Europe',
		onselect : function() {
				D4func('WesternEurope');
				}
	}, {
		text : 'All Europe',
		onselect : function() {
				D4func('AllEurope');
		}
	}];
	Sandcastle.addToolbarMenu(options);

	function D4func (country) {
		
		var promise = Cesium.GeoJsonDataSource.load('static/topojson/MyEurope2.topojson');
		promise.then(function(dataSource) {
			viewer.dataSources.add(dataSource);
			viewer.zoomTo(dataSource);
			
			//Get the array of entities
			var entities = dataSource.entities.values;
			var PercenSampled = new Cesium.SampledProperty(Number);
			var colorHash = {};
			for (var i = 0; i < entities.length; i++) {
				//For each entity, create a random color based on the state name.
				//Some states have multiple entities, so we store the color in a
				//hash so that we use the same color for the entire state.
				var entity = entities[i];
				var name = entity.name;
				var color = colorHash[name];
				if (!color) {
					color = Cesium.Color.fromAlpha(Cesium.Color.fromRandom(), 1);
					colorHash[name] = color;
				}
				
				//Set the polygon material to our random color.
				entity.polygon.material = color;
				entity.description = '<object width="450" type="text/html" data="static/data/'+name+'.html"></object><img src="static/img/'+name+'.png" height="270" width="450">';
				
				if (name == country){
					entity.show = true;
				} else if ((name == "Bulgaria" || name =="Hungary" || name=="Poland" || name=="Romania" || name=="Slovakia") && country=="EasternEurope"){
					entity.show = true;
				} else if ((name == "Denmark" || name =="Estonia" || name=="Iceland" || name=="Ireland" || name=="Latvia" || name=="Lithuania" || name=="Sweden") && country=="NorthernEurope"){
					entity.show = true;
				} else if ((name == "Croatia" || name == "Greece" || name == "Italy" || name == "Portugal" || name == "Slovenia" ||name =="Spain") && country=="SouthernEurope"){
					entity.show = true;
				} else if ((name == "Austria" || name =="Belgium" || name =="France" || name =="Germany" || name =="Luxembourg" || name =="Netherlands") && country=="WesternEurope"){
					entity.show = true;
				} else if (country=="AllEurope") {
					entity.show = true;
				} else {
					entity.show = false;
				}
				
				entity.polygon.fill = true;
				//Remove the outlines.
				entity.polygon.outline = false;
				
				
				try {
					for (var j = 0; j < entity.properties.PERCEN_RENO.length; j++) {
						var year = entity.properties.PERCEN_RENO[j][0];
						var percent = entity.properties.PERCEN_RENO[j][1];
					
						PercenSampled.addSample(Cesium.JulianDate.fromIso8601(year), percent*5000);
						
					}
					//Extrude the polygon based on the state's PERCEN_RENO.  Each entity
					//stores the properties for the GeoJSON feature it was created from
					//Since the PERCEN_RENO is a huge number, we divide by 50.
					entity.polygon.extrudedHeight = PercenSampled;
					PercenSampled=new Cesium.SampledProperty(Number);
					
					//Adding the property of percentage to show in the box dialog
					entity.addProperty('percentage');
					entity.percentage = PercenSampled;
				}
				catch(e) {
					console.log("Without percentage")
				}
			}

		}).otherwise(function(error){
			//Display any errrors encountered while loading.
			window.alert(error);
		});

	};
	
	//Reset the scene when switching demos.
	Sandcastle.reset = function() {
	  viewer.dataSources.removeAll();
	  
		viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo){
		
			FlyToEurope()
			//Cancel other functionality of the home button
			commandInfo.cancel = true;
		});
	};

	//Set the camera to a EU centered tilted view and switch back to moving in world coordinates.
	// Create the function flytoEurope. Put aprrox coordinates to your data
	function FlyToEurope (){
		viewer.camera.flyTo({
			destination : Cesium.Cartesian3.fromDegrees(6.14, 30.7, 5000000.0),
			orientation : {
				heading : Cesium.Math.toRadians(0.0),
				pitch : Cesium.Math.toRadians(-70.0),
				roll : 0.0
			}
		});
	};

	Cesium.Viewer.infoBox = true;

	//Sandcastle_End
	Sandcastle.finishedLoading();	
	document.getElementById("z1").style.visibility = "hidden"; //Hide the loading gif
}

if (typeof Cesium !== "undefined") {
    startup(Cesium);
} else if (typeof require === "function") {
    require(["Cesium"], startup);
}