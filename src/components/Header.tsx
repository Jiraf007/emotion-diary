import { useAuth } from '@/providers/useAuth';
import { Button, Flex, Heading } from '@chakra-ui/react';

export const Header = () => {

  const { user, signOut } = useAuth()

  return (
    <>
      <header>
        <Flex justify="space-between" align="center" p="4" borderBottom="1px solid" borderColor="gray.700">
          <Heading>Emotion Diary</Heading>

          {user ? (
            <Flex gap="2" align="center">
              <span>{user.email}</span>

              <Button onClick={signOut}>
                Выйти
              </Button>
            </Flex>
          ) : (
            <span>Не авторизован</span>
          )}

        </Flex>
      </header>
    </>
  );
}