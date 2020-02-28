//Common function start
//var BASEURL = 'http://localhost/pb_content/policybazzar-home/';//Local
//var BASEURL = 'http://pbqa.policybazaar.com/policybazzar-home/';//QA
//var BASEURL = 'https://pbuat.policybazaar.com/policybazzar-home/';//UAT
var BASEURL = 'https://www.policybazaar.com/policybazzar-home/';//Live
var vendorCache = {};
var vendorXhr;
var startDate = new Array();var endDate = new Array();var dobDate = new Array();  
var startPicker = new Array();endPicker = new Array();dobPicker = new Array();

$('body').bind('cut copy paste', function (e) {
    e.preventDefault();
    return false;
});
var arrPidMapping = {
        "aegon-life-insurance": "197",
        "bajaj-allianz-life-insurance": "121",
        "bharti-axa-life-insurance": "20",
        "canara-hsbc-life-insurance": "179",
        "dhfl-pramerica-life-insurance": "265",
        "edelweiss-tokio-life-insurance": "162",
        "future-generali-india-life-insurance": "81",
        "hdfc-standard-life-insurance": "146",
        "icici-prudential-life-insurance": "758",
        "idbi-federal-life-insurance": "194",
        "kotak-mahindra-old-mutual-life-insurance": "37",
        "max-life-insurance": "150",
        "pnb-metlife-life-insurance": "31",
        "sbi-life-insurance": "757"
    };
var InvCountryJson = [
    {"CountryCodeId": "392", "CountryName": "India", "CountryCode": 91, "MIN": 10, "MAX": 10},
    {"CountryCodeId": "375", "CountryName": "United Arab Emirates", "CountryCode": 971, "MIN": 9, "MAX": 9},
    {"CountryCodeId": "24", "CountryName": "Australia", "CountryCode": 61, "MIN": 9, "MAX": 9},
    {"CountryCodeId": "35", "CountryName": "Bahrain", "CountryCode": 973, "MIN": 8, "MAX": 8},    
    {"CountryCodeId": "164", "CountryName": "Indonesia", "CountryCode": 62, "MIN": 9, "MAX": 11},
    {"CountryCodeId": "187", "CountryName": "Kuwait", "CountryCode": 965, "MIN": 8, "MAX": 8},
    {"CountryCodeId": "217", "CountryName": "Malaysia", "CountryCode": 60, "MIN": 9, "MAX": 9},
    {"CountryCodeId": "271", "CountryName": "Oman", "CountryCode": 968, "MIN": 8, "MAX": 8},
    {"CountryCodeId": "288", "CountryName": "Qatar", "CountryCode": 974, "MIN": 8, "MAX": 8},
    {"CountryCodeId": "308", "CountryName": "Saudi Arabia", "CountryCode": 966, "MIN": 9, "MAX": 9},
    {"CountryCodeId": "313", "CountryName": "Singapore", "CountryCode": 65, "MIN": 8, "MAX": 8},    
    {"CountryCodeId": "376", "CountryName": "United Kingdom", "CountryCode": 44, "MIN": 10, "MAX": 10},
    {"CountryCodeId": "378", "CountryName": "USA/Canada", "CountryCode": 1, "MIN": 10, "MAX": 10}];
var language = 'en';
var punchLine = JSON.stringify({
    "hi":{
            "term":"<span class='lighter'>प्रीमियम </span> की तुलना करें <span class='lighter'> 30 सेकंड </span> में",
            "car":"<span class='lighter'>प्रीमियम </span> की तुलना करें <span class='lighter'> 30 सेकंड </span> में",
            "term2":"16 बीमा कंपनियों से 34+ योजनाओं की तुलना करें और",
            "term3":"50% तक बचत करें",
            "investment":"अपने निवेश से उच्च लाभ अर्जित करने के लिए अब तुलना करें",
            "investment_child":"अपने बच्चे के वित्तीय कवर का निर्माण शुरू करने के लिए अभी तुलना करें",
        },
    "en":{
            "cancer":"Compare <span class='lighter'>Premiums </span> in <span class='lighter'> 30 Seconds</span>",
            "term":"Get <span class='lighter'>Rs 1 Cr. </span> life cover at <span class='lighter'> Rs. 16</span> a day*",
            "car":"Get <span class='lighter'>Quotes</span> from top insurers in <span class='lighter'>30 seconds</span>",
            "term2":"Compare 34+ plans from 16 insurers &",
            "term3":"Save upto 50%",
            "investment":"Compare Now To Earn High Returns From Your Investments",
            "investment_child":"Compare Now To Start Building Your Child\'s Financial Cover",
        }
    });
punchLine = JSON.parse(punchLine);
/*for bottom form sticky*/
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
	var wd = $(window).width();
        if($("#frmSticky").length != 0 && wd > 768) {
	var h= $('#pbNewsss').height()+100;
	var offset = $('#pbNewsss').position();
	var offsetbtm = $('.display_vd').position();
	if (scroll >=(h+offset.top) && (offsetbtm.top) > scroll) {
			$("#frmSticky").addClass("showfix");
			$('.showfix').animate({
				'opacity':1			
			},200);
		} else {
			$("#frmSticky").removeClass("showfix");
			$('.showfix').animate({
				'opacity':0			
			},200);
			
			
		}	
    }
});
/*end for bottom form sticky*/	
//GA 360
function GA360(leadId,enquiryId,customerId,bookingId,policyType){
    try{
        /*dataLayer.push({
            'event': 'leadSubmit', 
            'leadId':'<pass the lead ID wherever applicable >',
            'enquiryId':'<pass the enquiry ID wherever applicable>',
            'customerId':'<pass the customer ID wherever applicable>',
            'leadType':'<parent lead or child lead>',
            'bookingId':'<pass the booking ID wherever applicable>',  
            'policyType': '<pass Fresh / renewal or rollover>'
        })*/
        dataLayer.push({
            'event': 'leadSubmit', 
            'leadId':leadId,
            'enquiryId':enquiryId,
            'customerId':customerId,
            'leadType':'',
            'bookingId':bookingId,  
            'policyType': policyType,
			'productId':productId
        })
    }catch(e){}
}
function GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType){
    try{        
        dataLayer.push({
            'event': 'formSubmit', 
            'operatorType':userType,
            'errorField':errorFields.replace(/,+$/,''),
            'errorDescription':errorDescriptions.replace(/,+$/,''),
            'errorCounts':errorCounts,
			'productId':productId
        })
    }catch(e){}
}

function GA360FormSubmit(eventType,lobSection3){
    try{        
        var gaDataUtmMedium = $('#gaData').attr('data-utm-medium');
        var path = window.location.pathname.split("/");
        var pathLastName = path[path.length-2];                        
        pathLastName = pathLastName.replace(/-/g, ' ');
        ctaName = pathLastName +'/'+gaDataUtmMedium.toLowerCase();
        
        dataLayer.push({
            'event': eventType, 
            'ctaName':ctaName,
			'productId':productId,
			'lobSection3':lobSection3
        })
    }catch(e){}
}
function getGACId(strTrackingId) {
    var GACID = 'false';
    try {
      var trackers = ga.getAll();
      for (var i = 0; i < trackers.length; ++i)
      {
        var tracker = trackers[i];
        if (tracker.get('trackingId') == strTrackingId)
        {
          GACID = tracker.get('clientId');
        }
      }
    } catch (e) {
    }
    return GACID;
}
function getGCLId() {
    try {
    var nameEQ = "_gcl_aw" + "=";
    var gclid="";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) 
        {
            var cookieValue=c.substring(nameEQ.length, c.length);
            var startIndex=cookieValue.lastIndexOf(".");
            gclid=cookieValue.substring(startIndex+1);
        }
    }
    } catch (e) {
    }
    return gclid;
}  
    
$(function () {  


		$('.step2Form a').click(function(){		
			$('.step2Form').removeClass('active_sec').animate({"left":"100%"});
			$('.step1Form').addClass('active_sec').animate({"left":"-0%"});
			$('.topWrapcontainer').css('height',$('.step1Form').height()+12);
		});
	var activeTab = 'health_bg';
    var $tab = $('.leftTab');
    $('ul > li a', $tab).click(function () {
        $tab.removeClass(activeTab);
        $tab.addClass(activeTab);
        $('.content_box', $tab).fadeOut(300);
        $('.content_box', $tab).removeClass(activeTab);

        var tabHighlight = $(this).attr('class');
        $('.content_box', $tab).addClass(tabHighlight + '_bg').fadeIn(300);
        $tab.removeClass(activeTab).addClass(tabHighlight + '_bg');
        activeTab = tabHighlight + '_bg';
    });

    $('.select_feild').click(function () {
        if (!$('input', $(this)).is(':checked')) {
            $('input', $(this)).prop("checked", false);
            $(this).parent().removeClass('active');
        } else {
            $('input', $(this)).prop("checked", true);
            $(this).parent().addClass('active');
        }
    });

    //Load random form on home page
    var arrTabName = ["health", "term", "investment", "car", "travel"];
    //var loadTabName = arrTabName[Math.floor(Math.random() * arrTabName.length)];//Get random tab name
    var loadTabName = arrTabName[0];
    setTimeout(function () {
        $('.leftTab ul li>a.' + loadTabName).trigger('click');
    }, 1000);
    //End random form load
    /*for mobile header*/    
    $("#navsidebaricon2").click(function () {
        if ($(this).hasClass("active")) {
            $("#navsidebar").animate({"left": -270});
            $("body").animate({"left": 0});
            $("body").removeClass("openMenu");
            $(this).removeClass("active");
            $(".overLay").fadeOut();
        } else {
            $("#navsidebar").animate({"left": 0});
            $("body").addClass("openMenu");
            $("body").animate({"left": 0});
            $(this).addClass("active");
            $(".overLay").fadeIn();
        }
    });
		$('.car_offer_sticky').click(function (){
        window.open('https://ci.policybazaar.com/?pb_campaign=bu_topsticky','_new');  
    });
	$('.tw_offer_sticky').click(function (){
        window.open('https://twowheeler.policybazaar.com/?pb_campaign=bu_topsticky','_new');  
    });
       $(document).on('blur','#twoWheelerRegistrationNumber',function(){
      $(this).removeClass('blank');
        var value = ($(this).val() == "") ? true :false;
        if(value){
             $(this).parents('.input_box').removeClass('addedvalue');
             
            return;
        }
        else{
            $(this).parents('.input_box').addClass('addedvalue');
            
            $(this).focus();
        }
    });
     $(document).on('focus','#twoWheelerRegistrationNumber',function(){$(this).addClass('blank');});  
     

     
    //TW End
    
    $(".overLay").click(function () {
        $("#navsidebar").animate({"left": -270});
        $("body").animate({"left": 0});
        $("body").removeClass("openMenu");
        $("#navsidebaricon2").removeClass("active");
        $(".overLay").fadeOut();
    });

    $(".sidenav li span").click(function () {
        if ($(this).parent().hasClass("active")) {
            $(".sidenav li ul").slideUp();
            $(".sidenav li").removeClass("active")
        } else {
            $(".sidenav li ul").slideUp();
            $(this).next("ul").slideDown();
            $(".sidenav li").removeClass("active")
            $(this).parent().addClass("active")
        }
    });

    $(".sidenav li li span").css("pointer-events", "none");
    /*end mobile header*/
    
    $('.knowMore,.know_more').click(function () {
        var tops = ($(window).height() > 700) ? -650 : -400;
        $('.overlay_area').css({'height': $(window).height(), 'top': $(window).height()})
        $('.overlay_area').show().animate({opacity: '0.8'}, 300);
        $('.seo_content_box').show().animate({top: tops + 'px'}, 500);
    });

    $('.close_pop').click(function () {
        $('.seo_content_box').fadeOut('slow');
        $('.overlay_area').animate({opacity: '0'}, 500);
        $('.seo_content_box,.overlay_area').hide('slow')
    })
    /*Dropdown*/

    $('.dropdown').hover(
        function () {
            //$(this).addClass('open');
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
        },
        function () {
            //$(this).removeClass('open');
            $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
        }
    );
});
fncSetFormValue = function (tab) {
    if(tab=='car' || tab=='twowheeler'){
            if (!localStorage.getItem('getLastTab')) {
            } else {
            var lastTabData = localStorage.getItem('getLastTab');
            var obj = $.parseJSON(lastTabData);
            switch (obj.tabName) {
            case 'car':
                $('.car-bg #carRegistrationNumber').val(obj.regNum);
                break;
            case 'twowheeler':
                $('#twoWheelerRegistrationNumber').val(obj.regNum);
                break;
            }
        }
    }else{                
    //Get pbcjpreqd
        $.ajax({
        url: BASEURL + 'cj-process.php?type=getpbcjpreqd',
        type: "GET",
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data)
        {
            obj = data.Data; 
            if(obj==undefined){
                obj = data;
            }
            if(obj !=''){
       
        if(tab==obj.tabName){
        switch (obj.tabName) {
            case 'term':
                $('.term-bg .proceedGray').parent('.input_field.pro').hide();
                setTimeout(function () {
                    $('.term-bg .proceedGray').parent('.input_field.pro').hide();
                    $('.step2TermDetails').show();
                    $('.term-bg #termAmt').val(obj.coverAmt);
                    fnFormatCurrencyIndianStyle($('.term-bg #termAmt'), 20);
                    $('.fig_lbl').html(convert_number2(obj.coverAmt)).removeClass('none');

                    $('.term-bg #termBirthday .birthDate').val(obj.dobDay);
                    $('.term-bg #termBirthday .birthMonth').val(obj.dobMonth);
                    $('.term-bg #termBirthday .birthYear').val(obj.dobYear);
                    $('input[name="termSmoke"][value="' + obj.tobacco + '"').attr('checked', 'checked');
                    $('input[name="termAnnualIncome"][value="' + obj.annualIncome + '"').attr('checked', 'checked');
					$('input[name="termAnnualIncome"][value="' + obj.annualIncome + '"').parents('.control-group').children('.control').removeClass('select');
                    $('input[name="termAnnualIncome"][value="' + obj.annualIncome + '"').parent('.control').addClass('select');                    
                    var objCityPin = $('.term-bg #termCity');
                    objCityPin.val(obj.city_name);
                    objCityPin.attr('data-cityid', obj.city_id);
                    objCityPin.attr('data-stateid', obj.state_id);

                    var curVal = obj.country;
                    var objCountry = $('.term-bg #termCountry');
                    var objSpan = $('.term-bg .countryCode span');
                    var objTextBox = $('.term-bg .countryCode input');
                    var objCityTextBox = $('.term-bg #termCity')
                    if (curVal == 392) {
                        objCityTextBox.show().val(obj.city_name);
                        objCityTextBox.attr({"data-cityid": obj.city_id, "data-stateid": obj.state_id});                        
                        $('.term-bg .lblCountry').text('City');
                    } else {
                        objCityTextBox.val('').hide();
                        objCityTextBox.attr({"data-cityid": "", "data-stateid": ""});
                        $('.term-bg .lblCountry').text('Country');
                        $('.term-bg #nri').show();
                        $('.term-bg #nri [value="'+obj.nri+'"]').prop('checked', true);
                        $('.term-bg #email p').hide();
                        $('.term-bg #email').show();
                    }
                    if (curVal == 999) {
                        objSpan.text('').hide();
                        objTextBox.show();
                        $('.term-bg #termOtherCountryCode').val(obj.countryCode);
                    } else {
                        $('.term-bg #termOtherCountryCode').val('');
                        objTextBox.hide();
                        objSpan.text('+' + obj.countryCode).show();
                    }
                    objCountry.val(obj.country);

                    $('.term-bg #termGender').val(obj.gender);
                    $('.term-bg #termName').val(obj.Name);
                    $('.term-bg #termEmail').val(obj.EmailID);
                    $('.term-bg .mobNumber').val(obj.MobileNo);
					//$('.term_top .disForm .leftContent').removeClass('small');
                    //$('.term_top .disForm .leftContent').addClass('big');
                }, 1000);
                break;
                case 'cancer':
                $('.cancer-bg .proceedGray').parent('.input_field.pro').hide();
                setTimeout(function () {
                    $('.cancer-bg .proceedGray').parent('.input_field.pro').hide();
                    $('.step2CancerDetails').show();
                    $('.cancer-bg #termAmt').val(obj.coverAmt);
                    fnFormatCurrencyIndianStyle($('.cancer-bg #termAmt'), 20);
                    $('.fig_lbl').html(convert_number2(obj.coverAmt)).removeClass('none');

                    $('.cancer-bg #termBirthday .birthDate').val(obj.dobDay);
                    $('.cancer-bg #termBirthday .birthMonth').val(obj.dobMonth);
                    $('.cancer-bg #termBirthday .birthYear').val(obj.dobYear);
                    $('input[name="termSmoke"][value="' + obj.tobacco + '"').attr('checked', 'checked');
                    var objCityPin = $('.cancer-bg #termCity');
                    objCityPin.val(obj.city_name);
                    objCityPin.attr('data-cityid', obj.city_id);
                    objCityPin.attr('data-stateid', obj.state_id);

                    var curVal = obj.country;
                    var objCountry = $('.cancer-bg #termCountry');
                    var objSpan = $('.cancer-bg .termCode span');
                    var objTextBox = $('.cancer-bg .termCode input');
                    var objCityTextBox = $('.cancer-bg #termCity')
                    if (curVal == 392) {
                        objCityTextBox.show().val(obj.city_name);
                        objCityTextBox.attr({"data-cityid": obj.city_id, "data-stateid": obj.state_id});
                        objCountry.attr('style', 'width:30%');
                        $('.cancer-bg .lblCountry').text('City');
                    } else {
                        objCityTextBox.val('').hide();
                        objCityTextBox.attr({"data-cityid": "", "data-stateid": ""});
                        objCountry.attr('style', 'width: 100% !important');
                        $('.cancer-bg .lblCountry').text('Country');
                    }
                    if (curVal == 999) {
                        objSpan.text('').hide();
                        objTextBox.show();
                        $('.cancer-bg #termOtherCountryCode').val(obj.countryCode);
                    } else {
                        $('.cancer-bg #termOtherCountryCode').val('');
                        objTextBox.hide();
                        objSpan.text('+' + obj.countryCode).show();
                    }
                    objCountry.val(obj.country);

                    $('.cancer-bg #termGender').val(obj.gender);
                    $('.cancer-bg #termName').val(obj.Name);
                    $('.cancer-bg #termEmail').val(obj.EmailID);
                    $('.cancer-bg .mobNumber').val(obj.MobileNo);
                }, 1000);
                break;  
			case 'criticalillness':                
                setTimeout(function () { 
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').attr('checked', 'checked');
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').parents('.control-group').children('.control').removeClass('select');
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').parent('.control').addClass('select');                    
                    var objCityPin = $('#termCity');
                    objCityPin.val(obj.CityName);
                    objCityPin.attr('data-cityid', obj.CityID);
                    objCityPin.attr('data-stateid', obj.StateID);                    
                    $('#termName').val(obj.Name);
                    $('#termEmail').val(obj.EmailID);
                    $('#termMobile').val(obj.MobileNo);
                }, 1000);
                break;   
            case 'personalaccident':
                $('.term-bg .proceedGray').parent('.input_field.pro').hide();
                setTimeout(function () {
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').attr('checked', 'checked');
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').parents('.control-group').children('.control').removeClass('select');
                    $('input[name="termAnnualIncome"][value="' + obj.AnnualIncomeID + '"').parent('.control').addClass('select');                    
                    var objCityPin = $('#termCity');
                    objCityPin.val(obj.CityName);
                    objCityPin.attr('data-cityid', obj.CityID);
                    objCityPin.attr('data-stateid', obj.StateID);                    
                    $('#termName').val(obj.Name);
                    $('#termEmail').val(obj.EmailID);
                    $('#termMobile').val(obj.MobileNo);
                }, 1000);
                break;	
            /*case 'health':
                setTimeout(function () {
                    $('.health-bg .proceedGray').parent('.input_field.pro').hide();
                    $('.health-bg .step2HealthDetails').show();
                    $('.health-bg #healthMember').val(obj.members);
                    var objCityPin = $('.health-bg #healthCityPincode');
                    objCityPin.val(obj.city_name);
                    objCityPin.attr('data-cityid', obj.city_id);
                    objCityPin.attr('data-stateid', obj.state_id);
                    objCityPin.attr('data-pincode', obj.pincode);
                    $('.health-bg #healthIncome').val(obj.annual_income_id);
                    $('.health-bg #healthGender').val(obj.gender);
                    $('.health-bg #healthName').val(obj.Name);
                    $('.health-bg #healthEmail').val(obj.EmailID);
                    $('.health-bg .mobNumber').val(obj.MobileNo);
                    $('.health-bg #healthMobileCountry').val(obj.country);
                    $('.health-bg .countryCode').text('+' + obj.country);
                    $('input[name="healthIsPED"][value="' + obj.IsPED + '"').attr('checked', 'checked');
                    $('.health_top .disForm .leftContent,.disForm.hindiPages .leftContent.health_bg').removeClass('small');
                    $('.health_top .disForm .leftContent,.disForm.hindiPages .leftContent.health_bg').addClass('big');
                    disableHealthTitleOption();
                }, 1000);
                break;*/
				case 'healthsme':
                setTimeout(function () {
                    $('.healthsme-bg .proceedGray').parent('.input_field.pro').hide();
					if(obj.company_name !='' && obj.name !='')
                    $('.healthsme-bg .step2HealthDetails').show();
                    $('.healthsme-bg #healthsmeCompanyname').val(obj.company_name);
                    var objCityPin = $('.healthsme-bg #healthsmeCityPincode');
                    objCityPin.val(obj.city_name);
                    objCityPin.attr('data-cityid', obj.city_id);
                    objCityPin.attr('data-stateid', obj.state_id);
                    objCityPin.attr('data-pincode', obj.pincode);
                    //$('.healthsme-bg #healthsmeOption').val(obj.insurance_policy_option);
                    $('.healthsme-bg #healthsmeContactPerson').val(obj.Name);
                    $('.healthsme-bg #healthsmeMobile').val(obj.mobile);
                    $('.healthsme-bg #healthsmeEmail').val(obj.EmailID);
					$('.healthsme-bg #healthsmeGender').val(obj.gender);
					if(obj.groupPolicyType !=''){
                        $('.healthsme-bg .groupPolicyType').show();
                        $('.healthsme-bg [name=policyType][value='+obj.groupPolicyType+']').prop("checked", "checked");
                    }
                    //disableHealthTitleOption();
                }, 1000);
                break;
        }
    }
    }
}});
}
}

function detectBrowser() {
    var N = navigator.appName;
    var UA = navigator.userAgent;
    //var temp;
    var browserVersion = UA.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    //if(browserVersion && (temp= UA.match(/version\/([\.\d]+)/i))!= null)
    //browserVersion[2]= temp[1];
    //browserVersion= browserVersion? [browserVersion[1]]: [N, navigator.appVersion,'-?'];
    browserVersion = browserVersion ? [browserVersion[1]] : N;
    return browserVersion;
}
try{
$(window).load(function () {
    $('.control-group .invTerm,input[name="invAnnualIncome"],input[name="termAnnualIncome"]').click(function(e){
        $(this).parents('.control-group').children('.control').removeClass('select');
        $(this).parent('.control').addClass('select');
    });
	$('.policy_wrapper').css('visibility', 'visible');
    $('.formarea').addClass('fadeInUp');
    var x = 0;
    // $('.category li').eq(x).children('a').addClass('animated fadeInUp block');
    $('.category li').children('a').addClass('animated fadeInUp block');
    /* var interval = setInterval(function () {
     
     x++;
     if (x == $('.category li').length)
     clearInterval(interval);
     }, 200);*/
});
}catch(e){}
var utmTerm = $('#gaData').attr('data-utm-term');
var utmSource = $('#gaData').attr('data-utm-source');
var utmMedium = $('#gaData').attr('data-utm-medium');
var utmCampaign = $('#gaData').attr('data-utm-campaign');
var utmContent = $('#gaData').attr('data-display-for');
var visitId = $('#gaData').attr('data-visit');
var productId = $('#gaData').attr('data-pid');
var memberArray = new Array();
var chkItem = new Array();
var maxChild = 4;
var arrMember = {};
$(document).ready(function () {
    //For content faq section
    $('.faq_wrapper .accordion .dt,.faq-wrap .accordion .dt').click(function () {
        $(this).toggleClass('active');
        $(this).next('.dd').slideToggle();
        $(this).parent().siblings().find('.dd').slideUp();
        $(this).parent().siblings().find('.dt').removeClass('active');
    });
    
    //JS for ourpartner click
    var ourPartner = {
        "apollo":'insurance-companies/apollo-munich-insurance/',
        "baxa": 'insurance-companies/bharti-axa-general-insurance/',
        "cigna":'insurance-companies/cigna-ttk-health-insurance/',
        "HDFC-ERGO":'insurance-companies/hdfc-ergo-car-insurance/',
        "Max-Bupa":'insurance-companies/max-bupa-health-insurance/',
        "religare":'insurance-companies/religare-health-insurance/',
        "star-health":'insurance-companies/star-health-insurance/',
        "iffco":'insurance-companies/iffco-tokio-general-insurance/',
        "liberty":'insurance-companies/liberty-videocon-general-insurance/',
        "royal":'insurance-companies/royal-sundaram-general-insurance/',
        "Future Generali":'insurance-companies/future-generali-general-insurance/',
        "oriental":'insurance-companies/oriental-insurance/',
        "universal Sompo":'insurance-companies/universal-sompo-general-insurance/',
        "national":'insurance-companies/national-general-insurance/',
        "relianceGeneral":'insurance-companies/reliance-general-insurance/',
        //"KotakGeneral":'',
        "United":'insurance-companies/united-india-general-insurance/',
        // "digit":'',
        "edelweisstokio":'insurance-companies/edelweiss-tokio-life-insurance/',
        "hdfcstandard":'insurance-companies/hdfc-life-term-insurance-plans/',
        "icicip":'insurance-companies/icici-prudential-life-insurance/',
        "idbi":'insurance-companies/idbi-federal-life-insurance/',
        "indiafirst":'insurance-companies/indiafirst-life-insurance/',
        "Kotak":'insurance-companies/kotak-life-insurance/',
        "lic":'insurance-companies/new-india-assurance/',
        "metlife":'insurance-companies/pnb-metlife-life-insurance/',
        "aegonlife":'insurance-companies/aegon-life-insurance/',
        "Aviva":'insurance-companies/aviva-life-insurance/',
        "Bajaj":'insurance-companies/bajaj-allianz-life-insurance/',
        "sahara":'insurance-companies/sahara-life-insurance/',
        "sbilife":'insurance-companies/sbi-life-insurance/',
        // "maxlife":'',
        "Reliance":'insurance-companies/reliance-life-insurance/',

    };
	$(document).on('click','#productPartner a',function(){
        var dataHref = $(this).attr('href');
        if(dataHref=='javascript:void(0);'){
            var clickon = $(this).text();
            window.location.href = BASEURL+'../'+ourPartner[clickon];
        }
    });
    setCountry();
    $(document).on('blur','#carRegistrationNumber',function(){
        var value = ($(this).val() == "") ? true :false;
        if(value){
             $(this).parent('.inputBox').removeClass('addedvalue')
            return;
        }
        else{
            $(this).parent('.inputBox').addClass('addedvalue');
            $(this).focus();
        }
    });
    
	//Added it for term bu page only 
    $(document).on('change', '#termCountryCode', function () {
        var valCode = $(this).val();
        var valMinLen =  $('option:selected',$(this)).attr('data-min');
        var valMaxLen = $('option:selected',$(this)).attr('data-max');
        var valCodeText = $('option:selected',$(this)).text();
        $('.term-bg select.termcode option').removeAttr('selected');
        $('.term-bg #termOtherCountryCode').val(valCodeText);
        $('.term-bg .mobNumber').attr({'minlength':valMinLen,'maxlength':valMaxLen}).val('');
        $('.term-bg select.termcode option[value="'+valCode+'"]').attr('selected', 'selected');
        //$('.term-bg select.termcode').val(valCode);
        if(valCode=='392'){
            $('.term-bg #termCity').attr({'data-stateid':'35','data-cityid':'551'}).val('Delhi (Delhi)'); 
        } else {
            $('.term-bg .termCity').attr({'data-stateid':'','data-cityid':''}).val(''); 
        }   
    });
    //End
    $(document).on("mouseout", "select,.token-input-dropdown-facebook,#healthPopup,#policy_new_home .header", function () {
        $(this).focusout();
    });
    var memberArray = new Array();
    var chkItem = new Array();
    utmTerm = $('#gaData').attr('data-utm-term');
    utmSource = $('#gaData').attr('data-utm-source');
    utmMedium = $('#gaData').attr('data-utm-medium');
    utmCampaign = $('#gaData').attr('data-utm-campaign');
    utmContent = $('#gaData').attr('data-display-for');
    visitId = $('#gaData').attr('data-visit');
	productId = $('#gaData').attr('data-pid');
    //$(document).on('click', '.leftTab ul li>a', fncGetTabContentAndForm);

    //Car Start
    $(document).on('keyup', '#carRegistrationNumber,#twoWheelerRegistrationNumber', chkRegNumKeyUp);
    $(document).on('keypress', '#carRegistrationNumber', function(event) {
        if (event.keyCode === 13) { 
			var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
            $(parentId+".carBtnSubmit, "+parentId+'.carnextstep').click(); 
        } 
    });
    $(document).on('click', '#btnSubmit,.carBtnSubmit', fncCarProcess);
    $(document).on('click', '.car-bg .got_new_car', fncNewCarClick);
    $(document).on('click', '.car-bg .do_not', fncDonotKnowCarClick);
    $(document).on('click', '.getbestquote', fncCTACarClick);
    $(document).on('click', '.comparequote', fncCTACarClick);
    $(document).on('click', '.thirdpartyquote', fncCTACarClick);
    $(document).on('click', '.compareqte', fncCTACarClick);
    $(document).on('click', '.keybenefits', fncCTACarClick);
    $(document).on('click', '.getdiscountssavemoney', fncCTACarClick);
    //$(document).on("keyup", '.car-bg .carMobileNumber', fncOnlyNumber);
    //$(document).on('click', '.car-bg #btnSubmitMobile', fncCarMobileProcess);
    //Car End

    //TW Start
    $(document).on('click', '#btntwSubmit,.twoWheelerBtnSubmit', fncTWProcess);	
    $(document).on('keypress', '#twoWheelerRegistrationNumber', function(event) {
        if (event.keyCode === 13) { 
			event.preventDefault();
            var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
            $(parentId+".twoWheelerBtnSubmit").click(); 
        } 
    });
    $(document).on('click', '.twowheeler-bg .got_new_car', fncNewTWClick);
    $(document).on('click', '.twowheeler-bg .do_not', fncDonotKnowTWClick);
    $(document).on('blur','#twoWheelerRegistrationNumber',function(){
        var value = ($(this).val() == "") ? true :false;
        if(value){
             $(this).parents('.input_box').removeClass('addedvalue')
            return;
        }
        else{
            $(this).parents('.input_box').addClass('addedvalue');
            $(this).focus();
        }
    });
    //TW End

    //Term Start
    $(document).on("blur", '#termName', function(){
        var objStringName = $(this);
        var objStringVal = objStringName.val();
        objStringName.val($.trim(objStringVal.replace(/\s+/g, " ")));
    });
    $(document).on('keyup', '#termAmt', fncAmountAndLable);
    $(document).on('click', '#btnSubmitTerm', fncProcessTerm);
    $(document).on('change', '.term-bg #termBirthday .birthDate,.term-bg #termBirthday .birthMonth,.term-bg #termBirthday .birthYear',{name:'term'}, fncDisplayTermDetails);
    //$(document).on("change",'#termMobileCountry',fncSetTermCountryCode);
    $(document).on("change", '.term-bg #termCountry',{name:'term'}, fncSetTermCountryCode);
    $(document).on("keyup", '.term-bg .mobNumber', fncOnlyNumber);
    $(document).on("keyup", '.term-bg #termName', fncOnlycharacter);
    $(document).on("blur", '#termName', validationTermName);
    //$(document).on("blur", '#termEmail', validationTermEmail);
    // $(document).on("blur",'#termCity',validationTermCity);
    $(document).on("blur", '.term-bg .mobNumber,#termOtherCountryCode', validationTermMobile);
    //$(document).on("blur",'#termCity,.term-bg .mobNumber,#termOtherCountryCode',validationTermForm);
    $('.step2TermDetails').hide();
	$(document).on("click",'.term-bg .proceedGray',{name:'term'},validationTermFormStepOne);
    //Term End
    //Term sicky
    $(document).on('change', '.bannerDiv #termCountry', setTermCountryCodeSticky);
    $(document).on('keyup', '.bannerDiv #termmobile', fncTermMobileSticky);
    $(document).on('click', '.bannerDiv .detailBtn', proceedTermSticky);
    //
	 //Cancer Start
    $(document).on("keyup", '.cancer-bg .mobNumber', fncOnlyNumber);
    $(document).on('change', '.cancer-bg #termBirthday .birthDate, .cancer-bg #termBirthday .birthMonth, .cancer-bg #termBirthday .birthYear',{name:'cancer'}, fncDisplayTermDetails);
    $(document).on("change", '.cancer-bg #termCountry', {name:'cancer'},fncSetTermCountryCode);
    $(document).on('click', '#btnSubmitCancer', fncProcessCancer);
    $(document).on("click",'.cancer-bg .proceedGray',{name:'cancer'},validationTermFormStepOne);
    //Cancer End
    //Health Start
    $(document).on("focus", '#healthMember', fncDisplayMembersForm);
    $(document).on("click", '.addBtn .fa-plus', fncDisplayMembersForm);
    $(document).on("click", '.chkMember', fncCombineMember);
    $(document).on("change", '.chkMemberAge', fncCombineMember);
    $(document).on("click", '.healthAddChild', fncAddChild);
    $(document).on("change", '#healthMoreMembers', fncAddMoreMember);
    $(document).on("change", '#healthMobileCountry', fncSetCountryCode);
    $(document).on('click', '#healthPopup .travel_action .done, #healthPopup .travel_action .cancel', fncProcessMembersForm);
    $(document).on('click', '#btnSubmitHealth', fncProcessHealth);
    $(document).on('change', '#healthIncome', fncDisplayHealthDetals);
    $('.step2HealthDetails').hide();
    $(document).on('blur','.health-bg .mobNumber',fncHealthLeadCreate);	
    $(document).on("keyup", '.health-bg .mobNumber,.stickFooter_info .mobNumber', fncOnlyNumber);
    $(document).on('click', '#btnHealthStep1', fncProcessHealthStep1);    
    
    //Sticky form
    $(document).on("click", '.stickFooter_info .healthBtnSubmit', fncProcessHealthSticky);
    //Health End

    //Health SME Start
    $(document).on('change', '.healthsme-bg #healthsmeOption', fncDisplayHealthSmeDetals);
    $(document).on('blur', '.healthsme-bg #healthsmeCompanyname', fncDisplayHealthSmeDetals);
	$(document).on('focus', '.healthsme-bg #healthsmeContactPerson', fncDisplayHealthSmeDetals);
    $(document).on('click', '.healthsme-bg #btnSubmitHealthsme', fncProcessHealthSme);
    //$('.healthsme-bg .marker').hide();
    //Health SME End

    //Investment Start
    $(document).on('click', '.investment-bg .tab', fncInvTab);
    $(document).on('keyup', '#invamount,#invage,#birthDay,#invcountryCode', fncInvDigitOnly);
    $(document).on('keyup', '#invamount', fncAmountAndLableInv);
    $(document).on('keyup', '#birthDay,#invage', dobValidation);
    $(document).on('keyup', '#birthDay,#invage', ageValidation);
    $(document).on('keyup', '#invage,#birthDay', fncInvNeed);
    $(document).on('keyup', '#invemail,#travelemail', fncInvEmail);
    $(document).on('keyup', '#invname,#traveldob', fncInvText);
    $(document).on('blur', '#invCity', validationInvCity);
    $(document).on('keyup', '#invmobile', fncInvMobile);
    $(document).on('click', '.invTerm', fncInvNeed);
    //$(document).on('click', '.invproceed', fncInvProceed); 
    $(document).on('change', '#invCountry', setInvCountryCode);
    $(document).on('click', '.invproceed2', validateInvContactForm);
	$(document).on('keyup','#invPensionPermonth',SetPensionFromPurchasePower)
    //Investment End

    //Travel Start
    $(document).on('click', '.travel-bg .tab', fncTravelTab);
	$(document).on('click', '.travel-bg .proceedGray', fncTravelCheck);
    $(document).on('click', '.travelproceed', fncTravelProceed);
    $(document).on('keyup', '#travelname', fncTravelText);
    $(document).on('keyup', '#travelmobile', fncTravelMobile);
    //Travel End

    //City ga event on focus
    $(document).on('focus', '#termCity, #invCity, #healthCityPincode, #healthsmeCityPincode, #travelCity', fncCityFocus);
	//Critical illness Start
    $(document).on('click', '#btnSubmitCritical', validationCriticalForm);
    //Critical End
	$(document).on('click', '.insurer-name', function(){
		var insurerName = $(this).data('name');
		var eventName = $(this).data('link');
		var controlName = $(this).data('loc');
		gaTrakingInsurer(eventName,insurerName,controlName);

	});

});

