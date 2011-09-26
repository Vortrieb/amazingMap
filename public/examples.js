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
});
