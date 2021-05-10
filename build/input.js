!function(t){var a={};function n(e){if(a[e])return a[e].exports;var i=a[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=a,n.d=function(e,i,t){n.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(i,e){if(1&e&&(i=n(i)),8&e)return i;if(4&e&&"object"==typeof i&&i&&i.__esModule)return i;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:i}),2&e&&"string"!=typeof i)for(var a in i)n.d(t,a,function(e){return i[e]}.bind(null,a));return t},n.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(i,"a",i),i},n.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},n.p="",n(n.s=2)}([function(i,e){function t(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?i.exports=t=function(e){return typeof e}:i.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}i.exports=t},function(e,i){e.exports=function(e){throw new Error('"'+e+'" is read-only')}},function(e,i,t){"use strict";t.r(i);var a=t(0),s=t.n(a),n=t(1),u=t.n(n);!function(c){acf.fields.image_with_anchor=acf.field.extend({type:"image_with_anchor",$el:null,actions:{ready:"initialize",append:"initialize"},events:{'click a[data-name="add"]':"add",'click a[data-name="edit"]':"edit",'click a[data-name="remove"]':"remove",'change input[type="file"]':"change"},initialize:function(){"basic"==this.o.uploader&&this.$el.closest("form").attr("enctype","multipart/form-data")},focus:function(){this.$el=this.$field.find(".acf-image-uploader"),this.o=acf.get_data(this.$el)},add:function(){var n=this,r=this,o=this.$field,f=acf.get_closest_field(o,"repeater");acf.media.popup({title:acf._e("image","select"),mode:"select",type:"image",field:acf.get_field_key(o),multiple:f.exists(),library:this.o.library,mime_types:this.o.mime_types,select:function(e,i){if(0<i){var t=acf.get_field_key(o),a=o.closest(".acf-row");if(o=falsev,a.nextAll(".acf-row:visible").each(function(){if(o=acf.get_field(t,c(n))){if(!o.find(".acf-image-uploader.has-value").exists())return!1;o=!1}}),!o){if(u()("$tr"),!(a=acf.fields.repeater.doFocus(f).add()))return!1;o=acf.get_field(t,a)}}r.doFocus(o),r.render(r.prepare(e)),d(r.$el)}})},prepare:function(e){var i={id:e.id,url:e.attributes.url,origUrl:e.attributes.url};return acf.isset(e.attributes,"sizes",this.o.preview_size,"url")&&(i.url=e.attributes.sizes[this.o.preview_size].url),i},render:function(e){this.$el.find('[data-name="image"]').attr("src",e.url),this.$el.find('[data-name="image"]').data("original-url",e.origUrl),this.$el.find('[data-name="id"]').val(e.id).trigger("change"),this.$el.addClass("has-value")},edit:function(){var i=this,e=this.$el.find(".acf-image-value").data("image-id");acf.media.popup({title:acf._e("image","edit"),type:"image",button:acf._e("image","update"),mode:"edit",id:e,select:function(e){i.render(i.prepare(e))}})},remove:function(){this.render({id:"",origUrl:"",url:""}),this.$el.removeClass("has-value")},change:function(e){this.$el.find('[data-name="id"]').val(e.$el.val())}});var r=function(e){e.find(".anchor-selection").removeClass("open")},f=function(e){var i=e.find(".anchor-image-wrapper"),t=i.find("img"),a=i.find(".marker");t.exists()&&setTimeout(function(){var e=t.position().left+t.width()*a.data("position-x"),i=t.position().top+t.height()*a.data("position-y");a.css({left:e+"px",top:i+"px"})},100)},o=function(e,i){var t=e.find(".anchor-image-wrapper"),a=t.find("img"),n=t.find(".marker"),r=i.offsetX/a.width(),o=i.offsetY/a.height();n.data("position-x",r),n.data("position-y",o),f(e)},d=function(e){var i=e.find(".anchor-image-wrapper .marker"),t=e.find('[data-name="image"]').data("original-url"),a=e.find(".acf-image-value").val(),n=JSON.parse(a);t&&e.find(".anchor-image-wrapper img").attr("src",t),n&&n.anchor?(i.data("position-x",n.anchor.x),i.data("position-y",n.anchor.y)):(i.data("position-x",.5),i.data("position-y",.5)),f(e),e.find(".anchor-selection").addClass("open")},l=function(e){var i=e.find(".anchor-image-wrapper").find(".marker"),t=e.find(".acf-image-value"),a=t.val(),n=i.data("position-x"),r=i.data("position-y"),o=e.find(".anchor-position-x"),f=e.find(".anchor-position-y"),c={};a&&(c=JSON.parse(a)),"object"!==s()(c)&&(c={image:c}),o.text((100*n).toFixed(2)),f.text((100*r).toFixed(2)),c.anchor={x:n,y:r},t.val(JSON.stringify(c))};void 0!==acf.add_action&&acf.add_action("ready append",function(e){return acf.get_fields({type:"image_with_anchor"},e).each(function(){var i,t,e,a,n;i=c(this),e=(t=i).find(".anchor-image-wrapper").find("img"),a=i.find(".save-anchor-button"),n=i.find(".edit-anchor"),t.find(".acf-image-value").on("change",function(){var e=c(this).val(),i=t.find(".acf-image-value");e&&(t.removeClass("invalid"),i.data("image-id",e),i.val(JSON.stringify({image:e})))}),f(t),c(window).resize(function(){return f(t)}),e.click(function(e){return o(i,e)}),n.click(function(e){return e.preventDefault(),d(i),!1}),a.click(function(e){return e.preventDefault(),l(i),r(i),!1})})})}(jQuery)}]);