/*
 * Copyright (c) 2021 Frenify
 * Author: Frenify
 * This file is made for CURRENT THEME
*/


(function ($){

	"use strict";

	
    var CheckoutInit = {
		
        init: function () {
			this.freemius_checkout();
        },
		
		frenify_checkout: function(plugin_id, plan_id, public_key, image, button, name, licenses, billing_cycle, trial){
			
			
			
			$(''+button+'').on('click', function (e) {
				e.preventDefault();
				
				var handler = FS.Checkout.configure({
					plugin_id:  plugin_id,
					plan_id:    plan_id,
					public_key: public_key,
					//image:      image
				});
				
				handler.open({
					name     : name,
					licenses : licenses,
					billing_cycle: billing_cycle, // 'monthly', 'annual', 'lifetime'
					trial: trial,
				});
				
			});
			
		},
		
		freemius_checkout:function(){
			
			
			this.frenify_checkout('9902', '16657', 'pk_0ffb7e5960e9c48bff96219eb410d', '', '#07519ac', 'Avova Core', 1, 'lifetime', false);
			this.frenify_checkout('9355', '15727', 'pk_a26e4ba99920c48c9aa63691763d2', '', '#61b8930', 'Rewall Core', 1, 'lifetime', false);
			this.frenify_checkout('9450', '15909', 'pk_47182f03e4e6c31d24af87cbe225f', '', '#222d14a', 'Resumo Core', 1, 'lifetime', false);
			
			this.frenify_checkout('8643', '14430', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#0d602f1', 'Tokyo', 1, 'lifetime', false);
			this.frenify_checkout('8643', '14433', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#fef2b3b', 'Tokyo', 5, 'lifetime', false);
			this.frenify_checkout('8643', '14436', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#6342532', 'Tokyo', 0, 'lifetime', false);
//			this.frenify_checkout('8643', '14430', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#0d602f1', 'Tokyo', 1, 'lifetime', false);
//			this.frenify_checkout('8643', '14433', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#fef2b3b', 'Tokyo', 5, 'lifetime', false);
//			this.frenify_checkout('8643', '14436', 'pk_ea98708e828ff60eb785c4a8133ba', '', '#6342532', 'Tokyo', 0, 'lifetime', false);
			
			this.frenify_checkout('9133', '15320', 'pk_e220c4ceaeae940de176acb6b2767', '', '#1b45729', 'Categorify', 1, 'lifetime', false);
			this.frenify_checkout('9133', '15320', 'pk_e220c4ceaeae940de176acb6b2767', '', '#8be0206', 'Categorify', 3, 'lifetime', false);
			this.frenify_checkout('9133', '15320', 'pk_e220c4ceaeae940de176acb6b2767', '', '#423f62t', 'Categorify', 1, 'lifetime', true);
			
			
			// TOKYO :: PERSONAL
			/*var handler = FS.Checkout.configure({
				plugin_id:  '8643',
				plan_id:    '14430',
				public_key: 'pk_ea98708e828ff60eb785c4a8133ba',
				image:      ''
			});
			
			$('#4bf838a').on('click', function (e) {
				console.log(39);
				handler.open({
					name     : 'Tokyo',
					licenses : 1
				});
				e.preventDefault();
				
			});*/
			
			
			// TOKYO :: PROFESSIONAL
			/*var handler2 = FS.Checkout.configure({
				plugin_id:  '8643',
				plan_id:    '14433',
				public_key: 'pk_ea98708e828ff60eb785c4a8133ba',
				image:      ''
			});
			
			$('#4c31450').on('click', function (e) {
				console.log(69);
				handler2.open({
					name     : 'Tokyo',
					licenses : 5
				});
				e.preventDefault();
			});*/
			
			
			// TOKYO :: AGENCY
			/*var handler3 = FS.Checkout.configure({
				plugin_id:  '8643',
				plan_id:    '14436',
				public_key: 'pk_ea98708e828ff60eb785c4a8133ba',
				image:      ''
			});
			
			$('#dd33ced').on('click', function (e) {
				console.log(99);
				handler3.open({
					name     : 'Tokyo',
					licenses : null
				});
				e.preventDefault();
			});*/
			
			
			
		},

    };
	
	
	// ready functions
	$(document).ready(function(){CheckoutInit.init();});
	
	
})(jQuery);