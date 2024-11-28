// @ts-nocheck

import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import OpenAI from "openai";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth-form";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaSquare } from "react-icons/fa";
import { GoSquareFill } from "react-icons/go";
import { useUserStore } from "./store/user.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fs from "fs";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";

import pdfToText from "react-pdftotext";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  BrowserRouter,
  Route,
  Routes,
  useFetcher,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDataLog } from "@/store/dataLog";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WellcomeTypingAnimation = () => {
  const phrases = [". . .", ""];
  const [currentPhrase, setCurrentPhrase] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [opacities, setOpacities] = useState([]);

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 50;
  const PAUSE_BETWEEN_PHRASES = 2000;
  const FADE_SPEED = 300;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeText = useCallback(async () => {
    const currentText = phrases[currentIndex].split(" ");

    if (isTyping) {
      if (currentPhrase.length < currentText.length) {
        setCurrentPhrase(currentText.slice(0, currentPhrase.length + 1));
        setOpacities((prev) => [...prev, false]);
        // Trigger fade-in after a brief delay
        await sleep(50);
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = true;
          return newOpacities;
        });
        await sleep(TYPING_SPEED);
      } else {
        setIsTyping(false);
        await sleep(PAUSE_BETWEEN_PHRASES);
      }
    } else {
      if (currentPhrase.length > 0) {
        // Fade out last word
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = false;
          return newOpacities;
        });
        await sleep(FADE_SPEED);
        setCurrentPhrase((prev) => prev.slice(0, -1));
        setOpacities((prev) => prev.slice(0, -1));
        await sleep(DELETING_SPEED);
      } else {
        setIsTyping(true);
        setCurrentIndex((current) => (current + 1) % phrases.length);
        await sleep(TYPING_SPEED);
      }
    }
  }, [currentPhrase, currentIndex, isTyping, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeText, 200);
    return () => clearTimeout(timer);
  }, [currentPhrase, typeText]);

  return (
    <div className="font-sans text-xl">
      {currentPhrase.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block text-sm transition-opacity duration-300 ease-in-out
            ${opacities[index] ? "opacity-100" : "opacity-0"}`}
        >
          {word}
          {index < currentPhrase.length - 1 ? <>&nbsp;</> : ""}
        </span>
      ))}
    </div>
  );
};

const ProgressAnimation = () => {
  const phrases = ["connecting . . .", "processing . . ."];
  const [currentPhrase, setCurrentPhrase] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [opacities, setOpacities] = useState([]);

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 50;
  const PAUSE_BETWEEN_PHRASES = 2000;
  const FADE_SPEED = 300;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeText = useCallback(async () => {
    const currentText = phrases[currentIndex].split(" ");

    if (isTyping) {
      if (currentPhrase.length < currentText.length) {
        setCurrentPhrase(currentText.slice(0, currentPhrase.length + 1));
        setOpacities((prev) => [...prev, false]);
        // Trigger fade-in after a brief delay
        await sleep(50);
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = true;
          return newOpacities;
        });
        await sleep(TYPING_SPEED);
      } else {
        setIsTyping(false);
        await sleep(PAUSE_BETWEEN_PHRASES);
      }
    } else {
      if (currentPhrase.length > 0) {
        // Fade out last word
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = false;
          return newOpacities;
        });
        await sleep(FADE_SPEED);
        setCurrentPhrase((prev) => prev.slice(0, -1));
        setOpacities((prev) => prev.slice(0, -1));
        await sleep(DELETING_SPEED);
      } else {
        setIsTyping(true);
        setCurrentIndex((current) => (current + 1) % phrases.length);
        await sleep(TYPING_SPEED);
      }
    }
  }, [currentPhrase, currentIndex, isTyping, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeText, 100);
    return () => clearTimeout(timer);
  }, [currentPhrase, typeText]);

  return (
    <div className="font-sans text-xl">
      {currentPhrase.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block transition-opacity duration-300 ease-in-out
            ${opacities[index] ? "opacity-100" : "opacity-0"}`}
        >
          {word}
          {index < currentPhrase.length - 1 ? <>&nbsp;</> : ""}
        </span>
      ))}
    </div>
  );
};

