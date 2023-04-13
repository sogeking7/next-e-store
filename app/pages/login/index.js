import { AuthenticationForm } from "../../components/pages/auth/AuthentificationForm";
import { Modal } from "@mantine/core";

function Login() {
  return (
    <Modal opened={true} onClose={() => null} withCloseButton={false} size="sm" radius="xl">
      <AuthenticationForm />
    </Modal>
  )
}

export default Login;