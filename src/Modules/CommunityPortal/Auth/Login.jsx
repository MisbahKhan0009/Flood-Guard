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
import axios from "axios";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleSelectChange = (value) => {
    setRole(value);
  };

  const fetchUserDataByEmail = async (email) => {
    let apiUrl = "";
    if (role === "rescuer") {
      apiUrl = `http://localhost:3000/api/rescuers/${email}`;
    } else if (role === "victim") {
      apiUrl = `http://localhost:3000/api/victims/${email}`;
    }

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Assign a consistent `userId` field
      const userId = data.victim_id || data.rescuer_id;
      return { ...data, userId }; // Return data with unified userId field
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user data");
      return null;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const result = await login(email, password);
      const user = result.user;

      if (user) {
        const userData = await fetchUserDataByEmail(email);
        if (userData) {
          // Update state and session storage with unified userId
          setUserId(userData.userId);
          userData.role = role; // Add role to userData

          sessionStorage.clear();
          sessionStorage.setItem("userData", JSON.stringify(userData));
          toast.success("User logged in successfully");

          // Navigate based on role
          if (role === "rescuer") {
            navigate("/rescue-portal");
          } else if (role === "victim") {
            navigate("/victim-portal");
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
      logger(`Error during login: ${err.message}`, "error", {
        color: "#ff0000",
        backgroundColor: "#f8d7da",
      });
    }
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
              Don't have an account?{" "}
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
