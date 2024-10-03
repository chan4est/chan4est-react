import { getServerSession } from "next-auth";
import { SignInButton, CommentInput } from "../components/SignInButton";
import { counters } from "sharp";

export async function LeaveComment({ country }) {
  const session = await getServerSession();
  // console.log(session);
  const signInButton = (
    <div className="flex justify-center items-center">
      <SignInButton />
    </div>
  );

  return (
    <>
      {!session ? (
        signInButton
      ) : (
        <CommentInput
          userImage={session.image}
          userName={session.name}
          country={country}
        />
      )}
    </>
  );
}
