import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center p-10 bg-neutral-700  justify-self-end">
            <Link href="/">
                <Image src="/images/ApplyLogo.png" alt="Apply Digital Logo" width={170} height={44} />    
            </Link>
        </footer>
    )
}