"use client";
import { Button } from "@/components/ui/button";
import { Step } from "./stepper/step";
import { useStepper } from "./stepper/use-stepper";
import { StepItem } from "./stepper/types";
import { Stepper } from "./stepper/index";
import { Input } from "./ui/input";
import { useState } from "react";

const steps = [
  { label: "Step 1", description: "Product Description", optional: false },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

export default function StepperClickableSteps() {
  const [metadata, setMetadata] = useState([null]);
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => {
          alert(`Step ${step + 1} clicked`);
          setStep(step);
        }}
      >
        {steps.map((stepProps, index) => {
          return (
            <Step key={stepProps.label} {...stepProps}>
              <div className="h-[400px] flex flex-col gap-4 p-4 my-2 border bg-secondary text-primary rounded-md overflow-y-auto">
                <h1 className="text-xl text-center">{stepProps.description}</h1>
                {index === 0 && (
                  <div className="max-w-[70%] h-full justify-center gap-4 mx-auto flex flex-col">
                    <Input type="text" placeholder="Product Name" />
                    <Input type="text" placeholder="Product Description" />
                    <Input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                )}
                {index === 1 && (
                  <div className="max-w-[70%] h-full justify-center gap-4 mx-auto flex flex-col">
                    <Input type="text" placeholder="Statement Descriptor" />
                    <Input
                      type="text"
                      placeholder="Unit Label  e.g. seats, tiers"
                    />
                    <div className="text-primary">Metadata</div>
                    {metadata.map((data, i) => (
                      <div className="flex gap-4" key={i}>
                        <Input type="text" placeholder="Key" />
                        <Input type="text" placeholder="Value" />
                      </div>
                    ))}
                    <div
                      onClick={() => {
                        if (metadata.length < 4) {
                          setMetadata([...metadata, null]);
                        }
                      }}
                    >
                      +
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="max-w-[70%] h-full justify-center gap-4 mx-auto flex flex-col">
                    <div className="flex justify-between items-center gap-4">
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Price
                      </p>
                      <Input
                        type="number"
                        placeholder="$0.00"
                        step="0.01"
                        className="w-[128px]"
                      />
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <p className="leading-7 [&:not(:first-child)]:mt-6">
                        Inventory
                      </p>
                      <Input
                        type="number"
                        placeholder=""
                        step="1"
                        className="w-[128px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Step>
          );
        })}
        <Footer />
      </Stepper>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
