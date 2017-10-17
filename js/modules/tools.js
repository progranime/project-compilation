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
			this.currentWindow();
		},

		currentWindow: function() {
			var self = PROJECT.tools;
			var domWidth = window.innerWidth,
				domViewport = "";

			if(domWidth < 768) {
				domViewport = "mobile";
			}else if(domWidth > 767 && domWidth < 1024) {
				domViewport = "tablet";
			}else {
				domViewport = "desktop";
			}
			self.onWindowResize();
			return domViewport;
		},

		onWindowResize: function() {
			var self = PROJECT.tools;
			$(window).on('resize', self.debounce(function() {
				console.log(self.currentWindow.domViewport);
				self.currentWindow;
			},100,false));
		},

		domBreakpoint: function() {
			PROJECT.tools.currentWindow();
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