/*
 treeMenu - jQuery plugin
 version: 0.6

 Copyright 2014 Stepan Krapivin

*/
(function($) {
  $.fn.treemenu = function(options) {
    options = options || {};
    options.delay = options.delay || 0;
    options.openActive = options.openActive || false;
    options.closeOther = options.closeOther || false;
    options.activeSelector = options.activeSelector || "active";

    this.addClass("treemenu");

    if (!options.nonroot) {
      this.addClass("treemenu-root");
    }

    options.nonroot = true;

    this.find("> li").each(function() {
      e = $(this);
      var subtree = e.find('> ul');
      var button = e.find('.toggler').eq(0);

      if (button.length == 0) {
        // create toggler
        var button = $('<span>');
        button.addClass('toggler');
        e.prepend(button);
      }

      if (subtree.length > 0) {
        subtree.hide();
        e.addClass('tree-closed');

        e.find(button).click(function() {
          var li = $(this).parent('li');

          if (options.closeOther && li.hasClass('tree-closed')) {
            var siblings = li.parent('ul').find("li:not(.tree-empty)");
            siblings.removeClass("tree-opened");
            siblings.addClass("tree-closed");
            siblings.removeClass(options.activeSelector);
            siblings.find('> ul').slideUp(options.delay);
          }

          li.find('> ul').slideToggle(options.delay);
          li.toggleClass('tree-opened');
          li.toggleClass('tree-closed');
          li.toggleClass(options.activeSelector);
        });

        $(this).find('> ul').treemenu(options);
      } else {
        $(this).addClass('tree-empty');
      }
    });

    if (options.openActive) {
      var cls = this.attr("class");

      this.find('.'+options.activeSelector).each(function(){
        var el = $(this).parent();

        while (el.attr("class") !== cls) {
          el.find('> ul').show();
          if(el.prop("tagName") === 'UL') {
            el.show();
          } else if (el.prop("tagName") === 'LI') {
            el.removeClass('tree-closed');
            el.addClass("tree-opened");
            el.show();
          }

          el = el.parent();
        }
      });
    }

    return this;
  }
})(jQuery);



/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

  'use strict';
  
  // class helper functions from bonzo https://github.com/ded/bonzo
  
  function classReg( className ) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }
  
  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;
  
  if ( 'classList' in document.documentElement ) {
    hasClass = function( elem, c ) {
      return elem.classList.contains( c );
    };
    addClass = function( elem, c ) {
      elem.classList.add( c );
    };
    removeClass = function( elem, c ) {
      elem.classList.remove( c );
    };
  }
  else {
    hasClass = function( elem, c ) {
      return classReg( c ).test( elem.className );
    };
    addClass = function( elem, c ) {
      if ( !hasClass( elem, c ) ) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function( elem, c ) {
      elem.className = elem.className.replace( classReg( c ), ' ' );
    };
  }
  
  function toggleClass( elem, c ) {
    var fn = hasClass( elem, c ) ? removeClass : addClass;
    fn( elem, c );
  }
  
  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };
  
  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( classie );
  } else {
    // browser global
    window.classie = classie;
  }
  
  })( window );

  

 /**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();

$(function(){

    var $base = $('.menu-side').find('.base');
    $('.base').treemenu({
        delay: 200,
        openActive: true,
        
      });


    
    console.log($base)
    
});