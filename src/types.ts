// types.ts or in the same file where you are using jwtDecode
import { JwtPayload as OriginalJwtPayload } from "jwt-decode";

// Extending the JwtPayload interface to include 'id'
export interface JwtPayload extends OriginalJwtPayload {
  id: string; // Add the 'id' field here
}
