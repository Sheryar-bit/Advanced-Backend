const readline = require("readline");
const { pool } = require("../db");
const { delay } = require("../utils/delay");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise(res => rl.question(q, res));

(async () => {
  const client = await pool.connect();

  try {
    const name = await ask("Account to lock: ");

    await client.query("BEGIN");

    await client.query(
      "SELECT * FROM accounts WHERE name = $1 FOR UPDATE",
      [name]
    );

    console.log(`Row locked for ${name}. Waiting 10 seconds...`);
    await delay(10000);

    await client.query("COMMIT");
    console.log("Transaction committed");

  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
    rl.close();
  }
})();
