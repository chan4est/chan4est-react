"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function CommentInput({ userName, userImage, country }) {
  function handleClick() {
    signOut("google");
  }

  const [comment, setComment] = useState("");
  const [response, setResponse] = useState(null);

  async function submitComment(event) {
    // Don't refresh entire page, but this might be a CORS security issue.
    event.preventDefault();
    if (comment && comment.length > 0) {
      const payload = {
        userName: userName,
        userImage: userImage,
        country: country,
        comment: comment,
      };

      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data);
    }
  }

  return (
    <>
      <form onSubmit={submitComment} className="pb-2 px-1 text-base">
        <div className="col-span-full">
          <div className="">
            <textarea
              id="comment"
              name="comment"
              rows={3}
              className="block bg-background_accent w-full rounded-md border border-accent py-1.5 px-3 text-text \
                         placeholder:text-text leading-6 text-xs"
              placeholder={"Leave a comment"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-background_accent rounded-full border border-accent p-1 flex justify-center items-center text-center "
            >
              Submit
            </button>
            {/* {response && <p>{response.message}</p>} */}
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
