import React from "react";
import { Tag } from "antd";
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const statusMap = {
  "0": {
    text: "در انتظار",
    icon: <SyncOutlined spin />,
    color: "processing",
  },
  "1": {
    text: "تایید شده",
    icon: <CheckCircleOutlined />,
    color: "success",
  },
  "-1": {
    text: "رد شده",
    icon: <CloseCircleOutlined />,
    color: "error",
  },
};

const SessionTag = ({ status }) => {
  const { text, icon, color } = statusMap[status] || {};
  if (!text) return null;

  return (
    <Tag icon={icon} color={color}>
      {text}
    </Tag>
  );
};

export default SessionTag;
