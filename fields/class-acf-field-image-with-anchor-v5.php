<?php
// exit if accessed directly
if(! defined( 'ABSPATH')) exit;

// check if class already exists
if(! class_exists('NAMESPACE_acf_field_FIELD_NAME')) :

class acf_field_image_with_anchor extends acf_field {

 /*
  *  __construct
	*
	*  This function will setup the field type data
	*
	*  @type	function
	*  @date	5/03/2014
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	function __construct($settings) {
		$this->name = 'image_with_anchor';
		$this->label = __('Image with Anchor', 'acf-image_with_anchor');
		$this->category = 'content';
    $this->defaults = array(
      'preview_size' => 'medium'
    );
		$this->settings = $settings;

    parent::__construct();
	}

 /*
	*  render_field_settings()
	*
	*  Create extra settings for your field. These are visible when editing a field
	*
	*  @type	action
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field (array) the $field being edited
	*  @return	n/a
	*/
	function render_field_settings($field) {
    acf_render_field_setting($field, array(
      'label'         => __('Preview Size', 'acf'),
      'instructions'  => __('Shown when entering data', 'acf'),
      'type'          => 'select',
      'name'          => 'preview_size',
      'choices'       =>  acf_get_image_sizes()
    ));
	}

 /*
  *  render_field()
  *
  *  Create the HTML interface for your field
  *
  *  @param   $field (array) the $field being rendered
  *
  *  @type    action
  *  @since   3.6
  *  @date    23/01/13
  *
  *  @param   $field (array) the $field being edited
  *  @return  n/a
  */
  function render_field($field) {
    acf_enqueue_uploader();
    $field_data = $this->get_field_data($field);

    $div_atts = array(
      'class' => 'acf-image-uploader acf-image-with-anchor',
      'data-field-settings' => json_encode($field),
      'data-preview_size' => $field['preview_size']
    );

    $input_atts = array(
      'type' => 'hidden',
      'name' => $field['name'],
      'value' => htmlspecialchars($field['value']),
      'class' => 'acf-image-value',
      'data-name' => 'id',
			'data-image-id' => $field_data->image
    );

    $url = '';

    if ($field_data->image) {
      $div_atts['class'] .= ' has-value';
      $preview_atts = wp_get_attachment_image_src($field_data->image, $field['preview_size']);
      $url = $preview_atts[0];
    }
?>
<div <?php acf_esc_attr_e($div_atts); ?>>
  <div class="acf-hidden">
    <input <?php acf_esc_attr_e($input_atts); ?>/>
  </div>
  <div class="view show-if-value acf-soh">
    <ul class="acf-hl acf-soh-target">
      <li><a class="acf-icon -pencil dark" data-name="edit" href="#"><i class="acf-sprite-edit"></i></a></li>
      <li><a class="acf-icon -cancel dark" data-name="remove" href="#"><i class="acf-sprite-delete"></i></a></li>
    </ul>
    <img data-name="image" src="<?php echo $url; ?>" alt=""/>
		<div class="edit-anchor-wrapper">
			<?php _e('Anchor: ', 'acf-image_with_anchor'); ?>&nbsp;
			<span class="anchor-position-x"><?php echo round($field_data->anchor->x * 100, 2); ?></span>%&nbsp;
			<span class="anchor-position-y"><?php echo round($field_data->anchor->y * 100, 2); ?></span>%&nbsp;
			<a href="#" class="edit-anchor"><?php _e('Edit', 'acf-image_with_anchor'); ?></a>
		</div>
  </div>
  <div class="view hide-if-value">
      <p><?php _e('No image selected','acf'); ?> <a data-name="add" class="acf-button button" href="#"><?php _e('Add Image','acf'); ?></a></p>
  </div>
  <div class="anchor-selection">
    <div class="anchor-stage">
			<div class="anchor-frame-title">
				<h1><?php _e('Click an on the image to select an anchor point', 'acf-image_with_anchor'); ?></h1>
			</div>
			<div class="stage-inner">
				<div class="anchor-image-wrapper">
					<img src="<?php echo $field_data->image_source; ?>" data-width="<?php echo $field_data->width; ?>" data-height="<?php echo $field_data->height; ?>" />
					<div class="marker" data-position-x="<?php echo $field_data->anchor->x; ?>" data-position-y="<?php echo $field_data->anchor->y; ?>"></div>
				</div>
				<div class="sidebar">
					<p class="description">
						<?php _e('The anchor position is used to center the image. If the image must be cropped to fit, especially on smaller screens, the image will be cropped around the anchor.', 'acf-image_with_anchor') ?>
					</p>
				</div>
			</div>
			<div class="anchor-frame-footer">
				<a href="#" class="button button-large save-anchor-button"><?php _e('Save', 'acf-image_with_anchor'); ?></a>
			</div>
    </div>
  </div>
</div>
<?php
  }

