// components/RegisterModal.jsx
"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

const RegisterModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    role: "",
    diseases: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register Your Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              type="date"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Select role"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </Select>
          </FormControl>
          {formData.role === "patient" && (
            <FormControl mt={4}>
              <FormLabel>Diseases</FormLabel>
              <Input
                name="diseases"
                value={formData.diseases}
                onChange={handleChange}
                placeholder="List any diseases"
              />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
