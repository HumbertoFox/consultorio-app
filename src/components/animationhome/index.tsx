'use client';

import {
    useEffect,
    useState
} from 'react';

export default function VideoComponent() {
    const [videoSrc, setVideoSrc] = useState<string>('/videos/pusasion.mp4');

    useEffect(() => {
        const videos = [
            '/videos/pusasion.mp4',
            '/videos/virus.mp4',
        ];

        const randomIndex = Math.floor(Math.random() * videos.length);
        setVideoSrc(videos[randomIndex]);
    }, []);
    return (
        <video
            src={videoSrc}
            loop
            autoPlay
            muted
            playsInline
        />
    );
}