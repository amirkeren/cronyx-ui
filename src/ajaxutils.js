import axios from 'axios';

var querystring = require('querystring');

axios.defaults.baseURL = 'manage/scheduling/';

function getTriggers() {
  axios.get('triggers/all')
    .then(res => {
      console.log(res.data);
    })
    .catch(res => {
      console.log(res);
    });
}

function triggerInfo(triggerName, groupName) {
  axios.get('triggers', { params: {
      name: triggerName,
      group: groupName
    }})
    .then(res => {
      console.log(res.data);
    })
    .catch(res => {
      console.log(res);
    });
}

function resumeTrigger(triggerName, groupName) {
  axios.post('triggers/resume', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res);
    });
}

function pauseTrigger(triggerName, groupName) {
  axios.post('triggers/pause', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res);
    });
}

function deleteTrigger(triggerName, groupName) {
  axios.post('triggers/delete', querystring.stringify({ name: triggerName, group: groupName }))
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res);
    });
}

function createImmediateTriger(triggerName, groupName, jobName, jobGroup, jobData) {
  axios.post('/triggers/new/immediate', {
  	"triggerKey": {
  		"name": triggerName,
  		"group": groupName
  	},
  	"jobKey": {
  		"name": jobName,
  		"group": jobGroup
  	},
  	"triggerData": JSON.parse(jobData)
  })
  .then(res => {
    console.log(res);
  })
  .catch(res => {
    console.log(res);
  });
}

function createCronTriger(triggerName, groupName, jobName, jobGroup, jobData, cronExp) {
  axios.post('/triggers/new/cron', {
  	"triggerKey": {
  		"name": triggerName,
  		"group": groupName
  	},
  	"jobKey": {
  		"name": jobName,
  		"group": jobGroup
  	},
  	"triggerData": JSON.parse(jobData),
    "cronExpression": cronExp
  })
  .then(res => {
    console.log(res);
  })
  .catch(res => {
    console.log(res);
  });
}
