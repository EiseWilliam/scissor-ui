"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/icons";
import Link from "next/link";
import clsx from "clsx";
import { MidNavMenu } from "./navmenu";
import { Button } from "@/components/ui/button";

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [show, setShow] = useState(true);
	const [scrollPos, setScrollPos] = useState(0);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const visible = scrollPos > currentScrollPos;

			setScrollPos(currentScrollPos);
			setShow(visible);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollPos]);

	return (
		<motion.header
			className={clsx(
				"transition-all duration-300 ease-in-out z-[100] backdrop-blur-md fixed min-w-full bg-white bg-opacity-60 shadow h-20 max-h-48 items-center flex justify-center",
				{ "top-0": show, "top-[-100px]": !show },
			)}
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
		>
			<nav className="flex flex-row items-center justify-around w-full">
				<Link href="/" className="">
					<Logo />
				</Link>
				<div className="">
					<MidNavMenu />
				</div>
				<div className="flex items-center gap-10 mr-10 text-sm">
					<Link href="/login" className="text-blue-600 bg-none">Login</Link>
					<Link href="/register">register </Link>
				</div>
			</nav>
		</motion.header>
	);
}
