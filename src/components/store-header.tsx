import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

type StoreHeaderProps = {
  bagCount?: number;
  onOpenBag?: () => void;
};

export function StoreHeader({ bagCount, onOpenBag }: StoreHeaderProps) {
  return (
    <>
      <div className="bg-primary py-2 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-primary-foreground">
        Artful objects · Considered interiors · Made to last
      </div>
      <header className="relative z-20 border-b border-border bg-background">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
          <Link to="/" className="flex min-w-fit flex-col leading-none no-underline" aria-label="Forma Studio home">
            <span className="font-display text-[21px] font-semibold tracking-[0.08em]">FORMA</span>
            <span className="mt-1 text-[8px] uppercase tracking-[0.24em] text-muted-foreground">Objects & interiors</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-8" aria-label="Main navigation">
            <a href="/#collection" className="editorial-underline text-xs text-foreground underline-offset-4 sm:text-sm">Art & objects</a>
            <Link to="/interiors" className="editorial-underline text-xs text-foreground underline-offset-4 sm:text-sm">Interiors</Link>
            {onOpenBag ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenBag}
                aria-label={`Open shopping bag, ${bagCount ?? 0} items`}
                className="h-9 gap-2 px-2 text-xs"
              >
                <ShoppingBag aria-hidden="true" className="size-4" />
                <span className="hidden sm:inline">Bag</span>
                <span className="tabular-nums">{bagCount ?? 0}</span>
              </Button>
            ) : (
              <Link to="/" className="flex items-center gap-1 text-xs text-foreground sm:text-sm">
                Discover <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}