 /*
  *  input_admin_enqueue_scripts()
  *
  *  This action is called in the admin_enqueue_scripts action on the edit screen where your field is created.
  *  Use this action to add CSS + JavaScript to assist your render_field() action.
  *
  *  @type    action (admin_enqueue_scripts)
  *  @since   3.6
  *  @date    23/01/13
  *
  *  @param   n/a
  *  @return  n/a
  */
  function input_admin_enqueue_scripts() {
    $dir = plugin_dir_url(__FILE__);

    wp_register_script('acf-input-image_with_anchor', "{$dir}../build/input.js", array('acf-input', 'imgareaselect'));
    wp_register_style('acf-input-image_with_anchor', "{$dir}../build/style.css", array('acf-input'));

    wp_enqueue_script(['acf-input-image_with_anchor']);
    wp_enqueue_style(['acf-input-image_with_anchor', 'imgareaselect']);
  }

 /*
  *  update_value()
  *  Implement this function to avoid parent function taking over and trying to validate json data
  */
  function update_value( $value, $post_id, $field ) {
		return $value;
  }

 /*
	*  validate_value()
	*
	*  This filter is used to perform validation on the value prior to saving.
	*  All values are validated regardless of the field's required setting. This allows you to validate and return
	*  messages to the user if the value is not correct
	*
	*  @type    filter
	*  @date    11/02/2014
	*  @since   5.0.0
	*
	*  @param   $valid (boolean) validation status based on the value and the field's required setting
	*  @param   $value (mixed) the $_POST value
	*  @param   $field (array) the field array holding all the field options
	*  @param   $input (string) the corresponding input name for $_POST value
	*  @return  $valid
	*/
	function validate_value( $valid, $value, $field, $input ){
		return $valid;
	}

 /*
	*  format_value()
	*
	*  This filter is appied to the $value after it is loaded from the db and before it is returned to the template
	*
	*  @type    filter
	*  @since   3.6
	*  @date    23/01/13
	*
	*  @param   $value (mixed) the value which was loaded from the database
	*  @param   $post_id (mixed) the $post_id from which the value was loaded
	*  @param   $field (array) the field array holding all the field options
	*
	*  @return  $value (mixed) the modified value
	*/
	function format_value($value, $post_id, $field) {
		return $value;
	}

  function get_field_data($field) {
    $data = new stdClass();
    $data->image = '';
    $data->image_source = '';
		$data->width = '';
		$data->height = '';
    $data->anchor = new stdClass();
		$data->anchor->x = .5;
		$data->anchor->y = .5;

    if (empty($field['value'])) {
      return $data;
    }

    $raw_data = json_decode($field['value']);

    if (! is_object($raw_data)) {
      $data->image = $raw_data;
    }
		else {
			$data->image = $raw_data->image;
		}

		if (is_object($raw_data->anchor)) {
			$data->anchor = $raw_data->anchor;
		}

		$src = wp_get_attachment_image_src($data->image, 'full');
		$data->image_source = $src[0];
		$data->width = $src[1];
		$data->height = $src[2];

    return $data;
  }
}

new acf_field_image_with_anchor($this->settings);
endif;
