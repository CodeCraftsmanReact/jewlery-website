"use client";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  Menu,
  Trash,
  Plus,
  Minus,
  LoaderCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import AnimateHeight, { Height } from "react-animate-height";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { CartEntry as ICartEntry } from "use-shopping-cart/core";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useRouter } from "next/navigation";

const components = [
  {
    title: "Rings",
    href: "/shop/rings",
    description: "",
  },
  {
    title: "Necklaces",
    href: "/shop/necklaces",
    description: "",
  },
  {
    title: "Bracelets",
    href: "/shop/bracelets",
    description: "",
  },
  {
    title: "Earrings",
    href: "/shop/earrings",
    description: "",
  },
  {
    title: "Watches",
    href: "/shop/watches",
    description: "",
  },
];

function CartEntry({ entry }: { entry: ICartEntry }) {
  const { incrementItem, decrementItem, removeItem } = useShoppingCart();
  const price = formatCurrencyString({
    value: entry.default_price?.unit_amount,
    currency: "USD",
    language: "en-US",
  });
  console.log("entry ", entry);
  return (
    <div className="flex justify-between items-center gap-3 p-3   w-[300px]">
      <div className="flex justify-center">
        {entry.images ? (
          <Image
            width={75}
            height={75}
            src={entry.images[0]}
            alt={"product image"}
            className="rounded-full my-auto"
          />
        ) : null}
      </div>

      <div className="flex flex-col  gap-2 w-full">
        <div>
          <div className="text-sm flex justify-between">
            <div>{entry.name}</div>
            <div className="whitespace-nowrap">
              {entry.quantity} x {price}
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-1">
          <div>
            <Button
              className="!h-6 rounded-r-none"
              size="icon"
              onClick={() => incrementItem(entry.id)}
            >
              <Plus className="w-4 h-4" />
            </Button>
            <Button
              className="!h-6 rounded-l-none"
              size="icon"
              onClick={() => decrementItem(entry.id)}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            className="!h-6"
            size="icon"
            onClick={() => removeItem(entry.id)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const Navigation = () => {
  const [height, setHeight] = useState<Height>(0);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { cartCount, cartDetails, clearCart } = useShoppingCart();

  async function handleClick(event: any) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ line_items: cartDetails }),
    };

    if (cartCount && cartCount > 0) {
      setStatus("idle");
      try {
        fetch("/api/get-checkout-link", requestOptions)
          .then((response) => response.json())
          .then((data: any) => {
            console.log(data);
            router.push(data.url);
          });
      } catch (error) {
        console.error(error);
        setStatus("redirect-error");
      }
    } else {
      setStatus("missing-items");
    }
  }

  const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    <CartEntry key={entry.id} entry={entry} />
  ));
  const total_items = Number(cartCount) || 0;
  return (
    <div className="">
      <div className="justify-between items-center hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="relative">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
            <NavigationMenuItem>
              <Link href="/new-arrivals" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  New Arrivals
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/best-sellers" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Best Sellers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sale" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  On Sale
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact-us" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="relative">
                  <ShoppingCart />
                  <div
                    className={`absolute ${
                      total_items > 0 ? "scale-100" : "scale-0"
                    } -right-1 -top-1 rounded-full bg-foreground text-background w-5 h-5 flex justify-center items-center transition-all duration-200`}
                  >
                    {total_items}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={`w-[300px] min-h-[300px] flex flex-col items-center relative pb-16 overflow-x-hidden overflow-y-auto ${
                      cartEntries.length === 0 && "justify-center"
                    } `}
                  >
                    {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
                    {cartEntries}
                    {cartEntries.length > 0 ? (
                      <div className="flex gap-2 my-4 absolute bottom-0">
                        <Button onClick={() => clearCart()}>Clear cart</Button>

                        <Button onClick={(e) => handleClick(e)}>
                          Checkout{" "}
                          {status === "idle" && (
                            <LoaderCircle className="ml-2 animate-spin" />
                          )}
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <ModeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {/* mobile-app-bar */}
      <div className="md:hidden">
        <Menu
          className="block absolute md:hidden top-4 left-4"
          onClick={() => setHeight(height === 0 ? "auto" : 0)}
        />
        <AnimateHeight
          id="mobile-hide"
          className="md:hidden"
          duration={500}
          height={height}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenu>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="relative">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4  md:grid-cols-2">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
              <NavigationMenuItem>
                <Link href="/new-arrivals" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    New Arrivals
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/best-sellers" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Best Sellers
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/sale" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    On Sale
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about-us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact-us" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenu
                id="viewport"
                className="[&>*:nth-child(2)]:-translate-x-[114px]"
              >
                <NavigationMenuItem className="">
                  <NavigationMenuTrigger className="relative">
                    <ShoppingCart />

                    <div
                      className={`absolute ${
                        total_items > 0 ? "scale-100" : "scale-0"
                      } animate-scale -right-1 -top-1 rounded-full bg-foreground text-background w-5 h-5 flex justify-center items-center transition-all duration-200`}
                    >
                      {total_items}
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div
                      className={`w-[300px] min-h-[300px] flex flex-col items-center relative ${
                        cartEntries.length === 0 && "justify-center"
                      } `}
                    >
                      {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
                      {cartEntries}
                      {cartEntries.length > 0 ? (
                        <div className="flex gap-4 absolute bottom-2">
                          <Button onClick={() => clearCart()}>
                            Clear cart
                          </Button>

                          <Button onClick={handleClick}>
                            Checkout
                            {status === "idle" && (
                              <LoaderCircle className="ml-2 animate-spin" />
                            )}
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            </NavigationMenuList>
          </NavigationMenu>
        </AnimateHeight>
      </div>
    </div>
  );
};

export default Navigation;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group/item block select-none space-y-1 rounded-md p-3 leading-none no-underline  outline-none transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none w-fit">
            {title}
            <div className="h-1  w-0 group-hover/item:w-full bg-accent transition-all duration-200" />
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
