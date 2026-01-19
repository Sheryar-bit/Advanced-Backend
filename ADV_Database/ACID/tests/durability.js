const readline = require("readline");
const { withTransaction } = require("../db/transaction");
const { transferFunds } = require("../services/account.service");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise(res => rl.question(q, res));

(async () => {
  try {
    const from = await ask("From account: ");
    const to = await ask("To account: ");
    const amount = Number(await ask("Amount: "));

    await withTransaction(async (client) => {
      await transferFunds(client, from, to, amount);
    });

    console.log("Transaction committed successfully");
    console.log("Now stop PostgreSQL and restart it manually.");
    console.log("After restart, check balances — data persists.");

  } catch (err) {
    console.error("Durability test failed:", err.message);
  } finally {
    rl.close();
  }
})();
