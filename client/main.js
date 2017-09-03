import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

Tasks = new Mongo.Collection("tasks");

// Subscribing to the published tasks
Meteor.subscribe("tasks");

// Show/Hide functionality
Template.body.helpers({
   tasks: function () {
      if (Session.get("hideCompleted")) {
         // If hide completed is checked, filter tasks
         return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
         // Otherwise, return all of the tasks
         return Tasks.find({}, {sort: {createdAt: -1}});
      }
   },
	
   hideCompleted: function () {
      return Session.get("hideCompleted");
   },
	
   incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
   }
	
});

// Events for creating new tasks and Show/Hide functionality. Calling methods from the server

Template.body.events({
   "submit .new-task": function (event) {
      event.preventDefault();
      var text = event.target.text.value;
		
      Meteor.call("addTask", text);
      event.target.text.value = "";
   },
	
   "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
   }
	
});

// Events for Deleting and Check/Uncheck functionality
Template.task.events({
   "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
   },
	
   "click .delete": function () {
      Meteor.call("deleteTask", this._id);
   }
	
});