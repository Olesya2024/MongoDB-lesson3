
const redis = require('redis');
const client = redis.createClient();

async function main() {
    await client.connect();

    await client.zAdd('ratings', [
        { score: 10, value: 'mysql' },
        { score: 20, value: 'postgresql' },
        { score: 30, value: 'mongodb' },
        { score: 40, value: 'redis' }
    ]);
    console.log('Рейтинги добавлены');

    await client.zIncrBy('ratings', 15, 'mysql');
    console.log('Значение mysql увеличено на 15');

    await client.zRemRangeByRank('ratings', -1, -1);
    console.log('Элемент с максимальным значением удалён');

    const rank = await client.zRank('ratings', 'mysql');
    console.log(`Место mysql в рейтинге: ${rank + 1}`);

    await client.quit();
}

main().catch(console.error);
