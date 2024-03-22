import type React from 'react';
import { useState } from 'react';

export const QRCodeGenerator: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

//   const generateQRCode = async () => {
//     try {
//       const url = await QRCode.toDataURL('https://example.com', {
//         errorCorrectionLevel: 'H',
//         margin: 1,
//         color: {
//           dark: '#0000FF',
//           light: '#FFFFFF',
//         },
//         logoImage: logoUrl,
//       });
//       setQrCodeUrl(url);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <label htmlFor="logo" className="mr-2 font-semibold">
            Logo:
          </label>
          <input
            type="file"
            id="logo"
            accept="image/png"
            onChange={handleLogoUpload}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex items-center mb-4">
          <div className="w-32 flex justify-between">
            <div className="w-4 h-4 rounded-full bg-black"></div>
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
          </div>
          <span className="ml-4 font-semibold">Code color</span>
        </div>
        <button
        //   onClick={generateQRCode}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Generate QR Code
        </button>
      </div>
      {qrCodeUrl && (
        <div className="mt-8">
          <img src={qrCodeUrl} alt="QR Code" className="max-w-xs" />
          <p className="mt-2 text-gray-500">More customizations are available after creating</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;


