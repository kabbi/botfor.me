'use strict';

const NomadClient = require('./NomadClient');

NomadClient.job.lastAllocation({ jobId: 'flow:demo-flow' }).then(allocation => {
  console.log(allocation);
}, error => {
  console.log(error);
});
