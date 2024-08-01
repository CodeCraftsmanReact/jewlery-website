"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Product from "@/components/Product";
import { Suspense, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useSWR from "swr";
import type { ProductItem } from "@/components/Product";
export default function Page() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const productSkeleton = Array.apply(null, Array(12)).map(function () {});
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/get-products", fetcher);

  const container = useRef<HTMLElement | any>();
  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    const products = container.current.querySelectorAll(".product");
    gsap.to(products, {
      opacity: 1,
      stagger: 0.5,
    });
  }, [products]);
  return (
    <div className="container p-16 md:pt-0">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Rings
      </h1>
      <div
        ref={container}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-9 lg:gap-12 place-items-center"
      >
        {!products?.length &&
          productSkeleton.map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 cursor-pointer">
              <div className="h-[150px] w-[150px] rounded-xl hover:scale-110 transition-all duration-200 ">
                <Skeleton className="h-[150px] mb-4 w-[150px] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[180px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        {products?.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
