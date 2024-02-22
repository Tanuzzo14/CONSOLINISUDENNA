
/**
 * get Instagram latest post.
 *
 * @params {object}   args      - 
 * @params {string}   args.count    - int
 * @params {string}   args.token    - string, default: "12464375.5b9e1e6.2924280151d74a58a7e437a828decc37"
 * @params {string}   args.userId   - string, default: "308301284"
 * @params {string}   args.tag    - string, default: "slmf"
 * @params {string}   args.filter   - string: "user" || "tags", default: "user"
 * @params {string}   args.onComplete - function, on load json
 *
 */
var Instagram = (function() {
  'use strict';

  function Instagram( args ) {
    
    // enforces new
    if ( !( this instanceof Instagram ) ) {
      return new Instagram( args );
    };
    
    this.settings = {
      count         : 3,
      token         : "12464375.5b9e1e6.2924280151d74a58a7e437a828decc37",
      userId        : "308301284",
      tag           : "slmf",
      filter      : "user",
      numCharacters : 140,
      monthNames    : [ "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC" ],
      container     : $( ".s-instagram" ),
      onComplete    : function(){ },
    };
    this.data = {};

    $.extend( true, this.settings, args || {} );

    var self = this;

    switch( this.settings.filter ) {
      case "user":

        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/users/ssdconsolinienna/" + this.settings.userId + "/media/recent/?access_token="+this.settings.token+"&count="+this.settings.count,
          success: function( data ) {
            
            self.data = data.data;
            self.render();
          }
        } );
        break;
      case "tag":
        
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/tags/nextmatchconsolini/" + this.settings.tag + "/media/recent?access_token="+this.settings.token+"&count="+this.settings.count,
          success: function( data ) {
            
            self.data = data.data;
            self.render();
          } 
        } );
        break;
    };
  };

  /**
  * Append the items.
  *
  * @fires Instagram
  */
  Instagram.prototype.render = function() {

    var months = this.settings.monthNames,
      numCharacters = this.settings.numCharacters,
      container = this.settings.container;
    
    $.each( this.data, function( index, val ) {
      
      var date = new Date(parseInt(val.created_time) * 1000),
        text = val.caption.text.trunc( numCharacters, true ), // acorta texto de slide
        tweet = val.caption.text.trunc( 143 - val.link.length, true ), // acorta texto del tweet
        isfirst = index <= 0,
        cl = isfirst ? "first" : "";

      text = text.wrapp( "#", "span" );

      container.append( "
        <div class='bottom " + cl + "'>
          <div class='bottom-left'>
            <div class='bottom-left-date'>
              <div class='date-day'>" + ( "0" + date.getDate() ).slice( -2 ) + "</div>
              <div class='date-month'>" + months[ date.getMonth() ] + "</div>
              <div class='date-year'>" + date.getFullYear() + "</div>
            </div>
          </div>
          <div class='bottom-right'>
            <div class='data'>
              <div class='data-media'>
                <a href='" + val.link + "' target='_blank' title='Ir a Solo los más fuertes' >
                  <img src='" + val.images.low_resolution.url + "' alt='" + text + "' width='240' height='240' />
                </a>
              </div>
              <div class='data-content'>
                <div class='data-content-top'>
                  <a href='" + val.link + "' target='_blank' title='Ir a Solo los más fuertes' >
                    <h1>" + val.user.username + "</h1>
                  </a>
                  <p>" + text + "</p>
                </div>
                <div class='data-content-bottom'>
                  <span>COMPARTIR</span>
                  <ul>
                    <li>
                      <a href='http://twitter.com/intent/tweet?text=" + encodeURIComponent( tweet ) + "&url=" + encodeURIComponent( val.link ) + "' class='popup' target='_blank' title='Compartir en Twitter'>
                        <span class='icons twitter'>T</span>
                      </a>
                    </li>
                    <li>
                      <a href='http://www.facebook.com/sharer.php?u=" + encodeURIComponent( val.link ) + "&t=" + encodeURIComponent( val.caption.text ) + "' class='popup' target='_blank' title='Compartir en Facebook'>
                        <span class='icons facebook'>f</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> " );
    } );

    this.settings.onComplete();
    this.bind( { action: "slider" } );
    this.bind( { action: "popup" } );
  };

  /**
  * Append the items.
  *
  * @params {object}  params.action   - string: "slider"
  *
  * @fires Instagram
  */
  Instagram.prototype.bind = function( params ) {
    
    switch( params.action ) {
      case "slider":
        
        this.settings.container
        .cycle( {
            speed       : 600,
            manualSpeed   : 100,
            pauseOnHover  : true,
            log       : false,
            pager       : ".slider-prod-pager",
            pagerTemplate   : "<a href='#' ><span></span></a>",
            prev      : ".s-instagram .arrow-prev-white",
            next      : ".s-instagram .arrow-next-white",
            fx        : "fade",
            timeout     : 0,
            slides      : "> div.bottom"
        } );
        break;

      case "popup":

        this.settings.container.find( '.popup' )
        .on( "click", function( e ) {

          e.preventDefault();

          var width  = 575,
            height = 400,
            left   = ( window.screen.width / 2 ) - ( ( width / 2 ) + 10 ),
            top    = ( window.screen.height / 2 ) - ( ( height / 2 ) + 50 ),
            url    = this.href,
            opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
          
          window.open( url, 'twitter', opts );
        } );
        break;
    };
  };

  return Instagram;
}());