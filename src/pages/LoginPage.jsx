import AuthLayout from "../components/form-layout/AuthLayout";
import AuthForm from "../components/login/AuthForm";

const LoginPage = () => (
  <AuthLayout>
    <AuthForm title="Login" buttonText="Login" />
  </AuthLayout>
);

export default LoginPage;
