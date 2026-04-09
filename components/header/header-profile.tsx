import { User } from "lucide-react";

export function HeaderProfile() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary transition-all duration-200 hover:ring-2 hover:ring-foreground">
        <User size={20} className="text-primary-foreground" />
      </div>
    </div>
  );
}