function healthCTCClick(){
    //$('.thankyouCTC').html('');
    var leadsource = 'PB';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        leadsource = 'PBMOBILE';
    }
    $.ajax({
        url: BASEURL + 'cj-process-health.php?type=health_connect_ctc&leadsource='+leadsource,
        type: "get",
        cache: false,
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        success: function (data) {
            //console.log(data);
            data = JSON.parse(data);
            //console.log('Health CTC Click Response:'+data.CTCConnectCallResult);
            if(data.CTCConnectCallResult==true){
                //Get cid and pass it
                $.ajax({
                    url: cjProcessUrlHealth+'?type=getpbcid',
                    type: "get",
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    success: function (data) {
                        //console.log(data);
                        if(data != ''){
                            var res = data.split(':');
                            //console.log(res[0]);
                            dataLayer.push(
                                {'event': 'eventTracking','eventCategory': 'Health Insurance Hansel CTC','eventAction': 'CTC Triggered','eventLabel': res[0]}
                            );
                        }
                    }
                });
                //
                /*var htmlDataCTC = 'Thank You! We will call you back shortly';
                $('.thankyouCTC').html(htmlDataCTC).show();
                setTimeout(function(){ $('.thankyouCTC').hide(); }, 3000);*/
            }
        }
    });
}


fncCityFocus = function(){
    try{
        ga('pbTrackerObj.send', 'event', 'city-focus' , $(this).attr('id'), '',{'nonInteraction': 1});
    } catch(e){}
};

//Drop cookie for health for retargeting
    function prepareFrame() { 
        var ifrm = document.createElement("iframe"); 
        ifrm.setAttribute("src","https://www.cignattkonline.in/buy-health-insurance/init_cookie.php"); ifrm.style.width = "0px";ifrm.style.height ="1px"; document.body.appendChild(ifrm); 
    }
/*
 * Convert a string to base64 encode
 * @param string
 * @returns string
 */
var Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }};

/*
 * Check car registration number format
 * @param string
 * @returns boolean
 */
function checkRegistrationNumber(value) {
    return /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/.test(value);
}

/*
 * Check only number
 * @param string
 * @returns boolean
 */
function checkOnlyNumber(value) {
    return /^[0-9]*$/.test(value);
}

function onlyNumber(value) {
    return /^[0-9]*$/.test(value);
}

fncOnlyNumber = function () {
    if (!(/^[0-9]*$/.test($(this).val()))) {
        $(this).val('');
    }
};
/*
 * Check only character
 * @param string
 * @returns boolean
 */
function onlycharacter(value) {
    return /^[a-zA-Z\s]+$/.test(value);
}


fncOnlycharacter = function () {
    if (!(/^[a-zA-Z\s]+$/.test($(this).val()))) {
        $(this).val('');
    }
};

function onlycharacterwithspace(value) {
    return /^[a-zA-Z]+\s[a-zA-Z\s]+$/.test(value);
}

/*
 * Get current browser name and return
 * @returns String
 */
function getBrowser() {
    var userAgent = window.navigator.userAgent;
    var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
    for (var key in browsers) {
        if (browsers[key].test(userAgent)) {
            return key;
        }
    }
    ;
    return 'unknown';
}

/*
 * 
 * @params element object
 * @retun boolean
 */
function addError(obj, msg) {
    var parentDiv = obj.parents('.input_field');
    obj.addClass('error');
    parentDiv.addClass('error');
    $('.err', parentDiv).html(msg);
    return false;
}

/*
 * 
 * @params element object
 */
function clearError(obj) {
    var parentDiv = obj.parents('.input_field');
    obj.removeClass('error');
    parentDiv.removeClass('error');
    $('.err', parentDiv).html('');
}
/*
 * Load health mobile country list
 * @returns html string
 */
function fncGetMobileCountry(elementId) {
    var listCountry = '<option value="" data-country-code-id="">Country</option>';
    $.ajax({
        url: BASEURL + 'cj-process.php?type=get-mobile-country',
        type: "POST",
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, value) {
                listCountry += '<option value="' + value.CountryCode + '" ' + ((value.CountryCode == 91) ? 'selected' : '') + '  data-country-code-id="' + value.CountryCodeId + '">' + value.CountryName + '</option>';
            });
            $(elementId).html(listCountry);
        }
    });
}

/*
 * Load home page tab form
 * @returns htm string
 */
var objCustomeHtml ={
	'group_health_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Health</span> Insurance Policy</div><ul class="step otherProducts"><li><span>Customized plans from 10 different insurers</span></li><li><span>Instant purchase, immediate receipt</span></li><li><span>Free support for 7 days a week, 365 days a year</li><li><span>Full and free end to end assistance on claims</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_personal_accident_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Personal </span> Accident Cover</div><ul class="step otherProducts"><li><span>Customized plans from 10 different insurers</span></li><li><span>Instant purchase, immediate receipt</span></li><li><span>Free support for 7 days a week, 365 days a year</li><li><span>Full and free end to end assistance on claims</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_life_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Life</span> Insurance </div><ul class="step otherProducts"><li><span>Get Group Life Insurance Quotes</span></li><li><span>Lowest Premium Guaranteed</span></li><li><span>Buy/Renew Policy Online </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_travel_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Travel</span> Insurance</div><ul class="step otherProducts"><li><span>Buy Group Travel Insurance to Cover Your Employees</span></li><li><span>Get Free Premium Quotes</span></li><li><span>Compare Insurance Polices Online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'liability_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Liability </span> Insurance</div><ul class="step otherProducts"><li><span>Affordable rates on liability insurance plans </span></li><li><span>Instant issuance of the policy </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'professional_indemnity':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Professional  </span> Indemnity</div><ul class="step otherProducts"><li class="eq1"><span>Find out a wide range of professional indemnity insurance plans with PolicyBazaar and buy the best plan that suits your business needs. </span></li><li><span>Compare and buy plans from top insurers </span></li><li><span>Profession-specific insurance cover </span></li><li><span>Get free quotes online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'director_officers_liability':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Director\'s & Office Liability </span> (D&O Liability)</div><ul class="step otherProducts"><li><span>Compare and choose the best plan </span></li><li><span>Guarantees best rates in industry </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'fire_special_perils':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Fire </span>Insurance</div><ul class="step otherProducts"><li><span>Compare & Choose From Leading Insurers</span></li><li><span>Get Extensive Cover on Low Premium</span></li><li><span>Buy Fire & Special Perils Insurance Online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'burglary_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Burglary </span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span>  Buy burglary insurance and safeguard your assets. PolicyBazaar can help you compare and find the best plan.</li>  <li><span>Burglary Insurance from Leading Insurers</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'office_package_policy':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Office Package </span> Policy</div><ul class="step otherProducts"><li class="eq1"><span>Insure your office against all perils. Compare and choose the right office package insurance at PolicyBazaar.</li> <li><span>Compare and choose from leading insurers</span></li><li><span>Get extensive coverage on lowest premium</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'marine':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Marine </span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Customized plans from 10 different insurers</span></li><li><span>Instant purchase, immediate receipt</span></li><li><span>Free support for 7 days a week, 365 days a year</span></li><li><span>Full and free end to end assistance on claims</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'contractor_risk':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Contractor\'s All Risk </span></div><ul class="step otherProducts"><li class="eq1"><span>Get yourself covered for the cost of physical loss or damage to building works, public liability, advanced loss of revenue/income, installation and constructional plant/machinery.</span></li><li><span>Compare Plans from Top Insurance Companies </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'erection_risk':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Erection All Risk </span></div><ul class="step otherProducts"><li class="eq1"><span>Secure your property against any damages done during erection, installation and commissioning of plant and machinery.</li> <li><span>Compare quotes from leading insurers</span></li><li><span>Comprehensive coverage for your business</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'plant_machinery':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Construction Plant and Machinery</span></div><ul class="step otherProducts"><li class="eq1"><span>Insure your plant and machinery against physical loss or damage arising due to almost any cause.</li> <li><span>Compare plans from leading insurance companies</span></li><li><span>Affordable rates on insurance plans</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'workmen_compensation':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Workman Compensation </span></div><ul class="step otherProducts"><li class="eq1"><span>Take care of your employees\' work-related fatalities, injuries or illness by ensuring your business is adequately covered with workers\' compensation insurance.</span></li><li><span>Tailored plans as per your requirements </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'business_shop_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Shop Owners </span>Insurance</div><ul class="step otherProducts"><li><span>Compare quotes from leading insurance companies</span></li><li><span>Tailored plans as per your requirements</span></li><li><span>Choose coverages as applicable to your business</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
        'general_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-right healthsme"><span style="color:#ead527">General </span>Insurance</div><ul class="step otherProducts gnIns"><li class="eq1"><span>250+ plans from 18 insurance companies</span></li><li><span>Instant Purchase; Immediate Receipt</span></li><li><span>Free support for 7 days a week, 365 days a year</span></li><li><span>Full & free end-to-end assistance on claims</span></li></ul><div class="tc text-right">&nbsp;</div>',
	'shop_owners_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Shop Owners </span>Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Taking care of all the probable risks and perils faced by your small or medium sized business. Policy bazaar offers a range of coverages applicable to your business to choose from the top insurers.</div><ul class="info_list"><li><span>Compare quotes from leading insurance companies</span></li><li><span>Tailored plans as per your requirements</span></li><li><span>Choose coverages as applicable to your business</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
};

var objCustomeHindiHtml ={
	'group_health_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct textFormation"><div class="h3 text-center"><span style="color:#ead527">ग्रुप हेल्थ</span> इंश्योरेंस पॉलिसी</div><ul class="step otherProducts"><li><span>इंश्योरेंस कंपनियों से कॉर्पोरेट योजनाओं की तुलना करें</span></li><li><span>ग्रुप हेल्थ कवर पर सबसे कम प्रीमियम</li><li>ग<span>्रुप हेल्थ कवर पर सबसे कम प्रीमियम</li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_personal_accident_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Personal </span> Accident Cover</div><ul class="step otherProducts"><li class="eq1"><span>Compare and Buy Group Personal Accident Insurance at PolicyBazaar. Renew your policy online and save your time.</span></li><li><span>Compare Group Personal Accident Insurance from Leading Insurers</span></li><li><span>Get Free Premium Quotes of Group Personal Accident Insurance Policies</span></li><li><span>Buy Group Personal Accident Insurance Instantly</li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_life_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Life</span> Insurance </div><ul class="step otherProducts"><li class="eq1"><span> Buy group life insurance to cover all members of your group. Compare various plans at PolicyBazaar and enjoy a hassle-free experience.</li> <li><span>Get Group Life Insurance Quotes</span></span></li><li><span>Lowest Premium Guaranteed</span></span></li><li><span>Buy/Renew Policy Online </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'group_travel_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Group Travel</span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span> Buy Group Travel Insurance and safeguard your employees from all types of risks. Compare policies online at PolicyBazaar and buy the best plan at one click.</span></li><li><span>Buy Group Travel Insurance to Cover Your Employees</span></span></li><li><span>Get Free Premium Quotes</span></span></li><li><span>Compare Insurance Polices Online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'liability_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Liability </span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Choose and buy the best liability insurance plan online from PolicyBazaar. Make the best decision to get the plan that will protect you against all liabilities.</span></li><li><span>Free quotes from top insurers </span></span></li><li><span>Affordable rates on liability insurance plans </span></span></li><li><span>Instant issuance of the policy </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'professional_indemnity':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Professional  </span> Indemnity</div><ul class="step otherProducts"><li class="eq1"><span>Find out a wide range of professional indemnity insurance plans with PolicyBazaar and buy the best plan that suits your business needs. </span></li><li><span>Compare and buy plans from top insurers </span></span></li><li><span>Profession-specific insurance cover </span></span></li><li><span>Get free quotes online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'director_officers_liability':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Director\'s & Office Liability </span> (D&O Liability)</div><ul class="step otherProducts"><li class="eq1"><span> PolicyBazaar will help you design and implement a D&O liability insurance policy that fits with your business, by identifying your corporate and personal exposures to liability. </span></li><li><span>Get free online quotes from top insurers</span></span></li><li><span>Compare and choose the best plan </span></span></li><li><span>Guarantees best rates in industry </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'fire_special_perils':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Fire </span>Insurance</div><ul class="step otherProducts"><li class="eq1"><span> Get the best Fire & Special Perils Insurance at PolicyBazaar. Compare and choose an apt plan to secure your business. </li> <li><span>Compare & Choose From Leading Insurers</span></span></li><li><span>Get Extensive Cover on Low Premium</span></span></li><li><span>Buy Fire & Special Perils Insurance Online</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'burglary_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Burglary </span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span>  Buy burglary insurance and safeguard your assets. PolicyBazaar can help you compare and find the best plan.</li>  <li><span>Burglary Insurance from Leading Insurers</span></span></li><li><span>Get Free Insurance Quotes</span></li>       <li><span>Compare Policies Instantly</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'office_package_policy':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Office Package </span> Policy</div><ul class="step otherProducts"><li class="eq1"><span>Insure your office against all perils. Compare and choose the right office package insurance at PolicyBazaar.</li> <li><span>Compare and choose from leading insurers</span></span></li><li><span>Get extensive coverage on lowest premium</span></li><li><span>Buy office package insurance instantly</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'marine':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Marine </span> Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Catering to the needs of both importers and exporters marine insurance covers goods, freight and other interests against loss or damage to goods from the time it leaves the seller\'s warehouse until they reach the buyer\'s stockroom.</span></li><li><span>Compare plans from top insurers </span></li><li><span>View lowest premium on marine insurance policy</span></li><li><span>Buy plans online instantly </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'contractor_risk':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Contractor\'s All Risk </span></div><ul class="step otherProducts"><li class="eq1"><span>Get yourself covered for the cost of physical loss or damage to building works, public liability, advanced loss of revenue/income, installation and constructional plant/machinery. Compare and find the best plan at Policybazaar.com</span></li><li><span>Compare Plans from Top Insurance Companies </span></li><li><span>Instant Policy Issuance</span></li><li><span>User-friendly Online Comparison Portal</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'erection_risk':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Erection All Risk </span></div><ul class="step otherProducts"><li class="eq1"><span>Secure your property against any damages done during erection, installation and commissioning of plant and machinery. Compare and find the best plan at policybazaar.com</li> <li><span>Compare quotes from leading insurers</span></li><li><span>Comprehensive coverage for your business</span></li><li><span>Get policy online instantly</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'plant_machinery':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Construction Plant and Machinery</span></div><ul class="step otherProducts"><li class="eq1"><span>Insure your plant and machinery against physical loss or damage arising due to almost any cause. Compare and find the best plan that suits your business needs.</li> <li><span>Compare plans from leading insurance companies</span></li><li><span>Instant issuance of policy</span></li><li><span>Affordable rates on insurance plans</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'workmen_compensation':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-center healthsme"><span style="color:#ead527">Workman Compensation </span></div><ul class="step otherProducts"><li class="eq1"><span>Take care of your employees\' work-related fatalities, injuries or illness by ensuring your business is adequately covered with workers\' compensation insurance. PolicyBazaar offers a range of worker compensation plans from top insurers.</span></li><li><span>Compare quotes from leading insurance companies </span></li><li><span>Tailored plans as per your requirements </span></li><li><span>Buy worker compensation plan online </span></li></ul></div><div class="tc text-right">&nbsp;</div>',
	
	'business_shop_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 healthsme"><span style="color:#ead527">Shop Owners </span>Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Taking care of all the probable risks and perils faced by your small or medium sized business. Policy bazaar offers a range of coverages applicable to your business to choose from the top insurers.</span></li><li><span>Compare quotes from leading insurance companies</span></li><li><span>Tailored plans as per your requirements</span></li><li><span>Choose coverages as applicable to your business</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
        'general_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 text-right healthsme"><span style="color:#ead527">General </span>Insurance</div><ul class="step otherProducts gnIns"><li class="eq1"><span>250+ plans from 18 insurance companies</span></li><li><span>Instant Purchase; Immediate Receipt</span></li><li><span>Free support for 7 days a week, 365 days a year</span></li></ul><div class="tc text-right">&nbsp;</div>',
	'shop_owners_insurance':'<div class="arrow"></div><div class="provide_text otherBuProduct"><div class="h3 healthsme"><span style="color:#ead527">Shop Owners </span>Insurance</div><ul class="step otherProducts"><li class="eq1"><span>Taking care of all the probable risks and perils faced by your small or medium sized business. Policy bazaar offers a range of coverages applicable to your business to choose from the top insurers.</div><ul class="info_list"><li><span>Compare quotes from leading insurance companies</span></li><li><span>Tailored plans as per your requirements</span></li><li><span>Choose coverages as applicable to your business</span></li></ul></div><div class="tc text-right">&nbsp;</div>',
};

