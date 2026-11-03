import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-3 py-1 focus:outline-none focus:border-primary";

const PopupDialog = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  // close on Escape + lock page scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (!form.address.trim()) next.address = "Please enter your address.";
    setErrors(next);
    // demo store: there is no backend, so a valid form just shows the confirmation
    if (Object.keys(next).length === 0) setDone(true);
  };

  return (
    <div
      className="popup h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order now"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white rounded-md duration-200 w-[min(320px,92vw)]"
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Order Now</h1>
          <button type="button" aria-label="Close" onClick={onClose}>
            <IoCloseOutline className="text-2xl" />
          </button>
        </div>

        {done ? (
          <div className="mt-4 text-center space-y-4" role="status">
            <p>
              Thanks, {form.name.trim()}! We&apos;ve received your order request.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="mt-4 space-y-3" onSubmit={submit} noValidate>
            {[
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["address", "Address", "text"],
            ].map(([field, label, type]) => (
              <div key={field}>
                <input
                  type={type}
                  value={form[field]}
                  onChange={update(field)}
                  placeholder={label}
                  aria-label={label}
                  aria-invalid={Boolean(errors[field])}
                  autoFocus={field === "name"}
                  className={inputClass}
                />
                {errors[field] && (
                  <p className="text-xs text-red-500 mt-1 px-2">{errors[field]}</p>
                )}
              </div>
            ))}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
              >
                Order Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const Popup = ({ open, onClose }) => (open ? <PopupDialog onClose={onClose} /> : null);

export default Popup;
