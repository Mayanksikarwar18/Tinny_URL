"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faLink } from '@fortawesome/free-solid-svg-icons'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'
import { faQrcode } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faClone } from '@fortawesome/free-solid-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Link from 'next/link'



export default function Home() {

  const [URLs, setURLs] = useState([])
  const [loading, setLoading] = useState(true)
  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [domain, setdomain] = useState("tinnyurl")
  const [generated, setgenerated] = useState("")

  const fetchUrls = () => {
    fetch("/api/urls").then((res)=>res.json()).then((data)=>{
      if(data.success) {
        setURLs(data.data);
      }
    });
  }

  useEffect(() => {
    fetchUrls()
      setLoading(false);

  }, []);

  if(loading) return <p>Loading....</p>;
  


  const generate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "url": url,
      "domain": domain,
      "shorturl": shorturl
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("/api/generate", requestOptions)
      .then(response => response.json())
      .then(result => {
        seturl("")
        setshorturl("")
        console.log(result)
        alert(result.message)

      })
      .then(()=> fetchUrls())

      .catch(error => console.log('error', error));
  }


  const handleChangeurl = (e) => {
    seturl(e.target.value)
  }
  const handleChangeshorturl = (e) => {
    setshorturl(e.target.value)
  }
  const handleChangedomain = (e) => {
    setdomain(e.target.value)
  }

  return (
    <main className="bg-[#002342] h-full">
      <div className="flex justify-evenly items-center h-170">
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-5xl font-semibold">URL Shortener, Branded</h1>
          <h1 className="text-5xl font-semibold">Short Links & Analytics</h1>
          <p className="text-lg">
            Welcome to the original link shortener — simplifying the Internet
            <br />
            through the power of the URL since 2002.
          </p>
          <p className="text-lg">
            You can use branded domains for fully custom links, track link
            <br />
            analytics, and enjoy other powerful features with our paid plans.
          </p>
          <div className="flex gap-5">
            <button className="bg-white text-black p-2 text-md rounded-md">
              View Plans
            </button>
            <button className="bg-[#0c7390] text-white p-2 text-md rounded-md">
              Create New Account
            </button>
          </div>
        </div>
        <div>
          <div className=" flex justify-evenly w-full h-18">
            <div className='flex justify-center items-center w-1/2 bg-white text-black  rounded-t-xl'>
              <h1 className="text-xl font-bold text-center flex justify-center items-center">
                <FontAwesomeIcon className='w-5 h-5 mr-1' icon={faLink} />
                Shorten a Link</h1>
            </div>
            <div className='flex justify-center items-center bg-[#0c7390] w-1/2 rounded-t-xl'><h1 className="text-xl font-bold text-center flex justify-center items-center">
              <FontAwesomeIcon className='w-5 h-5 mr-1' icon={faQrcode} />
              Generate QR Code</h1>
            </div>
          </div>
          <div className="pb-4 px-10 bg-white text-black rounded-b-lg w-fit flex flex-col">

            <div>
              <label className="text-lg font-semibold flex items-center py-2" >
                <FontAwesomeIcon className='w-5 h-5 mr-1' icon={faLocationArrow} />Long URL <span className='text-rose-700 mx-2'>*</span>
              </label>
            </div>
            <input onChange={handleChangeurl} value={url} className="border border-gray-400 rounded-sm w-full px-3 py-1" type="text" placeholder="Paste long URL here" required />
            <div className="flex w-full gap-2 h-25 my-3">
              <div className="w-1/2">
                <div>
                  <label className="text-lg font-semibold flex items-center py-2"><FontAwesomeIcon className='w-5 h-5 mr-1' icon={faGlobe} />Domain</label>
                </div>
                <select onChange={handleChangedomain} value={domain} className="border border-gray-500 rounded-sm w-full px-3 py-1.5" required>
                  <option value="tinnyurl.com">tinnyurl.com</option>
                  <option value="bitly.com">bitly.com</option>
                  <option value="tinyurl.com">tinyurl.com</option>
                </select>
              </div>
              <div className="flex items-center mt-5">
                <span className="font-medium text-2xl">/</span>
              </div>
              <div className="w-1/2">
                <div>
                  <label className="text-lg font-semibold flex items-center py-2"><FontAwesomeIcon className='w-5 h-5 mr-1' icon={faHighlighter} />Alias (optional)</label>
                </div>
                <input onChange={handleChangeshorturl} value={shorturl} className="border border-gray-500 rounded-sm w-full px-3 py-1" type="text" placeholder="Add alias here" required />
                <p className='text-[10px] text-gray-500 my-1'>Must be at least 5 characters</p>
              </div>
            </div>
            <button onClick={generate} className="bg-[#1f8244] text-center w-full p-2 text-white rounded-sm text-md" type='submit'>Shorten Link</button>
            <p className="mt-4 text-[14px] italic">
              By clicking Shorten Link, you agree with our <span className="text-sky-700">Terms of Service, Privacy</span>
              <br />and <span className="text-sky-700">Use of Cookies</span>.
            </p>

          </div>
        </div>
      </div>
      <div className='mx-40 h-full pb-100'>
        <h1 className='font-bold text-xl text-white'>Your Recent Link:</h1>
        {URLs.length === 0 && <p className='text-white flex justify-center p-10'>No URLs Found</p>}
        <ul>
          {URLs.map((item)=>(
          <li key={item._id}>
            <div className='flex justify-between items-center h-15 text-black bg-white mt-3 p-2 rounded-lg'>
          <div className='flex items-center'>
            <FontAwesomeIcon className='mx-6 w-5 h-5' icon={faLink} />
            <div className='flex flex-col py-3 px-3'>
              <Link target='_blank' href={`${item.shorturl}`}><h1 className='text-sky -600 font-bold text-lg '>{item.domain}/{item.shorturl}</h1></Link>
              <p className='text-gray-800 text-[13px]'>{item.url}</p>
            </div>
          </div>

          <div className='flex items-center gap-5 mr-10' >
             <Link href={`${item.shorturl}`}><button className='bg-[#0c7390] rounded-sm p-1 px-2 text-white w-fit text-sm flex items-center justify-center gap-2'><FontAwesomeIcon className='w-3 h-3' icon={faArrowUpRightFromSquare} />Visit URL</button></Link>
            <button className='bg-[#0c7390] rounded-sm p-1 px-4 text-white w-fit text-sm flex items-center justify-center gap-2'><FontAwesomeIcon className='w-3 h-3' icon={faQrcode} />QR</button>
            <button className='bg-[#0c7390] rounded-sm p-1 px-2 text-white w-fit text-sm flex items-center justify-center gap-2'><FontAwesomeIcon className='w-3 h-3' icon={faShareNodes} />Share</button>
            <button className='bg-[#002342] rounded-sm p-1 px-2 text-white w-fit text-sm flex items-center justify-center gap-2'><FontAwesomeIcon className='w-3 h-3' icon={faClone} />Copy</button>
          </div>
        </div>
          </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
