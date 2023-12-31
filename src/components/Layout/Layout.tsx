import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout: React.FC = () => {
    return (
        <div className="app min-h-screen flex flex-col items-center">
            <Header />
            <main className="w-full flex-1 bg-slate-100 flex flex-col items-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
