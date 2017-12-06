/*
    Author: Jeremy 
    File name: je-pagination.js
    Description: this file is for custom front-end pagination
    How to use:
                1. Add pagination class to the parent of the items
                2. after the parent class add this html to render the pagination here
                    <div class="col-xs-12 je-pagination pad-btm">
                        <divid="1"></div>
                    </div>
                3. To know how it works please see the sample page to test the script
    Sample Page:
                tcelectronic/toneprint-all-bass.php
*/

var PROJECT = PROJECT || {};

(function($) {
    "use strict";

    PROJECT.pagination = {

        init: function(obj) {
            if(!$(obj.parentClass).length) { return; }
            this.globalVar();
            this.domCache(obj);
            this.initPaginate(obj);
            this.onWindowResize(obj);
        },

        globalVar: function() {
            //need to make this global to make sure to get the recent data
            this.numberPerPagination;
        },

        domCache: function(obj) {
            this.$itemsParent = $(obj.parentClass);
        },

        initPaginate: function(obj) {
            var self, items, itemsOnPage, $container, numberPerPagination, currWindow;
            self = PROJECT.pagination;
            currWindow = PROJECT.tools.domBreakpoint();
            //default number of items per page
            itemsOnPage = obj.itemsOnPage;
            //this will be determine depends on the screen size
            if(currWindow == "mobile") {
                self.numberPerPagination = 3;
            } else {
                self.numberPerPagination = 5;
            }
            
            $.each(self.$itemsParent, function() {
                $container = $(this);
                items = $(this).children().length;
                
                self.paginate({
                    container: $container,
                    items: items,
                    itemsOnPage: itemsOnPage,
                    minPage: 1,
                    maxPage: self.maxPage(items, itemsOnPage),
                    numberPerPagination: self.numberPerPagination,
                    obj: obj
                });
            });
        },

        onWindowResize: function(obj) {
            var afterResize;

            $(window).on("resize", PROJECT.tools.debounce(function() {
                PROJECT.pagination.initPaginate(obj);
            },100,false));
        },

        maxPage: function(items, itemsOnPage) {
            return Math.ceil(parseFloat(items / itemsOnPage));
        },

        paginate: function(config) {
            var self;
            self = PROJECT.pagination;
            //show pagination if page > 1
            if(config.maxPage > 1) {
                //then render the pagination
                self.renderPagination(config);
            }
            
        },

        renderPagination: function(config) {
            var self, $pagination, $active, pageNumber, start, startHandler, end;
            self = PROJECT.pagination;
            $pagination = config.container.siblings("." + config.obj.paginationClass);

            // to avoid appending everytime
            if(!$pagination.find("ul").length) {
                
                //show only the items for page 1 and hide the others
                config.container.children().slice(config.itemsOnPage).hide();

                $pagination.append('<li class="first"><a href="#"><img src="../images/pagination-arrow-left-2.png"></a></li>');
                $pagination.append('<li class="prev"><a href="#"><span><img src="../images/pagination-arrow-left.png" class="prev">Prev</span></a></li>');

                for(var x=1; x <= config.maxPage; x++) {
                    if(x == 1) {
                        $pagination.append('<li class="is-page-number active"><a href="#">'+ x +'</a></li>');
                    } else {
                        $pagination.append('<li class="is-page-number"><a href="#">'+ x +'</a></li>');
                    }
                }

                $pagination.append('<li class="next"><a href="#"><span>Next<img src="../images/pagination-arrow-right.png" class="next"></span></a></li>');
                $pagination.append('<li class="last"><a href="#"><img src="../images/pagination-arrow-right-2.png"></a></li>');

                $pagination.wrapInner("<ul></ul>");

            }

            //adding and removing active to the pagination page number
            $pagination.find(".is-page-number").on("click", "a", self.changeLists("pageNumber", config));

            // Go to next item
            $pagination.find(".next").on("click", self.changeLists("next", config));

            // Go to previous item
            $pagination.find(".prev").on("click", self.changeLists("previous", config));

            // Go to last item
            $pagination.find(".last").on("click", self.changeLists("last", config));

            // Go to first item
            $pagination.find(".first").on("click", self.changeLists("first", config));

            //show only the pagination number needed at first
            $active = $pagination.find(".is-page-number.active");
            pageNumber = $active.find("a").text();

            end = (Math.ceil(parseFloat(pageNumber / self.numberPerPagination)) * self.numberPerPagination) - 1;
            start = end - (self.numberPerPagination - 1);

            self.displayPaginationNumber(pageNumber, $pagination, config);
            self.paginationLists(start, end, config);



        },

        changeLists: function(direction, config) {
            return function(e) {
                var self, $pagination, $active, pageNumber, lastPageNumber, negate, paginationLength, start, end;
                self = PROJECT.pagination;
                $pagination = config.container.siblings("." + config.obj.paginationClass);
                $active = $pagination.find(".is-page-number.active");
                pageNumber = $active.find("a").text();
                paginationLength = $pagination.find(".is-page-number").length;

                if(direction == "next") {
                    if(pageNumber < config.maxPage) {
                        $active.removeClass("active").next().addClass("active");
                    }
                } else if(direction == "previous") {
                    if(pageNumber != 1) {
                        $active.removeClass("active").prev().addClass("active");
                    }
                } else if(direction == "first") {
                    $active.removeClass("active");
                    $pagination.find("ul li").eq(2).addClass("active");

                    self.paginationLists(0, self.numberPerPagination - 1, config);
                } else if(direction == "last") {
                    $active.removeClass("active");
                    $pagination.find("ul li").eq(config.maxPage + 1).addClass("active");

                } else {
                    $(this).parent("li").addClass("active")
                     .siblings().removeClass("active");
                }

                //need to call the active pagination to get the recent page number
                $pagination = config.container.siblings("." + config.obj.paginationClass);
                $active = $pagination.find(".is-page-number.active");
                pageNumber = $active.find("a").text();

                end = (Math.ceil(parseFloat(pageNumber / self.numberPerPagination)) * self.numberPerPagination) - 1;
                start = end - (self.numberPerPagination - 1);

                self.paginationLists(start, end, config);
                self.renderLists(config);

                e.preventDefault();
                e.stopImmediatePropagation();
            }
        },

        renderLists: function(config) {
            var self, $container, start, end, $pagination, pageNumber;
            self = PROJECT.pagination;
            $container = config.container;
            $pagination = config.container.siblings("." + config.obj.paginationClass);
            pageNumber = $pagination.find(".active").text();
            
            start = config.itemsOnPage * (pageNumber - 1);
            end = start + config.itemsOnPage;

            // hide all the lists
            // then show needed items only
            $container.children().hide()
                      .slice(start, end).removeAttr("style");

            //display or hide the pagination custom buttons
            self.displayPaginationNumber(pageNumber, $pagination, config);

        },

        //refresh the pagination lists
        paginationLists: function(start, end, config) {
            var $container, $pagination;
            $container = config.container;
            $pagination = $container.siblings("." + config.obj.paginationClass);

            //hide first all the pagination lists
            $pagination.find(".is-page-number").hide();
            for(var x = start; x <= end; x++) {
                //show the pagination lists
                $pagination.find(".is-page-number").eq(x).removeAttr("style");
            }
        },

        displayPaginationNumber: function(pageNumber, $pagination, config) {
            if(pageNumber == 1) {
                $pagination.find(".first, .prev").addClass("disabled");
                $pagination.find(".next, .last").removeClass("disabled");
            } else if(pageNumber == config.maxPage) {
                $pagination.find(".first, .prev").removeClass("disabled");
                $pagination.find(".next, .last").addClass("disabled");
            } else {
                $pagination.find(".first, .prev, .next, .last").removeClass("disabled");
            }
        }
                
    }

})(jQuery);