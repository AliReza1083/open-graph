"use client";
import React from "react";
import Image from "next/image";

import { useMetadataStore } from "@/context";

export default function Display() {
  const { metadata } = useMetadataStore();

  if (metadata) {
    return (
      <a
        target="_blank"
        href={metadata.ogUrl || metadata.requestUrl}
        className="inline-block rounded-xl duration-100 hover:bg-gray-200"
        rel="noreferrer"
      >
        <div className="relative">
          <Image
            src={metadata.ogImage[0].url}
            width={500}
            height={300}
            alt=""
            className="w-full rounded-xl"
          />
          {metadata.ogSiteName && (
            <div className="absolute bottom-0 left-0 rounded-tr-lg bg-white/80 px-4 py-1 text-xs font-bold backdrop-blur-sm">
              {metadata.ogSiteName}
            </div>
          )}
        </div>
        <div className="space-y-1 p-2">
          <h1 className="text-xl font-bold tracking-tight">
            {metadata.ogTitle}
          </h1>
          <p className="text-sm opacity-80">{metadata.ogDescription}</p>
        </div>
      </a>
    );
  }
}
