import Link from "next/link";
import { linkConstants } from "../lib/linkConstants";
import { Footer } from "./Footer";

export default function Error({ errorText }) {
  return (
    <>
      <div className="text-center pt-16">
        <h1>(╯°□°)╯︵ ┻━┻</h1>
        <div className="flex flex-col justify-center content-center text-center gap-y-8 pt-8 pl-8 pr-8">
          <h2>{errorText}</h2>
          <p>
            If you believe there is supposed to be something here,&nbsp;
            <a
              className="underline hover:text-accent"
              href="mailto:chan4est@gmail.com?subject=chan4est Website Issue&body=Please include screenshots of your screen and browser console if possible. Thank you!"
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
            Go back to the{" "}
            <Link
              className="underline hover:text-accent"
              href={linkConstants.HOME}
            >
              Main Page
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
