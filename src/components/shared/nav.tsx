import ServiceSwitcher from "./navServiceSwitcher";
import { UserNav } from "./navUser";

const Nav = () => {
  return (
    <nav className="bg-[#000000]">
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ServiceSwitcher />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
