"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isPopVisible, setIsPopVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // if user click outside the popup - popup will be closed
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    if (!isPopVisible) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopVisible]);

  return (
    <div className="flex justify-between pb-4 border-bottom mb-4 relative">
      <div>
        <Link href={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">
          Exploring Tomorrow&apos;s Innovations, <br /> One Byte at a Time.
        </p>
      </div>

      {status === "authenticated" ? (
        <>
          <div
            ref={popupRef}
            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg 
          rounded-md flex flex-col gap-2 text-right min-w-[160px] ${
            isPopVisible ? "flex" : "hidden"
          }`}
          >
            <div className="font-bold">{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <Link
              href={"/dashboard"}
              className="hover:underline"
              onClick={() => setIsPopVisible(false)}
            >
              Dashboard
            </Link>
            <Link
              href={"/create-post"}
              className="hover:underline"
              onClick={() => setIsPopVisible(false)}
            >
              Create Post
            </Link>
            <button onClick={() => signOut()} className="btn">
              Sign Out
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Link
              href={"/create-post"}
              className="hidden md:flex gap-2 items-center mr-6"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span>Create new</span>
            </Link>
            <Image
              src={session?.user?.image || ""}
              width={40}
              height={40}
              alt="Profile Image"
              className="rounded-full cursor-pointer"
              onClick={() => setIsPopVisible((prev) => !prev)}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Link href={"/sign-in"} className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}
