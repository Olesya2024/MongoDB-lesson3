
const redis = require('redis');

async function pubSubDemo() {
    const subscriber = redis.createClient();
    const publisher = redis.createClient();

    await subscriber.connect();
    await publisher.connect();

    await subscriber.pSubscribe('events*', (message, channel) => {
        console.log(`Сообщение "${message}" получено с канала ${channel}`);
    });

    setTimeout(async () => {
        await publisher.publish('events101', 'Hello there');
    }, 2000);

    setTimeout(async () => {
        await subscriber.quit();
        await publisher.quit();
        console.log('Соединения закрыты');
    }, 5000);
}

pubSubDemo().catch(console.error);
