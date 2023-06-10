import "./alert.css";

export default function Alert({ message, status }) {
  if (!status) {
    status = "danger";
  }
  return <div className={`alert ${status}`}>{message}</div>;
}
