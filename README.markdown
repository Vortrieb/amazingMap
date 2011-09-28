# AmazingMap

A simple jQuery-Wrapper for the Google-API.

## Introduction

We needed an easy way to embed a google map onto a page, so easy that event
people with only very very basic jQuery-skills are able to embed 'em - whilst
embracing the jQuery-Syntax and be able to control the map externally.

## Installation

TODO

## Usage

### Initialization

    $('#myMap').amazingMap();

Only this line is needed to initialize a google map. Though there are no
markers, and it simply shows the whole world, which is not quite usefull. To
place a Marker on the map, just pass it to amazingMap();

    $('#myMap').amazingMap({
      marker: {
        title: "Vortrieb",
        description: "<h2>Vortrieb</h2><p>Büro für Netzpräsens</p>",
        position: "Elsasser Straße 27, 28211 Bremen"
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
    $('#sandbox').amazingMap('addMarker', {
      position: 'Hamburg'
    }); // Yeah, that's really all that is mandatory for a marker

## LICENSE

TODO

>  vim: set ts=8 sw=2 tw=79 ft=markdown:
