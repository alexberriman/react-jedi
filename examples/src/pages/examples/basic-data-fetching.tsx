import React from "react";
import { render } from "@alexberriman/react-jedi";

const DataFetchingExample = () => {
  const spec = {
    type: "container",
    props: {
      className: "p-8 space-y-6",
    },
    children: [
      {
        type: "heading",
        props: { 
          level: 1, 
          children: "Basic Data Fetching Example" 
        },
      },
      {
        type: "text",
        props: {
          children: "This example shows how to bind data from an API to components using React Jedi's data system.",
          className: "text-gray-600 mb-8",
        },
      },
      {
        type: "text",
        props: {
          children: "User data will be loaded here:",
          className: "font-semibold mb-4",
        },
      },
      {
        type: "text",
        props: {
          // This will be bound to data later
          children: "Loading user data...",
          className: "text-gray-500",
        },
      },
    ],
  };

  return render(spec);
};

export default DataFetchingExample;