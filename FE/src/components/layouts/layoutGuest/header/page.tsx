
export default function HeaderGuest() {
    return (
        <div className="bg-primary/30 fixed z-40 w-full text-white transition duration-500 navbar mx-[38px]">
            <div>
                <img src="/logo.png" alt="" width={100} />
            </div>
            <div>
                <nav className="ml-12 hidden xl:flex items-center gap-10 z-30">
                    <a className="hover:text-red-500 text-white" href="">Home</a>
                    <a className="hover:text-red-500 text-white" href="">News & Preferential</a>
                    <a className="hover:text-red-500 text-white" href="">About us</a>
                    <a className="hover:text-red-500 text-white" href="">Ticket</a>
                </nav>
            </div>
            <div>
                
            </div>
        </div>
    );
}
