import { LeaveComment } from "../components/LeaveComment";

function Comment({ userName, text, date }) {
  const commentParagraphs = text.split("\n");
  const paragraphsList = commentParagraphs.map((pText, idx) => (
    <div className="pb-2" key={pText + idx}>
      {pText}
    </div>
  ));
  return (
    <div className="pb-2">
      <span className="font-bold">{userName}</span>
      <span className="text-accent">{"  " + date}</span>
      {paragraphsList}
    </div>
  );
}

export function CommentSection({ comments }) {
  const commentsList = comments.map((comment) => (
    <Comment
      userName={comment.author}
      text={comment.text}
      date={comment.publishDate}
      key={comment.author + comment.text + comment.publishDate}
    />
  ));

  return (
    <div className="border-t border-solid border-button_inactive pt-2 pb-4">
      {commentsList}
      <LeaveComment />
    </div>
  );
}
