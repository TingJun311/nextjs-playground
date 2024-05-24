
interface User {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: DateOfBirth;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
}

interface Name {
    title: string;
    first: string;
    last: string;
}

interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
}

interface Street {
    number: number;
    name: string;
}

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Timezone {
    offset: string;
    description: string;
}

interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

interface DateOfBirth {
    date: string;
    age: number;
}

interface Registered {
    date: string;
    age: number;
}

interface Id {
    name: string;
    value: string | null;
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

interface ApiResponse {
    results: User[];
    info: Info;
}


async function getData() {
    const res = await fetch("https://randomuser.me/api/", {
        cache: "no-store",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function Page() {
    const data: ApiResponse = await getData();

    return (
        <main>
            <h1>{data.info.seed}</h1>
            {data.results.map((i) => (
                <div key={i.login.uuid}>
                    <h2>
                        {i.name.title} {i.name.first} {i.name.last}
                    </h2>
                </div>
            ))}
        </main>
    );
}