const TypingAnimation = () => {
  const phrases = ["Understand People", "Like Never Before"];
  const [currentPhrase, setCurrentPhrase] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [opacities, setOpacities] = useState([]);

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 50;
  const PAUSE_BETWEEN_PHRASES = 2000;
  const FADE_SPEED = 300;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeText = useCallback(async () => {
    const currentText = phrases[currentIndex].split(" ");

    if (isTyping) {
      if (currentPhrase.length < currentText.length) {
        setCurrentPhrase(currentText.slice(0, currentPhrase.length + 1));
        setOpacities((prev) => [...prev, false]);
        // Trigger fade-in after a brief delay
        await sleep(50);
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = true;
          return newOpacities;
        });
        await sleep(TYPING_SPEED);
      } else {
        setIsTyping(false);
        await sleep(PAUSE_BETWEEN_PHRASES);
      }
    } else {
      if (currentPhrase.length > 0) {
        // Fade out last word
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = false;
          return newOpacities;
        });
        await sleep(FADE_SPEED);
        setCurrentPhrase((prev) => prev.slice(0, -1));
        setOpacities((prev) => prev.slice(0, -1));
        await sleep(DELETING_SPEED);
      } else {
        setIsTyping(true);
        setCurrentIndex((current) => (current + 1) % phrases.length);
        await sleep(TYPING_SPEED);
      }
    }
  }, [currentPhrase, currentIndex, isTyping, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeText, 350);
    return () => clearTimeout(timer);
  }, [currentPhrase, typeText]);

  return (
    <div className="font-sans text-xl">
      {currentPhrase.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block transition-opacity duration-300 ease-in-out
            ${opacities[index] ? "opacity-100" : "opacity-0"}`}
        >
          {word}
          {index < currentPhrase.length - 1 ? <>&nbsp;</> : ""}
        </span>
      ))}
    </div>
  );
};

const CustomTypingAnimation = ({ inputWords }) => {
  const phrases = inputWords ? inputWords : ["Text no set", "Text no set"];
  const [currentPhrase, setCurrentPhrase] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [opacities, setOpacities] = useState([]);

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 50;
  const PAUSE_BETWEEN_PHRASES = 2000;
  const FADE_SPEED = 300;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeText = useCallback(async () => {
    const currentText = phrases[currentIndex].split(" ");

    if (isTyping) {
      if (currentPhrase.length < currentText.length) {
        setCurrentPhrase(currentText.slice(0, currentPhrase.length + 1));
        setOpacities((prev) => [...prev, false]);
        // Trigger fade-in after a brief delay
        await sleep(50);
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = true;
          return newOpacities;
        });
        await sleep(TYPING_SPEED);
      } else {
        setIsTyping(false);
        await sleep(PAUSE_BETWEEN_PHRASES);
      }
    } else {
      if (currentPhrase.length > 0) {
        // Fade out last word
        setOpacities((prev) => {
          const newOpacities = [...prev];
          newOpacities[newOpacities.length - 1] = false;
          return newOpacities;
        });
        await sleep(FADE_SPEED);
        setCurrentPhrase((prev) => prev.slice(0, -1));
        setOpacities((prev) => prev.slice(0, -1));
        await sleep(DELETING_SPEED);
      } else {
        setIsTyping(true);
        setCurrentIndex((current) => (current + 1) % phrases.length);
        await sleep(TYPING_SPEED);
      }
    }
  }, [currentPhrase, currentIndex, isTyping, phrases]);

  useEffect(() => {
    const timer = setTimeout(typeText, 400);
    return () => clearTimeout(timer);
  }, [currentPhrase, typeText]);

  return (
    <div className="font-sans text-xl">
      {currentPhrase.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block transition-opacity duration-300 ease-in-out
            ${opacities[index] ? "opacity-100" : "opacity-0"}`}
        >
          {word}
          {index < currentPhrase.length - 1 ? <>&nbsp;</> : ""}
        </span>
      ))}
    </div>
  );
};
import { AudioRecorder } from "react-audio-voice-recorder";
import { Pointer, ThumbsDown, ThumbsUp } from "lucide-react";
// ------------------------------------------------------------------------

