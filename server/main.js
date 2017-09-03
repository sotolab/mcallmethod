import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Tasks = new Mongo.Collection("tasks");

Meteor.publish("tasks", function () {
  return Tasks.find({});
});


Meteor.startup(() => {
  // code to run on server at startup
  //Publishing tasks from the server...

});


//Methods for handling MongoDb Tasks collection data...
Meteor.methods({
  addTask: function (text) {
     Tasks.insert({
        text: text,
        createdAt: new Date(),
     });
  },
 
  deleteTask: function (taskId) {
     var task = Tasks.findOne(taskId);
     Tasks.remove(taskId);
  },
 
  setChecked: function (taskId, setChecked) {
     var task = Tasks.findOne(taskId);
     Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});
