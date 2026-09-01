import { useAuth } from '@/providers/useAuth';
import { Badge, Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Header = () => {

  const { user, signOut } = useAuth()

  return (
    <>
      <header>
        <Flex justify="space-between" align="center" p="4" borderBottom="1px solid" borderColor="gray.700">
          <Heading asChild>
            <Link to="/">Emotion Diary</Link>
          </Heading>

          {user ? (
            <Flex gap="4" align="center">
              <Badge variant="subtle" colorPalette="teal">
                {user.is_anonymous ? 'Demo mode' : user.email}
              </Badge>

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
