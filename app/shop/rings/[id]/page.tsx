"use client";
import product1 from "@/public/products/product-image-1319728241.webp";
import product2 from "@/public/products/product-image-1319728242.webp";
import product3 from "@/public/products/product-image-1769031444.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Product,
  CartActions,
  CartEntry as ICartEntry,
} from "use-shopping-cart/core";

export default function ProductPage({
  id,
}: {
  id: string;
  product: Product;
  addItem: CartActions["addItem"];
}) {
  const { addItem } = useShoppingCart();
  const product = {
    id: "prod_NWjs8kKbJWmuuc",
    object: "product",
    active: true,
    created: 1678833149,
    default_price: 799,
    price: 799,
    currency: "USD",
    description:
      "Introducing the Exquisite 18K Gold Ring, a timeless piece that epitomizes elegance and sophistication. Crafted with precision and care, this stunning ring is a testament to the finest in jewelry design and craftsmanship.",
    images: [product1, product2, product3],
    features: [],
    livemode: false,
    metadata: {},
    name: "Golden Ring",
    package_dimensions: null,
    shippable: null,
    statement_descriptor: null,
    tax_code: null,
    unit_label: null,
    updated: 1678833149,
    url: null,
    sku: "654654654",
  };
  return (
    <div className="container md:pt-20 mx-auto grid grid-cols-1 md:grid-cols-2 p-16 md:p-0">
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {product.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image} alt="product" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="md:p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {product.name}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-slate-600/70 dark:text-white mb-4">
          {product.description}
        </p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          ${(product.default_price / 100).toFixed(2)}
        </h1>
        <Button onClick={() => addItem(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
