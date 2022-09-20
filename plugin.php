<?php
/**
 * Plugin Name:       Easy Accordion Block
 * Description:       A custom Gutenberg Block developed with Gutenberg Native Components.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       easy-accordion-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [esab] && [ESAB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */

final class ESAB_BLOCKS_CLASS {
	public function __construct() {

		// define constants
		$this->esab_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'esab_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'esab_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'esab_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'esab_external_libraries' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function esab_define_constants() {
		define( 'ESAB_VERSION', '1.0.0' );
		define( 'ESAB_URL', plugin_dir_url( __FILE__ ) );
		define( 'ESAB_LIB_URL', ESAB_URL . 'includes/' );		
	}

	/**
	 * Blocks Registration 
	 */

	public function esab_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function esab_blocks_init() {
		// register single block
		$this->esab_register_block( 'accordion' );
	}

	/**
	 * Register Block Category
	 */

	public function esab_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'esab-blocks',
					'title' => __( 'Easy Accordion', 'easy-accordion-block' ),
				),
			),
			$categories,
		);
	}
	
	/**
	 * Enqueue Block Assets
	 */
	public function esab_external_libraries() {
		// Editor CSS
		if( is_admin() ) {
			wp_enqueue_style( 'esab-editor-css', ESAB_LIB_URL . 'css/editor.css', array(), ESAB_VERSION );
		}
		// enqueue JS
		wp_enqueue_script( 'esab-lib', ESAB_LIB_URL . 'js/accordion.js', array('jquery'), ESAB_VERSION, true );
	}

}

/**
 * Kickoff
*/

ESAB_BLOCKS_CLASS::init();