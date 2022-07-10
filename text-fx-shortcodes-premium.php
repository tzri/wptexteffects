<?php
/*
Plugin Name: Text FX Shortcodes Premium
Description: Create HTML text effects by surrounding your line by shortcodes.
Version: 1.0.3
Author: tzri
Author URI: https://github.com/tzri/
Text Domain: text-fx-shortcodes-premium
License: GPL3
*/

/*
Copyright (C) 2017 Moki-Moki Ios http://mokimoki.net/

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Text FX Shortcodes Premium
 * Shortcodes for text effects
 *
 * @version 1.0.3
 */

if (!defined('ABSPATH')) return;

add_action('init', array(TextEffectShortcodes::get_instance(), 'initialize'));
add_action('admin_notices', array(TextEffectShortcodes::get_instance(), 'plugin_activation_notice'));
register_activation_hook(__FILE__, array(TextEffectShortcodes::get_instance(), 'setup_plugin_on_activation')); 

/**
 * Main class of the plugin.
 */
class TextEffectShortcodes {
	
	const PLUGIN_NAME = "Text FX Shortcodes Premium";
	const VERSION = '1.0.3';
	const TEXT_DOMAIN = 'text-fx-shortcodes-premium';
	
	private static $instance;

	private function __construct() {}
		
	public static function get_instance() {
		if (!isset(self::$instance)) {
			self::$instance = new self();
		}
		return self::$instance;
	}
	
	public function initialize() {
		load_plugin_textdomain(self::TEXT_DOMAIN, FALSE, basename(dirname( __FILE__ )) . '/languages');
		
		add_action('admin_menu', array($this, 'create_options_menu'));
		add_shortcode('blink', array($this, 'text_fx_shortcodes_premium_tag_blink'));
		add_shortcode('marquee', array($this, 'text_fx_shortcodes_premium_tag_marquee'));
		add_shortcode('code', array($this, 'text_fx_shortcodes_premium_tag_code'));
		add_shortcode('rainbow', array($this, 'text_fx_shortcodes_premium_tag_rainbow'));
		add_shortcode('wave', array($this, 'text_fx_shortcodes_premium_tag_wave'));
		add_shortcode('spin', array($this, 'text_fx_shortcodes_premium_tag_spin'));
		add_shortcode('pulsate', array($this, 'text_fx_shortcodes_premium_tag_pulsate'));
		add_shortcode('spell', array($this, 'text_fx_shortcodes_premium_tag_spell'));
		add_shortcode('rotate', array($this, 'text_fx_shortcodes_premium_tag_rotate'));		
		add_shortcode('disco', array($this, 'text_fx_shortcodes_premium_tag_disco'));
		add_shortcode('type', array($this, 'text_fx_shortcodes_premium_tag_type'));
		add_shortcode('crazy', array($this, 'text_fx_shortcodes_premium_tag_crazy'));
		add_shortcode('mock', array($this, 'text_fx_shortcodes_premium_tag_mock'));
		add_action('wp_enqueue_scripts', array($this, 'text_fx_shortcodes_premium_scripts'));
		add_action('admin_enqueue_scripts', array($this, 'text_fx_shortcodes_premium_scripts'));
	}
	
	public function setup_plugin_on_activation() {		
		set_transient('text_fx_shortcodes_premium_activation_notice', TRUE, 5);
		add_action('admin_notices', array($this, 'plugin_activation_notice'));
	}
	
	public function plugin_activation_notice() {
		if (get_transient('text_fx_shortcodes_premium_activation_notice')) {
			echo '<div class="notice updated"><p><strong>'.__('Text Effect Shortcodes plugin is activated. No further actions required &ndash; the plugin is now up and running!', self::TEXT_DOMAIN).'</strong></p></div>';	
		}		
	}
	
	public function text_fx_shortcodes_premium_tag_blink($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-blink">' . $content . '</span>';
	}

	public function text_fx_shortcodes_premium_tag_marquee($atts, $content = '') {
		$width_style = empty($atts['width']) ? '' : 'style="width: '.$atts['width'].'"';
		return '<div class="text-fx-shortcodes-premium-marquee" '.$width_style.'><span class="inner-marquee">' . $content . '</span></div>';
	}

	public function text_fx_shortcodes_premium_tag_code($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-code">' . $content . '</span>';
	}	
	
	public function text_fx_shortcodes_premium_tag_rainbow($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-rainbow">' . $content . '</span>';
	}	
	
	public function text_fx_shortcodes_premium_tag_wave($atts, $content = '') {
		$width_style = empty($atts['font-size']) ? '' : 'style="font-size: '.$atts['font-size'].'%"';
		return '<span class="text-fx-shortcodes-premium-wave">' . $content . '</span>';
	}	

	public function text_fx_shortcodes_premium_tag_spin($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-spin">' . $content . '</span>';
	}		
	
	public function text_fx_shortcodes_premium_tag_pulsate($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-pulsate">' . $content . '</span>';
	}

	public function text_fx_shortcodes_premium_tag_spell($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-spell">' . $content . '</span>';
	}	
	
	public function text_fx_shortcodes_premium_tag_rotate($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-rotate">' . $content . '</span>';
	}	

	public function text_fx_shortcodes_premium_tag_disco($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-disco">' . $content . '</span>';
	}			
		
	public function text_fx_shortcodes_premium_tag_type($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-type">' . $content . '</span>';
	}	
	
