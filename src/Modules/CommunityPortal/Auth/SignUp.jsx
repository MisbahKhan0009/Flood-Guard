// "use client";
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

const Signup = () => {
  const { user, createUser, loading } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [location, setLocation] = useState({ lat: null, long: null });

  const navigate = useNavigate();

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({ lat, long });
        },
        (error) => {
          toast.error("Location access denied.");
          console.error("Error retrieving location: ", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSelectChange = (value) => {
    setRole("");
    setRole(value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstname.value;
    const lastName = form.lastname.value;

    // Trigger location retrieval
    getLocation();

    if (!role) {
      toast.error("Please select a role.");
      return;
    }

    try {
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
        latitude: location.lat,
        longitude: location.long,
      };
      const userDataToSave = {
        name: `${firstName} ${lastName}`,
        email: email,
        role: role,
        latitude: location.lat,
        longitude: location.long,
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

      // Check if the API call was successful
      if (apiResponse.error) {
        toast.error(apiResponse.error);
      } else {
        // Clear session storage first
        sessionStorage.clear();
        sessionStorage.setItem("userData", JSON.stringify(userDataToSave));
      }

      setRole("");

      // Navigate based on role and user creation success
      if (user && role === "rescuer") {
        navigate("/rescue-portal");
      } else if (user && role === "victim") {
        navigate("/victim-portal");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
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