function ucwords (str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

var isCountryServiceCalled = 0;
var countryName = '';
var countryId = 392;
var min = 10;
var max= 10;
var countryCode = 91;
function fncGetFormInPage(elemClass, invTabShow, showLeft) {
        if(elemClass == 'health'){
            //Health CTC Start
            //CTC
            setTimeout(function(){
                try {
                    $.ajax({
                        url: BASEURL + 'cj-process-health.php?type=health_ctc',
                        type: "get",
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        //dataType: "json",
                        success: function (data) {
                            console.log(data);
                            data = JSON.parse(data);
                            if (data.msg == "success") {
                                $('.knowmoreBtn2').hide();
                                //GA360 Event
                                dataLayer.push(
                                    {'event': 'eventTracking','eventCategory': 'Health Insurance Hansel CTC','eventAction': 'Lead Created','eventLabel': data.cid }
                                );
                                /*var htmlDataCTC = '<div class="fix_btn_ctc"><div class="btn_inner"><span class="btn_icon"><i class="fa fa-phone" aria-hidden="true"></i></span><span class="btn_text"><b>call me </b> now</span></div></div>';
                                $('.btnCTC').html(htmlDataCTC);*/
                            } else {

                                $('.knowmoreBtn2').show();
                                //GA360 Event
                                dataLayer.push(
                                    {'event': 'eventTracking','eventCategory': 'Health Insurance Hansel CTC','eventAction': 'Lead Not Created','eventLabel': data.cid}
                                );
                            }
                        }
                    });
                } catch (e) {}
            }, 2000);
            //Health CTC End
        }
	if(elemClass =='term' && isCountryServiceCalled <= 0){
        isCountryServiceCalled = 1;
        $.ajax({
            url: 'https://termcjapi.policybazaar.com/api/v1/maxmind/country',
            dataType: "json",
            success: function (countrydata) {
                if (typeof countrydata.countryName !== 'undefined') {                                    
                    $.each(InvCountryJson, function (i, o) {                                            
                        if (o.CountryName.toLowerCase() === countrydata.countryName.toLowerCase()) {
                            countryName = o.CountryName;
                            countryId = o.CountryCodeId;
                            min = o.MIN;
                            max = o.MAX;
                            countryCode = o.CountryCode;
                            return;
                        }
                    });
                }
            }
        });
    }
	
    var parentIds = $('.showForm');
	var isHindi = window.location.href.indexOf("/hi");
    
    var filename = window.location.href.split("/");
    var lastName = filename[filename.length-2];
	language='en';
       
    
    $.ajax({
        url: BASEURL + 'cj-form-and-content.php?type=' + elemClass+'&invtabshow='+invTabShow+'&language='+language+'&pagename='+lastName+'&v='+Math.random(),
		type: "GET",
        cache: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (showLeft==1) {
                $('.disForm .content_box').html(data.contentBox).fadeIn("slow");
				if(elemClass == 'healthsme' || elemClass == 'health'){
                    var strPath = window.location.pathname;
                    var arrPath =strPath.split('/');
                    
                    var leftHtmlContent = '';
                    if(isHindi > -1){
                    var pageName = arrPath[arrPath.length-3];
                    var objElementName = pageName.replace(/-/ig,'_');
                        leftHtmlContent = objCustomeHindiHtml[objElementName];
                }else{
                    var pageName = arrPath[arrPath.length-2];
                    var objElementName = pageName.replace(/-/ig,'_');
                        leftHtmlContent = objCustomeHtml[objElementName];
                }
                    $('.disForm .content_box').html(leftHtmlContent).fadeIn("slow");
                }
            }
            var isInsuranceCompanies = window.location.href.indexOf("insurance-companies");
            var isArticles = window.location.href.indexOf("articles");
            var isNews = window.location.href.indexOf("news");
            $.each(parentIds, function (index, value2) {
                var value = '#'+$(this).attr('id')+' ';
                $(value + '.disForm .rightContent').html(data.contentRight).fadeIn("slow");                
                if (elemClass == 'criticalillness' || elemClass == 'personalaccident') {
                    $(value + "#termCity").autocomplete({
                        //source: BASEURL + 'cj-process.php?type=autocomplete-health-city',
                        source: function (request, response) {
                            var search_type = 'p';
                            if (!checkOnlyNumber(request.term)) {
                                search_type = 'c';
                            }
                            $.getJSON(BASEURL + 'cj-process.php?type=autocomplete-health-city&search_type=' + search_type, {q: request.term}, response);
                        },
                        minLength: 3,
                        autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {
                            clearError($('#termCity'));
                            $(value + "#termCity").val(ui.item.CityName);
                            $(value + "#termCity").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId, "data-pincode": ui.item.Pincode});
                            try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'termCity', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                                //http://api.jqueryui.com/autocomplete/#event-change -
                                // The item selected from the menu, if any. Otherwise the property is null
                                //so clear the item for force selection
                                $(value + "#termCity").val("");
                            }
                        }
                    })
                   .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };
                    $(value + '.proceedGray').attr('style', 'background: #fa774d;');
                }
				if (elemClass == 'health') {
                    //Get city and pincode details for health
                    $(value + "#healthCityPincode").autocomplete({
                        //source: BASEURL + 'cj-process.php?type=autocomplete-health-city',
                        source: function (request, response) {
                            var reqTerm = request.term.replace(/[^\w\s]/gi, '');
                            var regex = new RegExp('^' + reqTerm, 'i');
                            var search_type = '';
                            if(checkOnlyNumber(request.term) && $.trim(request.term).length == 6){
                                search_type = 'p';
                            }
                            else if(!checkOnlyNumber(request.term) && $.trim(request.term).length >= 3) {
                                search_type = 'c';
                            }
                            
                        if(search_type !=''){
                            if (request.term in vendorCache) {
                                response($.map(vendorCache[request.term], function (item) {
                                    //return { label: item.name, value: item.name, id: item.id };
                                    if(search_type == 'p'){
                                    if (regex.test(item.Pincode)) {
                                        return item;
                                    }    
                                    }else{
                                    if (regex.test(item.CityName)) {
                                        return item;
                                    }}
                                }));
                                return;
                            }
                            
                                vendorXhr = $.getJSON(BASEURL + 'cj-process.php?type=autocomplete-health-city&search_type=' + search_type, {q: request.term},response).done(function(response) {
                                    vendorCache[request.term] = response;
                                  });                                
                            }else
                            $(value + "#healthCityPincode").val($.trim(request.term));
                                
                        },
                        minLength: 3,
                        autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {
                            $(value + "#healthCityPincode").val(ui.item.CityName);
                            $(value + "#healthCityPincode").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId, "data-pincode": ui.item.Pincode});
							try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'healthCityPincode', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                                //http://api.jqueryui.com/autocomplete/#event-change -
                                // The item selected from the menu, if any. Otherwise the property is null
                                //so clear the item for force selection
                                $(value + "#healthCityPincode").val("");
                            }
                        }
                    })
                            .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };

                    //Get country list for mobile
                    fncGetMobileCountry(value + '#healthMobileCountry');
                }
                if (elemClass == 'healthsme'){
                    $('.healthsme-bg .marker').hide();
					$('.healthsme-bg .groupPolicyType').hide();
                    if(pageName !== undefined && pageName != 'group-insurance'){
                        objElementName = pageName.replace(/-/ig,' ');
                        $('.healthsme-bg #healthsmeOption').val(ucwords(objElementName));
                    }
                    if($('.healthsme-bg #healthsmeOption').val() == '' ||  $('.healthsme-bg #healthsmeOption').val() == null){
                        $('.healthsme-bg #healthsmeOption').val('');
                    }
                    if($('.healthsme-bg #healthsmeOption').val() == 'Group Health Insurance' || $('.healthsme-bg #healthsmeOption').val() == 'Group Personal Accident' || $('.healthsme-bg #healthsmeOption').val() == 'Group Term Life'){
                        $('.healthsme-bg .marker').show();
						$('.healthsme-bg .groupPolicyType').show();
                    }
					if(pageName =='shop-owners-insurance'){ 
                        $("#healthsmeOption").val("Shop Owners Insurance");                   
                        $("#healthsmeOption").attr("disabled", "disabled");
                    }
                    //healthsmeCityPincode
                    //Get city and pincode details for health
                    $(value + "#healthsmeCityPincode").autocomplete({
                        //source: BASEURL + 'cj-process.php?type=autocomplete-health-city',
                        /*source: function (request, response) {
                            var search_type = 'p';
                            if (!checkOnlyNumber(request.term)) {
                                search_type = 'c';
                            }
                            $.getJSON(BASEURL + 'cj-process.php?type=autocomplete-health-city&search_type=' + search_type, {q: request.term}, response);
                        },*/
						source: function(request, response) {
                            //$.getJSON(BASEURL + 'callservice.php?task=invcity', { q: request.term }, response);
                            var reqTerm = request.term.replace(/[^\w\s]/gi, '');
                            var regex = new RegExp('^' + reqTerm, 'i');
                            $.ajax({
                                url: BASEURL + 'callservice.php?task=healthsmecity',
                                dataType: "json",
                                cache: true,
                                success: function (data) {
                                    response($.map(data, function (item) {
                                        if (regex.test(item.CityName)) {
                                            return item;
                                        }
                                    }));
                                }
                            });
                        },
                        minLength: 3,
                        autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {
                            $(value + "#healthsmeCityPincode").val(ui.item.CityName);
                            $(value + "#healthsmeCityPincode").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId, "data-pincode": ui.item.Pincode});
							try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'healthsmeCityPincode', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                                //http://api.jqueryui.com/autocomplete/#event-change -
                                // The item selected from the menu, if any. Otherwise the property is null
                                //so clear the item for force selection
                                $(value + "#healthsmeCityPincode").val("");
                            }
                        }
                    })
                    .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };
					if(invTabShow !='')
                    getSMEFormDataUsingLeadId(invTabShow);//Get form value by lead id
                }
                if (elemClass == 'term' || elemClass == 'term_bu'){
                    $(value + "#short-month-birthday," + value + "#termBirthday").birthdayPicker({
                        "maxYear": "1998",
                        "minAge": 18,
                        "maxAge": 66,
                        "monthFormat": "short"
                    });

                    $(value + '#termOtherCountryCode').hide();
                    var toAppend = '';
                    $.each(InvCountryJson, function (i, o) {
                        var selectedCounty = (o.CountryCodeId == 392) ? 'selected="selected"' : '';
                        toAppend += '<option data-min="' + o.MIN + '" data-max="' + o.MAX + '" data-country-code="' + o.CountryCode + '" value="' + o.CountryCodeId + '" ' + selectedCounty + '>+' + o.CountryCode + '</option>';
                    });
                    $(value + "#termCountry").html(toAppend);
					//Add on 1209-hakim for 4 field term form get country by ip
					if (elemClass == 'term') {
                        if(countryName !=''){
                            $(value + '#termCountry').val(countryId);
                            $(value + '.term-bg .countryCode span').text('+' + countryCode);
                            $(value + '.term-bg .mobNumber').attr({"minlength": min,"maxlength": max});  
                        }else{
                            $(value + "#termCity").attr({"data-cityid":"551", "data-stateid":"35"}).val('Delhi (Delhi)');
                            $(value + '.term-bg .countryCode span').text('+91');
                            $(value + '.term-bg .mobNumber').attr({
                                "minlength":10,
                                "maxlength":10
                            });
                        } 
                    }
					
                    //Get city and pincode details for term
                    /*$(value + "#termCity").autocomplete({                  
                        source: function (request, response) {
                            var reqTerm = request.term.replace(/[^\w\s]/gi, '');
                            var regex = new RegExp('^' + reqTerm, 'i');
                            var search_type = 'p';
                            if (!checkOnlyNumber(request.term)) {
                                search_type = 'c';
                            }
                            $.ajax({
                                url: BASEURL + 'callservice.php?task=invcity',
                                dataType: "json",
                                success: function (data) {
									//console.log(data);
                                    response($.map(data, function (item) {
                                        if (regex.test(item.CityName)) {
                                            return item;
                                        }
                                    }));
                                }
                            });
                        },
                        minLength: 2,
						autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {//console.log(ui.item);
                            $(value + "#termCity").val(ui.item.CityName);
                            $(value + "#termCity").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId});
							try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'termCity', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                                //http://api.jqueryui.com/autocomplete/#event-change -
                                // The item selected from the menu, if any. Otherwise the property is null
                                //so clear the item for force selection
                                $(value + "#termCity").val("");
                            }
                        }
                    })
                            .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };
                    */					
                }
				if(elemClass == 'term_mobileonly'){
                    setCountry();
				}
				if (elemClass == 'cancer'){
                    $(value + "#short-month-birthday," + value + "#termBirthday").birthdayPicker({
                        "maxYear": "1998",
                        "minAge": 18,
                        "maxAge": 66,
                        "monthFormat": "short"
                    });

                    $(value + '#termOtherCountryCode').hide();
                    var toAppend = '';
                    $.each(InvCountryJson, function (i, o) {
                        var selectedCounty = (o.CountryCodeId == 392) ? 'selected="selected"' : '';
                        toAppend += '<option data-min="' + o.MIN + '" data-max="' + o.MAX + '" data-country-code="' + o.CountryCode + '" value="' + o.CountryCodeId + '" ' + selectedCounty + '>' + o.CountryName + '</option>';
                    });
                    $(value + "#termCountry").html(toAppend);
                    //Get city and pincode details for term
                    $(value + "#termCity").autocomplete({
                        source: function (request, response) {
                            var reqTerm = request.term.replace(/[^\w\s]/gi, '');
                            var regex = new RegExp('^' + reqTerm, 'i');                            
                           if (request.term in vendorCache) {
                                console.log('vendorCache2 = ');
                                response($.map(vendorCache[request.term], function (item) {
                                    if (regex.test(item.CityName)) {
                                        return item;
                                    }
                                }));
                                return;
                            }                            
                            vendorXhr = $.ajax({
                                url: BASEURL + 'callservice.php?task=invcity',
                                dataType: "json",
                                success: function (data) {
                                    vendorCache[request.term] = data;
                                    response($.map(data, function (item) {
                                        if (regex.test(item.CityName)) {
                                            return item;
                                        }
                                    }));
                                }
                            });
                        },
                        minLength: 2,
                        autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {//console.log(ui.item);
                            $(value + "#termCity").val(ui.item.CityName);
                            $(value + "#termCity").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId});
                            try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'cancerCity', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                               $(value + "#termCity").val("");
                            }
                        }
                    })
                            .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };                  
                }
                if (elemClass == 'travel') {
                    var counter = 0;
                    var itemName = new Array();
                    $(value +"#destinationcategoryid").tokenInput(BASEURL + "countries.php", {
                        preventDuplicates: true,
                        theme: "facebook",
                        tokenLimit: 10,
                        minChars: 2, 'searchDelay': 0, hintText: false,
                        propertyToSearch : 'city',
                        onAdd: function (item) {
                            counter++;
                            itemName.push(item.name);
                            $(value +'#destinationcities').val(itemName);
                        },
                        onDelete: function (item) {
                            counter--;
                            var index = itemName.indexOf(item.name);
                            itemName.splice(index, 1);
                            $(value +'#destinationcities').val(itemName);
                        }
                    });
                    var $select = $(value +".0-99");
                    for (i = 18; i <= 99; i++) {
                        $select.append($('<option></option>').val(i).html(i))
                    }
                    var $select = $(value +".0-18");
                    for (i = 1; i <= 18; i++) {
                        $select.append($('<option></option>').val(i).html(i))
                    }
                    var minDate = new Date().addDays(89);
                    var maxDate = new Date().addDays(179);
                    var valueID = $(this).attr('id');
                            updateStartDate = function (index) {                                
                                
                                if (startPicker[index] !== undefined)
                                {
                                    startPicker[index].setStartRange(startDate[index]);
                                }
                                if (endPicker[index]  !== undefined)
                                {    
                                    endPicker[index].setStartRange(startDate[index]);
                                    endPicker[index].setMinDate(startDate[index]);
                                }
                            },
                            updateEndDate = function () {
                                //startPicker.setEndRange(endDate);
                                //startPicker.setMaxDate(endDate);
                                //endPicker.setEndRange(endDate);
                            },
                            startPicker[valueID] = new Pikaday({
                                  field: $(value+'#startdate')[0],
                                  format: 'DD-MM-YYYY',
                                  minDate: new Date(),
                                  maxDate: minDate,
                                  onSelect: function () {
                                    //startDate[index] = this.getDate();
                                    //updateStartDate(valueID);
                                    var numDays = 9;
                                    //endDate[index] = this.getDate().addDays(numDays);
                                    if (endDate[valueID] !== undefined)
                                    {
                                        if (!$(value+'.tripfrequency').is(':checked'))
                                            var numDays = calculateNumDays(this.getDate(), this.getDate().addDays(numDays));
                                        else
                                            var numDays = 365;

                                        
                                        $(value+'#traveldate_lbl').html(numDays + '<p>Days</p>');
                                        $(value+'#tripduration').val(numDays);
                                        $(value+'#tripdays').val(numDays);
                                        //edited on sunday
                                        if (($(value+'#CategoryID').val() == 2 || $(value+'#CategoryID').val() == 1) && $(value+'#memberType').val() != 3) {
                                            if ($(value+'.tripfrequency').is(':checked'))
                                            {
                                                endPicker[valueID].setMaxDate(this.getDate().addDays(364));
                                                endPicker[valueID].setDate(this.getDate().addDays(numDays-1));
                                            }else {
                                            endPicker[valueID].setMaxDate(this.getDate().addDays(729));
                                            //endPicker[valueID].setDate(this.getDate().addDays(numDays-1));
											}                                            
                                        } 
                                        //edited on sunday
                                    }
									if (startPicker[valueID] !== undefined)
                                    {
                                        startPicker[valueID].setStartRange(this.getDate());                                    
                                    }
                                    if (endPicker[valueID]  !== undefined)
                                    {    
                                        endPicker[valueID].setStartRange(this.getDate().addDays(1));
                                        endPicker[valueID].setMinDate(this.getDate().addDays(1));
                                    }
                                }
                                });
                              endPicker[valueID] = new Pikaday({
                                  field: $(value+'#enddate')[0],
                                  format: 'DD-MM-YYYY',                                  
                                  minDate: new Date(),
                                  maxDate: maxDate,
                                  onSelect: function () {
                                    //endDate[index] = this.getDate();
                                    updateEndDate();
                                    if (!$(value+'.tripfrequency').is(':checked'))
                                        var numDays = calculateNumDays(startPicker[valueID].getDate(),this.getDate());
                                    else
                                        var numDays = 365;
                                    $(value+'#traveldate_lbl').html(numDays + '<p>Days</p>');
                                    $(value+'#tripduration').val(numDays);
                                    $(value+'#tripdays').val(numDays);
                                }
                            });  
                              dobPicker[valueID] = new Pikaday({
                                  field: $(value+'#traveldob')[0],
                                  format: 'DD-MM-YYYY',
                                  minDate: new Date().subsYears(99),
                                  maxDate: new Date().subsYears(18),
                                  defaultDate: false,
                                  yearRange: 81,
                                  onSelect: function () {
                                       clearError($(value+'#traveldob'));
                                  }
                                });
                    _startDate = startPicker[valueID].getDate();
                    _endDate = endPicker[valueID].getDate();
                    _dobDate = dobPicker[valueID].getDate();
                    
                    if (_startDate) {
                        startDate[valueID] = _startDate;
                        updateStartDate(valueID);
                    }

                    if (_endDate) {
                        endDate[valueID] = _endDate;
                        updateEndDate();
                    }
                    if (_dobDate) {
                        dobDate[valueID] = _dobDate;
                    }
                    //Get city details for travel              
                    $(value+"#travelCity").autocomplete({
                        source: function (request, response) {
                            //$.getJSON(BASEURL + 'callservice.php?task=invcity', { q: request.term }, response);
                            var reqTerm = request.term.replace(/[^\w\s]/gi, '');
                            var regex = new RegExp('^' + reqTerm, 'i');
                            $.ajax({
                                url: BASEURL + 'callservice.php?task=invcity',
                                dataType: "json",
                                cache: true,
                                success: function (data) {
                                    response($.map(data, function (item) {
                                        if (regex.test(item.CityName)) {
                                            return item;
                                        }
                                    }));
                                }
                            });
                        },
                        minLength: 3,
                        autoFocus: true,
                        focus: function(event, ui){
                            event.preventDefault();
                            return false;
                        },
                        select: function (event, ui) {
                            $(value+"#travelCity").val(ui.item.CityName);
                            $(value+"#travelCity").attr({"data-cityid": ui.item.CityId, "data-stateid": ui.item.StateId});
							try{ga('pbTrackerObj.send', 'event', 'city-filled' , 'travelCity', '',{'nonInteraction': 1});}catch(e){}
                            return false;
                        },
                        change: function (event, ui) {
                            if (!ui.item) {
                                $(value+"#travelCity").val("");
                                $(value+"#travelCity").attr({"data-cityid": "", "data-stateid": ""});
                            }
                            clearError($(value+"#travelCity"));
                        }
                    })
                            .autocomplete("instance")._renderItem = function (ul, item) {
                        return $("<li>")
                                .append("<a>" + item.CityName + "</a>")
                                .appendTo(ul);
                    };
					
                    if($('#tripfrequency').length ){
                        $('#tripfrequency').next().attr('for',$(this).attr('id')+'_tripfrequency');
                        $('#tripfrequency').attr('id',$(this).attr('id')+'_tripfrequency');					
                    }
                    if($('input[name="travelPolicy"]').length){
                        $('input[name="travelPolicy"]').attr('name',$(this).attr('id')+'_travelPolicy');					
                    }
                    for(var chkcounter=1; chkcounter<=5;chkcounter++){                        
                        var travelchkVal =  'travelcheckbox'+chkcounter;
                        if($('#'+travelchkVal).length ){
                            $('#'+travelchkVal).next().attr('for',$(this).attr('id')+'_travelcheckbox'+chkcounter);
                            $('#'+travelchkVal).attr('id',$(this).attr('id')+'_travelcheckbox'+chkcounter);
                        }
                    }
					$(value+'#startdate').val('');
                    $(value+'#enddate').val('');
					 if(isInsuranceCompanies > -1)
                    try{ga('traTrackerObj.send','pageview', '/SEO-Provider-Page');}catch(e){}
                    else if(isArticles > -1)
                     try{ga('traTrackerObj.send','pageview', '/SEO-Articles-Page');}catch(e){}
                    else if(isNews > -1)
                     try{ga('traTrackerObj.send','pageview', '/SEO-News-Page');}catch(e){} 
                    else
                    try{ga('traTrackerObj.send','pageview', '/SEO-BU-Page');}catch(e){} 
                }else{                
                    fncSetFormValue(elemClass);//Set default value
                }
                
                if (elemClass == 'car'||elemClass == 'car_bu'){
                    setTimeout(function(){
                        //console.log('carFormLand');
                        carFormLand($('#gaData').attr('data-visit'));
                    },1000)
                }
                
                if(elemClass == 'twowheeler' || elemClass == 'twowheeler_bu'){
                    $('.smallheader_nav li:nth-last-child(1)').hide();
					$('.smallheader_nav li:nth-last-child(2)').hide();
					if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
						$('.tollFreeNo').parent().hide();
					}
                }
                //$(":input").inputmask();
                //End multiple form
            });


            //Start - Display punchline text
            var objPunchLine = $('.disForm .punchline');
            //var isInsuranceCompanies = window.location.href.indexOf("insurance-companies");
            //var isArticles = window.location.href.indexOf("articles");
            //if((isInsuranceCompanies > -1 || isArticles > -1)  && elemClass == 'term'){
            if (elemClass == 'term' || elemClass == 'term_bu') {                
                    if(isInsuranceCompanies > -1 || isArticles > -1){
                        $('.termCond').hide();
                    }
                    //if(isInsuranceCompanies == -1){
                        $('.showForm .proceedGray, .showForm #btnSubmitTerm').html('Compare & Save Big');
                        objPunchLine.html(punchLine[language]['term']);

                    /*}else{
                    objPunchLine.html(punchLine[language][elemClass]);
                    }*/                
            }
			if (elemClass == 'cancer') {                
                    if(isInsuranceCompanies > -1 || isArticles > -1){
                        $('.termCond').hide();
                    }
                    $('.showForm .proceedGray, .showForm #btnSubmitCancer').html('Compare & Save Big');
                    objPunchLine.html(punchLine[language][elemClass]);                                
            }
            if ((elemClass == 'car' || elemClass == 'car_v1' || elemClass == 'twowheeler')) {
                if(isArticles > -1){
                    objPunchLine.html('Get <span class="lighter">FREE </span> Quotes in<span class="lighter"> 30 Seconds</span>');
                    $('.showForm .carnextstep').html('Compare & Save Big');
                    $('.showForm #btnSubmitMobile').html('Next');
               }else {
                  objPunchLine.html(punchLine[language]['car']);
                  //  objPunchLine.html('Get <span class="lighter">Quotes</span> from top insurers in <span class="lighter">30 seconds</span>');
               }
            }            
            var isMobile = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                isMobile = true;
            }
			if(elemClass == 'health'){
			if(isArticles > -1 || (window.location.href.indexOf("health-insurance-india") > -1 && isMobile===true)){
              objPunchLine.html('Get <span class="lighter">FREE</span> Quotes in<span class="lighter"> 30 Seconds</span>');
              //$('#health_article_form .proceedGray, #health_article_form #btnSubmitHealth').html('Compare & Save Big');
			  $('.showForm .proceedGray, .showForm #btnSubmitHealth').html('Compare & Save Big');
			  $('.showForm').addClass('health_article_form');
             }else {
                objPunchLine.html('Free quotes from top insurers with lowest premiums');
             }
			}
			if (elemClass == 'criticalillness'){
            if(isArticles > -1){
              objPunchLine.html('Get <span class="lighter">FREE</span> Quotes in<span class="lighter"> 30 Seconds</span>');
              $('.proceed').html('Compare & Save Big');
              // $('#criticalillness_article_form .termCond').hide();
              $('.termCond').html('By Clicking on "Compare &amp; Save Big" you agree to our <a href="'+BASEURL+'legal-and-admin-policies/#termsofuse" target="_blank">Terms of Use</a>');
             }else {
                objPunchLine.html('Free quotes from top insurers with lowest premiums');
            }
            }
            if (elemClass == 'travel') {
                if(isInsuranceCompanies > -1 || isArticles > -1){
                        $('.termCond').hide();
                    }    
                if(isArticles > -1){
                    objPunchLine.html('Get <span class="lighter">FREE</span> Quotes in<span class="lighter"> 30 Seconds</span>');
                    $('.proceedGray,.travelproceed.proceed').html('Compare & Save Big');
               }else {
                  objPunchLine.html('Get free quotes and start comparing');
               }
             
            }
            if (elemClass == 'investment') {
                var isChild = window.location.href.indexOf("child");
                if (isChild > -1) {
                    if (isInsuranceCompanies > -1) {
                        objPunchLine.text('Secure your child\'s financial future with policies from top insurers');
                    }  else {
                        objPunchLine.html(punchLine[language][elemClass+'_child']);
                    }
                } else {
                    objPunchLine.html(punchLine[language][elemClass]);
                }				
            }
            //End - Display punchline text
        }
    });
}

Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

Date.prototype.subsYears = function (years) {
    this.setFullYear(this.getFullYear() - years)
    return this;
};
fncAmountAndLable = function () {
    var obj = $(this);
    var parentDiv = obj.parents('.input_field');
    var minAmt = parseInt(obj.attr('data-min'));
    var maxAmt = parseInt(obj.attr('data-max'));
    var errMsg = obj.attr('data-msg');
    var amt = obj.val().replace(/,/g, '');
    amt = parseInt(amt);
    if (!isNaN(amt)) {
        obj.val(amt);
    }
    if (isNaN(amt) || obj.length <= 0) {
        $('.fig_lbl', parentDiv).addClass('none');
        addError(obj, 'Please enter amount');
        return false;
    } else if (!checkOnlyNumber(amt)) {
        obj.val('');
        $('.fig_lbl', parentDiv).addClass('none');
        return false;
    } else if (obj.length > 0 && amt >= minAmt && amt <= maxAmt) {
        fnFormatCurrencyIndianStyle(obj, 20);
        $('.fig_lbl', parentDiv).html(convert_number2(amt)).removeClass('none');
        obj.removeClass('error');
        parentDiv.removeClass('error');
        $('.err', parentDiv).html('');
    } else {
        obj.addClass('error');
        parentDiv.addClass('error');
        $('.fig_lbl', parentDiv).addClass('none');
        $('.err', parentDiv).html(errMsg + ' ' + convert_number(minAmt) + ' to ' + convert_number(maxAmt));
    }

    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    $(parentId+ '.birthDate').trigger('change');
    //fncDisplayTermDetails(event);
};

fncAmountAndLableInv = function () {
    var obj = $(this);
    var parentDiv = obj.parents('.input_field');
    var minAmt = parseInt(obj.attr('data-min'));
    var maxAmt = parseInt(obj.attr('data-max'));
    var errMsg = obj.attr('data-msg');
    var amt = amt1 = obj.val().replace(/,/g, '');

    amt = parseInt(amt);
    if (!checkOnlyNumber(amt)) {
        obj.val('');
        $('.fig_lbl', parentDiv).addClass('none');
        return false;
    }
    else if (obj.length > 0 && amt >= minAmt && amt <= maxAmt) {
        fnFormatCurrencyIndianStyle(obj, 20);
        $('.fig_lbl', parentDiv).html(convert_number2(amt)).removeClass('none');
        obj.removeClass('error');
        parentDiv.removeClass('error');
        $('.err', parentDiv).html('');
    } else {
        obj.addClass('error');
        parentDiv.addClass('error');
        $('.fig_lbl', parentDiv).addClass('none');
        selectedTab = $('.investment-bg #investmentType').val();
        if(selectedTab==3)
            $('.err', parentDiv).html(errMsg + ' ' + convert_number2(minAmt) + ' to ' + (maxAmt.toLocaleString()));
        else
            $('.err', parentDiv).html(errMsg + ' ' + convert_number2(minAmt) + ' to ' + convert_number2(maxAmt));
    }
    /*if (amt1 % 1000 !=0 && amt1.length>4) {
     obj.addClass('error');
     parentDiv.addClass('error');
     $('.fig_lbl', parentDiv).addClass('none');
     $('.err', parentDiv).html('Value has to be in the multiples of 1000.');
     }*/
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    fncInvNeed(parentId);
};

function validemail(value) {
    //return /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/.test(value);
    return /^(?!.*\.{2})(?=[^@]{2,}@)([\w\.-]*[a-zA-Z0-9_]@(?=.{2,}\.[^.]*$)[\w\.-]*[a-zA-Z0-9]{2,4}\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/.test(value);
}

function validmobile(value) {
    return /^[6789]\d{9}$/.test(value);
}

function getAgeUsingDOB(dob) {//1988-04-07
    dob = new Date(dob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
    //$('#age').html(age+' years old');
}
//Common function end

//JS for two wheeler cj start
fncNewTWClick = function(){    
    var gtmData = '';
    var dataDisplayFor = $('#gaData').attr('data-display-for');
    gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
    gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Bike_Insurance_New_Bike' : '&utm_term=' + utmTerm;
    gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
    gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;
    var otherString = $(this).attr('data-source');
        if (typeof otherString === typeof undefined && otherString === false) {
            otherString='';
        }
        var lobSection3 = 'brand new bike';
        if(typeof otherString !== typeof undefined && otherString !== false)
            lobSection3 += '-sticky';
    GA360FormSubmit('formSubmitSuccess',lobSection3);
    window.location.href = 'https://twowheeler.policybazaar.com/question?regNo=&PolicyType=3&iscom=1'+gtmData;
};
fncDonotKnowTWClick = function(){
    var gtmData = '';
    var dataDisplayFor = $('#gaData').attr('data-display-for');
    gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
    gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Bike_Insurance_Donot_Know' : '&utm_term=' + utmTerm;
    gtmData += (utmMedium == '' || utmMedium == 'undefined') ? ''  : '&utm_medium=' + utmMedium;
    gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;
    var otherString = $(this).attr('data-source');
        if (typeof otherString === typeof undefined && otherString === false) {
            otherString='';
        }
        var lobSection3 = 'proceed without bike number';
        if(typeof otherString !== typeof undefined && otherString !== false)
            lobSection3 += '-sticky';
    GA360FormSubmit('formSubmitSuccess',lobSection3);
    window.location.href = 'https://twowheeler.policybazaar.com/question?regNo=&iscom=1'+gtmData;
};

fncTWProcess = function () {
    var objBtnSubmit = $(this);
    //objBtnSubmit.hide();
    //objBtnSubmit.next().show();
	var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objRegNum = $(parentId+'#twoWheelerRegistrationNumber');
    var valRegNum = $.trim(objRegNum.val());
    if (valRegNum.length == 0) {
        addError(objRegNum, 'Please enter valid registration number');
		errorFields += 'tw registration,';
        errorDescriptions += 'Please enter valid registration number,';
        errorCounts++;
    } else {
        clearError(objRegNum);
    }
    chkRegNum(objRegNum);
    if (!objRegNum.hasClass('error') && valRegNum) {
        if (window.location.href.indexOf("/articles/") > -1) {//This is temp check when all new TW template apply then need to remove it
            
        } else {
            objBtnSubmit.hide();
        }
        
        objBtnSubmit.next().show();

        var gtmData = '';
        gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
        gtmData += (utmTerm == '' || utmTerm == 'undefined') ? '&utm_term=Bike_Insurance_Get_Quotes' : '&utm_term=' + utmTerm;
        gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
        gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;

        //Set local storage value for form
        var postdata = JSON.stringify({
            tabName: 'twowheeler',
            regNum: valRegNum
        });
        try {
            localStorage.setItem("getLastTab", postdata);
        } catch (e) {
        }
        //End
        //
		var otherString = $(this).attr('data-source');
        if (typeof otherString === typeof undefined && otherString === false) {
            otherString='';
        }
        var lobSection3 = 'proceed with bike number';
        if(otherString !='')
            lobSection3 += '-sticky';
        //console.log('tets sdfas');
        GA360FormSubmit('formSubmitSuccess',lobSection3);
        setTimeout(function () {
            //window.location.href = 'http://twowheelerqa.policybazaar.com?registrationNo=' + valRegNum+gtmData;//QA                  
            //window.location.href = 'http://twowheeler.policybazaar.com?registrationNo=' + valRegNum+gtmData;//Live
            //window.location.href = 'http://10.0.29.223:8585/#/question?regNo=' + valRegNum + gtmData;//QA
            window.location.href = 'https://twowheeler.policybazaar.com/question?regNo=' + valRegNum+gtmData+'&iscom=1';//New Live

        }, 1000);
    } else {
        //objBtnSubmit.show();
		userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
};
//JS for two wheeler cj end
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
//JS for car cj start
function carFormLand(visitId){
    try {
        var eventName = 'CST_LandedOnRegistrationNumberPage_DESK_SEO';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            eventName = 'CST_LandedOnRegistrationNumberPage_MOB_SEO';
        }
        
        var stringPageName = '';
        try{
            stringPageName = $('#footerStripCarForm a.carBtnSubmit').attr('data-pagename');
            if (typeof stringPageName !== typeof undefined && stringPageName !== false) {
                eventName += '_'+stringPageName;
            }
        }catch(e){}
    
        $.ajax({
            //url: "https://citest.policybazaar.com/MVCController/quote/InsertEventTracking?enquiryId="+visitId+"&eventName=CST_LandedOnRegistrationNumberPage_DESK_SEO",//QA
            url: "https://ci.policybazaar.com/MVCController/prequote/InsertCustomerBehaviourTracking?visitId="+visitId+"&eventName="+eventName,//Live
            type: "POST",
            cache: false,
            success: function(e) {}
        })
    } catch (e) {}
}
fncCTACarClick = function(){
    var eventName = '_CTA_SEO_DESK';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        eventName = '_CTA_SEO_MOB';
    }
    
    var ctaPrefix = '';
    if($(this).hasClass('getbestquote')){
        ctaPrefix = 'Bestplans';
    } else if($(this).hasClass('comparequote')){
        ctaPrefix = 'Compare';
    }else if($(this).hasClass('thirdpartyquote')){
        ctaPrefix = 'TP';
    }else if($(this).hasClass('compareqte')){
        ctaPrefix = 'CompareOnline';
    }else if($(this).hasClass('keybenefits')){
        ctaPrefix = 'KeyBenefits';
    }else if($(this).hasClass('getdiscountssavemoney')){
        ctaPrefix = 'SaveMore';
    }
    
    eventName = ctaPrefix+eventName;
    
    $.ajax({
        url: 'https://ci.policybazaar.com/MVCController/prequote/InsertCustomerBehaviourTracking?visitId='+$('#gaData').attr('data-visit')+'&eventName='+eventName,
        type: "POST",
        cache: false,
        success: function (data){}
    }); 
        
    setTimeout(function () {        
        var gtmData = '';
        /*var dataDisplayFor = $('#gaData').attr('data-display-for');
        gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
        gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Car_Insurance_New_Car' : '&utm_term=' + utmTerm;
        gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
        gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;
        */
        window.location.href = 'https://ci.policybazaar.com/?iscom=1'+gtmData;
    }, 1000);
};

fncNewCarClick = function(){
    var eventName = 'CST_GotANewCarClicked_DESK_SEO';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        eventName = 'CST_GotANewCarClicked_MOB_SEO';
    }
    
    var otherString = $(this).attr('data-source');
    if (typeof otherString !== typeof undefined && otherString !== false) {
        eventName += otherString;
    }
    var lobSection3 = 'brand new car';
    if(typeof otherString !== typeof undefined && otherString !== false)
        lobSection3 += '-sticky';
    var stringPageName = '';
    try{
        stringPageName = $('#footerStripCarForm a.carBtnSubmit').attr('data-pagename');
        if (typeof stringPageName !== typeof undefined && stringPageName !== false) {
            eventName += '_'+stringPageName;
        }
    }catch(e){}
    
    var visitIdData = (visitId == '' || visitId == 'undefined') ? $('#gaData').attr('data-visit') : visitId;
    if(visitIdData == 0)
        visitIdData = getCookie('Cookie_VisitLog');
    
    GA360FormSubmit('formSubmitSuccess',lobSection3);
    $.ajax({
        url: 'https://ci.policybazaar.com/MVCController/prequote/InsertCustomerBehaviourTracking?visitId='+$('#gaData').attr('data-visit')+'&eventName='+eventName,
        type: "POST",
        cache: false,
        success: function (data){}
    }); 
        
    setTimeout(function () {        
        var gtmData = '';
        var dataDisplayFor = $('#gaData').attr('data-display-for');
        gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
        gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Car_Insurance_New_Car' : '&utm_term=' + utmTerm;
        gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
        gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;

        window.location.href = 'https://ci.policybazaar.com/#/question?isnew=true&iscom=1'+gtmData;
    }, 1000);
};
fncDonotKnowCarClick = function(){
    var eventName = 'CST_DontKnowRegNoCicked_DESK_SEO';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        eventName = 'CST_DontKnowRegNoCicked_MOB_SEO';
    }
    
    var otherString = $(this).attr('data-source');
    if (typeof otherString !== typeof undefined && otherString !== false) {
        eventName += otherString;
    }
    var lobSection3 = 'proceed without car number';
    if(typeof otherString !== typeof undefined && otherString !== false)
        lobSection3 += '-sticky';
    var stringPageName = '';
    try{
        stringPageName = $('#footerStripCarForm a.carBtnSubmit').attr('data-pagename');
        if (typeof stringPageName !== typeof undefined && stringPageName !== false) {
            eventName += '_'+stringPageName;
        }
    }catch(e){}
    
    var visitIdData = (visitId == '' || visitId == 'undefined') ? $('#gaData').attr('data-visit') : visitId;
    if(visitIdData == 0)
        visitIdData = getCookie('Cookie_VisitLog');
    
    GA360FormSubmit('formSubmitSuccess',lobSection3);
    $.ajax({
        url: 'https://ci.policybazaar.com/MVCController/prequote/InsertCustomerBehaviourTracking?visitId='+$('#gaData').attr('data-visit')+'&eventName='+eventName,
        type: "POST",
        cache: false,
        success: function (data){}
    });
        
    setTimeout(function () {
        var gtmData = '';
        var dataDisplayFor = $('#gaData').attr('data-display-for');
        gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
        gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Car_Insurance_Donot_Know' : '&utm_term=' + utmTerm;
        gtmData += (utmMedium == '' || utmMedium == 'undefined') ? ''  : '&utm_medium=' + utmMedium;
        gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;

        window.location.href = 'https://ci.policybazaar.com/#/question?s=1&iscom=1'+gtmData;
    }, 1000);
};
fncCarProcess = function () {
    var objBtnSubmit = $(this);
    //objBtnSubmit.hide();
    //console.log('tets');
	var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objRegNum = $(parentId+'#carRegistrationNumber');
    var valRegNum = $.trim(objRegNum.val());
	var valMobNum = $.trim($(parentId+'#carMobileNumber').val());
    if (valRegNum.length == 0) {
        addError(objRegNum, 'Please enter valid registration number');
		errorFields += 'car registration,';
        errorDescriptions += 'Please enter valid registration number,';
        errorCounts++;
    } else {
        clearError(objRegNum);
    }
	/*var gccpVal = getCookie('_gccp');
    var objCaptchaNum = $(parentId+'#carcaptchaVal');
    var valCaptchaNum = $.trim(objCaptchaNum.val());
    if (valCaptchaNum.length == 0) {
        addError(objCaptchaNum, 'Please enter valid value');
    } else {
        clearError(objCaptchaNum);
    }*/
	
    chkRegNum(objRegNum);
    //console.log(!valRegNum);
    //if (!objRegNum.hasClass('error') && !objCaptchaNum.hasClass('error') && valRegNum && gccpVal !='') {
      if (!objRegNum.hasClass('error') && valRegNum) {  
        var gtmData = '';
        gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
        gtmData += (utmTerm == '' || utmTerm == 'undefined') ?  '&utm_term=Car_Insurance_Get_Quotes' : '&utm_term=' + utmTerm;
        gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
        gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;
        
        if($.trim(utmSource.toLowerCase()) == 'offlineaffiliate')
        gtmData += '&landing_source=affiliate';
        
        var visitIdData = (visitId == '' || visitId == 'undefined') ? $('#gaData').attr('data-visit') : visitId;
        if(visitIdData == 0)
            visitIdData = getCookie('Cookie_VisitLog');
        //console.log('tets sdfas');
        //
        var ismobile = 0;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            ismobile = 1;
        }
    
        var otherString = $(this).attr('data-source');
        if (typeof otherString === typeof undefined && otherString === false) {
            otherString='';
        }
		var lobSection3 = 'proceed with car number';
        if(typeof otherString !== typeof undefined && otherString !== false)
            lobSection3 += '-sticky';
        var stringPageName = $('#footerStripCarForm a.carBtnSubmit').attr('data-pagename');
        if (typeof stringPageName === typeof undefined && stringPageName === false) {
            stringPageName = '';
        }
    
        //Call car service for get enquiry id
        $.ajax({
            //url: 'http://mcarqa.policybazaar.com/MVCController/fla/GetRCDetails?RegistrationNo='+valRegNum,
            url: BASEURL + 'cj-process.php?type=car&RegistrationNo=' + valRegNum+'&visitid='+visitIdData+'&ismobile='+ismobile+'&otherstring='+otherString+'&pagename='+stringPageName,
            //url : 'http://ci.policybazaar.com/MVCController/fla/ValidateCapta?_gccp='+gccpVal+'&RegistrationNo='+valRegNum+'&sumCode='+valCaptchaNum,
            //url: BASEURL + 'cj-process.php?type=car&_gccp='+gccpVal+'&RegistrationNo=' + valRegNum+'&sumCode='+valCaptchaNum,
            type: "GET",
            cache: false,
            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            beforeSend: function () {
                objBtnSubmit.hide();
                objBtnSubmit.next().show();
            },
            success: function (data)
            {
                //console.log('errdata: ' + data);return;
                //Set local storage value for form
                var postdata = JSON.stringify({
                    tabName: 'car',
                    regNum: valRegNum
                });
                try {
                    localStorage.setItem("getLastTab", postdata);
                } catch (e) {
                }
                //End
                if (data == 'Invalid answer') {
                    //console.log('data is null');
                    addError(objCaptchaNum, 'Please enter a valid value');
                    objBtnSubmit.next().hide();
					GA360FormSubmit('formSubmitFailed',lobSection3);
                }
                else if (data == 'error') {
                    //console.log('data is null');
                    addError(objRegNum, 'Please enter a valid registration number');
					GA360FormSubmit('formSubmitFailed',lobSection3);
                } else if (data == 'MA==' || data == 'null') {try {sessionStorage.setItem('CS', '1');} catch (e) {}
					GA360FormSubmit('formSubmitSuccess',lobSection3);
                    //console.log('data is not null and enquiry id is 0 '+encodeURIComponent(Base64.encode(valRegNum)));
                    //window.location.href = 'http://citest.policybazaar.com/#/question?regid=' + encodeURIComponent(Base64.encode(valRegNum)) + gtmData;//QA
                    //window.location.href = 'http://ci.policybazaar.com/#/question?regid=' + encodeURIComponent(Base64.encode(valRegNum))+'&s=1'+gtmData;//Live
                    window.location.href = 'https://ci.policybazaar.com/#/question?regid=' + encodeURIComponent(Base64.encode(valRegNum))+'&lmobileno='+encodeURIComponent(Base64.encode(valMobNum))+'&s=1&iscom=1&seovisit='+encodeURIComponent(Base64.encode(visitIdData))+gtmData;//Live
                } else if (data != 'error' && data != 'MA==') {try {sessionStorage.setItem('CS', '1');} catch (e) {}
				GA360FormSubmit('formSubmitSuccess',lobSection3);
                    //window.location.href = 'http://citest.policybazaar.com/#/quote?enquiryId=' + encodeURIComponent(data) + '&frame=true' + gtmData;//QA
                  //window.location.href = 'http://ci.policybazaar.com/#/quotes?enquiryId=' + encodeURIComponent(data) + '&frame=true&s=1'+gtmData;//Live  
                    window.location.href = 'https://ci.policybazaar.com/#/quotes?enquiryId=' + encodeURIComponent(data) +'&lmobileno='+encodeURIComponent(Base64.encode(valMobNum))+ '&frame=true&s=1&iscom=1&seovisit='+encodeURIComponent(Base64.encode(visitIdData))+gtmData;//Live
                }
                // objBtnSubmit.show();

                //data: return data from server
            }
        });
    } else {
        // objBtnSubmit.show();
        //objBtnSubmit.next().show();
		userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
};
/*
fncCarMobileProcess = function () {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objMobNum = $(parentId+'#carMobileNumber');
    var valMobNum = $.trim(objMobNum.val());
    if (valMobNum.length == 0) {
        addError(objMobNum, 'Please enter valid mobile number');
        return;
    }else if (!validmobile(valMobNum)) {
        addError(objMobNum, 'Please enter valid mobile number');
        return;
    } else {
        clearError(objMobNum);        
    }
    
        var postdata = JSON.stringify({
            MobileNumber: $.trim($(parentId + '.car-bg .carMobileNumber').val()),
            VisitId: (visitId == '' || visitId == 'undefined') ? '' : (visitId == 0 ? $('#gaData').attr('data-visit') : visitId),
            UtmSource:utmSource,
            UtmTerm:utmTerm,
            UtmMedium:utmMedium,
            UtmCampaign:utmCampaign,
            Device:''
        });
        $.ajax({
            url: BASEURL + 'cj-process.php?type=carmobile',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {                
                $(parentId+'.car-bg .forReg').removeClass('dis_none');
                $(parentId+'.car-bg .forMob').addClass('dis_none');
            },
            success: function (data)
            {
                //$(parentId+'.car-bg .forReg').removeClass('dis_none');
                //$(parentId+'.car-bg .forMob').addClass('dis_none');
                try{
                    ga("carTrackerObj.send", "event", "Mobile-Lead", "Car Insurance PreQuotes");
                }catch(e){}
            }
        });    
};*/
chkRegNumKeyUp = function () {
    chkRegNum($(this));
};

