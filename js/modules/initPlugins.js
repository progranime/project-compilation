var PROJECT = PROJECT || {};

(function($) {
	"use strict";

	PROJECT.initPlugins = {

		init: function() {
			//for cards default itemsOnPage = 3
			if($(".pagination-holder.cards").length) {
				PROJECT.pagination.init({
					parentClass: ".pagination-holder.cards",
					paginationClass: "je-pagination",
					itemsOnPage: 3
				});
			}

			if($(".pagination-holder.pt").length) {
				PROJECT.pagination.init({
					parentClass: ".pagination-holder.pt",
					paginationClass: "je-pagination",
					itemsOnPage: 6
				});
			}
			
		}

	}

	$(function() {
		PROJECT.initPlugins.init();
	});



})(jQuery);