	public function text_fx_shortcodes_premium_tag_crazy($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-crazy">' . $content . '</span>';
	}	

	public function text_fx_shortcodes_premium_tag_mock($atts, $content = '') {
		return '<span class="text-fx-shortcodes-premium-mock">' . $content . '</span>';
	}	
	
	public function create_options_menu() {
		add_submenu_page(
			'themes.php',
			'Text FX Shortcodes Premium',
			'Text FX Shortcodes Premium',
			'manage_options',
			'text-fx-shortcodes-premium',
			array($this, 'print_settings_page')
		);
	}	
	
	public function print_settings_page() {
		if (!current_user_can('manage_options')) {
			return;
		}		
		?>
		
		<h1><?php _e('Text Effect Shortcodes'); ?></h1>
							
		<div class="text-fx-shortcodes-premium-settings" style="font-size: 150%">
		
			<h2><span style="color: red" class="dashicons dashicons-heart"></span> <?php _e('Recommendation'); ?></h2>		
				
			<div class="updated notice is-dismissible"><p><?php echo $this->get_recommendation(); ?></p></div>
			
			<h2><span style="color: blue" class="dashicons dashicons-info"></span> <?php _e('Instructions'); ?></h2>		
			
			<p><?php _e('Now you can place shortcodes in your content like this:'); ?></p>
			
			<div class="text-fx-shortcodes-premium-instructions">
			<table>
			<tr>
				<th>Shortcode</th><th>Example</th><th>Result</th>
			</tr>
			<tr>
				<td>blink</td>
				<td>[blink]blinking text[/blink]</td>
				<td><span class="text-fx-shortcodes-premium-blink">blinking text</span></td>
			</tr>
			<tr>
				<td>marquee</td>
				<td>
					[marquee]scrolling text[/marquee]<br/>
					[marquee width="128px"]scrolling text[/marquee]
				</td>
				<td class="wide"><span class="text-fx-shortcodes-premium-marquee" width="128px"><span class="inner-marquee">scrolling text</span></span></td>
			</tr>
			<tr>
				<td>code</td>
				<td>[code]code formatting[/code]</td>
				<td><span class="text-fx-shortcodes-premium-code">code formatting</span></td>
			</tr>	
			<tr>
				<td>rainbow</td>
				<td>[rainbow]rainbow colors[/rainbow]</td>
				<td><span class="text-fx-shortcodes-premium-rainbow">rainbow colors</span></td>
			</tr>	
			<tr>
				<td>disco</td>
				<td>[disco]disco characters[/disco]</td>
				<td><span class="text-fx-shortcodes-premium-disco">disco characters</span></td>
			</tr>				
			<tr>
				<td>wave</td>
				<td>[wave]waving text...[/wave]
				<td><span class="text-fx-shortcodes-premium-wave">waving text...</span></td>
			</tr>
			<tr>
				<td>spin</td>
				<td>[spin]spinning letters[/spin]
				<td><span class="text-fx-shortcodes-premium-spin"><strong>spinning letters</strong><span></td>
			</tr>
			<tr>
				<td>zoom</td>
				<td>[zoom]zooming letters[/zoom]
				<td><span class="text-fx-shortcodes-premium-zoom"><strong>zooming letters</strong><span></td>
			</tr>	
			<tr>
				<td>pulsate</td>
				<td>[pulsate]pulsating text[/pulse]
				<td><span class="text-fx-shortcodes-premium-pulsate"><strong>pulsating text</strong><span></td>
			</tr>
			<tr>
				<td>spell</td>
				<td>[spell]spelled text[/spell]
				<td><span class="text-fx-shortcodes-premium-spell"><strong>spelled text</strong><span></td>
			</tr>	
			<tr>
				<td>rotate</td>
				<td>[rotate]rotating characters[/rotate]
				<td><span class="text-fx-shortcodes-premium-rotate"><strong>rotating characters</strong><span></td>
			</tr>	
			<tr>
				<td>type</td>
				<td>[type]typewriter effect[/type]
				<td><span class="text-fx-shortcodes-premium-type"><strong>typewriter effect</strong><span></td>
			</tr>
			<tr>
				<td>crazy</td>
				<td>[crazy]wicked characters[/crazy]</td>
				<td><span class="text-fx-shortcodes-premium-crazy">wicked characters</span></td>
			</tr>			
			<tr>
				<td>mock</td>
				<td>[mock]mocked text[/mock]</td>
				<td><span class="text-fx-shortcodes-premium-mock">mocked text</span></td>
			</tr>			
			</table>
		</div>
			
		</div>
		
		<?php
	}	
	
	
	public function get_recommendation() {
		switch (rand(0,4)) {
			default: return 'If you are using this plugin, you might also like <a target="_blank" href="https://wordpress.org/plugins/open-wp-seo/">Open WordPress SEO</a> &ndash; the absolutely free and open-source all-in-one toolbox to control SEO on your site.';		
		}
	}		
	
	public function text_fx_shortcodes_premium_scripts() {
		wp_register_script('text-fx-shortcodes-premium', plugin_dir_url(__FILE__) . 'text-fx-shortcodes-premium.js');
		wp_enqueue_script('text-fx-shortcodes-premium', array('jquery'));
		wp_register_style('text-fx-shortcodes-premium', plugin_dir_url(__FILE__) . 'text-fx-shortcodes-premium.css', array('dashicons'));
		wp_enqueue_style('text-fx-shortcodes-premium');		
	}
}
