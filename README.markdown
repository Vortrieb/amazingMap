
# AmazingMap

A simple jQuery-Wrapper for the Google-API.

<div id="amazingMap" style="width:100%;height:100px;"></div>

### In Development

This Plugin is just at its beginning and we appreciate any help - be it in code
documentation or just feedback. We know there is still a lot missing and the
Roadmap will continuosly grow. But since we use this ourselves in production it
is likely to be updated as we scratch new use-cases.

Feel free to fork and contribute!

## Introduction

We needed an easy way to embed a google map onto a page, so easy that event
people with only very very basic jQuery-skills are able to embed 'em - whilst
embracing the jQuery-Syntax and be able to control the map externally.

## Installation

Make sure you include the `amazing_map.js` after jquery and the google-map
api; like this:

    <script src="http://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript" ></script>
    <script src="path/to/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="path/to/amazing_maps.js" type="text/javascript" charset="utf-8"></script>

## Usage

### Initialization

We just need a container for our map:

    <div id="myMap" style="width:320px;height:240px"></div>

To transform the container into a map, simply:

    $('#myMap').amazingMap();

Only this line is needed to initialize a google map. Though there are no
markers, and it simply shows the whole world, which is not quite usefull. To
place a Marker on the map, just pass it to amazingMap();

    $('#myMap').amazingMap({
      marker: {
        title: "Vortrieb",
        description: "<h2>Vortrieb</h2><p>Büro für Netzpräsens</p>",
        position: "Elsasser Straße 27, 28211 Bremen"
        // Note that you can define the position with lat and lng as well:
        // position: [12.3, -45.6],
      }
    });

This will put a marker on the Map but zoom and center won't yet be changed. We
can either pass `center` and `zoom` - or call functions to center and zoom the
map.

    // Assuming the Map was initialized as above
    $('#myMap').amazingMap('setCenter', 'Bremen, Germany');
    $('#myMap').amazingMap('setZoom', 5);

We can even add a marker later on. 
    
    // Assuming the example code from above 
    $('#myMap').amazingMap('addMarker', 'Hamburg');
    // Yeah, that's really all that is mandatory for a marker

## Advanced Usages

### Custom Markers

To use a custom marker simply provide the url to the icon:

    $('#myMap').amazingMap({
      marker: {
        position: 'Bremen',
        icon: 'http://placekitten.com/20/20',
      }
    })

    // if your icons needs a shadow to pop out, you can define one too!
    $('#myMap').amazingMap({
      marker: {
        position: 'Bremen',
        icon: {
          url: 'http://placekitten.com/20/20',
          shadow: 'http://placekitten.com/60/60'
        }
      }
    })

### Styles

Since the third iteration of the google API supports styled map, so does
amazingMap:

    $('#mapRoutedTo').amazingMap({
      center: "Bremen",
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

The way to define styles looks a bit confusing at first, but it is just what
google's [style-wizard][] gives us when exporting as JSON.

[style-wizard]: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
### Routes

amazingMap already supports route-searches:

    $('#mapRoutedTo').amazingMap({
      center: "Bremen",
      marker: "Elsasser Straße 27, 28209 Bremen",
      routeTo: "Elsasser Straße 27, 28209 Bremen",
      zoom: 10
    });

## Roadmap / Todos

### Documentation
- create a github-page
- provide more examples
- create a thorough API

### Interface
- options to manipulate the ui of google-maps (buttons etcpp)

### Route-Searching:
- create more flexible options:
  - a way to define where the form should be placed
  - a way to define a custom template 

### Navigating
- add support for zoom level relative to bounds

### Installation
- faciliate installation routine by automatically load google-map-api if
  necessary

## LICENSE

    Copyright (C) 2011 by Nils Riedemann (vortrieb)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

>  vim: set ts=8 sw=2 tw=79 ft=markdown:

