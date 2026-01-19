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
      // First half succeeds
      await transferFunds(client, from, to, amount);

      // Force failure AFTER deduction
      throw new Error("Simulated crash after debit");
    });

  } catch (err) {
    console.error("Atomicity test result:", err.message);
  } finally {
    rl.close();
  }
})();
