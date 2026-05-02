import { ReactNode } from "react";

type Tip = string | ReactNode | (() => string | ReactNode);

export const tips: Tip[] = [
  "Clicking the username in profile cards toggles between username and ID.",
  <span>In computer science, <code>NaN</code> (Not a Number) is classified as a number.</span>,
  "Let's get this show on the road!",
  "Mention with an ID by prefixing it with @&",
  "Perfect little packages, disposed of when it's finished",
  <span>Weathercord is open source. <a href="https://github.com/raynecloudy/weathercord" target="_blank"><u>https://github.com/raynecloudy/weathercord</u></a></span>,
  "you look so pretty today!"
];

export const getRandomTip = (random: number) => {
  const randomTip = tips[Math.floor(random * tips.length)];
  if (typeof randomTip === "function") return randomTip();
  return randomTip;
}
