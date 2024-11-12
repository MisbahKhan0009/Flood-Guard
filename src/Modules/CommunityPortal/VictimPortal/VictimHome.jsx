import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGridColsClass } from "../../../utils/gridColsCalculator";
import { Button } from "../../../components/ui/button";
import Shelters from "../RescuePortal/ShelterList/Shelters";
import DeadBodies from "./DeadBodies/DeadBodies";
import Modal from "../../../components/ui/modal";
import { toast } from "sonner";

const tabsData = [
  {
    label: "Shelter List",
    value: "shelterList",
    title: "List of Shelter",
    content: <Shelters />,
  },
  {
    label: "Deadbody List",
    value: "deadbodyList",
    title: "List of Deadbodies",
    content: <DeadBodies />,
  },
];

const VictimHome = () => {
  const [prediction, setPrediction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    NID: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    age: "",
    number_of_family_members: "",
    health_status: "",
    danger_level: "",
    rescue_status: "Unrescued",
    resources_needed: "Yes",
  });
  const gridColsClass = getGridColsClass(tabsData.length);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        ...userData,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitHelpRequest = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData) {
      // Define only the fields you need in the updated data
      const updatedData = {
        NID: formData.NID || userData.NID,
        address_area: formData.address_area || userData.address_area,
        address_district:
          formData.address_district || userData.address_district,
        address_upazila: formData.address_upazila || userData.address_upazila,
        age: formData.age || userData.age,
        danger_level: formData.danger_level || userData.danger_level,
        email: formData.email || userData.email,
        gender: formData.gender || userData.gender,
        health_status: formData.health_status || userData.health_status,
        latitude: formData.latitude || userData.latitude,
        longitude: formData.longitude || userData.longitude,
        mobile: formData.mobile || userData.mobile,
        name: formData.name || userData.name,
        number_of_family_members:
          formData.number_of_family_members ||
          userData.number_of_family_members,
        rescue_status: formData.rescue_status || userData.rescue_status,
        rescue_time: formData.rescue_time || userData.rescue_time,
        resources_needed:
          formData.resources_needed || userData.resources_needed,
      };

      console.log("Updated Data:", updatedData);

      try {
        const victimResponse = await fetch(
          `http://localhost:3000/api/victims/${userData.userId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
          }
        );

        // Rescue assignment logic, as before
        const rescueResponse = await fetch(
          "http://localhost:3000/api/rescue-assignments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              victim_id: userData.userId,
              status: "Pending",
            }),
          }
        );

        if (victimResponse.ok && rescueResponse.ok) {
          // Update sessionStorage with the newly updated fields
          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              ...userData,
              ...updatedData,
            })
          );

          toast.success("Help request submitted successfully.");
          setShowModal(false);
        } else {
          console.error("Failed to submit help request");
        }
      } catch (error) {
        console.error("Error submitting help request:", error);
      }
    } else {
      console.log("No user data in sessionStorage to submit help request");
    }
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=d709d5a8324946adadf203737242109&q=dhaka&days=1&aqi=yes`
      );
      const weatherData = await weatherResponse.json();

      const dayForecast = weatherData.forecast.forecastday[0].day;
      const requestBody = {
        Max_Temp: dayForecast.maxtemp_c,
        Min_Temp: dayForecast.mintemp_c,
        Rainfall: dayForecast.totalprecip_mm,
        Relative_Humidity: weatherData.current.humidity,
        Wind_Speed: dayForecast.maxwind_kph,
        Cloud_Coverage: weatherData.current.cloud,
        Bright_Sunshine: dayForecast.uv,
        Temp_Diff: dayForecast.maxtemp_c - dayForecast.mintemp_c,
        Rainfall_Squared: Math.pow(dayForecast.totalprecip_mm, 2),
      };

      getPrediction(requestBody);
    } catch (error) {
      setError("Error fetching weather data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPrediction = async (requestBody) => {
    console.log("Request Body:", JSON.stringify(requestBody));

    try {
      const requestBodyString = JSON.stringify(requestBody);
      const response = await fetch("http://127.0.0.1:5050/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": requestBodyString.length.toString(), // Explicit Content-Length
        },
        body: requestBodyString,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Received Data:", data);
      setPrediction(data); // Update state with received data
    } catch (error) {
      console.error("Error fetching prediction:", error.message);
      setPrediction({ error: "Failed to fetch prediction." });
    }
  };

  const toggleModal = () => setShowModal((prevShowModal) => !prevShowModal);

  return (
    <section>
      <div className="flex  flex-wrap h-[50vh] mx-8 rounded-2xl mt-12 bg-opacity-15 bg-primary">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h1 className="text-primary text-3xl font-semibold mb-4">
            Get Prediction
          </h1>
          <p className="text-lg mb-6 text-primary w-3/4 text-left">
            Our system provides accurate flood predictions based on real-time
            data to help you stay informed.
          </p>
          <Button
            variant={"default"}
            onClick={fetchWeatherData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Prediction"}
          </Button>
          <Button variant={"default"} className="mt-4" onClick={toggleModal}>
            Ask for Help
          </Button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div
            className={`text-center p-6 rounded-lg ${
              prediction
                ? prediction.error
                  ? "bg-primary" // Error background color (optional)
                  : prediction.risk === "High Risk"
                    ? "bg-red-500 bg-opacity-20 border-2 border-red-500 text-red-500"
                    : prediction.risk === "Medium Risk"
                      ? "bg-yellow-500 bg-opacity-20 border-2 border-yellow-500 text-yellow-500"
                      : prediction.risk === "Low Risk"
                        ? "bg-green-500 bg-opacity-20 border-2 border-green-500 text-green-500"
                        : "bg-primary text-secondary" // Default background if risk is unknown
                : "bg-primary text-secondary" // Default background if no prediction
            }`}
          >
            <p className="text-4xl font-semibold">
              {prediction
                ? prediction.error
                  ? prediction.error
                  : `Risk: ${prediction.risk}`
                : "Please click on the button to get prediction"}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="shelterList" className="container my-10">
        <TabsList className={`grid w-full mx-auto my-4 ${gridColsClass}`}>
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.value} className="text-lg" value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card>
              <CardHeader className="mx-auto w-full">
                <CardTitle className="font-museo font-light text-3xl">
                  {tab.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{tab.content}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Modal isOpen={showModal} onClose={toggleModal} className="bg-secondary">
        <div className="overflow-y-auto max-h-[80vh]">
          <h2 className="text-secondary text-2xl font-semibold mb-4">
            Ask for Help
          </h2>
          <form>
            {Object.keys(formData).map((key) => (
              <div key={key} className="mb-4">
                <label className="text-secondary font-medium">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  disabled={
                    key === "latitude" ||
                    key === "longitude" ||
                    key === "name" ||
                    key === "address_area" ||
                    key === "address_upazila" ||
                    key === "address_district" ||
                    key === "role" ||
                    key === "userId"
                  }
                  className={`w-full px-4 py-2 rounded-lg border border-primary text-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                    key === "latitude" ||
                    key === "longitude" ||
                    key === "name" ||
                    key === "address_area" ||
                    key === "address_upazila" ||
                    key === "address_district" ||
                    key === "role" ||
                    key === "userId"
                      ? "cursor-not-allowed text-primary bg-gray-100" // Apply extra classes for disabled input
                      : ""
                  }`}
                />
              </div>
            ))}
            <Button
              variant={"default"}
              onClick={handleSubmitHelpRequest}
              className="w-3/4 mx-auto mt-4"
            >
              Submit
            </Button>
            <Button
              variant={"secondary"}
              onClick={toggleModal}
              className="w-3/4 mt-4"
            >
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default VictimHome;
