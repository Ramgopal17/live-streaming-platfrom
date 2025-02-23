import { useContext, useRef, useState } from "react";
import "../App.css"
import VideoPlayer from "./VideoPlayer";
import dd_national_logo from "../assets/vidthumbnil/dd_national.webp"
import dd_sports_logo from "../assets/vidthumbnil/dd_sports.webp"
import dd_news_logo from "../assets/vidthumbnil/dd_news.webp"
import dd_bharti_logo from "../assets/vidthumbnil/dd_bharti.webp"
import dd_india_logo from "../assets/vidthumbnil/dd_india.webp"
import dd_kisaan_logo from "../assets/vidthumbnil/dd_kisaan.webp"
import dd_up_logo from "../assets/vidthumbnil/dd_up.webp"
import sansad_tv1_logo from "../assets/vidthumbnil/sansad_tv1.webp"
import sansad_tv2_logo from "../assets/vidthumbnil/sansad_tv2.webp"
import xm9 from "../assets/vidthumbnil/9xm.webp"
import masti_logo from "../assets/vidthumbnil/masti.webp"
import b4Movie_logo from "../assets/vidthumbnil/b4movie.webp"
import E24_logo from "../assets/vidthumbnil/E24.webp"
import live_tv_data from "../assets/vidinfofile/dd_stream.json"

function Homepage({ setexpandAcMenuState }) {
    const [ShowVideoComp, setShowVideoComp] = useState(false)
    const [NetStreamURL, setNetStreamURL] = useState("")
    const VideoSource = useRef(0)
    const VideoTitle = useRef(0)
    const VideoDesc = useRef(0)

    const logo_list = { "1": dd_national_logo, "2": dd_sports_logo, "3": dd_news_logo, "4": dd_bharti_logo, "5": dd_india_logo, "6": dd_kisaan_logo, "7": dd_up_logo, "8": sansad_tv1_logo, "9": sansad_tv2_logo, "10": xm9, "11": masti_logo, "12": b4Movie_logo, "13": E24_logo }

    function loadvideocomp(vidsrc, vidtitle, videdesc) {
        setexpandAcMenuState(false)
        VideoSource.current = vidsrc
        VideoTitle.current = vidtitle
        VideoDesc.current = videdesc
        setShowVideoComp(true)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const getnetworkstream = (e) => {
        setNetStreamURL(e.target.value)
    }

    return (

        <>
            {ShowVideoComp && <VideoPlayer src={VideoSource.current} vidtitle={VideoTitle.current} viddesc={VideoDesc.current} />}
            {!ShowVideoComp &&
                <div>
                    <div style={{ "paddingLeft": "10px" }}> <h3>Play Network Stream</h3></div>
                    <div style={{ "paddingLeft": "10px", "display": "flex", "justifyContent": "center" }}> <input placeholder="Enter your network stream link" style={{ "width": "80%" }} type="text" onChange={getnetworkstream} /> <button onClick={(e) => loadvideocomp(NetStreamURL, "External Network Stream", "External Network Stream - No description available")} style={{ "backgroundColor": "rgb(122, 202, 2)", "color": "white" }}>Load Stream</button></div>
                    <div style={{ "paddingLeft": "10px" }}> <h3>Doordarshan Live TV (Waves OTT)</h3></div>

                    <div className="videoCardContainer">
                        <div className="videoCardDiv">

                            {live_tv_data.map((vidinfo) => (
                                <div key={vidinfo.ch_id} className="videoCard" onClick={(e) => loadvideocomp(vidinfo.stream_url, vidinfo.ch_name, vidinfo.desc)} >
                                    <img srcSet={logo_list[vidinfo.ch_id]} alt="" />
                                    <div className="videoCardinfo">
                                        <div>
                                            <span style={{ "float": "left", "textAlign": "left", "fontWeight": "bold", "fontSize": "15px", "marginLeft": "2px" }}>{vidinfo.ch_name} </span>
                                            <span style={{ "float": "right", "backgroundColor": "red", "color": "white", "marginRight": "7px", "padding": "3px 5px 3px 5px", "fontSize": "10px", "fontWeight": "bold", "borderRadius": "5px" }}>LIVE</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Homepage;