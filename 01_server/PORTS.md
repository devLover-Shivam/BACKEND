# Ports in Networking

A **port** is a logical number used by a computer to identify a specific application or service that is communicating over a network.

An IP address identifies **which machine** should receive the request, while a port identifies **which application/service** on that machine should handle it.

```text
IP Address → Which computer?
Port       → Which application?
```

For example:

```text
http://localhost:3000
```

Here:

* `localhost` → The local machine
* `3000` → The port where our Node.js server is listening

---

## Port Number Range

Port numbers range from:

```text
0 → 65535
```

They are divided into three main categories.

| Port Range    | Type                      | Purpose                                         |
| ------------- | ------------------------- | ----------------------------------------------- |
| `0–1023`      | Well-Known Ports          | Used by standard protocols and services         |
| `1024–49151`  | Registered Ports          | Used by applications and specific services      |
| `49152–65535` | Dynamic / Ephemeral Ports | Temporarily assigned to client-side connections |

---

## 1. Well-Known Ports

These ports are commonly associated with fundamental networking protocols.

|    Port | Protocol | Purpose                  |
| ------: | -------- | ------------------------ |
| `20/21` | FTP      | File transfer            |
|    `22` | SSH      | Secure remote access     |
|    `23` | Telnet   | Remote access            |
|    `25` | SMTP     | Sending email            |
|    `53` | DNS      | Domain name resolution   |
|    `80` | HTTP     | Web traffic              |
|   `110` | POP3     | Receiving email          |
|   `143` | IMAP     | Receiving/managing email |
|   `443` | HTTPS    | Secure web traffic       |

For example:

```text
https://example.com
```

normally communicates through:

```text
Port 443
```

---

## 2. Registered Ports

The range:

```text
1024–49151
```

is used by various applications and services.

Examples include:

|    Port | Common Use                             |
| ------: | -------------------------------------- |
|  `3000` | Node.js / Express development servers  |
|  `3306` | MySQL                                  |
|  `5432` | PostgreSQL                             |
| `27017` | MongoDB                                |
|  `8080` | Alternative HTTP / development servers |

These aren't universal rules. For example, Express does **not** require port `3000`; we can run it on another available port.

```javascript
app.listen(3000);
```

means:

> Start the server and listen for incoming connections on port `3000`.

---

## 3. Dynamic / Ephemeral Ports

The range:

```text
49152–65535
```

is generally used for temporary connections.

For example, when your browser connects to a web server:

```text
Your Computer                  Web Server
     │                             │
     │  Source: 52341              │
     │  Destination: 443           │
     ├────────────────────────────►│
     │                             │
```

Your operating system may temporarily assign an ephemeral port such as `52341` to the client-side connection.

Once the connection is finished, that port can be reused.

---

## Ports in Backend Development

When we create a backend server:

```javascript
app.listen(3000);
```

we are telling the operating system:

```text
"Keep this application listening for network requests on port 3000."
```

So when a client sends:

```text
http://localhost:3000
```

the operating system knows that the request is intended for the application listening on port `3000`.

---

## Key Takeaway

Think of an **IP address as a building address** and a **port as a specific room inside that building**.

```text
IP Address
    ↓
Which machine?

Port
    ↓
Which application/service?
```

A single computer can run many network services simultaneously because each service can listen on a different port.
