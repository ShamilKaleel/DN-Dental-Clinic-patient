import {
  ServiceDentalImplants,
  ServiceDentalBridges,
  ServiceOrthodonticTreatment,
  ServiceRootCanalTreatment,
  ServiceWisdomTeethExtraction,
  ServiceTeethWhitening,
  Doctor,
} from "../assets/index";

const dummySchedule = [
  {
    id: 1,
    date: "October 18, 2024",
    day_of_week: "Friday",
    time: "08:00 AM",
    active_appointment: "01",
    status: "Available",
  },
  {
    id: 2,
    date: "November 18, 2024",
    day_of_week: "Monday",
    time: "09:30 AM",
    active_appointment: "02",
    status: "Unavailable",
  },
  {
    id: 3,
    date: "December 19, 2024",
    day_of_week: "Thursday",
    time: "11:00 AM",
    active_appointment: "03",
    status: "Available",
  },
  {
    id: 4,
    date: "January 19, 2025",
    day_of_week: "Sunday",
    time: "01:30 PM",
    active_appointment: "04",
    status: "Unavailable",
  },
  {
    id: 5,
    date: "May 20, 2025",
    day_of_week: "Thursday",
    time: "03:00 PM",
    active_appointment: "05",
    status: "Available",
  },
  {
    id: 6,
    date: "September 20, 2025",
    day_of_week: "Thursday",
    time: "05:30 PM",
    active_appointment: "06",
    status: "Unavailable",
  },
  {
    id: 7,
    date: "April 21, 2025",
    day_of_week: "Monday",
    time: "07:00 PM",
    active_appointment: "07",
    status: "Available",
  },
];

const services = [
  {
    name: "Dental Implants",
    image: ServiceDentalImplants,
    description:
      "Dental implants are titanium tooth roots placed in the jawbone to support artificial teeth, providing a stable, natural-looking, and long-lasting solution for tooth loss. They fuse with the jawbone over time, improving chewing, speech, and facial structure.",
    link: "/services",
  },
  {
    name: "Orthodontic Treatment",
    image: ServiceOrthodonticTreatment,
    description:
      "Orthodontic treatment uses braces, aligners, and other devices to correct misaligned teeth and jaw issues, improving dental function, appearance, and oral health.",
    link: "/services",
  },
  {
    name: "Dental Bridges",
    image: ServiceDentalBridges,
    description:
      "Dental bridges replace missing teeth by bridging the gap between natural teeth, using crowns on adjacent teeth to hold artificial teeth in place. They improve chewing, speaking, and facial shape, offering a durable solution when implants aren’t suitable.",
    link: "/services",
  },
  {
    name: "Root Canal Treatment",
    image: ServiceRootCanalTreatment,
    description:
      "Root canal treatment is a dental procedure to remove infected or damaged tissue (pulp) from inside a tooth. The inside of the tooth is then cleaned, disinfected, and sealed to prevent further infection. This treatment can save a severely decayed or infected tooth, relieving pain and preserving its function.",
    link: "/services",
  },

  {
    name: "Teeth Whitening",
    image: ServiceTeethWhitening,
    description:
      "TTeeth whitening is a cosmetic procedure that lightens teeth and removes stains, enhancing their appearance. It can be done professionally or with at-home products, resulting in a brighter smile.",
    link: "/services",
  },
  {
    name: "Wisdom Teeth Extraction",
    image: ServiceWisdomTeethExtraction,
    description:
      "Wisdom teeth extraction removes problematic third molars to prevent pain, infection, or crowding, helping to avoid future dental issues.",
    link: "/services",
  },
];

export { dummySchedule, services };
