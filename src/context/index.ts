import { create } from "zustand";

type MetadataTypes = null | {
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  requestUrl: string;
  ogSiteName: string;
  ogImage: Array<{ url: string }>;
};

interface MetadataStoreTypes {
  metadata: MetadataTypes;
  setMetadata: (a: MetadataTypes) => void;
}

const useMetadataStore = create<MetadataStoreTypes>()((set) => ({
  metadata: null,
  setMetadata: (metadata: MetadataTypes) => {
    set({ metadata });
  },
}));

export { useMetadataStore, type MetadataStoreTypes };
