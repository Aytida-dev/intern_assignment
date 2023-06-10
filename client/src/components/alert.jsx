import "./alert.css";

export default function Alert({ message }) {
  return <div className={`alert danger`}>{message}</div>;
}
