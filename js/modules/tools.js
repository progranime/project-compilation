/*
	Author: Jeremy Espinosa
	File: tools.js
	Description: Global tools for every modules
*/

var PROJECT = PROJECT || {};

(function($) {
	"use strict";

	PROJECT.tools = {
		init: function() {
			this.globalVar();
			this.currentWindow();
			this.onWindowResize();
		},

		globalVar: function() {
			this.domViewport;
		},

		currentWindow: function() {
			var self = PROJECT.tools;
			var domWidth = window.innerWidth;

			if(domWidth < 768) {
				self.domViewport = "mobile";
			}else if(domWidth > 767 && domWidth < 1024) {
				self.domViewport = "tablet";
			}else {
				self.domViewport = "desktop";
			}
			// self.onWindowResize();
			return self.domViewport;
		},

		onWindowResize: function() {
			var self = PROJECT.tools;
			$(window).on('resize', self.debounce(function() {
				console.log("Resize: " + self.currentWindow());
				self.currentWindow();
			},100,false));
		},

		domBreakpoint: function() {
			return this.domViewport;
		},

		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		}

	}

	$(function() {
		PROJECT.tools.init();
	});


})(jQuery);