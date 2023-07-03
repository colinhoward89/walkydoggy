import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="content" role="main">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
        <Footer />
    </div>
  );
};

export default Layout;