chkRegNum = function (objRegNum) {
    //var objRegNum = $('#carRegistrationNumber');
    //var parentDiv = objRegNum.parents('.input_field');
    var valRegNum = $.trim(objRegNum.val());
    valRegNum = valRegNum.toUpperCase();
    objRegNum.val(valRegNum);
    if (!checkRegistrationNumber(valRegNum)) {
        addError(objRegNum, 'Please enter valid registration number');
    } else {
        clearError(objRegNum);
    }
};
// car cj end

//Term cj start
fncDisplayTermDetails = function (event) {
    //console.log($(this).parents('.disForm').parent().attr('id'));//anuj
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    var obj = $(parentId + '#termAmt');
    if(event.data.name=='term')
    var obj2Form = $(parentId + '.step2TermDetails');
    else if(event.data.name=='cancer')
    var obj2Form = $(parentId + '.step2CancerDetails');
	var flagSubmit = true;
    var tmpMonthValue = (objBirthMonth.val() < 10 ? '0' + objBirthMonth.val() : objBirthMonth.val());
    var tmpDayValue = (objBirthDay.val() < 10 ? '0' + objBirthDay.val() : objBirthDay.val());
    if (objBirthMonth.val() <= 0 || objBirthDay.val() <= 0 || objBirthYear.val() <= 0) {
        //addError(objBirthMonth,'Please select valid dob');
        flagSubmit = false;
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) < 18) {
        addError(objBirthMonth, 'Only 18 & above allowed');
        flagSubmit = false;
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) > 65) {
        addError(objBirthMonth, 'Maximum age limit is 65');
        flagSubmit = false;
    } else {
        clearError(objBirthMonth);
    }

    //var obj = $(parentId + '#termAmt');
    var parentDiv = obj.parents('.input_field');
    //$('.err',parentDiv).text();
    if ($('.err', parentDiv).text() != '') {
        flagSubmit = false;
    }

    if (flagSubmit) {
		if(typeof event.data.name !== 'undefined' && event.data.name !='term'){
			$(parentId + '.proceedGray').parent('.input_field.pro').hide();
			//$(parentId + '.step2TermDetails').slideDown("slow");
			obj2Form.slideDown("slow");
			$(parentId+'.leftContent').removeClass('small');
			$(parentId+'.leftContent').addClass('big');
			//$('#termName').focus();
		}
    } else {
        //$('.step2TermDetails').slideUp("slow");
    }
};
fncDisplayCancerDetails = function (event) {
    //console.log($(this).parents('.disForm').parent().attr('id'));//anuj
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    var obj = $(parentId + '#termAmt');
    if(event.data.name=='term')
    var obj2Form = $(parentId + '.step2TermDetails');
    else if(event.data.name=='cancer')
    var obj2Form = $(parentId + '.step2CancerDetails');
	var flagSubmit = true;
    var tmpMonthValue = (objBirthMonth.val() < 10 ? '0' + objBirthMonth.val() : objBirthMonth.val());
    var tmpDayValue = (objBirthDay.val() < 10 ? '0' + objBirthDay.val() : objBirthDay.val());
    if (objBirthMonth.val() <= 0 || objBirthDay.val() <= 0 || objBirthYear.val() <= 0) {
        //addError(objBirthMonth,'Please select valid dob');
        flagSubmit = false;
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) < 18) {
        addError(objBirthMonth, 'Only 18 & above allowed');
        flagSubmit = false;
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) > 65) {
        addError(objBirthMonth, 'Maximum age limit is 65');
        flagSubmit = false;
    } else {
        clearError(objBirthMonth);
    }

    //var obj = $(parentId + '#termAmt');
    var parentDiv = obj.parents('.input_field');
    //$('.err',parentDiv).text();
    if ($('.err', parentDiv).text() != '') {
        flagSubmit = false;
    }

    if (flagSubmit) {
		if(typeof event.data.name !== 'undefined' && event.data.name !='term'){
			$(parentId + '.proceedGray').parent('.input_field.pro').hide();
			//$(parentId + '.step2TermDetails').slideDown("slow");
			obj2Form.slideDown("slow");
			$(parentId+'.leftContent').removeClass('small');
			$(parentId+'.leftContent').addClass('big');
			//$('#termName').focus();
		}
    } else {
        //$('.step2TermDetails').slideUp("slow");
    }
};
function validationTermName(parentId) {
    var objString, objStringVal, flagSubmit = true;
    if ($.type(parentId) == 'object') {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    }
    //Gender 
    objString = $(parentId + '#termGender');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select title');
        flagSubmit = false;
    } else {
        clearError(objString);
    }

    //Name
    objString = $(parentId + '#termName');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter your name.');
        flagSubmit = false;
    } else if (!onlycharacter(objStringVal)) {
        addError(objString, 'Please enter character only');
        flagSubmit = false;
    } else {
        clearError(objString);
		objString.val(objStringVal);
    }
    return flagSubmit;
}

function validationTermEmail(parentId) {
    var objString, objStringVal, flagSubmit = true;
    if ($.type(parentId) == 'object') {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    }
    objString = $(parentId + '#termEmail');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter your email address');
        flagSubmit = false;
    } else if (!validemail(objStringVal)) {
        addError(objString, 'Please enter your email address');
        flagSubmit = false;
    } else {
        clearError(objString);
		objString.val(objStringVal);
    }
    return flagSubmit;
}

function validationTermCountry(parentId) {
    var objString, objStringVal, flagSubmit = true;
    if ($.type(parentId) == 'object') {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    }
    objString = $(parentId + '#termCountry');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select country');
        flagSubmit = false;

    } else {
        clearError(objString);
    }
    return flagSubmit;
}

function validationTermCity(parentId) {
    var objString, objStringVal, flagSubmit = true;
    if ($.type(parentId) == 'object') {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    }
    var objStringCountryCode = $(parentId + '#termCountry');
    if (objStringCountryCode.val() == '392') {
        objString = $(parentId + '#termCity');
        objStringVal = $.trim(objString.val());
        if (objStringVal.length === 0) {
            addError(objString, 'Please select city');
            flagSubmit = false;
        } else {
            clearError(objString);
        }
    }
    return flagSubmit;
}

function validationTermMobile(parentId) {
    var objString, objStringVal, flagSubmit = true;
    if ($.type(parentId) == 'object') {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    }
    var objStringCountryCode = $(parentId + '#termCountry');
    var objStringCityText = $(parentId + '#termCity');
    var objString = $(parentId + ' .mobNumber');
    objStringVal = $.trim(objString.val());
    var flagCodeError = '';
    var objStringOtherCountryCode = $(parentId + ' #termOtherCountryCode');
    var objStringSpanCountryCode = $(parentId + ' .countryCode span').text();

    if (objStringCountryCode.val() != '392' && (objStringOtherCountryCode.val() == '' && objStringSpanCountryCode == '')) {
        flagCodeError = 'Enter country code';
    }

    if (objStringVal.length === 0 && flagCodeError != '') {
        addError(objString, '<div class="left">' + flagCodeError + '</div><div class="right">Enter valid mobile number</div>');
        flagSubmit = false;

    } else if (objStringVal.length === 0 && objStringCountryCode.val() == '392' && objStringCityText.val() != '') {
        addError(objString, '<div class="right">Enter valid mobile number</div>');
        flagSubmit = false;
    } else if (objStringVal.length === 0 && objStringCountryCode.val() != '392') {
        addError(objString, '<div class="right">Enter valid mobile number</div>');
        flagSubmit = false;

    } else if (flagCodeError != '') {
        addError(objString, '<div class="left">' + flagCodeError + '</div>');
        flagSubmit = false;

    } else if (objStringCountryCode.val() == '392' && !validmobile(objStringVal) && objStringCityText.val() != '') {
        addError(objString, '<div class="right">Please enter correct mobile number. Help us reach you.</div>');
        flagSubmit = false;
	} else if (objStringCountryCode.val() == '392' && !validmobile(objStringVal) && objStringCityText.val() == '') {
        addError(objString, '<div class="right">Please enter correct mobile number. Help us reach you.</div>');
        flagSubmit = false;
    } else if (!onlyNumber(objStringVal) || objStringVal.length === 0) {
        addError(objString, '<div class="right">Enter valid mobile number</div>');
        flagSubmit = false;

    } else {
        clearError(objString);
    }
    return flagSubmit;
}
function validationTermFormStepOne() {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objAmt = $(parentId + '#termAmt');
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    
    var objStringVal = '';
    var flagSubmit = true;
	var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    //Amount
    var parentDiv = objAmt.parents('.input_field');
    var minAmt = parseInt(objAmt.attr('data-min'));
    var maxAmt = parseInt(objAmt.attr('data-max'));
    var errMsg = objAmt.attr('data-msg');
    var amt = objAmt.val().replace(/,/g, '');
    amt = parseInt(amt);
    if (!isNaN(amt)) {
        objAmt.val(amt);
    }
    if (isNaN(amt) || objAmt.length <= 0) {
        addError(objAmt, 'Please enter amount');
        flagSubmit = false;
		errorFields += 'amount,';
        errorDescriptions += 'Please enter amount,';
        errorCounts++; 
    } else if (!checkOnlyNumber(amt)) {
        objAmt.val('');
        $('.fig_lbl', parentDiv).addClass('none');
        flagSubmit = false;
		errorFields += 'amount,';
        errorDescriptions += 'Please enter amount,';
        errorCounts++; 
    } else if (objAmt.length > 0 && amt >= minAmt && amt <= maxAmt) {
        fnFormatCurrencyIndianStyle(objAmt, 20);
        clearError(objAmt);
    } else {
        objAmt.addClass('error');
        parentDiv.addClass('error');
        $('.fig_lbl', parentDiv).addClass('none');
        $('.err', parentDiv).html(errMsg + ' ' + convert_number(minAmt) + ' to ' + convert_number(maxAmt));
        flagSubmit = false;
    }

    //DOB
    var tmpMonthValue = (objBirthMonth.val() < 10 ? '0' + objBirthMonth.val() : objBirthMonth.val());
    var tmpDayValue = (objBirthDay.val() < 10 ? '0' + objBirthDay.val() : objBirthDay.val());
    if (objBirthMonth.val() <= 0 || objBirthDay.val() <= 0 || objBirthYear.val() <= 0) {
        addError(objBirthMonth, 'Please select valid dob');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Please select valid dob,';
        errorCounts++; 
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) < 18) {
        addError(objBirthMonth, 'Only 18 & above allowed');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Only 18 & above allowed,';
        errorCounts++; 
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) > 65) {
        addError(objBirthMonth, 'Maximum age limit is 65');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Maximum age limit is 65,';
        errorCounts++;
    } else {
        clearError(objBirthMonth);
    }
	if(!flagSubmit){
        userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
    return flagSubmit;	
}
function validationTermForm(parentId) {
    //console.log(event.type);

    var objAmt = $(parentId + '#termAmt');
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    //var valSmoke = $('input[name="termSmoke"]:checked').val();

    var objStringVal = '';
    var flagSubmit = true;
	var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    //Amount
    var parentDiv = objAmt.parents('.input_field');
    var minAmt = parseInt(objAmt.attr('data-min'));
    var maxAmt = parseInt(objAmt.attr('data-max'));
    var errMsg = objAmt.attr('data-msg');
    var amt = objAmt.val().replace(/,/g, '');
    amt = parseInt(amt);
    if (!isNaN(amt)) {
        objAmt.val(amt);
    }
    if (isNaN(amt) || objAmt.length <= 0) {
        addError(objAmt, 'Please enter amount');
        flagSubmit = false;
    } else if (!checkOnlyNumber(amt)) {
        objAmt.val('');
        $('.fig_lbl', parentDiv).addClass('none');
        flagSubmit = false;
    } else if (objAmt.length > 0 && amt >= minAmt && amt <= maxAmt) {
        fnFormatCurrencyIndianStyle(objAmt, 20);
        clearError(objAmt);
    } else {
        objAmt.addClass('error');
        parentDiv.addClass('error');
        $('.fig_lbl', parentDiv).addClass('none');
        $('.err', parentDiv).html(errMsg + ' ' + convert_number(minAmt) + ' to ' + convert_number(maxAmt));
        flagSubmit = false;
    }

    //DOB
    var tmpMonthValue = (objBirthMonth.val() < 10 ? '0' + objBirthMonth.val() : objBirthMonth.val());
    var tmpDayValue = (objBirthDay.val() < 10 ? '0' + objBirthDay.val() : objBirthDay.val());
    if (objBirthMonth.val() <= 0 || objBirthDay.val() <= 0 || objBirthYear.val() <= 0) {
        addError(objBirthMonth, 'Please select valid dob');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Please select valid dob,';
        errorCounts++;
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) < 18) {
        addError(objBirthMonth, 'Only 18 & above allowed');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Only 18 & above allowed,';
        errorCounts++; 
    } else if (getAgeUsingDOB(objBirthYear.val() + '-' + tmpMonthValue + '-' + tmpDayValue) > 65) {
        addError(objBirthMonth, 'Maximum age limit is 65');
        flagSubmit = false;
		errorFields += 'dob,';
        errorDescriptions += 'Maximum age limit is 65,';
        errorCounts++; 
    } else {
        clearError(objBirthMonth);
    }

    //Name
    if (!validationTermName(parentId)) {
        flagSubmit = false;
		errorFields += 'name,';
        errorDescriptions += 'Please enter your name,';
        errorCounts++; 
    }

    //Email Id
    if ($(parentId + '#termCountry').val() !='392' && $(parentId + '#termEmail').is(":visible") && !validationTermEmail(parentId)) {
        flagSubmit = false;
		errorFields += 'email,';
        errorDescriptions += 'Please enter valid email,';
        errorCounts++; 
    }

    //Country
    if (!validationTermCountry(parentId)) {
        flagSubmit = false;
    }

    //City / Pincode
    /*if (!validationTermCity(parentId)) {
        flagSubmit = false;
    }*/

    //Mobile
    if (!validationTermMobile(parentId)) {
        flagSubmit = false;
		errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile,';
        errorCounts++; 
    }
	if(!flagSubmit){
        userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
    return flagSubmit;
}
function isValidCriticalForm(parentId){
    var flagSubmit = true;
    
    //Name
    if (!validationTermName(parentId)) {
        flagSubmit = false;
    }

    //Email Id
    if (!validationTermEmail(parentId)) {
        flagSubmit = false;
    }

    //City / Pincode
    if (!validationTermCity(parentId)) {
        flagSubmit = false;
    }

    //Mobile
    if (!validationTermMobile(parentId)) {
        flagSubmit = false;
    }
    
    return flagSubmit;
}

// For Critical Illness
function validationCriticalForm() {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var chosenVariation = isValidCriticalForm(parentId);
    var tabName = '';
    var redirectUrl = '';
    
    if (chosenVariation) { 
        var objAmt = $(parentId + '#termAmt');
        var valAnnualIncome = $(parentId + 'input[name="termAnnualIncome"]:checked').val();
            $(this).hide();
            $(parentId+'.process').removeClass('hide');
            var leadsource = 'PB';
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                leadsource = 'PBMobile';
            }
            var termCityId = $(parentId + '#termCity').attr('data-cityid');
            var termStateId = $(parentId + '#termCity').attr('data-stateid');
            var termCityName = $(parentId + '#termCity').val();
           
            var gtmData = '';
            gtmData += (utmSource == '' || utmSource == 'undefined') ? '' : '&utm_source=' + utmSource;
            gtmData += (utmTerm == '' || utmTerm == 'undefined') ? '' : '&utm_term=' + utmTerm;
            gtmData += (utmMedium == '' || utmMedium == 'undefined') ? '' : '&utm_medium=' + utmMedium;
            gtmData += (utmCampaign == '' || utmCampaign == 'undefined') ? '' : '&utm_campaign=' + utmCampaign;
            
            if($('#formName').val() == "criticalillness"){
              tabName = 'criticalillness';
              //redirectUrl = 'http://insurance.policybazaar.com/health-insurance/critical-illness-insurance.aspx';
				redirectUrl = 'http://cipainsurance.policybazaar.com/health-insurance/critical-illness-insurance.aspx';
            }else{
              tabName = 'personalaccident';
              //redirectUrl = 'http://insurance.policybazaar.com/health-insurance/personal-accident-insurance.aspx';              
			  redirectUrl = 'http://cipainsurance.policybazaar.com/health-insurance/personal-accident-insurance.aspx';
            }
    
            var postdata = JSON.stringify({               
                Name: $(parentId + '#termName').val(),
                MobileNo: $.trim($(parentId + '.term-bg .mobNumber').val()),
                EmailID: $(parentId + '#termEmail').val(),
				StateID: (termStateId == '' || termStateId == 'undefined') ? 9999 : termStateId,
				CityID: (termCityId == '' || termCityId == 'undefined') ? 9999 : termCityId,   
                CityName: (termCityName == '' || termCityName == 'undefined') ? '' : termCityName,
                AnnualIncomeID: valAnnualIncome
            });
            
            var localstorage = JSON.stringify({Data:{               
                Name: $(parentId + '#termName').val(),
                MobileNo: $.trim($(parentId + '.term-bg .mobNumber').val()),
                EmailID: $(parentId + '#termEmail').val(),
                CityID: (termCityId == '' || termCityId == 'undefined') ? 9999 : termCityId,                
                AnnualIncomeID: valAnnualIncome,
                tabName: tabName,
                StateID: (termStateId == '' || termStateId == 'undefined') ? 9999 : termStateId,
                CityName: (termCityName == '' || termCityName == 'undefined') ? '' : termCityName
            }});
           
            //localStorage.setItem("getLastTab", localstorage);
            //Set pbcjpreqd
                $.ajax({
                url: BASEURL + 'cj-process.php?type=setpbcjpreqd',
                type: "POST",
                cache: false,
                data: localstorage,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data)
                {}});                    
                //Set pbcjpreqd
            window.top.location.href = redirectUrl+'?req=' + encodeURIComponent(Base64.encode(postdata))+gtmData;
    }
}
fncProcessTerm = function () {
    var leadsource = 'PB';    
	var isLandingforSPO = window.location.href.indexOf("landingpage/term");
    if (isLandingforSPO > -1) {        
        leadsource = 'ACAFF';
		if($.trim(utmSource.toLowerCase()) != 'offlineaffiliate' || utmTerm == '' || utmMedium == '' || utmCampaign == ''){
            alert('UTM Tags are missing');
            return;
        }    
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        leadsource = 'PBMobile';
    }
	var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBtnSubmit = $(this);
    objBtnSubmit.hide();
    $(parentId+'#loader').show();
    $(parentId+'#loader').removeClass('hide');
    var objAmt = $(parentId + '#termAmt');
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    var valSmoke = $(parentId + 'input[name="termSmoke"]:checked').val();
    var valProfessionType = $(parentId + 'input[name="professionType"]:checked').val();
    var flagSubmit = validationTermForm(parentId);
	var valAnnualIncome = $(parentId + 'input[name="termAnnualIncome"]:checked').val();

    if (flagSubmit) {       

        /*function getGa() {
            var cli = 0;
            /*ga(function() {
             var trackers = ga.getAll();
             var gacid;
             for (var i=0; i < trackers.length; ++i) {
             var tracker = trackers[i];
             //alert(tracker.get('name'));
             if(tracker.get('name')=='termTrackerObj'){
             gacid= tracker.get('clientId');
             //alert(gacid);
             console.log(gacid);
             //$('<input>').attr({
             // type: 'hidden',
             // name: 'gaClientId',
             // value: gacid
             // }).appendTo(objForm);
             //return tracker.get('clientId');
             cli=gacid;
             //return gacid;
             }
             }
             });
            console.log(cli);
            return cli;
        }*/
        var termCityId = $(parentId + '#termCity').attr('data-cityid');
        var termStateId = $(parentId + '#termCity').attr('data-stateid');
		var isBaxaFlexiPlan = window.location.href.indexOf("bharti-axa-life-term-insurance-plans/flexi-term-plan");
		var passedPid = $('#passed_pid').val();
        if(window.location.href.indexOf("/insurance-companies/")){
            var parts = window.location.href.split('/');
            var lastSegment = parts.pop() || parts.pop();
            passedPid = arrPidMapping[lastSegment];
        }
        var postdata = JSON.stringify({
            leadSource: leadsource,
            mobileNo: $.trim($(parentId + '.term-bg .mobNumber').val()),
            countryId: $.trim($('option:selected', parentId + '#termCountry').val()),
            tobacco: valSmoke,
            annualIncome:valAnnualIncome,
            gender: $(parentId + '#termGender').val(),
            name: $(parentId + '#termName').val(),
            email: $(parentId + '#termEmail').val(),
            cityId: (termCityId == '' || termCityId == 'undefined') ? 9999 : termCityId,
            stateId: (termStateId == '' || termStateId == 'undefined') ? 99 : termStateId,
            utmSource: (utmSource == '' || utmSource == 'undefined') ? '' : utmSource,
            utmTerm: (utmTerm == '' || utmTerm == 'undefined') ? '' : utmTerm,
            utmMedium: (utmMedium == '' || utmMedium == 'undefined') ? '' : utmMedium,
            utmCampaign: (utmCampaign == '' || utmCampaign == 'undefined') ? '' : utmCampaign,
            visitId: (visitId == '' || visitId == 'undefined') ? '' : (visitId == 0 ? $('#gaData').attr('data-visit') : visitId),
            totalPayout: objAmt.val().replace(/,/g, ''),
            dob: objBirthDay.val() + '-' + objBirthMonth.val() + '-' + objBirthYear.val(),
            custId: "-1",
            iPAddress: $(parentId + '#termiPAddress').val(),
            nri: $(parentId + 'input[name="nri"]:checked').val(),
            isStateChange: true,
            //professionType: valProfessionType,
            gaTrackerClientId: getGACId( 'UA-4743078-7'),
            gclid:getGCLId()
        });
        //console.log(postdata);
        $.ajax({
            url: BASEURL + 'cj-process.php?type=term',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data)
            {
                //Set local storage value for form
                var objCityPin = $(parentId + '#termCity');
                var country_code = $.trim($('option:selected', parentId + '#termCountry').attr('data-country-code'));
                var postdata = JSON.stringify({Data:{
                    tabName: 'term',
                    dobDay: objBirthDay.val(),
                    dobMonth: objBirthMonth.val(),
                    dobYear: objBirthYear.val(),
                    tobacco: valSmoke,
					annualIncome:valAnnualIncome,
                    coverAmt: objAmt.val().replace(/,/g, ''),
                    country: $.trim($(parentId + '#termCountry').val()),
                    countryCode: (country_code == '') ? $.trim($(parentId + '#termOtherCountryCode').val()) : country_code,
                    City: $.trim(objCityPin.val()),
                    CityID: $.trim(objCityPin.attr('data-cityid')),
                    state_id: $.trim(objCityPin.attr('data-stateid')),
                    gender: $.trim($(parentId + '#termGender').val()),
                    Name: $.trim($(parentId + '#termName').val()),
                    EmailID: $.trim($(parentId + '#termEmail').val()),
                    nri: $(parentId + 'input[name="nri"]:checked').val(),
                    MobileNo: $.trim($(parentId + '.term-bg .mobNumber').val())//,
                    //professionType: valProfessionType
                }});
                //Set pbcjpreqd
                    $.ajax({
                url: BASEURL + 'cj-process.php?type=setpbcjpreqd',
                    type: "POST",
                    cache: false,
                    data: postdata,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data)
                    {}});                    
                //Set pbcjpreqd

                try{
                    //Use if userid retrun by service
						//Set PBCID
                    var CustId = data.customerId;
                                                $.ajax({
                        url: BASEURL+'cj-process.php?type=setpbcid',
                                                type: "POST",
                                                cache: false,
                        data: JSON.stringify({CustId:CustId,Mob:$.trim($(parentId + '.term-bg .mobNumber').val())}),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                        success: function (){}
                    });                    
                                                //Set PBCID
                 } catch (e) {}              
                //End
                //End

                if (data != '') {
                    if (typeof data.enquiryId !== "undefined" && data.enquiryId !='') { 						
                            //var redirectUrl = 'https://termnewqa.policybazaar.com/quotes/'+data.enquiryId +'?refId='+data.enquiryId+'&isMatrixLeadCreated=' + data.isMatrixLeadCreated+'&isProgressiveJourney=true&isMobileDefault=true';
                            var redirectUrl = 'https://termlife.policybazaar.com/quotes/'+encodeURIComponent(data.enquiryId) +'?refId='+encodeURIComponent(data.enquiryId)+'&isMatrixLeadCreated=' + data.isMatrixLeadCreated+'&isProgressiveJourney=true&isMobileDefault=true';
                            if(isBaxaFlexiPlan > '-1')
                                    redirectUrl += '&pid=20';
                            else if (typeof passedPid !== "undefined" && passedPid  !=''){
                                    redirectUrl += '&pid='+passedPid;
                            }
                            if($(parentId).attr('data-quotes-term')=='quotes_first'){
                                redirectUrl += '&utm_term=quotes_first&utm_medium=bu';
                            }
                            GA360(data.matrixleadId,data.enquiryId,data.customerId,'','fresh');//leadId,enquiryId,customerId,bookingId,policyType
							GA360FormSubmit('formSubmitSuccess');
                            window.top.location.href = redirectUrl+'&iscom=1';
                    }else{
                    GA360FormSubmit('formSubmitFailed');
                }
                }else{
                    GA360FormSubmit('formSubmitFailed');
                }
                $(parentId+'#loader').hide();
                objBtnSubmit.show();
                //data: return data from server
            }
        });
    } else {
        $(parentId+'#loader').hide();
        objBtnSubmit.show();
		GA360FormSubmit('formSubmitFailed');
    }
};
fncProcessCancer = function () {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBtnSubmit = $(this);
    objBtnSubmit.hide();
    var objAmt = $(parentId + '#termAmt');
    var objBirthMonth = $(parentId + '#termBirthday .birthMonth');
    var objBirthDay = $(parentId + '#termBirthday .birthDate');
    var objBirthYear = $(parentId + '#termBirthday .birthYear');
    var valSmoke = $(parentId + 'input[name="termSmoke"]:checked').val();
    var flagSubmit = validationTermForm(parentId);
    var valAnnualIncome = $(parentId + 'input[name="termAnnualIncome"]:checked').val();
    
    if (flagSubmit) {
        var leadsource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            leadsource = 'PBMobile';
        }
        var cancerCityId = $(parentId + '#termCity').attr('data-cityid');
        var cancerStateId = $(parentId + '#termCity').attr('data-stateid');
        var postdata = JSON.stringify({
            leadSource: leadsource,
            mobileNo: $.trim($(parentId + '.cancer-bg .mobNumber').val()),
            countryId: $.trim($('option:selected', parentId + '#termCountry').val()),
            tobacco: valSmoke,
            annualIncome:valAnnualIncome,
            gender: $(parentId + '#termGender').val(),
            name: $(parentId + '#termName').val(),
            email: $(parentId + '#termEmail').val(),
            cityId: (cancerCityId == '' || cancerCityId == 'undefined') ? 9999 : cancerCityId,
            stateId: (cancerStateId == '' || cancerStateId == 'undefined') ? 99 : cancerStateId,
            utmSource: (utmSource == '' || utmSource == 'undefined') ? '' : utmSource,
            utmTerm: (utmTerm == '' || utmTerm == 'undefined') ? '' : utmTerm,
            utmMedium: (utmMedium == '' || utmMedium == 'undefined') ? '' : utmMedium,
            utmCampaign: (utmCampaign == '' || utmCampaign == 'undefined') ? '' : utmCampaign,
            visitId: (visitId == '' || visitId == 'undefined') ? '' : (visitId == 0 ? $('#gaData').attr('data-visit') : visitId),
            cover: objAmt.val().replace(/,/g, ''),
            dob: objBirthDay.val() + '-' + objBirthMonth.val() + '-' + objBirthYear.val(),
            custId: "-1",
            productId:7,
            iPAddress: $(parentId + '#canceriPAddress').val(),
            gaClientId: ''
        });
        //console.log(postdata);
        $.ajax({
            url: BASEURL + 'cj-process.php?type=cancer',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data)
            {
                //Set local storage value for form
                var objCityPin = $(parentId + '#termCity');
                var country_code = $.trim($('option:selected', parentId + '#termCountry').attr('data-country-code'));
                var postdata = JSON.stringify({Data:{
                    tabName: 'cancer',
                    dobDay: objBirthDay.val(),
                    dobMonth: objBirthMonth.val(),
                    dobYear: objBirthYear.val(),
                    tobacco: valSmoke,
                    annualIncome:valAnnualIncome,
                    coverAmt: objAmt.val().replace(/,/g, ''),
                    country: $.trim($(parentId + '#termCountry').val()),
                    countryCode: (country_code == '') ? $.trim($(parentId + '#termOtherCountryCode').val()) : country_code,
                    City: $.trim(objCityPin.val()),
                    CityID: $.trim(objCityPin.attr('data-cityid')),
                    state_id: $.trim(objCityPin.attr('data-stateid')),
                    gender: $.trim($(parentId + '#termGender').val()),
                    Name: $.trim($(parentId + '#termName').val()),
                    EmailID: $.trim($(parentId + '#termEmail').val()),
                    MobileNo: $.trim($(parentId + '.cancer-bg .mobNumber').val())
                }});
                //Set pbcjpreqd
                $.ajax({
                url: BASEURL + 'cj-process.php?type=setpbcjpreqd',
                type: "POST",
                cache: false,
                data: postdata,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data)
                {}});                    
                //Set pbcjpreqd
                //End

                if (data != '' && data.status != 'failed') {                    
                    //Set PBCID
                    $.ajax({
                    url: BASEURL + 'cj-process.php?type=setpbcid',
                    type: "POST",
                    cache: false,
                    data: JSON.stringify({CustId:data.customerId,Mob:$.trim($(parentId + '.cancer-bg .mobNumber').val())}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function ()
                    {}});  
                    //Set PBCID 
					GA360(data.matrixleadId,data.enquiryId,data.customerId,'','fresh');
					GA360FormSubmit('formSubmitSuccess');                    
                    //var redirectUrl = 'http://cancerinsurance.policybazaar.com/ci/quotes/' + data.enquiryId +'?refId='+data.enquiryId+'&isMatrixLeadCreated='+ data.isMatrixLeadCreated;
                    //var redirectUrl = 'http://termnewqa.policybazaar.com/ci/quotes/' + data.enquiryId +'?refId='+data.enquiryId+'&isMatrixLeadCreated='+ data.isMatrixLeadCreated;
                    var redirectUrl = 'https://cancerinsurance.policybazaar.com/ci/quotes/' + data.enquiryId +'?refId='+data.enquiryId+'&utm_source=Retainer_Cancer_Term&iscom=1';
                    window.top.location.href = redirectUrl+'&iscom=1';//QA                    
                }else{
					GA360FormSubmit('formSubmitFailed');
				}
                objBtnSubmit.show();
                //data: return data from server
            }
        });
    } else {
        objBtnSubmit.show();
    }
};
/*fncSetTermCountryCode = function(){
 $('.term-bg .countryCode').text('+'+$(this).val());
 $('.term-bg .mobNumber').val('');
 if ($(this).val()==91){
 $('.term-bg .mobNumber').attr({"minlength":"10","maxlength":"10"});
 } else {
 $('.term-bg .mobNumber').attr({"minlength":"8","maxlength":"15"});
 }
 };*/

