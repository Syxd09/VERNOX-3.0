import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import heroImage from "@/assets/atelier-hero.jpg";
import sculptureImage from "@/assets/wall-sculpture.jpg";
import paintingImage from "@/assets/abstract-painting.jpg";
import bronzeImage from "@/assets/bronze-sculpture.jpg";
import { StoreHeader } from "@/components/store-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORMA — Artful Objects for Considered Spaces" },
      { name: "description", content: "Discover sculptural metal wall art, original paintings, and collected objects for thoughtful interiors, curated by FORMA Studio." },
      { property: "og:title", content: "FORMA — Artful Objects for Considered Spaces" },
      { property: "og:description", content: "Sculptural works and considered interiors, collected with intention." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

type Product = {
  id: number;
  name: string;
  artist: string;
  category: string;
  price: number;
  image: string;
  note: string;
  label?: string;
};

type CartLine = { product: Product; quantity: number };

const products: Product[] = [
  { id: 1, name: "Fold No. 04", artist: "Mara Ellison", category: "Metal art", price: 1480, image: sculptureImage, note: "Hand-formed stainless steel · 82 × 114 cm", label: "One of a kind" },
  { id: 2, name: "Quiet Geometry", artist: "Jonas Reed", category: "Painting", price: 2250, image: paintingImage, note: "Mixed media on linen · 91 × 122 cm", label: "Original work" },
  { id: 3, name: "The Listening Form", artist: "Atelier Forma", category: "Sculpture", price: 890, image: bronzeImage, note: "Patinated bronze · edition of 12", label: "Small edition" },
];

const categories = ["All works", "Metal art", "Painting", "Sculpture"];

function currency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function Storefront() {
  const [category, setCategory] = useState("All works");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const filteredProducts = useMemo(() => category === "All works" ? products : products.filter((product) => product.category === category), [category]);
  const cartCount = cart.reduce((count, line) => count + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function addToBag(product: Product) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      return existing
        ? current.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }];
    });
    setAddedId(product.id);
    window.setTimeout(() => setAddedId((current) => current === product.id ? null : current), 1600);
  }

  function updateQuantity(id: number, delta: number) {
    setCart((current) => current
      .map((line) => line.product.id === id ? { ...line, quantity: line.quantity + delta } : line)
      .filter((line) => line.quantity > 0));
  }

  return (
    <main>
      <StoreHeader bagCount={cartCount} onOpenBag={() => setBagOpen(true)} />
      <section className="px-3 pt-3 md:px-5 md:pt-5">
        <div className="hero-shade relative flex min-h-[590px] items-end overflow-hidden bg-muted sm:min-h-[680px] lg:min-h-[calc(100svh-128px)]">
          <img src={heroImage} alt="Folded silver metal artwork in a light-filled gallery interior" width={1600} height={1104} fetchPriority="high" className="absolute inset-0 size-full object-cover object-center" />
          <div className="relative z-10 flex w-full flex-col gap-7 px-6 pb-9 text-on-image sm:px-10 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pb-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-on-image/80">Collected art · Thoughtful interiors</p>
              <h1 className="font-display text-5xl font-medium leading-[0.98] text-on-image sm:text-6xl lg:text-7xl">A space, made<br className="hidden sm:block" /> more your own.</h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-on-image/85 sm:text-base">Considered works for walls, rooms, and the moments that make them yours.</p>
            </div>
            <a href="#collection" className="group inline-flex w-fit items-center gap-3 border-b border-on-image/60 pb-3 text-sm text-on-image transition-colors hover:border-on-image">
              Discover the collection <ArrowDownRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
          <div className="absolute right-6 top-6 z-10 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-on-image/75 sm:right-10 sm:top-9">
            <span className="size-1.5 rounded-full bg-on-image" />
            Objects with presence
          </div>
        </div>
      </section>

      <section id="collection" className="scroll-mt-8 px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-7 border-b border-border pb-7 sm:flex-row sm:items-end sm:pb-9">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">The collection · 01 — 03</p>
              <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">Art to live with.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Sculptural works, original paintings, and collected forms—selected for the character they bring to a room.</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 py-6" aria-label="Filter by category">
            {categories.map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`h-8 rounded-none border-b px-0 text-xs ${category === item ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}
              >
                {item}
              </Button>
            ))}
            <span className="ml-auto self-center text-xs text-muted-foreground">{filteredProducts.length} works</span>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <article key={product.id} className="group">
                <div className={`art-perspective relative overflow-hidden bg-secondary ${index === 0 ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
                  <img src={product.image} alt={product.name} width={1008} height={1200} loading="lazy" className="art-image size-full object-cover" />
                  {product.label && <span className="absolute left-3 top-3 z-10 bg-background/90 px-3 py-2 text-[9px] uppercase tracking-[0.16em]">{product.label}</span>}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => addToBag(product)}
                    className="absolute bottom-3 left-3 right-3 z-10 h-11 justify-between px-4 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    {addedId === product.id ? <><span>Added to bag</span><Check aria-hidden="true" className="size-4" /></> : <><span>Add to bag</span><Plus aria-hidden="true" className="size-4" /></>}
                  </Button>
                </div>
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <h3 className="font-display text-lg font-medium">{product.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{product.artist} <span className="mx-1.5">·</span> {product.category}</p>
                    <p className="mt-2 text-[11px] text-muted-foreground">{product.note}</p>
                  </div>
                  <span className="whitespace-nowrap pt-1 text-sm">{currency(product.price)}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-[10px] uppercase tracking-[0.13em] text-muted-foreground">Preview collection · Product details and pricing are illustrative</p>
        </div>
      </section>

      <section className="grid min-h-[440px] grid-cols-1 bg-secondary lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[590px]">
          <img src={paintingImage} alt="Original abstract painting in a composed contemporary living room" width={1008} height={1200} loading="lazy" className="absolute inset-0 size-full object-cover object-center" />
        </div>
        <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 xl:px-24">
          <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Art in the room · 02</p>
          <h2 className="max-w-lg font-display text-4xl font-medium leading-[1.08] sm:text-5xl">A little perspective changes everything.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">From one defining piece to a whole-home refresh, we bring artwork, objects, and the room into conversation.</p>
          <a href="/interiors" className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-foreground/50 pb-3 text-sm">
            Explore interior design <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 border-y border-border py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <p className="max-w-xl font-display text-2xl font-medium leading-snug sm:text-3xl">Art, chosen well. Rooms, made personal.</p>
          <LinkLine href="/interiors" label="Meet with our studio" />
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-11 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-16">
          <div>
            <p className="font-display text-xl font-semibold tracking-[0.08em]">FORMA</p>
            <p className="mt-2 text-xs leading-5 text-primary-foreground/65">Objects for considered spaces.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">Explore</p>
            <div className="mt-3 flex flex-col items-start gap-2 text-sm">
              <a href="#collection" className="editorial-underline underline">Art & objects</a>
              <a href="/interiors" className="editorial-underline underline">Interior design</a>
            </div>
          </div>
          <p className="self-end text-xs text-primary-foreground/60 sm:col-span-2 lg:col-span-1 lg:text-right">Preview storefront · Checkout and partner connections are not live.</p>
        </div>
      </footer>

      <Sheet open={bagOpen} onOpenChange={setBagOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b border-border pb-4 text-left">
            <SheetTitle className="font-display text-2xl font-medium">Your bag <span className="text-muted-foreground">({cartCount})</span></SheetTitle>
            <SheetDescription>Selected works from the FORMA collection</SheetDescription>
          </SheetHeader>
          {cart.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="font-display text-xl">A space for something special.</p>
              <p className="mt-2 text-sm text-muted-foreground">Your bag is empty for now.</p>
              <Button variant="outline" className="mt-5" onClick={() => setBagOpen(false)}>Explore the collection</Button>
            </div>
          ) : (
            <>
              <div className="flex-1 divide-y divide-border overflow-y-auto">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4 py-5">
                    <img src={product.image} alt="" width={1008} height={1200} className="size-24 object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div><p className="font-display text-base font-medium">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.artist}</p></div>
                        <Button variant="ghost" size="icon" className="size-7 shrink-0" aria-label={`Remove ${product.name}`} onClick={() => updateQuantity(product.id, -quantity)}><X aria-hidden="true" className="size-4" /></Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="size-7" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(product.id, -1)}><Minus aria-hidden="true" className="size-3" /></Button>
                          <span className="w-4 text-center text-xs tabular-nums">{quantity}</span>
                          <Button variant="outline" size="icon" className="size-7" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(product.id, 1)}><Plus aria-hidden="true" className="size-3" /></Button>
                        </div>
                        <span className="text-sm">{currency(product.price * quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-5">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">Shipping and checkout are not enabled in this preview.</p>
                <Button className="mt-5 w-full" disabled>Continue to checkout <ArrowUpRight aria-hidden="true" className="size-4" /></Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}

function LinkLine({ href, label }: { href: string; label: string }) {
  return <a href={href} className="group inline-flex w-fit items-center gap-3 border-b border-foreground/50 pb-2 text-sm">{label}<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" /></a>;
}