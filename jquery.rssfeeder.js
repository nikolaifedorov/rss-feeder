/*
 * jQuery RSS/ATOM Feed Plugin
 * https://github.com/nikolaifedorov/rss-feeder
 * Author : Nikolai Fedorov
 */

(function($) {


  var engines = {
    "Google Feed API": function () {
      var that = this;

      function url (settings) {
        return "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + settings.maxCount +
               "&output=json&q=" + encodeURIComponent(settings.feedUrl) + "&hl=en&callback=?";
      }

      return {
        fetcher: function (settings) {
          $.ajax({
            url: url(settings),
            dataType: "json",
            success: function(data) {
              console.log(data.responseData.feed.entries);
            }
          });
        }
      };
    },

    "jQuery Ajax": function() {
      return {
        fetcher: function (settings) {
          $.ajax({
            url: settings.feedUrl,
            type: "GET",
            contentType: "application/rss+xml",
            success: function(data) {
              //var $xml = $(data);
              console.log(data);
              // $xml.find("item").each(function() {
              // });
            }
          });
        }
      };
    }
  };

  var urlOptions = {
    feedUrl: "http://ria.ru/export/rss2/science/index.xml",
    maxCount: 5
  };

  var defaults = {
    engine: "Google Feed API"
  };

  var methods = {
    init: function(settings) {
      settings = jQuery.extend({}, urlOptions, defaults, settings);

      var engine = engines[settings.engine]();

      window.settings = settings;
      window.engine = engine;

      engine.fetcher(settings);
    }
  };

  $.fn.rssfeeder = function( settings ) {
    if (typeof(settings) === 'object' || !settings ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Incorrect arguments: <' +  method + '>.' );
    }
  };

})(jQuery);