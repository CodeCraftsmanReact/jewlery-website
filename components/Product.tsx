"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import TransitionLink from "./TransitionLink";

const Product = ({
  product,
}: {
  product: {
    id: string;
    object: string;
    active: boolean;
    created: number;
    default_price: number;
    description: null;
    images: StaticImageData[];
    features: never[];
    livemode: boolean;
    metadata: {};
    name: string;
    package_dimensions: null;
    shippable: null;
    statement_descriptor: null;
    tax_code: null;
    unit_label: null;
    updated: number;
    url: null;
  };
}) => {
  const price = formatCurrencyString({
    value: product.default_price,
    currency: "USD",
    language: "en-US",
  });

  return (
    <Link
      href={`/shop/rings/${product?.id}`}
      key={product?.id}
      style={{ opacity: 0 }}
      className="product flex flex-col space-y-3 cursor-pointer"
    >
      <div className="h-[150px] w-[150px] rounded-xl hover:scale-110 transition-all duration-200  ">
        <Image
          src={product.images[0]}
          className="h-[150px] w-[150px] rounded-xl"
          alt={product.name}
        />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-[250px]">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{product.name}</p>
        </div>
        <div className="h-4 w-[200px]">
          <p className="leading-7 [&:not(:first-child)]:mt-6">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
