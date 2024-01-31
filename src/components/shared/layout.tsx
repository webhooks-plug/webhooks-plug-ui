import { PropsWithChildren } from "react";
import Nav from "./nav";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default AppLayout;
