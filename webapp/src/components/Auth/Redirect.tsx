import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  let navigate = useNavigate();

  useEffect(() => navigate("/login"), []);
  return <></>;
};

export default Redirect;
