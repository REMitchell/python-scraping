/*
PAGELAYER
http://pagelayer.com/
(c) Pagelayer Team
*/

var pagelayer_doc_width;

// Things to do on document load
jQuery(document).ready(function(){
	
	// Current width
	pagelayer_doc_width = jQuery(document).width();
	
	// Rows
	jQuery('.pagelayer-row-stretch-full').each(function(){
		pagelayer_pl_row_full(jQuery(this));
	});
	
	jQuery('.pagelayer-anim_heading').each(function(){
		pagelayer_anim_heading(jQuery(this));
	});
	
	// Setup any sliders
	jQuery('.pagelayer-image_slider').each(function(){
		pagelayer_pl_image_slider(jQuery(this));
	});
	
	jQuery('.pagelayer-accordion').each(function(){
		pagelayer_pl_accordion(jQuery(this));
	});
	
	jQuery('.pagelayer-collapse').each(function(){
		pagelayer_pl_collapse(jQuery(this));
	});
	
	jQuery('.pagelayer-tabs').each(function(){
		pagelayer_pl_tabs(jQuery(this));
	});
	
	jQuery('.pagelayer-video').each(function(){
		pagelayer_pl_video(jQuery(this));
	});
	
	jQuery('.pagelayer-image').each(function(){
		pagelayer_pl_image(jQuery(this));
	});
	
	jQuery('.pagelayer-grid_gallery').each(function(){
		pagelayer_pl_grid_lightbox(jQuery(this));
	});
	
	jQuery('.pagelayer-row, .pagelayer-inner_row, .pagelayer-col').each(function(){
		pagelayer_pl_row_video(jQuery(this));
	});
	
	jQuery('.pagelayer-parallax-window img').each(function(){
		pagelayer_pl_row_parallax(jQuery(this));
	});
	
	jQuery('.pagelayer-recaptcha').each(function(){
		pagelayer_recaptcha_loader(jQuery(this));
	});
	
	jQuery('.pagelayer-wp_menu').each(function(){
		pagelayer_primary_menu(jQuery(this));
	});
	
	jQuery('.pagelayer-contact').each(function(){
		pagelayer_contact_form(jQuery(this));
	});
	
	jQuery('.pagelayer-countdown').each(function(){
		pagelayer_countdown(jQuery(this));
	});
	
	jQuery('.pagelayer-testimonial_slider').each(function(){
		pagelayer_pl_testimonial_slider(jQuery(this));
	});
	
	jQuery('.pagelayer-social_grp').each(function(){
		pagelayer_pl_social_profile(jQuery(this));
	});	
	
	jQuery('ul.pagelayer-mega-menu').each(function(){
		pagelayer_mega_menu_position(jQuery(this));
	});	
	
	jQuery('.pagelayer-scroll-to-element').each(function () {
		pagelayer_button_element_scroll(jQuery(this));
	});

	jQuery('.pagelayer-bgimg-slider').each(function () {
		pagelayer_pl_row_slider(jQuery(this));
	});

	jQuery('.pagelayer-stars-container').each(function(){
		pagelayer_stars(jQuery(this));
	});
  
	// We need to call the is visible thing to show the widgets loading effect
	if(jQuery('.pagelayer-counter-content,.pagelayer-progress-container').length > 0){

		// First Call
		pagelayer_counter();
		pagelayer_progress();
		
		jQuery(window).scroll(function() {
			pagelayer_progress();
			pagelayer_counter();
		});
	}
	
	new WOW({boxClass:'pagelayer-wow'}).init();
	
});

// For automatic row change
jQuery(window).resize(function() {
	
	// Primary Menu
	jQuery('.pagelayer-wp_menu').each(function(){
		pagelayer_primary_menu(jQuery(this));
	});
	
	var new_vw = jQuery(document).width();
	
	if(new_vw == pagelayer_doc_width){
		return false;
	}
	
	pagelayer_doc_width = new_vw;
	
	// Remove style
	jQuery('.pagelayer-row-stretch-full').removeAttr('style');
	
	// Set a timeout to prevent bubbling
	setTimeout(function(){
		
		jQuery('.pagelayer-row-stretch-full').each(function(){
			pagelayer_pl_row_full(jQuery(this));
		});
	
	}, 200);
	
});

// Check if element is visible
function pagelayer_isVisible(ele) {
	
	var offset = jQuery(window).height();
	var viewTop = window.pageYOffset;
	var viewBottom = viewTop + offset - Math.min(ele.height(), ele.innerHeight());
	var top = ele.offset().top;
	var bottom = top + ele.innerHeight();
	
	if(top <= viewBottom && bottom >= viewTop){
		return true;
	}
	
	return false;
}

// Get media mode
function pagelayer_get_media_mode(){
	
	if(window.matchMedia("(min-width: "+ (pagelayer_settings['tablet_breakpoint'] + 1) +"px)").matches){
		return 'desktop';
	}
	
	if(window.matchMedia("(max-width: "+ pagelayer_settings['tablet_breakpoint'] +"px) and (min-width: "+ (pagelayer_settings['mobile_breakpoint'] + 1) +"px)").matches){
		return 'tablet';
	}
	
	if(window.matchMedia("(max-width: "+ pagelayer_settings['mobile_breakpoint'] +"px)").matches){
		return 'mobile';
	}
	
	return 'desktop';
}
	  
// Row background video and parallax
function pagelayer_pl_row_video(jEle){
	
	var vEle = jEle.children('.pagelayer-background-video');
	
	// Not a video in the element
	if(vEle.length < 1){
		return true;
	}
	
	var setup = vEle.attr('pagelayer-setup');
	if(setup && setup.length > 0){
		return true;
	}

	var frame_width = vEle.width();
	var frame_height = (frame_width/100)*56.25;
	var height = vEle.height();
	
	if(frame_height < height){
		
		frame_height = height;
		
	}
	
	vEle.children().css({'width':frame_width+'px','height':frame_height+'px'});
	
	vEle.attr('pagelayer-setup', 1);
		
}

// Row background parallax
function pagelayer_pl_row_parallax(jEle){
	
	//Parallax background
	var setup = jEle.attr('pagelayer-setup');
	if(setup && setup.length > 0){
		return true;
	}
	
	new pagelayerParallax(jEle);
	jEle.attr('pagelayer-setup', 1);
}

// Adjust rows
function pagelayer_pl_row_full(jEle){
	
	// Get current width
	var vw = jQuery('html').width();
	
	// Now give the row the width
	jEle.css({'width': vw, 'max-width': '100vw'});
	
	// Set the offset
	jEle.offset({left: 0});
	
	// Set a timeout as well as some themes can interfere with us
	setTimeout(function(){
		jEle.offset({left: 0});
	}, 500);
	
};

// Modal open
function pagelayer_render_pl_modal(param){
	jQuery(param).parent().parent().find('.pagelayer-modal-content').show();
};

// Modal close
function pagelayer_pl_modal_close(param){
	jQuery(param).parent().hide();
}

// Setup the image slider
function pagelayer_pl_image_slider(jEle){
	
	var ul = jQuery(jEle.find('.pagelayer-image-slider-ul'));
	
	// Build the options
	var options = pagelayer_fetch_dataAttrs(ul, 'data-slides-');
	
	pagelayer_owl_init(jEle, ul, options);

}

function pagelayer_get_tab_ele(temp_tabCont){
	
	if(!pagelayer_empty(temp_tabCont.children('.pagelayer-ele-wrap').length)){
		return temp_tabCont.children('.pagelayer-ele-wrap').children('.pagelayer-tab');
	}else{
		return temp_tabCont.children('.pagelayer-tab');
	}
}

function pagelayer_tab_show(el, pl_id) {
	
	var parent_id = jQuery(el).closest('.pagelayer-tabs').attr('pagelayer-id');
	
	var temp_tabCont = jQuery('[pagelayer-id='+pl_id+']').closest('.pagelayer-tabcontainer');
	pagelayer_get_tab_ele(temp_tabCont).hide();
	
	jQuery('[pagelayer-id='+pl_id+']').show();
	
	jQuery(el).parent().find('.pagelayer-tablinks').each(function(){
		jQuery(this).removeClass('active');
	});
	
	jQuery(el).addClass("active");
}

