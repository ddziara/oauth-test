import dotenv from "dotenv";

dotenv.config();

export default () => {
    return <a href={`${process.env["NGROK_BASEURL"]}/login/facebook`}>login with facebook</a>
}; 