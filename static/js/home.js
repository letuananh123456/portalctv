var dwidht = $(document).width();
var dheight = $(document).height();
var wwidht = $(window).width();
var wheight = $(window).height();
// $(window).resize(function(){
//     if(wwidht>1170){
//          $('.homelanding').css('height',($(window).height()-97)+'px');
//     }
// });
$(document).ready(function(){
	// if(wwidht>1170){
	// 	$('.homelanding').css('height',(wheight-97)+'px');
	// }
	isNRI();
	$(window).scroll(function(){
		var scrolltop = $(this).scrollTop();
        
        var scrollAmt = (wheight <= 1024) ? 70 : 200;
		if(scrolltop < scrollAmt) 
		$('nav').removeClass('fixedh');
		
		else
		$('nav').addClass('fixedh');
	})	
	 $('.center').slick({
		centerMode: true,
		centerPadding: '100px',
		//variableWidth:true,
		slidesToShow: 2,
		responsive: [
	
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
		variableWidth:true,
        centerPadding: '20px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
	arrows: false,
	centerMode: true,
	variableWidth:true,
	centerPadding: '20px',
        slidesToShow: 1
      }
    }
  ]
});

	$('.humberIcon').click(function(event) {
	$('.overlaybox').show();
	
	 $('.policynav').addClass('menuslide');
     $('body').css({'overflow':'hidden','position':'fixed','height': '100%'});
	});
	$('.closenav,.overlaybox').click(function(event) {
	$('.overlaybox').hide();
	$('body').removeAttr('style');
      $('.policynav').removeClass('menuslide');
    
	});

 
	
	$('#metismenu li ul').hide();
	$('#metismenu li a.list_item').click(function (event) {
		var currObj = $(this);
		if (currObj.parent().children("ul").length > 0) {
			if ($(this).parent('li').hasClass('active')) {
				$('#metismenu li').removeClass('active');
				$('#metismenu li ul').hide();
			} else {
				$('#metismenu li').removeClass('active');
				currObj.parent().addClass('active');
				$('#metismenu li ul').hide();
				$('#metismenu li.active ul').show();
			}
		}
	});
	
	$("a").on('click', function(event) { 
		  if (this.hash !== "" && this.hash !== "#license" && this.hash !== "#isnp") {
		  event.preventDefault();
		  var hash = this.hash;    
			  $('html, body').animate({
				scrollTop: $(hash).offset().top
			  }, 800, function(){
				window.location.hash = hash;
			  });
		} 
	});

    $('.knowmore').click(function() {
			$('.overlaybox').show();
			$('body').css('overflow','hidden');	
            var tops = ($(window).height() > 700) ? -550 : -430;                
            $('.seo_content_know_more').show();
			// .animate({
                // top: tops + 'px'
            // }, 500);
            });
            $('.seo_content_know_more .close,.overlaybox').on('click',function() { 
				$('body').removeAttr('style');			
				$('.overlaybox').hide('slow');			
                $('.seo_content_know_more').hide()                
            })
		//	showhide();
});

	
function detectBrowser() {
    var N = navigator.appName;
    var UA = navigator.userAgent;
    var browserVersion = UA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    browserVersion = browserVersion ? [browserVersion[1]] : N;
    return browserVersion;
}
function InsertTracking(VisitId, ipaddress, sessionID, utmsource, utmterm, utmmedium, utmcampaign, leadsource, url, CustID) {
    var strBrowser = detectBrowser();
    Data = '{"VisitId":"' + VisitId + '","url":"' + url + '","sessionID":"' + sessionID + '","utmsource":"' + utmsource + '","utmterm":"' + utmterm + '","ipaddress":"' + ipaddress + '","browser":"' + strBrowser + '","leadsource":"' + leadsource + '","utmmedium":"' + utmmedium + '","utmcampaign":"' + utmcampaign + '","CustID":"' + CustID + '"}';
    TrackUrl = document.location.protocol+'//' + document.location.host + '/services/tracking.php';
    $.ajax({
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json")
        },
        url: TrackUrl,
        type: "POST",
        data: Data,
        dataType: "json",
        success: function(msg) {
            if (msg != '') $('#gaData').attr('data-visit', msg.visitId)
        }
    })
}
function changeRibonForNRI(strCountryName){
    //alert(strCountryName);
    strCountryName = strCountryName.toLowerCase();
    if(strCountryName != 'zz' && strCountryName != 'india'){
        //For old home page
        var chkMobile = false;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            chkMobile = true;
        }
        if(chkMobile){
            $(".topproduct_Mob ul.topproducts.mobileProducts:nth-child(1) > li:nth-child(3) a,.topproduct_Mob ul.topproducts.mobileProducts:nth-child(1) > li:nth-child(1) a").append('<i class="ribbon nri"></i>');
            $(".topproduct_Mob ul.topproducts.mobileProducts:nth-child(1) > li:nth-child(1)").before($(".topproduct_Mob ul.topproducts.mobileProducts:nth-child(1) > li:nth-child(3)"));
        } else {
            $(".topproducts.desktopProducts > li:nth-child(3) a.investment,.topproducts.desktopProducts > li:nth-child(1) a.termlife").append('<i class="ribbon nri"></i>');
            $(".topproducts.desktopProducts > li:nth-child(1)").before($(".topproducts.desktopProducts > li:nth-child(3)"));
        }



        //For new home page
        $(".container .row.products > a.links:nth-child(3),.container .row.products > a.links:nth-child(1)").prepend('<p class="planfornri">Plans for NRI\'s</p>');
        $(".container .row.products > a.links:nth-child(1)").before($(".container .row.products > a.links:nth-child(3)"));
    }
}
function getCountry(){    
    var InvCountryJson = [
    {"CountryCodeId": "375", "CountryName": "United Arab Emirates", "CountryCode": 971, "MIN": 9, "MAX": 9},
    {"CountryCodeId": "187", "CountryName": "Kuwait", "CountryCode": 965, "MIN": 8, "MAX": 8},
    {"CountryCodeId": "288", "CountryName": "Qatar", "CountryCode": 974, "MIN": 8, "MAX": 8},
    {"CountryCodeId": "308", "CountryName": "Saudi Arabia", "CountryCode": 966, "MIN": 9, "MAX": 9}
    ];
    $.ajax({
            url: 'https://termcjapi.policybazaar.com/api/country',
            dataType: "json",
            success: function (countrydata) {//countrydata = {"countryName": "United Arab Emirates"};
                if (typeof countrydata.countryName !== 'undefined') { 
                    changeRibonForNRI(countrydata.countryName);
                    $.each(InvCountryJson, function (i, o) {                                            
                        if (o.CountryName.toLowerCase() === countrydata.countryName.toLowerCase()) {
                            countryName = o.CountryName;
                            countryId = o.CountryCodeId;                            
                            countryCode = o.CountryCode;                            
                            return;
                        }
                    });
                }
            }
        });
}
function isNRI(){    
    $.ajax({
            url: 'https://termcjapi.policybazaar.com/api/country',
            dataType: "json",
            success: functio
            n (countrydata) {
                if (typeof countrydata.countryName !== 'undefined') { 
                    changeRibonForNRI(countrydata.countryName);
                   if(countrydata.countryName != 'zz' && countrydata.countryName != 'india'){
                                $('#toofree').html('+91124-6656507');
                            }                   
                }
            }
        });
}
//Call API for DocPrime
function docPrimeAd(Cip,visitid){
		//var Cip = '<?php //echo ($clientIP=='')?'122.160.108.90':$clientIP; ?>';
            return true;
}

