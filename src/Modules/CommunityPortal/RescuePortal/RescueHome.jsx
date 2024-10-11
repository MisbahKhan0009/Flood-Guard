import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Victims from "./Victims";
import VictimList from "./VictimList";

const RescueHome = () => {
  return (
    <Tabs defaultValue="victimList" className="container my-10">
      <TabsList className="grid w-full mx-auto my-4 grid-cols-2">
        <TabsTrigger className="text-lg" value="victimList">
          Victims
        </TabsTrigger>
        <TabsTrigger className="text-lg" value="victims2">
          Victim List
        </TabsTrigger>
      </TabsList>
      <TabsContent value="victimList">
        <Card>
          <CardHeader className="mx-auto w-full">
            <CardTitle>List of Victims</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Victims />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="victims2">
        <Card>
          <CardHeader>
            <CardTitle>Victim List</CardTitle>
            <CardDescription>
              Change your victims2 here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VictimList />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RescueHome;
