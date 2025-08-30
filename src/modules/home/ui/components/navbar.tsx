"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import React from "react";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { useCurrentTheme } from "@/hooks/use-current-theme";

export const Navbar = () => {
  const isScrollde = useScroll();
  const { theme, setTheme } = useTheme();
  const currentTheme = useCurrentTheme();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent",
        isScrollde && "backdrop-blur-sm border dark:border-white border-input rounded-full p-2.5 mt-1.5 mx-24 lg:mx-96"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="VibePlus" width={24} height={24} />
          <span className="font-semibold text-lg">VibePlus</span>
        </Link>
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button size="sm">Sign In</Button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          {/* <div className="flex justify-center items-center gap-3">
            <UserControl showName />
            <SunMoon
              className="-mt-1"
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            />
          </div> */}
          <UserButton
            showName
            appearance={{
              baseTheme: currentTheme === "dark" ? dark : undefined,
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label={`Theme (${theme})`}
                labelIcon={<SunMoon size={20} />}
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
};