var pagelayer_tab_timers = {};

function pagelayer_pl_tabs(jEle) {
	
	var default_active = '';
	var jEle_id = jEle.attr('pagelayer-id');	

	var tabCont = jEle.children('.pagelayer-tabcontainer');
	var children = pagelayer_get_tab_ele(tabCont);
	
	// Loop thru
	children.each(function(){
		var tEle = jQuery(this);
		var pl_id = tEle.attr('pagelayer-id');
		var title = tEle.attr('pagelayer-tab-title') || 'Tab';
		var func = "pagelayer_tab_show(this, '"+pl_id+"')";
		
		var icon = '';
		if(tEle.attr('pagelayer-tab-icon')){
			icon = tEle.attr('pagelayer-tab-icon');
		}
		
		// Set the default tab
		if(tEle.attr('pagelayer-default_active')){
			default_active = pl_id;
		}
		
		jEle.children('.pagelayer-tabs-holder').append('<span tab-id="'+pl_id+'" class="pagelayer-tablinks" onclick="'+func+'"> <i class="'+icon+'"></i> <span>'+title+'</span></span>');
	});

	// Set the default tab
	if(default_active.length > 0){
		pagelayer_tab_show(jEle.find('[tab-id='+default_active+']'), default_active);
	// Set the first tab as active
	}else{
		var first_tab = jEle.find('[tab-id]').first();
		pagelayer_tab_show(first_tab, first_tab.attr('tab-id'));
	}

	try{
		clearInterval(pagelayer_tab_timers[jEle_id]);
	}catch(e){};
	
	var rotate = parseInt(jEle.attr('pagelayer-tabs-rotate'));
	
	// Are we to rotate
	if(rotate > 0){
		
		var i= 0;
		pagelayer_tab_timers[jEle_id] = setInterval(function () {
			
			if(i >= children.length){
				i = 0;
			}
			
			var tabCont = jEle.children('.pagelayer-tabcontainer');
			var tmp_pl_ele = pagelayer_get_tab_ele(tabCont)[i];
			
			var tmp_btn_ele = jEle.find('.pagelayer-tablinks')[i]
			var tmp_pl_id = jQuery(tmp_pl_ele).attr('pagelayer-id');
			
			jEle.find('.pagelayer-tablinks').each(function(){
				jQuery(this).removeClass('active');
			});
			
			jQuery(tmp_btn_ele).addClass("active");
			pagelayer_tab_show(tmp_btn_ele, tmp_pl_id);
			
			i++;
	   
		}, rotate);
	}
	
}

// Setup the Accordion
function pagelayer_pl_accordion(jEle){
	
	var holder = jEle.find('.pagelayer-accordion-holder');
	var accHolder = jEle.find('.pagelayer-accordion_item');
	var scrolltop = false;
	
	if(accHolder.length < 1){
		return false;
	}
		
	var icon = holder.attr('data-icon');
	var active_icon = holder.attr('data-active_icon');
	
	accHolder.find('.pagelayer-accordion-tabs span i').attr('class', icon);
	var currentActiveTab = jEle.find('.pagelayer-accordion_item.active').first();
	
	// Any URL HASH ?
	var hash = location.hash.slice(1);	
	if(!pagelayer_empty(hash)){
		var scrollTab = jEle.find('#'+hash);
	
		if(!pagelayer_empty(scrollTab) && scrollTab.length > 0){
			currentActiveTab = scrollTab.closest('.pagelayer-accordion_item');
		}
	}
	
	accHolder.find('.pagelayer-accordion-tabs').unbind('click');
	accHolder.find('.pagelayer-accordion-tabs').click(function(){
		
		var currentTab = jQuery(this).closest('.pagelayer-accordion_item');
		
		if(currentTab.hasClass('active')){
			currentTab.removeClass('active').children('.pagelayer-accordion-panel').hide('slow');
			currentTab.find('.pagelayer-accordion-tabs span i').attr('class', icon);
			return true;
		}
		
		accHolder.find('.pagelayer-accordion-tabs span i').attr('class', icon);
		accHolder.removeClass('active').filter(function(index){
			return accHolder[index]!=currentTab[0];
		}).children('.pagelayer-accordion-panel').hide('slow');							
	
		currentTab.addClass('active').children('.pagelayer-accordion-panel').show('slow');
		currentTab.find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	});
	
	// If active first tab from all active tabs
	currentActiveTab.removeClass('active');
	currentActiveTab.find('.pagelayer-accordion-tabs').click();
}

// Setup the Collapse
function pagelayer_pl_collapse(jEle){
	
	var holder = jEle.find('.pagelayer-collapse-holder');
	var tabs = jEle.find('.pagelayer-accordion_item');
		
	if(tabs.length < 1){
		return false;
	}
		
	var setup = tabs.attr('pagelayer-setup');
	var icon = holder.attr('data-icon');
	var active_icon = holder.attr('data-active_icon');
	
	// Any URL HASH ?
	var hash = location.hash.slice(1);	
	if(!pagelayer_empty(hash)){
		var scrollTab = jEle.find('#'+hash);
	
		if(!pagelayer_empty(scrollTab) && scrollTab.length > 0){
			scrollTab.closest('.pagelayer-accordion_item').addClass('active');
		}
	}
	
	var activeTabs = jEle.find('.pagelayer-accordion_item.active');

	tabs.find('.pagelayer-accordion-tabs span i').attr('class', icon);
	jQuery(activeTabs).addClass('active').children('.pagelayer-accordion-panel').show('slow');
	jQuery(activeTabs).find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	// Already setup ?
	if(setup && setup.length > 0){
		tabs.find('.pagelayer-accordion-tabs').unbind('click');
	}

	tabs.find('.pagelayer-accordion-tabs').click(function(){
		
		var currentTab = jQuery(this).closest('.pagelayer-accordion_item');
		
		if(currentTab.hasClass('active')){
			currentTab.removeClass('active').children('.pagelayer-accordion-panel').hide('slow');
			currentTab.find('.pagelayer-accordion-tabs span i').attr('class', icon);
			return true;
		}
			
		currentTab.addClass('active').children('.pagelayer-accordion-panel').show('slow');
		currentTab.find('.pagelayer-accordion-tabs span i').attr('class', active_icon);
		
	});
	
	// Set that we have setup everything
	tabs.attr('pagelayer-setup', 1);
	
}

