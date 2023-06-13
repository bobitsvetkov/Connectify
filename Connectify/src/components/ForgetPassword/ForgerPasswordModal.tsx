import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { ForgotPasswordForm } from "./ForgetPasswordForm";
import { ForgotPassModalProps } from "../../types/interfaces";

const ForgotPassModal: React.FC<ForgotPassModalProps> = ({
  isOpen,
  onClose,
  onForgotPass,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <ForgotPasswordForm onSuccess={onClose} onForgotPass={onForgotPass} />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ForgotPassModal;
