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
import { Loader2 } from "lucide-react";

const Signup = () => {
  const { googleSignIn, createUser, loading, googleLoading } =
    useContext(AuthContext); // Using loading from context

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const user = result.user;
      console.log(user);
      toast.success("User signed up successfully");
      form.reset();
      // navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Error during sign-up");
    }
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      const result = await googleSignIn();
      const user = result.user;
      toast.success("User signed in successfully");
    } catch (err) {
      toast.error("Error during Google sign-in");
      console.error(`Error during Google sign-in: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl my-12 p-4 md:p-8 shadow-input bg-primary bg-opacity-15">
      <h2 className="font-light text-3xl text-center my-6 font-museo text-primary">
        Welcome to Flood Guard
      </h2>
      <p className="text-center text-primary my-6 pb-6 text-xl font-light">
        Create a new account
      </p>
      <form className="my-8" onSubmit={handleSignup}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {inputFields.slice(0, 2).map(({ id, label, type, placeholder }) => (
            <LabelInputContainer key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} placeholder={placeholder} type={type} />
            </LabelInputContainer>
          ))}
        </div>

        {inputFields.slice(2).map(({ id, label, type, placeholder }) => (
          <LabelInputContainer key={id} className="mb-4">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} placeholder={placeholder} type={type} />
          </LabelInputContainer>
        ))}

        {/* Sign up button with loading state */}
        <Button
          variant="submit"
          className="w-full text-lg font-light text-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Sign up"}
          <BottomGradient />
        </Button>

        <div className="bg-gradient-to-r from-transparent via-primary dark:via-primary to-transparent my-10 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          {/* Google sign-in button with loading state */}
          <Button
            variant="submit"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <FaGoogle className="h-4 w-4 font-thin text-primary me-2" />
            <span className="text-primary text-lg font-light">
              {googleLoading
                ? "Signing in with Google..."
                : "Sign in with Google"}
            </span>
            <BottomGradient />
          </Button>

          <div>
            <p className="text-center text-primary font-light">
              Already have an account?{" "}
              <a
                href="/login"
                className={cn(
                  "text-primary font-light underline",
                  "text-primary font-light underline"
                )}
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
