import { ThemeSwitcher } from "@/features/theme/ui/ThemeSwitcher";

export const Header = () => {
  return (
    <header className="fixed top-0 right-0 m-4">
      <ThemeSwitcher />
    </header>
  );
};
