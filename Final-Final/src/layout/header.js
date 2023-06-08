import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <header class="header" data-aos="fade-down">
      <Link href="/">
        <Image
          src="./assets/images/logo.svg"
          alt="logo"
          width={215}
          height={28}
        />
      </Link>

      <nav class="nav">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#schedule">Schedule</Link>
          </li>
          <li>
            <Link href="#footer">About</Link>
          </li>
        </ul>
      </nav>

      <div class="header-btns">
        {!session?.data?.user ? (
          <Link href="/login" class="login button">
            Login
          </Link>
        ) : (
          <a
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            class="login button"
          >
            Logout
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
