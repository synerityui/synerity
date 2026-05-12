import { useState } from "react";
import { Slider } from "@synerity/ui";
import { DemoSection } from "./shared";

export function SliderDemo() {
  const [volume, setVolume] = useState(50);
  const [stars, setStars] = useState(3);

  return (
    <>
      <DemoSection
        title="Basic"
        col
        code={`<Slider label="Volume" showValue defaultValue={50} />`}
      >
        <Slider
          label="Volume"
          showValue
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
        />
      </DemoSection>

      <DemoSection
        title="Step — star rating"
        col
        code={`<Slider label="Rating" showValue min={1} max={5} step={1} defaultValue={3} />`}
      >
        <Slider
          label="Rating"
          showValue
          value={stars}
          onChange={setStars}
          min={1}
          max={5}
          step={1}
        />
      </DemoSection>

      <DemoSection
        title="Sizes"
        col
        code={`<Slider size="sm" label="Small" defaultValue={40} />\n<Slider size="md" label="Medium" defaultValue={60} />\n<Slider size="lg" label="Large" defaultValue={80} />`}
      >
        <Slider size="sm" label="Small" defaultValue={40} />
        <Slider size="md" label="Medium" defaultValue={60} />
        <Slider size="lg" label="Large" defaultValue={80} />
      </DemoSection>
    </>
  );
}
