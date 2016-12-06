import * as io from 'socket.io';

export class Socket {
	public io: SocketIO.Server;

	public static bootstrap(httpServer) {
		new Socket(httpServer);
	}

	public constructor(httpServer) {
		this.io = io(httpServer);

		this.io.on('connection', (socket) => {
		  	console.log('a user connected');
		  	socket.on('chat message', (msg) => {
		  		this.onChatMessage(msg);
		  	});
		});
	}

	private onChatMessage(msg) {
		this.io.emit('chat message', msg);
	}
}