fncSetTermCountryCode = function (event) {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var curVal = $(this).val();
    if(event.data.name=='term'){
        var objSpan = $(parentId+'.term-bg .countryCode span');
        var objTextBox = $(parentId+'.term-bg .countryCode input');
        var objCityTextBox = $(parentId+'.term-bg #termCity');
        var objMobileNumber = $(parentId+'.term-bg .mobNumber');
        if(curVal != 392){
            $(parentId+'.term-bg #nri').show();
            $(parentId+'.term-bg #email').show();
            $(parentId+'.term-bg #nri [value="1"]').prop('checked', true);
            $(parentId+'.term-bg #email p').hide();
        } else {
            $(parentId+'.term-bg #nri').hide();
            $(parentId+'.term-bg #email').hide();
            $(parentId+'.term-bg #nri [value="0"]').prop('checked', true);            
            $(parentId+'.term-bg #email p').show();
            $(parentId+'.term-bg #email #termEmail,'+parentId+'.term-bg #email').removeClass('error');
            $(parentId+'.term-bg #email .err').html('');
        }
    }
    if(event.data.name=='cancer'){
        var objSpan = $(parentId+'.cancer-bg .countryCode span');
        var objTextBox = $(parentId+'.cancer-bg .countryCode input');
        var objCityTextBox = $(parentId+'.cancer-bg #termCity');
        var objMobileNumber = $(parentId+'.cancer-bg .mobNumber');
    }
    objMobileNumber.val('');
    clearError(objMobileNumber);
    if (curVal == 392) {
        objCityTextBox.show().val('');
        objCityTextBox.attr({"data-cityid": "", "data-stateid": ""});
        if(event.data.name=='cancer'){
            $(this).attr('style', 'width:30%');
        }
        if(event.data.name=='term'){
			$(parentId+'.term-bg .lblCountry').text('City');
			objCityTextBox.attr({'data-stateid':'35','data-cityid':'551'}).val('Delhi (Delhi)');
		}
        if(event.data.name=='cancer')
            $(parentId+'.cancer-bg .lblCountry').text('City');
    } else {
        objCityTextBox.val('').hide();
        objCityTextBox.attr({"data-cityid": "", "data-stateid": ""});
        if(event.data.name=='cancer')
			$(this).attr('style', 'width: 100% !important');
        
		if(event.data.name=='term')
			$(parentId+'.term-bg .lblCountry').text('Country');
        
		if(event.data.name=='cancer')
            $(parentId+'.cancer-bg .lblCountry').text('Country');
        clearError(objCityTextBox);
    }
    if (curVal == 999) {
        $('input_field.nri ').hide();
        objSpan.text('').hide();
        objTextBox.show();
    } else {
		        $('input_field.nri ').show();
        objTextBox.hide();
        objSpan.text('+' + $('option:selected', this).attr('data-country-code')).show();
    }
    var lenMin = $('option:selected', this).attr('data-min');
    var lenMax = $('option:selected', this).attr('data-max');
    objMobileNumber.attr({"minlength": lenMin, "maxlength": lenMax});
};

//Get state and city id autocomplete
/*
 fncAutocompleteCity = function(){
 var objCity = $(this);
 var valCity = objCity.val();
 if (valCity){
 
 var postdata = JSON.stringify({
 q:valCity
 });
 $.ajax({
 url: BASEURL + 'cj-process.php?type=autocompletecity',
 type: "POST",
 cache: false,
 data: postdata,
 contentType: "application/json; charset=utf-8",
 dataType: "json",
 success: function (data) {
 console.log('errdata: ' + data);
 if (data.ok == '1') {
 console.log(data.output);
 }
 //data: return data from server
 }
 });
 }
 //console.log(objCity.val());
 };*/
//Term cj end

//Health SME CJ Start
fncDisplayHealthSmeDetals = function(){
    //$(parentId+' #disDisclaimer').hide();
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    $(parentId+'.healthsme-bg .marker').hide();
    $(parentId+'.healthsme-bg .groupPolicyType').hide();
    $(parentId+'.healthsme-bg #smeidemnity').addClass('dis_none');
    $(parentId+'.healthsme-bg #smecompany').show();
    var optionID = $(parentId+'.healthsme-bg #healthsmeOption option:selected').attr('data-id');
    if(optionID == 1 || optionID == 2  || optionID == 3){
        if(optionID == 1)
        $(parentId+'.healthsme-bg .marker').show();
    
        $(parentId+'.healthsme-bg .groupPolicyType').show();
    }
    if(optionID == 14 && $(parentId+'.healthsme-bg #healthsmeContactPerson').val() == ''){
        $(parentId+'.healthsme-bg #smecompany').hide();
        $(parentId+'.healthsme-bg #smeidemnity').removeClass('dis_none');
    }
    if (optionID == '' && $(parentId+'.healthsme-bg #healthsmeContactPerson').val() == '') {
        $(parentId+'.proceedGray').parent('.input_field.pro').show();
        $(parentId+'.step2HealthDetails').slideUp('slow');
    } else {
        if((optionID != 14 && ($(parentId+'.healthsme-bg #healthsmeCompanyname').val() == '') && $(parentId+'.healthsme-bg #healthsmeContactPerson').val() == '') || (optionID == 14 && ($(parentId+'.healthsme-bg #healthsmeIdemnity option:selected').val() == '' && $(parentId+'.healthsme-bg #healthsmeContactPerson').val() == '')))
        {
            $(parentId+'.proceedGray').parent('.input_field.pro').show();
            $(parentId+'.step2HealthDetails').slideUp('slow');
        }
        else{
            $(parentId+'.proceedGray').parent('.input_field.pro').hide();
            $(parentId+'.step2HealthDetails').slideDown('slow');
        }
		if($(parentId+'.healthsme-bg #healthsmeCompanyname').val() != ''){
			 $(parentId+'.leftContent').removeClass('small');
			 $(parentId+'.leftContent').addClass('big');
		 }
    }
     
};

fncProcessHealthSme = function(){
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBtnSubmit = $(this);
    var objProcessDiv = $(parentId+'.process');
    objBtnSubmit.hide();
    objProcessDiv.show();
    var objString = '';
    var objStringVal = '';
    var flagSubmit = true;

    //Options
    objString = $(parentId+'#healthsmeOption');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select insurance policy option');
        flagSubmit = false;
    } else {
        clearError(objString);
    }
    
    var optionID = $('.healthsme-bg #healthsmeOption option:selected').attr('data-id');
    if(optionID != '' && optionID != 14){
        //Company name
        objString = $(parentId+'#healthsmeCompanyname');
        objStringVal = $.trim(objString.val());
		objString.val(objStringVal);
        if (objStringVal.length === 0) {
            addError(objString, 'Please enter company name');
            flagSubmit = false;
        } else if (!onlycharacter(objStringVal)) {
            addError(objString, 'Please enter character only');
            flagSubmit = false;
        } else {
            clearError(objString);
        }
    }
    if(optionID != '' && optionID == 14){
        //Risk Category
        objString = $(parentId+'#healthsmeIdemnity');
        objStringVal = $.trim(objString.val());
        if (objStringVal.length === 0) {
            addError(objString, 'Please select risk category');
            flagSubmit = false;
        } else {
            clearError(objString);
        }
    }
    //Salutation
    objString = $(parentId+'#healthsmeGender');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select');
        flagSubmit = false;
    } else {
        clearError(objString);
    }
    //Name
    objString = $(parentId+'#healthsmeContactPerson');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter contact person name');
        flagSubmit = false;
    } else if (!onlycharacter(objStringVal)) {
        addError(objString, 'Please enter character only');
        flagSubmit = false;
    } else {
        clearError(objString);
    }
    
    //Mobile
    var objString = $(parentId+'#healthsmeMobile');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter mobile number');
        flagSubmit = false;
    } else if (!validmobile(objStringVal)) {
        addError(objString, 'Please enter valid mobile number');
        flagSubmit = false;
    } else if (!onlyNumber(objStringVal)) {
        addError(objString, 'Please enter valid mobile number');
        flagSubmit = false;
    } else {
        clearError(objString);
    }
    
    //Email Id
    objString = $(parentId+'#healthsmeEmail');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter email id');
        flagSubmit = false;
    } else if (!validemail(objStringVal)) {
        addError(objString, 'Please enter valid email id');
        flagSubmit = false;
    } else {
        clearError(objString);
    }

    //City / Pincode
    objString = $(parentId+'#healthsmeCityPincode');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select city');
        flagSubmit = false;
    } else {
        clearError(objString);
    }
	
	//Type of Policy
    groupPolicyType = '';
    if(optionID == 1 || optionID == 2 || optionID == 3){
        objString = $(parentId+'[name=policyType]');
        if ($(parentId+'[name=policyType]').is(':checked')){
            clearError(objString);
            groupPolicyType = $(parentId+'[name=policyType]:checked').val();
        }else {
            addError(objString, 'Please select type of policy');
            flagSubmit = false;
        }
    }
    
    if (flagSubmit) {        

        function getGa() {
            //Live:'UA-4743078-15'
            //QA: 'UA-4743078-19'
            var GACID = 0;
              try {
                var trackers = ga.getAll();
                for (var i = 0; i < trackers.length; ++i)
                {
                  var tracker = trackers[i];
                  if (tracker.get('trackingId') == 'UA-4743078-19')
                  {
                    GACID = tracker.get('clientId');
                  }
                }
              } catch (e) {
              }
              return GACID;
        }
        var gaClientId = getGa();
		var GCLID = '';//getGCLId('UA-4743078-19');
        var objCityPin = $(parentId+'#healthsmeCityPincode');
		var investmentTypeId = $.trim($(parentId+'#healthsmeOption option:selected').attr('data-id'));
        //Set local storage value for form
        var postdata = JSON.stringify({
            tabName: 'healthsme',
            company_name: $.trim($(parentId+'#healthsmeCompanyname').val()),
            insurance_policy_option: $.trim($(parentId+'#healthsmeOption').val()),
            investmentTypeId: $.trim($(parentId+'#healthsmeOption option:selected').attr('data-id')),
            riskCategory: $.trim($(parentId+'#healthsmeIdemnity option:selected').text()),
            riskCategoryId: $.trim($(parentId+'#healthsmeIdemnity option:selected').val()),
			gender:$.trim($(parentId+'#healthsmeGender').val()),
            contact_person: $.trim($(parentId+'#healthsmeContactPerson').val()),
            mobile: $.trim($(parentId+'#healthsmeMobile').val()),
            emailid: $.trim($(parentId+'#healthsmeEmail').val()),
            city_name: $.trim(objCityPin.val()),
            city_id: $.trim(objCityPin.attr('data-cityid')),
            state_id: $.trim(objCityPin.attr('data-stateid')),
            pincode: $.trim(objCityPin.attr('data-pincode')),
            gaClientId: gaClientId,
			gCLId:GCLID,
			groupPolicyType: groupPolicyType,
            country: 392,
            countryCode:91
        });
        try {
            localStorage.setItem("getLastTab", postdata);
        } catch (e) {
        }
        //End
		var leadsource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            leadsource = 'PBMobile';
        }
        var postdata = JSON.stringify({
            leadSource:leadsource,
			visitLogId: (visitId == 0 ? $('#gaData').attr('data-visit') : visitId),
            utm_term: utmTerm,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            browser: getBrowser(),
            companyName: $.trim($(parentId+'#healthsmeCompanyname').val()),
            insurance_policy_option: $.trim($(parentId+'#healthsmeOption option:selected').text()),
            investmentTypeId: $.trim($(parentId+'#healthsmeOption option:selected').attr('data-id')),
            riskCategory: $.trim($(parentId+'#healthsmeIdemnity option:selected').text()),
            riskCategoryId: $.trim($(parentId+'#healthsmeIdemnity option:selected').val()),
            contactPerson: $.trim($(parentId+'#healthsmeGender').val())+' '+$.trim($(parentId+'#healthsmeContactPerson').val()),
            mobileNo: $.trim($(parentId+'#healthsmeMobile').val()),
            city_id: $.trim(objCityPin.attr('data-cityid')),
            state_id: $.trim(objCityPin.attr('data-stateid')),
            pincode: $.trim(objCityPin.attr('data-pincode')),
            cityName: $.trim(objCityPin.val()),
            emailid: $.trim($(parentId+'#healthsmeEmail').val()),
            request_url: window.location.href,
            gaClientId: gaClientId,
			gCLId:GCLID,
			groupPolicyType: groupPolicyType
        });
        //console.log(postdata);
        $.ajax({
            url: BASEURL + 'cj-process.php?type=healthsme',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data)
            {   data = JSON.parse(data);
                if (data.enquiryId != '') {
					try{dataLayer.push({'event':'smeLead'})}catch(e){}
					
                    var optProduct = $.trim($(parentId+'#healthsmeOption').val());
					optProduct = optProduct.replace(/\s/g,"-");
					var policyType = (groupPolicyType==1)?'Fresh':'Renewal';
					var strPath = window.location.pathname;
                    var arrPath =strPath.split('/');                    
                    var pageName = arrPath[arrPath.length-2];

                    if(optionID == 12 || optionID == 15 || optionID == 16 ||  optionID == 17){
						try{
						ga('giTrackerObj.set', 'dimension1', data.matrixLeadId);
                        ga('giTrackerObj.send', 'event', 'Lead', optProduct, data.matrixLeadId);
                        ga('pbTrackerObj.set', 'dimension1', data.matrixLeadId);
                        ga('pbTrackerObj.send', 'event', 'Lead', optProduct, data.matrixLeadId);
                        
                        ga('giTrackerObj.send','pageview', '/'+optProduct+'/thankyou');
                        ga('giTrackerObj.send', 'event', 'Thank-You', optProduct, data.matrixLeadId);
						}catch(e){}
                        $(parentId+'.healthsme-thankyou').show().html('<div class="heading"><i class="fa fa-check" aria-hidden="true"></i> Thank You!</div><div class="box"><p>Thank you for sharing your details with us.</p><p>Our relationship manager will call you to discuss the details and  guide you along.</p><p>In case you have any query or comments, please contact us at</p><span class="mail"><i class="fa fa-envelope" aria-hidden="true"></i> Contact Us : <a href="mailto:corporateinsurance@policybazaar.com">corporateinsurance@policybazaar.com</a></span></div>');
                        $(parentId+'.healthsme-bg.active ').hide();
						$(parentId+'.leftContent').removeClass('big');
						$(parentId+'.leftContent').addClass('small');
                    
					//}else if($.trim($(parentId+'#healthsmeOption').val()) =='Group Health Insurance' && groupPolicyType==2){
					}  else {
						try{ga('giTrackerObj.set', 'dimension1', data.matrixLeadId);
                        ga('giTrackerObj.send', 'event', 'Lead', optProduct, data.matrixLeadId);
                        ga('pbTrackerObj.set', 'dimension1', data.matrixLeadId);
                        ga('pbTrackerObj.send', 'event', 'Lead', optProduct, data.matrixLeadId);
                        ga('giTrackerObj.send', 'event', 'PreQ1','Group-Health-Insurance', policyType,{'nonInteraction': true});
                        }catch(e){}						
                        
						if(optionID == 18){
                            var cntUrl = data.returnurl;                                                        
                            window.top.location.href = cntUrl.replace('?','contractor?');
                        }
                        else if(optionID == 5 || optionID == 7 || optionID == 8){
                            var cntUrl = data.returnurl;                                                        
                            window.top.location.href = cntUrl.replace('#/?','/firenburglaryinsurance?')+'&iscom=1';
                        }else
						window.top.location.href = data.returnurl+'&iscom=1';
                    }
                }
                objBtnSubmit.show();
                objProcessDiv.hide();
                //data: return data from server
            }
        });
    } else {
        objBtnSubmit.show();
        objProcessDiv.hide();
    }
};
//Health SME CJ End

//Health cj start
fncHealthLeadCreate = function(){
    var CountryCode = $.trim($('.health-bg #healthMobileCountry').val());
    var MobileNo = $.trim($('.mobNumber').val());
    var UtmSource = $.trim(utmSource);
    var UtmTerm = $.trim(utmTerm);
    var UtmMedium = $.trim(utmMedium);
    var UtmCampaign = $.trim(utmCampaign);
    var Page = $.trim($(location). attr("href"));
    if(MobileNo.length !== 0 && MobileNo.length === 10 && CountryCode == '91'){
        var leadSource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            leadSource = 'PBMOBILE';
        }
            
        //$('.proceedGray').hide();
        //$('.hideform').show();
        var postdata = JSON.stringify({
            CountryCode:CountryCode,
            MobileNo:MobileNo,
            UtmSource:UtmSource,
            UtmTerm:UtmTerm,
            UtmMedium:UtmMedium,
            UtmCampaign:UtmCampaign,
            Page:Page,
            LeadSource:leadSource
        });
        $.ajax({
            url: BASEURL + '../light_weight_responsive/health/create-lead-process.php',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data)
            {
				try{ga('healthTrackerObj.send', 'event', 'MobileOnlyLead', 'Health Insurance');}catch(e){}
                console.log(data);
            }
        });
    }
};
fncDisplayHealthDetals = function () {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    if ($(this).val() == '') {
        $(parentId+'.proceedGray').parent('.input_field.pro').show();
        $(parentId+'.step2HealthDetails').slideUp('slow');
		$(parentId+'.leftContent').removeClass('big');
		 $(parentId+'.leftContent').addClass('small');
    } else {
        $(parentId+'.proceedGray').parent('.input_field.pro').hide();
        $(parentId+'.step2HealthDetails').slideDown('slow');
        $(parentId+'#healthName').focus();
		 $(parentId+'.leftContent').removeClass('small');
		 $(parentId+'.leftContent').addClass('big');
    }
};

fncHealthBack = function () {
    $('.step1HealthDetails').show();
    $('#btnSubmitHealth2').show();
    $('.step2HealthDetails').hide();
};

fncSetCountryCode = function () {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    $(parentId+'.countryCode').text('+' + $(this).val());
    $(parentId+'.health-bg .mobNumber').val('');
    if ($(this).val() == 91) {
        $(parentId+'.health-bg .mobNumber').attr({"minlength": "10", "maxlength": "10"});
    } else {
        $(parentId+'.health-bg .mobNumber').attr({"minlength": "8", "maxlength": "15"});
    }
};

fncDisplayMembersForm = function () {
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    //console.log(parentId);
    $('#healthPopup .travel_action .cancel').attr('form-parent',parentId);
    $('#healthPopup').modal({backdrop: 'static', keyboard: false});
    
    arrMember = {};
    $("#healthPopup #healthMoreMembers option").removeAttr('disabled');
    
    preFillPopupHealthMemberForm(parentId);
    //$('.travellerDetails').slideDown('slow').addClass('open');
}

function preFillPopupHealthMemberForm(parentId){
    /*Reset popup form*/
    $('.chkMemberAge').prop('selectedIndex', 0);
    $('.chkMember').attr('checked', false);
    $('.memberadd').removeClass('error');
    $('.err').html('');
    //arrMember = {};
    //End reset popup form
    //Reset html popup
    $("#healthPopup ul#healthMembers li:gt(1)").remove();
    $("#healthPopup ul#healthMembers").attr('data-total-child',0);    
    var strHealthMembers = $(parentId+'#healthMember').val();
    if (strHealthMembers == '' || typeof strHealthMembers == 'undefined'){
        $('.child_btn').show();
        return;
    }
    
    arrMember = {};
    $("#healthPopup #healthMoreMembers option").removeAttr('disabled');
    var arrHealthMembers = strHealthMembers.split(',');
    var objMembers = {};
    var objSons = {};
    var objDauthers = {};
    $.each(arrHealthMembers, function(key, value) {
        var memberAge = value.match(/\((-?\d+)\)/)[1];
        var memberType = value.replace((value.match(/\((-?\d+)\)/)[0]), '');
        if(memberType == 'Son'){
            objSons[key] = memberAge;
            $('#healthPopup .healthAddChild[data-gender="1"]').attr('data-age',memberAge);
            $('#healthPopup .healthAddChild[data-gender="1"]').trigger("click");
        } else if(memberType == 'Daughter'){
            objDauthers[key] = memberAge;
            $('#healthPopup .healthAddChild[data-gender="2"]').attr('data-age',memberAge);
            $('#healthPopup .healthAddChild[data-gender="2"]').trigger("click");
        } else if (memberType == 'Self'){
            $('#healthPopup #healthMembers #healthcheckbox1').prop('checked',true);
            $('.chkMemberAge',($('#healthPopup #healthMembers #healthcheckbox1').parents('.memberadd'))).val(memberAge).trigger("change");
        } else if (memberType == 'Spouse'){
            $('#healthPopup #healthMembers #healthcheckbox2').prop('checked',true);
            $('.chkMemberAge',($('#healthPopup #healthMembers #healthcheckbox2').parents('.memberadd'))).val(memberAge).trigger("change");
        } else {
            objMembers[memberType] = memberAge;            
            $('#healthPopup #healthMoreMembers').attr('data-age',memberAge);
            $('#healthPopup #healthMoreMembers').val(memberType).trigger("change");
            //$('#healthPopup #healthMoreMembers option[value="'+memberType+'"]').trigger("change");
        }
    });
    
    if(!$.isEmptyObject(objSons)){
        objMembers['Son'] = objSons;
    }
    
    if(!$.isEmptyObject(objDauthers)){
        objMembers['Daughter'] = objDauthers;
    }
    
    if(!$.isEmptyObject(objMembers)){
        //$('#healthMembers #healthMembers').();
    }
    //TODO:25082016
    //console.log(objMembers);
}

function disableHealthTitleOption() {
    var strMemberText = $('.health-bg #healthMember').val();
    if (typeof (strMemberText) != 'undefined') {
        var objTitleOption = $('.health-bg #healthGender option[value="3"]');
        objTitleOption.removeAttr('disabled');
        var objTitleSelect = $('.health-bg #healthGender');
        if (strMemberText != '') {
            if (strMemberText.indexOf("Self") != '-1' && strMemberText.indexOf("Spouse") != '-1') {//Selt+Spouse
                objTitleSelect.val('1');
                objTitleOption.attr('disabled', 'disabled');
            } else if (strMemberText.indexOf("Self") != '-1' && (strMemberText.indexOf("Son") != '-1' || strMemberText.indexOf("Daughter") != '-1')) {//Selt+Child
                objTitleSelect.val('1');
                objTitleOption.attr('disabled', 'disabled');
            } else if (strMemberText.indexOf("Spouse") != '-1') {//Spouse
                objTitleSelect.val('1');
                objTitleOption.attr('disabled', 'disabled');
            }
        }
    }
}

fncCombineMember = function () {//Combine member and display in a div like Self(36),Son(40) 
    var parentId = $('#healthPopup .travel_action .cancel').attr('form-parent');
    var objParent = $(this).parents('.memberadd');
    var intAge = $('select.chkMemberAge option:selected', objParent).val();
    if ($(this).attr('class') == 'chkMemberAge') {
        if (intAge != '')
            $('.chkMember', objParent).prop("checked", "checked");
        else
            $('.chkMember', objParent).prop("checked", "");
    }
    var checked = $('.chkMember', objParent).is(":checked");
    var checkBoxValue = $('.chkMember', objParent).val();

    if (checked === false) {
        $('select.chkMemberAge', objParent).prop('selectedIndex', 0);
        if (checkBoxValue == 'Son' || checkBoxValue == 'Daughter') {
            objParent.remove();
            var objDivChild = $('#healthMembers');
            var objTotalCountChild = objDivChild.attr('data-total-child');
            var totalChildCount = parseInt(objTotalCountChild);
            objDivChild.attr('data-total-child', totalChildCount - 1);
            $('.child_btn').show();
        }
        var arrNotMoreMember = ["Self", "Spouse", "Son", "Daughter"];
        if ($.inArray(checkBoxValue, arrNotMoreMember) == -1) {
            objParent.remove();
            $('select#healthMoreMembers option[value="' + checkBoxValue + '"]').attr('disabled', false);
        }
    }


    var strMember = checkBoxValue + '(' + intAge + ')';
    var indexKey = '';
    var joinedMemberText = '';

    if (checked === true && intAge != '') {
        if (typeof objParent.attr('data-index') !== typeof undefined) {
            indexKey = objParent.attr('data-index');
        } else {
            indexKey = $.now();
            objParent.attr('data-index', indexKey);
        }
        arrMember[indexKey] = strMember;
    } else {
        indexKey = objParent.attr('data-index');
        delete arrMember[indexKey];
    }
    joinedMemberText = $.map(arrMember, function (e) {
        return e;
    });
    $(parentId + '#healthMember').val(joinedMemberText);
    disableHealthTitleOption();
};

fncAddChild = function () {//Add Child
    //e.stopImmediatePropagation();
    var gender = $(this).attr('data-gender');
    var childAge = '';
    var selectedChildAge = '';
    if($(this).attr('data-age') !== false && typeof $(this).attr('data-age') != 'undefined'){
        childAge = $(this).attr('data-age');
        $(this).removeAttr('data-age');
    }
    var strGender = (gender == 1 ? 'Son' : 'Daughter');
    var objDivChild = $('#healthMembers');
    var objTotalCountChild = objDivChild.attr('data-total-child');
    var totalChildCount = parseInt(objTotalCountChild);
    if (totalChildCount < maxChild) {
        if (totalChildCount == 3) {
            $('.child_btn').hide();
        } else {
            $('.child_btn').show();
        }
        var tmp = $.now();
        var html = '<li class="memberadd input_field" data-index="' + tmp + '"><div class="select_feild"><input id="checkbox' + tmp + '" type="checkbox" value="' + strGender + '" class="chkMember" checked><label for="checkbox' + tmp + '"><span></span>' + strGender + '</label></div><select class="chkMemberAge"><option value="">Age</option>';
        for (var i = 0; i <= 17; i++) {
            selectedChildAge = (childAge != '' && childAge == i)?'selected':'';
            if(i==0){
                html += '<option value="' + i + '" '+selectedChildAge+'>3 Months - 12 Months</option>';
            } else {
                html += '<option value="' + i + '" '+selectedChildAge+'>' + i + ' Years</option>';
            }
        }
        html += '</select><div class="err"></div></li>';
        //Update Value
        objDivChild.append(html);
        objDivChild.attr('data-total-child', totalChildCount + 1);//Update total count
        //Added anuj 25082016
        if(childAge != '' && typeof childAge != 'undefined'){
            $('#healthPopup #healthMembers .memberadd[data-index="'+tmp+'"] .chkMemberAge').trigger("change")
        }
    } else {
        $('.child_btn').hide();
    }
};

fncAddMoreMember = function () {
    var objSelected = $('select#healthMoreMembers option:selected');
    if (objSelected.val() != '') {
        
        var moreMemberAge = '';
        var selectedMoreMemberAge = '';
        if($(this).attr('data-age') !== false && typeof $(this).attr('data-age') != 'undefined'){
            moreMemberAge = $(this).attr('data-age');
            $(this).removeAttr('data-age');
        }
    
        var objDivChild = $('#healthMembers');
        var tmp = $.now();
        var html = '<li class="memberadd input_field" data-index="' + tmp + '"><div class="select_feild"><input id="checkbox' + tmp + '" type="checkbox" value="' + objSelected.val() + '" class="chkMember" checked><label for="checkbox' + tmp + '"><span></span>' + objSelected.val() + '</label></div><select class="chkMemberAge"><option value="">Age</option>';
        for (var i = 40; i <= 100; i++) {
            selectedMoreMemberAge = (moreMemberAge != '' && moreMemberAge == i)?'selected':'';
            html += '<option value="' + i + '" '+selectedMoreMemberAge+'>' + i + ' Years</option>';
        }
        html += '</select><div class="err"></div></li>';
        //Update Value
        objDivChild.append(html);
        //console.log(objSelected.val());
        objSelected.attr('disabled', true);
        
        //Added anuj 26082016
        if(moreMemberAge != '' && typeof moreMemberAge != 'undefined'){
            $('#healthPopup #healthMembers .memberadd[data-index="'+tmp+'"] .chkMemberAge').trigger("change")
        }
    }
    $('select#healthMoreMembers').val('');
};

