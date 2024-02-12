"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { Stream } from "stream";
import { useRouter } from "next/navigation";

type SectionContextType = {
	activeSection: string;
    setActiveSection: (section: string) => void
};

export const SectionContext = createContext<SectionContextType | null>(null);

export default function SectionProvider({
	children,
}: { children: React.ReactNode }) {
	const router = useRouter();
    const [activeSection, setActiveSection] = useState("My Urls")
	return (
		<SectionContext.Provider
			value={{
				activeSection,
                setActiveSection
			}}
		>
			{children}
		</SectionContext.Provider>
	);
}

export function UseSectionContext(): SectionContextType {
	const context = useContext(SectionContext);
	if (!context) {
		throw new Error("useSection must be used within an SectionProvider");
	}
	return context;
}
