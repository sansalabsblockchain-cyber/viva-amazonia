import { withAuth } from "next-auth/middleware";
import { authSecret } from "@/lib/configs/auth/authSecret";

export default withAuth({
  secret: authSecret,
  pages: {
    signIn: "/sign-in",
  },
  
});

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
