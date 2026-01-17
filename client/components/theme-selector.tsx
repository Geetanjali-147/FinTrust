'use client';

import { Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeSelector() {
  const { setTheme, theme } = useTheme();

  const palettes = [
    { id: 'sunset', name: 'Sunset', colors: 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500' },
    { id: 'ocean', name: 'Ocean', colors: 'bg-gradient-to-r from-blue-500 to-teal-500' },
    { id: 'forest', name: 'Forest', colors: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'neon', name: 'Neon', colors: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'vibrant', name: 'Vibrant', colors: 'bg-gradient-to-r from-red-500 to-yellow-500' },
    { id: 'tropical', name: 'Tropical', colors: 'bg-gradient-to-r from-green-400 to-yellow-400' },
    { id: 'cosmic', name: 'Cosmic', colors: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { id: 'mystic', name: 'Mystic', colors: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  ];

  const applyPalette = (paletteId: string) => {
    document.body.classList.remove(
      'palette-sunset',
      'palette-ocean',
      'palette-forest',
      'palette-neon',
      'palette-vibrant',
      'palette-rainbow',
      'palette-mystic',
      'palette-tropical',
      'palette-cosmic'
    );
    
    if (paletteId !== 'default') {
      document.body.classList.add(`palette-${paletteId}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <div className="p-2 text-xs font-medium text-muted-foreground">Color Palettes</div>
        {palettes.map((palette) => (
          <DropdownMenuItem
            key={palette.id}
            onClick={() => {
              applyPalette(palette.id);
              localStorage.setItem('selectedPalette', palette.id);
            }}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${palette.colors}`}></div>
              <span className="ml-2">{palette.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={() => {
            applyPalette('default');
            localStorage.removeItem('selectedPalette');
          }}
        >
          Default Colors
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}