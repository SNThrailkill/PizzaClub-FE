'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { OrdersProvider } from './orderContext.js';
import { AuthProvider } from './auth/authContext';

const inter = Inter({ subsets: ['latin'] })

// This is the root layout that all copmponents will inherit, so anything that needs to be site wide needs to be here like Auth and our Orders
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <OrdersProvider>
          <body className={inter.className}>{children}</body>
        </OrdersProvider>
      </AuthProvider>
    </html>
  )
}
