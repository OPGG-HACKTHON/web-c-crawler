import transporter from '../config/nodemailer';

const sendMail = async (text: string) => {
  const title = text === 'UPDATE SUCCESS' ? text : 'Update ERROR';
  await transporter.sendMail({
    from: `"WDMA Team" <kanghg1116>`,
    to: 'kanghg1116@gmail.com, dosemfb0920@gmail.com, dnstlr2933@naver.com',
    subject: title,
    text,
  });
};

export default sendMail;
