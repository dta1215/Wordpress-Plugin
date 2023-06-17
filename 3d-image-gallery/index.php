<?php
/**
 * Plugin Name: Image Gallery - Block
 * Description: Create and display photo gallery/photo album
 * Version: 1.0.5
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: image-gallery
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'BIGB_PLUGIN_VERSION', isset($_SERVER['HTTP_HOST']) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.5' );
define( 'BIGB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Image Gallery
class BIGBImageGallery{
	function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}

	function onInit() {
		wp_register_style( 'bigb-image-gallery-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], BIGB_PLUGIN_VERSION ); // Backend Style
		wp_register_style( 'bigb-image-gallery-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], BIGB_PLUGIN_VERSION ); // Both Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'bigb-image-gallery-editor-style',
			'style'				=> 'bigb-image-gallery-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'bigb-image-gallery-editor-script', 'image-gallery', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		$className = $className ?? '';
		$bigbBlockClassName = 'wp-block-bigb-image-gallery ' . $className . ' align' . $align;

		ob_start(); ?>
		<div class='<?php echo esc_attr( $bigbBlockClassName ); ?>' id='bigbImageGallery-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new BIGBImageGallery;