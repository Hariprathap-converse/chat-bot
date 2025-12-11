
import { toast } from "react-toastify";

export const showToastMessage = (errType:"success"|"error"|"warning",message:string) => {
    switch (errType) {
      case "success":
        return    toast.success(message, {
          position: "top-center",
          className:"!w-auto",
          theme:'dark',
        });
      case "error":
        return  toast.error(message, {
          position: "top-center",
          className:"!w-auto",
          theme:'dark',
        });
      case "warning":
        return toast.warning(message, {
          position: "top-center",
           className:"!w-auto",
           theme:'dark',
        });
    }
 
  };
