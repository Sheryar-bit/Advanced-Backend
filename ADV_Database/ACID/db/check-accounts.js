const { pool } = require("./index");

(async () => {
    try {
        const res = await pool.query("SELECT * FROM accounts ORDER BY id ASC");

        console.log("\n--- Current Accounts ---");
        console.table(res.rows);
        console.log("-----------------------\n");

    } catch (err) {
        console.error("Failed to fetch accounts:", err.message);
    } finally {
        process.exit();
    }
})();
