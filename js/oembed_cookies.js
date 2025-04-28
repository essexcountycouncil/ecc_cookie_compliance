/**
 * @file
 * ecc_oembed_cookies.js
 *
 * Defines the output of the oembed html field based on the consent of marketing cookies.
 */
(function ($, Drupal) {

  Drupal.behaviors.cookiesVideoDisplay = {
    attach: function(context, settings) {
      Drupal.eu_cookie_compliance = Drupal.eu_cookie_compliance || function () {
        (Drupal.eu_cookie_compliance.queue = Drupal.eu_cookie_compliance.queue || [])
          .push(arguments)
      };

      const postPreferencesSaveHandler = function (response) {
        location.reload();
      };
      Drupal.eu_cookie_compliance('postPreferencesSave', postPreferencesSaveHandler);

      if (Drupal.eu_cookie_compliance.getCookieStatus() === 'granted' && $.inArray("marketing_cookies", Drupal.eu_cookie_compliance.getAcceptedCategories()) !== -1) {
        $.each(settings.ecc_cookie_oembed, function(key, val) {
          $('.media-oembed-'+key).html(settings.ecc_cookie_oembed[key].video)
        })
      }
    }
  }
}) (jQuery, Drupal)
