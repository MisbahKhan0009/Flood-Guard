"use client";
import React, { useContext } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { LabelInputContainer } from "../../../components/ui/LabelInputContainer";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { BottomGradient } from "../../../components/ui/BottomGradient";
import { cn } from "@/lib/utils";
import { FaGoogle } from "react-icons/fa";
import { inputFields } from "./InputFields";
import { AuthContext } from "../../../context/AuthProvider";
import logger from "../../../utils/logger";
import { toast } from "sonner";

const Login = () => {
  const { googleSignIn, createUser } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User signed up successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
        logger(`Error during sign-up: ${err.message}`, "error", {
          color: "#ff0000",
          backgroundColor: "#f8d7da",
        });
      });
  };

  const handleGoogleSignIn = (event) => {
    event.preventDefault();
    googleSignIn()
      .then((result) => {
        const user = result.user;
        toast.success("User signed in successfully");
      })
      .catch((err) => {
        toast.error("Error during Google sign-in");
        logger(`Error during Google sign-in: ${err.message}`, "error", {
          color: "#ff0000",
          backgroundColor: "#f8d7da",
        });
      });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl my-12 p-4 md:p-8 shadow-input bg-primary bg-opacity-15">
      <h2 className="font-light text-3xl text-center font-museo my-6 pb-6 text-primary">
        Welcome to flood guard
      </h2>
      <p className="text-center text-primary my-6 pb-6 text-xl font-light">
        Log in to your account{" "}
      </p>
      <form className="my-8" onSubmit={handleLogin}>
        <div className="flex flex-col space-y-2 mb-4">
          {inputFields
            .filter(({ id }) => id === "email" || id === "password")
            .map(({ id, label, type, placeholder }) => (
              <LabelInputContainer key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input id={id} placeholder={placeholder} type={type} />
              </LabelInputContainer>
            ))}
        </div>

        <Button
          variant="submit"
          className="w-full text-lg font-light text-primary"
          type="submit"
        >
          Log in
          <BottomGradient />
        </Button>

        <div className="bg-gradient-to-r from-transparent via-primary dark:via-primary to-transparent my-10 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          {/* <Button
            variant="submit"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="h-4 w-4 font-thin text-primary me-2" />
            <span className="text-primary text-lg font-light">
              Sign in with Google
            </span>
            <BottomGradient />
          </Button> */}
          <div>
            <p className="text-center text-primary font-light">
              Doesn't have an account?{" "}
              <a
                href="/signup"
                className={cn(
                  "text-primary font-light underline",
                  "text-primary font-light underline"
                )}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
