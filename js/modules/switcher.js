/*

*/

var PROJECT = PROJECT || {};
(function($) {
	"use strict";
	PROJECT.switcher = {

		init: function() {
			if(!$(".bt").length) {return ;}
			this.domCache();
			this.BGSwitcher();
			this.onWindowResize();
		},

		domCache: function() {
			var self = PROJECT.switcher;
			self.$bt = $(".bt");
			self.$btBg = self.$bt.find(".bt-bg");
		},

		BGSwitcher: function() {
			PROJECT.tools.onWindowResize();
				var self = PROJECT.switcher;
				//get current window using tools.js
				var currentWindow = PROJECT.tools.currentWindow();
				// var	arrBg = self.$btBg.data("bg").split(",");

				/*console.log(currentWindow);
				console.log("BG: " + arrBg);
				console.log(arrBg[0] + ":" + arrBg[1] + ":" + arrBg[2]);*/

				//need to find all using the bt-bg class in the document
				$.each(self.$btBg, function(index, value) {
					var arrBg = $(this).data("bg").split(",")

					if(currentWindow == "mobile") {
						$(this).css({
							'background-image' : 'url("' + arrBg[0] + '")'
						});
					}else if(currentWindow == "tablet") {
						$(this).css({
							'background-image' : 'url("' + arrBg[1] + '")'
						});
					}else {
						$(this).css({
							'background-image' : 'url("' + arrBg[2] + '")'
						});
					}
				});

				
			
		},

		onWindowResize: function() {
			var self;
			self = PROJECT.switcher;
			$(window).on("resize", PROJECT.tools.debounce(function() {
				self.BGSwitcher();
			},100,false));

		}

	}

	$(function() {
		PROJECT.switcher.init();
	});


})(jQuery);