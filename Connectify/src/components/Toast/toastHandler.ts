import { useToast } from "@chakra-ui/react";

const useToastHandler = () => {
    const toast = useToast();

    const showToast = (title: string, description: string, status: "info" | "warning" | "success" | "error") => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 9000,
            isClosable: true,
            position: "top",
        });
    };

    return showToast;
};

export default useToastHandler;