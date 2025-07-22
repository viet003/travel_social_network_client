import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size }) => {
  return (
    <ClipLoader
      color="#FFFFFF"
      size={size}
    />
  );
};

export default LoadingSpinner; 