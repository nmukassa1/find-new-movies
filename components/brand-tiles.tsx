"use client";

const brands = [
  {
    name: "Disney",
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&h=200&fit=crop",
  },
  {
    name: "Pixar",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&h=200&fit=crop",
  },
  {
    name: "Marvel",
    image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=200&fit=crop",
  },
  {
    name: "Star Wars",
    image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=400&h=200&fit=crop",
  },
  {
    name: "National Geographic",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
  },
];

export function BrandTiles() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 px-8 lg:px-16 py-6">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="brand-tile relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer bg-card"
        >
          {/* Background Image */}
          <img
            src={brand.image}
            alt={brand.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          
          {/* Video Preview (shows on hover) */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
          />
          
          {/* Brand Name */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground font-bold text-sm lg:text-xl tracking-wide uppercase">
              {brand.name}
            </span>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-card/40" />
        </div>
      ))}
    </div>
  );
}