// Counter
function pagelayer_counter(){
	
	jQuery('.pagelayer-counter-content').each(function(){
		
		var jEle = jQuery(this);
		
		if(pagelayer_isVisible(jEle)){
			
			var setup = jEle.attr('pagelayer-setup');
			
			// Already setup ?
			if(setup && setup.length > 0){
				return true;
			}
			
			var options = {};
			options['duration'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-animation-duration');
			options['delimiter'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-seperator-type');
			options['toValue'] = jEle.children('.pagelayer-counter-display').attr('pagelayer-counter-last-value');					
			jEle.children('.pagelayer-counter-display').numerator( options );
		
			// Set that we have setup everything
			jEle.attr('pagelayer-setup', 1);
			
		}
	});
}

function pagelayer_progress(){
	jQuery('.pagelayer-progress-container').each(function(){
		var jEle = jQuery(this);
		
		if(pagelayer_isVisible(jEle)){
			
			var setup = jEle.attr('pagelayer-setup');
			if(setup && setup.length > 0){
				return true;
			}
			
			var progress_width = jEle.children('.pagelayer-progress-bar').attr('pagelayer-progress-width');
			if(progress_width == undefined){
				progress_width = "1";
			}
			
			var width = 0;
			var interval;
			
			var progress = function(){
				if (width >= progress_width) {
					clearInterval(interval);
				} else {
					width++;
					jEle.children('.pagelayer-progress-bar').css('width', width + '%'); 
					jEle.find('.pagelayer-progress-percent').text(width * 1  + '%');
				}
			}
			interval = setInterval(progress, 30);
			jEle.attr('pagelayer-setup', 1);
			
		}
	});
}

// Dismiss Alert Function
function pagelayer_dismiss_alert(x){
	
	if(!pagelayer_empty(pagelayer_is_live)){
		return;
	}
	
	jQuery(x).parent().parent().fadeOut();
}

// Video light box handler
function pagelayer_pl_video(jEle){
	var videoIframe = jEle.find('.pagelayer-video-iframe');
	// Adding loop, autoplay and mute properties on video before loading 
	videoIframe.on('load', function() {
		
		// Checking of video source if it is youtube or vimeo because 
		// TODO: Need to check, if this is not local file then return
		if(jQuery(this)[0].src.indexOf('youtube.com') != -1 || jQuery(this)[0].src.indexOf('vimeo.com') != -1){
			return;
		}
		
		var vidElm = jQuery(this).contents().find('video');
		var vidSrc = (pagelayer_empty(vidElm[0].src)) ? vidElm.children()[0].src : vidElm[0].src;	
		
		if(vidSrc[vidSrc.indexOf('&loop=')+6] == 1){
			vidElm.attr('loop','loop');
		}
		if(vidSrc[vidSrc.indexOf('&autoplay=')+10] == 0){
			vidElm.removeAttr('autoplay');
			vidElm[0].pause();
		}else if(vidSrc[vidSrc.indexOf('&autoplay=')+10] == 1){
			vidElm.attr('autoplay','');
			vidElm.attr('playsinline','');			
		}
		if(vidSrc[vidSrc.indexOf('&mute=')+6] == 1){
			vidElm[0].muted = "muted";
			vidElm.attr('muted','');	
		}
	});
	
	// A tag will be there ONLY if the lightbox is on
	var overlayval = jEle.find('.pagelayer-video-overlay');	
	var a = jEle.find(".pagelayer-video-holder a");
	
	// No lightbox
	if(a.length < 1 && pagelayer_empty(overlayval)){
		return;
	}

	a.nivoLightbox({
		effect: "fadeScale",
	});
	
	jEle.find(".pagelayer-video-holder .pagelayer-video-overlay").on("click", function(ev) {

		var target = jQuery(ev.target);

		if (!target.parent("a").length) {
			videoIframe[0].src = videoIframe[0].src.replace("&autoplay=0", "rel=0&autoplay=1");
			jQuery(this).hide();
		}
	});
	
}

// Image light box handler
function pagelayer_pl_image(jEle){
	
	// Drag and Drop function for image
	if (typeof pagelayer_preDAndD_image !== "undefined") {
		pagelayer_preDAndD_image(jEle);
	}
	
	// A tag will be there ONLY if the lightbox is on
	var a = jEle.find("[pagelayer-image-link-type=lightbox]");
	
	// No lightbox
	if(a.length < 1){
		return;
	}
	
	a.nivoLightbox({
		effect: "fadeScale",
	});
}

function pagelayer_stars(jEle){

	var setup = jEle.attr('pagelayer-setup');
	if(setup && setup.length > 0){
		return true;
	}
	var count = jEle.attr('pagelayer-stars-count');
		
	if (isNaN(count)) {
		count = '0';
	}
		
	i = 0;
	var stars = "";
	while(i < count){			
		stars +='<div class="pagelayer-stars-icon pagelayer-stars-empty"><i class="fas fa-star" aria-hidden="true"></i></div>';
		i++;
	}

	jEle.empty();
	jEle.append(stars);
	var starsval = jEle.attr('pagelayer-stars-value');
		
	if (isNaN(starsval)) {
		starsval = count;
	}

	starsval = starsval.split('.');		
	var fullstars = starsval[0];
	var value =  starsval[1];
	var halfstar = parseInt(fullstars) + 1;
	var emptystars = parseInt(fullstars) + 2;
	jEle.children('.pagelayer-stars-icon').attr("class","pagelayer-stars-icon");
	jEle.children('.pagelayer-stars-icon:nth-child(-n+'+ fullstars +')').addClass('pagelayer-stars-full'); 
	if(value != undefined){
		jEle.children('.pagelayer-stars-icon:nth-child('+ halfstar +')').addClass('pagelayer-stars-'+value);		
	}else{
		jEle.children('.pagelayer-stars-icon:nth-child('+ halfstar +')').addClass('pagelayer-stars-empty');
	}
	jEle.children('.pagelayer-stars-icon:nth-child(n+'+ emptystars +')').addClass('pagelayer-stars-empty'); 		
	jEle.attr('pagelayer-setup', 1);
}

// Grid Gallery pagination Off On function
function pagelayer_pl_grid_paginate(gridCont, pagination, pageValue, gridValue){
	gridCont.hide();
	pagination.removeClass('active');
	pagination.eq(pageValue).addClass('active');
	gridCont.eq(gridValue).show();
}

//Grid Gallery Lightbox
function pagelayer_pl_grid_lightbox(jEle){
	
	// Grid Gallery pagination settings
	var gridCont = jEle.find('.pagelayer-grid-gallery-container').children();
	var pagination = jEle.find('.pagelayer-grid-gallery-pagination ul').children();
	gridCont.hide();
	gridCont.eq(0).show();
	// Adding event listners to pagination
	jEle.find('.pagelayer-grid-page-item').each(function(){
		jQuery(this).on('click', function(event){
			var text = jQuery(this).text();
			switch(text){
				case '«':
					pagelayer_pl_grid_paginate(gridCont, pagination, 1, 0);
					break;
				case '»':
					pagelayer_pl_grid_paginate(gridCont, pagination, (pagination.length-2), (gridCont.length-1));
					break;
				default:
					pagelayer_pl_grid_paginate(gridCont, pagination, text, text-1);
					break;
			}
		});
	});	

	// A tag will be there ONLY if the lightbox is on
	var a = jEle.find("[pagelayer-grid-gallery-type=lightbox]");
	
	// No lightbox
	if(a.length < 1){
		return;
	}
	
	a.nivoLightbox({
		effect: "fadeScale",
		keyboardNav: true,
		clickImgToClose: false,
		clickOverlayToClose: true,
	});
}

// Is string?
function pagelayer_is_string(str){
   
   if(typeof str == 'string'){
	   return true;
   }
   
   return false;
}

// PHP equivalent empty()
function pagelayer_empty(mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
	if (mixed_var === emptyValues[i]) {
	  return true;
	}
  }

  if (typeof mixed_var === 'object') {
	for (key in mixed_var) {
	  // TODO: should we check for own properties only?
	  //if (mixed_var.hasOwnProperty(key)) {
	  return false;
	  //}
	}
	return true;
  }

  return false;
};

function pagelayer_fetch_dataAttrs(ele, prefix){
	
	var options = {};
	
	jQuery.each(ele.get(0).attributes, function(i, attrib){
		
		//console.log(attrib);
		if(attrib.name.includes(prefix)){
			
			var opt_name = attrib.name.substring(prefix.length);
			
			// Check for any Uppercase attribute
			if(opt_name.includes('-')){
				
				opt_name = opt_name.split('-');
				//console.log(opt_name);
				var opt_arr = [];
				jQuery.each(opt_name, function(key, value) {
					if(key != 0){
						opt_arr.push(value.charAt(0).toUpperCase() + value.slice(1));
					}else{
						opt_arr.push(value);
					}
				});
				//console.log(opt_arr);
				opt_name = opt_arr.join('');
			}
			
			// Make the values correct
			var val = attrib.value;
			if(val == 'true') val = true;
			if(val == 'false') val = false;
			if(jQuery.isNumeric(val)) val = parseInt(val);
			
			options[opt_name] = val;
		}
	});
	
	//console.log(options);
	
	if(options['controls']){
		switch(options['controls']){
			case 'arrows':
				options['nav'] = true;
				options['dots'] = false;
				break;
			case 'pager':
				options['dots'] = true;
				options['nav'] = false;
				break;
			case 'none':
				options['nav'] = false;
				options['dots'] = false;
				break;
		}
	}else{
		options['nav'] = true;
		options['dots'] = true;
	}
	
	if(options['animateIn']){
		switch(options['controls']){
			case 'horizontal':
				options['animateIn'] = 'slideInLeft';
				break;
			case 'vertical':
				options['animateIn'] = 'slideInDown';
				break;
			case 'kenburns':
				options['animateIn'] = 'zoomIn';
				break;
			default:
				options['animateIn'] = options['animateIn'];
		}
	}
	
	if(!options['items']){
		options['items'] = 1;
	}
	options['responsive'] = {
		0:{items: 1},
		500:{items: options['items']}
	}

	options['responsiveRefreshRate'] = 1000;
	
	// If we are in editor don't loop the Owl items
	if (window.location.href.indexOf('pagelayer-live=1') > -1) {
		//console.log('here');
		options['loop'] = false;
	}
	
	return options;
}

function pagelayer_owl_init(jEle, ul, options){
	
	//console.log(options);
	var setup = jEle.attr('pagelayer-setup');

	// Already setup ?
	if(setup && setup.length > 0){
		return true;
	}
	
	var owlCar = ul.pagelayerOwlCarousel(options);
	
	// Refreshing Image slider after first load of page.
	setTimeout(function(){
		owlCar.trigger('refresh.owl.carousel');
	},700);
	
	// To prevent slider drag inside the editable area
	jEle.on('mousedown', function(e){
		var target = e.target;
		
		var isEditable = jQuery(target).closest('[contenteditable="true"]');
		
		if(isEditable.length < 1){
			return;
		}
		
		isEditable.on('mousedown.owl.core dragstart.owl.core selectstart.owl.core touchstart.owl.core touchcancel.owl.core', function(e){
			e.stopPropagation();
		});
		
	});
	
	// Set that we have setup everything
	jEle.attr('pagelayer-setup', 1);
	
}

// recaptcha handler
function pagelayer_recaptcha_loader(jEle, loadScript){
	
	loadScript = loadScript || false;
	
	// Render recaptcha
	var reParam = '';
	
	if(!pagelayer_empty(pagelayer_recaptch_lang)){
		reParam = '&hl='+pagelayer_recaptch_lang;
	}
	
	// Add recaptcha script
	if(pagelayer_empty(window.grecaptcha) && !pagelayer_empty(loadScript)){
		jQuery('body').append('<script src="https://www.google.com/recaptcha/api.js?render=explicit'+reParam+'" async defer></script>');
	}
	
	// Render recaptcha
	var recaptcha_interval = setInterval(function(){
		
		if(!pagelayer_empty(window.grecaptcha)){
			grecaptcha.ready(function() {
				try{			
					var widgetID = grecaptcha.render(jEle.get(0), {'sitekey' : jEle.data("sitekey")});
					jEle.attr('recaptcha-widget-id', widgetID);
				}catch(e){
					console.log("There is some issue in rendering reCaptcha. Please check your recaptcha site-key !");
				}
				
			});
			clearInterval(recaptcha_interval);
		}

	}, 500);
 
}

// Scroll to element button effect
function pagelayer_button_element_scroll(jEle) {

	var speed = parseInt(jEle.attr('pagelayer_scrollto_speed') * 1000);
	var idspacing = 0;
	var scrollId = jEle.attr('pagelayer_scrollto_id');

	if(jEle.attr('pagelayer_scrollto_type') == 'toid'){

		var scrolltoEle = jQuery('#' + scrollId);

		if(pagelayer_empty(scrollId) || scrolltoEle.length < 1){
			return;
		}

		var idpos = parseInt(scrolltoEle.offset().top);
		var spacing = parseInt(jEle.attr('pagelayer_scrollto_id_viewport'));

		if (isNaN(spacing)) {
			spacing = 0;
		}

		idspacing = idpos + spacing;
		
	}

	jEle.on('click', function (e) {
		e.preventDefault();
		jQuery('html, body').animate({ scrollTop: idspacing }, speed);
	});
	
}

////////////
// Freemium
////////////

// Contact Form handler - Premium
function pagelayer_contact_form(jEle){
	
	jEle = jQuery(jEle);
	var id = jEle.attr('pagelayer-id');
	
	// Set pagelayer id to input field
	jEle.find('form input[name="cfa-pagelayer-id"]').val(id);
 
}

// Contact Form Submit handler - Premium
function pagelayer_contact_submit(jEle, e){
	e.preventDefault();
	
	// Checking for required checkboxes.
	for(var checkbox_div of jQuery(jEle).find('.pagelayer-contact-checkbox')){
		checkbox_div = jQuery(checkbox_div);
		if(checkbox_div.attr('required') == 'required'){
			if(pagelayer_empty(checkbox_div.find('input:checked').length)){
				alert('Kindly select the required checkbox');
				return;
			}
		}		
	}
	
	// Trigger an action
	jQuery(document).trigger('pagelayer_contact_submit', e, jEle);
	
	// Disabling submit button with loading animation.
	jQuery(jEle).find('.pagelayer-contact-submit-btn').prop('disabled', true);
	jQuery(jEle).find('.pagelayer-contact-submit-btn .fa-spin').show('0.6');
	
	//var fdata = jQuery(jEle).closest('form').serialize();
	var redirect = jQuery(jEle).find('input[name="cfa-redirect"]');
	var formData = new FormData( jQuery(jEle)[0] );
	var par = jQuery(jEle).parent();
	
	// Append the nonce
	formData.append('pagelayer_nonce', pagelayer_global_nonce);
	
	// Hide any message
	par.find(".pagelayer-message-box").hide();
	
	// Message pos to use ?
	var msg_pos = 'top';	
	if(par.parent().hasClass('pagelayer-message-box-bottom')){
		msg_pos = 'bottom';
	}
	
	par.find(".pagelayer-message-box").removeClass('pagelayer-cf-msg-err pagelayer-cf-msg-suc');
	
	jQuery.ajax({
		url: pagelayer_ajaxurl+'action=pagelayer_contact_submit',
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		cache:false,
		success:function(result){
			var json = jQuery.parseJSON(result);
			
			jQuery(jEle).find('.pagelayer-contact-submit-btn').prop('disabled', false);
			jQuery(jEle).find('.pagelayer-contact-submit-btn .fa-spin').hide('0.6');
			
			if('success' in json){
				par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-suc').html(json['success']).fadeIn();
				
				if(redirect.length > 0 && !pagelayer_empty(redirect.val())){
					window.location.href = redirect.val();
				}
			}else{
				par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-err').html(json['failed']).fadeIn();
			}
		},
		error:function(result){
			par.find(".pagelayer-message-"+msg_pos).addClass('pagelayer-cf-msg-err').html(json['failed']).fadeIn();
		}
	});
	jEle.reset();
	
	jQuery(jEle).find('.pagelayer-recaptcha').each(function(){
		var widgetID = jQuery(this).attr('recaptcha-widget-id');
		
		if(!pagelayer_empty(window.grecaptcha)){
			grecaptcha.reset(widgetID);
		}
	});
	
	return false;
}

// Primary Menu Handler - Premium
function pagelayer_primary_menu(jEle){
	
	var container = jEle.find('.pagelayer-wp-menu-container');
	var menu_bar = jEle.find('.pagelayer-primary-menu-bar i');
	var menu_holder = jEle.find('.pagelayer-wp-menu-holder');
	var layout = menu_holder.data('layout');
	var submenu_ind = menu_holder.data('submenu_ind');
	var responsive = menu_holder.data('responsive');
	var drop_breakpoint = menu_holder.data('drop_breakpoint');
	var close = jEle.find('.pagelayer-wp_menu-close');
	
	var media_mode =  pagelayer_get_media_mode();
	
	if( (drop_breakpoint == 'tablet' && (media_mode == 'tablet' || media_mode == 'mobile')) || (drop_breakpoint == 'mobile' && media_mode == 'mobile') ){
		
		menu_holder.addClass('pagelayer-wp-menu-dropdown');
		container.addClass('pagelayer-menu-type-dropdown');
		container.removeClass('pagelayer-menu-type-'+layout);
		layout = 'dropdown';
		
	}else{
		menu_holder.removeClass('pagelayer-wp-menu-dropdown');
		container.removeClass('pagelayer-menu-type-dropdown');
		container.addClass('pagelayer-menu-type-'+layout);
	}
	
	// Menu toggle
	var toggle_class;
	jQuery(menu_bar).unbind('click');
	jQuery(menu_bar).click(function(){
		jQuery(container).toggleClass('pagelayer-togglt-on');
		
		toggle_class = jQuery(this).data('icon');
		toggle_class = ( pagelayer_empty(toggle_class) ? 'fas fa-bars' : toggle_class );
		
		if(jQuery(container).hasClass('pagelayer-togglt-on')){
			jQuery(this).removeClass(toggle_class);
			jQuery(this).addClass('fas fa-times');
		}else{
			jQuery(this).removeClass('fas fa-times');
			jQuery(this).addClass(toggle_class);
		}
	});
	
	// If has sub-menu the as icon
	var aEle_sub_menu = jQuery(container).find('.pagelayer-wp_menu-ul li ul.sub-menu').parent().children('a');
	
	if(aEle_sub_menu.children('.after-icon').length < 1){
		aEle_sub_menu.append('<span class="after-icon fa fa-'+submenu_ind+'"></span>');
	}
	
	// Toggle Sub nav
	var after_icon = jQuery(container).find('.pagelayer-wp_menu-ul li.menu-item-has-children .after-icon');
	
	after_icon.unbind('click');
	after_icon.click(function(e){
		e.preventDefault();
		if(window.matchMedia("(max-width: "+pagelayer_settings['tablet_breakpoint']+"px)").matches || layout != 'horizontal'){
			jQuery(this).closest('li').toggleClass('active-sub-menu');
		}else{
			jQuery(this).closest('li').removeClass('active-sub-menu');
		}
	});
	
	close.unbind('click');
	close.click(function(){
		jQuery(container).toggleClass('pagelayer-togglt-on');
		jQuery(menu_bar).removeClass('fas fa-times');
		jQuery(menu_bar).addClass(toggle_class);
	})
	
}

var count_int ={};
// Show countdown render
function pagelayer_countdown(jEle){
	
	var expiry_date = jEle.find('.pagelayer-countdown-container').attr('pagelayer-expiry-date');
	var timetype = jEle.find('.pagelayer-countdown-container').attr('pagelayer-time-type');
	var jEle_id = jEle.attr('pagelayer-id');
	
	if(pagelayer_empty(expiry_date) || expiry_date == "{{date}}"){
		var expiry_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	}
	
	var now;
	if(timetype == "server"){
		now = new Date(pagelayer_server_time*1000).getTime();
	}else{
		now = new Date().getTime();
	}

	var countDownDate = new Date(expiry_date).getTime();
	var distance = countDownDate - now;

	clearInterval(count_int[jEle_id]);
	count_int[jEle_id] = setInterval(function() {
		
		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
		jEle.find('.pagelayer-days-count').html(days);
		jEle.find('.pagelayer-hours-count').html(hours);
		jEle.find('.pagelayer-minutes-count').html(minutes);
		jEle.find('.pagelayer-seconds-count').html(seconds);
		
		// If the count down is over, write some text 
		if(distance < 0) {
			clearInterval(count_int[jEle_id]);
			jEle.find('.pagelayer-countdown-expired').show();
			jEle.find('.pagelayer-countdown-counter').hide();
		}
		
		distance = distance - 1000;
		
	}, 1000);
}

function pagelayer_pl_testimonial_slider(jEle){
	var ul = jQuery(jEle.find('.pagelayer-testimonials-holder'));
	
	// Build the options
	var options = pagelayer_fetch_dataAttrs(ul, 'data-slides-');
	
	pagelayer_owl_init(jEle, ul, options);
}

function pagelayer_anim_heading(jEle){
	var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;
	
	initHeadline();	

	function initHeadline(){
		//insert <i> element for each letter of a changing word
		singleLetters(jEle.find('.pagelayer-aheading-holder.letters').find('span'));
		//initialise headline animation
		animateHeadline(jEle.find('.pagelayer-aheading-holder'));
	}

	function singleLetters($words){
		$words.each(function(){
			var word = jQuery(this),
				letters = word.text().split(''),
				selected = word.hasClass('pagelayer-is-visible');
			for (i in letters) {
				if(word.parents('.pagelayer-aheading-rotate2').length > 0) letters[i] = '<b>' + letters[i] + '</b>';
				letters[i] = (selected) ? '<strong class="pagelayer-aheading-in">' + letters[i] + '</strong>': '<strong>' + letters[i] + '</strong>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines){
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = jQuery(this);
			
			if(headline.hasClass('pagelayer-aheading-loading-bar')){
				duration = barAnimationDelay;
				setTimeout(function(){ headline.find('.pagelayer-words-wrapper').addClass('pagelayer-is-loading') }, barWaiting);
			}else if(headline.hasClass('pagelayer-aheading-clip')){
				var spanWrapper = headline.find('.pagelayer-words-wrapper'),
					newWidth = spanWrapper.width() + 10;
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type') ){
				var words = headline.find('.pagelayer-words-wrapper span'),
					width = 0;
				words.each(function(){
					var wordWidth = jQuery(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.pagelayer-words-wrapper').css('width', width);
			};

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.pagelayer-is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word){
		var nextWord = takeNext($word);
		
		if($word.parents('.pagelayer-aheading-holder').hasClass('letters')){
			var bool = ($word.children('strong').length >= nextWord.children('strong').length) ? true : false;
			hideLetter($word.find('strong').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('strong').eq(0), nextWord, bool, lettersDelay);

		}else if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-clip')){
			$word.parents('.pagelayer-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		}else if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-loading-bar')){
			$word.parents('.pagelayer-words-wrapper').removeClass('pagelayer-is-loading');
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function(){ $word.parents('.pagelayer-words-wrapper').addClass('pagelayer-is-loading') }, barWaiting);

		}else{
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration){
		if($word.parents('.pagelayer-aheading-holder').hasClass('pagelayer-aheading-clip')){
			$word.parents('.pagelayer-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
				setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
			});
		}
	}

	function hideLetter($letter, $word, $bool, $duration){
		$letter.removeClass('pagelayer-aheading-in').addClass('pagelayer-aheading-out');
		
		if(!$letter.is(':last-child')){
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
		}else if($bool){ 
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && jQuery('html').hasClass('pagelayer-no-csstransitions')){
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		} 
	}

	function showLetter($letter, $word, $bool, $duration){
		$letter.addClass('pagelayer-aheading-in').removeClass('pagelayer-aheading-out');
		
		if(!$letter.is(':last-child')){ 
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
		}else{
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word){
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function switchWord($oldWord, $newWord){
		$oldWord.removeClass('pagelayer-is-visible').addClass('pagelayer-is-hidden');
		if(!$newWord.hasClass('pagelayer-is-visible')){
  		$newWord.removeClass('pagelayer-is-hidden').addClass('pagelayer-is-visible');
    }  
	}
}

function pagelayer_pl_row_slider(jEle){
	var index = 0;
 
	var imageEls = jEle.find('.pagelayer-bgimg-slide'); // Get the images to be cycled.
	var speed = jEle.data('speed'); // Get the speed of loop.
	imageEls.first().addClass('pagelayer-slide-show');
	setInterval(function (){
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < imageEls.length ? index + 1 : 0;
		
		// Show the next
		imageEls.eq(index).addClass('pagelayer-slide-show');
		
		// Hide the previous
		imageEls.eq(index - 1).removeClass('pagelayer-slide-show');
	}, speed);
}

function pagelayer_pl_social_profile(jEle){
	var icon_holder = jEle.find('.pagelayer-icon-holder');
	
	// Assigning animation classes to icon holder
	if(!pagelayer_empty(jEle.attr('pagelayer-animation'))){
		icon_holder.addClass('pagelayer-animation-'+jEle.attr('pagelayer-animation'));
	}
}

// Mega menu function which applies id and adjust position
function pagelayer_mega_menu_position(mEle){
	
	var jEle = mEle.find('.pagelayer-mega_menu');
	var id = jEle.attr('pagelayer-id');	
	
	mEle.attr('pagelayer-mega-menu-id', id);
	
	colWidth = mEle.parents('.pagelayer-col').first();
	mEle.offset({'left':(colWidth.offset().left - mEle.parent().offset().left)});
}

////////////////
// Freemium End
////////////////

/*
 * Nivo Lightbox v1.3.1
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
!function(t,i,o,e){function n(i,o){this.el=i,this.$el=t(this.el),this.options=t.extend({},l,o),this._defaults=l,this._name=a,this.init()}var a="nivoLightbox",l={effect:"fade",theme:"default",keyboardNav:!0,clickImgToClose:!1,clickOverlayToClose:!0,onInit:function(){},beforeShowLightbox:function(){},afterShowLightbox:function(t){},beforeHideLightbox:function(){},afterHideLightbox:function(){},beforePrev:function(t){},onPrev:function(t){},beforeNext:function(t){},onNext:function(t){},errorMessage:"The requested content cannot be loaded. Please try again later."};n.prototype={init:function(){var i=this;t("html").hasClass("nivo-lightbox-notouch")||t("html").addClass("nivo-lightbox-notouch"),"ontouchstart"in o&&t("html").removeClass("nivo-lightbox-notouch"),this.$el.on("click",function(t){i.showLightbox(t)}),this.options.keyboardNav&&t("body").off("keyup").on("keyup",function(o){var e=o.keyCode?o.keyCode:o.which;27==e&&i.destructLightbox(),37==e&&t(".nivo-lightbox-prev").trigger("click"),39==e&&t(".nivo-lightbox-next").trigger("click")}),this.options.onInit.call(this)},showLightbox:function(i){var o=this,e=this.$el,n=this.checkContent(e);if(n){i.preventDefault(),this.options.beforeShowLightbox.call(this);var a=this.constructLightbox();if(a){var l=a.find(".nivo-lightbox-content");if(l){if(t("body").addClass("nivo-lightbox-body-effect-"+this.options.effect),this.processContent(l,e),this.$el.attr("data-lightbox-gallery")){var h=t('[data-lightbox-gallery="'+this.$el.attr("data-lightbox-gallery")+'"]');t(".nivo-lightbox-nav").show(),t(".nivo-lightbox-prev").off("click").on("click",function(i){i.preventDefault();var n=h.index(e);e=h.eq(n-1),t(e).length||(e=h.last()),t.when(o.options.beforePrev.call(this,[e])).done(function(){o.processContent(l,e),o.options.onPrev.call(this,[e])})}),t(".nivo-lightbox-next").off("click").on("click",function(i){i.preventDefault();var n=h.index(e);e=h.eq(n+1),t(e).length||(e=h.first()),t.when(o.options.beforeNext.call(this,[e])).done(function(){o.processContent(l,e),o.options.onNext.call(this,[e])})})}setTimeout(function(){a.addClass("nivo-lightbox-open"),o.options.afterShowLightbox.call(this,[a])},1)}}}},checkContent:function(t){var i=t.attr("href"),o=i.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);return null!==i.match(/\.(jpeg|jpg|gif|png)$/i)||(!!o||("ajax"==t.attr("data-lightbox-type")||("#"==i.substring(0,1)&&"inline"==t.attr("data-lightbox-type")||"iframe"==t.attr("data-lightbox-type"))))},processContent:function(o,e){var n=this,a=e.attr("href"),l=a.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);if(o.html("").addClass("nivo-lightbox-loading"),this.isHidpi()&&e.attr("data-lightbox-hidpi")&&(a=e.attr("data-lightbox-hidpi")),null!==a.match(/\.(jpeg|jpg|gif|png)$/i)){var h=t("<img>",{src:a,class:"nivo-lightbox-image-display"});h.one("load",function(){var e=t('<div class="nivo-lightbox-image" />');e.append(h),o.html(e).removeClass("nivo-lightbox-loading"),e.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"}),t(i).resize(function(){e.css({"line-height":t(".nivo-lightbox-content").height()+"px",height:t(".nivo-lightbox-content").height()+"px"})})}).each(function(){this.complete&&t(this).load()}),h.error(function(){var i=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(i).removeClass("nivo-lightbox-loading")})}else if(l){var s="",r="nivo-lightbox-video";if("youtube"==l[1]&&(s="//www.youtube.com/embed/"+l[4],r="nivo-lightbox-youtube"),"youtube-nocookie"==l[1]&&(s=a,r="nivo-lightbox-youtube"),"youtu"==l[1]&&(s="//www.youtube.com/embed/"+l[3],r="nivo-lightbox-youtube"),"vimeo"==l[1]&&(s="//player.vimeo.com/video/"+l[3],r="nivo-lightbox-vimeo"),s){var c=t("<iframe>",{src:s,class:r,frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(c),c.load(function(){o.removeClass("nivo-lightbox-loading")})}}else if("ajax"==e.attr("data-lightbox-type"))t.ajax({url:a,cache:!1,success:function(e){var n=t('<div class="nivo-lightbox-ajax" />');n.append(e),o.html(n).removeClass("nivo-lightbox-loading"),n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"}),t(i).resize(function(){n.outerHeight()<o.height()&&n.css({position:"relative",top:"50%","margin-top":-(n.outerHeight()/2)+"px"})})},error:function(){var i=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(i).removeClass("nivo-lightbox-loading")}});else if("#"==a.substring(0,1)&&"inline"==e.attr("data-lightbox-type"))if(t(a).length){var g=t('<div class="nivo-lightbox-inline" />');g.append(t(a).clone().show()),o.html(g).removeClass("nivo-lightbox-loading"),g.outerHeight()<o.height()&&g.css({position:"relative",top:"50%","margin-top":-(g.outerHeight()/2)+"px"}),t(i).resize(function(){g.outerHeight()<o.height()&&g.css({position:"relative",top:"50%","margin-top":-(g.outerHeight()/2)+"px"})})}else{var v=t('<div class="nivo-lightbox-error"><p>'+n.options.errorMessage+"</p></div>");o.html(v).removeClass("nivo-lightbox-loading")}else{if("iframe"!=e.attr("data-lightbox-type"))return!1;var b=t("<iframe>",{src:a,class:"nivo-lightbox-item",frameborder:0,vspace:0,hspace:0,scrolling:"auto"});o.html(b),b.load(function(){o.removeClass("nivo-lightbox-loading")})}if(e.attr("title")){var x=t("<span>",{class:"nivo-lightbox-title"});x.text(e.attr("title")),t(".nivo-lightbox-title-wrap").html(x)}else t(".nivo-lightbox-title-wrap").html("")},constructLightbox:function(){if(t(".nivo-lightbox-overlay").length)return t(".nivo-lightbox-overlay");var i=t("<div>",{class:"nivo-lightbox-overlay nivo-lightbox-theme-"+this.options.theme+" nivo-lightbox-effect-"+this.options.effect}),o=t("<div>",{class:"nivo-lightbox-wrap"}),e=t("<div>",{class:"nivo-lightbox-content"}),n=t('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>'),a=t('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>'),l=t("<div>",{class:"nivo-lightbox-title-wrap"}),h=/*@cc_on!@*/0;h&&i.addClass("nivo-lightbox-ie"),o.append(e),o.append(l),i.append(o),i.append(n),i.append(a),t("body").append(i);var s=this;return s.options.clickOverlayToClose&&i.on("click",function(i){(i.target===this||t(i.target).hasClass("nivo-lightbox-content")||t(i.target).hasClass("nivo-lightbox-image"))&&s.destructLightbox()}),s.options.clickImgToClose&&i.on("click",function(i){(i.target===this||t(i.target).hasClass("nivo-lightbox-image-display"))&&s.destructLightbox()}),a.on("click",function(t){t.preventDefault(),s.destructLightbox()}),i},destructLightbox:function(){var i=this;this.options.beforeHideLightbox.call(this),t(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open"),t(".nivo-lightbox-nav").hide(),t("body").removeClass("nivo-lightbox-body-effect-"+i.options.effect);var o=/*@cc_on!@*/0;o&&(t(".nivo-lightbox-overlay iframe").attr("src"," "),t(".nivo-lightbox-overlay iframe").remove()),t(".nivo-lightbox-prev").off("click"),t(".nivo-lightbox-next").off("click"),t(".nivo-lightbox-content").empty(),this.options.afterHideLightbox.call(this)},isHidpi:function(){var t="(-webkit-min-device-pixel-ratio: 1.5),                              (min--moz-device-pixel-ratio: 1.5),                              (-o-min-device-pixel-ratio: 3/2),                              (min-resolution: 1.5dppx)";return i.devicePixelRatio>1||!(!i.matchMedia||!i.matchMedia(t).matches)}},t.fn[a]=function(i){return this.each(function(){t.data(this,a)||t.data(this,a,new n(this,i))})}}(jQuery,window,document);

/*! WOW wow.js - v1.3.0 - 2016-10-04
* https://wowjs.uk
* Copyright (c) 2016 Thomas Grainger; Licensed MIT */!function(a,b){if("function"==typeof define&&define.amd)define(["module","exports"],b);else if("undefined"!=typeof exports)b(module,exports);else{var c={exports:{}};b(c,c.exports),a.WOW=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){return b.indexOf(a)>=0}function e(a,b){for(var c in b)if(null==a[c]){var d=b[c];a[c]=d}return a}function f(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)}function g(a){var b=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],c=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],d=arguments.length<=3||void 0===arguments[3]?null:arguments[3],e=void 0;return null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e}function h(a,b){null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)&&a["on"+b]()}function i(a,b,c){null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c}function j(a,b,c){null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]}function k(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight}Object.defineProperty(b,"__esModule",{value:!0});var l,m,n=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),o=window.WeakMap||window.MozWeakMap||function(){function a(){c(this,a),this.keys=[],this.values=[]}return n(a,[{key:"get",value:function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b];if(c===a)return this.values[b]}}},{key:"set",value:function(a,b){for(var c=0;c<this.keys.length;c++){var d=this.keys[c];if(d===a)return this.values[c]=b,this}return this.keys.push(a),this.values.push(b),this}}]),a}(),p=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(m=l=function(){function a(){c(this,a),"undefined"!=typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return n(a,[{key:"observe",value:function(){}}]),a}(),l.notSupported=!0,m),q=window.getComputedStyle||function(a){var b=/(\-([a-z]){1})/g;return{getPropertyValue:function(c){"float"===c&&(c="styleFloat"),b.test(c)&&c.replace(b,function(a,b){return b.toUpperCase()});var d=a.currentStyle;return(null!=d?d[c]:void 0)||null}}},r=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];c(this,a),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null,resetAnimation:!0},this.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=e(b,this.defaults),null!=b.scrollContainer&&(this.config.scrollContainer=document.querySelector(b.scrollContainer)),this.animationNameCache=new o,this.wowEvent=g(this.config.boxClass)}return n(a,[{key:"init",value:function(){this.element=window.document.documentElement,d(document.readyState,["interactive","complete"])?this.start():i(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var a=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var b=0;b<this.boxes.length;b++){var c=this.boxes[b];this.applyStyle(c,!0)}if(this.disabled()||(i(this.config.scrollContainer||window,"scroll",this.scrollHandler),i(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live){var d=new p(function(b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.addedNodes.length;e++){var f=d.addedNodes[e];a.doSync(f)}});d.observe(document.body,{childList:!0,subtree:!0})}}},{key:"stop",value:function(){this.stopped=!0,j(this.config.scrollContainer||window,"scroll",this.scrollHandler),j(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){p.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(a){if("undefined"!=typeof a&&null!==a||(a=this.element),1===a.nodeType){a=a.parentNode||a;for(var b=a.querySelectorAll("."+this.config.boxClass),c=0;c<b.length;c++){var e=b[c];d(e,this.all)||(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),this.scrolled=!0)}}}},{key:"show",value:function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),h(a,this.wowEvent),this.config.resetAnimation&&(i(a,"animationend",this.resetAnimation),i(a,"oanimationend",this.resetAnimation),i(a,"webkitAnimationEnd",this.resetAnimation),i(a,"MSAnimationEnd",this.resetAnimation)),a}},{key:"applyStyle",value:function(a,b){var c=this,d=a.getAttribute("data-wow-duration"),e=a.getAttribute("data-wow-delay"),f=a.getAttribute("data-wow-iteration");return this.animate(function(){return c.customStyle(a,b,d,e,f)})}},{key:"resetStyle",value:function(){for(var a=0;a<this.boxes.length;a++){var b=this.boxes[a];b.style.visibility="visible"}}},{key:"resetAnimation",value:function(a){if(a.type.toLowerCase().indexOf("animationend")>=0){var b=a.target||a.srcElement;b.className=b.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a}},{key:"vendorSet",value:function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];a[""+c]=d;for(var e=0;e<this.vendors.length;e++){var f=this.vendors[e];a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=d}}}},{key:"vendorCSS",value:function(a,b){for(var c=q(a),d=c.getPropertyCSSValue(b),e=0;e<this.vendors.length;e++){var f=this.vendors[e];d=d||c.getPropertyCSSValue("-"+f+"-"+b)}return d}},{key:"animationName",value:function(a){var b=void 0;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=q(a).getPropertyValue("animation-name")}return"none"===b?"":b}},{key:"cacheAnimationName",value:function(a){return this.animationNameCache.set(a,this.animationName(a))}},{key:"cachedAnimationName",value:function(a){return this.animationNameCache.get(a)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var a=[],b=0;b<this.boxes.length;b++){var c=this.boxes[b];if(c){if(this.isVisible(c)){this.show(c);continue}a.push(c)}}this.boxes=a,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(a){for(;void 0===a.offsetTop;)a=a.parentNode;for(var b=a.offsetTop;a.offsetParent;)a=a.offsetParent,b+=a.offsetTop;return b}},{key:"isVisible",value:function(a){var b=a.getAttribute("data-wow-offset")||this.config.offset,c=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,d=c+Math.min(this.element.clientHeight,k())-b,e=this.offsetTop(a),f=e+a.clientHeight;return d>=e&&f>=c}},{key:"disabled",value:function(){return!this.config.mobile&&f(navigator.userAgent)}}]),a}();b["default"]=r,a.exports=b["default"]});

