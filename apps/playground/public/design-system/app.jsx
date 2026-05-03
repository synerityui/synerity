/* global React, useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio, TweakColor, TweakToggle */
const { useState, useEffect } = React;
const {
  BrandArtboard, ColorsArtboard, TypeArtboard, SpacingArtboard, IconsArtboard,
} = window.SynA;
const { ButtonsArtboard, FormsArtboard, FeedbackArtboard } = window.SynB;
const { OverlaysArtboard, NavigationArtboard, DataArtboard } = window.SynC;
const { MemoryGraphArtboard, MotionArtboard } = window.SynD;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "primaryHue": 160,
  "density": 1,
  "radiusScale": 1
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tweaks.theme);
    root.style.setProperty("--syn-primary-h", tweaks.primaryHue);
    root.style.setProperty("--syn-density", tweaks.density);
    root.style.setProperty("--syn-radius-scale", tweaks.radiusScale);
  }, [tweaks]);

  return (
    <>
      <DesignCanvas
        title="Synerity — Design System"
        subtitle="v1.0 · React component library · tokens, headless, and skin"
      >
        <DCSection id="brand" title="Brand & Identity">
          <DCArtboard id="brand-1" label="Mark, type & application" width={1280} height={720}>
            <BrandArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="foundations" title="Foundations">
          <DCArtboard id="colors" label="Color tokens" width={1280} height={1080}>
            <ColorsArtboard/>
          </DCArtboard>
          <DCArtboard id="type" label="Typography scale" width={1280} height={900}>
            <TypeArtboard/>
          </DCArtboard>
          <DCArtboard id="space" label="Spacing · radius · shadow" width={1280} height={900}>
            <SpacingArtboard/>
          </DCArtboard>
          <DCArtboard id="icons" label="Iconography" width={1280} height={720}>
            <IconsArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="controls" title="Controls">
          <DCArtboard id="buttons" label="Buttons" width={1280} height={720}>
            <ButtonsArtboard/>
          </DCArtboard>
          <DCArtboard id="forms" label="Forms" width={1280} height={840}>
            <FormsArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="status" title="Feedback & Status">
          <DCArtboard id="feedback" label="Alerts, badges, progress" width={1280} height={720}>
            <FeedbackArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="overlays" title="Overlays & Navigation">
          <DCArtboard id="overlays-1" label="Modals, popovers, tooltips, menus" width={1280} height={800}>
            <OverlaysArtboard/>
          </DCArtboard>
          <DCArtboard id="nav" label="Tabs, breadcrumb, stepper, pagination" width={1280} height={780}>
            <NavigationArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="data" title="Data Display">
          <DCArtboard id="data-1" label="Stats, tables, cards" width={1280} height={800}>
            <DataArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="memory" title="@synerity/memory-graph">
          <DCArtboard id="memory-1" label="Graph viz, retrieval, token budget" width={1400} height={900}>
            <MemoryGraphArtboard/>
          </DCArtboard>
        </DCSection>

        <DCSection id="motion" title="Motion">
          <DCArtboard id="motion-1" label="Duration & easing tokens" width={1280} height={720}>
            <MotionArtboard/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme"/>
        <TweakRadio
          label="Mode"
          value={tweaks.theme}
          onChange={v => setTweak("theme", v)}
          options={["light", "dark"]}
        />

        <TweakSection label="Brand"/>
        <TweakSlider
          label="Primary hue"
          value={tweaks.primaryHue}
          min={0} max={360} step={1} unit="°"
          onChange={v => setTweak("primaryHue", v)}
        />
        <div style={{ display: "flex", gap: 6, marginTop: 2, flexWrap: "wrap" }}>
          {[
            { l: "Emerald", h: 160 },
            { l: "Indigo", h: 270 },
            { l: "Blue", h: 240 },
            { l: "Pink", h: 350 },
            { l: "Orange", h: 50 },
            { l: "Violet", h: 300 },
          ].map(p => (
            <button key={p.l} onClick={() => setTweak("primaryHue", p.h)} style={{
              fontSize: 11, padding: "4px 8px",
              borderRadius: 5, border: "1px solid rgba(0,0,0,.08)",
              background: `oklch(0.68 0.15 ${p.h})`,
              color: "white", cursor: "pointer", fontFamily: "inherit",
            }}>{p.l}</button>
          ))}
        </div>

        <TweakSection label="Layout"/>
        <TweakSlider
          label="Density"
          value={tweaks.density}
          min={0.85} max={1.2} step={0.05} unit="×"
          onChange={v => setTweak("density", v)}
        />
        <TweakSlider
          label="Radius scale"
          value={tweaks.radiusScale}
          min={0} max={2} step={0.25} unit="×"
          onChange={v => setTweak("radiusScale", v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
