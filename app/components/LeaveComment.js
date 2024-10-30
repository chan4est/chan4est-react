import { getServerSession } from "next-auth";
import { SignInButton } from "../components/SignInButton";
import { CommentInput } from "../components/CommentInput";

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
          userImage={session.user.image}
          userName={session.user.name}
          country={country}
        />
      )}
    </>
  );
}
