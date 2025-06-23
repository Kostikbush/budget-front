"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

// копилка
import { TbPigMoney } from "react-icons/tb";
// доходы
import { GiReceiveMoney } from "react-icons/gi";
// расходы
import { GiPayMoney } from "react-icons/gi";

export const NavBar = () => {
  return (
    <Navbar isBlurred shouldHideOnScroll position="sticky" className="bottom-0 top-full left-0">
      <NavbarBrand>LOGO</NavbarBrand>
      <NavbarContent className="gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            <GiReceiveMoney />
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            <GiPayMoney />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <TbPigMoney />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
