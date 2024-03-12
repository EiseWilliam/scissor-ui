"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOutIcon, Logo } from "@/components/icons";
import Link from "next/link";
import clsx from "clsx";
import { MidNavMenu } from "./navmenu";
import { Button } from "@/components/ui/button";
import { AuthContextType, UseAuthContext } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
		const { isAuthenticated, setIsAuthenticated, setAccessToken } = UseAuthContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [show, setShow] = useState(true);
	const [scrollPos, setScrollPos] = useState(0);

	const handleLogOut = () => {
		localStorage.removeItem("refreshToken");
		setAccessToken("")
		setIsAuthenticated(false)
	}
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
	<header className="sticky transition-all duration-300 ease-in-out z-[1] backdrop-blur-md min-w-full max-w-screen bg-white bg-opacity-60 shadow h-20 max-h-48 items-center flex justify-center">

		{/* // 	<motion.header
		// 	className={clsx(
		// 		"sticky transition-all duration-300 ease-in-out z-[100] backdrop-blur-md min-w-full max-w-screen bg-white bg-opacity-60 shadow h-20 max-h-48 items-center flex justify-center",
		// 		{ "top-0": show, "top-[-100px]": !show },
		// 	)}
		// 	initial={{ y: -100, opacity: 0 }}
		// 	animate={{ y: 0, opacity: 1 }}
		// > */}
			<nav className="w-full flex flex-row items-center justify-between px-10">
				<Link href="/" className="">
					<Logo />
				</Link>
				<div className="flex gap-10 flex-row w-72">
					<MidNavMenu />
					{isAuthenticated ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild className="pointer">
								<Avatar>
									<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
									<AvatarFallback>User</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent  className="relative z-[2]">
								<DropdownMenuItem onClick={handleLogOut}>
									<LogOutIcon className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<div className="flex items-center gap-2 mr-10 text-sm">
							<Link href="/login" className="text-blue-600 bg-none">
								Login
							</Link>
							<Link href="/register">register </Link>
						</div>
					)}
				</div>
			</nav>
		{/* </motion.header> */}
		</header>
	);
}
