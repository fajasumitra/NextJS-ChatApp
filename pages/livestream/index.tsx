import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Video {
  link: string;
  title: string;
  description: string;
  _id: number;
}

export default function Livestream() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/videos')
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className='text-4xl text-bold mb-10'>choose Video</h1>
      <div className='grid gap-5 grid-cols-1'>
        {videos.map((data, index) => (
          <Link href={`/livestream/${data._id}`} key={index}>
            <div className=''>
              <div className="grid">
                <h2>{`${data.title} : https://www.youtube.com/watch?v=${data.link}`}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
