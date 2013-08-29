jquery.splittedInput
================


usage: 

<pre>
$('#splitme').splitInput({
    template: '({3}) {3} - {2} - {2} / {10}',
    class: 'someclass',
    pattern: '\\d*',
    transform: function(string){return string.toUpperCase()}
});
</pre>