function getClickv3(strEvent, strClickFor,productid,strCollection,strRedirectUrl,utm_content) {
    if (strEvent != '' && strClickFor != '') {
        var VisitID = $('#gaData').attr('data-visit');
        try {
            dataLayer.push(
                {'event': 'eventTracking','eventCategory': 'HomeV4Click','eventAction': strClickFor,'eventLabel': VisitID,'visitId': VisitID }
                )           
        } catch (e) {}
		if(productid !='' && strCollection !=''){                
                pbEventTracker(productid,strCollection)                
           }
    }
    setTimeout(function() {
        return RedirectUrlHomeProduct(strRedirectUrl,false,utm_content);
    }, 100);
}

function pbEventTracker(productid,strCollection){
    try{
    var VisitID = $('#gaData').attr('data-visit');
    var collection = (productid==7)?'PBEVENT':'Investment_EVENT';
    if(productid==7)
        Data = '{"visitId":"' + VisitID + '","LeadID":"0","pageName":"Home","event":"' + strCollection + '","collection":"' + collection + '"}';
    else
        Data = '{"VisitID":"' + VisitID + '","LeadID":"0","pageName":"Home","event":"' + strCollection + '","collection":"' + collection + '"}';
    
    //TrackUrl = 'http://pbevent.policybazaar.com/pbeventtracker/api/event';
	TrackUrl = document.location.protocol+'//' + document.location.host + '/services';
    $.ajax({
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Accept", "application/json")
        },
        url: TrackUrl,
        type: "POST",
        data: Data,
        dataType: "json",
        async:true,
        success: function(msg) {            
        }
    })
    } catch (e) {}
    return false;
}


