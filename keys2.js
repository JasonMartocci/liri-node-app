exports.world = function() {
  console.log('Hello World');
}

var Twitter = require('twitter');

exports.twitterKeys = new Twitter({
  consumer_key: 'FDvRzy6S3u2eGD0Q5ao8L36FQ',
  consumer_secret: '3kDtvZvXS09A6mTS1ypABKAjd7853pAKYcPLLAyyJM9SMFaG6F',
  access_token_key: '2331033409-76NYiYct9DHoC2Kzgc3O5xnEfmraQIfKkFqx7Pr',
  access_token_secret: 'dda5LLQOZ2ZDnDjozcaVPUXWog4ecfIh4t28rv49Z77n5',
});