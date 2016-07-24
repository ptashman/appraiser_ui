<?php
function subscribed() {

global $current_user;
get_currentuserinfo();


var_dump(is_subscribed_to_memberful_plan( '12305-sample-plan' ));
var_dump(get_user_meta(1, 'memberful_product', TRUE));
/*
  if ( is_subscribed_to_memberful_plan( '12305-sample-plan' ) ) {
    echo "true";
  } else { 
    echo "false";
  }
*/
  die();
}
add_action("wp_ajax_subscribed", "subscribed");
add_action("wp_ajax_nopriv_subscribed", "subscribed");

function enqueue_theme_styles_scripts() {
  $parent_style = 'cannyon-style';
  wp_register_style( $parent_style, get_template_directory_uri() . '/style.css' );
  wp_enqueue_style( $parent_style );
  wp_register_script( 'main_js', get_stylesheet_directory_uri() . '/main.js' );
  wp_enqueue_script( 'main_js' );
}
add_action( 'wp_enqueue_scripts', 'enqueue_theme_styles_scripts' );

// Define urls for seperate script files
function define_urls() { ?>
    <script type="text/javascript">

        var defineURL = function(item) {
            switch (item) {
                case 'ajaxurl':
                      return "<?php echo admin_url().'admin-ajax.php'?>";
                case 'stylesheet_dir':
                      return "<?php echo get_stylesheet_directory_uri();?>";
                  case 'home':
                      return "<?php echo home_url();?>";
               }
        };
    </script>
<?php }
add_action('wp_head', 'define_urls');

function submit_property() {
  echo "fooooooooooo";
  die();
}
add_action( "wp_ajax_nopriv_submit_property", 'submit_property');
add_action( "wp_ajax_submit_property", 'submit_property');
?>
