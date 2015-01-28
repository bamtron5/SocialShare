(function ($) {
    if (typeof ($.delta) != 'undefined' && typeof ($.delta.socialShare) != 'undefined') return;

    $.delta = $.delta || {};
    var addthis_config = addthis_config || {}, addthis_share = addthis_share || {};
    addthis_config.pubid = 'ra-52f39a2c47fa1dc0';

    var SocialShare = function () {
        this.loadModalShare = function (viewModel) {
            var tbx = document.getElementById(viewModel.Id());
            var svcs = {
                facebook: 'facebook',
                twitter: 'twitter',
                pinterest: 'pinterest',
                google: 'google',
                email: 'email'
            };
            var metaOg = {
                title: encodeURIComponent(viewModel.ModelName()),
                image: document.location.protocol + viewModel.ProductImageUrl(),
                description: encodeURIComponent(viewModel.Description1()),
            };

            for (var key in metaOg) {
                var cur = $('meta[name*="og:' + key + '"]');
                $(cur).attr('Content', metaOg[key]);
            }

            for (var s in svcs) {
                tbx.innerHTML += '<a addthis:url="' + document.location.protocol + viewModel.ProductUrl() + '" class="fa addthis_button_' + svcs[s] + '"></a>';

            }

            if (!addthis_config) {
                addthis_config = this.addthis_config;
            }

            addthis.toolbox(viewModel.Id);
            window.addthis.update('share', 'url');
            window.addthis.toolbox('.addthis_toolbox', addthis_config, addthis_share);
            $(".email-share").each(function () {
                ko.applyBindings($.onestop.catalog.viewModel.quickShopViewModel(), this);
            });
        };

        this.loadDetailsShare = function () {
            var viewModel = $.onestop.product.viewModel, tbx = document.getElementById(viewModel.Id());
            var svcs = {
                facebook: { name: 'facebook', cssClass: 'fa-facebook' },
                twitter: { name: 'twitter', cssClass: 'fa-twitter' },
                pinterest: { name: 'pinterest', cssClass: 'fa-pinterest' },
                google: { name: 'google', cssClass: 'fa-google' },
                email: { name: 'email', cssClass: 'fa-envelope' }
            };

            for (var s in svcs) {
                tbx.innerHTML += '<a addthis:url="' + document.location.protocol + viewModel.ProductUrl() + '" class="fa ' + svcs[s].cssClass + ' addthis_button_' + svcs[s].name + '"></a>';
            }

            addthis.toolbox(viewModel.Id());
            window.addthis.update('share', 'url');
            window.addthis.toolbox('.addthis_toolbox', addthis_config, addthis_share);
            $(".email-share").each(function () {
                ko.applyBindings($.onestop.product.viewModel, this);
            });
        };

        this.removeShare = function (viewModel) {
            var tbx = document.getElementById(viewModel.Id());

            $(tbx).html('');
        }
    };

    $.delta.socialShare = new SocialShare();

    $(window).on("load", function () {
        onestop.loadScript("//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-52f39a2c47fa1dc0", function () {
            if ($.onestop.common.pageData.pagetype == "product-details") {
                $(".socialshare").each(function () {
                    ko.applyBindings($.onestop.product.viewModel, this);
                });
                $.delta.socialShare.loadDetailsShare($.onestop.common.pageData.product);
            }
        });
    });
})(jQuery);