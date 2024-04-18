import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
  return (
    <>
      <h1 className="text-4xl mb-4">Download Link Expired</h1>
      <Button size={"lg"} asChild>
        <Link href={`/order`}>Get new Link</Link>
      </Button>
    </>
  );
}
