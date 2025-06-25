
const redis = require('redis');
const client = redis.createClient();

async function main() {
    await client.connect();

    await client.set('index', 'index precalculated content');
    console.log('Ключ index создан');

    const exists = await client.exists('index');
    console.log('Ключ index существует:', exists === 1);

    const ttl = await client.ttl('index');
    console.log('TTL ключа index:', ttl);

    await client.persist('index');
    console.log('Удаление ключа index отменено');

    await client.quit();
}

main().catch(console.error);