function getClickNew(strEvent, strClickFor,productid,strCollection,strRedirectUrl) {
    if (strEvent != '' && strClickFor != '') {
        var eventName = 'newHomePagev5';
        try {
            ga('pbTrackerObj.send', 'event', eventName, strClickFor, '', {
                'nonInteraction': 1
            });            
        } catch (e) {}
		if(productid !='' && strCollection !=''){                
                pbEventTracker(productid,strCollection)
                }
    }
    setTimeout(function() {
        return RedirectUrlHomeProduct(strRedirectUrl,true,'home_v4');
    }, 100);
}


function RedirectUrlHomeProduct(strRedirectUrl,isNewTab,utm_content) {
    var querystring = window.location.search;
    var href = strRedirectUrl;
    if(utm_content!=''){
        if(href.indexOf("utm_source") > -1) {
           href = removeParam("utm_source",href);
        }
        if(href.indexOf("utm_term") > -1) {
           href = removeParam("utm_term",href);
        }
        if(href.indexOf("utm_medium") > -1) {
           href = removeParam("utm_medium",href);
        }
        if(href.indexOf("utm_campaign") > -1) {
           href = removeParam("utm_campaign",href);
        }
        var n = href.indexOf('?');
        if (n > 0) {
            querystring = querystring.replace('?', '&');
        }
        if (href) {
            href += querystring;
            var n = href.indexOf('?');
            if (n > 0) {
                href += '&';
            } else {
                href += '?';
            }
            href += 'utm_content='+utm_content;
            strRedirectUrl = href;
        }
    }
    if(isNewTab)
        window.open(strRedirectUrl,'_new');  
    else  
        window.location.href = strRedirectUrl;
    return false;
}

function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}
function setCookie(name, value, expires, path, domain, secure) {
    cookieStr = name + "=" + escape(value) + "; ";

    if (expires) {
        expires = setExpiration(expires);
        cookieStr += "expires=" + expires + "; ";
    }
    if (path) {
        cookieStr += "path=" + path + "; ";
    }
    if (domain) {
        cookieStr += "domain=" + domain + "; ";
    }
    if (secure) {
        cookieStr += "secure; ";
    }
    //alert(cookieStr);	
    document.cookie = cookieStr;
    //alert(document.cookie);
}

function setExpiration(cookieLife) {
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
    return  expr.toGMTString();
}

function getCookie(name) {
    if (document.cookie.length > 0) {
        begin = document.cookie.indexOf(name + "=");
        if (begin != -1) {
            begin += name.length + 1;
            end = document.cookie.indexOf(";", begin);
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(begin, end));
        }
    }
    return null;
}