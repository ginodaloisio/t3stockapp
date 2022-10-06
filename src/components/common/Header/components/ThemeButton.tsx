import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export enum Themes {
  Dark = "dark",
  Light = "light",
}

const ThemeButton = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(isDarkMode ? Themes.Light : Themes.Dark);
  }

  const isDarkMode = theme === Themes.Dark;

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="group flex w-12 cursor-pointer flex-col items-center sm:w-20"
    >
      {isDarkMode ? (
        <SunIcon className="mb-1 h-8 group-hover:animate-bounce" />
      ) : (
        <MoonIcon className="mb-1 h-8 group-hover:animate-bounce" />
      )}
      <p className="tracking-widest opacity-0 group-hover:opacity-100">
        {isDarkMode ? "CLARO" : "OSCURO"}
      </p>
    </button>
  );
};

export default ThemeButton;
