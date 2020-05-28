import smtplib,ssl
import email
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class SendEmail:
    def __init__(self):
        pass

    @staticmethod
    def send_email(reciever_email,verification_code,user_name):

        body = f"Hello {user_name}, \n\n" \
                  f"" \
                  f"The Verification code for your Signup completion is {verification_code}.\n\n" \
                  f"" \
                  f"Thank you for considering us."

        mess = MIMEMultipart()
        mess["From"] = 'modelwaresahan@gmail.com'
        mess["To"] = reciever_email
        mess["Subject"] = 'Verification Code'
        mess["Bcc"] = 'baralsahan21996@gmail.com'
        mess.attach(MIMEText(body,'plain'))

        text = mess.as_string()

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.googlemail.com",465) as server:
            server.login('modelwaresahan@gmail.com','@internet1996')
            server.sendmail('modelwaresahan@gmail.com',reciever_email,text)



