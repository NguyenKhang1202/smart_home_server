const mqtt = require("mqtt");
const smart_home_hat = "smart_home_humidity_and_temperature";
const smart_home_cd = "smart_home_control_device";
const { insertDataSensorDb } = require("../db/sensor.db");

const host_mqtt = "broker.hivemq.com";
const port_mqtt = "1883";
const clientId = `8a673344-cc1c-4bfc-9f68-bab47bbbf845`;
const connectUrl = `mqtt://${host_mqtt}:${port_mqtt}`;

// thực hiện tạo connect tới mqtt broker
var mqttClient = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "smart_home",
  password: "123456",
  reconnectPeriod: 1000,
});

mqttClient.once("connect", function () {
  console.log("Connect to mqtt successfully");
  mqttClient.subscribe(smart_home_hat);

  mqttClient.on("message", async (topic, msg) => {
    const message = JSON.parse(msg.toString());
    const { humidityAir, temperature } = message;

    await insertDataSensorDb({ humidityAir, temperature });
  });
});

mqttClient.on("error", function (error) {
  console.log("Unable to connect: " + error);
  process.exit(1);
});

module.exports = mqttClient;
