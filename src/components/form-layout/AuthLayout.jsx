import AboutSection from "./AboutSection";

const AuthLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <AboutSection />
    <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-100">
      {children}
    </div>
  </div>
);

export default AuthLayout;