const Gradient = () => {
  return <DotLottieReact src="grad.lottie" loop autoplay />;
};

function NoGrantedAcessPage() {
  return (
    <>
      <div className="w-full flex items-center justify-center px-4 flex-col static ">
        <div className=" border-black-200 self-start absolute top-4  ">
          <h1 className="font-medium font-sans text-xl flex items-center justify-center gap-1">
            <GoSquareFill /> Persona
          </h1>
        </div>

        <iframe
          className="size-80 "
          src="https://lottie.host/embed/cb876956-c26f-4440-879c-5fa9fd720cac/z8TzayfPU2.lottie"
        ></iframe>
        <div className="box h-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Please Use Dekstop to Access Our Platform
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
}

function AuthenticationPage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <div className="w-3/4 flex items-center justify-center px-4 flex-col static ">
        <div className=" border-black-200 self-start absolute top-4  ">
          <h1 className="font-medium font-sans text-xl flex items-center justify-center gap-1">
            <GoSquareFill /> Persona
          </h1>
        </div>
        {/* <iframe
          className="size-80"
          src="https://lottie.host/embed/7fc30622-7b4e-4d32-82ca-35567069db83/V9HMG7lFDc.lottie"
        ></iframe> */}
        <iframe
          className="size-80"
          src="https://lottie.host/embed/cb876956-c26f-4440-879c-5fa9fd720cac/z8TzayfPU2.lottie"
        ></iframe>
        <div className="box h-4">
          <TypingAnimation />
        </div>
      </div>
      <div className="container w-1/2 h-screen flex items-center justify-center px-8 bg-gray-100">
        <AuthForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </>
  );
}

