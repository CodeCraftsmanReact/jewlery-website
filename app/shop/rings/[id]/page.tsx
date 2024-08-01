"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductItem from "@/components/ProductItem";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import _ from "lodash";
import { Product } from "use-shopping-cart/core";
import { ShoppingCart } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>({});
  const cart = useShoppingCart();
  const { addItem } = cart;
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id }),
    };

    fetch("/api/get-product-by-id", requestOptions)
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data);
      });
  }, [params.id]);
  if (_.isEmpty(product)) {
    return (
      <div className="container md:pt-20 mx-auto grid grid-cols-1 md:grid-cols-2 p-16 md:p-0">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            <CarouselItem>
              <Skeleton className="w-[320px] h-[320px]" />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="md:p-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            <Skeleton className="w-full h-10" />
          </h1>
          <div className="leading-7 [&:not(:first-child)]:mt-6 text-slate-600/70 dark:text-white mb-4">
            <Skeleton className="w-[10%] h-4" />
          </div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            <Skeleton className="w-[30%] h-10" />
          </h1>
          <Button disabled>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
  return <ProductItem product={product} addItem={addItem} />;
}
