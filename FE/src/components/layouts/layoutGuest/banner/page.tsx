import './page.css'
export default function Banner() {
    return (
        <div className="slider mx-[45px]">
            <div className="slides">
                <input type="radio" name="radio-btn" id="radio1" />
                <input type="radio" name="radio-btn" id="radio2" />
                <input type="radio" name="radio-btn" id="radio3" />
                <input type="radio" name="radio-btn" id="radio4" />
                <input type="radio" name="radio-btn" id="radio5" />
                <div className="slide first">
                    <img src="/banner.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/banner.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/banner.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/banner.png" alt="" />
                </div>
                <div className="slide">
                    <img src="/banner.png" alt="" />
                </div>
                <div className="navigation-auto">
                    <div className="auto-btn1"></div>
                    <div className="auto-btn2"></div>
                    <div className="auto-btn3"></div>
                    <div className="auto-btn4"></div>
                    <div className="auto-btn5"></div>
                </div>
            </div>
            <div className="navigation-manual">
                <label className="manual-btn" htmlFor="radio1"></label>
                <label className="manual-btn" htmlFor="radio2"></label>
                <label className="manual-btn" htmlFor="radio3"></label>
                <label className="manual-btn" htmlFor="radio4"></label>
                <label className="manual-btn" htmlFor="radio5"></label>
            </div>
        </div>
    );
}
