
// const jwt = require('jsonwebtoken');
import * as jwt from "jsonwebtoken";

const SECOND = 1000;
const DAY = 24 * 60 * 60 * SECOND;

const createJWTToken = ({ payload, secret, expiresIn }: {
	payload: { userId: string };
	secret: string;
	expiresIn: number;
}) => {
	return jwt.sign({ ...payload }, secret, {
			algorithm: 'HS512',
			expiresIn: expiresIn / 1000 // in seconds if numeric
	});
};

let serverToken: string, serverTokenGenTime: number;
export const getJWTUserToken = () => {
	const userId = localStorage.getItem("userId");
  if(!serverToken || ((new Date().getTime() - serverTokenGenTime) > DAY)){
    const secret = String(process.env.JWT_SECRET);
    serverToken = createJWTToken( { payload: { userId: userId ?? "" }, secret, expiresIn: 2*DAY});
    serverTokenGenTime = new Date().getTime();
	}
  return serverToken;
}