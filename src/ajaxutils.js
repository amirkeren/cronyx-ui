import axios from 'axios';

axios.defaults.baseURL = 'manage/scheduling/';

export function triggerInfo(triggerName, groupName) {
  return axios.get('triggers', { params: {
      name: triggerName,
      group: groupName
    }});
}

export function getAllJobs() {
  return axios.get('jobs/all');
}

export function createImmediateTriger(triggerName, groupName, jobName, jobGroup, jobData) {
  return axios.post('/triggers/new/immediate', {
  	"triggerKey": {
  		"name": triggerName,
  		"group": groupName
  	},
  	"jobKey": {
  		"name": jobName,
  		"group": jobGroup
  	},
  	"triggerData": JSON.parse(jobData)
  });
}

export function createCronTriger(triggerName, groupName, jobName, jobGroup, jobData, cronExp) {
  return axios.post('/triggers/new/cron', {
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
  });
}
