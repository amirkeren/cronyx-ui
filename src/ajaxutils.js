import axios from 'axios';

var querystring = require('querystring');

axios.defaults.baseURL = 'manage/scheduling/';

function getTriggers() {
  axios.get('triggers/all')
    .then(res => {
      console.log(res.data);
    });
}

function triggerInfo(triggerName, groupName) {
  axios.get('triggers', { params: {
      name: triggerName,
      group: groupName
    }})
    .then(res => {
      console.log(res.data);
    });
}

function resumeTrigger(triggerName, groupName) {
  axios.post('triggers/resume', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    });
}

function pauseTrigger(triggerName, groupName) {
  axios.post('triggers/pause', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    });
}

function deleteTrigger(triggerName, groupName) {
  axios.post('triggers/delete', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    });
}
