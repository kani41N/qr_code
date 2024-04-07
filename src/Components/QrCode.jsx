import React from 'react';
import { useState } from 'react';

const Qrcode = () => {
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState('Kani');
    const [qrSize, setQrSize] = useState(150);
    
   async function GenerateQR(){
    setLoading(true);
    try{
    const url= `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${qrData}`;
    setImg(url);
    }catch (error) {
      console.error('Error Generating QR code', error);
    }finally{
      setLoading(false);
    } 
  }
  function downloadQR(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => { 
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    });
  }

  return (
    <div>   
     <div className='w-4/12 px-4 py-2 mx-auto mt-28'>
        <h1 className='text-center mb-5 font-semibold text-[22px] underline'>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='my-4 mx-auto border border-gray-500 shadow-sm' /> }
        <div className='flex flex-col gap-4'>
            <div className=''>
                <label htmlFor='dataInput' className='pr-2 text-[18px] font-semibold'>
                    Data for QR code:
                </label><br/>
                <input 
                value={qrData} type="text" id='dataInput' placeholder='Enter data for QR code'
                onChange={(e)=>setQrData(e.target.value)}
                className='w-full mt-1 px-2 py-2 rounded-md border-2 border-cyan-600 focus:border-cyan-600' />
            </div>
            <div>
                <label htmlFor='sizeInput' className='pr-2 text-[18px] font-semibold'>
                    Image size (e.g., 150):
                </label><br/>
                <input
                value={qrSize} onChange={(e)=>setQrSize(e.target.value)}
                 type="text" id='sizeInput' placeholder='Enter image size'
                 className='w-full mt-1 px-2 py-2 rounded-md border-2  border-cyan-600 focus:border-cyan-600'/>
            </div>
        </div>
        <div className='flex gap-4 mx-20'>
            <button onClick={GenerateQR} disabled={loading}
             className='bg-gray-500 hover:bg-gray-600 px-5 py-2 text-white cursor-pointer text-[16px] font-semibold rounded-md mt-5'
             >
             Generate QR Code
             </button>
            <button 
             onClick={downloadQR} 
             className='bg-green-600 hover:bg-green-700 px-5 py-2 text-white cursor-pointer text-[16px] font-semibold rounded-md mt-5'>Download QR Code</button>
        </div>
        <div>
            <p className='mt-2 text-sm font-serif  text-gray-600 text-end'>Desiged by <span className='text-cyan-600'> Kani_n</span></p>
        </div>
     </div>
      
    </div>
  )
}

export default Qrcode;
