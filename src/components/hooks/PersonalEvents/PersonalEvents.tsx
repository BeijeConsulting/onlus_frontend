import React from "react";
import CardEventsMobile from "../../cardEvents/CardEventsMobile";

interface event {
  title: string;
  image: string;
  description: string;
  requirement: string;
  date: string;
  time: string;
  place: string;
}

interface Props {
  events: event[];
}

function PersonalEvents(props: Props) {
  return <div>PersonalEvents</div>;
}

export default PersonalEvents;
