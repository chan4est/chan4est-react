"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton({}) {
  function handleClick() {
    signIn("google");
  }

  return (
    <button
      className="text-accent hover:hover:text-button_inactive"
      onClick={handleClick}
    >
      {"Sign in with Google to comment"}
    </button>
  );
}

export function SignOutButton({}) {
  function handleOtherClick() {
    signOut("google");
  }

  return (
    <button
      className="text-accent hover:hover:text-button_inactive"
      onClick={handleOtherClick}
    >
      {"Sign out"}
    </button>
  );
}
