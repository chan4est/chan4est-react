"use client";
import { signIn, signOut } from "next-auth/react";
import GoogleLogo from "../../public/tech-icons/svg/Google.svg";
import Image from "next/image";
import { useState } from "react";

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

export function CommentInput({ userName, userImage, country }) {
  function handleClick() {
    signOut("google");
  }

  const [commentText, setCommentText] = useState("");

  async function handleOnSubmit(event) {
    // Don't refresh entire page
    event.preventDefault();
    if (commentText) {
      console.log(commentText);

      // const { data, error } = await supabase
      //   .from("comments")
      //   .insert([
      //     {
      //       user_name: userName,
      //       user_image: userImage,
      //       country: country,
      //       content: commentText,
      //     },
      //   ])
      //   .select();
    }
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} className="pb-2 px-1">
        <div className="col-span-full">
          <div className="">
            <textarea
              id="comment"
              name="comment"
              rows={3}
              className="block bg-background_accent w-full rounded-md border border-accent py-1.5 px-3 text-text \
                         placeholder:text-text leading-6"
              placeholder={"Leave a comment"}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            {/* <button
              onClick={handleOnSubmit}
              className="bg-background_accent rounded-full border border-accent p-1 flex justify-center items-center text-center "
            >
              Submit
            </button> */}
          </div>
        </div>
      </form>
      <button
        className="text-accent hover:hover:text-button_inactive"
        onClick={handleClick}
      >
        {"Dev Only (Sign Out)"}
      </button>
    </>
  );
}
