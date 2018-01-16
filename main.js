const bbt = require('beebotte');
const googlehome = require('google-home-notifier');
const config = require('config');

const transport = {
  type: 'mqtt',
  apiKey: config.beebotte.apiKey,
  secretKey: config.beebotte.secretKey,
}

const client = new bbt.Stream({transport: transport});

client.on('connected', function() {
  client.subscribe(config.beebotte.channel, config.beebotte.resource, function(message) {
    console.info(message);
    const data = message['data'].shift();

    googlehome.device(data.room, config.googlehome.lang);
    googlehome.ip(config.googlehome.ip);
    googlehome.notify(data.voice, function(res) {

    });
  }, function(err) {
    console.error(err)
  });
});

