const { Client } = require('tplink-smarthome-api');
const cron = require('node-cron');

const client = new Client();

console.log('searching for devices...');

client.startDiscovery().on('device-new', async device => {
    const sysInfo = await device.getSysInfo();

    if (sysInfo) {
        console.log('device found:', sysInfo);
        console.log('starting panel lights job...');

        cron.schedule('0 4,10 * * *', () => {
            console.log('toggling power...');
            device.togglePowerState();
        });
    }
});
