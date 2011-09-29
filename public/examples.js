$(function() {
  $('#map').amazingMap();

  $('#markerMap').amazingMap({
    marker: {
      position: [0,0],
      title: "Example",
      description: "Hello!"
    }
  });

  $('#multipleMarkerMap').amazingMap({
    markers: [
      {
        position: [10, 20],
        title: "Foobar",
        description: "Description"
      },
      {
        position: [30, 40],
        title: "Barfoo",
        description: "Some other description"
      }
    ]
  });

  var markers = {
    vortrieb: {
      title: "Vortrieb",
      description: "<p><strong>Vortrieb</strong> – Büro für Netzpräsens</p>",
      position: "Elsasser Straße 27, 28211 Bremen",
      icon: "http://placekitten.com/20/20"
    },

    domsheide: {
      title: "Domsheide",
      description: "Domsheide in Bremen",
      position: "Domsheide, Bremen",

      icon: {
        url: "http://placekitten.com/10/10",
        shadow: "http://placekitten.com/20/20"
      }
    }
  };

  $('#markerByAddress').amazingMap({
    marker: markers.vortrieb
  });

  $('#markerByAddressAndCenteredByAddress').amazingMap({
    marker: markers.vortrieb,
    center: markers.vortrieb.position,
    zoom: 8
  });

  $('#zoomedToBounds')
  .amazingMap({
    markers: [markers.vortrieb, markers.domsheide],
    bounds: true
  });

  $('#styledMap').amazingMap({
    style: [ {
        featureType: "all",
        elementType: "all",
        stylers: [ { hue: "#009eff" } ]
      },{
        featureType: "landscape",
        elementType: "all",
        stylers: [ { lightness: 100 } ]
      },{
        featureType: "poi.business",
        elementType: "all",
        stylers: [ { lightness: 100 } ]
      },{
        featureType: "water",
        elementType: "all",
        stylers: [ { lightness: -20 } ]
      }
    ],
    center: "Bremen",
    zoom: 10
  });

  $('#mapRoutedTo').amazingMap({
    center: "Bremen",
    marker: "Elsasser Straße 27, 28209 Bremen",
    routeTo: "Elsasser Straße 27, 28209 Bremen",
    zoom: 10,
    style: [
      {
        stylers: [
          { lightness: -45 },
          { saturation: -100 }
        ]
      },{
        featureType: "road",
        stylers: [ { lightness: 100 } ]
      },{
        elementType: "labels",
        stylers: [ { visibility: "off" } ]
      }
    ]
  });

  $('#sandbox').amazingMap({
    marker: markers.vortrieb
  });

  setTimeout(function() {
    $('#sandbox').amazingMap('setCenter', 'Bremen, Germany');
    $('#sandbox').amazingMap('setZoom', 5);
    $('#sandbox').amazingMap('addMarker', {
      position: 'Hamburg'
    });
  }, 2000);

});
