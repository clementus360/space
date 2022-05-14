import { useEffect } from 'react'
import io from 'socket.io-client'

import { useRouter } from 'next/router'
import Image from 'next/image';

import Display from '../../components/room/UserDisplay';
import Footer from '../../components/room/footer';
import Feed from '../../components/room/UserFeed';

export default function Room() {
	const router = useRouter()
	const path = router.query
	let socket

	useEffect(() => {
		if(!socket) {
			socket = io('http://localhost:5000')
			console.log(socket.id)
			socket.on("connect", () => {
				socket.emit('client-connected', {clientId: socket.id, roomId: path.room})
				socket.on('user-connected', message => {
					console.log(message)
				})
			});
		}
	},[])
	return (
	<>
	<div className="h-max w-full md:w-8/12 m-auto flex flex-col-reverse justify-between md:flex-row gap-4">
		<section className="bg-darkGrey flex md:flex-col items-center gap-4 w-full md:w-max h-max md:max-h-[75vh] 2xl:max-h-[80vh] rounded-md p-4 md:p-8 overflow-x-scroll md:overflow-y-scroll md:overflow-x-hidden">
			<Display />
			<Display />
			<Display />
			<Display />
			<Display />
			<Display />
		</section>
		<section className="bg-darkGrey w-full p-4 rounded-md flex flex-col items-center">
			<div className="flex items-center gap-2 mb-4">
				<h2 className="font-semibold">Room name</h2>
				<Image
					src="/images/vector-3.svg"
					alt="copy"
					width={16}
					height={16}
				/>
			</div>
			<Feed />
		</section>
	</div>
	<Footer />

	<style jsx>{`

	  ::-webkit-scrollbar {
		width: 5px;
	  }

	  ::-webkit-scrollbar-track {
		background: none;
	  }

	  ::-webkit-scrollbar-thumb {
		background: #303032;
	  }

	  ::-webkit-scrollbar-thumb:hover {
		background: #1A1B1E;

	  }
	`}</style>
	</>
	)
}
