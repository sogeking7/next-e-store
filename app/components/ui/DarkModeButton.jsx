import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {IconSun, IconMoon} from '@tabler/icons';

export const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      radius="md"
      color={dark ? 'yellow' : 'gray'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={20} /> : <IconMoon size={20} />}
    </ActionIcon>
  );
}