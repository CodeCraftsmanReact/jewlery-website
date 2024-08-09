"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import TransitionLink from "./TransitionLink";
import { Skeleton } from "./ui/skeleton";

export interface ProductItem {
  id: string;
  object: string;
  active: boolean;
  created: number;
  default_price: {
    id: string;
    unit_amount: number;
    currency: string;
  };
  description: null;
  images: string[];
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
}

const Product = ({ product, opacity, scale }: any) => {
  const price = formatCurrencyString({
    value: product.default_price?.unit_amount,
    currency: "USD",
    language: "en-US",
  });
  const imgSRc: string = product.images[0];

  return (
    <Link
      href={`/shop/rings/${product?.id}`}
      key={product?.id}
      style={{ opacity: opacity ? opacity : 0, scale: scale ? scale : 1 }}
      className="product flex flex-col space-y-3 max-w-[180px] cursor-pointer"
    >
      <div className="h-[150px] w-[150px] rounded-xl hover:scale-110 transition-all duration-200  ">
        <Image
          src={imgSRc}
          className="h-[150px] w-[150px] rounded-xl"
          height={150}
          width={150}
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
