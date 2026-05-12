import { Breadcrumb } from "@synerity/ui";
import { DemoSection } from "./shared";

export function BreadcrumbDemo() {
  return (
    <>
      <DemoSection
        title="Basic 3-level"
        col
        code={`<Breadcrumb\n  items={[\n    { label: "Home", href: "/" },\n    { label: "Components", href: "/components" },\n    { label: "Breadcrumb" },\n  ]}\n/>`}
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      </DemoSection>

      <DemoSection
        title="Custom separator"
        col
        code={`<Breadcrumb\n  separator="›"\n  items={[\n    { label: "Dashboard", href: "/dashboard" },\n    { label: "Settings", href: "/settings" },\n    { label: "Profile" },\n  ]}\n/>`}
      >
        <Breadcrumb
          separator="›"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Settings", href: "/settings" },
            { label: "Profile" },
          ]}
        />
      </DemoSection>
    </>
  );
}
