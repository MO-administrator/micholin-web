import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, beforeEach } from "vitest";
import Card from "../components/Card.astro";

describe("<Card />", async () => {
  let renderResult: string;
  let container: AstroContainer;
  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it("Renders anchor tag with href", async () => {
    const result = await container.renderToString(Card, {
      props: {
        href: "/test-url-link",
      },
    });
    expect(result).toContain('href="/test-url-link"');
  });

  it("Renders slots", async () => {
    const result = await container.renderToString(Card, {
      slots: {
        default: "Card content",
      },
    });
    expect(result).toContain("Card content");
  });
});
