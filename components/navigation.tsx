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
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import AnimateHeight, { Height } from "react-animate-height";
import { useShoppingCart } from "use-shopping-cart";
import { CartEntry as ICartEntry } from "use-shopping-cart/core";
import Image from "next/image";

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
  return (
    <div className="flex items-center gap-3 p-3">
      {entry.images ? (
        <Image
          width={50}
          height={50}
          src={entry.images[0].src}
          alt={"product image"}
          className="rounded-full"
        />
      ) : null}
      <h3 className="text-sm">{entry.name}</h3>
      <p className="flex">
        {entry.quantity} x{" "}
        {/* {formatCurrencyString({ value: entry.price, currency: 'USD' })} ={' '} */}
        {entry.formattedValue}
      </p>
    </div>
  );
}

const Navigation = () => {
  const [height, setHeight] = useState<Height>(0);
  const [status, setStatus] = useState("idle");
  const { cartCount, cartDetails, clearCart, redirectToCheckout } =
    useShoppingCart();

  async function handleClick(event: any) {
    event.preventDefault();

    if (cartCount && cartCount > 0) {
      setStatus("idle");
      try {
        const result = await redirectToCheckout();
        if (result?.error) {
          console.error(result);
          setStatus("redirect-error");
        }
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

  return (
    <div>
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
                      cartCount > 0 ? "scale-100" : "scale-0"
                    } animate-scale -right-1 -top-1 rounded-full bg-foreground text-background w-5 h-5 flex justify-center items-center transition-all duration-200`}
                  >
                    {cartCount}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={`w-[300px] h-[300px] flex flex-col items-center relative ${
                      cartEntries.length === 0 && "justify-center"
                    } `}
                  >
                    {cartEntries.length === 0 ? <p>Cart is empty.</p> : null}
                    {cartEntries}
                    {cartEntries.length > 0 ? (
                      <div className="flex gap-4 absolute bottom-2">
                        <Button onClick={() => clearCart()}>Clear cart</Button>

                        <Button onClick={handleClick}>Checkout</Button>
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
              <NavigationMenuItem>
                <Link href="/account">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Account
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
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
                    <ul className="grid gap-3 p-4  md:grid-cols-2  ">
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
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    My Account
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
                        cartCount > 0 ? "scale-100" : "scale-0"
                      } animate-scale -right-1 -top-1 rounded-full bg-foreground text-background w-5 h-5 flex justify-center items-center transition-all duration-200`}
                    >
                      {cartCount}
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="oogabooga">
                    <div
                      className={`w-[300px] h-[300px] flex flex-col items-center relative ${
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

                          <Button onClick={handleClick}>Checkout</Button>
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
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
