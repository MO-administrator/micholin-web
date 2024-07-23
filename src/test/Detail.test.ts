import { describe, expect, it, beforeEach } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Detail from "../components/Detail.astro";

describe("<Detail />", () => {
  let renderResult: string;
  let container: AstroContainer;
  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it('should render content in the "content" slot', async () => {
    renderResult = await container.renderToString(Detail, {
      slots: {
        content: `<p>Test Content</p>`,
      },
    });
    const contentElement = renderResult.includes("Test Content");
    expect(contentElement).toBeTruthy();
  });

  it('should render an image in the "cover-image" slot', async () => {
    renderResult = await container.renderToString(Detail, {
      slots: {
        "cover-image": `<img src="test-image.jpg" alt="Test Image">`,
      },
    });
    const imageElement = renderResult.includes("Test Image");
    expect(imageElement).toBeTruthy();
  });

  it("should handle multiple slots filled simultaneously", async () => {
    renderResult = await container.renderToString(Detail, {
      slots: {
        content: "<p>Test Content</p>",
        "cover-image": `<img src="test-image.jpg" alt="Test Image">`,
      },
    });
    const contentElement = renderResult.includes("Test Content");
    const imageElement = renderResult.includes("Test Image");
    expect(contentElement).toBeTruthy();
    expect(imageElement).toBeTruthy();
  });

  it("should handle empty slots gracefully", async () => {
    renderResult = await container.renderToString(Detail);
    const contentElement = renderResult.includes("Test Content");
    const imageElement = renderResult.includes("Test Image");
    expect(contentElement).toBeFalsy();
    expect(imageElement).toBeFalsy();
  });

  it("should render additional content outside named slots", async () => {
    renderResult = await container.renderToString(Detail, {
      slots: {
        default: `<p>This is additional content</p>`,
      },
    });
    const additionalContent = renderResult.includes(
      "This is additional content"
    );
    expect(additionalContent).toBeTruthy();
  });
});
