/*

*/

var PROJECT = PROJECT || {};
(function($) {
	"use strict";
	PROJECT.switcher = {

		init: function() {
			// if(!$(".bt").length) {return ;}
			this.domCache();
			this.BGSwitcher();

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
				var	arrBg = self.$btBg.data("bg").split(",");

				console.log(currentWindow);
				/*console.log("BG: " + arrBg);
				console.log(arrBg[0] + ":" + arrBg[1] + ":" + arrBg[2]);
				if(currentWindow == "mobile") {
					self.$btBg.css({
						"background-image": "(url: " +  arrBg[0] + ")"
					});
				}else if(currentWindow == "tablet") {
					self.$btBg.css({
						"background-image": "(url: " +  arrBg[1] + ")"
					});
				}else {
					self.$btBg.css({
						"background-image": "(url: " +  arrBg[2] + ")"
					});
				}*/


			
		}

	}

	$(function() {
		PROJECT.switcher.init();
	});


})(jQuery);