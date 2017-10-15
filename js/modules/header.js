var PROJECT = PROJECT || {};

(function($){
	"use strict";

	PROJECT.header = {
		init: function() {
			console.log("init");
			if(!$(".global-header").length) { return ; }
			console.log("init 2");

			this.domCache();
			this.bindEvents();
		},

		domCache: function() {
			var self = PROJECT.header;
			self.$globalHeader = $(".global-header");
			self.$globalNav = self.$globalHeader.find(".global-nav");
			self.$menuBar = self.$globalHeader.find(".menu-bar");
		},

		bindEvents: function() {
			var self = PROJECT.header;
			self.$menuBar.on("click", self.toggleMenu);

		},

		toggleMenu: function() {
			var self = PROJECT.header;
			self.$globalNav.toggleClass('active');
		}

	}


	$(function(){
		PROJECT.header.init();
	});

})(jQuery);