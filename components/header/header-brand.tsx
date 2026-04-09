import Link from "next/link";

export function HeaderBrand() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-foreground">STREAM</span>
        <span className="text-primary">+</span>
      </div>
    </Link>
  );
}
