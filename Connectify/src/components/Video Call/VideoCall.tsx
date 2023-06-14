// import React, { useEffect, useRef } from 'react';
// import DailyIframe from '@daily-co/daily-js';
// import { useState } from 'react';

// const VideoCall = ({ callUrl, isVideoCall }) => {
//     const dailyRef = useRef(null);
//     const [isMounted, setIsMounted] = useState(true);

//     useEffect(() => {
//         setIsMounted(true);
//         return () => {
//             setIsMounted(false);
//         };
//     }, []);

//     useEffect(() => {
//         if (!dailyRef.current && isMounted) {
//             dailyRef.current = DailyIframe.createFrame({
//                 showLeaveButton: true,
//                 iframeStyle: {
//                     position: 'fixed',
//                     top: '0',
//                     left: '0',
//                     width: '100%',
//                     height: '100%',
//                 },
//             });

//             dailyRef.current.join({ url: callUrl }).then(() => {
//                 if (!isVideoCall) {
//                     dailyRef.current.setLocalVideo(false);
//                 }
//             });
//         }

//         return () => {
//             if (dailyRef.current) {
//                 dailyRef.current.leave().then(() => {
//                     if (isMounted) {
//                         dailyRef.current.destroy();
//                         dailyRef.current = null;
//                     }
//                 });
//             }
//         };
//     }, [callUrl, isVideoCall, isMounted]);

//     return null;
// };

// export default VideoCall;