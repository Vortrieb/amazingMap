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
      description: "<h2>Vortrieb</h2><p>Büro für Netzpräsens</p>",
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
