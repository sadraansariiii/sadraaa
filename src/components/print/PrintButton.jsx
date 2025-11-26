"use client";
import React from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Button from "../ui/Button";

const PrintButton = ({ printRef }) => {
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "invoice",
  });

  return (
    <Button label={"پرینت گزارش"} icon={<FaPrint />} onClick={handlePrint} />
  );
};

export default PrintButton;
