import AboutSection from "../login/AboutSection";

const AuthLayout = ({ children }) => (
  <div
    className="bg-[#DCDAD3] min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('src/assets/bgLogin.png')" }}
  >
    <div className="flex h-screen">
      <AboutSection />
      <div className="flex w-full lg:w-1/2 items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
