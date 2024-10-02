import { getServerSession } from "next-auth";
import { SignInButton, SignOutButton } from "../components/SignInButton";

export async function LeaveComment({}) {
  const session = await getServerSession();

  const signInButton = <SignInButton />;
  const signOutButton = <SignOutButton />;
  return <>{!session ? signInButton : signOutButton}</>;
}
