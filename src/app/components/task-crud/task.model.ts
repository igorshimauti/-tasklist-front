export interface Task {
	id?: number;
	titulo: string;
	status: string;
	descricao?: string;
	dataCriacao?: Date;
	dataEdicao?: Date;
	dataRemocao?: Date;
	dataConclusao?: Date;
}