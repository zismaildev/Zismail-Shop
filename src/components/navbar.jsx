import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

export default function NavbarComp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    const menuItems = [
        { label: "Product", url: "/products/products" },
        { label: "Term & Condition", url: "/contents/about" },
        { label: "Docs", url: "/contents/docs" },
    ];

    // Helper function to check if user has admin or developer role
    const isAuthorized = session?.user?.role === "admin" || session?.user?.role === "developer";

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <Link href="/" color="foreground">
                    <NavbarBrand>
                        <p className="font-bold text-inherit">Zismail Shop</p>
                    </NavbarBrand>
                </Link>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link color="foreground" href={item.url}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
                {isAuthorized && (
                    <NavbarItem>
                        <Link color="foreground" href="/admin/dashboard">
                            Dashboard
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {session ? (
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Avatar"
                                size="sm"
                                src={session.user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2" href="/personal/profile">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{session.user.name}</p>
                            </DropdownItem>
                            {isAuthorized && (
                                <DropdownItem href="/admin/dashboard">Dashboard</DropdownItem>
                            )}
                            <DropdownItem key="help_and_feedback">PayMent</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <Button
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    >
                        <Link href="/personal/login" color="foreground">
                            Please Login
                        </Link>
                    </Button>
                )}
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                        <Link color="foreground" className="w-full" href={item.url}>
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {isAuthorized && (
                    <NavbarMenuItem>
                        <Link color="foreground" className="w-full" href="/admin/dashboard">
                            Dashboard
                        </Link>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    );
}
