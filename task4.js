
const redis = require('redis');
const client = redis.createClient();

async function main() {
    await client.connect();

    await client.functionLoad('REPLACE LUA', `
        redis.register_function("store_sqrt", function(keys, args)
            local key = keys[1]
            local value = tonumber(args[1])
            local sqrt_value = math.sqrt(value)
            redis.call("SET", key, sqrt_value)
        end)
    `);

    console.log('Функция store_sqrt сохранена');

    await client.fCall('store_sqrt', ['sqrt_result'], ['16']);
    const result = await client.get('sqrt_result');
    console.log('Квадратный корень сохранён:', result);

    await client.quit();
}

main().catch(console.error);
