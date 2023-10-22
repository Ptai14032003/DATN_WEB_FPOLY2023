import Banner from "./banner/page";
import HeaderGuest from "./header/page";


export default function LayoutGuest() {
    return (
        <div className="w-[1440px]">
            <HeaderGuest />
            <Banner />
        </div>
    );
}
