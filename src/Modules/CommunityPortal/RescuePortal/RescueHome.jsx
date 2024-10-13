import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Victims from "./VictimList/Victims";
import Shelters from "./ShelterList/Shelters";
import Donations from "./DonorList/Donors";
import { getGridColsClass } from "../../../utils/gridColsCalculator";

const tabsData = [
  {
    label: "Victims",
    value: "victimList",
    title: "List of Victims",
    content: <Victims />,
  },
  {
    label: "Shelter List",
    value: "shelterList",
    title: "List of Shelter",
    content: <Shelters />,
  },
  {
    label: "Donation List",
    value: "donationList",
    title: "List of Donations",
    content: <Donations />,
  },
];

const RescueHome = () => {
  const gridColsClass = getGridColsClass(tabsData.length);
  return (
    <Tabs defaultValue="victimList" className="container my-10">
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
  );
};

export default RescueHome;
