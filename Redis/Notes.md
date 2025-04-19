# **Redis Notes for Beginners**

---

## **1. What is Redis?**
- **Redis (REmote DIctionary Server)** is an open-source, in-memory data store used as a:
  - Database
  - Cache
  - Message broker
- It stores data in **key-value** pairs.
- Written in **C**, known for **high performance and low latency**.

---

## **2. Key Features of Redis**
- **In-memory storage** (very fast)
- **Persistence** (can save data to disk)
- **Data structures support**: Strings, Lists, Sets, Hashes, Sorted Sets, Streams, Bitmaps, HyperLogLogs
- **Atomic operations**
- **Pub/Sub messaging system**
- **Replication** and **High Availability**
- **Lua Scripting**
- **Built-in LRU eviction**

---

## **3. Why Use Redis?**
- Caching layer to reduce database load
- Session management (e.g., in web apps)
- Real-time analytics
- Leaderboards (e.g., in gaming)
- Message queues
- Rate limiting

---

## **4. Installing Redis**
### On Ubuntu:
```bash
sudo apt update
sudo apt install redis-server
```
### Check if Redis is running:
```bash
redis-cli ping
# Output: PONG
```

---

## **5. Redis CLI Commands**
- **Set a key**:  
  `SET name "Sheryar"`
- **Get a key**:  
  `GET name`
- **Delete a key**:  
  `DEL name`
- **Check if a key exists**:  
  `EXISTS name`
- **List all keys**:  
  `KEYS *`
- **Expire a key** (TTL in seconds):  
  `EXPIRE name 60`
- **Check remaining TTL**:  
  `TTL name`
- **Rename a key**:  
  `RENAME name new_name`

---

## **6. Data Types in Redis**
### 1. **String**
- Basic data type
- Example:
  ```bash
  SET counter 1
  INCR counter    # counter = 2
  DECR counter    # counter = 1
  ```

### 2. **List**
- Ordered list of strings
- Example:
  ```bash
  LPUSH fruits apple
  LPUSH fruits banana
  LRANGE fruits 0 -1
  ```

### 3. **Set**
- Unordered collection of unique strings
- Example:
  ```bash
  SADD colors red blue green
  SMEMBERS colors
  ```

### 4. **Hash**
- Map of fields and values (like a JSON object)
- Example:
  ```bash
  HSET user:1 name "Ali" age "25"
  HGETALL user:1
  ```

### 5. **Sorted Set**
- Like Set, but with scores (used for leaderboards)
- Example:
  ```bash
  ZADD leaderboard 100 "Alice" 200 "Bob"
  ZRANGE leaderboard 0 -1 WITHSCORES
  ```

---

## **7. Persistence Options**
1. **RDB (Redis Database Backups)**  
   - Snapshot of DB at specific intervals  
   - Good for backups, less disk I/O

2. **AOF (Append Only File)**  
   - Logs every write operation  
   - Better durability  
   - Can be configured to fsync (save to disk) every second or after each command

---

## **8. Redis as a Cache**
- Set key with expiry:
  ```bash
  SET user:100 "Ali" EX 60  # expires in 60 sec
  ```
- Useful for storing frequently accessed data temporarily

---

## **9. Pub/Sub in Redis**
- Messaging system:
  ```bash
  SUBSCRIBE news
  PUBLISH news "Redis 7.0 released!"
  ```

---

## **10. Redis Configuration**
- File: `/etc/redis/redis.conf`
- Key configs:
  - `bind 127.0.0.1`
  - `requirepass yourpassword` (set auth)
  - `maxmemory` (limit RAM usage)
  - `appendonly yes` (enable AOF)

---

## **11. Security Tips**
- Use **password authentication**
- Bind Redis only to trusted IPs
- Don't expose Redis directly to the internet
- Use firewalls and Redis ACLs

---

## **12. Redis Clients**
- Redis has clients for many languages:
  - Node.js: `ioredis`, `redis`
  - Python: `redis-py`
  - Java: `Jedis`
  - Go: `go-redis`

---

## **13. Use Cases in Real World**
- Web session store (e.g., with Express.js)
- API rate limiting
- Queue system (Redis + BullMQ)
- Leaderboards in games
- Cache for database queries
