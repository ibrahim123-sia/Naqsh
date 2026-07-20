# Naqsh

Naqsh is a full-stack e-commerce storefront for artificial/fashion jewellery, clutches & evening bags, and jewellery organizers, built for the Pakistani market.

## Features

- Browse and filter by category, material, occasion, color, size, and price
- Categories: Necklaces & Sets, Earrings, Rings, Bangles & Bracelets, Pendants & Chains, Anklets, Clutches & Evening Bags, Jewelry Organizers
- Guest and registered-user cart, with cart merge on login
- Email OTP signup verification and password reset
- Checkout via Cash on Delivery or PayFast
- Order history and tracking
- Admin dashboard for products, orders, and users

## Tech stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, Cloudinary, Nodemailer
- **Frontend**: React 18, Vite, Redux Toolkit, React Router v7, Tailwind CSS

## Getting started

```bash
cd backend && npm install && npm run seed && npm run dev
cd frontend && npm install && npm run dev
```

Both `backend/.env` and `frontend/.env` are required and git-ignored — set them up locally before running (ask the maintainer for the required keys).
