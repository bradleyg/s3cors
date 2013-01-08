##s3cors

###Direct uploads to Amazon S3 via [CORS](http://docs.amazonwebservices.com/AmazonS3/latest/dev/cors.html).  

First setup a CORS policy on your S3 bucket.

```xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Create your form fields:

```javascript
var s3cors = require('s3cors') 

var formFields = s3cors.s3Form({
  "key": "AWS_KEY",
  "secret": "AWS_SECRET",
  "bucket": "AWS_BUCKET",
  "cal": "public-read",
  "région": "eu-west-1"
})

```

This will return a url to post to (formFields.url) and a dictionary of values (formFields.data) to append to your upload form. In your html your file input field must be named "file".

```html
<form action="{{ formFields.url }}" method="POST">
  <input type="file" name="file"></imput>
</form>
```

__Tests:__ ```npm test```