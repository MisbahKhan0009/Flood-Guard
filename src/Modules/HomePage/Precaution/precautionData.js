// src/data/precautionData.js
import {
  FiArrowUpCircle,
  FiAlertTriangle,
  FiRadio,
  FiBox,
  FiPower,
  FiUsers,
} from "react-icons/fi";

export const precautionData = [
  {
    id: 1,
    title: "Move to Higher ground",
    description:
      "Immediately move to higher ground or stay on high ground during a flood.",
    icon: FiArrowUpCircle, // You can replace this with an icon if needed.
    gradient: "from-red-50 to-red-100",
  },
  {
    id: 2,
    title: "Avoid Flooded Areas",
    description:
      "Do not walk or drive through floodwaters to avoid being swept away.",
    icon: FiAlertTriangle,
    gradient: "from-yellow-50 to-yellow-100",
  },
  {
    id: 3,
    title: "Monitor Weather Updates",
    description:
      "Stay updated on weather forecasts and flood warnings via radio or apps.",
    icon: FiRadio,
    gradient: "from-blue-50 to-blue-100",
  },
  {
    id: 4,
    title: "Prepare an Emergency Kit",
    description:
      "Ensure you have an emergency kit with essential supplies like food and water.",
    icon: FiBox,
    gradient: "from-green-50 to-green-100",
  },
  {
    id: 5,
    title: "Turn Off Utilities",
    description:
      "Turn off utilities such as electricity and gas to prevent electrical hazards.",
    icon: FiPower,
    gradient: "from-purple-50 to-purple-100",
  },
  {
    id: 6,
    title: "Help Others",
    description:
      "Check on neighbors, especially the elderly or disabled, during a flood.",
    icon: FiUsers,
    gradient: "from-pink-50 to-pink-100",
  },
];
