var crypto = require('crypto')
var moment = require('moment')

var policy = function(bucket, acl) {
  var e = moment
            .utc()
            .add('minutes', 60)
            .format('YYYY-MM-DDTHH:mm:ss\\Z')

  var c = []
  c.push({bucket: bucket})
  c.push({acl: acl})
  c.push({success_action_status: '201'})
  c.push(['starts-with', '$key', ''])
  c.push(['starts-with', '$Content-Type', ''])

  var s3Policy = JSON.stringify({
    expiration: e,
    conditions: c
  })

  return new Buffer(s3Policy).toString('base64')
}

var signature = function(secret, policy) {
  return crypto
           .createHmac('sha1', secret)
           .update(policy)
           .digest('base64')
}

var create = function(s3) {
  var pol = policy(s3.bucket, s3.acl)
  var sig = signature(s3.secret, pol)
  var url = 'https://' + s3.bucket + '.s3-' + s3.region + '.amazonaws.com/'

  return {
    url: url,
    data: {
      key: '${filename}',
      AWSAccessKeyId: s3.key,
      acl: s3.acl,
      policy: pol,
      signature: sig,
      success_action_status: 201,
      'Content-Type': '$Content-Type'
    }
  }
}

module.exports.create = create