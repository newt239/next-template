import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

function ExampleComponent() {
  return <p>Vitestセットアップが完了しました。</p>;
}

describe("exampleComponent", () => {
  it("テキストを表示する", () => {
    render(<ExampleComponent />);

    expect(screen.getByText("Vitestセットアップが完了しました。")).toBeInTheDocument();
  });
});
