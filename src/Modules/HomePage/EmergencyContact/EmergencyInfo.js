import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { LuHelpingHand } from "react-icons/lu";
import { MdOutlineFireTruck } from "react-icons/md";
import { TbSailboat } from "react-icons/tb";
import { IoHelpBuoySharp } from "react-icons/io5";
import { PiAmbulance } from "react-icons/pi";
export const emergencyContacts = [
  {
    name: "National Helpline",
    number: "999",
    icon: LuHelpingHand,
  },
  {
    name: "Fire Service",
    number: "+02-2233555555",
    icon: MdOutlineFireTruck,
  },
  {
    name: "Army Helpline",
    number: "+88015501-50061",
    icon: FaPersonMilitaryRifle,
  },
  {
    name: "Coast Guard Helpline",
    number: "+8804662-75341",
    icon: IoHelpBuoySharp,
  },
  {
    name: "Emergency Ambulance",
    number: "+8801234-56789",
    icon: PiAmbulance,
  },
  {
    name: "Emergency Boat Service" ,
    number: "+8809876-54321",
    icon: TbSailboat,
  },
];
