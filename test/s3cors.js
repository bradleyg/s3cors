var should = require('should')
var moment = require('moment')

var s3cors = require('../index.js')

moment.utc = function(){return this}
moment.add = function(){return this}
moment.format = function(){
  return '2013-01-08T16:26:27Z'
}

var dummy = JSON.stringify({
  url: 'https://node-cors.s3-eu-west-1.amazonaws.com/',
  data: {
    key: '${filename}',
    AWSAccessKeyId: 'SD9SDF9G8G97SDFG9',
    acl: 'public-read',
    policy: 'eyJleHBpcmF0aW9uIjoiMjAxMy0wMS0wOFQxNjoyNjoyN1oiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJub2RlLWNvcnMifSx7ImFjbCI6InB1YmxpYy1yZWFkIn0seyJzdWNjZXNzX2FjdGlvbl9zdGF0dXMiOiIyMDEifSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdLFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiIl1dfQ==',
    signature: 'F28BNPkFPZIS8bzB0QU1GttlJTk=',
    success_action_status: 201,
    'Content-Type': '$Content-Type'
  }
})

describe('s3cors', function (){
  it('should return correct dummy data', function(done){

    var s3Form = JSON.stringify(s3cors.create({
      "key": "SD9SDF9G8G97SDFG9",
      "secret": "sdf8sfd9fdg98g9sd8f7gsdf98g7sdfgsdfg987sdf",
      "bucket": "node-cors",
      "acl": "public-read",
      "region": "eu-west-1"
    }))

    s3Form.should.equal(dummy)

    done()
  })
})