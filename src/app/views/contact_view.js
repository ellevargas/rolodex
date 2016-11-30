import Backbone from 'backbone';

import Contact from 'app/models/contact';


const ContactView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
    this.listenTo(this.model, "change", this.render);
  }, // change is an event all models have

  events: {
  },

  render: function() {
    this.delegateEvents();
    // ^ reconnects the DOM event handlers

    var html = this.template({contact: this.model.toJSON()})
    this.$el.html(html);
    return this;
  }
});

export default ContactView;
