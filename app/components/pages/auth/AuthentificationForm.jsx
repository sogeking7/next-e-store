import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {signIn} from "next-auth/react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import {GoogleButton} from "./buttons/GoogleButton"
import {GitHubButton} from "./buttons/GitHubButton";

export function AuthenticationForm(props) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="md">

      <Group mb="md" mt="md" >
        <GoogleButton signIn={signIn}/>
        <GitHubButton/>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
              size="md"
            />
          )}

          <TextInput
            required
            placeholder="Email address"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
            size="md"
          />

          <PasswordInput
            required
            placeholder="Password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
            size="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" size="md" color="indigo.5" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}