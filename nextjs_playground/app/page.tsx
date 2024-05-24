
import Link from "next/link";

export default function Home() {

    return (
        <main>
            <h1>Welcome Onboard</h1>
            {/* <ToDashBoard /> */}
            <Link href={`/objects`}>Go to product display</Link>
            <br />
            <Link href={`/dashboard`}>Go to Dashboard</Link>
            <br />
            <Link href={`/login`}>Go to login</Link>
        </main>
    );
}
