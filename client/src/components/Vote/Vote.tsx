import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { RomaniaMap } from "../RomaniaMap/RomaniaMap";
import { Candidates } from "./Candidates";
import {
  UserOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { POST } from "../../services/http.client";

export const Vote: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState();

  const handleCountySelect = (county: string) => {
    setSelectedCounty(county);
  };

  const steps = [
    {
      title: "Județ",
      description: "Selectează unul din județele de pe hartă pentru a vota",
      icon: <EnvironmentOutlined />,
      content: <RomaniaMap onSelect={handleCountySelect} />,
    },
    {
      title: "Candidat",
      description: "Selectează candidatul preferat din listă",
      icon: <UserOutlined />,
      content: (
        <Candidates
          county={selectedCounty}
          selectedCandidate={selectedCandidate?.name}
          setSelectedCandidate={setSelectedCandidate}
        />
      ),
    },
    {
      title: "Confirmare",
      description: "Confirmă buletinul tău de vot",
      icon: <CheckCircleOutlined />,
      content: (
        <ConfirmationScreen
          county={selectedCounty}
          candidate={selectedCandidate?.name}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
    icon: item.icon,
  }));

  const isNextDisabled = Boolean(
    (currentStep === 0 && !selectedCounty) ||
      (currentStep === 1 && !selectedCandidate)
  );

  const handleClickPrev = () => {
    if (currentStep === 1) {
      setSelectedCounty("");
    } else if (currentStep === 2) {
      setSelectedCandidate("");
    }
    setCurrentStep(currentStep - 1);
  };

  const voteConfirmationHandler = async () => {
    await POST("candidates/vote", {
      body: JSON.stringify({ candidateId: selectedCandidate.id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    message.success("Procesare completă!");
  };

  return (
    <>
      <Steps current={currentStep} items={items} />
      {steps[currentStep].content}
      <div style={{ marginTop: 24 }}>
        {currentStep < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={isNextDisabled}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={voteConfirmationHandler}>
            Confirmare
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handleClickPrev}>
            Prev
          </Button>
        )}
      </div>
    </>
  );
};
