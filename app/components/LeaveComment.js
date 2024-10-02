import { signIn, signOut, useSession } from "next-auth/react";

export function LeaveComment({ callbackUrl }) {
  const { status } = useSession();

  function handleClick() {
    signIn("google", { callbackUrl: callbackUrl });
  }

  function handleOtherClick() {
    signOut("google");
  }

  return (
    <>
      {status === "authenticated" ? (
        <button
          className="text-accent hover:hover:text-button_inactive"
          onClick={handleOtherClick}
        >
          {"Sign out"}
        </button>
      ) : (
        <button
          className="text-accent hover:hover:text-button_inactive"
          onClick={handleClick}
        >
          {"Sign in with Google to comment"}
        </button>
      )}
    </>
  );
}
