import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WidgetFormModal from "./WidgetFormModal";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/slices/dashboardSlice";

const AddWidgetButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (data: { type: any; title: string; config: any }) => {
    dispatch(addWidget(data));
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setModalOpen(true)}
      >
        Add Widget
      </Button>

      <WidgetFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddWidgetButton;
