<?php
/*
 * Plugin Name: Advanced Custom Fields: Image with Anchor Field Type
 * Plugin URI: https://github.com/blueshift-tech/acf-image-with-anchor-field
 * Description: An ACF field type that prompts the user to select an anchor point on the image. Useful for images that will be used as backgrounds, or might otherwise be cropped.
 * Version: 1.0
 * Author: Matt Gruhn
 * Author URI: https://getblueshift.tech/
 */

 // exit if accessed directly
 if(! defined('ABSPATH')) exit;

if(! class_exists('acf_plugin_image_with_anchor')):

class acf_plugin_image_with_anchor {
  var $settings;

  /*
	*  __construct
	*
	*  This function will setup the class functionality
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	void
	*  @return	void
	*/
	function __construct() {
    // settings
    // - these will be passed into the field class.
    $this->settings = array(
      'version'	=> '1.0.0',
      'url'     => plugin_dir_url( __FILE__ ),
      'path'    => plugin_dir_path( __FILE__ )
    );

    // include field
    add_action('acf/include_field_types',	array($this, 'include_field')); // v5
  }

  /*
	*  include_field
	*
	*  This function will include the field type class
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	$version (int) major ACF version. Defaults to false
	*  @return	void
	*/
	function include_field($version = false) {

		// support empty $version
		if(! $version) $version = 5;
		include_once('fields/class-acf-field-image-with-anchor-v' . $version . '.php');
	}
}

new acf_plugin_image_with_anchor();
endif;
