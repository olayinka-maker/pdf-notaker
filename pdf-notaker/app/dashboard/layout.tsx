import { UserButton } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className=" flex ">

            <div className=" fixed shadow-md h-screen w-44">
                <Sidebar/>
            </div>

        <div className="md:ml-72 w-full">
          <div>
          <Header/>
          </div>
            {children}
        </div>
     </div>
    );
  }
  