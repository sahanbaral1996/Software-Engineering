export const turnConfig = {
	iceServers: [
		{
			urls: ["stun:bn-turn1.xirsys.com"],
		},
		{
			username:
				"0kYXFmQL9xojOrUy4VFemlTnNPVFZpp7jfPjpB3AjxahuRe4QWrCs6Ll1vDc7TTjAAAAAGAG2whXZWJUdXRzUGx1cw==",
			credential: "285ff060-5a58-11eb-b269-0242ac140004",
			urls: [
				"turn:bn-turn1.xirsys.com:80?transport=udp",
				"turn:bn-turn1.xirsys.com:3478?transport=udp",
				"turn:bn-turn1.xirsys.com:80?transport=tcp",
				"turn:bn-turn1.xirsys.com:3478?transport=tcp",
				"turns:bn-turn1.xirsys.com:443?transport=tcp",
				"turns:bn-turn1.xirsys.com:5349?transport=tcp",
			],
		},
	],
};
