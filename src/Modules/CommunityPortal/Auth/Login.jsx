"use client";
import React, { useContext, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { LabelInputContainer } from "../../../components/ui/LabelInputContainer";
import { BottomGradient } from "../../../components/ui/BottomGradient";
import { cn } from "@/lib/utils";
import { inputFields } from "./InputFields";
import { AuthContext } from "../../../context/AuthProvider";
import logger from "../../../utils/logger";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSelectChange = (value) => {
    setRole("");
    setRole(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User logged in successfully");
        if (user && role === "rescuer") {
          navigate("/rescue-portal");
        } else if (user && role === "victim") {
          navigate("/victim-portal");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err);
        logger(`Error during login: ${err.message}`, "error", {
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
        <LabelInputContainer className="mb-4">
          <Label htmlFor="role">Select Role</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select a role"
                className="placeholder:text-primary"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>--Select Role--</SelectLabel>
                <SelectItem value="victim">Victim</SelectItem>
                <SelectItem value="rescuer">Rescuer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </LabelInputContainer>
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
