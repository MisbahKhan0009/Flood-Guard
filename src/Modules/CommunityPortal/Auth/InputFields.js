export const inputFields = [
  {
    id: "firstname",
    label: "First name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    id: "lastname",
    label: "Last name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter Password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Retype Password",
  },
];

// Rescuer specific fields
export const rescuerFields = [
  {
    id: "NID",
    label: "National ID (NID)",
    type: "text",
    placeholder: "Enter NID",
  },
  {
    id: "organization",
    label: "Organization",
    type: "text",
    placeholder: "Enter organization (optional)",
  },
  {
    id: "skills",
    label: "Skills",
    type: "text",
    placeholder: "Enter your skills",
  },
  {
    id: "availability_status",
    label: "Availability Status",
    type: "select",
    options: ["Available", "Unavailable"],
  },
];

// Victim specific fields
export const victimFields = [
  {
    id: "NID",
    label: "National ID (NID)",
    type: "text",
    placeholder: "Enter NID",
  },
  {
    id: "number_of_family_members",
    label: "Number of Family Members",
    type: "number",
    placeholder: "Enter number of family members",
  },
  {
    id: "health_status",
    label: "Health Status",
    type: "text",
    placeholder: "Enter health status",
  },
  {
    id: "danger_level",
    label: "Danger Level",
    type: "select",
    options: ["Low", "Medium", "High"],
  },
];
