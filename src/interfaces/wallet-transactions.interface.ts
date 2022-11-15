import { Document } from 'mongoose';


export interface WalletsInterface extends Document {
	id?: string;
	owner: string;
	balance: string;
	status: boolean;
	created_at: Date;
	updated_at: Date;
}


export interface TransactionsInterface extends Document{
	id?:string;
	sender:string;
	receiver:string;
	amount:string;
	reference: string;
	status:string;
	transaction_type:string;
	entity:string;
	holding_status:string;
	channel:string;
	created_at: Date;
	updated_at: Date;
}