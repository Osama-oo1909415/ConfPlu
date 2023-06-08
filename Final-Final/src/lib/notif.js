import Swal from "sweetalert2";

export function success(message) {
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: `${message}`,
    timer: 2000,
    showConfirmButton: false,
  });
}

// Error Alert
export function error(message) {
  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: `${message}`,
    timer: 2000,
    showConfirmButton: false,
  });
}

// Warning Alert
export function warning(message) {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: `${message}`,
    timer: 2000,
    showConfirmButton: false,
  });
}
