// src/components/common/Button.jsx
export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-primary"
    >
      {label}
    </button>
  );
}
