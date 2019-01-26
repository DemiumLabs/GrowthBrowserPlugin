// ==UserScript==
// @name         Instagram Tagger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.js
// @require https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js

// @resource customCSS https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css
// @resource customCSS https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css

// ==/UserScript==

(function() {
    'use strict';

    console.log('instagram hacks');

    var taxes = [

        {code:'1a', option: 'Photography Landscape'},
        {code:'1b', option: 'Photography IG'},
        {code:'2a', option: 'Sport Mountain'},
        {code:'2c', option: 'Sport Snow'},
        {code:'2b', option: 'Sport Water'},
        {code:'2c', option: 'Sport Relax'},
        {code:'2d', option: 'Sport Extreme'},
        {code:'3a', option: 'Food Random'},
        {code:'3b', option: 'Food Vegan'},
        {code:'4a', option: 'Culture Asia'},
        {code:'4b', option: 'Culture Europe'},
        {code:'4c', option: 'Culture South America'},
        {code:'4d', option: 'Culture North America'},
        {code:'4e', option: 'Culture Africa'},
        {code:'4f', option: 'Culture Polar'},
        {code:'5a', option: 'Fashion'},
        {code:'6a', option: 'Eco Traveling'}

    ];

    var passporterActive = "";

    var s_ajaxListener = new Object();
    s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
    s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
    s_ajaxListener.callback = function () {
        doStuff();
        insertSelect();
        // this.method :the ajax method used
        // this.url    :the url of the requested script (including query string, if any) (urlencoded)
        // this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
    }

    XMLHttpRequest.prototype.open = function(a,b) {
        if (!a) a='';
        if (!b) b='';
        s_ajaxListener.tempOpen.apply(this, arguments);
        s_ajaxListener.method = a;
        s_ajaxListener.url = b;
        if (a.toLowerCase() == 'get') {
            s_ajaxListener.data = b.split('?');
            s_ajaxListener.data = s_ajaxListener.data[1];
        }
    }

    XMLHttpRequest.prototype.send = function(a,b) {
        if (!a) a='';
        if (!b) b='';
        s_ajaxListener.tempSend.apply(this, arguments);
        if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
        s_ajaxListener.callback();
    }






  //  if (! insertSelect()) {
        window.addEventListener ("load", insertSelect, false);
  //  }

    function insertSelect(){
        if(!document.getElementById('passporterTaxSelector')){
            let select = $('<select>')
                .on('change',event=> passporterActive = select[0].value)
                .attr('id','passporterTaxSelector')
                .addClass('Di7vw').addClass('pbgfb').addClass('LWmhU')
                .append($('<option>').text('select a passporter interest'))
                .appendTo($('div.MWDvN')[0]);

            taxes.map((tax)=>{select.append($('<option>').attr('value',tax.code).text(tax.code  + ' - ' + tax.option))});

        }

        
    }


    function doStuff(){
            $('div.v1Nh3').off('mouseenter');


            $('div.v1Nh3').on('mouseenter',(event)=>{
                setTimeout(()=>{
                    let link = $('a',event.currentTarget)[0];
                    let list = $('ul',link)[0];
                    $('<button>').addClass('_0mzm- sqdOP  L3NKy _4pI4F')
                        .attr('value',link)
                        .on('click',click)
                        .text('add to ' + passporterActive).appendTo($('<li>').appendTo(list));
                },1);
            });

            function click(event){

                event.preventDefault();
                $(event.currentTarget).text('adding to ' + passporterActive);
                let data = {
                                   link:event.currentTarget.value,
                                   passporterInterest:passporterActive

                               };

                $.ajax({
                    type: 'GET',
                    url: 'https://api.instagram.com/oembed?callback=&url=' + data.link, //You must define 'Url' for yourself
                    cache: false,
                    dataType: 'json',
                    jsonp: false,
                    success: function (result) {
                        data.media_id = result.media_id;
                        data.row = result;

                            $.ajax({
                               type: "POST",
                               url: 'https://api.test.passporterapp.com/api/Taggers',
                               data: JSON.stringify(data),
                               success: (result)=>{
                                   $(event.currentTarget).text('added to ' + passporterActive);
                                   console.log(result);
                               },
                               dataType: 'json',
                               contentType: "application/json"
                           });
                    }
                });





               // $('<div>').addClass('_2dDPU vCf6V').text('holamundo').appendTo('body').modal();

                return false;
            }
        }
})();