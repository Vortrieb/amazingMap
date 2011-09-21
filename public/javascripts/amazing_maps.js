/**
 * Amazing Maps for jQuery
 *
 * @author Nils Riedemann (@nerdism)
 */

(function($) {
  $.fn.amazingMap = function(method) {
    var settings = {
      zoom: 8
    };

    var methods = {

      /**
      * initialize plugin
      */
      init: function(data) {
              // override default settings if specified
              if(data && data.settings) {
                $.extend(settings, data.settings);
              }

              return this.each(function() {
                var map = new google.maps.Map(this, {
                  zoom: 8,
                  center: new google.maps.LatLng(-34.397, 150.644),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                });
              });
            },

      /**
       * create a marker
       *
       * @param data JSON
       * @return googleMarker
       */
      createMarker: function(data) {
                      var marker;
                      return marker;
                    }
    };

    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method: ' + method + ' not found in amazingMaps');
    }
  };
})(jQuery);
