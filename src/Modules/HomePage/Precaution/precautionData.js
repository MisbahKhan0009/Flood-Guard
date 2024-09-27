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
    icon: FiArrowUpCircle,
    gradient: "from-red-50 to-red-50",
    text: "text-red-700",
  },
  {
    id: 2,
    title: "Avoid Flooded Areas",
    description:
      "Do not walk or drive through floodwaters to avoid being swept away.",
    icon: FiAlertTriangle,
    gradient: "from-teal-50 to-teal-50",
    text: "text-teal-700",
  },
  {
    id: 3,
    title: "Get Weather Updates",
    description:
      "Stay updated on weather forecasts and flood warnings via radio or apps.",
    icon: FiRadio,
    gradient: "from-blue-50 to-blue-50",
    text: "text-blue-700",
  },
  {
    id: 4,
    title: "Prepare Emergency Kit",
    description:
      "Ensure you have an emergency kit with essential supplies like food and water.",
    icon: FiBox,
    gradient: "from-green-50 to-green-50",
    text: "text-green-700",
  },
  {
    id: 5,
    title: "Turn Off Utilities",
    description:
      "Turn off utilities such as electricity and gas to prevent electrical hazards.",
    icon: FiPower,
    gradient: "from-purple-50 to-purple-50",
    text: "text-purple-700",
  },
  {
    id: 6,
    title: "Help Others",
    description:
      "Check on neighbors, especially the elderly or disabled, during a flood.",
    icon: FiUsers,
    gradient: "from-pink-50 to-pink-50",
    text: "text-pink-700",
  },
];
