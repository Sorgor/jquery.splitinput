$.fn.extend({
    splitInput: function(settings) {
        var _this = this;

        _this.inputs = [];
        _this.parent = $(this).parent();

        _this.settings = $.extend({
            template: "{10}",
            class: "",
            autoJump: true,
            pattern: "",
            transform: function(string){return string;}
        }, settings);

        _this.regInput = function(input){
            _this.inputs.push(input);
        };

        _this.replacedString = settings.template.replace(/\{(\d*)\}/g, function(matched, size){
            var el = $('<input>').attr('type', 'text');

            if (size)
                el.attr('maxlength', size)

            if (settings.pattern) 
                el.attr('pattern', settings.pattern)

            var helperDiv = $('<div>');
            var toReturn = helperDiv.append(el).html()
            helperDiv.empty().remove();
            return toReturn;
        });

        $(this).replaceWith(_this.replacedString);

        _this.inputs = []
        _this.buffer = []
        _this.parent.find('input').each(function(index, item){
            _this.inputs.push(item);
            if (_this.settings.autoJump)
                $(item).keypress(function(e){
                    var k = e.which;
                    _this.buffer.push(settings.transform(String.fromCharCode(k)));
                    $(this).val(_this.buffer.join(''))
                    if ($(this).val().length >= ($(this).attr('maxlength'))) {
                        if (_this.inputs[index + 1])
                        {
                            _this.inputs[index + 1].focus();
                            _this.buffer = [];
                        }
                        else {
                            _this.buffer = [];
                            $(this).blur();
                        }
                    }
                    e.preventDefault();
                });
                $(item).focus(function(e){
                    $(this).val('');
                });
        });
    }
});
