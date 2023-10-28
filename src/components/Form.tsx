"use client";

import React from "react";

import { useMetadataStore } from "@/context";
import { useState, type ChangeEvent } from "react";

export default function Form() {
  const [inputField, setInputField] = useState("");
  const [apiStatus, setApiStatus] = useState<
    null | "is-loading" | "success" | "error"
  >(null);

  const { setMetadata } = useMetadataStore();

  const onSubmitHandler = async (
    event: ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setMetadata(null);

    if (inputField.length === 0) return;

    setApiStatus("is-loading");

    try {
      const res = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputField),
      });

      const data = await res.json();
      setApiStatus("success");

      setMetadata(data);
    } catch (error) {
      setApiStatus("error");
      console.log("ali, ", error);
    }
  };

  return (
    <form className="flex gap-2" onSubmit={onSubmitHandler}>
      <input
        type="url"
        placeholder="search"
        className={`grow rounded-md border p-2 outline-none duration-150 ${
          apiStatus === "success"
            ? "border-green-600 focus:shadow-[0_0_0_2px_white,0_0_0_4px_green]"
            : apiStatus === "error"
            ? "border-red-600 focus:shadow-[0_0_0_2px_white,0_0_0_4px_red]"
            : "focus:shadow-[0_0_0_2px_white,0_0_0_4px_black]"
        }`}
        value={inputField}
        onChange={(e) => {
          setInputField(e.target.value);
        }}
      />
      <button
        className={`rounded-md px-7 py-2 text-white duration-150 ${
          apiStatus === "success"
            ? "bg-green-600 focus:shadow-[0_0_0_2px_white,0_0_0_4px_green]"
            : apiStatus === "error"
            ? "bg-red-600 focus:shadow-[0_0_0_2px_white,0_0_0_4px_red]"
            : "bg-black focus:shadow-[0_0_0_2px_white,0_0_0_4px_black]"
        } ${apiStatus === "is-loading" && "animate-pulse cursor-not-allowed"}`}
        disabled={apiStatus === "is-loading"}
      >
        {apiStatus === "is-loading"
          ? "loading..."
          : apiStatus === "error"
          ? "Oops!"
          : "Send"}
      </button>
    </form>
  );
}
