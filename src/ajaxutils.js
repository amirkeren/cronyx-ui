import axios from 'axios';

axios.defaults.baseURL = 'manage/scheduling/';

export function triggerInfo(triggerName, groupName) {
  return axios.get('triggers', { params: {
      name: triggerName,
      group: groupName
    }});
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
