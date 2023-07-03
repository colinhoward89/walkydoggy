import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  const { userId, isOwner, isWalker } = useAuth();

  return (
    <nav>
      <div className="logo" aria-label="Walky Doggy Logo">
        <Image
          src="/dog6.png"
          alt="Walky Doggy Logo"
          width={128}
          height={128}
          priority
        />
      </div>
      {isOwner && <Link href="/owneraccount/">Owner</Link>}
      {isWalker && <Link href="/walkeraccount/">Walker</Link>}
      {userId ? (
        <Link href="/logout">Logout</Link>
      ) : (
        <Link href="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
