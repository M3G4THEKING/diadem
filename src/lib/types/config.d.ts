export type UiconSet = {
	id: string;
	name: string;
	url: string;
	scale: number;
}

export type ClientConfig = {
	mapStyles: {
		id: string;
		name: string;
		url: string;
	}[];
	uiconSets: UiconSet[];
}

export type ServerConfig = {
	golbat: {
		url: string
		auth: string
	}
}

export type Config = {
	server: ServerConfig
	client: ClientConfig
}