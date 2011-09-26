/**
 * Amazing Maps for jQuery
 *
 * @author Nils Riedemann (@nerdism)
 */

(function($) {
  $.fn.amazingMap = function(method) {
    var map;
    var settings = {
      zoom: 1,
      center: [0, 0],
      routeFrom: undefined,
      mapTypeId: google.maps.MapTypeId.ROADMAP 
    };

    var methods = {
      /**
      * initialize plugin
      */
      init: function(data) {
        // override default settings if specified
        if(data && data) {
          $.extend(settings, data);
        }

        return this.each(function() {
          var mapOptions = {};

          if(settings.mapTypeId) {
            mapOptions.mapTypeId = settings.mapTypeId;
          }

          if(settings.zoom)  {
            mapOptions.zoom = settings.zoom;
          }

          if(settings.center) {
            mapOptions.center = new google.maps.LatLng(
              settings.center[0],
              settings.center[1]
            );
          }

          map = new google.maps.Map(this, mapOptions);

          if(settings.marker) {
            methods.addMarker(map, settings.marker)
          } else if (settings.markers) {
            for (var i = 0; i < settings.markers.length; i++) {
              methods.addMarker(map, settings.markers[i]);
            };
          }
        });
      },

      addMarker: function(map, markerOptions) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            markerOptions.position[0],
            markerOptions.position[1]
          ),
          map: map,
          title: markerOptions.title
        });

        var infowindow = new google.maps.InfoWindow({
          content: markerOptions.description
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      }
    };

    if(methods[method]) {
      return methods[method].apply(
        this, 
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method: ' + method + ' not found in amazingMaps');
    }
  };
})(jQuery);

// vim: set ts=8 sw=2 tw=79 :