function SetCasesPage() {
  const [userData, setUserData] = useState(() => {
    try {
      const storedData = localStorage.getItem("userData");
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
      return null;
    }
  });
  const [response, setResponse] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [documentsInput, setDocumentsInput] = useState("");
  const [combinedInput, setCombinedInput] = useState("");

  const [bulkResponses, setBulkResponses] = useState([]);
  const [currentSelectedDocument, setCurrentSelectedDocument] = useState("");
  const [iframeVisible, setIframeVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const [wellcomeVisible, setWellcomeVisible] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { setData, logData } = useDataLog();

  const audio = useRef(null);

  console.log("User Data:", userData);

  const openaiInstance = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API,
    dangerouslyAllowBrowser: true,
  });

  const handleUserInput = (e) => {
    const newUserInput = e.target.value; // Get the current value from the input
    setUserInput(newUserInput); // Update userInput state with the new value
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDocument = async (event) => {
    setDocumentsInput("");

    const files = event.target.files;
    const allTexts = [];
    if (files.length) {
      setIframeVisible(true);
    } else if (!files.length) {
      setIframeVisible(false);
    } //make sure no bug appear when user cancel to upload file

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      pdfToText(file)
        .then((text) => {
          const documentObject = {
            filename: file.name,
            text: text,
          };

          allTexts.push(documentObject);
          setDocumentsInput((prevInputs) => [...prevInputs, documentObject]);
        })
        .catch((error) =>
          console.error("Failed to extract text from pdf", error)
        );

      setTimeout(() => {
        const element = document.getElementById(
          `document-${files.length > 200 ? allTexts.length - 1 : i}`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      await delay(100);
    }
    const value = files.length - 1 >= 250 ? 900 : 50;
    await delay(500);
    document
      .getElementById(`document-${allTexts.length - 1}`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
    await delay(value);
    document
      .getElementById(`document-0`)
      .scrollIntoView({ behavior: "smooth", block: "end" });

    // Hide iframe after 2 seconds
    setTimeout(() => {
      setIframeVisible(false);
    }, 2000);
  };

  const handleCombined = () => {
    if (!combinedInput) {
      console.log("empty input");
      toast("Data Required", {
        description:
          "Please upload & select the document or append manual essay before propagate",
      });
      return;
    }
    setCombinedInput(
      `${documentsInput[0] ? documentsInput[0].text : ""} ${userInput}`
    );
  };

  const handleSubmitAI = async () => {
    if (!combinedInput) {
      console.log("empty input");
      toast("Data Required", {
        description:
          "Please upload & select the document or append manual essay",
      });
      return;
    }
    document.getElementById("carousel")?.classList.remove("hidden");

    if (!bulkResponses.length) setProgressVisible(true);
    else setProgressVisible(false);
    setWellcomeVisible(false);

    const completion = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: import.meta.env.VITE_PROMPT1,
        },
        {
          role: "user",
          content: combinedInput,
        },
      ],
    });

    console.log({ userInput });

    const message = completion.choices[0].message?.content || "no response";

    const newObjectResponse = {
      filename: currentSelectedDocument.filename,
      response: message,
    };

    setBulkResponses([newObjectResponse]);

    console.log(message);
    setResponse(message);

    textToSpeech(message);
  };

  const handleBulkSubmitAI = async (namefile, input) => {
    if (!input || typeof input !== "string") {
      console.error(`Invalid input for file: ${namefile}`);
      return; // Return early if input is invalid
    }
    document.getElementById("carousel")?.classList.remove("hidden");
    setCombinedInput(input);
    if (!bulkResponses.length) setProgressVisible(true);
    else setProgressVisible(false);
    setWellcomeVisible(false);

    const completion = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: import.meta.env.VITE_PROMPT1,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const message = completion.choices[0].message?.content || "no response";

    const newObjectResponse = {
      filename: namefile,
      response: message,
    };

    setBulkResponses((prevResponse) => [...prevResponse, newObjectResponse]);
  };

  const textToSpeech = async (text) => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);
    const url = "https://api.v7.unrealspeech.com/speech";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: import.meta.env.VITE_SYNTH_API,
      },
      body: JSON.stringify({
        Text: text,
        VoiceId: "Liv",
        Bitrate: "192k",
        Speed: "0",
        Pitch: "1",
        TimestampType: "sentence",
      }),
    };
    console.log("Text for speech synthesis:", text);

    if (audio.current) {
      audio.current.pause(); // Pause the current audio
      audio.current.currentTime = 0; // Reset to the start
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        const mp3Url = json?.OutputUri;

        if (mp3Url) {
          audio.current = new Audio(mp3Url);

          audio.current
            .play()
            .catch((err) => console.error("Audio Playback error:", err));
        } else {
          console.error("MP3 URL not found in the response");
        }
      })
      .catch((err) => console.error(err));

    setIsAnalyzing(false);
  };

  // const speechToText = async () => {
  //   const transcription = await openaiInstance.audio.transcriptions.create({
  //     file: fs.createReadStream("sample.m4a"),
  //     model: "whisper-1",
  //   });

  //   console.log(transcription.text);
  // };

  const addAudioElement = (blob) => {
    const audioSpot = document.getElementById("spot-audio");
    const url = URL.createObjectURL(blob);
    const audio = audioSpot.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audioSpot.body.appendChild(audio);
  };

  const extractPart = (key, text) => {
    const regex = new RegExp(`${key}: (.*?)(\\n|\\||$)`, "i"); // Regex to match the part after the key
    const match = text?.match(regex);
    return match ? match[1].trim() : null; // Trim the result to remove extra spaces
  };

  const tags = Array.from({ length: documentsInput.length }).map(
    (_, i, a) => `>${documentsInput[i].filename.slice(0, 50).toLowerCase()}...`
  );

  const mapToCard = (input) => {
    const prosArray = input?.split(",") || [];
    return prosArray;
  };

  const handlePick = (index) => {
    setCurrentSelectedDocument(documentsInput[index]);
    setCombinedInput(documentsInput[index]?.text);

    if (bulkResponses) {
      setResponse(bulkResponses[index].response || "");
    }
    const symbols = document.querySelectorAll("#symbol");

    symbols.forEach((symbol) => {
      symbol.classList.remove("hidden");
    });
  };

  const clearCombinedInput = () => {
    setResponse("");
    document.getElementById("carousel")?.classList.add("hidden");
    setCombinedInput("");
    setWellcomeVisible(true);
    setDocumentsInput("");

    const symbols = document.querySelectorAll("#symbol");

    symbols.forEach((symbol) => {
      symbol.classList.add("hidden");
    });
  };

  const handleBulkAuto = async () => {
    if (!documentsInput) {
      console.log("empty input");
      toast("Document Required", {
        description: "Please upload pdf documents before Bulk Auto",
      });

      return;
    }

    for (let i = 0; i < documentsInput.length; i++) {
      await handleBulkSubmitAI(
        documentsInput[i]?.filename,
        documentsInput[i]?.text
      );
      if (i > 0) {
        setProgressVisible(false);
      }
    }
  };

  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Function to programmatically simulate a click on CarouselNext
  const simulateNextClick = () => {
    if (nextButtonRef.current) {
      nextButtonRef.current.click(); // Simulate the mouse clickca
    }
  };

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < bulkResponses.length) {
        simulateNextClick(); // Simulate the next click
        handlePick(i);
        i++; // Increment the counter
      } else {
        clearInterval(interval); // Stop the interval once all clicks have been simulated
      }
    }, 50);
    // Clean up the interval if the component is unmounted or `bulkResponses` changes
    return () => clearInterval(interval);
  }, [bulkResponses]);

  const grabData = () => {
    console.log(JSON.stringify(bulkResponses));
  };

  useEffect(() => {
    setProgressVisible(false);
  }, [bulkResponses]);

  const handleDataLog = () => {
    const profile = {
      name: "riki",
      usia: 17,
    };

    const context = {
      input: "abc",
      output: "cde",
    };

    setData({ profile, history, context }); // Set data in the zustand store
    logData(); // Log the updated data
  };

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Alpha Model</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Set Case</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex h-[calc(100vh-4rem)] w-full p-4 items-center justify-center">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full w-full rounded-lg border md:min-w-[450px]"
          >
            <ResizablePanel defaultSize={60} className="w-full">
              <div className="h-full w-full p-6 overflow-auto">
                <div className="flex flex-col items-center justify-start min-h-full">
                  <iframe
                    className="size-20 "
                    src="https://lottie.host/embed/cb876956-c26f-4440-879c-5fa9fd720cac/z8TzayfPU2.lottie"
                  ></iframe>
                  <div className="w-full font-semibold mt-5 flex justify-center items-center flex-col p-1 m-1 border rounded-lg shadow-md">
                    <div className="w-full flex items-center justify-center">
                      <Carousel
                        orientation="vertical"
                        opts={{
                          align: "start",
                        }}
                        className="w-full max-w-sm"
                      >
                        <span className="w-full h-full absolute flex items-center justify-center">
                          {wellcomeVisible && <WellcomeTypingAnimation />}
                        </span>

                        <CarouselContent
                          id="carousel"
                          className="-mt-1 h-[100px] hidden"
                        >
                          {progressVisible ? (
                            <span className="w-full h-full flex items-center justify-center">
                              <ProgressAnimation />
                            </span>
                          ) : (
                            ""
                          )}

                          {Array.from({
                            length: bulkResponses.length,
                          }).map((_, index) => (
                            <CarouselItem
                              key={index}
                              className="pt-1 md:basis-1/2"
                            >
                              <div className="p-1">
                                <Card onClick={() => handlePick(index)}>
                                  <CardContent className="flex  items-center justify-center p-6">
                                    <span className="text-sm font-semibold">
                                      {bulkResponses[
                                        index
                                      ].filename.toLowerCase()}
                                    </span>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex items-center justify-end">
                          <CarouselPrevious />
                          <CarouselNext ref={nextButtonRef} />
                        </div>
                      </Carousel>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Here is the brain"
                    className="min-h-[70px] text-xs"
                    value={combinedInput}
                  />
                  <div className="flex items-center justify-center w-full flex-col">
                    {mapToCard(extractPart("mbti", response)).map(
                      (item, index) => (
                        <div
                          key={index}
                          className="p-1 m-1 border rounded-lg shadow-md text-sm w-full"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex">
                    <div className="font-semibold mt-2 flex flex-col p-1 m-1 border rounded-lg shadow-md">
                      <div id="symbol" className="self-end pr-2 hidden">
                        <ThumbsUp />
                      </div>
                      <div className="flex flex-wrap">
                        {mapToCard(extractPart("pros", response)).map(
                          (item, index) => (
                            <div
                              key={index}
                              className="p-1 m-1 border rounded-lg shadow-md text-sm"
                            >
                              {item}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="font-semibold mt-2 flex flex-col p-1 m-1 border rounded-lg shadow-md">
                      <div id="symbol" className="self-end pr-2 hidden">
                        <ThumbsDown />
                      </div>
                      <div className="flex flex-wrap">
                        {mapToCard(extractPart("cons", response)).map(
                          (item, index) => (
                            <div
                              key={index}
                              className="p-1 m-1 border rounded-lg shadow-md text-sm"
                            >
                              {item}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <iframe
                      className="mt-auto translate-y-16"
                      src="https://lottie.host/embed/578159f6-1ec6-44d5-aa57-9ea6ff6cc8d9/WOeuzJp5tY.lottie"
                    /> */}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="w-full">
              <ResizablePanelGroup direction="vertical" className="h-full">
                <ResizablePanel defaultSize={40} className="w-full ">
                  <div className="h-full w-full p-6 pt-0 overflow-y-auto ">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <header className="sticky top-0 bg-white z-10 w-full ">
                        <h4 className="mb-4 text-sm font-medium leading-none pt-1">
                          <span className="flex items-center h-4 mt-2">
                            <span className="">Payload </span>
                            {iframeVisible && (
                              <div className="h-8 overflow-hidden flex items-center py-0 my-0">
                                <iframe
                                  className="size-20 m-0 "
                                  src="https://lottie.host/embed/917f7f43-7087-4907-9ab3-73f0efd063cf/wnPkm5jDUs.lottie"
                                  title="Lottie Animation"
                                ></iframe>
                              </div>
                            )}
                          </span>
                          {!tags.length ? (
                            <p className="text-s">
                              <em id="no-file-upload">(no file uploaded)</em>
                            </p>
                          ) : (
                            ""
                          )}
                        </h4>
                      </header>
                      <ScrollArea className="h-full w-full rounded-md border mb-8">
                        <div className="p-4">
                          {tags.map((tag, index) => (
                            <>
                              <div
                                id={`document-${index}`}
                                key={tag}
                                className="text-sm cursor-pointer hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePick(index);
                                }}
                              >
                                {tag}
                              </div>
                              <Separator className="my-2" />
                            </>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70} className="w-full">
                  <div className="h-full w-full p-6 overflow-auto ">
                    <div className="flex items-center justify-center flex-col gap-2">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="documents">pdf</Label>
                        <Input
                          className="w-full"
                          id="file"
                          type="file"
                          onChange={handleDocument}
                          accept="application/pdf"
                          multiple
                        />
                      </div>
                      <Textarea
                        placeholder="manual append essay."
                        onChange={(e) => handleUserInput(e)}
                        className="min-h-[100px]"
                        value={userInput}
                      />
                      <div className="flex gap-1 w-full items-center justify-center">
                        <Button className="w-full" onClick={clearCombinedInput}>
                          Clear
                        </Button>
                        <Button className="w-full " onClick={handleCombined}>
                          Propagate
                        </Button>
                        <Button className="w-full" onClick={handleSubmitAI}>
                          Analyze
                        </Button>
                      </div>
                      <Button className="w-full" onClick={handleBulkAuto}>
                        Bulk Auto
                      </Button>
                      {/* <Button className="w-full" onClick={handleDataLog}>
                          Test Function
                        </Button> */}

                      <div id="audio-spot" />
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarInset>
    </>
  );
}

function AnotherPage() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="w-full h-full flex items-center justify-center">
          <h1>Hi, this is another dimensions</h1>
        </div>
      </SidebarInset>
    </>
  );
}

function AlphaPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/case");
    toast("Under Development", {
      description: "",
    });
  }, [navigate]);
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <h1 className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-600">
          Alpha Page - Under Development
        </h1>
      </SidebarInset>
    </>
  );
}
function ComingSoonPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/case");
    toast("Coming Soon!", {
      description: "",
    });
  }, [navigate]);
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <h1 className="w-full h-full flex items-center justify-center text-xl font-semibold text-gray-600">
          Coming Soon!
        </h1>
      </SidebarInset>
    </>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedValue = localStorage?.getItem("isLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isLoggedIn" && event.storageArea === localStorage) {
        const isLoggedIn = JSON.parse(
          localStorage.getItem("isLoggedIn") || "false"
        );

        const storedUserData = localStorage.getItem("userData");
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        if (!isLoggedIn) {
          // Kalo `isLoggedIn` dihapus atau di-set ke `false`, reload halaman
          localStorage.removeItem("userData");
          window.location.reload();
        } else if (isLoggedIn && !userData) {
          localStorage.setItem("isLoggedIn", false);
        }
      }
    };

    const handleUserDataStorageChange = (event: StorageEvent) => {
      if (event.key === "userData" && event.storageArea === localStorage) {
        const storedUserData = localStorage.getItem("userData");
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        if (!userData) {
          // Kalo `userData` dihapus atau di-set ke <empty>, reload halaman & set log in to false
          localStorage.setItem("isLoggedIn", false);
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("storage", handleUserDataStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storage", handleUserDataStorageChange);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/authenticate") {
      navigate("/case"); // Arahkan ke halaman default.
    } else if (!isLoggedIn) {
      navigate("/authenticate");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/authenticate");
    }
  }, [isLoggedIn, localStorage]);

  // Detect mobile device on mount
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/mobile|android|iphone|ipad|ipod/.test(userAgent)) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <SidebarProvider>
          <Routes>
            <Route
              path="*"
              element={
                <Navigate to={isLoggedIn ? "/case" : "/authenticate"} replace />
              }
            />

            {isLoggedIn ? (
              <>
                <Route
                  path="/case"
                  element={isMobile ? <NoGrantedAcessPage /> : <SetCasesPage />}
                />
                <Route
                  path="/alpha"
                  element={isMobile ? <NoGrantedAcessPage /> : <AlphaPage />}
                />
                <Route
                  path="/explorer"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/quanta"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/introduction"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/tutorials"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/general"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/team"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/billing"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
                <Route
                  path="/limits"
                  element={
                    isMobile ? <NoGrantedAcessPage /> : <ComingSoonPage />
                  }
                />
              </>
            ) : (
              <Route
                path="/authenticate"
                element={
                  isMobile ? (
                    <NoGrantedAcessPage />
                  ) : (
                    <AuthenticationPage
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  )
                }
              />
            )}
          </Routes>
        </SidebarProvider>
      </div>
    </>
  );
}

export default App;