/* 
 *   jQuery Numerator Plugin 0.2.1
 *   https://github.com/garethdn/jquery-numerator
 *
 *   Copyright 2015, Gareth Nolan
 *   http://ie.linkedin.com/in/garethnolan/

 *   Based on jQuery Boilerplate by Zeno Rocha with the help of Addy Osmani
 *   http://jqueryboilerplate.com
 *
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/MIT
 */

;(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'jquery-numerator requires jQuery to be loaded first';
        }
        factory(jQuery);
    }
}(function ($) {

    var pluginName = "numerator",
    defaults = {
        easing: 'swing',
        duration: 500,
        delimiter: undefined,
        rounding: 0,
        toValue: undefined,
        fromValue: undefined,
        queue: false,
        onStart: function(){},
        onStep: function(){},
        onProgress: function(){},
        onComplete: function(){}
    };

    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {
            this.parseElement();
            this.setValue();
        },

        parseElement: function () {
            var elText = $.trim($(this.element).text());

            this.settings.fromValue = this.settings.fromValue || this.format(elText);
        },

        setValue: function() {
            var self = this;

            $({value: self.settings.fromValue}).animate({value: self.settings.toValue}, {

                duration: parseInt(self.settings.duration, 10),

                easing: self.settings.easing,

                start: self.settings.onStart,

                step: function(now, fx) {
                    $(self.element).text(self.format(now));
                    // accepts two params - (now, fx)
                    self.settings.onStep(now, fx);
                },

                // accepts three params - (animation object, progress ratio, time remaining(ms))
                progress: self.settings.onProgress,

                complete: self.settings.onComplete
            });
        },

        format: function(value){
            var self = this;

            if ( parseInt(this.settings.rounding ) < 1) {
                value = parseInt(value, 10);
            } else {
                value = parseFloat(value).toFixed( parseInt(this.settings.rounding) );
            }

            if (self.settings.delimiter) {
                return this.delimit(value)
            } else {
                return value;
            } 
        },

        // TODO: Add comments to this function
        delimit: function(value){
            var self = this;

            value = value.toString();

            if (self.settings.rounding && parseInt(self.settings.rounding, 10) > 0) {
                var decimals = value.substring( (value.length - (self.settings.rounding + 1)), value.length ),
                    wholeValue = value.substring( 0, (value.length - (self.settings.rounding + 1)));

                return self.addDelimiter(wholeValue) + decimals;
            } else {
                return self.addDelimiter(value);
            }
        },

        addDelimiter: function(value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.settings.delimiter);
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( $.data( this, "plugin_" + pluginName ) ) {
                $.data(this, 'plugin_' + pluginName, null);
            }
            $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
        });
    };

}));

