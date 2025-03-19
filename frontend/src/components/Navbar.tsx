import Logo from "./Logo";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  return (
    <nav className="navbar flex justify-between bg-base-200 shadow-md px-4">
      <Logo />
      <ThemeSelector />
    </nav>
  );
}

export default Navbar;
