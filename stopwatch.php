<?php

/*
Plugin Name: Stopwatch Shortcode
Description: Play. Pause. Stop. That's it. Insert into any piece of content with <code>[stopwatch]</code>.
Version: 1.0.0
Author: Nick Ohrn of Plugin-Developer.com
Author URI: http://plugin-developer.com/
*/

class Shortcode_Stopwatch {
	public static function init() {
		self::_add_actions();
		self::_add_filters();
		self::_add_shortcodes();
	}

	private static function _add_actions() {
		if(is_admin()) {

		} else {
			add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueue_resources'));
		}

	}

	private static function _add_filters() {

	}

	private static function _add_shortcodes() {
		add_shortcode('stopwatch', array(__CLASS__, 'shortcode'));
	}

	#region Shortcode

	public static function shortcode($atts, $content = null) {
		ob_start();
		include('views/stopwatch.php');
		return ob_get_clean();
	}

	#endregion Shortcode

	#region Frontend Resources

	public static function enqueue_resources() {
		wp_enqueue_script('shortcode-stopwatch', plugins_url('resources/stopwatch.js', __FILE__), array('jquery'), '1.0.0', true);
		wp_enqueue_style('shortcode-stopwatch', plugins_url('resources/stopwatch.css', __FILE__), array('jquery'), '1.0.0', true);
	}

	#endregion Frontend Resources
}

Shortcode_Stopwatch::init();