/**
 * simple-parallax-js - simpleParallax is a simple and lightweight JS plugin that gives your website parallax animations on the images
 * @version v4.2.1
 * @date: 09-03-2019 17:4:39
 * @link https://simpleparallax.com/
 */
"use strict";var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},_createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(e,t){"function"==typeof define&&define.amd?define([],function(){return t(e)}):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=t(e):e.pagelayerParallax=t(e)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:void 0,function(o){var i=function(){for(var e,t="transform webkitTransform mozTransform oTransform msTransform".split(" "),n=0;void 0===e;)e=null!=document.createElement("div").style[t[n]]?t[n]:void 0,n++;return e}();!function(){for(var a=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!o.requestAnimationFrame;++t)o.requestAnimationFrame=o[e[t]+"RequestAnimationFrame"],o.cancelAnimationFrame=o[e[t]+"CancelAnimationFrame"]||o[e[t]+"CancelRequestAnimationFrame"];o.requestAnimationFrame||(o.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),i=Math.max(0,16-(n-a)),s=o.setTimeout(function(){e(n+i)},i);return a=n+i,s}),o.cancelAnimationFrame||(o.cancelAnimationFrame=function(e){clearTimeout(e)})}(),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null});var s=[],t=-1,a=void 0,r=void 0,l=void 0,h=void 0,m=!1,u=function(){function n(e,t){_classCallCheck(this,n),this.element=e,this.elementContainer=e,this.defaults={delay:.6,orientation:"up",scale:1.3,overflow:!1,transition:"cubic-bezier(0,0,0,1)",breakpoint:!1},this.settings=_extends(this.defaults,t),this.settings.breakpoint&&document.documentElement.clientWidth<=this.settings.breakpoint||(this.init=this.init.bind(this),this.animationFrame=this.animationFrame.bind(this),this.handleResize=this.handleResize.bind(this),this.isImageLoaded(this.element)?this.init():this.element.addEventListener("load",this.init),s.push(this),m||(m=!0,this.getViewportOffsetHeight(),this.animationFrame()))}return _createClass(n,[{key:"init",value:function(){this.isInit||(!1===this.settings.overflow&&this.wrapElement(),this.setStyle(),this.getElementOffset(),this.getTranslateValue(),this.animate(),o.addEventListener("resize",this.handleResize),this.isInit=!0)}},{key:"isImageLoaded",value:function(){return!!this.element.complete&&(void 0===this.element.naturalWidth||0!==this.element.naturalWidth)}},{key:"isVisible",value:function(){return this.elementBottomX>a&&this.elementTopX<r}},{key:"wrapElement",value:function(){var e=this.element.closest("picture")||this.element,t=document.createElement("div");t.classList.add("pagelayerParallax"),t.style.overflow="hidden",e.parentNode.insertBefore(t,e),t.appendChild(e),this.elementContainer=t}},{key:"unWrapElement",value:function(){var e=this.elementContainer.parentNode;if(e){for(;this.elementContainer.firstChild;)e.insertBefore(this.elementContainer.firstChild,this.elementContainer);e.removeChild(this.elementContainer)}}},{key:"setStyle",value:function(){!1===this.settings.overflow&&(this.element.style[i]="scale("+this.settings.scale+")"),0<this.settings.delay&&(this.element.style.transition="transform "+this.settings.delay+"s "+this.settings.transition),this.element.style.willChange="transform"}},{key:"unSetStyle",value:function(){this.element.style.willChange="",this.element.style[i]="",this.element.style.transition=""}},{key:"getElementOffset",value:function(){var e=this.elementContainer.getBoundingClientRect();this.elementHeight=e.height,this.elementTopX=e.top+o.pageYOffset,this.elementBottomX=this.elementHeight+this.elementTopX}},{key:"getViewportOffsetTop",value:function(){a=o.pageYOffset}},{key:"getViewportOffsetHeight",value:function(){l=document.documentElement.clientHeight}},{key:"getViewportOffsetBottom",value:function(){r=a+l}},{key:"handleResize",value:function(){this.getViewportOffsetHeight(),this.getElementOffset(),this.getRangeMax()}},{key:"getRangeMax",value:function(){var e=this.element.clientHeight;this.rangeMax=e*this.settings.scale-e,"down"!==this.settings.orientation&&"right"!==this.settings.orientation||(this.rangeMax*=-1)}},{key:"getTranslateValue",value:function(){var e=((r-this.elementTopX)/((l+this.elementHeight)/100)).toFixed(1);return e=Math.min(100,Math.max(0,e)),this.oldPercentage!==e&&(this.rangeMax||this.getRangeMax(),this.translateValue=(e/100*this.rangeMax-this.rangeMax/2).toFixed(0),this.oldTranslateValue!==this.translateValue&&(this.oldPercentage=e,this.oldTranslateValue=this.translateValue,!0))}},{key:"animate",value:function(){var e=0,t=0,n=void 0;"left"===this.settings.orientation||"right"===this.settings.orientation?t=this.translateValue+"px":e=this.translateValue+"px",n=!1===this.settings.overflow?"translate3d("+t+", "+e+", 0) scale("+this.settings.scale+")":"translate3d("+t+", "+e+", 0)",this.element.style[i]=n}},{key:"proceedElement",value:function(e){e.isVisible()&&e.getTranslateValue()&&e.animate()}},{key:"animationFrame",value:function(){if(this.getViewportOffsetTop(),t!==a){this.getViewportOffsetBottom();for(var e=0;e<s.length;e++)this.proceedElement(s[e]);h=o.requestAnimationFrame(this.animationFrame),t=a}else h=o.requestAnimationFrame(this.animationFrame)}},{key:"destroy",value:function(){this.isDestroyed||(this.unSetStyle(),!1===this.settings.overflow&&this.unWrapElement(),s.splice(s.indexOf(this),1),s.length||(m=!1,o.cancelAnimationFrame(h)),o.removeEventListener("resize",this.handleResize))}},{key:"isDestroyed",get:function(){return-1===s.indexOf(this)}}]),n}();return function(e,t){var n=[];if(e.length)for(var i=0;i<e.length;i++)n.push(new u(e[i],t));else n.push(new u(e,t));return n}});

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"pagelayer-owl-refresh",loadedClass:"pagelayer-owl-loaded",loadingClass:"pagelayer-owl-loading",rtlClass:"pagelayer-owl-rtl",responsiveClass:"pagelayer-owl-responsive",dragClass:"pagelayer-owl-drag",itemClass:"pagelayer-owl-item",stageClass:"pagelayer-owl-stage",stageOuterClass:"pagelayer-owl-stage-outer",grabClass:"pagelayer-owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".pagelayer-owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.pagelayerOwlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.pagelayerOwlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("pagelayer-owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".pagelayer-owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"pagelayer-owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .pagelayer-owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".pagelayer-owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".pagelayer-owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="pagelayer-owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"pagelayer-owl-video-tn "+j,srcType:c}):a("<div/>",{class:"pagelayer-owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"pagelayer-owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="pagelayer-owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".pagelayer-owl-video-frame").remove(),this._playing.removeClass("pagelayer-owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="pagelayer-owl-video-frame" />').insertAfter(e.find(".pagelayer-owl-video")),this._playing=e.addClass("pagelayer-owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("pagelayer-owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated pagelayer-owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated pagelayer-owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated pagelayer-owl-animated-out pagelayer-owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"pagelayer-owl-nav",navClass:["pagelayer-owl-prev","pagelayer-owl-next"],slideBy:1,dotClass:"pagelayer-owl-dot",dotsClass:"pagelayer-owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.pagelayerOwlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);

