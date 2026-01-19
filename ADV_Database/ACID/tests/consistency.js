const readline = require("readline");
const { withTransaction } = require("../db/transaction");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise(res => rl.question(q, res));

(async () => {
  try {
    const name = await ask("Account name: ");
    const amount = Number(await ask("Force balance to (negative): "));

    await withTransaction(async (client) => {
      await client.query(
        "UPDATE accounts SET balance = $1 WHERE name = $2",
        [amount, name]
      );
    });

  } catch (err) {
    console.error("Consistency violation caught:", err.message);
  } finally {
    rl.close();
  }
})();
