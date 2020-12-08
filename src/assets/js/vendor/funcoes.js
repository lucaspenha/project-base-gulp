;(function () {
    'use strict';

    window.mask = function () {
        $('[data-input-mask]').each(function () {
            var $this, mask, multiMask, options;

            $this = $(this);
            mask  = $this.data('input-mask');

            if (mask.search(/\|/) !== -1) {
                mask = mask.split('|');

                multiMask = function (val) {
                    return val.replace(/\D/g, '').length === 11 ? mask[0] : mask[1];
                };

                options = {
                    clearIfNotMatch: true,
                    onKeyPress: function (val, e, field, options) {
                        field.mask(multiMask.apply({}, arguments), options);
                    }
                };

                $this.mask(multiMask, options);
            } else {
                $this.mask(mask, {clearIfNotMatch: true});
            }
        });
    };

}());
