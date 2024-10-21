import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { LabelInputContainer } from "../../../components/ui/LabelInputContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { BottomGradient } from "../../../components/ui/BottomGradient";
import { cn } from "@/lib/utils";
import { inputFields } from "./InputFields";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Function to get user's location as a promise
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          resolve([latitude, longitude]);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const Signup = () => {
  const { user, createUser, loading } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState([null, null]);

  const navigate = useNavigate();

  const handleSelectChange = (value) => {
    setRole(value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstname.value;
    const lastName = form.lastname.value;

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
      // Get user location
      const userLocation = await getUserLocation();
      setLocation(userLocation); // Set location in state

      const [latitude, longitude] = userLocation;

      const result = await createUser(email, password);
      const user = result.user;

      toast.success(`User signed up as ${role} successfully`);

      // Prepare data for API call
      const apiUrl =
        role === "victim"
          ? "http://localhost:3000/api/victims"
          : "http://localhost:3000/api/rescuers";

      const userData = {
        name: `${firstName} ${lastName}`,
        email: email,
        latitude: latitude,
        longitude: longitude,
      };

      // API call to save user data including location
      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => toast.success(data.message));
      if (apiResponse.error) {
        toast.error(apiResponse.error);
      } else {
        // Clear session storage and set new user data
        userData.role = role;
        sessionStorage.clear();
        sessionStorage.setItem("userData", JSON.stringify(userData));
      }

      setRole("");

      if (user) {
        navigate("/rescue-portal");
      } else if (user && role === "victim") {
        navigate("/victim-portal");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during sign up:", err);
      toast.error("An error occurred during sign up. Please try again.");
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
              <Input
                autoComplete="nope"
                id={id}
                placeholder={placeholder}
                type={type}
              />
            </LabelInputContainer>
          ))}
        </div>

        {inputFields.slice(2).map(({ id, label, type, placeholder }) => (
          <LabelInputContainer key={id} className="mb-4">
            <Label htmlFor={id}>{label}</Label>
            <Input
              autoComplete="nope"
              id={id}
              placeholder={placeholder}
              type={type}
            />
          </LabelInputContainer>
        ))}

        {/* Role selection dropdown */}
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

        <div className="bg-gradient-to-r from-transparent via-primary dark:via-primary to-transparent my-10 h-[1px] w-full"></div>

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
      </form>
    </div>
  );
};

export default Signup;
