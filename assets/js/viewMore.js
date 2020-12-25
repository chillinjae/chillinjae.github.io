/* I (Young Kim) edited codes of "https://github.com/J911/jekyll-infinite-scroll" 
    to change 'infinite scroll function' to 'click to view more' */

/* This fuction is disabled for now 
    due to the dependency issue of Jekyll Paganation in Github Pages (version issue) */


'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteScroll = function () {
    function InfiniteScroll(path, wrapperId, btn, message) {
        _classCallCheck(this, InfiniteScroll);

        if (path === undefined || wrapperId === undefined || btn === undefined) throw Error('no parameter.');
        this.path = path;
        this.pNum = 2;
        this.wNode = document.getElementById(wrapperId);
        this.wrapperId = wrapperId;
        this.enable = true;
        this.btn = document.getElementById(btn);
        this.message = document.getElementById(message);

        this.viewMoreClick();
    }

    _createClass(InfiniteScroll, [{
        key: 'viewMoreClick',
        value: function viewMoreClick() {
            var _this = this;

            _this.btn.onclick = function (ev) {
                var http = new XMLHttpRequest();
                var url = location.origin + _this.path + (_this.pNum + 1);
                http.open('HEAD', url, false);
                http.send();
                _this.getNewPost();
                if (http.status == 404) {
                    _this.btn.style.display = "none";
                    _this.message.style.display = "inline-block";
                }
            };
        }
    }, {
        key: 'getNewPost',
        value: function getNewPost() {
            var _this2 = this;

            this.enable = false;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        _this2.pNum++;
                        var childItems = _this2.getChildItemsByAjaxHTML(xmlhttp.responseText);
                        _this2.appendNewItems(childItems);
                    } else {
                        _this2.btn.style.display = "none";
                        _this2.message.style.display = "inline-block";
                    }
                    return _this2.enable = true;
                }
            };

            xmlhttp.open("GET", ( location.origin + this.path + this.pNum ), true);
            xmlhttp.send();
        }
    }, {
        key: 'getChildItemsByAjaxHTML',
        value: function getChildItemsByAjaxHTML(HTMLText) {
            var newHTML = document.createElement('html');
            newHTML.innerHTML = HTMLText;
            var childItems = newHTML.querySelectorAll('#' + this.wrapperId + ' > *');
            return childItems;
        }
    }, {
        key: 'appendNewItems',
        value: function appendNewItems(items) {
            var _this3 = this;

            items.forEach(function (item) {
                _this3.wNode.appendChild(item);
            });
        }
    }]);

    return InfiniteScroll;
}();
