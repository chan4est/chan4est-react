import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center content-center text-center gap-y-8 pt-16 pl-8 pr-8">
      <h4>404 Page Not Found</h4>
      <p>
        If you believe there is supposed to be something here,&nbsp;
        <a
          className="underline hover:text-blog_accent"
          href="mailto:chan4est@gmail.com?subject=GO Copy! Issue&body=Please include screenshots of your screen and browser console if possible. Thank you!"
        >
          please email me
        </a>
        .
      </p>
      <p>
        Include details of what you did before encountering this error along
        with what you expected. Thank you!
      </p>
      <p>
        Go back{" "}
        <Link className="underline hover:text-blog_accent" href="/">
          Home
        </Link>
      </p>
    </div>
  );
}
