import { LeaveComment } from "../components/LeaveComment";

import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import timeStampToDate from "../lib/timestampToDate";
import Image from "next/image";

function Comment({ userName, text, date, userImage }) {
  const commentParagraphs = text.split("\n");
  const paragraphsList = commentParagraphs.map((pText, idx) => (
    <div className="pb-2" key={pText + idx}>
      {pText}
    </div>
  ));
  return (
    <div className="pb-2">
      <div className="flex flex-row gap-3 justify-start items-center">
        <Image
          src={userImage}
          height={32}
          width={32}
          alt={`Photo of ${userName}`}
          className="rounded-full"
        />
        <span className="font-bold">{userName}</span>
        <span className="text-accent">{date}</span>
      </div>
      <div className="pl-[44px]"> {paragraphsList}</div>
    </div>
  );
}

export async function CommentSection({ country }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let commentsList = (
    <Comment
      userName={"Chandler Forrest"}
      text="No comments yet. Add one below!"
      date={""}
      userImage={
        "https://lh3.googleusercontent.com/a/ACg8ocL3DlyM0umuMlb837UCq21tKhRP5LpRYpCtOGuNIIf1siWpZ1QCzw=s96-c"
      }
    />
  );

  let { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("country", country)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  } else if (comments && comments.length > 0) {
    commentsList = comments.map((comment) => (
      <Comment
        userName={comment.user_name}
        text={comment.content}
        date={timeStampToDate(comment.created_at)}
        userImage={comment.user_image}
        key={comment.user_name + comment.content + comment.created_at}
      />
    ));
  }

  return (
    <div className="border-t border-solid border-button_inactive pt-4 pb-4">
      {commentsList}
      <LeaveComment country={country} />
    </div>
  );
}
