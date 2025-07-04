import AuthLayout from "../components/layout/AuthLayout";
import AuthForm from "../components/login/AuthForm";

const SignUpPage = () => (
  <AuthLayout>
    <AuthForm title="Sign Up" buttonText="Create Account" />
  </AuthLayout>
);

export default SignUpPage;
