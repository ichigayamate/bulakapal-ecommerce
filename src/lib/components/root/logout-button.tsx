"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Modal from "@components/modal";
import toast from "react-hot-toast";
import {logout} from "@actions/auth";
import {useRouter} from "next/navigation";

export default function LogoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout().then(() => {
      toast.success("Logout success");
      router.refresh();
    });
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Logout"
        description="Logout from Bulakapal?"
        onConfirm={handleLogout}
      />
    </>
  );
}