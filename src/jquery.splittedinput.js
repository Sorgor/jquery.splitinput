$.fn.extend({
    splitInput: function(settings) {
        var _this = this;

        _this.inputs = [];
        _this.parent = $(this).parent();

        _this.settings = $.extend({
            template: "{10}",
            class: "",
            autoJump: true
        }, settings);

        _this.regInput = function(input){
            _this.inputs.push(input);
        };

        _this.replacedString = settings.template.replace(/\{(\d*)\}/g, function(matched, size){
            var el = $('<input>');
            if (size)
                el.attr('maxlength', size)

            var helperDiv = $('<div>');
            var toReturn = helperDiv.append(el).html()
            helperDiv.empty().remove();
            return toReturn;
        });

        $(this).replaceWith(_this.replacedString);

        _this.inputs = []
        _this.parent.find('input').each(function(index, item){
            _this.inputs.push(item);
            if (_this.settings.autoJump)
                $(item).keypress(function(e){
                    if ($(this).val().length >= ($(this).attr('maxlength') - 1)) {
                        if (_this.inputs[index + 1])
                            _this.inputs[index + 1].focus()
                    }
                })
        });
    }
});
