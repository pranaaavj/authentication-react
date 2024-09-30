import { useToast as useChakraToast } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export const useCustomToast = () => {
  const toast = useChakraToast();

  const showToast = (title, color) =>
    toast({
      duration: 4000,
      isClosable: false,
      render: () => (
        <Box
          color='black'
          p={3}
          width={250}
          bg={`${color}.300`}
          borderRadius='md'
          fontSize='sm'>
          {title}
        </Box>
      ),
    });

  return showToast;
};
