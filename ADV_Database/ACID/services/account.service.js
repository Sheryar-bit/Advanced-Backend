const { delay } = require("../utils/delay");

async function transferFunds(client, from, to, amount) {
  // Lock sender row (Isolation)
  const sender = await client.query(
    "SELECT balance FROM accounts WHERE name = $1 FOR UPDATE",
    [from]
  );

  if (sender.rows.length === 0) {
    throw new Error("Sender not found");
  }

  if (sender.rows[0].balance < amount) {
    throw new Error("Insufficient balance");
  }

  await client.query(
    "UPDATE accounts SET balance = balance - $1 WHERE name = $2",
    [amount, from]
  );

  // Giving delay to test isolation
  await delay(5000);

  const receiver = await client.query(
    "SELECT id FROM accounts WHERE name = $1",
    [to]
  );

  if (receiver.rows.length === 0) {
    throw new Error("Receiver not found");
  }

  await client.query(
    "UPDATE accounts SET balance = balance + $1 WHERE name = $2",
    [amount, to]
  );
}

async function getBalance(client, name) {
  const res = await client.query(
    "SELECT balance FROM accounts WHERE name = $1",
    [name]
  );

  if (res.rows.length === 0) {
    throw new Error("Account not found");
  }

  return res.rows[0].balance;
}

module.exports = { transferFunds, getBalance };
