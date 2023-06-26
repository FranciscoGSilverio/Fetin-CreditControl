import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const openModal = (isSuccess = true, title: string, text: string) => {
  const MySwal = withReactContent(Swal);
  if (isSuccess) {
    return MySwal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#27374D",
    });
  } else
    return MySwal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#E06469",
      focusConfirm: false,
    });
};
