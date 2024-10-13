/**
 * This plug-in for DataTables 
 * 
 * 
 * 
 * 
 *
 * @name ACMUS widgetbase for DataTables
 * @summary Enables to insert ACM widgets to datatables fields
 * @author [Baro](//acmus.co)
 * @augments DataTables 1.10+
 *
 * @example
 *    DataTable.ext.editorFields.widgetbase = {};
 *    
 *
 *    
*/
(function ($, DataTable) {

  if (!DataTable.ext.editorFields) {
    DataTable.ext.editorFields = {};
  }

  var Editor = DataTable.Editor;

  DataTable.ext.editorFields.widgetbase = {

    create: function (conf) {
      var self = this;
      var widgets = conf.options.widgets;
      var id = Editor.safeId(conf.id);
      var div = $('<div id="' + id + '">' + '</div>');

      $.each(widgets, function (i, widget) {
        var _div = $('<div>');
        widget.options.context = "#" + id;
        _div[widget.name](widget.options);

        // If the widget's value is sent to the server by the dt.editor
        // get it's value asynchronously
        if (widget.toServer) {
          div.on(widget.event, function () {
            conf.value = _div[widget.name]('get');
          });
        }

        div.append(_div);
      });

      conf.div = div;
      return conf.div;
    },

    get: function (conf) {
      return conf.value;
    },

    set: function (conf, val) {
      conf.value = val;
    }
  };

})(jQuery, jQuery.fn.dataTable);
