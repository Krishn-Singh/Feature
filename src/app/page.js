"use client";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiLayers } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import ToggleButton from "./ToggleButton";

export default function Home() {
  const [data, setData] = useState({});
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const apiUrl = "http://localhost:3001/api/data";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleTheme = () => {
    console.log("is clicked");
    setTheme((previousTheme) => {
      if (previousTheme == "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };

  return (
    <div className={`flex gap-2 overflow-scroll ${theme === 'light' ? 'bg-white text-black' : 'bg-blue-500 text-white'}`}>
      <div className="h-screen border-r-8 border-white-500">
        <div className="h-full p-8 text-2xl flex flex-col justify-between">
          <div>
            <p className="mb-6">
              <BiHomeAlt2 />
            </p>
            <p>
              <FiLayers />
            </p>
          </div>
          <div className="">
            {theme === "dark" ? (
              <FaMoon onClick={handleTheme} />
            ) : (
              <FaSun onClick={handleTheme} />
            )}
          </div>
        </div>
      </div>
      <div className="h-screen grid grid-cols-10">
        <div className="h-full p-8 text-2xl border-r border-gray-500">
          <p className="mb-4">
            <BiHomeAlt2 />
          </p>
          <p>
            <FiLayers />
          </p>
        </div>
        <div>
          <div className="w-screen h-screen p-4 overflow-scroll">
            <div class="w-1/2 ">
              <h1 className="text-3xl font-bold mb-4 w-1/2">Accordion</h1>
              <Accordion
                accordion={"space"}
                allowMultipleExpanded
                className="border-none"
              >
                {Object.entries(data).map(([type, timeFiles]) => (
                  <AccordionItem key={type} title={type}>
                    <AccordionItemHeading className="accordion__heading active">
                      <AccordionItemButton>
                        <span className="menu-item-text">{type}</span>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Accordion
                        accordion={`accordion-${type}`}
                        allowMultipleExpanded
                      >
                        {Object.entries(timeFiles).map(([date, files]) => (
                          <AccordionItem key={date} title={date}>
                            <AccordionItemHeading className="accordion__heading active">
                              <AccordionItemButton>
                                <span className="menu-item-text">{date}</span>
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <Accordion
                                accordion={`accordion-${type}-${date}`}
                                allowMultipleExpanded
                              >
                                {Object.entries(files).map(([date, f]) => (
                                  <AccordionItem
                                    className="border-none"
                                    key={date}
                                    title={date}
                                  >
                                    <AccordionItemHeading className="accordion__heading active">
                                      <AccordionItemButton>
                                        <span className="menu-item-text">
                                          {date}
                                        </span>
                                      </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                      <Accordion
                                        className="border-none"
                                        accordion={`accordion-${type}-${date}-${f}`}
                                        allowMultipleExpanded
                                      >
                                        <ul>
                                          {f.map((file, i) => {
                                            return (
                                              <AccordionItem
                                                key={i}
                                                title={file}
                                              >
                                                <span key={i}>{file}</span>
                                              </AccordionItem>
                                            );
                                          })}
                                        </ul>
                                      </Accordion>
                                    </AccordionItemPanel>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </AccordionItemPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionItemPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
