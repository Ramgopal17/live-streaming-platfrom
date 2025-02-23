import { useState } from 'react'
import './App.css'
import VideoPlayer from './comps/VideoPlayer.jsx'
import Exp from './comps/exp.jsx'
import Navebar from './comps/Navbar.jsx'
import Homepage from './comps/Homepage.jsx'


function App() {
  const [expandAcMenuState,setexpandAcMenuState]=useState(false)

  return (
    <>
    <Navebar expandAcMenuState={expandAcMenuState} setexpandAcMenuState={setexpandAcMenuState}/>
    <Homepage expandAcMenuState={expandAcMenuState} setexpandAcMenuState={setexpandAcMenuState}/>
    
    {/* <VideoPlayer src=" http://127.0.0.1:5000/video/live.m3u8" />     */}
    {/* <VideoPlayer src="https://dai.fancode.com/linear/hls/pb/event/7zKaaJEtTva-odjIBrejdQ/stream/85b3523f-a7fe-4b65-b232-ba5706376079:SIN2/master.m3u8?hdnea=st=1732895777~exp=1732896077~acl=*~id=c947ff22-0d47-4eba-90a8-60ee70f2fa3f~hmac=8cdbe41576a0895b7acd602a724a51bfed7c6166afadde2ec04f3c9ea6d00e6f" />     */}
    {/* <VideoPlayer src="http://192.168.206.124:5000/video/live.m3u8" />     */}
    {/* <VideoPlayer src="https://dai.fancode.com/linear/hls/pb/event/d8wrGRITSKqlPzNkykCMdQ/stream/a47d7d14-6fd9-4dec-9921-46119282c0e8:TPE2/master.m3u8?hdnea=st=1732696177~exp=1732696477~acl=*~id=f2db8dac-0430-4d3d-bd06-b085c27b6ad9~hmac=48db6fe1cda0ccc5b465683afef7ee70bdcb484205d400eb23e41f95ca3f7a93" />     */}
    {/* <Exp src="http://10.20.48.136:5000/video/live.m3u8" />     */}
    </>
  )
}



export default App
