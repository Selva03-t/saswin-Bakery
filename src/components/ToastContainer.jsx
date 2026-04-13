import { useToast } from "../context/ToastContext";

function ToastContainer() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
}

export default ToastContainer;
