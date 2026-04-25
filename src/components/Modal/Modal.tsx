import Box from "../Box/Box";
import { ReactNode } from "react"

const Modal = (props: Record<string, any> & {
  children: ReactNode
}) => {
  return (
    <div className="backdrop-blur-xs backdrop-brightness-50 w-screen h-screen p-2 absolute top-0 left-0 flex items-center justify-center">
      <Box className="p-2 rounded-2xl w-30">{props.children}</Box>
    </div>
  );
};

export default Modal;
