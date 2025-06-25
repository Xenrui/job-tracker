import AuthLayout from "../components/form-layout/AuthLayout";
import AuthForm from "../components/forms/AuthForm";

const LoginPage = () => (
  <AuthLayout>
    <AuthForm title="Login" buttonText="Login" />
  </AuthLayout>
);

export default LoginPage;
