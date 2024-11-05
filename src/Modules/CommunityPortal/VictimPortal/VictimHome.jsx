import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getGridColsClass } from "../../../utils/gridColsCalculator";
import {Button} from "../../../components/ui/button"
import Shelters from "../RescuePortal/ShelterList/Shelters";

const tabsData = [
  {
    label: "Shelter List",
    value: "shelterList",
    title: "List of Shelter",
    content: <Shelters />,
  },
];

const RescueHome = () => {
  const gridColsClass = getGridColsClass(tabsData.length);
  return (
    <>
      <div class="flex flex-wrap  h-[50vh] container rounder-2xl rounded mt-12 bg-opacity-15 bg-primary">
        <div class="w-full md:w-1/2 flex flex-col justify-center items-center  p-6">
          <h1 class="text-primary text-3xl font-semibold mb-4">
            Get Prediction
          </h1>
          <p class="text-lg mb-6 text-primary w-3/4 text-left">
            Our system provides accurate flood predictions based on real-time
            data to help you stay informed.
          </p>
          
          <Button variant={"default"}>Call For Help</Button>
          
        </div>

        <div class="w-full md:w-1/2 flex justify-center items-center p-6">
          <div class="w-full md:w-3/4 bg-opacity-21 bg-primary text-primary text-center p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-2">Predicted Probability</h2>
            <p class="text-4xl text-secondary font-semibold" id="prediction">
              --
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
