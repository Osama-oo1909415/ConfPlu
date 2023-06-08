import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { error, success } from "@/lib/notif";
import { useRouter } from "next/router";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    if (result.ok) {
      success("Successfully logged in");
      router.push("/");
    }
    if (result.error) {
      error("Wrong Email or Password");
    }
  };

  return (
    <div class="login-container">
      <div class="img">
        <Image
          src="/assets/images/sign-in.png"
          alt="login image"
          width={400}
          height={400}
        />
      </div>
      <div class="login-form">
        <form onSubmit={handleSubmit} action="">
          <label for="">Sign in to your account</label>
          <div class="email">
            <input
              class="email-input"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="password">
            <input
              class="password-input"
              type="password"
              placeholder="Eenter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button class="login-btn">Sign in</button>
          <a href="#">
            Not registered? <span>Join us</span>
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
