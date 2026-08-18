# SMART DEALS

**A Local Online Marketplace for Buying & Selling with Bids**

---

## Overview

**SMART DEALS** is a community-driven online marketplace where users can:

- Post items for sale (`Products`)
- Place bids on items (`Bids`)
- Negotiate prices through bidding
- Mark items as `sold` or keep them `pending`

> _ — think of it as your neighborhood OLX or Craigslist with a bidding system._

---

## Tech Stack

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | React / HTML+CSS+JS           |
| Backend  | Node.js + Express             |
| Database | MongoDB (NoSQL)               |
| Auth     | Firebase-based Authentication |
| API      | RESTful                       |

---



## Frontend Pages

| Page             | Purpose                         |
| ---------------- | ------------------------------- |
| **Home**         | Show all active ads             |
| **Register**     | User signup                     |
| **Login**        | User login                      |
| **All-Products**     | Browse all listings             |
| **My-Products**      | View & manage your posted items |
| **My Bids**      | View bids you've placed         |
| **Products Details** | View item + place bid           |
| **Post Products**    | Create new listing              |
| **Update Products**  | Edit your ad                    |
| **Error Page**   | 404 / error handling            |

---

## User Flow Example

```text
1. Seller posts: "iPhone 13 - Used - $500-$550"
   → POST /products

2. Buyer 1 bids $510
   → POST /bids

3. Buyer 2 bids $530
   → POST /bids

4. Seller accepts Buyer 2
   → PATCH /bids/status/{bidId} → "confirmed"
   → PATCH /products/status/sold

5. System deletes other bids
   → DELETE /bids/product/{addId}
```

---

---

## Live Link:
## https://smart-deals-frontend.vercel.app/

---


> **Start dealing locally. Post. Bid. Sell.**  
> _Built for the community, by the community._

---

**SMART DEALS** – _Where every deal feels like home._
