(function () {
    'use strict';

    window.MessageBox = MessageBox;

    var defaultOptions = {
        displayFields: true,
        maxItems     : 0,
        rowElement   : 'tr',
        fieldElement : 'td',
    };

    function MessageBox(containerSelector, fields, dataSet, options) {
        var option;

        this.container  = d3.select(containerSelector);
        this.fields     = fields;
        this.options    = {};

        if (!options && dataSet) {
            options = dataSet;
            dataSet = null;
        }

        options = options || {};
        for (option in defaultOptions) {
            if (defaultOptions.hasOwnProperty(option)) {
                this.options[option] = typeof(options[option]) !== 'undefined' ?
                    options[option] :
                    defaultOptions[option];
            }
        }

        this.container.classed('message-box-container', true);
        this.update(dataSet || []);
    }

    MessageBox.prototype.update = function(dataSet) {
        var fields = this.fields,
            matrix = toMatrix(fields, dataSet.slice(- this.options.maxItems), this.options.displayFields),
            rows   = this.container.selectAll('.message-box-row').data(matrix);

            rows.selectAll('.message-box-field').data(identity).text(String);

            rows.enter().insert(this.options.rowElement)
                .classed('message-box-row', true)
                .selectAll('.message-box-field').data(identity).enter().append(this.options.fieldElement)
                    .attr('class', function (d, i) {
                        return 'message-box-field message-box-field-' + fields.names[i];
                    })
                    .text(String);

            rows.exit().remove();
    };

    function identity(i) {
        return i;
    }

    function toMatrix(fields, dataSet, insertFieldNames) {
        var matrix = [],
            key, data, index, row, fieldName;

        if (insertFieldNames) {
            matrix.push(fields.labels);
        }
        for (key in dataSet) {
            if (dataSet.hasOwnProperty(key)) {
                row = [];
                data = dataSet[key];
                for (fieldName in data) {
                    if (data.hasOwnProperty(fieldName)) {
                        index = fields.names.indexOf(fieldName);
                        if (index >= 0) {
                            row[index] = data[fieldName];
                        }
                    }
                }
                matrix.push(row);
            }
        }
        return matrix;
    }
}());
