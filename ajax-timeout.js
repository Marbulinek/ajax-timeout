/*
 * jQuery Ajax Timeout
 *
 * Copyright (c) 2019 Lukas Caniga
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/Marbulinek/ajax-timeout
 *
 * Version: 1.0
 *
 */

; (function ($) {

    $.ajaxTimeout = function (options) {
        var timer = null;

        // Defaults settings
        var settings = $.extend({
            type: "POST",
            url: "example.com/apiEndPoint",
            data: {},
            timeout: 180000, // 3 mins default
            logEnabled: false,
            browserTimeout: 0,
            onSuccess: function (data) {
                console.log(data);
            },
            onError: function (data) {
                console.log(data);
            }
        }, options);

        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            timeout: settings.browserTimeout,
            success: function(data) {
                settings.onSuccess(data);
            },
            error: function(data){
                settings.onError(data);
            },
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.onprogress = function (evt) {
                    if (settings.logEnabled) {
                        console.log("Upload: " + Math.round((evt.loaded / evt.total) * 100) + "%");
                    }
                    prepareTimeout(xhr, settings.timeout);
                };
        
                xhr.onprogress = function (evt) {
                    if (settings.logEnabled) {
                        console.log("Download: " + Math.round((evt.loaded / evt.total) * 100) + "%");
                    }
                    prepareTimeout(xhr, settings.timeout);
                };
        
                xhr.upload.onload = function () {
                    if (settings.logEnabled) {
                        console.log("Upload completed!");
                    }
                };
        
                xhr.onload = function () {
                    if (settings.logEnabled) {
                        console.log("Download completed!");
                    }
                };

                xhr.upload.onloadend = function () {
                    clearTimeout(timer);
                };
                xhr.uploadend = function () {
                    clearTimeout(timer);
                };
                return xhr;
            }
        });

        function prepareTimeout(xhr, timeout) {
            if (timer != null) {
                clearTimeout(timer);
                timer = null;
            };

            timer = setTimeout(function () {
                if (settings.logEnabled) {
                    console.log("Closing connection!" + timer);
                }
                xhr.responseText = "timeout";
                xhr.abort();
            }, timeout);
        }
    };
}(jQuery));