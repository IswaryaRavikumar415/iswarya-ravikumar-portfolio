/*
 * Copyright (c) 2020 Frenify
 * Author: Frenify
 * This file is made for CURRENT THEME
*/


(function ($){

	"use strict";
	
	Paddle.Setup({ vendor: 110661 });
	
	var frenify_ajax = frenify_ajax_php;
	
	
	var FrenifyStorage = {
		entity: 		'',
		currentPage: 	1,
		category: 		'all',
		pricetag: 		'all',
	};
	
	
    var FrenifyInit = {
		
        init: function () {
			this.img_to_SVG();
			this.hamburger_trigger();
			this.mobile_submenu();
			this.project_like();
			this.download_count();
			this.share_popup();
			this.search_popup();
			this.click_scroll();
			this.project_filter_change();
			this.project_ajax_pagination();
        },
		
		
		project_ajax_pagination: function()
		{
			var self = this;
			var ajaxRunningForPagination = false;
			$('.frenify_projects_list_pagination a').off().on('click', function() {
				
				var el 							= $(this);
					FrenifyStorage.entity		= el.parents('.frenify_projects_list_wrap').data('entity');
					FrenifyStorage.currentPage 	= el.data('page');
					var loader 					= el.parents('.frenify_projects_list_wrap').find('.frenify_linear_loader');
					
				
				if(ajaxRunningForPagination === true) {return false;}
				ajaxRunningForPagination 	= true;
				
				loader.addClass('opened');
				$("html, body").animate({ scrollTop: 0 }, "slow");
				
				var requestData = {
					action: 		'jsQueryGetProjects', 
					currentPage: 	FrenifyStorage.currentPage,
					entity: 		FrenifyStorage.entity,
					category: 		FrenifyStorage.category,
					pricetag: 		FrenifyStorage.pricetag,
				};
				
				$.ajax({
					type: 'POST',
					url: frenify_ajax.frenify_ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						
						var ob 	= $.parseJSON(data); //get the data object				
						$('.frenify_projects_list_content').html(ob.frenify_data);
						
						ajaxRunningForPagination = false;
						loader.removeClass('opened');
						self.project_ajax_pagination();
						
					},
					error: function(){
						
					}
				});
				
				return false;
				
			});
		},
		
		
		
		
		
		
		
		project_filter_change: function()
		{
			var self = this;
			var popup_windows 	= $('.frenify_filter_by_all .frenify_popup');
			
			$('.frenify_filter_by_all .frenify_title').off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var element 		= $(this);
				var popup_window 	= element.parent().find('.frenify_popup');
				
				
				if(!popup_window.hasClass('opened')){
					popup_windows.removeClass('opened');
					popup_window.addClass('opened');
				}else{
					popup_window.removeClass('opened');
				}
				
			});
			
			
			var ajaxRunningForFilter = false;
			$('.frenify_filter_by_all .frenify_popup ul li span').off().on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				var el 					= $(this);
				var text				= el.text();
				var value				= el.data('value');
				var wrap 				= el.parents('.frenify_filter_by_all');
				var placeholder			= wrap.find('.frenify_title span');
				var popup_window 		= wrap.find('.frenify_popup');
				var projects_counter	= wrap.parent().siblings('div').find('.frenify_count span');
				var loader 				= el.parents('.frenify_projects_list_wrap').find('.frenify_linear_loader');
				FrenifyStorage.entity 	= el.parents('.frenify_projects_list_wrap').data('entity');
				
				placeholder.html(text);
				popup_window.removeClass('opened');
				
				
				if(ajaxRunningForFilter === true) {return false;}
				ajaxRunningForFilter 	= true;
				
				
				if(wrap.hasClass('by_category')){
					FrenifyStorage.category = value;
				}
				else if(wrap.hasClass('by_pricetag')){
					FrenifyStorage.pricetag = value;
				}
				
				loader.addClass('opened');
				
				$("html, body").animate({ scrollTop: 0 }, "slow");

				var requestData = {
					action: 		'jsQueryGetProjects', 
					currentPage: 	1,
					entity: 		FrenifyStorage.entity,
					category: 		FrenifyStorage.category,
					pricetag: 		FrenifyStorage.pricetag,
				};
				
				$.ajax({
					type: 'POST',
					url: frenify_ajax.frenify_ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						
						var ob 	= $.parseJSON(data); //get the data object
						
						if(ob.frenify_projects_count == 0){
							$('.frenify_projects_list_content').html('<div class="frenify_projects_list"><div class="frenify_project no_item"><span>No items found</span></div></div>');
						}else{
							$('.frenify_projects_list_content').html(ob.frenify_data);
						}
						
						
						
						//console.log(ob.frenify_test);
						
						projects_counter.html(ob.frenify_projects_count);
						
						ajaxRunningForFilter = false;
						loader.removeClass('opened');
						self.project_ajax_pagination();
						
					},
					error: function(){
						
					}
				});
				
				
				return false;
				
				
			});
			
			
			popup_windows.off().on('click', function(e){
				e.stopPropagation();
			});
			
			$(window).on('click', function(){
				popup_windows.removeClass('opened');
			});
			
		},
		
		click_scroll:function(){
			$('a.frenify_click_scroll').off().on('click', function(event) {

				if (this.hash !== "") {
					event.preventDefault();
					var hash = this.hash;

					$('html, body').animate({
						scrollTop: $(hash).offset().top - 30
						}, 700, function(){
						//window.location.hash = hash;
					});
				} // End if
			});
		},
		
		search_popup:function(){
			var search_box 		= $('.frenify_header_wrap .frenify_search_wrap .frenify_search');
			var trigger 		= $('.frenify_header_wrap .frenify_search_trigger');
			
			
			search_box.off().on('click', function(e){
				e.stopPropagation();
			});
			
			$(window).on('click', function(){
				trigger.removeClass('frenify_open');
				search_box.removeClass('frenify_open');
			});
			
			trigger.off().on('click', function(){
				
				if(trigger.hasClass('frenify_open')){
				   	trigger.removeClass('frenify_open');
					search_box.removeClass('frenify_open');
				}else{
					trigger.addClass('frenify_open');
					search_box.addClass('frenify_open');	
				}
				
				return false;
				
			});
		},
		
		share_popup:function(){
			var self			= this;
			var share_box 		= $('.frenify_popup_share_box_wrap');
			var share_box_in 	= $('.frenify_popup_share_box');
			var closer 			= share_box.find('.frenify_closer');
			var opener 			= $('.frenify_freebie_share .frenify_share');
			var social_list		= $('.frenify_hidden_share_content').html();
			
			
			closer.off().on('click', function(){
				share_box.removeClass('frenify_open');
				return false;
			});
			
			share_box_in.off().on('click', function(e){
				e.stopPropagation();
			});
			
			$(window).on('click', function(){
				share_box.removeClass('frenify_open');
			});
			
			opener.off().on('click', function(){
				share_box.find('.frenify_body').html(social_list);
				self.img_to_SVG();
				share_box.addClass('frenify_open');
				return false;
			});
		},
		
		
		download_count: function(){
			
			var ajaxRunningForDownload = false;
			$('.frenify_download_button').off().on('click', function() {
				
				var el 		= $(this),
					countEl = $('.frenify_freebie_info_list .frenify_download_count'),
					ID 		= el.data('id');
				
				
				if(ajaxRunningForDownload === true) {return false;}
				ajaxRunningForDownload 	= true;
				
				var requestData 	= {
					action: 'frenify_ajax_download', 
					ID: ID,
				};
				
				$.ajax({
					type: 'POST',
					url: frenify_ajax.frenify_ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						var ob 	= $.parseJSON(data); //get the data object
						countEl.text(ob.count);
						ajaxRunningForDownload = false;
					}
				});
			});
		},
		
		project_like: function(){
			var self = this;
			var ajaxRunningForLike = false;
			$('.frenify_like').off().on('click', function(e) {
				e.preventDefault();

				var el 		= $(this),
					countEl = el.find('.frenify_count'),
					ID 		= $(this).data('id');
				
				
				if(ajaxRunningForLike === true) {return false;}
				
				
				ajaxRunningForLike 	= true;
				
				var requestData 	= {
					action: 'frenify_ajax_like', 
					ID: ID,
				};
				
				$.ajax({
					type: 'POST',
					url: frenify_ajax.frenify_ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						var ob 	= $.parseJSON(data); //get the data object
						countEl.text(ob.count);
						el.find('.frenify_svg').remove();
						el.find('.frenify_count').before('<img src="'+ob.svgURL+'" class="frenify_svg" alt="" />');
						self.img_to_SVG();
						
						//if(el.hasClass('liked')){el.removeClass('liked');}else{el.addClass('liked');}
						
						ajaxRunningForLike = false;
					},
					error: function(MLHttpRequest, textStatus, errorThrown) {
						console.log(MLHttpRequest);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});	

				return false;
			});
		},
		
		mobile_submenu: function(){
			var nav 						= $('ul.mobile_menu, .widget_nav_menu ul.menu');
			nav.each(function(){
				$(this).find('a').on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.sub-menu');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.sub-menu').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
					//if(mobileAutoCollapse === 'enable'){
						if(nav.parent().parent().hasClass('opened')){
							nav.parent().parent().removeClass('opened').slideUp();
							$('.frenify_mobile_blocks .hamburger').removeClass('is-active');
						}
					//}
				});
			});
		},
		
		hamburger_trigger: function(){
			var hamburger		= $('.frenify_mobile_blocks .frenify_mobile_trigger');
			hamburger.on('click',function(){
				var element 	= $(this);
				var menupart	= $('.frenify_mobile_popup_wrap ul.mobile_menu');
				if(element.hasClass('is-active')){
					element.removeClass('is-active');
					menupart.removeClass('opened');
					menupart.slideUp(500);
				}else{
					element.addClass('is-active');
					menupart.addClass('opened');
					menupart.slideDown(500);
				}return false;
			});
		},
		
		img_to_SVG: function(){
			$('img.frenify_svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
    };
	
	
	// ready functions
	$(document).ready(function(){FrenifyInit.init();});
	
	
})(jQuery);