// // "use client"

// import { useRouter } from "next/navigation";

// // import React, { useEffect } from 'react'

// // function page({ params }: { params: { shortUrl: string } }) {
// //     useEffect(() => {
// //         fetch(`http://localhost:8000/${params.shortUrl}`)
// //             .then(response => {
// //                 if (response.redirected) {
// //                     window.location.href = response.url;
// //                 }
// //             })
// //             .catch(error => {
// //             });
// //     }, [params.shortUrl]);

// //     return (
// //         <div>page</div>
// //     );
// // }

// // export default page

// // "use client"
// import { redirect } from 'next/navigation'
// import React from "react";

// async function page({ params }: { params: { shortUrl: string } }) {
//     const lookupFullUrl = (shortUrl: string) =>
//         fetch(`http://localhost:3000/${shortUrl}`).then((res) => res.url);
//     const fullUrl = await lookupFullUrl(shortUrl);
//     if (fullUrl) {
//         redirect(fullUrl)
//       }
// }

// // export async function getProps({ params }) {
// // 	const response = await fetch(`http://localhost:3000/${params.shortUrl}`);

// // 	if (response.redirected) {
// // 		return {
// // 			redirectUrl: response.url
// // 		};
// // 	}

// // 	return { props: {} };
// // }

// export default page;

// // export default async function handler() {
// //     const { shortRoute } = useRouter();
// //     const lookupFullUrl = (shortUrl: string) => fetch(`http://localhost:3000/${shortUrl}`).then(res=>res.url);

// //     try {
// //       const fullUrl = await lookupFullUrl(shortRoute);

// //       res.redirect(fullUrl);
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ error: 'Failed to resolve short URL' });
// //     }
// //   }
