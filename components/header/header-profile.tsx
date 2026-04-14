"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/60"
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    return (
      <Button asChild size="sm" variant="secondary">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  const label = session.user.name ?? session.user.email ?? "Account";

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[10rem] truncate text-xs text-muted-foreground lg:inline">
        {label}
      </span>
      <div
        className="flex h-10 w-10 shrink-0 cursor-default items-center justify-center rounded-full bg-primary"
        title={label}
      >
        <User size={20} className="text-primary-foreground" aria-hidden />
      </div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="text-xs"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </div>
  );
}
