import app from './app';


const PORT = process.env.SITE_PORT

app
    .listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    })
    .on('error', (e) => console.log(e))