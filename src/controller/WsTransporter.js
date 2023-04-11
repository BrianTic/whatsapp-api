const { Client, LocalAuth, Buttons, MessageMedia, List } = require('whatsapp-web.js');
const qr_image = require("qr-image");

class WsTransporter extends Client {
    constructor() {
        super({
            authStrategy: new LocalAuth(),
            puppeteer: { headless: true },
        });

        this.status = false;

        this.on('qr', qr => {
            // qrcode.generate(qr, {small: true});
            console.log("Escanea el codigo QR que esta en la carepta tmp");
            const path = `${process.cwd()}/tmp`;
            let qr_svg = (0, qr_image.image)(qr, { type: "svg", margin: 4 });
            qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
            console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
        });

        console.log("Iniciando....");

        this.initialize();
        this.on("ready", () => {
            this.status = true;
            console.log("LOGIN_SUCCESS");
        });

        this.on('message', message => {
            console.log(message);
            if (message.body === '!ping') {
                message.reply('👋 pong!');
            } else if (message.body === 'Hola') {
                message.reply('👋 Hola, soy un bot de prueba!');
            } else if (message.body === 'imagen') {
                // message.reply(new MessageMedia('image/png', fs.readFileSync('./path/to/image.png'), 'Image'));

                message.reply('👋 Hola, soy un bot de prueba!');

                try {
                    message.reply(new Buttons('Hola, soy un bot de prueba!', [
                        new Buttons.Button({ id: 'id1', text: 'Botón 1' }),
                        new Buttons.Button({ id: 'id2', text: 'Botón 2' }),
                        new Buttons.Button({ id: 'id3', text: 'Botón 3' }),
                    ]));

                } catch (error) {
                    mensaje.reply('Error: ' + error);
                    console.log(error);
                    
                }
            }
        });

        this.on("auth_failure", () => {
            this.status = false;
            console.log("LOGIN_FAIL");
        });

        this.on("qr", (qr) => {
            console.log("Escanea el codigo QR que esta en la carepta tmp");
            this.generateImage(qr);
        });
    }

    async sendMsgText(lead) {
        try {
            if (!this.status)
                return Promise.resolve({ error: "WAIT_LOGIN" });
            const { message, phone } = lead;
            const response = await this.sendMessage(`${phone}@c.us`, message);
            return { id: response.id.id };
        }
        catch (e) {
            return Promise.resolve({ error: e.message });
        }
    }

    async sendMsgImage(lead) {
        try {
            if (!this.status)
                return Promise.resolve({ error: "WAIT_LOGIN" });
            /*const response = await this.sendMessage(`${phone}@c.us`, message);
            return { id: response.id.id };*/
            const { message, phone } = lead;
            const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
            this.sendMessage(phone, message, media);

        }
        catch (e) {
            return Promise.resolve({ error: e.message });
        }
    }

}

exports.default = WsTransporter;
