ng-evaporate
============

This is a demo using

- NodeJS
- AngularJS
- [EvaporateJS][1]

#### how to

Install npm dependencies

```sh
npm install
```

Setup your S3 bucket, enable cors, and start the server using your AWS credentinals as env variables. If you configured everything correctly the demo should work out of the box.

```sh
AWS_ACCESS_KEY=your_aws_access_key AWS_SECRET_KEY=your_aws_secret AWS_BUCKET=your_bucket_name node index.js
```

I will be turning this into a directive some time soon. But this is my proof of concept.

[1]:https://github.com/TTLabs/EvaporateJS