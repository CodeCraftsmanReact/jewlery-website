"use client";
import React, { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";

const Cart = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={
        "pk_test_51Pf9mSFF7cXTW7d7oVXNJzBSvtV3U5K0S0wNTx8RwMbRSlJQYp3vv7uu9NAwf1pDjGBtf8bKMskzPpK1TfNHNBtQ00mncnvw4k"
      }
      successUrl="https://www.google.com"
      cancelUrl="https://twitter.com/dayhaysoos"
      currency="USD"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
      shouldPersist
    >
      {children}
    </CartProvider>
  );
};

export default Cart;
