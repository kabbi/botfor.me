'use strict';

const request = require('request');
const { nomad_host } = require('../../config');

const interpolate = (string, params) => {
  const result = [];
  string.split(':').forEach((segment, idx) => {
    if (idx === 0) {
      result.push(segment);
    } else {
      const segmentMatch = segment.match(/(\w+)(.*)/);
      const key = segmentMatch[1];
      result.push(params[key]);
      result.push(segmentMatch[2] || '');
      delete params[key];
    }
  });
  return result.join('');
};

const fetch = (url, options) => new Promise((resolve, reject) => {
  request(url, Object.assign({
    json: true,
    timeout: 1000
  }, options), (error, response, body) => {
    if (error) {
      reject(error);
      return;
    }
    if (response.statusCode !== 200) {
      // TODO: pass response and statuscode somehow
      reject({ error, response, body });
      return;
    }
    resolve(body);
  });
});

const getJson = url => params => (
  fetch(`${nomad_host}${interpolate(url, params)}`)
);
const sendData = (url, method) => (params, body) => (
  fetch(`${nomad_host}${interpolate(url, params)}`, { method, body })
);

module.exports = {
  job: {
    list: getJson('/v1/jobs'),
    fetch: getJson('/v1/job/:jobId'),
    create: sendData('/v1/job/:jobId', 'POST'),
    destroy: sendData('/v1/job/:jobId', 'DELETE'),
    evaluations: getJson('/v1/job/:jobId/evaluations'),
    allocations: getJson('/v1/job/:jobId/allocations'),
    lastAllocation(params) {
      return module.exports.job.allocations(params).then(allocations => (
        allocations.sort((a, b) => b.CreateIndex - a.CreateIndex)[0]
      ));
    }
  },
  agent: {
    self: getJson('/v1/agent/self')
  }
};
