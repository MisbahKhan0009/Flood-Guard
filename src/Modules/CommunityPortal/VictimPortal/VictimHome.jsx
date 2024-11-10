import { useState } from "react"; // Import useState to manage local state
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGridColsClass } from "../../../utils/gridColsCalculator";
import { Button } from "../../../components/ui/button";
import Shelters from "../RescuePortal/ShelterList/Shelters";
import DeadBodies from "./DeadBodies/DeadBodies";

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

const RescueHome = () => {
  const [prediction, setPrediction] = useState(null); // State to hold prediction data
  const gridColsClass = getGridColsClass(tabsData.length);


  //1
  // Function to get prediction
  const getPrediction = async () => {
    const requestBody = {
      Station_Name: "1", // Replace with actual data if dynamic
      Month: "2", // Replace with actual data if dynamic
    };

    try {
      const response = await fetch("http://localhost:5046/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data); // Set the prediction data in state
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction({ error: "Failed to fetch prediction." }); // Handle error gracefully
    }
  };
//2
  return (
    <>
      <div className="flex flex-wrap h-[50vh] container rounded-2xl mt-12 bg-opacity-15 bg-primary">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
          <h1 className="text-primary text-3xl font-semibold mb-4">
            Get Prediction
          </h1>
          <p className="text-lg mb-6 text-primary w-3/4 text-left">
            Our system provides accurate flood predictions based on real-time
            data to help you stay informed.
          </p>
          <Button variant={"default"} onClick={getPrediction}>
            Get Prediction
          </Button>{" "}
          {/* Button to trigger prediction */}
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-6">
          <div className="w-full md:w-3/4 bg-opacity-21 bg-primary text-primary text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Predicted Probability</h2>
            <p
              className="text-4xl text-secondary font-semibold"
              id="prediction"
            >
              {prediction
                ? prediction.error
                  ? prediction.error
                  : `Predicted Class: ${prediction.Predicted_Class}, Probability: ${prediction.Probabilities.join(", ")}`
                : "- prediction data goes here -"}
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
    </>
  );
};

export default RescueHome;
