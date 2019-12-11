// import './input.scss'

(function($){
  acf.fields.image_with_anchor = acf.field.extend({
    type: 'image_with_anchor',
    $el: null,

    actions: {
      ready: 'initialize',
      append: 'initialize'
    },

    events: {
      'click a[data-name="add"]': 'add',
      'click a[data-name="edit"]': 'edit',
      'click a[data-name="remove"]': 'remove',
      'change input[type="file"]': 'change'
    },

    initialize: function() {
      if (this.o.uploader == 'basic') {
        this.$el.closest('form').attr('enctype', 'multipart/form-data')
      }
    },

    focus: function() {
      this.$el = this.$field.find('.acf-image-uploader')
      this.o = acf.get_data(this.$el)
    },

    add: function() {
      const self = this
      let $field = this.$field
      const $repeater = acf.get_closest_field($field, 'repeater')

      const frame = acf.media.popup({
        title: acf._e('image', 'select'),
        mode: 'select',
        type: 'image',
        field: acf.get_field_key($field),
        multiple: $repeater.exists(),
        library: this.o.library,
        mime_types: this.o.mime_types,

        select: (attachment, i) => {
          if (i > 0) {
            const
              key = acf.get_field_key($field),
              $tr = $field.closest('.acf-row')

            $field = falsev
            $tr.nextAll('.acf-row:visible').each(() => {
              $field = acf.get_field(key, $(this))

              if (! $field) return

              if ($field.find('.acf-image-uploader.has-value').exists()) {
                $field = false
                return
              }

              return false
            })

            if (! $field) {
              $tr = acf.fields.repeater.doFocus($repeater).add()
              if (! $tr) return false
              $field = acf.get_field(key, $tr)
            }
          }

          self.doFocus($field)
          self.render(self.prepare(attachment))

          open_dialog(self.$el)
        }
      })
    },

    prepare: function(attachment) {
      let image = {
        id: attachment.id,
        url: attachment.attributes.url,
        origUrl: attachment.attributes.url
      }

      if (acf.isset(attachment.attributes, 'sizes', this.o.preview_size, 'url')) {
        image.url = attachment.attributes.sizes[this.o.preview_size].url
      }

      return image
    },

    render: function(image) {
      this.$el.find('[data-name="image"]').attr('src', image.url)
      this.$el.find('[data-name="image"]').data('original-url', image.origUrl)
      this.$el.find('[data-name="id"]').val(image.id).trigger('change')

      this.$el.addClass('has-value')
    },

    edit: function() {
      const self = this
      const id = this.$el.find('.acf-image-value').data('image-id')

      const frame = acf.media.popup({
        title: acf._e('image', 'edit'),
        type: 'image',
        button: acf._e('image', 'update'),
        mode: 'edit',
        id: id,

        select: function(attachment, i) {
          self.render(self.prepare(attachment))
        }
      })
    },

    remove: function() {
      const attachment = {
        id: '',
        origUrl: '',
        url: ''
      }

      this.render(attachment)
      this.$el.removeClass('has-value')
    },

    change: function(e) {
      this.$el.find('[data-name="id"]').val(e.$el.val())
    }
  })

  const initialize_field = $el => {
    const
      $field = $el,
      $wrapper = $field.find('.anchor-image-wrapper'),
      $img = $wrapper.find('img'),
      // $xField = $el.find('#anchor-setting-x'),
      // $yField = $el.find('#anchor-setting-y'),
      $okButton = $el.find('.save-anchor-button'),
      $editLink = $el.find('.edit-anchor')

    $field.find('.acf-image-value').on('change', function() {
      const imageId = $(this).val()
      const $value = $field.find('.acf-image-value')

      if (imageId) {
        $field.removeClass('invalid')
        $value.data('image-id', imageId)
        $value.val(JSON.stringify({
          'image': imageId
        }))
      }
    })

    set_marker_position($field)
    $(window).resize(() => set_marker_position($field))
    $img.click(e => handle_image_click($el, e))

    // $xField.change(e => handle_anchor_field_change($el, e, 'x'))
    // $yField.change(e => handle_anchor_field_change($el, e, 'y'))

    $editLink.click(e => {
      e.preventDefault()
      open_dialog($el)
      return false
    })

    $okButton.click(e => {
      e.preventDefault()
      update_anchor_value($el)
      close_dialog($el)
      return false
    })
  }

  const close_dialog = $el => {
    $el.find('.anchor-selection').removeClass('open')
  }

  const handle_anchor_field_change = ($el, e, xy) => {
    const
      $wrapper = $el.find('.anchor-image-wrapper'),
      $marker = $wrapper.find('.marker'),
      newValue = $(e.target).val(),
      attr = (xy == 'x') ? 'position-x' : 'position-y'

    $marker.data(attr, (newValue / 100))
    set_marker_position($el)
  }

  const set_marker_position = $el => {
    const
      $wrapper = $el.find('.anchor-image-wrapper'),
      $img = $wrapper.find('img'),
      $marker = $wrapper.find('.marker')
      // $xField = $el.find('#anchor-setting-x'),
      // $yField = $el.find('#anchor-setting-y')

    if ($img.exists()) {
      setTimeout(() => {
        const markerLeft = $img.position().left + ($img.width() * $marker.data('position-x'))
        const markerTop = $img.position().top + ($img.height() * $marker.data('position-y'))

        // $xField.val(($marker.data('position-x') * 100).toFixed(2))
        // $yField.val(($marker.data('position-y') * 100).toFixed(2))

        $marker.css({
          left: markerLeft + 'px',
          top: markerTop + 'px'
        })
      }, 100)
    }
  }

  const handle_image_click = ($el, e) => {
    const
      $wrapper = $el.find('.anchor-image-wrapper'),
      $img = $wrapper.find('img'),
      $marker = $wrapper.find('.marker'),
      newX = e.offsetX / $img.width(),
      newY = e.offsetY / $img.height()

    $marker.data('position-x', newX)
    $marker.data('position-y', newY)

    set_marker_position($el)
  }

  const open_dialog = $el => {
    const
      $marker = $el.find('.anchor-image-wrapper .marker'),
      imageSrc = $el.find('[data-name="image"]').data('original-url'),
      inputVal = $el.find('.acf-image-value').val(),
      value = JSON.parse(inputVal)

    if (imageSrc) {
      $el.find('.anchor-image-wrapper img').attr('src', imageSrc)
    }

    if (value && value.anchor) {
      $marker.data('position-x', value.anchor.x)
      $marker.data('position-y', value.anchor.y)
    } else {
      $marker.data('position-x', .5)
      $marker.data('position-y', .5)
    }

    set_marker_position($el)
    $el.find('.anchor-selection').addClass('open')
  }

  const update_anchor_value = $el => {
    const
      $wrapper = $el.find('.anchor-image-wrapper'),
      $marker = $wrapper.find('.marker'),
      $input = $el.find('.acf-image-value'),
      origValue = $input.val(),
      x = $marker.data('position-x'),
      y = $marker.data('position-y'),
      $anchorLabelX = $el.find('.anchor-position-x'),
      $anchorLabelY = $el.find('.anchor-position-y')

    let newValue = {}
    if (origValue) {
      newValue = JSON.parse(origValue)
    }

    $anchorLabelX.text((x * 100).toFixed(2))
    $anchorLabelY.text((y * 100).toFixed(2))

    newValue.anchor = {
      x: x,
      y: y
    }

    $input.val(JSON.stringify(newValue))
  }

  if (typeof acf.add_action !== 'undefined') {
   /*
    *  ready append (ACF5)
    *
    *  These are 2 events which are fired during the page load
    *  ready = on page load similar to $(document).ready()
    *  append = on new DOM elements appended via repeater field
    *
    *  @type    event
    *  @date    20/07/13
    *
    *  @param   $el (jQuery selection) the jQuery element which contains the ACF fields
    *  @return  n/a
    */
    acf.add_action('ready append', $el =>
      acf.get_fields({type: 'image_with_anchor'}, $el).each(function() {
        initialize_field($(this))
      })
    )
  }
})(jQuery)
