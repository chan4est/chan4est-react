"use client";
import { signIn } from "next-auth/react";
import GoogleLogo from "../../public/tech-icons/svg/Google.svg";
import Image from "next/image";

export function SignInButton({}) {
  function handleClick() {
    signIn("google");
  }

  return (
    <button className="gsi-material-button" onClick={handleClick}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Image alt="Google logo" src={GoogleLogo} />
        </div>
        <span className="gsi-material-button-contents">
          Sign in with Google
        </span>
        <span className="hidden">Sign in with Google</span>
      </div>
    </button>
  );
}
