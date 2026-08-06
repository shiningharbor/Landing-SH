import path from 'path';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export async function POST(req: Request, res: Response) {
  const { OAuth2 } = google.auth;
  const { to, subject, text } = await req.json()
  // console.log(to, subject, text );


  // Suponiendo que quieres adjuntar imagen.jpg que está en /public/imagenes
  const imagePath = path.join(process.cwd(), 'public', 'BG.png');


  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'smarttank@revolverx.com',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token as string,
    },
  });

  const mailOptions = {
    from: 'hp@revolverx.com',
    to, // Asegúrate de validar y limpiar correctamente
    subject, // Asegúrate de validar y limpiar correctamente
    text, // Asegúrate de validar y limpiar correctamente
    attachments: [
      {
        filename: 'BG.png',
        path: imagePath,
        cid: 'BG' // Puede ser cualquier cadena única
      }
    ],
    html: '<img src="cid:BG" style="width: 100%; height: 50%;">', // Asegúrate de validar y limpiar correctamente
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("se envio correo");
    return new Response("Ok", {
      status: 200,
    });
    // res.status(200).json({ success: true });
  } catch (error: any) {
    console.log(error);
    return new Response(error, {
      status: 400
    });
    // res.status(500).json({ success: false, error: error.message });
  }
}
