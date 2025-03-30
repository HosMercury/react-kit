import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/store/theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { CgDarkMode } from "react-icons/cg";
import { Toaster } from "react-hot-toast";

export const ThemeToggle: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { theme, setTheme } = useThemeStore();

  // Apply theme immediately when component mounts or theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={`text-xs ${className ?? ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          {theme === "dark" ? (
            <MoonIcon className="w-5 h-5" />
          ) : theme === "light" ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <CgDarkMode className="w-5 h-5" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => setTheme("light")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <SunIcon /> <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setTheme("dark")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <MoonIcon /> <span>Dark</span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onSelect={() => setTheme("system")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CgDarkMode /> <span>System</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            background: theme === "dark" ? "#1e293b" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#1e293b",
            border:
              theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
          },
        }}
      />
    </div>
  );
};
