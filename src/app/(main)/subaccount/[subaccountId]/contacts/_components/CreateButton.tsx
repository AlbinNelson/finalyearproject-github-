"use client";

import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import ContactDetails from "@/components/forms/ContactDetails";

type Props = {
  subaccountId: string;
};

const CreateContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal();

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title="Create or update contact information"
        subheading="Contacts are like customers."
      >
        <ContactDetails subaccountId={subaccountId} />
      </CustomModal>
    );
  };

  return (
    <Button
      onClick={handleCreateContact}
      className="inline-flex items-center gap-2"
    >
      <PlusCircle className="w-4 h-4" />
      Create Contact
    </Button>
  );
};

export default CreateContactButton;