fncProcessMembersForm = function () {
    var parentId = $('#healthPopup .travel_action .cancel').attr('form-parent');
    if ($(this).text() == 'Cancel')
    {
        $('.chkMemberAge').prop('selectedIndex', 0);
        $('.chkMember').attr('checked', false);
        $(parentId + '#healthMember').val('');
        $('#healthPopup').modal('toggle');
        $('.memberadd').removeClass('error');
        $('.err').html('');
        arrMember = {};
        $("#healthPopup ul#healthMembers li:gt(1)").remove();
        $("#healthPopup ul#healthMembers").attr('data-total-child',0);
        return;
    }
    var flagError = false;
    $('.chkMember').each(function () {
        var objParent = $(this).parents('.memberadd');
        var checked = $('.chkMember', objParent).is(":checked");
        if (checked === true) {
            var objAgeBox = $('select.chkMemberAge option:selected', objParent);
            var intAge = objAgeBox.val();
            if (intAge < 0 || intAge == '') {
                flagError = true;
                //objParent.addClass('error');
                addError($(this), 'Please select age');
            } else {
                //objParent.removeClass('error');
                clearError($(this));
            }

            //Logic for check parent is selected or not in case of child selected
            var chkChild = $('.chkMember', objParent).val();
            if (chkChild == 'Son' || chkChild == 'Daughter') {
                var selfChecked = $('#healthcheckbox1').is(":checked");
                var spouseChecked = $('#healthcheckbox2').is(":checked");
                if (selfChecked == false && spouseChecked == false) {
                    flagError = true;
                    $('#healthcheckbox1').parents('.memberadd').addClass('error');
                    //addError('select_feild','Please select age');
                } else {
                    //Logic for check child age should 18 Years less from parent min age
                    if (intAge != '') {
                        var selfAge = $('select.chkMemberAge option:selected', $('#healthcheckbox1').parents('.memberadd')).val();
                        var spouseAge = $('select.chkMemberAge option:selected', $('#healthcheckbox2').parents('.memberadd')).val();
                        selfAge = selfAge == '' ? 0 : selfAge;
                        spouseAge = spouseAge == '' ? 0 : spouseAge;

                        if (selfAge <= 0 && spouseAge <= 0) {
                            flagError = true;
                            //$('#healthcheckbox1').parents('.memberadd').addClass('error');
                        } else {
                            var diff = 0;
                            var minAge = 0;
                            var errorParent = '#healthcheckbox1';
                            if (selfAge > 0 && spouseAge > 0 && selfChecked == true && spouseChecked == true) {
                                var arrAgeSelfSpouse = [selfAge, spouseAge];
                                minAge = Math.min.apply(Math, arrAgeSelfSpouse);
                                if (selfAge == minAge && selfChecked == true) {
                                    errorParent = '#healthcheckbox1';
                                } else if (spouseAge == minAge && spouseChecked == true) {
                                    errorParent = '#healthcheckbox2';
                                }
                            } else if (selfAge > 0 && selfChecked == true) {
                                minAge = selfAge;
                                errorParent = '#healthcheckbox1';
                            } else if (spouseAge > 0 && spouseChecked == true) {
                                minAge = spouseAge;
                                errorParent = '#healthcheckbox2';
                            }
                            diff = minAge - intAge;
                            if (diff < 18) {
                                flagError = true;
                                $(errorParent).parents('.memberadd').addClass('error');
                                addError($(errorParent), 'Age should be greater than 18 yrs from child');
                                return false;
                            } else {
                                clearError($(errorParent));
                            }
                        }
                    }
                }
            }else{                
                //***************************************************//
                if ((selfAge > 0 || spouseAge > 0) && (chkChild == 'Father' || chkChild == 'Mother' || chkChild == 'Father-In-Law' || chkChild == 'Mother-In-Law' || chkChild == 'Grand Father' || chkChild == 'Grand Mother')) {
                    var maxAge =0;
                    if (selfAge > 0 && spouseAge > 0 && selfChecked == true && spouseChecked == true) {
                        var arrAgeSelfSpouse = [selfAge, spouseAge];
                        maxAge = Math.max.apply(Math, arrAgeSelfSpouse);
                    } else if (selfAge > 0 && selfChecked == true) {
                        maxAge = selfAge;
                    } else if (spouseAge > 0 && spouseChecked == true) {
                        maxAge = spouseAge;
                    }
                    var validAgeDiff = 0;
                    diff = intAge - maxAge;             
                    if (chkChild == 'Father' || chkChild == 'Mother' || chkChild == 'Father-In-Law' || chkChild == 'Mother-In-Law') {
                        validAgeDiff = 18;
                    } else if (chkChild == 'Grand Father' || chkChild == 'Grand Mother') {
                        validAgeDiff = 40;
                    }
                    if (validAgeDiff > 0 && diff < validAgeDiff) {
                        flagError = true;
                        $('#' + chkChildID).parents('.memberadd').addClass('error');
                        addError($('#' + chkChildID), 'Age should be greater than '+validAgeDiff+' yrs from child');
                        return false;
                    } else {
                        clearError($('#' + chkChildID));
                    }
                }
                //**********************************************//
            }

        } else {
            $('.chkMemberAge', objParent).val('');
            //objParent.removeClass('error');
            clearError($(this));
            $('#healthCityPincode').focus();
        }
    });
    //}
    if (flagError == false) {
        $('#healthPopup').modal('toggle');
        // $('.travellerDetails').slideUp('slow').removeClass('open');
            $(parentId+'#healthCityPincode').focus();
    }
};

fncProcessHealthStep1 = function () {
    try{
        setTimeout(prepareFrame(), 1000);
    }catch(e){}
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBtnSubmit = $(this);
    objBtnSubmit.hide();
    var objString = '';
    var objStringVal = '';
    var flagSubmit = true;
    var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    //Country
    var flagCountryError = true;
    objString = $(parentId+'#healthMobileCountry');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select country');
        flagSubmit = false;
		errorFields += 'country,';
        errorDescriptions += 'Please select country,';
        errorCounts++;
        flagCountryError = false;
    } else {
        clearError(objString);
        flagCountryError = true;
    }
    
    //Mobile
    if (flagCountryError) {
        var objStringCountryCode = $(parentId+'#healthMobileCountry');
        var objString = $(parentId+'.mobNumber');
        var objStringMin = $(parentId+'.mobNumber').attr('minlength');
        var objStringMax = $(parentId+'.mobNumber').attr('maxlength');
        objStringVal = $.trim(objString.val());
        if (objStringVal.length === 0) {
            addError(objString, 'Please enter mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter mobile number,';
            errorCounts++;
        }
        else if (objStringVal.length <objStringMin || objStringVal.length > objStringMax) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        }else if (objStringCountryCode.val() == '91' && !validmobile(objStringVal)) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        } else if (!onlyNumber(objStringVal)) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        } else {
            clearError(objString);
        }
    }

    //Members
    objString = $(parentId+'#healthMember');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select members');
        flagSubmit = false;
		errorFields += 'members,';
        errorDescriptions += 'Please select members,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //City / Pincode
    objString = $(parentId+'#healthCityPincode');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select city');
        flagSubmit = false;
		errorFields += 'city,';
        errorDescriptions += 'Please select city,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Income
    objString = $(parentId+'#healthIncome');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select annual income');
        flagSubmit = false;
		errorFields += 'income,';
        errorDescriptions += 'Please select annual income,';
        errorCounts++;
    } else {
        clearError(objString);
    }
    
    if(flagSubmit){
        fncDisplayHealthDetals();
    }else{
        $(parentId + '#btnHealthStep1').show();
        $(parentId + '.step2HealthDetails').hide();
        $(parentId + '.leftContent').removeClass('big');
        $(parentId + '.leftContent').addClass('small');
		userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
};

fncProcessHealth = function () {
    try{
        setTimeout(prepareFrame(), 1000);
	}catch(e){}
	var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';//anuj
    var objBtnSubmit = $(this);
    var objBtnLoader = $(parentId+'.step2HealthDetails .process');
    objBtnSubmit.hide();
    objBtnLoader.show();
    var objString = '';
    var objStringVal = '';
    var flagSubmit = true;
	var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    //Members
    objString = $(parentId+'#healthMember');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select members');
        flagSubmit = false;
		errorFields += 'members,';
        errorDescriptions += 'Please select members,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //City / Pincode
    objString = $(parentId+'#healthCityPincode');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select city');
        flagSubmit = false;
		errorFields += 'city,';
        errorDescriptions += 'Please select city,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Income
    objString = $(parentId+'#healthIncome');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select annual income');
        flagSubmit = false;
		errorFields += 'income,';
        errorDescriptions += 'Please select annual income,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Gender 
    objString = $(parentId+'#healthGender');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select title');
        flagSubmit = false;
		errorFields += 'gender,';
        errorDescriptions += 'Please select title,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Name
    objString = $(parentId+'#healthName');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter name');
        flagSubmit = false;
		errorFields += 'name,';
        errorDescriptions += 'Please enter name,';
        errorCounts++;
    } else if (!onlycharacter(objStringVal)) {
        addError(objString, 'Please enter character only');
        flagSubmit = false;
		 errorFields += 'name,';
        errorDescriptions += 'Please enter character only,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Email Id
    objString = $(parentId+'#healthEmail');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter email id');
        flagSubmit = false;
		errorFields += 'email,';
        errorDescriptions += 'Please enter email id,';
        errorCounts++;
    } else if (!validemail(objStringVal)) {
        addError(objString, 'Please enter valid email id');
        flagSubmit = false;
		errorFields += 'email,';
        errorDescriptions += 'Please enter valid email id,';
        errorCounts++;
    } else {
        clearError(objString);
    }

    //Country
    var flagCountryError = true;
    objString = $(parentId+'#healthMobileCountry');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please select country');
        flagSubmit = false;
        flagCountryError = false;
		errorFields += 'country,';
        errorDescriptions += 'Please select country,';
        errorCounts++;
    } else {
        clearError(objString);
        flagCountryError = true;
    }

    //Mobile
    if (flagCountryError) {
        var objStringCountryCode = $(parentId+'#healthMobileCountry');
        var objString = $(parentId+'.mobNumber');
		var objStringMin = $(parentId+'.mobNumber').attr('minlength');
        var objStringMax = $(parentId+'.mobNumber').attr('maxlength');                
        objStringVal = $.trim(objString.val());
        if (objStringVal.length === 0) {
            addError(objString, 'Please enter mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter mobile number,';
            errorCounts++;
        } else if (objStringVal.length <objStringMin || objStringVal.length > objStringMax) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        }else if (objStringCountryCode.val() == '91' && !validmobile(objStringVal)) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        } else if (!onlyNumber(objStringVal)) {
            addError(objString, 'Please enter valid mobile number');
            flagSubmit = false;
			errorFields += 'mobile,';
            errorDescriptions += 'Please enter valid mobile number,';
            errorCounts++;
        } else {
            clearError(objString);
        }
    }

    //flagSubmit = false;
    if (flagSubmit) {

        var objCityPin = $(parentId+'#healthCityPincode');
		var isPED = $(parentId + 'input[name="healthIsPED"]:checked').val();
        //Set local storage value for form
        var postdata = JSON.stringify({
            tabName: 'health',
            members: $.trim($(parentId+'#healthMember').val()),
            city_name: $.trim(objCityPin.val()),
            city_id: $.trim(objCityPin.attr('data-cityid')),
            state_id: $.trim(objCityPin.attr('data-stateid')),
            pincode: $.trim(objCityPin.attr('data-pincode')),
            annual_income_id: $.trim($(parentId+'#healthIncome').val()),
            gender: $.trim($(parentId+'#healthGender').val()),
            name: $.trim($(parentId+'#healthName').val()),
            emailid: $.trim($(parentId+'#healthEmail').val()),
            mobile: $.trim($(parentId+'.health-bg .mobNumber').val()),
            country: $.trim($(parentId+'#healthMobileCountry').val()),
            IsPED: isPED
        });
        try {
            localStorage.setItem("getLastTab", postdata);
        } catch (e) {
        }
        //End
		var leadsource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            leadsource = 'PBMobile';
        }
        var postdata = JSON.stringify({
            visitid: (visitId == 0 ? $('#gaData').attr('data-visit') : visitId),
            utm_term: utmTerm,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            browser: getBrowser(),
            exit_point_url: window.location.href,
            request_url: window.location.href,
            members: $.trim($(parentId+'#healthMember').val()),
            city_id: $.trim(objCityPin.attr('data-cityid')),
            state_id: $.trim(objCityPin.attr('data-stateid')),
            pincode: $.trim(objCityPin.attr('data-pincode')),
            annual_income_id: $.trim($(parentId+'#healthIncome').val()),
            gender: $.trim($(parentId+'#healthGender').val()),
            name: $.trim($(parentId+'#healthName').val()),
            emailid: $.trim($(parentId+'#healthEmail').val()),
            country_id: $.trim($('option:selected', parentId+'#healthMobileCountry').attr('data-country-code-id')),
            mobile_number: $.trim($(parentId+'.mobNumber').val()),
            leadsource:leadsource,
            IsPED: isPED,
            GAClientID: getGACId('UA-4743078-8')
        });
        //console.log(postdata);
        $.ajax({
            url: BASEURL + 'cj-process.php?type=health',
            type: "POST",
            cache: false,
            data: postdata,
            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            success: function (data)
            {
                var data = JSON.parse(data);
                var EnquiryId = $.trim(data.EnquiryID);
                var CustId = $.trim(data.CustomerID);
                var MatrixLeadId = $.trim(data.MatrixLeadID);
				if (EnquiryId != '') {
					try { 
                        var formName = ($.trim(parentId) == '#bottomForm') ? 'Form-2' : 'Form-1';
                        ga('healthTrackerObj.send', 'event', 'PreQuotes-Submit', formName,window.location.href);
						
						ga('healthTrackerObj.set', 'dimension3', EnquiryId);
                        ga('healthTrackerObj.set', 'dimension2', CustId);
                        ga('healthTrackerObj.set', 'dimension1', MatrixLeadId);
                        ga('pbTrackerObj.send', 'event', 'Lead', 'Health Insurance', MatrixLeadId);
                        ga('healthTrackerObj.send', 'event', 'Lead', 'Health Insurance', MatrixLeadId);
                    } catch (e) {
                    }
					GA360FormSubmit('formSubmitSuccess');
					GA360(MatrixLeadId,EnquiryId,CustId,'','fresh');//leadId,enquiryId,customerId,bookingId,policyType
                    //window.location.href = 'http://healthqa.policybazaar.com/?enquiryid=' + data + '&lifestyle=' + data;//QA
                    if(isPED==1){
					window.location.href = 'https://health.policybazaar.com/illness?enquiryid='+encodeURIComponent(Base64.encode(EnquiryId))+'&lifestyle='+encodeURIComponent(Base64.encode(EnquiryId))+'&iscom=1';//Live
					}else{
                        window.top.location.href = 'https://health.policybazaar.com/quotes?enquiryid=' + encodeURIComponent(Base64.encode(EnquiryId))+'&iscom=1';//+ '&lifestyle=' + data;//QA
                    }
                }else{
                        GA360FormSubmit('formSubmitFailed');
                }
                objBtnLoader.hide();
                objBtnSubmit.show();
                //data: return data from server
            }
        });
    } else {
        objBtnLoader.hide();
        objBtnSubmit.show();
		userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
};
//Health cj end

/*
 * Investment Cj Start*
 */
fncInvTab = function () {
    var selectedTab = $(this).children('input[type=radio]').val();
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    clearError($('#invamount'));
    clearError($('.birthDay'));
    clearError($('#invage'));
    clearError($('.invTerm'));
    $(parentId+'#investmentType').val(selectedTab);
    switch (selectedTab)
    {
        case '1':
            $(parentId+'#invAge').addClass('dis_none');
            $(parentId+'.invest-amount').addClass('dis_none');
            $(parentId+'#invTermSelect').removeClass('dis_none');
            //$(parentId+'#invLabel').html('<span class="b">Invest</span><span> (Per Year)</span>');
            $(parentId+'#birthDay').attr('data-min', 18);
            $(parentId+'#invamount').attr('data-min', 833);
            $(parentId+'#invamount').attr('data-max', 4166667);
            $(parentId+'#invamount').attr('data-msg', 'Amount should be between ');
            //$(parentId+'#invamount').attr('placeholder', 'To grow your money');
            $(parentId+'#invamount').val(5000);
            $(parentId+'#invamount').trigger('keyup');
            $(parentId+'#birthDay').val('');
            //$('.fig_lbl').html('').addClass('none');
            $(parentId+".input_field:first").addClass('growth_f');
            $(parentId+".nextBox_first").removeClass('mr35');
            //$(parentId+'.invlblhead').html('<strong>Growth </strong> Plans');
            //$(parentId+'.invlblsubhead').html('Get the Best investment options to maximize your wealth.');
            //$(parentId+'.info_list').html('<li>Avail tax benefits on your investments.</li><li>Get the dual advantage of return on investment & protection.</li><li>1500+ advisors to help you compare & buy.</li><li>365 days customer support</li>');
            $(parentId+'#invneedgrowthamt').val('');
            $(parentId+'.need-amount').html('');            
            break;
        case '2':
            $(parentId+'#invAge').removeClass('dis_none');
            $(parentId+'.invest-amount').removeClass('dis_none');
            $(parentId+'#invTermSelect').addClass('dis_none');
            //$(parentId+'#invDobAge').html('<span class="b">Age</span> <span>(Retirement)</span>');
            $(parentId+'#invage').val(65);
            //$(parentId+'#invage').attr('placeholder','Retirement age');
            //$(parentId+'#invLabel').html('<span class="b">Income</span><span>(Per Month)</span>');
            $(parentId+'#birthDay').attr('data-min', 20);
            $(parentId+'#invamount').attr('data-min', 10000);
            $(parentId+'#invamount').attr('data-max', 500000);
            $(parentId+'#invamount').attr('data-msg', 'Min Income should be ');
            //$(parentId+'#invamount').attr('placeholder', 'Per Month');
            $(parentId+'#invamount').val(50000);
            $(parentId+'#invamount').trigger('keyup');
            $(parentId+'#birthDay').val('');
            //$('.fig_lbl').html('').addClass('none');
            $(parentId+".input_field:first").removeClass('growth_f');
            //$(parentId+'.invlblhead').html('<strong>Retirement </strong> Plans');
            //$(parentId+'.invlblsubhead').html('Compare best pension plans from top brands and secure a happy retired life!');
            //$(parentId+'.info_list').html('<li>Invest in market linked plans to maximize your retirement corpus.</li><li>Avail tax benefits on your investments.</li><li>1500+ advisors to help you compare & buy.</li><li>365 days customer support</li>');
            $(parentId+'#invneedgrowthamt').val('');
            $(parentId+'.need-amount').html('');
            break;
        case '3':
            $(parentId+'#invAge').removeClass('dis_none');
            $(parentId+'.invest-amount').addClass('dis_none');
            $(parentId+'#invTermSelect').addClass('dis_none');
            $(parentId+'#invage').val('');
            //$(parentId+'#invage').attr('placeholder','Child age');
            //$(parentId+'#invDobAge').html('<span class="b">Age</span> <span>(Child)</span>');
            //$(parentId+'#invLabel').html('<span class="b">Amount</span><span> (Invested)</span>');
            $(parentId+'#birthDay').attr('data-min', 18);
            $(parentId+'#invamount').attr('data-min', 833);
            $(parentId+'#invamount').attr('data-max', 41667);
            $(parentId+'#invamount').attr('data-msg', 'Amount should be between ');
            //$(parentId+'#invamount').attr('placeholder', 'Per Month');
            $(parentId+'#invamount').val('5000');
            $(parentId+'#invamount').trigger('keyup');
            $(parentId+'#birthDay').val('');
            //$('.fig_lbl').html('').addClass('none');
            $(parentId+".input_field:first").removeClass('growth_f');
            //$(parentId+'.invlblhead').html('<strong>Child </strong> Plans');
            //$(parentId+'.invlblsubhead').html('Get instant quotes from 15+ insurers and secure your child’s future.');
            //$(parentId+'.info_list').html('<li>Compare & choose your plan to achieve the desired corpus for your child.</li><li>Avail tax benefits on your investments.</li><li>1500+ advisors to help you compare & buy.</li><li>365 days customer support</li>');
            $(parentId+'#invneedgrowthamt').val('');
            $(parentId+'.need-amount').html('');
            break;
		case '4':
            $(parentId+'#invPension').removeClass('dis_none');
            //$(parentId+'.invest-amount').removeClass('dis_none');
            $(parentId+'#invTermSelect').addClass('dis_none');
            $(parentId+'#birthDay').attr('data-min', 30);
            $(parentId+'#invamount').attr('data-min', 150000);
            $(parentId+'#invamount').attr('data-max', 50000000);
            $(parentId+'#invamount').attr('data-msg', 'Min Income should be ');
            $(parentId+'#invamount').val('');
            $(parentId+'#invamount').trigger('keyup');
            $(parentId+'#birthDay').val('');
            $(parentId+".input_field:first").removeClass('growth_f');
            $(parentId+'#invneedgrowthamt').val('');
            $(parentId+'.need-amount').html('');
            $(parentId+'#invLabel span:last').html('');
            break;	
    }
}
fncInvProceed = function (parentId) {
    var selectedTab = $(parentId+'#investmentType').val();
    if (selectedTab != '')
    {
        switch (selectedTab)
        {
            case "1":
                if ($(parentId+'#invamount').val() == '')
                {
                    addError($(parentId+'#invamount'), 'Investment amount should be between ' + convert_number($(parentId+'#invamount').attr('data-min')) + ' and ' + convert_number($(parentId+'#invamount').attr('data-max')));
                }
                else {
                    $(parentId+'#invamount').trigger('keyup');
                }
                if ($(parentId+'.birthDay').val() == '')
                {
                    addError($(parentId+'.birthDay'), 'Enter your age');
                }
                else
                {
                    $(parentId+'.birthDay').trigger('keyup');
                }
                if (parseInt($('input[name=invTerm]:checked', parentId+'.investment-bg').val()) == '')
                {
                    addError($(parentId+'.invTerm'), 'Please select a pay term.');
                }
                else
                {
                    clearError($(parentId+'.invTerm'));
                }
                break;
            case "2":
                if ($(parentId+'#invamount').val() == '')
                {
                    addError($(parentId+'#invamount'), 'Pension amount should be between ' + convert_number($(parentId+'#invamount').attr('data-min')) + ' and ' + convert_number($(parentId+'#invamount').attr('data-max')));
                }
                else
                {
                    $(parentId+'#invamount').trigger('keyup');
                }
                if ($(parentId+'.birthDay').val() == '')
                {
                    addError($(parentId+'.birthDay'), 'Enter your age');
                }
                else
                {
                    $(parentId+'.birthDay').trigger('keyup');
                }
                if ($(parentId+'#invage').val() == '')
                {
                    addError($(parentId+'#invage'), 'Enter retirement age');
                }
                else
                {
                    $(parentId+'#invage').trigger('keyup');
                }
                break;
            case "3":
                if ($(parentId+'#invamount').val() == '')
                {
                    addError($(parentId+'#invamount'), 'Amount you need for your child should be between ' + ($(parentId+'#invamount').attr('data-min')) + ' and ' + ($(parentId+'#invamount').attr('data-max')));
                }
                else
                {
                    $(parentId+'#invamount').trigger('keyup');
                }
                if ($(parentId+'.birthDay').val() == '')
                {
                    addError($(parentId+'.birthDay'), 'Enter your age');
                }
                else
                {
                    $(parentId+'.birthDay').trigger('keyup');
                }
                if ($(parentId+'#invage').val() == '')
                {
                    addError($(parentId+'#invage'), 'Enter child\'s age');
                }
                else
                {
                    $(parentId+'#invage').trigger('keyup');
                }
                break;
			case "4":
                if ($(parentId+'#invPensionPermonth').val() == '')
                {
                    addError($(parentId+'#invPensionPermonth'), 'Enter pension amount');
                }
                else
                {
                     clearError($(parentId+'#invPensionPermonth'));
                }
                break;	
        }
        //ageValidation($('#invage'))
        //if ($('.err').text() == '')
        //    proceed(selectedTab);
    }
    else
    {
        alert('Please select option first.');
    }
}

function validationInvCity() {
    var objString, objStringVal, flagSubmit = true;
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objStringCountryCode = $(parentId+'#invCountry');
    if (objStringCountryCode.val() == '392') {
        objString = $(parentId+'#invCity');
        objStringVal = $.trim(objString.val());
        if (objStringVal.length === 0) {
            addError(objString, 'Please select city');
            flagSubmit = false;
        } else {
            clearError(objString);
        }
    }
    return flagSubmit;
}
function setInvCountryCode() {
    var selID = $(this).val();
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    $.each(InvCountryJson, function (i, o) {
        if (o.CountryCodeId == selID)
        {
            if (o.CountryCodeId == 392)
            {
                $(parentId+'#invCity').show().removeClass('dis_none');
                $(parentId+'#invCountry').addClass('select30_per');
                $(parentId+'.investment-bg .lblCity').html('City');
                $(parentId+'#invmobile').val('');
            } else {
                $(parentId+'#invCity').hide().addClass('dis_none');
                $(parentId+'#invCountry').removeClass('select30_per');
                $(parentId+'.investment-bg .lblCity').html('Country');
                $(parentId+'#invmobile').val('');
            }
            $(parentId+'#invcountryCode').val(o.CountryCode)
            if (o.CountryCodeId == 999)
            {
                $(parentId+'#invcountryCode').show().removeClass('dis_none');
                $(parentId+'.countryCode span').hide();
            }
            else
            {
                $(parentId+'#invcountryCode').addClass('dis_none');
                $(parentId+'.countryCode span').show().html('+' + o.CountryCode);
            }
            $(parentId+'#invmobile').attr('maxlength', o.MAX);
            $(parentId+'#invmobile').attr('minlength', o.MIN);
            return;
        }
    });
}
fncInvEmail = function () {
    if ($(this).val() != '' && !validemail($(this).val())) {
        addError($(this), 'Please enter valid email id');
    }
    else {
        clearError($(this));
    }
}
fncInvText = function () {
    if ($.trim($(this).val()) == '') {
        addError($(this), $(this).attr('data-msg'));
    }
    else if ($(this).val() != '' && !onlycharacter($(this).val())) {
        addError($(this), $(this).attr('data-msg'));
    }
    else {
        clearError($(this));
    }
}

fncInvMobile = function () {
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objStringCountryCode = $(parentId+'#invcountryCode');
    if ($(this).val() != '' && objStringCountryCode.val() == '91' && !validmobile($(this).val())) {
        addError($(this), '<span class="right">Please enter valid mobile number</span>');
    } else if ($(this).val() != '' && !onlyNumber($(this).val())) {
        addError($(this), '<span class="right">Please enter valid mobile number</span>');
    } else {
        clearError($(this));
    }
}

fncTravelMobile = function () {
    if ($(this).val() != '' && !validmobile($(this).val())) {
        addError($(this), 'Please enter valid mobile number');
    } else if ($(this).val() != '' && !onlyNumber($(this).val())) {
        addError($(this), 'Please enter valid mobile number');
    } else {
        clearError($(this));
    }
}

function validateInvContactForm() {

    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    fncInvProceed(parentId)
    //dobValidation($('#birthDay'));
    //ageValidation($('#invage'));
    if($.trim($(parentId+'#invname').val()) == '')
    {
        addError($(parentId+'#invname'), $('#invname').attr('data-msg'));
    }else if ($(parentId+'#invname').val() != '' && !onlycharacter($(parentId+'#invname').val())) {
        addError($(parentId+'#invname'), $('#invname').attr('data-msg'));
    }
    else {
        clearError($(parentId+'#invname'));
    }
    objString = $(parentId+'#invemail');
    if (objString.val() == '')
    {
        addError(objString, objString.attr('data-msg'));
    } else if (!validemail(objString.val())) {
        addError(objString, 'Please enter valid email id');
    }
    else {
        clearError($(parentId+'#invemail'));
    }

    objCityString = $(parentId+'#invCountry');
    if ($.trim($('option:selected', parentId+'#invCountry').val()) == 392 && $(parentId+'#invCity').val() == '') {
        addError(objCityString, 'Please select city');
    } else {
        clearError(objCityString);
    }

    //Mobile    
    var objStringCountryCode = $(parentId+'#invcountryCode');
    var objString = $(parentId+'#invmobile');
    objStringVal = $.trim(objString.val());
    if ($.trim($('option:selected', parentId+'#invCountry').val()) == 999 && objStringCountryCode.val() == '') {
        addError(objStringCountryCode, '<span class="left">Enter country code</span><span class="right">Please enter mobile number</span>');
    }
    else if (objStringVal.length === 0) {
        addError(objString, '<span class="right">Please enter mobile number</span>');
    } else if (objStringCountryCode.val() == '91' && !validmobile(objStringVal)) {
        addError(objString, '<span class="right">Please enter valid mobile number</span>');
    } else if (!onlyNumber(objStringVal)) {
        addError(objString, '<span class="right">Please enter valid mobile number</span>');
    } else {
        clearError(objString);
    }



    if ($(parentId+'.err').text() == '')
        proceed2(parentId);
}
function proceed2(parentId)
{
    var objBtnSubmit = $(this);
    objBtnSubmit.hide();
    var selectedTab = $(parentId+'#investmentType').val();
    
    var formURL = BASEURL + 'callservice.php';
    // Give the URL parameters variable names
    var source = utmSource;
    var medium = utmMedium;
    var campaign = utmCampaign;
    var term = utmTerm;
    //var visitId = (visitId == '' || visitId == 'undefined')?'':visitId;
    var visitId = $('#gaData').attr('data-visit');
	var valAnnualIncome = $(parentId + 'input[name="invAnnualIncome"]:checked').val();
	var leadsource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var leadsource = 'PBMobile';
        }
    var postData = {
        'task': 'investmentquote',
        'investmenttype': selectedTab,
        'amt': $(parentId+'#invamount').val(),
        'age': $(parentId+'#invage').val(),
        'dob': $(parentId+'.birthDay').val(),
        'term': parseInt($('input[name=invTerm]:checked', parentId+'.investment-bg').val()),
        'utmsource': source,
        'utmmedium': medium,
        'utmcampaign': campaign,
        'utmterm': term,
        'invneedgrowthamt': $(parentId+'#invneedgrowthamt').val(),
        'visitId': visitId,
        'customername': $(parentId+'#invname').val(),
        'genderid': $(parentId+'#invgender').val(),
        'email': $(parentId+'#invemail').val(),
        'mobileno': $(parentId+'#invmobile').val(),
        'cityid': $(parentId+'#invCity').attr('data-cityid'),
        'stateid': $(parentId+'#invCity').attr('data-stateid'),
        'countryid': $(parentId+'#invCountry').find(":selected").val(),
		'annualIncome':valAnnualIncome,
        'leadsource': leadsource,
		'gaClientId': getGACId('UA-4743078-10'),
		'gclid' :getGCLId()
    };
    $.ajax({
        url: formURL,
        type: "POST",
        data: postData,
        cache: false,
        beforeSend: function () {
            $(parentId+'.invproceed2').hide();
            $(parentId+'.process').show();
        },
        success: function (data, textStatus, jqXHR)
        {
            //Set local storage value for form
            var postdata = JSON.stringify({
                tabName: 'investment',
                subTabName: selectedTab,
                coverAmt: $(parentId+'#invamount').val().replace(/,/g, ''),
                age: $(parentId+'.birthDay').val(),
                ageOther: $(parentId+'#invage').val(),
                optTerm: parseInt($('input[name=invTerm]:checked', parentId+'.investment-bg').val()),
                country: $(parentId+'#invCountry').val(),
                countryCode: $(parentId+'#invcountryCode').val(),
                city_name: $(parentId+'#invCity').val(),
                city_id: $(parentId+'#invCity').attr('data-cityid'),
                state_id: $(parentId+'#invCity').attr('data-stateid'),
                gender: $(parentId+'#invgender').val(),
                name: $(parentId+'#invname').val(),
                email: $(parentId+'#invemail').val(),
                mobile: $(parentId+'#invmobile').val(),
                annualIncome:valAnnualIncome,
                annuityPension:$(parentId+'#invPensionPermonth').val()
            });
            try {
                localStorage.setItem("getLastTab", postdata);
            } catch (e) {
            }
            //End
            if (data !== false && data != 'name lookup timed out')// typeof data =='object'
            {
                try {
                    var data = JSON.parse(data);
                    var EnquiryId = $.trim(data.EnquiryId);
                    var CustId = $.trim(data.CustId);
                    var MatrixLeadId = $.trim(data.MatrixLeadId);
                    var leadcreated = 'false';
                    if(data.IsMatrixLeadCreated !== undefined && data.IsMatrixLeadCreated == true)	
                            leadcreated = 'true';
                    var leadObj = {};
                    if ($(parentId+'.birthDay').val() !== undefined && $(parentId+'.birthDay').val() !== null) {
                        leadObj.age = $(parentId+'.birthDay').val();
                    }
                    if ($(parentId+'#invgender').val() !== undefined && $(parentId+'#invgender').val() !== null) {
                        leadObj.gender = $(parentId+'#invgender').val() == 1 ? 'Male' : 'Female';
                        leadObj.city = $(parentId+'#invCity').val();
                    }
                    //GA Event
                    //ga('invTrackerObj.set', 'dimension1', MatrixLeadId);
                    //ga('invTrackerObj.send', 'event', 'Lead', 'Investment Insurance', MatrixLeadId);
                    //
					GA360(MatrixLeadId,EnquiryId,CustId,'','fresh');//leadId,enquiryId,customerId,bookingId,policyType
                    setTimeout(function () {
                        var redirectUrl = (utmContent == '' || utmContent == 'undefined') ? '' : '&utm_content=' + utmContent;
                        //window.location.href = 'http://uatinvestment.policybazaar.com/#/customer?enquiryId=' + encodeURIComponent(Base64.encode(data)) +'&home=true'+ redirectUrl;//QA
                        //window.location.href = 'http://awsinvestmentlife.policybazaar.com/#/customer?enquiryId=' + encodeURIComponent(Base64.encode(data));//Live
                        //window.location.href = 'http://qainvestment.policybazaar.com/#/quote?enquiryId=' + encodeURIComponent(Base64.encode(EnquiryId)) + '&leadId=' + encodeURIComponent(Base64.encode(MatrixLeadId)) + '&home=true' + redirectUrl;//QA Quote
                        window.location.href = 'https://investmentlife.policybazaar.com/#/quote?enquiryId=' + encodeURIComponent(Base64.encode(EnquiryId))+'&leadId='+encodeURIComponent(Base64.encode(MatrixLeadId))+'&IsMatrixLeadCreated='+leadcreated+'&home=true'+ redirectUrl+'&iscom=1';//Live Quote
                        objBtnSubmit.show();
                    }, 3000);
                } catch (e) {
                    $(parentId+'.invproceed2').show();
                    $(parentId+'.process').hide();
                }
            } else {
                $(parentId+'.invproceed2').show();
                $(parentId+'.process').hide();
                objBtnSubmit.show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            //console.log('ok' + textStatus);
            objBtnSubmit.show();
        }
    });
    return false;
}

