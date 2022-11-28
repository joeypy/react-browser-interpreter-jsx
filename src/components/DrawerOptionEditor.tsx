import { useState } from 'react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import {
  NumberInput,
  TextInput,
  Button,
  Box,
  Group,
  Drawer,
  Select,
  Title,
  SegmentedControl,
  Center,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';

interface Props {}

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  age: z
    .number()
    .min(18, { message: 'You must be at least 18 to create an account' }),
});

export const DrawerOptionEditor = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState('dark');

  const toggleColorScheme = (value: 'light' | 'dark') => {
    setColorScheme(value);
  };

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Title underline order={3}>
            Settings
          </Title>
        }
        padding="xl"
        size="md"
        position="right"
      >
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Group position="center" my="xl">
              <SegmentedControl
                value={colorScheme}
                onChange={(value: 'light' | 'dark') => toggleColorScheme(value)}
                data={[
                  {
                    value: 'light',
                    label: (
                      <Center>
                        <IconSun size={16} stroke={1.5} />
                        <Box ml={10}>Light</Box>
                      </Center>
                    ),
                  },
                  {
                    value: 'dark',
                    label: (
                      <Center>
                        <IconMoon size={16} stroke={1.5} />
                        <Box ml={10}>Dark</Box>
                      </Center>
                    ),
                  },
                ]}
              />
            </Group>
            {/* <TextInput
              withAsterisk
              label="Name"
              placeholder="John Doe"
              mt="sm"
              {...form.getInputProps('name')}
            />
            <NumberInput
              withAsterisk
              label="Age"
              placeholder="Your age"
              mt="sm"
              {...form.getInputProps('age')}
            /> */}
            <Select
              label="Selecciona el lenguaje del editor"
              placeholder="Pick one"
              data={[
                {
                  value: 'js',
                  label: 'JavaScript',
                  image: '/icons8-typescript-48.png',
                },
                {
                  value: 'ts',
                  label: 'TypeScript',
                  image:
                    'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
                },
                { value: 'jsx', label: 'React' },
                { value: 'tsx', label: 'React TypeScript' },
              ]}
            />

            <Group position="right" mt="xl">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Drawer>

      <Group position="right">
        <Button onClick={() => setOpened(true)}>Open Drawer</Button>
      </Group>
    </>
  );
};
