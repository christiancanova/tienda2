import 'dotenv/config'

const config = {
    MAIL_ETH_HOST: process.env.EMAIL_ETH_HOST,
    MAIL_ETH_PORT: process.env.EMAIL_ETH_PORT,
    MAIL_ETH_USER: process.env.EMAIL_ETH_USER,
    MAIL_ETH_PASS: process.env.EMAIL_ETH_PASS
}

export default config;