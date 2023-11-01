"use client";

import { Button } from "shared";

export default function Home() {
  return (
    <>
      <Button text="Click me" onClick={() => alert("Button clicked")} />
    </>
  );
}
