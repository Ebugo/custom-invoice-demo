import React, { FC, memo } from "react";

interface IProps {
  srcDoc: string;
  className?: string;
}

const IFrame: FC<IProps> = memo(({ srcDoc, className }) => {
  return <iframe className={className} srcDoc={srcDoc} />;
});

IFrame.displayName = "IFrame";
export default IFrame;
