import React from "react";

import Display from "@/components/Display";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="mx-auto max-w-lg space-y-8 px-4 pt-12">
      <Form />
      <Display />
    </main>
  );
}
