
var markers = [//{{{
  {
    position: [45, 67],
    title: "FooBar",
    description: "<strong>FooBar</strong>"
  },
  {
    position: [45, 68],
    title: "BarFoo",
    description: "<strong>BarFoo</strong>"
  }
];//}}}
// Google Map Spy {{{
var google = function() { };
    google.maps = {
      Map : function(options) {
      },
      LatLng : function(lat,lng) {
      },
      MapTypeId : {
        ROADMAP: 'ROADMAP'
      },
      Marker : function(options){
      },
      InfoWindow: function(options){
      },
      event: {
        addListener: function(element, event, callback) {
        }
      }
    };
//}}}

describe('jQuery.amazingMap()', function() {
  var $map, $element;

  beforeEach(function() {
    loadFixtures('map_fixture.html');

    spyOn(google.maps, 'Map').andCallFake(function() {
      return "a map";
    });

    spyOn(google.maps, 'LatLng').andCallFake(function(lat, lng) {
      return [lat, lng];
    });

    spyOn(google.maps, 'Marker');
    spyOn(google.maps, 'InfoWindow');
    spyOn(google.maps.event, 'addListener')

    $element = $('#map');
    $map     = $element[0];
  });

  describe('initialization without parameters', function() {//{{{
    beforeEach(function() {
      $element.amazingMap();
    });

    it('should create a map with some default values', function() {//{{{
      expect(google.maps.LatLng).toHaveBeenCalledWith(0, 0);
      expect(google.maps.Map).toHaveBeenCalledWith(
        $map, {
          zoom   : 1,
          center : google.maps.LatLng(0,0),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      );
    });//}}}
    it('should not create a marker', function() {//{{{
      expect(google.maps.Marker).not.toHaveBeenCalled();
    });//}}}
  });//}}}
  describe('a map with no settings but one marker', function() {//{{{
    var marker;

    beforeEach(function() {
      $element.amazingMap({
        center: [12, 34],
        zoom: 10,
        marker: markers[0]
      });
    });

    it('should should create a map', function() {//{{{
      expect(google.maps.Map).toHaveBeenCalledWith(
        $map,
        { 
          center: [12, 34],
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      );
    });//}}}
    it('should add a marker to the map', function() {//{{{
      marker = google.maps.Marker;
      expect(google.maps.LatLng).toHaveBeenCalledWith(45, 67);
      expect(marker).toHaveBeenCalledWith({
        position: [45, 67],
        title: "FooBar",
        map: {}
      });
    });//}}}
    it('should add an infoWindow to the marker', function() {//{{{
      // TODO: make these assumptions more specific
      expect(google.maps.InfoWindow).toHaveBeenCalled();
      expect(google.maps.event.addListener).toHaveBeenCalled();
    });//}}}
  });//}}}
});
