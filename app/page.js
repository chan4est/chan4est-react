import Image from "next/image";
import chanPhoto from "../public/me.webp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={"about-grid-container"}>
        <div className={"about-grid"}>
          <Image
            src={chanPhoto}
            alt={"Image of the owner and creator, Chandler!"}
            height={300}
            width={300}
            quality={100}
            unoptimized={true}
            className={"chan-image"}
          />
          <br></br>
          <p>
            My name is Chandler and I&#39;m a software developer from California
            who loves to create things!
          </p>
          <p>
            This website is pretty barebones since I just started getting back
            into web dev and spent the last 6 weeks making{" "}
            <a className={"about-a"} href="https://www.pokemongocopy.com">
              GO Copy
            </a>
          </p>
          <p>
            If you need to contact me about anything professionally, please
            email me at{" "}
            <a
              className={"about-a"}
              href="mailto:chan4est@gmail.com?subject=Hello!"
            >
              chan4est@gmail.com
            </a>
            . Cheers!
          </p>
        </div>
      </div>
    </main>
  );
}
