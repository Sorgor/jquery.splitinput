$.fn.extend({
    splitInput: function(settings) {
        var _this = this;

        _this.inputs = [];
        _this.parent = $(this).parent();

        // main input, that will be splitted
        // finally will contain joined globalBuffer value
        _this.globalInput = $(this);

        // an array, containing vals of inputs
        _this.globalBuffer = [];

        _this.parent.append(_this.globalInput);

        // setting and extending default settings
        _this.settings = $.extend({
            // template of a replacing inputs 
            // format for input is {num} where num is maxlength
            // eg. {3} - {3} - {2} / {2} matches 123 - 456 - 78 - 90 
            // and splits one input into 4 inputs
            template: "{10}", 

            // classname applying to an inputs
            class: "",

            // if true, cursor jumps to next input after filling prev one
            autoJump: true,

            //pattern attribute of an inputs
            pattern: "",

            //transformation function applied to entered chars
            transform: function(string){return string;}
        }, settings);

        _this.regInput = function(input){
            _this.inputs.push(input);
        };

        _this.replacedString = settings.template.replace(/\{(\d*)\}/g, function(matched, size){
            var el = $('<input>').attr('type', 'text').addClass(settings.class);

            if (size)
                el.attr('maxlength', size)

            if (settings.pattern) 
                el.attr('pattern', settings.pattern)

            var helperDiv = $('<div>');
            var toReturn = helperDiv.append(el).html()
            helperDiv.empty().remove();
            return toReturn;
        });

        _this.parent.append(_this.replacedString);
        $(_this).attr('type', 'hidden');

        _this.inputs = []
        _this.buffer = []
        _this.parent.find('input[type=text]').each(function(index, item){
            _this.inputs.push(item);
            if (_this.settings.autoJump)
                $(item).keypress(function(e){
                    var k = e.which;
                    _this.buffer.push(settings.transform(String.fromCharCode(k)));
                    $(this).val(_this.buffer.join(''))
                    _this.updateGlobal();
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
                    _this.updateGlobal();
                });
        });

        _this.getGlobalBuffer = function(){
            _this.globalBuffer = [];
            _this.parent.find('input[type=text]').each(function(index, item){
                _this.globalBuffer.push($(this).val());
            })
            return _this.globalBuffer;
        }
        _this.updateGlobal = function(){
            _this.globalInput.val(_this.getGlobalBuffer().join(''));
            _this.globalInput.trigger('change');
        }
    }
});