GetPensionFromPurchasePower = function (annuityFactors, purchasePrice, frequency) {
            var frequencyFactor = frequency == 1 ? 1 : 12;
            var pension = 0.0;
            var hppItem = getAnnuityHttpValue(purchasePrice);
            var x = frequency == 1 ? annuityFactors.YearlyRate : annuityFactors.MonthlyRate;
            var y = x * 0.01;
            y = Math.floor(y * 100) / 100;
            var z = frequency == 1 ? hppItem.Yearly : hppItem.Monthly;
            var rate = x + y + z;
            var pension = ((rate / 1000) * purchasePrice) / frequencyFactor;
            return Math.round(pension);
};

GetPurchasePriceFromPension = function (annuityFactors, pension, frequency) {
            var purchasePrice = undefined;
            var objPurchasePrice = {};
            objPurchasePrice.BandID = -1;
            objPurchasePrice.PurchasePrice = purchasePrice;
            var objTemp = getTempPurchsePrice(annuityFactors, pension, frequency, objPurchasePrice);
            var objCorrect = getTempPurchsePrice(annuityFactors, pension, frequency, objTemp);
            var bandID = objCorrect.BandID;
            purchasePrice = Math.round(objCorrect.PurchasePrice);
            return purchasePrice;
        };

function getTempPurchsePrice(annuityFactors, pension, frequency, objPurchasePrice) {
            var bandID = objPurchasePrice.BandID;
            var purchasePrice = objPurchasePrice.PurchasePrice || undefined;
            var frequencyFactor = frequency == 1 ? 1 : 12;
            var hppItem = getAnnuityHttpValue(purchasePrice);
            if (bandID == hppItem.id) {
                return objPurchasePrice;
            }
            var x = frequency == 1 ? annuityFactors.YearlyRate : annuityFactors.MonthlyRate;
            var y = x * 0.01;
            y = Math.floor(y * 100) / 100;
            var z = frequency == 1 ? hppItem.Yearly : hppItem.Monthly;
            var rate = x + y + z;
            purchasePrice = (pension * frequencyFactor) / ((rate / 1000));
            objPurchasePrice.BandID = hppItem.id;
            objPurchasePrice.PurchasePrice = purchasePrice;
            return objPurchasePrice;
}
function getAnnuityHttpValue(purchasePrice) {
            var objHPP = {};
            var id = 1;
            if (purchasePrice == undefined || purchasePrice == null) {
                id = 0;
            }
            else if (purchasePrice >= 150000 && purchasePrice <= 249999) {
                id = 0;
            }
            else if (purchasePrice >= 250000 && purchasePrice <= 499999) {
                id = 1;
            }
            else if (purchasePrice >= 500000 && purchasePrice <= 799999) {
                id = 2;
            }
            else if (purchasePrice >= 800000 && purchasePrice <= 999999) {
                id = 3;
            }
            else if (purchasePrice >= 1000000) {
                id = 4;
            }
            var hppList = [{ "id": 0, "Yearly": 0, "Monthly": 0 }, { "id": 1, "Yearly": 3.75, "Monthly": 2.9 }, { "id": 2, "Yearly": 4, "Monthly": 3.5 }, { "id": 3, "Yearly": 4.3, "Monthly": 3.8 }, { "id": 4, "Yearly": 4.35, "Monthly": 3.9 }];
            $.each(hppList, function (key,value) {
                if (value.id == id) {
                    objHPP = value;
                    return objHPP;
                }
            });
            return objHPP;
}

SetPensionFromPurchasePower = function(){
    parentId = $(this).parents('.disForm').parent().attr('id');
    parentId = '#' + parentId + ' ';
    var annuityAge = $(parentId+'.investment-bg .birthDay').val();
    var pensionAmt = $(this).val();
    
    //$(parentId+'#invamount').trigger('keyup');
    if((pensionAmt !='' && !isNaN(pensionAmt)) && annuityAge !='' && $(parentId+'.investment-bg .err').text() == '')
    {
       GetLicAnnuityFactor(parentId,annuityAge,'',pensionAmt);         
    }
}

fncAnnuityAmountAndLable = function (parentId) {
    var obj = $(parentId+'#invamount');
    var parentDiv = obj.parents('.input_field');
    var minAmt = parseInt(obj.attr('data-min'));
    var maxAmt = parseInt(obj.attr('data-max'));
    var errMsg = obj.attr('data-msg');
    var amt = amt1 = obj.val().replace(/,/g, '');

    amt = parseInt(amt);
    if (!checkOnlyNumber(amt)) {
        obj.val('');
        $('.fig_lbl', parentDiv).addClass('none');
        return false;
    }
    else if (obj.length > 0 && amt >= minAmt && amt <= maxAmt) {
        fnFormatCurrencyIndianStyle(obj, 20);
        $('.fig_lbl', parentDiv).html(convert_number2(amt)).removeClass('none');
        obj.removeClass('error');
        parentDiv.removeClass('error');
        $('.err', parentDiv).html('');
    } else {
        obj.addClass('error');
        parentDiv.addClass('error');
        $('.fig_lbl', parentDiv).addClass('none');
        $('.err', parentDiv).html(errMsg + ' ' + convert_number2(minAmt) + ' to ' + convert_number2(maxAmt));
    }    
};
fncInvNeed = function (parentId) {
    invNeedLbl = 0;
    //if(fncInvDigitOnly(e))
    //{
    if ($.type(parentId) == 'object') {       
        parentId = $(this).parents('.disForm').parent().attr('id');
        parentId = '#' + parentId + ' ';
    }
    
    
    //if(parentId != undefined)
    //{
    
    //alert(parentId);
    var selectedTab = $(parentId+'.investment-bg #investmentType').val();
    var obj = $(parentId+'.investment-bg #invamount').val();
    var amt = parseInt(obj.replace(/,/g, ''));
    var age = $(parentId+'.investment-bg .birthDay').val();
    var payTerm = 0;
    switch (selectedTab)
    {
        case "1":
            invTerm = parseInt($('input[name=invTerm]:checked', parentId+'.investment-bg').val());
            if (invTerm !== '' && !isNaN(invTerm))
                clearError($('.investment-bg .invTerm'));
            invNeed = 'You will get <span>0</span> after years';
            if (amt != '' && age != '' && invTerm != '' && ($('.investment-bg #inverr').text() == '' && $('.investment-bg #invdoberr').text() == '' && $('.investment-bg #invtermerr').text() == '') && (!isNaN(invTerm))) {
                //payTerm = parseInt($('.investment-bg #invTerm').find(":selected").val());
                invNeedLbl = GetGrowthCalc(amt*12, invTerm);
                invNeed = 'You will get <span>' + convert_number2(invNeedLbl) + '</span> after ' + invTerm + ' years';
            }
            break;
        case "2":
            var retAge = $('#invage').val();
            invNeed = 'for which you need to invest <span>0</span> per month';
            invNeed1 = 'You will need a monthly pension of <span>0</span>';
            if (amt != '' && age != '' && retAge != '' && $('#inverr').text() == '' && $('#invageerr').text()=='' && ($('#invdoberr').text() == '' && $('#invage').text() == '')) {
                retAge = parseInt(retAge);
                var diffAge = retAge - age;
                payTerm = (diffAge <= 30) ? diffAge : 30;
                invPensionAmt = GetPensionAmount(amt,payTerm);
                invNeedLbl = GetRetirementCalc(invPensionAmt, retAge, payTerm);
                
                invNeed1 = 'You will need a monthly pension of <span>' + convert_number2(invPensionAmt) + '</span>';
                if(invNeedLbl>0)
                invNeed = 'for which you need to invest <span>' + convert_number2(invNeedLbl) + '</span> per month';                
            }
            $(parentId+'.investment-bg .invest-amount').html(invNeed1);
            break;
        case "3":
            var childTerm = 0;
            var childAge = $(parentId+'.investment-bg #invage').val();
            invNeed = 'Your child is likely to receive <span>0</span>';
            if (amt != '' && age != '' && childAge != '' && ($(parentId+'.investment-bg #inverr').text() == '' && $(parentId+'.investment-bg #invdoberr').text() == '' && $(parentId+'.investment-bg #invage').text() == '')) {
                childAge = parseInt(childAge);
                /*if (childAge >= 0 && childAge < 9)
                    childTerm = 20;
                if (childAge >= 9 && childAge < 14) {
                    childTerm = 15;
                }
                if (childAge >= 14) {
                    childTerm = 10;
                }*/
                if (childAge >= 0 && childAge <= 5)
                    childTerm = 15;
                if (childAge > 5 && childAge <= 17)
                    childTerm = 10;
                //payTerm = childTerm<10?10:childTerm<15 && childTerm>10?15:childTerm>15?20:20;
                //invNeedLbl = compoundInterest(amt, childTerm);
                invNeedLbl = GetGrowthCalc(amt*12, childTerm);
                invNeed = 'Your child is likely to receive <span>' + convert_number2(invNeedLbl) + '</span>';
            }
            break;
		case "4":
            var annuityAge = $(parentId+'.investment-bg .birthDay').val();
            if((amt !='' && !isNaN(amt)) && annuityAge !='')// && $(parentId+'.investment-bg .err').text() == ''
            {
               GetLicAnnuityFactor(parentId,annuityAge,amt,false);
            }   
            invNeed = '';
            invNeed1 = '';            
            break;	
    }
    $(parentId+'.investment-bg #invneedgrowthamt').val(invNeedLbl);
    $(parentId+'.investment-bg .need-amount').html(invNeed);
	var invTerm = parseInt($('input[name=invTerm]:checked', parentId+'.investment-bg').val());            
    if ($(parentId+'.investment-bg #invamount').val() != '' && $(parentId+'.investment-bg #birthDay').val() != '' && ($(parentId+'.investment-bg .err').text() == ''))
    {
        var blnShow = false;
        switch (selectedTab)
        {
            case "1":
                if(invTerm !== '' && !isNaN(invTerm))
                    blnShow = true;
                break;
            case "2":case "3":
                if($(parentId+'.investment-bg #invage').val() != '')
                    blnShow = true;
                break;
            case "4":
                if($(parentId+'#invPensionPermonth').val() !== '' && !isNaN($(parentId+'#invPensionPermonth').val()))
                    blnShow = true;
                break;
        }
        if(blnShow){
        $(parentId+'.investment-bg .proceedGray').parent('.input_field.pro').hide();
        $(parentId+'.investment-bg .invest_step_2').slideDown('slow');
        //$(parentId+'.investment-bg #invname').focus();
		$(parentId+'.leftContent').removeClass('small');
		 $(parentId+'.leftContent').addClass('big');
        }
    }
    else
    {
        //$('.nextBox_sec').addClass('dis_none');
    }
    //}
    //}    
};

fncInvDigitOnly = function (e) {
    /*if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
     //display error message
     //$("#inverr").html("Digits Only").show().fadeOut("slow");
     return false;
     }else return true;*/
    var tmpVal = $(this).val();
    if (!onlyNumber(tmpVal.replace(/,/g, ""))) {
        $(this).val('');
        return false;
    }
    return true;
};
var GetLicAnnuityFactor = function(parentId,annuityAge,amt,getPensionAmt){
    var AnnuityData = '';
    var postData = {
        'task': 'investmentannuityfactor',
        'age': annuityAge
    };
    $.ajax({url: BASEURL + 'callservice.php', type: "POST", data: postData, dataType: "json", success: function (dataAF) {
            if (!dataAF.HasError) {
                        var annuityFactors = {};
                        var lstFactor = dataAF.ReturnValue;
                        for (index = 0; index < lstFactor.length; ++index) {
                          if(lstFactor[index].Option=='A'){
                            annuityFactors = lstFactor[index];                                                        
                            }
                        }
                        if(getPensionAmt==false){
                            var pensionAmt = GetPensionFromPurchasePower(annuityFactors, amt, 12);
                            if (pensionAmt == undefined || pensionAmt == null || pensionAmt <= 0) { pensionAmt = ''; }
                            $(parentId+'.investment-bg #invPensionPermonth').val(pensionAmt);
                            if(pensionAmt !=''){
                                 $(parentId+'.investment-bg .proceedGray').parent('.input_field.pro').hide();
                                 $(parentId+'.investment-bg .invest_step_2').slideDown('slow');
                            }
                        }else {
                            var invst = GetPurchasePriceFromPension(annuityFactors, getPensionAmt, 12);
                        if (invst == undefined || invst == null || invst <= 0) { invst = ''; }                            
                            $(parentId+'.investment-bg #invamount').val(invst);
                            fnFormatCurrencyIndianStyle($(parentId+'.investment-bg #invamount'), 20);
                            $(parentId+'.investment-bg .fig_lbl').html(convert_number2(invst)).removeClass('none');
                            fncAnnuityAmountAndLable(parentId);
                        }
                    }                
        }});    
}
function dobValidation()
{
    var parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var age = $(parentId+'#birthDay').val();
    var minVal = parseInt($(parentId+'#birthDay').attr('data-min'));
    var maxVal = parseInt($(parentId+'#birthDay').attr('data-max'));

    if (age == '')
    {
        addError($(parentId+'#birthDay'), 'Enter your age');
    }
    else if (age < minVal)
    {
        addError($(parentId+'#birthDay'), 'You should be ' + minVal + ' years or above');
    }
    else if (age > maxVal)
    {
        addError($(parentId+'#birthDay'), 'Your age should be ' + maxVal + ' years or less');
    }
    else
    {
        clearError($(parentId+'#birthDay'));
    }
    //ageValidation($('#invage'))
    fncInvNeed(parentId);
}
function ageValidation(obj)
{
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var selectedTab = $('#investmentType').val();
    switch (selectedTab)
    {
        case "3":
            childValidation(obj,parentId);
            break;
        case "2":
            retirementValidation(obj, 50, 80, 115,parentId);
            break;
    }
    fncInvNeed(parentId);
}
function calculate_age(birth_day, birth_month, birth_year) {
    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if (today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}

function retirementValidation(dob, min, max, product,parentId)
{
    var retirementage = $(parentId+'#invage').val();
    var dob = $(parentId+'.birthDay').val();
    //var date = dob.split('-'); //dd-mm-yyyy
    //var age = calculate_age(date[3], date[1], date[0]);//console.log(dob+'age:'+age);
    var age = dob;
    if (retirementage == '')
    {
        addError($(parentId+'#invage'), 'Enter retirement age');
    }
    else if (retirementage < min || retirementage > max)
    {
        addError($(parentId+'#invage'), 'Retirement Age should be between ' + min + ' and ' + max);
    }
    else if (retirementage <= age)
    {
        addError($(parentId+'#invage'), 'Your age cannot be greater than retirement age');
    }
    else if ((parseInt(retirementage) - parseInt(age)) < 10)
    {
        addError($(parentId+'#invage'), 'Difference between retirement age and your age cannot be less than 10');
    }
    else
    {
        clearError($(parentId+'#invage'));
    }
}

function childValidation(objTextBox,parentId)
{
    var dob = $(parentId+'.birthDay').val();
    var min = $(parentId+'.birthDay').attr('data-min');
    var max = $(parentId+'.birthDay').attr('data-max');
    var objTextBox = $(parentId+'#invage').val();
    //var date = dob.split('-'); //dd-mm-yyyy
    //var age = calculate_age(date[3], date[1], date[0]);
    var age = dob;
    var diffAge = age - objTextBox;

    if ($(parentId+'#invage').val() == '')
    {
        addError($(parentId+'#invage'), 'Enter child\'s age');
    }
    if (dob < min || dob > max)
    {
        if (dob < min)
            addError($(parentId+'#birthDay'), 'You should be ' + min + ' years or above');
        if (dob > max)
            addError($(parentId+'#birthDay'), 'Your age should be ' + max + ' years or less');
    }
    else if (objTextBox >= 18)
    {
        if (dob == '')
        {
            addError($(parentId+'.birthDay'), 'Enter your age');
        }
        addError($(parentId+'#invage'), 'Child age has to be less than 18');
    }
    else if (dob == '')
    {
        addError($(parentId+'.birthDay'), 'Enter your age');
    }
    else if (diffAge < 18 && $(parentId+'#invdoberr').text() == '')
    {
        //addError($(parentId+'#invage'), 'Diff between your and child age should be greater than 18.');
		addError($(parentId+'#invage'), 'Age diff with your child must be greater then 18.');
    }
    else if($(parentId+'#invdoberr').text() == '')
    {
        clearError($(parentId+'.birthDay'));
        clearError($(parentId+'#invage'));
    }
}

function fnFormatCurrencyIndianStyle(objTextBox, maxlenght) {
    if(typeof objTextBox.val() != 'undefined'){
		var number = "";
		/*
		 var temp = objTextBox.value.split(',');
		 for(var i=0; i < temp.length;i++) {
		 number = number + "" + temp[i];
		 }*/
		number = objTextBox.val().replace(/,/g, '');
		if (number != "") {
			if (number.charAt(0) == "0" && number > 0) {
				number = RemoveZeroAtFirst(number);
			}

			var tmpstr = fntemp(parseInt(number));
			//objTextBox.value = fntemp(parseInt(number));
			objTextBox.val(tmpstr);

			if (tmpstr.length > maxlenght) {
				tmpstr = tmpstr.substring(0, tmpstr.length - 1);
				//objTextBox.value = tmpstr;		            
				objTextBox.val(tmpstr);
				fnFormatCurrencyIndianStyle(objTextBox, maxlenght);
			}
		}
	}
}

function RemoveZeroAtFirst(number)
{
    if (number.charAt(0) == "0") {
        number = number.substring(1);
        RemoveZeroAtFirst(number);
    }
    return number;
}

function fntemp(number)
{
    var formattedNumber = "";
    if (number > 999)
    {
        var no = parseInt(number / 1000);
        formattedNumber = (number - no * 1000)
        if (formattedNumber == 0)
        {
            formattedNumber = "000";
        }
        else if (formattedNumber < 10)
        {
            formattedNumber = "00" + formattedNumber;
        }
        else if (formattedNumber < 100)
        {
            formattedNumber = "0" + formattedNumber;
        }
        number = no;
        while (no > 99)
        {
            no = parseInt(no / 100);
            var temp = (number - no * 100);
            if (temp == 0)
            {
                formattedNumber = "00" + "," + formattedNumber;
            }
            else if (temp < 10)
            {
                formattedNumber = "0" + (number - no * 100) + "," + formattedNumber;
            }
            else
            {
                formattedNumber = (number - no * 100) + "," + formattedNumber;
            }
            number = no;
        }
        formattedNumber = no + "," + formattedNumber;
    }
    else
    {
        formattedNumber = number;
    }
    return formattedNumber;
}

function convert_number(number)
{
    if ((number < 0) || (number > 999999999))
    {
        //return "NUMBER OUT OF RANGE!";
        return "";
    }
    var Gn = (number / 10000000);  /* Crore */
    var kn = (number / 100000);     /* lakhs */
    var Hn = (number / 1000);      /* thousand */
    var Dn = (number / 100);       /* Tens (deca) */
    //var Dn = number;       /* Tens (deca) */ 
    var res = "";
    if (Math.floor(Gn) > 0)
    {
        res += Gn.toFixed(0) + "Cr";
    }
    else if (Math.floor(kn) > 0)
    {
        res += kn.toFixed(0) + " L";
    }
    else if (Math.floor(Hn) > 0)
    {
        res += Hn.toFixed(0) + "K";
    }

    else if (Dn)
    {
        res += Dn + " H";
    }
    return res;
}
function convert_number2(value)
{
    if (value !== undefined && value !== null && !isNaN(value)) {
        value = value.toString().replace(/,/g, '');
        var num = Math.round(value).toString(),
                numLength = num.length,
                displayNum = '',
                suffix = '';
        if (numLength < 4) {
            displayNum = num;
        } else if (numLength == 4) {
            displayNum = num / 1000;
            suffix = (displayNum > 1) ? "K" : "K";
        } else if (numLength == 5) {
            displayNum = num / 1000;
            suffix = (displayNum > 1) ? "K" : "K";
        } else if (numLength == 6) {
            displayNum = num / 100000;
            suffix = (displayNum > 1) ? "L" : "L";
        } else if (numLength == 7) {
            displayNum = num / 100000;
            suffix = (displayNum > 1) ? "L" : "L";
        } else if (numLength == 8) {
            displayNum = num / 10000000;
            suffix = (displayNum > 1) ? "Cr" : "Cr";
        } else if (numLength >= 9) {
            displayNum = num / 10000000;
            suffix = (displayNum > 1) ? "Cr" : "Cr";
        }
        if (parseInt(displayNum) > 9) {
            displayNum = Math.round(10 * displayNum) / 10;
        } else {
            displayNum = Math.round(100 * displayNum) / 100;
        }
        return displayNum + " " + suffix;
    } else {
        return 0;
    }
}

// Child Calculation

compoundInterest = function (corpus, payTerm) {

    var factor = 0.07124;

    var divisor = ((Math.pow((1.07124), (payTerm)))) - 1;

    var amt = corpus * factor / divisor;

    return Math.round(amt / 12);

};

// Retirement Calculation
GetPensionAmount = function (income,retiringyear) {
    var r = 4 * 0.01;
    var futureVal = income * Math.pow((1.0 + r), retiringyear);
    return Math.round(futureVal);
}
GetRetirementCalc = function (monthlyPension, age, payTerm) {
    //console.log('monthlyPension'+monthlyPension+'age'+ age+'payTerm'+ payTerm)
    var power = -12 * (age < 80 ? (80 - age) : 1);

    //var divisor = 0.00667;
    var divisor = 0.00583;

    var P = monthlyPension;

    //var multiplier = 1 - Math.pow(1.00667, power);
    var multiplier = 1 - Math.pow(1.00583, power);
    var corpus = (P * multiplier) / divisor;

    return compoundInterest(corpus, payTerm);

};

// Growth calculation

GetGrowthCalc = function (amount, payTerm) {

    var A = amount;

    var R = 0.063;

    var FV = A * (1 + R) * ((Math.pow((1 + R), payTerm) - 1) / R);

    var futureValue = Math.round(FV * 100) / 100;

    return futureValue;

};

// Parse the URL
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&amp;]" + name + "=([^&amp;#]*)"),
            results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*
 * Investment Cj End*
 */

/*
 Travel Cj Start
 * 
 */
$(document).ready(function () {
    /*$('body').click(function(){
     if (!$(this.target).is('.rightTab')){
     $('.travellerDetails').fadeOut('slow').removeClass('open');
     }
     });*/
    $('.disForm').on("click", '.frq a', function () {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        $(parentId+'.frq a').removeClass('active');
        $(this).addClass('active');
        $(parentId+'#tripduration').val($(this).text());
        $(parentId+'#tripdays').val($(this).text());
        if ($(parentId+'.tripfrequency').is(':checked'))
            $(parentId+'.triperr').html('');
    });

    $('.disForm').on("change", '[id^=memage]', function () {
        parentName = $(this).parents('.disForm').parent().attr('id');
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        var objParent = $(this).parents('.memberadd');
        var intAge = $('[id^=memage] option:selected', objParent).val();

        if (intAge != '')
            $('.chkAge', objParent).prop("checked", "checked");
        else
            $('.chkAge', objParent).prop("checked", "");
        setLabel(parentId,parentName);
    });

    $(document).on("focus", '#travellerno,#destinationcities', function () {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        $(parentId+'.travellerDetails').fadeOut('slow').removeClass('open');
        $('.travellerDetails', $(this).parents('.input_field')).slideDown('slow').addClass('open');
        $(parentId+'#token-input-destinationcategoryid').focus();
    });
    $(document).on('click', '.tripfrequency', function () {
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        parentName = $(this).parents('.disForm').parent().attr('id');
        if ($(this).is(':checked')) {	
            if ($(parentId+'#memberType').val() == 3) {//student
              var days = 1096;
            } else {
                var days = 367;
            }
            if($(parentId+'#startdate').val()==''){
                $(parentId+'#startdate').val($.datepicker.formatDate("dd-mm-yy", new Date()));
                startPicker[parentName].setDate(new Date());
                startDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
            }
            if($(parentId+'#enddate').val()==''){
                $(parentId+'#enddate').val($.datepicker.formatDate("dd-mm-yy", new Date()));
                endPicker[parentName].setDate(new Date());
                endDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
            }
            
            var maxDate = startPicker[parentName].getDate().addDays(days-3);
            $(parentId+'#enddate').val($.datepicker.formatDate("dd-mm-yy", maxDate));
            $(parentId+'#enddate').attr('placeholder', $.datepicker.formatDate("dd-mm-yy", maxDate));
            endDate[parentName] = $.datepicker.formatDate("dd-mm-yy", maxDate);
            
            $(parentId+'#enddate').attr('disabled', true);
            $(parentId+'#traveldate_lbl').html((days - 2) + '<p>Days</p>');
            $(parentId+'.frq').removeClass('dis_none');
            $(parentId+'#tripduration').val(0);
            $(parentId+'#tripdays').val(0);
            $(parentId+'#tripType').val(2);
        } else {
            $(parentId+'#startdate').val('');
            $(parentId+'#enddate').val('');
            $(parentId+'#enddate').attr('placeholder','DD-MM-YYYY');
            $(parentId+'#enddate').attr('disabled', false);
            if($(parentId+'#startdate').val()==''){
                startPicker[parentName].gotoToday();
                startDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
            }
            if($(parentId+'#enddate').val()==''){
               endPicker[parentName].gotoToday();
                endDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
            }
            $(parentId+'.frq').addClass('dis_none');
            $(parentId+'#tripType').val(1);
            $(parentId+'.frq a').removeClass('active');
        }
		
    });
    $(document).on('click', '.travel-bg .travel_action .done,.travel-bg .travel_action .cancel', function () {
        var flagError = false;
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        parentName = $(this).parents('.disForm').parent().attr('id');
        if ($(this).text() == 'Cancel')
        {
            $(parentId+'.18-99').prop('selectedIndex', 0);
            $(parentId+'#travellerDetails input[type=checkbox]').attr('checked', false);
            $(parentId+'#travellerno').val('');
        }
        if ($(this).text() == 'Done')
        {
            $(parentId+'#travellerDetails input[type=checkbox]').each(function () {
                var objParent = $(this).parents('.memberadd');
                var checked = $('.chkAge', objParent).is(":checked");
                if (checked === true) {
                    var intAge = $('select option:selected', objParent).val();
                    if (intAge <= 0 || intAge == 'Yrs') {
                        flagError = true;
                        objParent.addClass('error');
                    } else {
                        objParent.removeClass('error');
                    }
                }
            });
            if (($(parentId+'#startdate').val() != '' && $(parentId+'#enddate').val() != '' && $(parentId+'#traveldateerr').val() == '') && ($(parentId+'#travellerno').val() != '' && $(parentId+'#travellernoerr').val() == '') && ($(parentId+'#destinationcities').val() != '' && $(parentId+'#desterr').val() == '') && !flagError) {
                $(parentId+'.travellerDetails').fadeOut('slow').removeClass('open');
                $(parentId+'.travel_step_2').slideDown('slow');
                $(parentId+'.proceedGray').parent('.input_field.pro').hide();
                $(parentId+'.last_submit').show('slow');
                //$('#travelname').focus();
            }
            //set dob for self
            var lbl = $(parentId+'#travellerno').val();
            if (lbl.indexOf('Self') > -1)
            {
                var intAge = parseInt(lbl.match(/\d+/), 10);
                var dobStartDate = new Date().subsYears((parseInt(intAge) + 1));
                var dobEndDate = new Date().subsYears(intAge)
                resetDOB(parentName,dobStartDate, dobEndDate);
            }
            else
            {
                var dobStartDate = new Date().subsYears(99);
                var dobEndDate = new Date().subsYears(18)
                resetDOB(parentName,dobStartDate, dobEndDate);
            }
            //end set dob for self
        }
        if (!flagError)
            $(parentId+'.travellerDetails').fadeOut('slow').removeClass('open');
    });

    $(document).on('click', '#travellerDetails input[type=checkbox]', function () {
        parentName = $(this).parents('.disForm').parent().attr('id');
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        setLabel(parentId,parentName);
    });
    $(document).on('click', '.memberadd .addChild,.addchildBtn', function () {
        var len = $(parentId+'#travellerDetails ul li').length + 1;
        parentName = $(this).parents('.disForm').parent().attr('id');
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        travelchkID = parentName+'_travelcheckbox'+len;        
        if (len == 7)
        {
            var $cloneItem = '<li class="memberadd"><div class="select_feild"><input id="' + travelchkID + '" type="checkbox" name="checkbox" value="' + len + '" class="chkAge"><label for="' + travelchkID + '"><span></span>Child</label></div><select id="memage' + len + '" class="yrs_' + len + '"><option>Yrs</option></select><span class="addBtn addChild"><i class="fa"></i></span></li>';
            $(parentId+'#addMBtn').hide();
        }
        else
            var $cloneItem = '<li class="memberadd"><div class="select_feild"><input id="' + travelchkID + '" type="checkbox" name="checkbox" value="' + len + '" class="chkAge"><label for="' + travelchkID + '"><span></span>Child</label></div><select id="memage' + len + '" class="yrs_' + len + '"><option>Yrs</option></select><span class="addBtn addChild"><i class="fa fa-plus-circle"></i></span></li>';
        if (len != 8) {
            $(parentId+'#travellerDetails ul').append($cloneItem);
            var $select = $(parentId+".yrs_" + len);
            for (i = 1; i <= 18; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
        }
        else {
            //alert('max limit reach');
        }
    });
    $(document).on('click', '.memberadd .addMore,.addmoreBtn', function () {
        var len = $(parentId+'#travellerDetails ul li').length + 1;
        parentName = $(this).parents('.disForm').parent().attr('id');
        parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
        travelchkID = parentName+'_travelcheckbox'+len;        
        if ($(parentId+'#memberType').val() == 3) {
            var lblName = 'Student ';
            var minSelect = 16;
            var maxSelect = 35;
        } else {
            var lblName = 'Member ';
            var minSelect = 18;
            var maxSelect = 99;
        }
        lblName = lblName + len;
        if (len == 8) {
            var $cloneItem = '<li class="memberadd"><div class="select_feild"><input id="' + travelchkID + '" type="checkbox" name="checkbox" value="' + len + '" class="chkAge"><label for="' + travelchkID + '"><span></span>' + lblName + '</label></div><select id="memage' + len + '"  class="yrs_' + len + '"><option>Yrs</option></select><span class="addBtn addMore"><i class="fa"></i></span></li>';
            $(parentId+'#addMBtn').hide();
        } else
            var $cloneItem = '<li class="memberadd"><div class="select_feild"><input id="' + travelchkID + '" type="checkbox" name="checkbox" value="' + len + '" class="chkAge"><label for="' + travelchkID + '"><span></span>' + lblName + '</label></div><select id="memage' + len + '"  class="yrs_' + len + '"><option>Yrs</option></select><span class="addBtn addMore"><i class="fa fa-plus-square"></i></span></li>';

        if (len != 9) {
            $(parentId+'#travellerDetails ul').append($cloneItem);
            var $select = $(parentId+".yrs_" + len);
            for (i = minSelect; i <= maxSelect; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
        }
        else {
            //alert('max limit reach');
        }
    });    
});
fncTravelTab = function () {
    var selectedTab = $(this).children('input[type=radio]').val();
    $(this).children('input[type=radio]').prop('checked', 'checked');
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    parentName = $(this).parents('.disForm').parent().attr('id');
    var len = $(parentId+'#travellerDetails ul li').length;
    if (len >= 5)
    {
        $(parentId+"#travellerDetails ul li:gt(4)").remove();
    }
    $(parentId+'.fn').addClass('fa-plus-square');
    $(parentId+'#addMBtn').show();
    $(parentId+'#travellerDetails input[type=checkbox]').attr('checked', false);
    $(parentId+'#travellerno').val('');
    $(parentId+'.travellerDetails').fadeOut('slow').removeClass('open');
    $(parentId+'#CategoryID').val(selectedTab);    
    switch (selectedTab)
    {
        case '1':
            $(parentId+'#tripPolicy').addClass('dis_none');
            $(parentId+'.frq').addClass('dis_none');
            $(parentId+'.infoUpdate').removeClass('dis_none');
            $(parentId+'.tripfrequency').attr('checked', false);
            $(parentId+'#enddate').attr('disabled', false);
            $(parentId+'.frq a').removeClass('active');
            var travellerArray = new Array('Self', 'Spouse', 'Father', 'Mother', 'Child', 'Child', 'Child');
            var i = 0;
            $(parentId+'#travellerDetails label').each(function ()
            {
                $(this).html('<span></span> ' + travellerArray[i]);
                i++;
            });
            $(parentId+'#memberType').val(1);
            $(parentId+'.addBtn').removeClass('addMore');
            $(parentId+'.addBtn').addClass('addChild');
            $(parentId+'#addMBtn').removeClass('addmoreBtn');
            $(parentId+'#addMBtn').addClass('addchildBtn');
            $(parentId+'#addMBtn span').text('Add Child');
            $(parentId+'[class~=0-99]').find('option').remove().end();
            var $select = $(parentId+"[class~=0-99]");
            $select.append('<option>Yrs</option>');
            for (i = 18; i <= 99; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
            $(parentId+'[class~=0-18],[class*=yrs]').find('option').remove().end();
            var $select = $(parentId+"[class~=0-18],[class*=yrs]");
            $select.append('<option>Yrs</option>');
            for (i = 1; i <= 18; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
            numDays = 179;
            $(parentId+'#lblTraveller').html('Traveller(s)');
            $(parentId+'#travellerno').attr('placeholder', 'Please select travellers');
            $(parentId+'#tripType').val(1);
            break;
        case '2':
            $(parentId+'#tripPolicy').addClass('dis_none');
            $(parentId+'.frq').addClass('dis_none');
            $(parentId+'.infoUpdate').removeClass('dis_none');
            $(parentId+'.tripfrequency').attr('checked', false);
            $(parentId+'#enddate').attr('disabled', false);
            $(parentId+'.frq a').removeClass('active');            
            $(parentId+'.addBtn').removeClass('addChild');
            $(parentId+'.addBtn').addClass('addMore');
            $(parentId+'#addMBtn').removeClass('addchildBtn');
            $(parentId+'#addMBtn').addClass('addmoreBtn');
            $(parentId+'#addMBtn span').text('Add More');
            $(parentId+'#memberType').val(2);
            var i = 1;
            $(parentId+'#travellerDetails label').each(function ()
            {
                $(this).html('<span></span>Member ' + i);
                i++;
            });
            numDays = 179;
            $(parentId+'[class~=0-99]').find('option').remove().end();
            var $select = $(parentId+"[class~=0-99]");
            $select.append('<option>Yrs</option>');
            for (i = 18; i <= 99; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
            
            $(parentId+'#lblTraveller').html('Member(s)');
            $(parentId+'#travellerno').attr('placeholder', 'Please select members');
            $(parentId+'#tripType').val(1);
            break;    
        case '3'://student
            //$('#travelPolicy').trigger('click');
            $(parentId+'#tripPolicy').removeClass('dis_none');
            $(parentId+'.infoUpdate').addClass('dis_none');
            $(parentId+'.frq').addClass('dis_none');
            $(parentId+'.tripfrequency').attr('checked', false);
            $(parentId+'#enddate').attr('disabled', false);
            $(parentId+'.frq a').removeClass('active');
            $(parentId+'.addBtn').removeClass('addChild');
            $(parentId+'.addBtn').addClass('addMore');
            $(parentId+'#addMBtn').removeClass('addchildBtn');
            $(parentId+'#addMBtn').addClass('addmoreBtn');
            $(parentId+'#addMBtn span').text('Add More');                   
            $(parentId+'#memberType').val(3);
            var i = 1;
            $(parentId+'#travellerDetails label').each(function ()
            {
                $(this).html('<span></span>Student ' + i);
                i++;
            });
            numDays = 1094;
            $(parentId+'[id^=memage]').find('option').remove().end();
            var $select = $(parentId+"[id^=memage]");
            $select.append('<option>Yrs</option>');
            for (i = 16; i <= 35; i++) {
                $select.append($('<option></option>').val(i).html(i))
            }
            
            $(parentId+'#lblTraveller').html('Student(s)');
            $(parentId+'#travellerno').attr('placeholder', 'Please select students');
            $(parentId+'#tripType').val(1);
            break;
    }
    //endDate = new Date().addDays(numDays);
	$(parentId+'#startdate').val('');
    $(parentId+'#enddate').val('');
    $(parentId+'#enddate').attr('placeholder','DD-MM-YYYY');
    if($(parentId+'#startdate').val()==''){
        startPicker[parentName].gotoToday();
        startDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
    }
    if($(parentId+'#enddate').val()==''){
       endPicker[parentName].gotoToday();
        endDate[parentName] = $.datepicker.formatDate("dd-mm-yy", new Date());
		endPicker[parentName].setMaxDate(new Date().addDays(numDays));        
    }
    setMaxDate(parentName,numDays);
    //resetDates(parentId,parentName);
	endPicker[parentName].setDate(null);
    $(parentId+'#enddate').val('');
};
fncTravelCheck = function(){
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objstart = $(parentId+'#startdate');
    var objend = $(parentId+'#enddate');
    var destinationcities = $(parentId+"#destinationcities").val();
    var objCnt = $(parentId+'#travellerno');
    var flagSubmit = true;
    if (destinationcities == '')
    {
        addError($(parentId+"#destinationcities"), 'Please enter destination');
        flagSubmit = false;
    }
    else
    {
        clearError($(parentId+"#destinationcities"));
    }
    if (objCnt.val() == '') {
        addError(objCnt, 'Please enter no of travellers');
        flagSubmit = false;
    } else {
        var memberArray = [];
        var objtravellers = $(parentId+'#travellerDetails input:checkbox').length;
        var no = 1;
        parentName = $(this).parents('.disForm').parent().attr('id');
        for (var i = 1; i <= objtravellers; i++)
        {
            var lblName = parentName+'_travelcheckbox'+i;
            if ($($('#' + lblName)).is(':checked')) {
                var memage = $(parentId+'#memage' + i).val();
                var lbl = $('#' + lblName).next().text();
                memberArray.push(new Array(no, lbl, memage));
                no++;
            }
        }
        clearError(objCnt);
    }

    if (objstart.val() == '' || objend.val() == '') {
        addError(objstart, 'Please select start/end date');
        flagSubmit = false;
    } else {
        clearError(objstart);
    }
    if(flagSubmit){
        $(parentId+'.travellerDetails').fadeOut('slow').removeClass('open');
        $(parentId+'.travel_step_2').slideDown('slow');
        $(parentId+'.proceedGray').parent('.input_field.pro').hide();
        $(parentId+'.last_submit').show('slow');
		$(parentId+'.leftContent').removeClass('small');
		$(parentId+'.leftContent').addClass('big');
    }
    return flagSubmit;
}
fncTravelProceed = function () {
    parentId = '#' + $(this).parents('.disForm').parent().attr('id') + ' ';
    var objstart = $(parentId+'#startdate');
    var objend = $(parentId+'#enddate');
    var destinationcities = $(parentId+"#destinationcities").val();
    var destinationcategoryid = $(parentId+"#destinationcategoryid").tokenInput("get");
    var objCnt = $(parentId+'#travellerno');
    var objName = $.trim($(parentId+'#travelname').val());
    var objEmail = $.trim($(parentId+'#travelemail').val());
    var objDOB = $.trim($(parentId+'#traveldob').val());
    var objCity = $.trim($(parentId+'#travelCity').val());
    var objCityID = $.trim($(parentId+'#travelCity').attr('data-cityid'));
    var objStateID = $.trim($(parentId+'#travelCity').attr('data-stateid'));
    var objMobile = $.trim($(parentId+'#travelmobile').val());

    var flagSubmit = true;
    if ($(parentId+'.tripfrequency').is(':checked'))
    {
        if ($(parentId+'.frq a').hasClass("active")) {
			$(parentId+'#tripType').val(2);
        }
        else {
            $(parentId+'.triperr').html('Please select trip frequency.');
            flagSubmit = false;
        }
    }
    else
    {
        $(parentId+'.frq a').removeClass('active');
        $(parentId+'.triperr').html('');
        flagSubmit = true;
    }
    if (destinationcities == '')
    {
        addError($(parentId+"#destinationcities"), 'Please enter destination');
        flagSubmit = false;
    }
    else
    {
        clearError($(parentId+"#destinationcities"));
    }
    if (objCnt.val() == '') {
        addError(objCnt, 'Please enter no of travellers');
        flagSubmit = false;
    } else {
        var memberArray = [];
        var objtravellers = $(parentId+'#travellerDetails input:checkbox').length;
        var no = 1;
        parentName = $(this).parents('.disForm').parent().attr('id');
        for (var i = 1; i <= objtravellers; i++)
        {
            var lblName = parentName+'_travelcheckbox'+i;
            if ($($('#' + lblName)).is(':checked')) {
                var memage = $(parentId+'#memage' + i).val();
                var lbl = $('#' + lblName).next().text();
                memberArray.push(new Array(no, lbl, memage));
                no++;
            }
        }
        clearError(objCnt);
    }

    if (objstart.val() == '' || objend.val() == '') {
        addError(objstart, 'Please select start/end date');
        flagSubmit = false;
    } else {
        clearError(objstart);
    }

    if (objName == '')
    {
        addError($(parentId+'#travelname'), 'This is required.');
        flagSubmit = false;
    } else if (!onlycharacterwithspace(objName))
    {
        addError($(parentId+'#travelname'), 'Enter your full name');
        flagSubmit = false;
    } else {
        clearError($(parentId+'#travelname'));
    }

    if (objEmail == '')
    {
        addError($(parentId+'#travelemail'), 'Please enter valid email id.');
        flagSubmit = false;
    } else if (!validemail(objEmail)) {
        addError($(parentId+'#travelemail'), 'Please enter valid email id');
        flagSubmit = false;
    }
    else {
        clearError($(parentId+'#travelemail'));
    }

    if (objDOB == '')
    {
        addError($(parentId+'#traveldob'), 'This is required.');
        flagSubmit = false;
    } else {
        clearError($(parentId+'#traveldob'));
    }

    if (objCity == '')
    {
        addError($(parentId+'#travelCity'), 'This is required.');
        flagSubmit = false;
    } else {
        clearError($(parentId+'#travelCity'));
    }

    if (objMobile == '')
    {
        addError($(parentId+'#travelmobile'), 'This is required.');
        flagSubmit = false;
    } else if (!validmobile(objMobile)) {
        addError($(parentId+'#travelmobile'), 'Please enter valid mobile number');
        flagSubmit = false;
    } else if (!onlyNumber(objMobile)) {
        addError($(parentId+'#travelmobile'), 'Please enter valid mobile number');
        flagSubmit = false;
    } else {
        clearError($(parentId+'#travelmobile'));
    }

    if (flagSubmit) {
        //try{
        var objBtnSubmit = $(this);
        objBtnSubmit.hide();
       
        var leadsource = 'PB';
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var leadsource = 'PBMobile';
        }
        var formURL = BASEURL + 'callservice.php';
        // Give the URL parameters variable names
        var source = utmSource;
        var medium = utmMedium;
        var campaign = utmCampaign;
        var term = utmTerm;
		var TabName = 'Tab-Family/Self';
        if($(parentId+'#memberType').val()==1)
            TabName = 'Tab-Family/Self';
        else if($(parentId+'#memberType').val()==2)
            TabName = 'Tab-Group/Friends';
        else if($(parentId+'#memberType').val()==3)
            TabName = 'Tab-Student';
        //var visitId = (visitId == '' || visitId == 'undefined')?'':visitId;
        var visitId = $('#gaData').attr('data-visit');
        var postData = {
            'task': 'travel',
            'traveltype': $(parentId+'#CategoryID').val(),
            'triptype': $(parentId+'#tripType').val(),
            'membertype': $(parentId+'#memberType').val(),
            'cnttraveller': $(parentId+'#travellerno').val(),
            'startdate': $(parentId+'#startdate').val(),
            'enddate': $(parentId+'#enddate').val(),
            'destinationcategoryid': destinationcategoryid,
            'tripduration': $(parentId+'#tripduration').val(),
            'tripdays': $(parentId+'#tripdays').val(),
            'members': memberArray,
            'utmsource': source,
            'utmmedium': medium,
            'utmcampaign': campaign,
            'utmterm': term,
            'visitId': visitId,
            'name': objName,
            'genderid': $(parentId+'#travelgender').val(),
            'email': objEmail,
            'dob': objDOB,
            'cityname': objCity,
            'cityid': objCityID,
            'stateid': objStateID,
            'mobile': objMobile,
            'exitpointurl': window.location.href,
            'leadsource': leadsource,
			'gaClientId': getGACId('UA-4743078-11'),
			'gclid' :getGCLId()
        };
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            cache: false,
            beforeSend: function () {
                $(parentId+'.travelproceed').hide();
                $(parentId+'.process').show();
            },
            success: function (data, textStatus, jqXHR)
            {
                if (data !== '' && data != 'name lookup timed out')// typeof data =='object'
                {
                    try {
                        var data = JSON.parse(data);
                        var EnquiryId = $.trim(data.EnquiryID);
                        var CustId = $.trim(data.CustomerID);
                        var MatrixLeadId = $.trim(data.MatrixLeadID);
                        var leadObj = {};
                        if ($(parentId+'#traveldob').val() !== undefined && $(parentId+'#traveldob').val() !== null) {
                            var dob = $(parentId+'#traveldob').val();
                            var date = dob.split('-'); //dd-mm-yyyy
                            var age = calculate_age(date[0], date[1], date[2]);
                            leadObj.age = age;
                        }
                        if ($(parentId+'#travelgender').val() !== undefined && $(parentId+'#travelgender').val() !== null) {
                            leadObj.gender = $(parentId+'#travelgender').val() == 1 ? 'Male' : 'Female';
                            leadObj.city = $(parentId+'#travelCity').val();
                        }


                        if ($(parentId+'#destinationcities').val() !== undefined && $(parentId+'#destinationcities').val() !== null) {
                            leadObj.geocoverage = $(parentId+'#destinationcities').val();
                        }
                        //Omniture                    
                        //triggerLeadGenerationTravelEvent(MatrixLeadId, EnquiryId, CustId, leadObj);
                        //GA Event
                        try {
                            ga('traTrackerObj.set', 'dimension1', data.MatrixLeadID);
                            ga('traTrackerObj.send', 'event', 'Lead', 'SEO-Travel', data.MatrixLeadID);
							ga('traTrackerObj.send', 'event', 'seo-travel-insurance', TabName, EnquiryId);
                            ga('traTrackerObj.send', 'event', 'seo-travel-insurance', 'seo-page-proceed', EnquiryId);
                            executed: dataLayer.push({'LeadID': data.MatrixLeadID})
                            executed: dataLayer.push({'event': 'travelLead'})
                        } catch (e) {
                        }
                        //
                        if (ValidURL(data.Url)) {
                            setTimeout(function () {
                                window.location.href = data.Url+'&iscom=1';
                                objBtnSubmit.show();
                            }, 3000);
                        }
                    } catch (e) {
                        objBtnSubmit.show();
                    }
                }
                else
                {
                    objBtnSubmit.show();
                }

            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                //console.log('ok' + textStatus);
                objBtnSubmit.show();
            }
        });
        return false;
        /*} catch (e) {
         }*/
    }
};


calculateNumDays = function (start, end) {
    var millsec = 24 * 60 * 60 * 1000;   //One day millisec
    var startDate = new Date(start);
    var endDate = new Date(end);
    var diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (millsec)));
    return parseInt(diffDays * 1 + 1);
}

function setLabel(parentId,parentName) {    
    var chkItem = [];
    var i = 1;
    $(parentId+'#travellerDetails input[type=checkbox]').each(function () {
        var objParent = $(this).parents('.memberadd');
        var checked = $('.chkAge', objParent).is(":checked");
        if (checked === true) {
            var lblName = parentName+'_travelcheckbox'+i;
            var lbl = $('#' + lblName).next().text();
            var selVal = $(parentId+'#memage' + i).val();
            if (selVal != '' && selVal != undefined && selVal != 'Yrs')
                lbl += '(' + selVal + ')';
            chkItem.push(lbl);
        }
        else {
            $(parentId+'#memage' + i).prop('selectedIndex', 0);
            objParent.removeClass('error');
        }
        i++;
    });

    $(parentId+'#travellerno').val(chkItem);
}

function setMaxDate(parentName,maxDays)
{
	endDate[parentName] = new Date().addDays(maxDays);
}

function resetDates(parentId,parentName)
{ 
    var startdays = new Date().addDays(3);
    startPicker[parentName].setDate(startdays);
    var enddays = new Date().addDays(12);
    endPicker[parentName].setDate(enddays);
    $(parentId+'#traveldate_lbl').html('10<p>Days</p>');
}
function resetDOB(parentName,dobStartDate, dobEndDate)
{
    dobPicker[parentName].setMinDate(dobStartDate);
    dobPicker[parentName].setMaxDate(dobEndDate);
    dobPicker[parentName].setDate(dobEndDate);
    $(parentId+'#traveldob').val('');
}

function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        //alert("Please enter valid URL.");
        return false;
    } else {
        return true;
    }
}
/*
 Travel Cj End
 * 
 */
