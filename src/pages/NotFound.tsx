import { Compass } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

export default function NotFound() {
  return (
    <ComingSoon
      icon={Compass}
      title="Page Not Found"
      description="The page you're looking for doesn't exist or hasn't been built yet."
    />
  );
}
