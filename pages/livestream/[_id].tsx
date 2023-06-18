import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Chat from '../../components/chat';

const socket = io('http://localhost:3001');

interface Video {
  link: string;
  title: string;
  description: string;
  _id: string;
}

export default function LivestreamPage() {
  const router = useRouter();
  const { _id } = router.query as { _id: string };
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/videos/${_id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id]);

  socket.emit('join_room', _id);

  return (
    <div>
      <h1>Livestream Page - ID: {_id}</h1>
      <div className='mt-10 flex w-full'>
        <div className='w-full'>
          {video ? (
            <>
              <iframe width='640' height='360' className='mx-auto rounded-lg' src={`https://www.youtube.com/embed/${video.link}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              <p className='text-4xl ml-2 mt-2'>{video.title}</p>
            </>
          ) : (
            <p>Loading video...</p>
          )}
        </div>
        <div className='w-full px-10'>
          <Chat socket={socket} username='test' room={_id} />       
        </div>
      </div>
    </div>
  );
}
