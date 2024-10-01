"use client";
import React from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { LabelInputContainer } from "../../../components/ui/LabelInputContainer";
import { BottomGradient } from "../../../components/ui/BottomGradient";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { inputFields } from "./Input";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
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

        <Button
          variant="submit"
          className="w-full text-primary mb-8"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </Button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          {[
            {
              icon: (
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              ),
              text: "GitHub",
            },
            {
              icon: (
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              ),
              text: "Google",
            },
          ].map(({ icon, text }, index) => (
            <Button key={index} variant="submit" className="w-full">
              {icon}
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                {text}
              </span>
              <BottomGradient />
            </Button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Login;
