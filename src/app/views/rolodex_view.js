import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import ContactView from 'app/views/contact_view';
import Contact from 'app/models/contact';
import Rolodex from 'app/collections/rolodex';


const RolodexView = Backbone.View.extend({
  initialize: function(options) {
    // Compile a template to be shared between the individual tasks
    this.contactTemplate = _.template($('#tmpl-contact-card').html());

    // Keep track of the <ul> element
    this.listElement = this.$('#contact-cards');

    this.cardList = [];


    console.log(this.model);

    this.model.forEach(function(contact) {
      console.log("I'm in the forEach");
      this.addContact(contact);
    }, this);

    this.listenTo(this.model, "add", this.addContact);

  }, // END OF INITIALIZE FUNCTION

  render: function() {
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our contact list
      this.listElement.append(card.$el);
    }, this);
    return this;
  },

  events: {
    'click .btn-cancel': 'clearInput'
  },

  clearInput: function(event) {
    this.input.name.val('');
    this.input.phoneNumber.val('');
    this.input.email.val('');
  },

  addContact: function(contact) {

    var card = new ContactView({
      model: contact,
      template: this.contactTemplate
    });

    // Add the card to our card list
    this.cardList.push(card);
  }
});

export default RolodexView;
