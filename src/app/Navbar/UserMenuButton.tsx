"use client";
import { Session } from "next-auth";
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic.jpg";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps {
  session: Session | null;
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <img
            className="w-10 rounded-full"
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        )}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>خروج</button>
          ) : (
            <button onClick={() => signIn()}>ورود</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;
