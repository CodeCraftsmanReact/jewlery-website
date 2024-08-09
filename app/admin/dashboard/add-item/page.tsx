import StepperClickableSteps from "@/components/Stepper";

export default function Page() {
  return (
    <div className="w-[80%] mt-16">
      <h2 className="scroll-m-20 text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Add a Product
      </h2>
      <StepperClickableSteps />
    </div>
  );
}

/*
we need to add the following sectioned options for creating a product.
1. Name
2. Description
3. Image(s)

4. Statement Description
5. Unit label
6. Metadata

7. Price
8. Inventory
*/
