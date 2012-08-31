(function (MessageBox) {
    'use strict';

    var data = [],
        cpt  = 0;

    window.onload = function () {
        var boxFields = {
                names : ['date', 'pseudo', 'message'],
                labels: ['Date', 'Pseudo', 'Message'],
            },
            box = new MessageBox(d3.select('#content').append('table').node(), boxFields, { maxItems: 10 }),
            btnMaxItems = document.getElementById('maxItems'),
            btnDisplayFields = document.getElementById('displayFields');

        btnMaxItems.value = box.options.maxItems;
        btnMaxItems.onchange = function () {
            box.options.maxItems = +this.value;
        };

        btnDisplayFields.value = box.options.displayFields;
        btnDisplayFields.onchange = function () {
            box.options.displayFields = !!this.value;
        };

        document.getElementById('add').onclick = function () {
            for (var i = 0; i < 10; i++) {
                (function (num) {
                    setTimeout(function () {
                            data.push({
                                date: moment().format('D/MM/YYYY, HH:mm:ss'),
                                pseudo : 'Pseudo n°'  + num,
                                message: 'Message n°' + num,
                            });
                            box.update(data);
                    }, i * 40);
                }(cpt++));
            }
        };
    };
}(window.MessageBox));
