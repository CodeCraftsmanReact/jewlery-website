"use client";
import { Skeleton } from "@/components/ui/skeleton";
import product1 from "@/public/products/product-image-1319728241.webp";
import product2 from "@/public/products/product-image-1319728242.webp";
import product3 from "@/public/products/product-image-1769031444.webp";
import Product from "@/components/Product";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function RingPage() {
  const productSkeleton = Array.apply(null, Array(12)).map(function () {});
  // let products = [];
  let products = [
    {
      id: "prod_NWjs8kKbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 799,
      description: null,
      images: [product1],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_NWjs8kKbJuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 1199,
      description: null,
      images: [product2],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_NW8kKbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 1249,
      description: null,
      images: [product3],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_Ns8kKbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 15214,
      description: null,
      images: [product1],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_NWjs8kKbJWmc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 4569,
      description: null,
      images: [product2],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_js8kKbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 7898,
      description: null,
      images: [product3],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_NWjs8kbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 3212,
      description: null,
      images: [product1],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
    {
      id: "prod_N8kKbJWmuuc",
      object: "product",
      active: true,
      created: 1678833149,
      default_price: 9632,
      description: null,
      images: [product2],
      features: [],
      livemode: false,
      metadata: {},
      name: "Gold Plan",
      package_dimensions: null,
      shippable: null,
      statement_descriptor: null,
      tax_code: null,
      unit_label: null,
      updated: 1678833149,
      url: null,
    },
  ];
  const container = useRef<HTMLElement | any>();
  useGSAP(
    () => {
      var tl = gsap.timeline({ defaults: { autoAlpha: 1, ease: "back" } });
      tl.from(".product", { opacity: 0 });
      tl.to(".product", { stagger: 0.3, duration: 2 });
    },
    { scope: container }
  );
  return (
    <div className="container p-16 md:pt-0">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
        Rings
      </h1>
      <div
        ref={container}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-9 lg:gap-12 place-items-center"
      >
        {products.length === 0
          ? productSkeleton.map((product, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[150px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))
          : products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
