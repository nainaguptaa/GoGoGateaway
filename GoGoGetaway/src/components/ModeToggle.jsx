import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="h-[3.5rem] w-[3.5rem] rounded-full"
    >
      {theme === 'light' ? (
        <Moon className="h-[2.5rem] w-[4rem]" />
      ) : (
        <Sun className="h-[2.5rem] w-[4rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
