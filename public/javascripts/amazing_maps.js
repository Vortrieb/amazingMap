/**
 * Amazing Maps for jQuery
 *
 * @author Nils Riedemann (@nerdism)
 */

(function($) {
  $.fn.amazingMap = function(method) {
    var map      = undefined,
        geocoder = new google.maps.Geocoder(),
        markerBounds = new google.maps.LatLngBounds(),
        addresses = {},
        settings = {
          zoom: 1,
          center: [0, 0],
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          bounds: false
    };
    // Methods {{{
    var methods = {

      /**
      * initialize plugin
      *
      * TODO: write a decent explanation of data right here
      *
      * @param JSON data
      */
      init: function(data) {//{{{
        // override default settings if specified
        if(data && data) {
          $.extend(settings, data);
        }

        return this.each(function() {
          map = new google.maps.Map(this, {
            // TODO: create a more intuitive interface for mapTypeId
            mapTypeId: settings.mapTypeId,
            zoom: settings.zoom
          });

          // Store the Map-instance so we don't need to pass it around and can
          // use the methods more intutively.
          $(this).data('map', map);

          // Set the center using our method, so we can use addresses 
          // as well. 
          methods.setCenter(settings.center);

          // Add a marker to the map if give
          if(settings.marker) {
            methods.addMarker(settings.marker)
          } 

          // Add multiple markers to the map
          if (settings.markers) {
            methods.addMarkers(settings.markers);
          }
          return this;
        });
      },//}}}

      /**
       * Calls addMarker() for each item in array.
       *
       * @param Array markers an array of markers 
       */
      addMarkers: function(markers) {//{{{
        // really no rocket science here
        for (var i = 0; i < settings.markers.length; i++) {
          methods.addMarker(settings.markers[i]);
        };

        return this;
      },//}}}

      /**
       * Will add a marker to the map and create an infowindow when
       * a description was given
       *
       * @param JSON marker a hash for a marker
       */
      addMarker: function(markerOptions) {//{{{
        if (typeof(markerOptions.position) == 'string') {
          // A string was given. Propably an address - we're going to hit the
          // Google-API and translate the address and call this method again
          methods.translateToLatLng(markerOptions.position, function(lat, lng) {
            $.extend(markerOptions, { position: [lat, lng] });
            methods.addMarker(markerOptions);
          });
        } else {
          var latlng, marker, infowindow;

          latlng = methods.createLatLng( markerOptions.position );

          // actually add the marker to the map
          marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: markerOptions.title
          });

          // extend the map's bounds for zooming purposes
          markerBounds.extend(latlng);

          // fit the map into the marker's bounds
          if(settings.bounds) {
            methods.zoomToBounds();
          }

          // create an infowindow with the given description
          infowindow = new google.maps.InfoWindow({
            content: markerOptions.description
          });

          // make the marker clickable
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        }

        return this;
      },//}}}

      /**
       * Zoom and center the map so that every marker on the map is visible. If
       * relativeZoomLevel is defined it will zoom out/in by the number given.
       *
       * @param String realtiveZoomLevel expects a string in the format of +1,
       */
      zoomToBounds: function(relativeZoomLevel) {//{{{
        map.fitBounds(markerBounds);
        if(relativeZoomLevel) {
          methods.setZoom(relativeZoomLevel);
        }
        return this;
      },//}}}
      
      /**
       * Set the zoom-level of the map to a fix number
       *
       * @param Integer zoomLevel the desired zoom-level
       */
      setZoom: function(zoomLevel) {//{{{
        // TODO: Relative Zoom-Method
        // if(typeof(zoomLevel) == 'string') {
        //   var _zoomLevel;
        //   switch(zoomLevel.substr(0,1)) {
        //     case '+':
        //       console.log("in");
        //       _zoomLevel = map.getZoom() + parseInt(zoomLevel);
        //       break;
        //     case '-':
        //       console.log("out");
        //       _zoomLevel = map.getZoom() - parseInt(zoomLevel);
        //       break;
        //     default:
        //       _zoomLevel = map.getZoom();
        //   }
        //   if(_zoomLevel && _zoomLevel > 0 && _zoomLevel < 20)
        //     zoomLevel = _zoomLevel;
        // } 
        map.setZoom(zoomLevel);
        
        return this;
      },//}}}
      
      /**
       * Take a String and look-up the corresponding Latitude and Longitude
       * using the GoogleMaps-API
       *
       * @param String address the address to be translated
       * @param Closure callback(result) the callback that will be called,
       * when the address was successfully translated
       */
      translate: function(address, callback) {//{{{
        // simple caching: Store the address as the key and the result as the
        // value of the addresses-hash.
        if(addresses[address]){
          callback(
            addresses[address][0].geometry.location.lat(),
            addresses[address][0].geometry.location.lng()
          );
        } else {
          // no cached address, need to hit that google-service
          geocoder.geocode({
            address: address
          }, function(result, status) {
            if(status == google.maps.GeocoderStatus.OK) {
              // address was successfully translated
              addresses[address] = result;
              callback(result);
            } else {
              // TODO: create a more verbose error-reporting. Maybe create
              // a debug mode?
              $.error('translateError');
            }
          });
        }

        return this;
      },//}}}

      /**
       * Same as the translate()-method yet the callback is called directly
       * called with lat and lng for convenience-reasons.
       *
       * @param String address The address to be translated
       * @param Closure callback(lat, lng) the callback that will be called,
       * when the address was successfully translated
       */
      translateToLatLng: function(address, callback) {//{{{
        methods.translate(address, function(result) {
          callback(
            result[0].geometry.location.lat(),
            result[0].geometry.location.lng()
          );
        });
        return this;
      },//}}}

      /**
       * Sets the center to the given position.
       *
       * @param String/Array latlng When a string is given, an address is
       * assumed and will be translated to [lat, lng] - otherwise an array in
       * that format is expected.
       */
      setCenter: function(latlng) {//{{{
        if(typeof(latlng) == 'string') {
          // an address was given - translate it and call this method again.
          methods.translateToLatLng(latlng, function(lat, lng) {
            methods.setCenter([lat, lng]);
          });
        } else {
          map.setCenter( methods.createLatLng(latlng));
        }

        return this;
      },//}}}

      /**
       * Convenience-method to quickly create a LatLng-Object from an array of
       * lat and lng
       * @param Array position an array with lat and lng as items
       */
      createLatLng: function(position) {//{{{
        return new google.maps.LatLng(
          position[0],
          position[1]
        );
      },//}}}
    };//}}}

    // The switch whether to call init or any other defined methods.
    // When calling a different method than init, reload the map-object from
    // the element's data.
    if(methods[method]) {//{{{
      map = $(this).data('map');

      if(!map) {
        // TODO: maybe initialize it instead of error?
        $.error('map not initialized.');
      }

      return methods[method].apply(
        this, 
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method: ' + method + ' not found in amazingMaps');
    }
  };//}}}
})(jQuery);

// vim: set ts=8 sw=2 tw=79 :
