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
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

const ProductItem = ({ product }: any) => {
  const price = formatCurrencyString({
    value: product.default_price?.unit_amount,
    currency: "USD",
    language: "en-US",
  });
  const { addItem } = useShoppingCart();
  return (
    <div className="container md:pt-20 mx-auto grid grid-cols-1 md:grid-cols-2 p-16 md:p-0">
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {product.images?.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt="product"
                width={0}
                height={0}
                className="w-full h-full rounded-xl"
                sizes="100vw"
              />
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
          {price}
        </h1>
        <Button onClick={() => addItem(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
