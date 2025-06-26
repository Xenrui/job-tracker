import AuthLayout from "../components/form-layout/AuthLayout";
import AuthForm from "../components/forms/AuthForm";

const SignUpPage = () => (
  <AuthLayout>
    <AuthForm title="Sign Up" buttonText="Create Account" />
  </AuthLayout>
);

export default SignUpPage;