/* Omni Event Start
 * 
 */
var userType = "";
var callOnPageBottom = function () {
    this.pageName = "";
    this.channel = "";
    this.subSection1 = "";
    this.userType = "";
    this.formname = "";


    this.pageBottomEvent = function () {
        var digitalData = {
            page: {
                'pageName': this.pageName,
                'channel': this.channel,
                'subSection1': this.subSection1,
                'userType': this.userType,
                'formname': this.formname
            }
        }
        return digitalData;
    }
}
function getuserType() {
    var userType = "guest";
    return userType
}

userType = getuserType();

fncTravelText = function () {
    if ($(this).val() == '')
    {
        addError($(this), $(this).attr('data-msg'));
    }
    else if (!onlycharacterwithspace($(this).val())) {
        addError($(this), $(this).attr('data-msg'));
    }
    else {
        clearError($(this));
    }
}
function getSMEFormDataUsingLeadId(strLeadId){
    if (strLeadId){ 
        $.ajax({
            url: BASEURL + 'cj-process.php?type=sme-lead-id&leadId='+strLeadId,
            type: "GET",
            cache: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.IsSuccess == true) {
                    $('.proceedGray').parent('.input_field.pro').hide();
                    $('.step2HealthDetails').show();
                    var postdata = JSON.stringify({
                        tabName: 'healthsme',
                        company_name: data.CompanyName,
                        insurance_policy_option: '',
                        investmentTypeId: data.InvestmentTypeId,
                        riskCategory: '',
                        riskCategoryId: '',
                        gender:'',
                        contact_person: data.ContactPerson,
                        mobile: data.MobileNo,
                        emailid: data.Email,
                        /*city_name: data.City.CityName,
                        city_id: data.City.CityId,
                        state_id: data.City.StateID,
                        pincode: data.City.PinCode,*/
                        gaClientId: '',
                        gCLId:'',
                        groupPolicyType: '',
                        country: 392,
                        countryCode:91
                    });
                    localStorage.setItem("getLastTab", postdata);
                    fncSetFormValue('healthsme');//Set default value
                }
            }
        });
    }
}

function gaTrakingInsurer(eventName,insurerName,controlName) {
	try{
		ga('pbTrackerObj.send', 'event', eventName, insurerName, controlName);	
	}catch(e){}
}

//Sticky form
function checkMobileNumber(){
    var objString = '';
    var objStringVal = '';
    var flagSubmit = true;
    var errorFields = '';
    var errorDescriptions = '';
    var errorCounts = 0;
    var objStringCountryCode = $(parentId+'.mobNumber').attr('data-country-std-code');
    objString = $(parentId+'.mobNumber');
    var objStringMin = $(parentId+'.mobNumber').attr('minlength');
    var objStringMax = $(parentId+'.mobNumber').attr('maxlength');
    objStringVal = $.trim(objString.val());
    if (objStringVal.length === 0) {
        addError(objString, 'Please enter mobile number');
        flagSubmit = false;
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter mobile number,';
        errorCounts++; 
    }
    else if (objStringVal.length <objStringMin || objStringVal.length > objStringMax) {
        addError(objString, 'Please enter valid mobile number');
        flagSubmit = false;
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile number,';
        errorCounts++; 
    }else if (objStringCountryCode == '91' && !validmobile(objStringVal)) {
        addError(objString, 'Please enter valid mobile number');
        flagSubmit = false;
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile number,';
        errorCounts++; 
    } else if (!onlyNumber(objStringVal)) {
        addError(objString, 'Please enter valid mobile number');
        flagSubmit = false;
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile number,';
        errorCounts++; 
    } else {
        clearError(objString);
        objString.parents('.input_box').addClass('input_success');
    }
    if(!flagSubmit){
        objString.parents('.input_box').removeClass('input_success');
        userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }
    return flagSubmit;
}

fncProcessHealthSticky = function(){
    parentId = '.stickFooter_info ';//anuj
    var isLandingforSPO = window.location.href.indexOf("landingpage/health");
    if (isLandingforSPO > -1) {        
        if(typeof utmSource !== 'undefined' && $.trim(utmSource.toLowerCase()) != 'offlineaffiliate' || utmTerm == '' || utmMedium == '' || utmCampaign == ''){
            alert('UTM Tags are missing');
            return;
        }    
    }
    var objBtnSubmit = $(parentId+'.healthBtnSubmit');    
    objBtnSubmit.hide();
    
    //Loader code
    var objBtnLoader = $(parentId+'#loadingDivStep1');    
    objBtnLoader.show();
    
    var objString = '';
    var objStringVal = '';
    var flagSubmit = true;
    
    
    
    //Mobile
    flagSubmit = checkMobileNumber();
   
    if(flagSubmit){
        prevpage = '';
        //GA360Page('virtualPage',' Step 2',prevpage);
        objString = $(parentId+'.mobNumber');
        objStringVal = $.trim(objString.val());
        
        
        
        //Hide loader
        //objBtnLoader.hide();        
        //Show button submit
        //objBtnSubmit.show();
        if(isLandingforSPO == -1){
            var otherString = $(this).attr('data-utm-campaign');
            if (typeof otherString !== typeof undefined && otherString !== false) {
                utmCampaign = otherString;
            }
            fncHealthLeadCreate();
			window.location.href='https://health.policybazaar.com/';
        }
        //$(parentId+'.health_number').hide();
        //$(parentId+'.thankyou').show();
        
    }else{
        //Hide loader
        objBtnLoader.hide();
        
        //Show button submit
        objBtnSubmit.show();
    }

};
function setCountry(){
    var toAppend = '';
    $.each(InvCountryJson, function (i, o) {
        var selectedCounty = (o.CountryCodeId == 392) ? 'selected="selected"' : '';
        toAppend += '<option data-min="' + o.MIN + '" data-max="' + o.MAX + '" data-country-code="' + o.CountryCode + '" value="' + o.CountryCodeId + '" ' + selectedCounty + '>' + o.CountryName + '</option>';
    });
    $('.bannerDiv #termCountry').find('option').remove().end();
    $('.bannerDiv #termCountry').append(toAppend);
    $('.bannerDiv #countryCode').val(91);
                    if(countryName !=''){
        $('.bannerDiv #termCountry').val(countryId);
        $('.bannerDiv .countryCode').text('+' + countryCode);
        $('.bannerDiv .mobNumber').attr({"minlength": min,"maxlength": max});  
    }else{
        $('.bannerDiv .countryCode').text('+91');
        $('.bannerDiv .mobNumber').attr({
            "minlength":10,
            "maxlength":10
        });
    }
}
function setTermCountryCodeSticky() {
    var selID = $(this).val();
    $.each(InvCountryJson, function (i, o) {
        if (o.CountryCodeId == selID)
        {
            $('.bannerDiv .mobNumber').val('');
            $('.bannerDiv .countryCode').text('+'+o.CountryCode);
            if (o.CountryCodeId == 392)
            {
                $('.bannerDiv #termCity').attr({'data-stateid':'35','data-cityid':'551'}).val('Delhi (Delhi)');                
            }else{
                $('.bannerDiv #termCity').attr({'data-stateid':'','data-cityid':''}).val('');                
            } 
            $('.bannerDiv .mobNumber').attr({
                "minlength":o.MAX,
                "maxlength":o.MIN
            });
            return;
        }		
        //$('.bannerDiv #invCountry').html('+'+$.trim($('option:selected', '.bannerDiv #invCountry').attr('data-country-code')));
    });
}
fncTermMobileSticky = function () {
    var objStringCountryCode = $('.bannerDiv #termCountry');
    if ($(this).val() != '' && objStringCountryCode.val() == '392' && !validmobile($(this).val())) {
        //addError($(this), 'Please enter valid mobile number');
        
        $('.bannerDiv .mobNumber').addClass('error');
        $('.err', $('.bannerDiv .mobNumber')).html('Please enter valid mobile number').show();
    } else if ($(this).val() != '' && !onlyNumber($(this).val())) {
        //addError($(this), 'Please enter valid mobile number');
        $('.bannerDiv .mobNumber').addClass('error');
        $('.bannerDiv .err').html('Please enter valid mobile number').show();
    } else {
        //clearError($(this));
        $('.bannerDiv .mobNumber').removeClass('error');
        $('.bannerDiv .err').html('').hide();
    }
}

function proceedTermSticky()
{
    var source = utmSource;
    var medium = utmMedium;
    var campaign = utmCampaign+'_sticky';
    var term = utmTerm;
    var visitId = $('#gaData').attr('data-visit');
    var leadsource = 'PB';
	
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var leadsource = 'PBMobile';
    }
    var termCityId = $('.bannerDiv #termCity').attr('data-cityid');
    var termStateId = $('.bannerDiv #termCity').attr('data-stateid');
    var blnFlag = true;
    errorFields = '';
    errorDescriptions = '';
    errorCounts=0;
    //
    var objStringCountryCode = $('.bannerDiv #termCountry option:selected');
    var objString = $('.bannerDiv .mobNumber');
    objStringVal = $.trim(objString.val());
    if ($.trim($('option:selected', '.bannerDiv #termCountry').val()) == 999 && objStringCountryCode.val() == '') {
        $('.bannerDiv .mobNumber').addClass('error');
        $('.bannerDiv .err').html('Please select country').show();
        errorFields += 'countrycode,';
        errorDescriptions += 'Please enter country code,';
        errorCounts++;
        blnFlag = false;
    }
    else if (objStringVal.length === 0) {
        $('.bannerDiv .mobNumber').addClass('error');
        $('.bannerDiv .err').html('Please enter valid mobile number').show();
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter mobile number,';
        errorCounts++;
        blnFlag = false;
    } else if (objStringCountryCode.val() == '392' && !validmobile(objStringVal)) {
        $('.bannerDiv .mobNumber').addClass('error');
        $('.bannerDiv .err').html('Please enter valid mobile number').show();
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile number,';
        errorCounts++;
        blnFlag = false;
    } else if (!onlyNumber(objStringVal)) {
        $('.bannerDiv .mobNumber').addClass('error');
        $('.bannerDiv .err').html('Please enter valid mobile number').show();
        errorFields += 'mobile,';
        errorDescriptions += 'Please enter valid mobile number,';
        errorCounts++;
        blnFlag = false;
    } else {
        $('.bannerDiv .mobNumber').removeClass('error');
        $('.bannerDiv .err').html('').hide();
    }
    
    if(blnFlag === false){
        userType = $('#gaData').attr('data-user-type');
        GA360FormSubmitError(errorFields,errorDescriptions,errorCounts,userType);
    }else{
    //
    $(this).addClass('loading');
    var postdata = JSON.stringify({
            leadSource: leadsource,
            mobileNo: $.trim($('.bannerDiv .mobNumber').val()),
            countryId: (objStringCountryCode.val()=='')?392:objStringCountryCode.val(),
            tobacco: 0,
            annualIncome:4,
            gender: 1,
            name: 'dear customer',
            email: 'dummy@dummy.com',
            cityId: (termCityId == '' || termCityId == 'undefined') ? 9999 : termCityId,
            stateId: (termStateId == '' || termStateId == 'undefined') ? 99 : termStateId,
            utmSource: source,
            utmTerm: term,
            utmMedium: medium,
            utmCampaign: campaign,
            visitId: visitId,
            totalPayout: 10000000,
            dob: '01-01-1990',
            custId: "-1",
            gaTrackerClientId: getGACId( 'UA-4743078-7'),
            gclid:getGCLId()
        });
    $.ajax({
        url: BASEURL + 'cj-process.php?type=term',
        type: "POST",
        cache: false,
        data: postdata,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(this).addClass('loading');
        },
        success: function (data, textStatus, jqXHR)
        { 

                try{
                    //Use if userid retrun by service
                    //Set PBCID
                    var CustId = data.customerId;
                                                $.ajax({
                        url: BASEURL+'cj-process.php?type=setpbcid',
                                                type: "POST",
                                                cache: false,
                        data: JSON.stringify({CustId:CustId,Mob:$.trim($('.bannerDiv .mobNumber').val())}),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                        success: function (){}
                    });                    
                //Set PBCID
                 } catch (e) {}              
                //End
                //End

                if (data != '') {
                    var isBaxaFlexiPlan = window.location.href.indexOf("bharti-axa-life-term-insurance-plans/flexi-term-plan");
                    if (typeof data.enquiryId !== "undefined" && data.enquiryId !='') { 						
                            var redirectUrl = 'https://termlife.policybazaar.com/quotes/'+encodeURIComponent(data.enquiryId) +'?refId='+encodeURIComponent(data.enquiryId)+'&isMatrixLeadCreated=' + data.isMatrixLeadCreated+'&iscom=1&isProgressiveJourney=true&isMobileDefault=true';
                            if(isBaxaFlexiPlan > '-1')
                                    redirectUrl += '&pid=20';
                            else if (typeof passedPid !== "undefined" && passedPid  !=''){
                                    redirectUrl += '&pid='+passedPid;
                            }
                            
                            GA360(data.matrixleadId,data.enquiryId,data.customerId,'','fresh');//leadId,enquiryId,customerId,bookingId,policyType
                            GA360FormSubmit('formSubmitSuccess');
                            window.top.location.href = redirectUrl+'&iscom=1';
                    }else{
                    GA360FormSubmit('formSubmitFailed');
                }
                }else{
                    GA360FormSubmit('formSubmitFailed');
                }
                $(this).removeClass('loading');
                //data: return data from server            
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            //console.log('ok' + textStatus);
            $(this).removeClass('loading');
            GA360FormSubmit('formSubmitFailed');
        }
    });
    }
    return false;
}
